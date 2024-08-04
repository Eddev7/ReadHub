import mongoose from "mongoose";

const DiarioSchema = new mongoose.Schema({
    tribunal: { type: String, required: true },
    data: {type: String, required: true},
    texto: {type: Array, required: true},
})
const DiarioModel = mongoose.model('Diario', DiarioSchema);
export default DiarioModel;

