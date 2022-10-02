import ChatFactoryDao from "../daos/chat/ChatFactoryDao.js";
import { chatDaoType } from "../config/config.js";
import { ChatDto } from "../dtos/index.js";
import BaseRepository from "./BaseRepository.js";

class ChatRepository extends BaseRepository {
  constructor() {
    super(ChatFactoryDao, chatDaoType, ChatDto);
  }
  async create(mensaje) {
    mensaje.fechahora = new Date().toLocaleString();
    super.create(mensaje);
  }
}

const chatRepository = new ChatRepository();

export default chatRepository;
