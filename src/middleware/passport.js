import passport from "passport";
import bcrypt from "bcrypt";
import passportlocal from "passport-local";
import logger from "../lib/logger.js";
import { app } from "../global.js";
import { userRepository } from "../repositories/index.js";

const LocalStrategy = passportlocal.Strategy;

const USUARIO_NO_VALIDO = "Usuario o contraseña no validos.";

function passportConfig() {
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(
    "login",
    new LocalStrategy(
      {
        passReqToCallback: true,
      },
      async function (req, username, password, done) {
        let usuario = await userRepository.getByUsername(username);

        if (!usuario) {
          logger.info("Usuario no encontrado: " + username);
          return done(null, false, { message: USUARIO_NO_VALIDO });
        } else {
          if (!isValidPassword(usuario, password)) {
            logger.info(username, "contraseña invalida");
            return done(null, false, { message: USUARIO_NO_VALIDO });
          } else {
            return done(null, usuario);
          }
        }
      }
    )
  );

  passport.use(
    "signup",
    new LocalStrategy(
      {
        passReqToCallback: true,
      },
      async function (req, username, password, done) {
        let usuario = await userRepository.getByUsername(username);

        if (usuario) {
          logger.info("Usuario existente: ", username);
          return done(null, false, { message: "El usuario ya existe." });
        } else {
          let newUser = { username: username, password: createHash(password) };
          const id = await userRepository.create(newUser);
          newUser = await userRepository.getById(id);
          return done(null, newUser);
        }
      }
    )
  );
}

const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  let user = await userRepository.getById(id);
  return done(null, user);
});

export { passport, passportConfig };
