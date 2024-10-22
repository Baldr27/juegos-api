import express from 'express';
import { getAllImages, createImage, getImageById, updateImage, deleteImage } from '../controllers/ImageController.js';

const router = express.Router();

router.get('/', getAllImages);

router.post('/', createImage);

router.get('/:id', getImageById);

router.put('/:id', updateImage);

router.delete('/:id', deleteImage);

export default router;
