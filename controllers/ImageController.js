import ImageModel from '../models/ImageModel.js';
import db from '../config/db.js';

export const getAllImages = async (req, res) => {
    try {
        const images = await ImageModel.getAllImages();
        console.log("Imágenes en la BD:", images); // Log de imágenes obtenidas
        res.json(images);
    } catch (err) {
        console.error('Error al obtener las imágenes:', err); // Log de error
        res.status(500).json({ message: 'Error al obtener las imágenes' });
    }
};

export const getImageById = async (req, res) => {
    try {
        const image = await ImageModel.getImageById(req.params.id);
        if (!image) {
            console.warn(`Imagen no encontrada con ID: ${req.params.id}`); // Log de advertencia
            return res.status(404).json({ message: 'Imagen no encontrada' });
        }
        res.json(image);
    } catch (err) {
        console.error('Error al obtener la imagen:', err); // Log de error
        res.status(500).json({ message: 'Error al obtener la imagen' });
    }
};

export const createImage = async (req, res) => {
    const image = {
        url: req.body.url,
        format: req.body.format,
        resolution: req.body.resolution,
        title: req.body.title,
        tags: req.body.tags
    };

    try {
        const result = await ImageModel.saveImage(image);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error al crear la imagen:', error);
        const status = error.status || 500;
        res.status(status).json({ error });
    }
};


export const updateImage = async (req, res) => {
    try {
        const updatedImage = await ImageModel.updateImage(req.params.id, req.body);
        if (!updatedImage) {
            console.warn(`Imagen no encontrada para actualización con ID: ${req.params.id}`); // Log de advertencia
            return res.status(404).json({ message: 'Imagen no encontrada' });
        }
        res.json(updatedImage);
    } catch (err) {
        console.error('Error al actualizar la imagen:', err); // Log de error
        res.status(500).json({ message: 'Error al actualizar la imagen' });
    }
};

export const deleteImage = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.run(`DELETE FROM images WHERE id = ?`, [id]);
        if (result.changes === 0) {
            return res.status(404).json({ error: 'Imagen no encontrada' });
        }
        res.status(200).json({ message: 'Imagen eliminada' });
    } catch (error) {
        console.error('Error al eliminar la imagen:', error);
        res.status(500).json({ error: 'Error al eliminar la imagen' });
    }
};
