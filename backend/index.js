require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const qs = require("querystring");

const app = express();
app.use(cors());
app.use(express.json());

// Clés API Spotify (à mettre dans .env)
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3000/callback"; // URL où Spotify redirige après connexion

// Endpoint pour l'authentification Spotify
app.get("/login", (req, res) => {
    const scope =
        "user-read-playback-state user-modify-playback-state streaming";
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
        REDIRECT_URI
    )}&scope=${encodeURIComponent(scope)}`;
    res.redirect(authUrl);
});

// Endpoint pour récupérer le token Spotify
app.get("/callback", async (req, res) => {
    const code = req.query.code;

    const data = qs.stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
    });

    try {
        const response = await axios.post(
            "https://accounts.spotify.com/api/token",
            data,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        res.json(response.data); // Retourne le Token d'accès
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de l'authentification Spotify");
    }
});

// Lancer le serveur
const PORT = 4000;
app.listen(PORT, () =>
    console.log(`Serveur backend démarré sur http://localhost:${PORT}`)
);
