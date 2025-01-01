const mongoose = require("mongoose");

const vendaSchema = new mongoose.Schema({
    cliente_id: {
        type: String,
        required: [true, "O campo `cliente_id` é obrigatório"]
    },
    produto_id: {
        type: mongoose.Schema.Types.ObjectId, // Tipo ObjectId para produtos
        required: [true, "O campo `produto_id` é obrigatório"]
    },
    quantidade: {
        type: Number,
        required: [true, "O campo `quantidade` é obrigatório"],
        min: [1, "A quantidade deve ser maior que zero"]
    },
    data: {
        type: Date,
        required: true,
        default: Date.now
    },
    total: {
        type: Number,
        required: [true, "O campo `total` é obrigatório"],
        min: [0.01, "O valor total deve ser maior que zero"]
    }
});

// Middleware para validar cliente_id e produto_id antes de salvar
vendaSchema.pre("save", async function (next) {
    const Cliente = mongoose.model("Cliente");
    const Produto = mongoose.model("Produto");

    // Validar cliente_id
    const cliente = await Cliente.findById(this.cliente_id);
    if (!cliente) {
        return next(new Error("O cliente_id fornecido não corresponde a um cliente existente"));
    }

    // Validar produto_id
    const produto = await Produto.findById(this.produto_id);
    if (!produto) {
        return next(new Error("O produto_id fornecido não corresponde a um produto existente"));
    }

    next();
});

module.exports = mongoose.model("Venda", vendaSchema);
