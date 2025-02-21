import React from "react";

const App = () => {
    const loginWithSpotify = () => {
        window.location.href = "http://localhost:4000/login"; // Redirection vers le backend
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>GuitarMaster 🎸</h1>
            <button
                onClick={loginWithSpotify}
                style={{ padding: "10px 20px", fontSize: "18px" }}
            >
                Se connecter avec Spotify
            </button>
        </div>
    );
};

export default App;
