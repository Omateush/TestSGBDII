const jwt = require("jsonwebtoken");
require("dotenv").config(); // Carregar variáveis de ambiente do arquivo .env

module.exports = (requiredRole) => {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Acesso negado. Token não fornecido." });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // Usar chave secreta do .env
            req.user = decoded;

            if (requiredRole && decoded.role !== requiredRole) {
                return res.status(403).json({ error: "Acesso negado. Permissão insuficiente." });
            }

            next();
        } catch (err) {
            res.status(401).json({ error: "Token inválido ou expirado." });
        }
    };
};
