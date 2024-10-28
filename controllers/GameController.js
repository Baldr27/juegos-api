import GameModel from '../models/GameModel.js';
import db from '../config/db.js';

export const getAllGames = async (req, res) => {
    try {
        const games = await GameModel.getAllGames();
        console.log("Imágenes en la BD:", games); // Log de imágenes obtenidas
        res.json(games);
    } catch (err) {
        console.error('Error al obtener las imágenes:', err); // Log de error
        res.status(500).json({ message: 'Error al obtener las imágenes' });
    }
};

export const getGameById = async (req, res) => {
    try {
        const game = await GameModel.getGameById(req.params.id);
        if (!game) {
            console.warn(`Gamen no encontrada con ID: ${req.params.id}`); // Log de advertencia
            return res.status(404).json({ message: 'Gamen no encontrada' });
        }
        res.json(game);
    } catch (err) {
        console.error('Error al obtener la gamen:', err); // Log de error
        res.status(500).json({ message: 'Error al obtener la gamen' });
    }
};

export const createGame = async (req, res) => {
    const game = {
        nombre: req.body.nombre,
        genero: req.body.genero,
        plataforma: req.body.plataforma,
        fecha_lanzamiento: req.body.fecha_lanzamiento,
        precio: req.body.precio
    };

    try {
        const result = await GameModel.saveGame(game);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error al crear la gamen:', error);
        const status = error.status || 500;
        res.status(status).json({ error });
    }
};


export const updateGame = async (req, res) => {
    try {
        const updatedGame = await GameModel.updateGame(req.params.id, req.body);
        if (!updatedGame) {
            console.warn(`Gamen no encontrada para actualización con ID: ${req.params.id}`); // Log de advertencia
            return res.status(404).json({ message: 'Gamen no encontrada' });
        }
        res.json(updatedGame);
    } catch (err) {
        console.error('Error al actualizar la gamen:', err); // Log de error
        res.status(500).json({ message: 'Error al actualizar la gamen' });
    }
};

export const deleteGame = async (req, res) => {
    const { id } = req.params;
    try {
        console.log(`Eliminando gamen con ID: ${id}`); // Log de información
        const result = await db.run(`DELETE FROM games WHERE id = ?`, [id]);
        if (result.changes === 0) {
            return res.status(404).json({ error: 'Gamen no encontrada' });
        }
        res.status(200).json({ message: 'Gamen eliminada' });
    } catch (error) {
        console.error('Error al eliminar la gamen:', error);
        res.status(500).json({ error: 'Error al eliminar la gamen' });
    }
};
