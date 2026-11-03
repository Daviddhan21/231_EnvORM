require("dotenv").config();

const express = require("express");
const sequelize = require("./config/database");
const Komik = require("./models/Komik");
const komikRoutes = require("./routes/komikRoutes");

const app = express();

app.use(express.json());

app.use("/api/komik", komikRoutes);

app.get("/", (req, res) => {
    res.send("API CRUD Komik menggunakan Express dan Sequelize");
});

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log("Koneksi PostgreSQL berhasil!");

        await Komik.sync();
        console.log("Tabel komik berhasil dibuat!");

        app.listen(PORT, () => {
            console.log(`Server berjalan di http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Gagal menjalankan server:", error.message);
    }
}

startServer();