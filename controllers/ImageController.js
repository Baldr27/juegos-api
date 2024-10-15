import ImageModel from '../models/ImageModel.js';

export const getAllImages = async (req, res) => {
    try {
        const images = await ImageModel.getAllImages();
        res.json(images);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener las imágenes' });
    }
};

export const filterImages = async (req, res) => {
    const { searchParameter } = req.query;
    try {
        const filteredImages = await ImageModel.filterImages(searchParameter);
        res.json(filteredImages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const addImage = async (req, res) => {
    try {
        const newImage = await ImageModel.addImage(req.body);
        res.status(201).json(newImage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
