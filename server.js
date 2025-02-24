require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;

// Rota para capturar os leads
app.post("/lead", async (req, res) => {
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).json({ error: "Nome e email são obrigatórios!" });
    }

    try {
        const response = await axios.post(
            "https://api.brevo.com/v3/contacts",
            {
                email: email,
                attributes: {
                    FIRSTNAME: nome,
                },
                listIds: [3], // ID da lista no Brevo
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "api-key": process.env.API_KEY_BREVO, // Pegando do .env
                },
            }
        );

        res.json({ success: true, message: "Lead cadastrado com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao cadastrar o lead" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});