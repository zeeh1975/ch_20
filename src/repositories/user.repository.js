import UserFactoryDao from "../daos/usuarios/UsuariosFactoryDao.js";
import { userDaoType } from "../config/config.js";
import BaseRepository from "./BaseRepository.js";

class UserRepository extends BaseRepository {
  constructor() {
    super(UserFactoryDao, userDaoType);
  }
  async getByUsername(username) {
    return this.find({ username });
  }
}

const userRepository = new UserRepository();

export default userRepository;
