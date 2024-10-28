import db from '../config/db.js';

export const clearDatabase = (done) => {
    db.serialize(() => {
        db.run("DELETE FROM games", (err) => {
            if (err) {
                console.error('Error al limpiar la tabla de imágenes:', err); // Log de error
                return done(err);
            }
            done();
        });
    });
};
