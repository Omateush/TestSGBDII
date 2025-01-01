const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware para processar JSON
app.use(express.json());

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Conexão com o MongoDB Atlas
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Conectado ao MongoDB Atlas"))
    .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

// Rotas
const authRoutes = require("./routes/authRoutes");
const produtosRoutes = require("./routes/produtosRoutes");
const clientesRoutes = require("./routes/clientesRoutes");
const comprasRoutes = require("./routes/comprasRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/produtos", produtosRoutes);
app.use("/api/clientes", clientesRoutes);
app.use("/api/compras", comprasRoutes);


// Rota para Single Page Application
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Inicialização do servidor
const PORT = process.env.PORT || 3005; // Mude para uma porta livre, ex: 3001
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

