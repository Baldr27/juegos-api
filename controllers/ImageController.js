import ImageModel from '../models/imageModel.js';

export const getAllImages = async (req, res) => {
    try {
        const images = await ImageModel.getAllImages();
        res.json(images);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener las imágenes' });
    }
};

export const getImageById = async (req, res) => {
    try {
        const image = await ImageModel.getImageById(req.params.id);
        if (!image) {
            return res.status(404).json({ message: 'Imagen no encontrada' });
        }
        res.json(image);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener la imagen' });
    }
};

export const createImage = async (req, res) => {
    try {
        const newImage = await ImageModel.createImage(req.body);
        res.status(201).json(newImage);
    } catch (err) {
        res.status(500).json({ message: 'Error al crear la imagen' });
    }
};

export const updateImage = async (req, res) => {
    try {
        const updatedImage = await ImageModel.updateImage(req.params.id, req.body);
        if (!updatedImage) {
            return res.status(404).json({ message: 'Imagen no encontrada' });
        }
        res.json(updatedImage);
    } catch (err) {
        res.status(500).json({ message: 'Error al actualizar la imagen' });
    }
};

export const deleteImage = async (req, res) => {
    try {
        const success = await ImageModel.deleteImage(req.params.id);
        if (success) {
            res.json({ message: 'Imagen eliminada' });
        } else {
            res.status(404).json({ message: 'Imagen no encontrada' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar la imagen' });
    }
};
