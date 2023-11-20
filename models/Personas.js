import mongoose, { Schema } from "mongoose";

const personas = new Schema({
    nombre: String,
    precio: String,
    cantidad: String,
    descripcion: String,
    filename: String,
    path: String,
    createdArt: { type: Date, default: Date.now }
});

const Persona = mongoose.model('personas', personas);
export default Persona;