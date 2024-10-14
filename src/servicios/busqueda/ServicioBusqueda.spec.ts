import { expect } from "chai";
import "mocha";
//import imagenesFiltradas from "../../mocks/imagenesFiltradas.json";
//import imagenesNoFiltradas from "../../mocks/imagenesNoFiltradas.json";
import { servicioBusqueda } from './ServicioBusqueda.ts';

const imagenesFiltradas = {
    "imagenesFiltradas": [
        {
            "id": 1,
            "url": "https://example.com/imagen1.jpg",
            "formato": "jpeg",
            "resolucion": "1920x1080",
            "etiquetas": [
                "paisaje",
                "montaña"
            ],
            "titulo": "Vista de la montaña"
        },
        {
            "id": 3,
            "url": "https://example.com/imagen3.jpg",
            "formato": "jpeg",
            "resolucion": "1024x768",
            "etiquetas": [
                "mar",
                "playa"
            ],
            "titulo": "Playa al atardecer"
        }
    ]
};

const imagenesNoFiltradas = {
    "imagenesNoFiltradas": [
        {
            "id": 1,
            "url": "https://example.com/imagen1.jpg",
            "formato": "jpeg",
            "resolucion": "1920x1080",
            "etiquetas": [
                "paisaje",
                "montaña"
            ],
            "titulo": "Vista de la montaña"
        },
        {
            "id": 2,
            "url": "https://example.com/imagen2.png",
            "formato": "png",
            "resolucion": "1280x720",
            "etiquetas": [
                "ciudad",
                "noche"
            ],
            "titulo": "Ciudad en la noche"
        },
        {
            "id": 3,
            "url": "https://example.com/imagen3.jpg",
            "formato": "jpeg",
            "resolucion": "1024x768",
            "etiquetas": [
                "mar",
                "playa"
            ],
            "titulo": "Playa al atardecer"
        },
        {
            "id": 4,
            "url": "https://example.com/imagen4.bmp",
            "formato": "bmp",
            "resolucion": "800x600",
            "etiquetas": [
                "bosque",
                "arboles"
            ],
            "titulo": "Bosque tranquilo"
        }
    ]
};

describe("Pruebas de servicios de Busqueda", () => {
    it("Deberia retornar una json con una lista de imágenes que contengan el parámetro de búsqueda", () => {
        const jsonEsperado = imagenesFiltradas;
        const jsonCompleto = imagenesNoFiltradas;
        const parametroDeBusqueda = "montaña playa";

        const filtradas = servicioBusqueda.filtrarImagenes(jsonCompleto, parametroDeBusqueda);

        expect(jsonEsperado).to.deep.equal(filtradas);
    });
});
