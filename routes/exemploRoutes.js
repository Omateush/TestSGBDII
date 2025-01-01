const express = require("express");
const router = express.Router();
const Exemplo = require("../models/exemploModel");

// Criar documento
router.post("/", async (req, res) => {
    try {
        const exemplo = new Exemplo(req.body);
        await exemplo.save();
        res.status(201).json(exemplo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Obter todos os documentos
router.get("/", async (req, res) => {
    try {
        const exemplos = await Exemplo.find();
        res.json(exemplos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Atualizar documento
router.put("/:id", async (req, res) => {
    try {
        const exemplo = await Exemplo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(exemplo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Deletar documento
router.delete("/:id", async (req, res) => {
    try {
        await Exemplo.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
