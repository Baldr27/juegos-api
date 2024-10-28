import express from 'express';
import gameRoutes from './routes/GameRoutes.js';
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/games', gameRoutes);

// Middleware para manejar errores
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

// Iniciar servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
