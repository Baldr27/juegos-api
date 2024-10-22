import db from "../config/db";


export const insertTagIfNotExists = (etiqueta, callback) => {
    db.get(`SELECT id FROM tags WHERE name = ?`, [etiqueta], (err, row) => {
        if (err) {
            console.error('Error al consultar la etiqueta:', err.message);
            callback(err);
        } else if (row) {
            callback(null, row.id); // Etiqueta ya existe, devolvemos su ID
        } else {
            // La etiqueta no existe, la insertamos
            db.run(`
                INSERT INTO tags (name)
                VALUES (?)
            `, [etiqueta], function (err) {
                if (err) {
                    console.error('Error al insertar la etiqueta:', err.message);
                    callback(err);
                } else {
                    callback(null, this.lastID); // Devolvemos el ID de la nueva etiqueta
                }
            });
        }
    });
};

export const linkImageWithTag = (imageId, tagId, callback) => {
    db.run(`
        INSERT INTO image_tags (image_id, tag_id)
        VALUES (?, ?)
    `, [imageId, tagId], function (err) {
        if (err) {
            console.error('Error al insertar la relación image_tags:', err.message);
            callback(err);
        } else {
            callback(null);
        }
    });
};
