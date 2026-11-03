const express = require("express");
const router = express.Router();
const Komik = require("../models/Komik");

// GET - Mengambil semua data komik
router.get("/", async (req, res) => {
    try {
        const data = await Komik.findAll();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST - Menambahkan data komik
router.post("/", async (req, res) => {
    try {
        const { title, description, author } = req.body;

        const data = await Komik.create({
            title,
            description,
            author
        });

        res.status(201).json({
            message: "Komik berhasil ditambahkan",
            data
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT - Mengubah data komik
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, author } = req.body;

        const komik = await Komik.findByPk(id);

        if (!komik) {
            return res.status(404).json({
                message: "Komik tidak ditemukan"
            });
        }

        await komik.update({
            title,
            description,
            author
        });

        res.status(200).json({
            message: "Komik berhasil diperbarui",
            data: komik
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE - Menghapus data komik
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const komik = await Komik.findByPk(id);

        if (!komik) {
            return res.status(404).json({
                message: "Komik tidak ditemukan"
            });
        }

        await komik.destroy();

        res.status(200).json({
            message: "Komik berhasil dihapus"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;