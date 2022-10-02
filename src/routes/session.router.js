import { Router } from "express";
import { passport } from "../middleware/passport.js";
import { userController, sessionController } from "../controllers/index.js";
import { HTTP_STATUS_ERROR_UNAUTHORIZED } from "../const.js";

const router = Router();

function errorHandler(err, req, res, next) {
  return res.status(HTTP_STATUS_ERROR_UNAUTHORIZED).send({ success: false, message: err });
}

router
  .route("/login")
  .get(sessionController.getLoginPage)
  .post(
    passport.authenticate("login", { failureRedirect: "/loginFailed", failureMessage: true }),
    sessionController.postLogin,
    errorHandler
  );

router
  .route("/loginFailed")
  .get(sessionController.postLoginFailed)
  .post(sessionController.postLoginFailed);

router.route("/logout").get(sessionController.getLogoutPage);

router
  .route("/signup")
  .get(sessionController.getSignupPage)
  .post(
    passport.authenticate("signup", { failureRedirect: "/signupFailed", failureMessage: true }),
    sessionController.postSignup,
    errorHandler
  );

router
  .route("/signupFailed")
  .get(sessionController.postSignupFailed)
  .post(sessionController.postSignupFailed);

router.route("/user").get(userController.getUser);

export default router;
