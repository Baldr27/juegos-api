import { expect } from 'chai';
import request from 'supertest';
import GameModel from '../models/GameModel.js';
import app from './app.test.js';

export const createGameForTest = () => {
    const game = {
        nombre: 'Sunset at the Beach',
        genero: 'Adventure',
        plataforma: 'PC',
        fecha_lanzamiento: '2023-01-15',
        precio: 19.99
    };
    return GameModel.saveGame(game);
};

// Test for successful game creation
export const testCreateGameSuccessfully = (done) => {
    try {
        request(app)
            .post('/games')
            .send({
                nombre: 'Sunset at the Beach',
                genero: 'Adventure',
                plataforma: 'PC',
                fecha_lanzamiento: '2023-01-15',
                precio: 19.99
            })
            .expect(201)
            .end((err, res) => {
                if (err) {
                    console.error('Error al guardar la gamen:', err);
                    return done(err);
                }
                console.log('Respuesta recibida:', res.body);
                expect(res.body.nombre).to.deep.equal('Sunset at the Beach');
                done();
            });
    } catch (error) {
        done(error);
    }
};

// Test for missing fields in game creation
export const testCreateGameMissingFields = (done) => {
    const game = {
        nombre: '',
        genero: 'Adventure',
        plataforma: 'PC',
        fecha_lanzamiento: '2023-01-15',
        precio: 19.99
    };

    GameModel.saveGame(game)
        .then(() => {
            done(new Error('Debería haber fallado la validación.'));
        })
        .catch((err) => {
            try {
                expect(err.status).to.equal(400);
                expect(err.message).to.include('Faltan campos obligatorios o están vacíos: nombre');
                done();
            } catch (error) {
                done(error);
            }
        });
};

// Test for fetching all games
export const testGetAllGames = (done) => {
    try {
        request(app)
            .get('/games')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    console.error('Error al obtener todas las gamens:', err);
                    return done(err);
                }
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.be.greaterThan(0);
                done();
            });
    } catch (error) {
        done(error);
    }
};

// Test for updating an existing game
export const testUpdateGame = (done) => {
    try {
        request(app).get('/games').end((err, res) => {
            if (err) return done(err);
            const gameId = res.body[0].id;
            const updatedData = {
                nombre: 'New Sunset Adventure',
                genero: 'Puzzle',
                plataforma: 'Mobile',
                fecha_lanzamiento: '2024-06-12',
                precio: 9.99
            };
            request(app)
                .put(`/games/${gameId}`)
                .send(updatedData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.nombre).to.equal(updatedData.nombre);
                    done();
                });
        });
    } catch (error) {
        done(error);
    }
};

// Test for deleting an existing game
export const testDeleteGame = (done) => {
    try {
        request(app).get('/games').end((err, res) => {
            if (err) return done(err);
            const gameId = res.body[0].id;
            request(app)
                .delete(`/games/${gameId}`)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.message).to.equal('Gamen eliminada');
                    done();
                });
        });
    } catch (error) {
        done(error);
    }
};
