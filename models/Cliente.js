const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema({
    _id: { type: String, required: true }, // ID personalizado (exemplo: CLI001)
    nome: { type: String, required: true, minlength: 3 },
    idade: { type: Number, required: true, min: 18 },
    email: { type: String, required: true },
    endereco: { type: String, required: true },
    telefone: { type: String } // Opcional
});

module.exports = mongoose.model("Cliente", clienteSchema);
