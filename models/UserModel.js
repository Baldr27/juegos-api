import db from '../config/db.js';

class GameModel {
    static getAllGames() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM games
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

    static getGameById(id) {
        return new Promise((resolve, reject) => {
            const query = `
            SELECT * FROM games WHERE games.id = ?
        `;
            db.get(query, [id], (err, row) => {
                if (err) {
                    console.error('Error al obtener la gamen por ID:', err); // Log de error
                    return reject(err);
                }
                if (row) {
                    row.tags = JSON.parse(row.tags);
                }
                resolve(row);
            });
        });
    }

    static createGame(game) {
        return new Promise((resolve, reject) => {
            const { url, format, resolution, title, tags, user_id } = game;

            // Convertir tags a JSON
            const tagsJSON = JSON.stringify(tags);

            db.run(`INSERT INTO games (url, format, resolution, title, tags, user_id) VALUES (?, ?, ?, ?, ?, ?)`,
                [url, format, resolution, title, tagsJSON, user_id], function (err) {
                    if (err) {
                        console.error('Error al crear la gamen:', err); // Log de error
                        return reject(err);
                    }
                    console.log('Gamen creada con ID:', this.lastID); // Log de éxito
                    resolve({ id: this.lastID, url, format, resolution, title, tags, user_id });
                });
        });
    }

    static updateGame(id, game) {
        return new Promise((resolve, reject) => {
            const { url, format, resolution, title, tags } = game;

            // Convertir tags a JSON
            const tagsJSON = JSON.stringify(tags);

            db.run(`
                UPDATE games SET url = ?, format = ?, resolution = ?, title = ?, tags = ?
                WHERE id = ?
            `, [url, format, resolution, title, tagsJSON, id], function (err) {
                if (err) {
                    console.error('Error al actualizar la gamen:', err); // Log de error
                    return reject(err);
                }
                console.log('Gamen actualizada con ID:', id); // Log de éxito
                resolve({ id, url, format, resolution, title, tags });
            });
        });
    }

    static deleteGame(id) {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM games WHERE id = ?", [id], function (err) {
                if (err) {
                    console.error('Error al eliminar la gamen:', err); // Log de error
                    return reject(err);
                }
                console.log('Gamen eliminada con ID:', id); // Log de éxito
                resolve(this.changes > 0);
            });
        });
    }
}

export default GameModel;
