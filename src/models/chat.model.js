import mongoose from "mongoose";
const chatCollection = "chat";

const ChatSchema = new mongoose.Schema({
  author: {
    email: { type: String, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    edad: { type: Number, required: true },
    alias: { type: String, required: true },
    avatar: { type: String, required: true },
  },
  text: { type: String, required: true },
  fechahora: { type: String, required: true },
});

const model = mongoose.model(chatCollection, ChatSchema);

export default model;
