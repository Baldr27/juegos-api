import db from '../config/db.js';

class ImageModel {
    static getAllImages() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM images
            `;
            db.all(query, [], (err, rows) => {
                if (err) {
                    console.error('Error al obtener todas las imágenes:', err); // Log de error
                    return reject(err); // Asegúrate de rechazar la promesa
                }
                rows.forEach((row) => {
                    const tagsArray = JSON.parse(row.tags);
                    console.log(`Título: ${row.title}, Etiquetas:`, tagsArray);
                });
                resolve(rows); // Asegúrate de resolver las filas
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
                    // Convertir el campo tags de JSON a array
                    row.tags = JSON.parse(row.tags);
                }
                resolve(row);
            });
        });
    }

    static createImage(image) {
        return new Promise((resolve, reject) => {
            const { url, format, resolution, title, tags } = image;

            // Convertir tags a JSON
            const tagsJSON = JSON.stringify(tags);

            db.run(`INSERT INTO images (url, format, resolution, title, tags) VALUES (?, ?, ?, ?, ?)`,
                [url, format, resolution, title, tagsJSON], function (err) {
                    if (err) {
                        console.error('Error al crear la imagen:', err); // Log de error
                        return reject(err);
                    }
                    console.log('Imagen creada con ID:', this.lastID); // Log de éxito
                    resolve({ id: this.lastID, url, format, resolution, title, tags });
                });
        });
    }

    static updateImage(id, image) {
        return new Promise((resolve, reject) => {
            const { url, format, resolution, title, tags } = image;

            // Convertir tags a JSON
            const tagsJSON = JSON.stringify(tags);

            db.run(`
                UPDATE images SET url = ?, format = ?, resolution = ?, title = ?, tags = ?
                WHERE id = ?
            `, [url, format, resolution, title, tagsJSON, id], function (err) {
                if (err) {
                    console.error('Error al actualizar la imagen:', err); // Log de error
                    return reject(err);
                }
                console.log('Imagen actualizada con ID:', id); // Log de éxito
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
