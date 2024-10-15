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

// Test unitario get all images

describe('Test unitario de la función getAllImages', () => {
    it('Debería devolver todas las imágenes', async () => {
        const resultado = await getAllImages();
        expect(resultado).to.deep.equal(imagenesNoFiltradas);
    });
});

// Test unitario filter images

describe('Test unitario de la función filterImages', () => {
    it('Debería devolver las imágenes filtradas por el parámetro de búsqueda', async () => {
        const parametroBusqueda = 'ciudad';
        const resultado = await filterImages(parametroBusqueda);
        const imagenesFiltradas = [
            {
                "id": 2,
                "url": "https://example.com/imagen2.png",
                "formato": "png",
                "resolucion": "1280x720",
                "etiquetas": ["ciudad", "noche"],
                "titulo": "Ciudad en la noche"
            }];
        expect(resultado).to.deep.equal(imagenesFiltradas);
    }
    );
}
);

// Test unitario add image 

describe('Test unitario de la función addImage', () => {

    it('Test unitario deberia contabilizar una imágen más que antes de agregar otro'), () => {
        const nuevaImagen = {
            "url": "https://example.com",
            "formato": "jpeg",
            "resolucion": "1920x1080",
            "etiquetas": ["paisaje", "moto"],
            "titulo": "Vista de la moto"
        }

        const lengthInicial = imagenesNoFiltradas.length;

        const resultado = addImage(nuevaImagen);

        expect(resultado).to.have.lengthOf(lengthInicial + 1);
    }
});
