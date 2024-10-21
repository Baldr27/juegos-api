import express from 'express';
import { getAllImages, createImage, getImageById, updateImage, deleteImage } from '../controllers/imageController.js';  // Importación nombrada

const router = express.Router();

// Ruta para obtener todas las imágenes
router.get('/', getAllImages);

// Ruta para crear una nueva imagen
router.post('/', createImage);

// Ruta para obtener una imagen por ID
router.get('/:id', getImageById);

// Ruta para actualizar una imagen por ID
router.put('/:id', updateImage);

// Ruta para eliminar una imagen por ID
router.delete('/:id', deleteImage);

export default router;
