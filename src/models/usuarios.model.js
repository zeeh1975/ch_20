import mongoose from "mongoose";
const usuariosCollection = "usuarios";

const UsuariosSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model(usuariosCollection, UsuariosSchema);
