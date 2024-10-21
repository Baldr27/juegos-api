import db from '../config/db.js';  // Asegúrate de que db está correctamente configurado

class ImageModel {
    // Obtener todas las imágenes con sus usuarios asociados
    static getAllImages() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT images.*, users.name AS user_name, users.email AS user_email
                FROM images
                LEFT JOIN users ON images.user_id = users.id
            `;
            db.all(query, [], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    // Obtener una imagen por su ID junto con el usuario asociado
    static getImageById(id) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT images.*, users.name AS user_name, users.email AS user_email
                FROM images
                LEFT JOIN users ON images.user_id = users.id
                WHERE images.id = ?
            `;
            db.get(query, [id], (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });
    }

    // Crear una nueva imagen con su usuario asociado (si existe)
    static createImage(image) {
        return new Promise((resolve, reject) => {
            const { url, formato, resolucion, titulo, usuario } = image;

            // Inserta al usuario primero (si no existe) y luego la imagen
            db.run(`
                INSERT OR IGNORE INTO users (id, name, email)
                VALUES (?, ?, ?)
            `, [usuario.id, usuario.nombre, usuario.email], function (err) {
                if (err) return reject(err);

                // Inserta la imagen
                db.run(`
                    INSERT INTO images (url, format, resolution, title, user_id)
                    VALUES (?, ?, ?, ?, ?)
                `, [url, formato, resolucion, titulo, usuario.id], function (err) {
                    if (err) return reject(err);
                    resolve({ id: this.lastID, ...image });
                });
            });
        });
    }

    // Actualizar los detalles de una imagen
    static updateImage(id, image) {
        return new Promise((resolve, reject) => {
            const { url, formato, resolucion, titulo, usuario } = image;

            // Primero, actualiza el usuario
            db.run(`
                UPDATE users SET name = ?, email = ?
                WHERE id = ?
            `, [usuario.nombre, usuario.email, usuario.id], function (err) {
                if (err) return reject(err);

                // Luego, actualiza la imagen
                db.run(`
                    UPDATE images SET url = ?, format = ?, resolution = ?, title = ?, user_id = ?
                    WHERE id = ?
                `, [url, formato, resolucion, titulo, usuario.id, id], function (err) {
                    if (err) return reject(err);
                    resolve({ id, ...image });
                });
            });
        });
    }

    // Eliminar una imagen por su ID
    static deleteImage(id) {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM images WHERE id = ?", [id], function (err) {
                if (err) return reject(err);
                resolve(this.changes > 0);
            });
        });
    }
}

export default ImageModel;
