require('dotenv').config();
const express = require('express');
const imageRoutes = require('./routes/ImageRoutes.js');

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/images', imageRoutes);

// Middleware para manejar errores
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

// Iniciar servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
