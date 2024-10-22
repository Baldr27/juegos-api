import { expect } from 'chai';
import request from 'supertest';
import express from 'express';
import imageRoutes from '../routes/ImageRoutes.js';
import db from '../config/db.js';

const app = express();
app.use(express.json());
app.use('/images', imageRoutes);

beforeEach((done) => {
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
                expect(res.body.length).to.equal(0);
                done();
            });
    });

    it('Debería permitir guardar la imagen en el almacenamiento local', (done) => {
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
                    console.error('Error al guardar la imagen:', err); // Log de error
                    return done(err);
                }
                console.log('Respuesta recibida:', res.body); // Log de la respuesta
                expect(res.body.url).to.deep.equal("https://example.com/image.jpg"); // Verificación de la URL
                done();
            });
    });



    it('Debería actualizar una imagen existente', (done) => {
        const imageId = 1;  // Asegúrate de usar un ID válido
        const updatedData = {
            title: 'Nueva imagen actualizada',
            url: 'https://example.com/imagen-actualizada.jpg',
            format: 'png',
            resolution: '1280x720',
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

    it('Debería eliminar una imagen existente', (done) => {
        const imageId = 1;

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
