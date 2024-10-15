import express from 'express';
import { getAllImages, filterImages, addImage } from '../controllers/ImageController.js';

const router = express.Router();

router.get('/', getAllImages);
router.get('/search', filterImages);
router.post('/', addImage);

export default router;