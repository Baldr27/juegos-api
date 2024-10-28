import db from '../config/db.js';
import GameMapper from '../mapper/GameMapper.js';

class GameModel {
    static getAllGames() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM games
            `;
            db.all(query, [], (err, rows) => {
                if (err) {
                    console.error('Error al obtener todos los juegos:', err); // Log de error
                    return reject(err);
                }
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
                    console.error('Error al obtener el game por ID:', err); // Log de error
                    return reject(err);
                }
                resolve(row);
            });
        });
    }

    // Función para validar y luego crear la gamen si todo está correcto
    static saveGame(game) {
        return new Promise((resolve, reject) => {
            // Validación de los campos
            const validationError = GameModel.validateGameFields(game);
            if (validationError) {

                return reject(validationError);
            }
            GameModel.createGame(game)
                .then(resolve)
                .catch(reject);
        });
    }

    static createGame(game) {
        return new Promise((resolve, reject) => {
            const { nombre, genero, plataforma, fecha_lanzamiento, precio } = game;

            db.run(
                `INSERT INTO games (nombre, genero, plataforma, fecha_lanzamiento, precio) VALUES (?, ?, ?, ?, ?)`,
                [nombre, genero, plataforma, fecha_lanzamiento, precio],
                function (err) {
                    if (err) {
                        console.error('Error al crear la gamen:', err); // Log de error
                        return reject({ status: 500, message: 'Error al crear la gamen', error: err });
                    }
                    console.log('Gamen creada con ID:', this.lastID); // Log de éxito
                    resolve({ id: this.lastID, nombre, genero, plataforma, fecha_lanzamiento, precio });
                }
            );
        });
    }

    // Función auxiliar para validar los campos de la gamen
    static validateGameFields(game) {
        const missingFields = [];
        const gamenMapeada = GameMapper.toDTO(game);
        for (const key in gamenMapeada) {
            if (!gamenMapeada[key] || (typeof gamenMapeada[key] === 'string' && gamenMapeada[key].trim() === '') || gamenMapeada[key] == null) {
                missingFields.push(key);
            }
        }
        // Si hay campos faltantes, devolver un error
        if (missingFields.length > 0) {
            return {
                status: 400,
                message: `Faltan campos obligatorios o están vacíos: ${missingFields.join(', ')}`
            };
        }

        return null; // No hay errores de validación
    }





    static updateGame(id, game) {
        return new Promise((resolve, reject) => {
            const { nombre, genero, plataforma, fecha_lanzamiento, precio } = game;

            db.run(`
            UPDATE games SET nombre = ?, genero = ?, plataforma = ?, fecha_lanzamiento = ?, precio = ?
            WHERE id = ?
        `, [nombre, genero, plataforma, fecha_lanzamiento, precio, id], function (err) {
                if (err) {
                    console.error('Error al actualizar la gamen:', err);
                    return reject(err);
                }
                console.log('Gamen actualizada con ID:', id);
                resolve({ nombre, genero, plataforma, fecha_lanzamiento, precio });
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
