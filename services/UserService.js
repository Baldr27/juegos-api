import db from '../config/db.js';

export const insertUserIfNotExists = (usuario, callback) => {
    db.run(`
        INSERT OR IGNORE INTO users (id, name, email)
        VALUES (?, ?, ?)
    `, [usuario.id, usuario.nombre, usuario.email], function (err) {
        if (err) {
            console.error('Error al insertar el usuario:', err.message);
            callback(err);
        } else {
            callback(null, this.lastID);
        }
    });
};
