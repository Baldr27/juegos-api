import db from '../config/db.js';
import ImageMapper from '../mapper/ImageMapper.js';

class ImageModel {
    static getAllImages() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM images
            `;
            db.all(query, [], (err, rows) => {
                if (err) {
                    console.error('Error al obtener todas las imágenes:', err); // Log de error
                    return reject(err);
                }
                rows.forEach((row) => {
                    const tagsArray = JSON.parse(row.tags);
                    console.log(`Título: ${row.title}, Etiquetas:`, tagsArray);
                });
                resolve(rows);
            });
        });
    }

    static getImageById(id) {
        return new Promise((resolve, reject) => {
            const query = `
            SELECT * FROM images WHERE images.id = ?
        `;
            db.get(query, [id], (err, row) => {
                if (err) {
                    console.error('Error al obtener la imagen por ID:', err); // Log de error
                    return reject(err);
                }
                if (row) {
                    row.tags = JSON.parse(row.tags);
                }
                resolve(row);
            });
        });
    }

    // Función para validar y luego crear la imagen si todo está correcto
    static saveImage(image) {
        return new Promise((resolve, reject) => {
            // Validación de los campos
            const validationError = ImageModel.validateImageFields(image);
            if (validationError) {

                return reject(validationError);
            }
            ImageModel.createImage(image)
                .then(resolve)
                .catch(reject);
        });
    }

    static createImage(image) {
        return new Promise((resolve, reject) => {
            const { url, format, resolution, title, tags } = image;
            const tagsJSON = JSON.stringify(tags || []); // Serializa los tags, si existen

            db.run(
                `INSERT INTO images (url, format, resolution, title, tags) VALUES (?, ?, ?, ?, ?)`,
                [url, format, resolution, title, tagsJSON],
                function (err) {
                    if (err) {
                        console.error('Error al crear la imagen:', err); // Log de error
                        return reject({ status: 500, message: 'Error al crear la imagen', error: err });
                    }
                    console.log('Imagen creada con ID:', this.lastID); // Log de éxito
                    resolve({ id: this.lastID, url, format, resolution, title, tags });
                }
            );
        });
    }

    // Función auxiliar para validar los campos de la imagen
    static validateImageFields(image) {
        const missingFields = [];
        const imagenMapeada = ImageMapper.toDTO(image);
        console.log("imagen mapeada fuera del for: ", imagenMapeada);
        for (const key in imagenMapeada) {
            if (!imagenMapeada[key] || (typeof imagenMapeada[key] === 'string' && imagenMapeada[key].trim() === '') || imagenMapeada[key] == null ) {
                console.log("missingFields: ",missingFields);
                console.log("imagen mappeada: ", imagenMapeada);
                missingFields.push(key);
           }
        }
        console.log('Campos faltantes:', missingFields);
        // Si hay campos faltantes, devolver un error
        if (missingFields.length > 0) {
            return {
                status: 400,
                message: `Faltan campos obligatorios o están vacíos: ${missingFields.join(', ')}`
            };
        }

        return null; // No hay errores de validación
    }





    static updateImage(id, image) {
        return new Promise((resolve, reject) => {
            const { url, format, resolution, title, tags } = image;

            const tagsJSON = tags ? JSON.stringify(tags) : '[]'; // Manejar tags nulos o no definidos

            db.run(`
            UPDATE images SET url = ?, format = ?, resolution = ?, title = ?, tags = ?
            WHERE id = ?
        `, [url, format, resolution, title, tagsJSON, id], function (err) {
                if (err) {
                    console.error('Error al actualizar la imagen:', err);
                    return reject(err);
                }
                console.log('Imagen actualizada con ID:', id);
                resolve({ id, url, format, resolution, title, tags });
            });
        });
    }



    static deleteImage(id) {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM images WHERE id = ?", [id], function (err) {
                if (err) {
                    console.error('Error al eliminar la imagen:', err); // Log de error
                    return reject(err);
                }
                console.log('Imagen eliminada con ID:', id); // Log de éxito
                resolve(this.changes > 0);
            });
        });
    }
}

export default ImageModel;
