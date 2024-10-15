// mock del modelo de imágenes
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

// Obtener todas las imágenes
export const getAllImages = async () => {

    return new Promise((resolve) => {
        resolve(imagenesNoFiltradas);
    });
};

// Filtrar imágenes según un parámetro de búsqueda
export const filterImages = async (searchParameter) => {
    return new Promise((resolve, reject) => {
        if (!imagenesNoFiltradas || imagenesNoFiltradas.length === 0) {
            return reject({ message: "No hay imágenes para filtrar" });
        }

        try {
            const regexBusqueda = new RegExp(searchParameter, 'i');
            const imagenesFiltradas = imagenesNoFiltradas.filter(imagen => {
                return (
                    regexBusqueda.test(imagen.titulo) ||
                    regexBusqueda.test(imagen.url) ||
                    regexBusqueda.test(imagen.formato) ||
                    regexBusqueda.test(imagen.resolucion) ||
                    imagen.etiquetas.some(etiqueta => regexBusqueda.test(etiqueta))
                );
            });

            resolve(imagenesFiltradas);
        } catch (err) {
            reject({ message: "Error al filtrar las imágenes" });
        }
    });
};

// Agregar una nueva imagen
export const addImage = async (nuevaImagen) => {
    return new Promise((resolve, reject) => {
        if (!nuevaImagen || !nuevaImagen.url || !nuevaImagen.formato || !nuevaImagen.resolucion || !nuevaImagen.etiquetas || !nuevaImagen.titulo) {
            return reject({ message: "Faltan datos obligatorios en la imagen" });
        }

        try {
            const nuevaId = imagenesNoFiltradas.length + 1;
            const imagenConId = { id: nuevaId, ...nuevaImagen };
            imagenesNoFiltradas.push(imagenConId);

            resolve(imagenConId);
        } catch (err) {
            reject({ message: "Error al agregar la imagen" });
        }
    });
};
