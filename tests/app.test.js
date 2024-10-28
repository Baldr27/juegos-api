import express from 'express';
import imageRoutes from '../routes/ImageRoutes.js';

const app = express();
app.use(express.json());
app.use('/images', imageRoutes);

export default app;
