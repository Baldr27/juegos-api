import db from "../config/db";

export const insertImage = (image, callback) => {
    const { url, formato, resolucion, titulo, usuario } = image;

    db.run(`
        INSERT INTO images (url, format, resolution, title, user_id)
        VALUES (?, ?, ?, ?, ?)
    `, [url, formato, resolucion, titulo, usuario.id], function (err) {
        if (err) {
            console.error('Error al insertar la imagen:', err.message);
            callback(err);
        } else {
            callback(null, this.lastID); // Devolvemos el ID de la imagen insertada
        }
    });
};
