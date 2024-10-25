import { expect } from 'chai';
import request from 'supertest';
import express from 'express';
import imageRoutes from '../routes/ImageRoutes.js';
import db from '../config/db.js';

const app = express();
app.use(express.json());
app.use('/images', imageRoutes);

before((done) => {
    db.serialize(() => {
        db.run("DELETE FROM images", (err) => {
            if (err) {
                console.error('Error al limpiar la tabla de imágenes:', err); // Log de error
                return done(err);
            }
            done();
        });
    });
});

describe('Bottom-Up Integration Tests for Images', () => {

    it('Debería permitir guardar la imagen solo si todos los campos requeridos están completos', (done) => {
        request(app)
            .post('/images')
            .send({
                "url": "https://example.com/image.jpg",
                "format": "jpeg",
                "resolution": "1024x768",
                "title": "Sunset at the Beach",
                "tags": ["beach", "sunset"]
            })
            .expect(201)
            .end((err, res) => {
                if (err) {
                    console.error('Error al guardar la imagen:', err);
                    return done(err);
                }
                console.log('Respuesta recibida:', res.body); // Log de la respuesta
                expect(res.body.url).to.deep.equal("https://example.com/image.jpg"); // Verificación de la URL
                expect(res.body.format).to.equal("jpeg");
                expect(res.body.resolution).to.equal("1024x768");
                expect(res.body.title).to.equal("Sunset at the Beach");
                done();
            });
    });

    it('No debería permitir crear una imagen si falta un campo obligatorio', (done) => {
        request(app)
            .post('/images')
            .send({
                "url": "https://example.com/image.jpg",
                "format": "jpeg",
                "resolution": null,
                "title": "Sunset sin resolución",
                "tags": ["beach", "sunset"]
            })
            .expect(400)
            .end((err, res) => {
                if (err) {
                    console.error('Error esperado al no guardar la imagen:', err); // Log de error
                    return done(err);
                }
                console.log('Error esperado:', res.body.error.message); // Log del mensaje de error
                expect(res.body.error.message).to.include('Faltan campos obligatorios o están vacíos'); // Verificar mensaje de error
                done();
            });
    });

    it('Debería obtener todas las imágenes', (done) => {
        request(app)
            .get('/images')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    console.error('Error al obtener todas las imágenes:', err); // Log de error
                    return done(err);
                }
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.be.greaterThan(0); // Asegurarse de que hay imágenes
                done();
            });
    });

    it('Debería actualizar una imagen existente', (done) => {
        // Obtener todas las imágenes y obtener el id de la primera
        request(app).get('/images').end((err, res) => {
            if (err) {
                console.error('Error al obtener todas las imágenes:', err); // Log de error
                return done(err);
            }
            const imageId = res.body[0].id;
            const updatedData = {
                title: 'Nueva imagen actualizada' + Math.random(),
                url: 'https://example.com/imagen-actualizada.jpg',
                format: 'png',
                resolution: '1280x720',
                tags: ['actualizado', 'ejemplo']
            };
            request(app)
                .put(`/images/${imageId}`)
                .send(updatedData)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        console.error('Error al actualizar la imagen:', err); // Log de error
                        return done(err);
                    }
                    expect(res.body.title).to.equal(updatedData.title);
                    done();
                });
        });
    });

    it('Debería eliminar una imagen existente', (done) => {
        // Obtener todas las imágenes y obtener el id de la primera
        request(app).get('/images').end((err, res) => {
            if (err) {
                console.error('Error al obtener todas las imágenes:', err); // Log de error
                return done(err);
            }
            const imageId = res.body[0].id;

            request(app)
                .delete(`/images/${imageId}`)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        console.error('Error al eliminar la imagen:', err); // Log de error
                        return done(err);
                    }
                    expect(res.body.message).to.equal('Imagen eliminada');
                    done();
                });
        });
    });
});
