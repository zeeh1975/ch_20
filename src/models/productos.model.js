import mongoose from "mongoose";
const productosCollection = "productos";

const ProductosSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
});

export default mongoose.model(productosCollection, ProductosSchema);
