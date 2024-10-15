import { expect } from 'chai';
import { getAllImages, filterImages, addImage } from '../services/SearchService.js';

// Estado inicial de las imágenes antes de cada prueba
let imagenesNoFiltradas = [
    {
        "id": 1,
        "url": "https://example.com/imagen1.jpg",
        "formato": "jpeg",
        "resolucion": "1920x1080",
        "etiquetas": ["paisaje", "montaña"],
        "titulo": "Vista de la montaña"
    },
    {
        "id": 2,
        "url": "https://example.com/imagen2.png",
        "formato": "png",
        "resolucion": "1280x720",
        "etiquetas": ["ciudad", "noche"],
        "titulo": "Ciudad en la noche"
    },
    {
        "id": 3,
        "url": "https://example.com/imagen3.jpg",
        "formato": "jpeg",
        "resolucion": "1024x768",
        "etiquetas": ["mar", "playa"],
        "titulo": "Playa al atardecer"
    },
    {
        "id": 4,
        "url": "https://example.com/imagen4.bmp",
        "formato": "bmp",
        "resolucion": "800x600",
        "etiquetas": ["bosque", "arboles"],
        "titulo": "Bosque tranquilo"
    }
];

// Función para restablecer el estado inicial de las imágenes
const resetImages = () => {
    imagenesNoFiltradas = [
        {
            "id": 1,
            "url": "https://example.com/imagen1.jpg",
            "formato": "jpeg",
            "resolucion": "1920x1080",
            "etiquetas": ["paisaje", "montaña"],
            "titulo": "Vista de la montaña"
        },
        {
            "id": 2,
            "url": "https://example.com/imagen2.png",
            "formato": "png",
            "resolucion": "1280x720",
            "etiquetas": ["ciudad", "noche"],
            "titulo": "Ciudad en la noche"
        },
        {
            "id": 3,
            "url": "https://example.com/imagen3.jpg",
            "formato": "jpeg",
            "resolucion": "1024x768",
            "etiquetas": ["mar", "playa"],
            "titulo": "Playa al atardecer"
        },
        {
            "id": 4,
            "url": "https://example.com/imagen4.bmp",
            "formato": "bmp",
            "resolucion": "800x600",
            "etiquetas": ["bosque", "arboles"],
            "titulo": "Bosque tranquilo"
        }
    ];
};

// Test inicial de servicios sin controllers---------------------------------------------------------------------------------------------
describe('Test de integracion de servicios para imágenes bottom-up', () => {

    // Restablecer imágenes antes de cada prueba
    beforeEach(() => {
        resetImages();
    });

    it('getAllImages debe devolver todas las imágenes', async () => {
        const images = await getAllImages();
        expect(images).to.have.lengthOf(4);
    });

    it('filterImages debe devolver las imágenes filtradas', async () => {
        const images = await filterImages('montaña');
        expect(images).to.have.lengthOf(1);
    });

    it('addImage debe agregar una imagen', async () => {
        const newImage = {

            "url": "https://example.com/imagen5.png",
            "formato": "png",
            "resolucion": "800x600",
            "etiquetas": ["bosque", "estructura"],
            "titulo": "Escalera en el bosque"
        };
        const addedImage = await addImage(newImage);
        const images = await getAllImages();
        expect(images).to.have.lengthOf(5);
        expect(addedImage).to.deep.equal({ id: 5, ...newImage });
    });
});


//Test de servicios con controllers---------------------------------------------------------------------------------------------
import request from 'supertest';
import express from 'express';
import db from '../config/db.js';
import ImageRoutes from '../routes/ImageRoutes.js';

const app = express();
app.use(express.json());
app.use('/images', ImageRoutes);

// Limpiar la base de datos antes de cada prueba
beforeEach((done) => {
    db.run("DELETE FROM tasks", (err) => {
        if (err) return done(err);
        done();
    });
});