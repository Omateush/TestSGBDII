const express = require("express");
const router = express.Router();
const Venda = require("../models/Venda");

// Criar venda
router.post("/", async (req, res) => {
    try {
        const { cliente_id, produto_id, quantidade, total } = req.body;

        // Verificar se os campos obrigatórios estão presentes
        if (!cliente_id || !produto_id || !quantidade || !total) {
            return res.status(400).json({ error: "Todos os campos obrigatórios devem ser preenchidos." });
        }

        // Criar nova venda
        const venda = new Venda(req.body);

        // Salvar no banco
        await venda.save();

        res.status(201).json(venda);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
