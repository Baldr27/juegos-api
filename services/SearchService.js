// Obtener todas las imágenes
export const getAllImages = async (imagenesNoFiltradas) => {

    return new Promise((resolve) => {
        resolve(imagenesNoFiltradas);
    });
};

// Filtrar imágenes según un parámetro de búsqueda
export const filterImages = async (searchParameter, imagenesNoFiltradas) => {
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
export const addImage = async (nuevaImagen, imagenesNoFiltradas) => {
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
