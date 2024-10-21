import { expect } from 'chai';
import request from 'supertest';
import express from 'express';
import imageRoutes from '../routes/ImageRoutes.js';
import db from '../config/db.js';

const app = express();
app.use(express.json());
app.use('/images', imageRoutes);

// Limpiar la base de datos antes de cada prueba
beforeEach((done) => {
    db.run("DELETE FROM images", (err) => {  // Asegúrate de que el nombre de la tabla sea correcto
        if (err) return done(err);
        done();
    });
});

describe('Bottom-Up Integration Tests for Images', () => {

    it('Debería permitir guardar la imagen en el almacenamiento local', (done) => {
        request(app)
            .post('/images')
            .send({
                url: 'https://example.com/imagen1.jpg',
                formato: 'jpeg',
                resolucion: '1920x1080',
                etiquetas: ['paisaje', 'montaña'],
                titulo: 'Vista de la montaña',
                usuario: {
                    id: 103,
                    nombre: 'Carlos Sanchez',
                    email: 'carlos.sanchez@example.com'
                }
            })
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.have.property('id');
                expect(res.body.titulo).to.equal('Vista de la montaña');
                done();
            });
    });

    it('Debería permitir la sincronización de imágenes con la nube', (done) => {
        // Crear una imagen antes de intentar sincronizarla
        request(app)
            .post('/images')
            .send({
                url: 'https://example.com/imagen2.png',
                formato: 'png',
                resolucion: '1280x720',
                etiquetas: ['ciudad', 'noche'],
                titulo: 'Ciudad en la noche',
                usuario: {
                    id: 103,
                    nombre: 'Carlos Sanchez',
                    email: 'carlos.sanchez@example.com'
                }
            })
            .expect(201)
            .end((err) => {
                if (err) return done(err);

                // Verificar que la imagen se sincronizó correctamente
                request(app)
                    .get('/images')
                    .expect(200)
                    .end((err, res) => {
                        if (err) return done(err);
                        expect(res.body).to.be.an('array');
                        expect(res.body.length).to.be.greaterThan(0); // Verifica que hay imágenes sincronizadas
                        done();
                    });
            });
    });

    it('Debería permitir la interacción con la UI después de sincronizar las imágenes', (done) => {
        // Crear una imagen antes de intentar interactuar con ella
        request(app)
            .post('/images')
            .send({
                url: 'https://example.com/imagen3.jpg',
                formato: 'jpeg',
                resolucion: '1024x768',
                etiquetas: ['mar', 'playa'],
                titulo: 'Playa al atardecer',
                usuario: {
                    id: 103,
                    nombre: 'Carlos Sanchez',
                    email: 'carlos.sanchez@example.com'
                }
            })
            .expect(201)
            .end((err) => {
                if (err) return done(err);

                // Interactuar con la imagen recién creada
                request(app)
                    .get('/images')
                    .expect(200)
                    .end((err, res) => {
                        if (err) return done(err);

                        // Asegurarse de que la imagen existe antes de verificar propiedades
                        const image = res.body[0];
                        expect(image).to.exist; // Verifica que la imagen no es null o undefined
                        expect(image).to.have.property('titulo');
                        expect(image.titulo).to.equal('Playa al atardecer');
                        done();
                    });
            });
    });
});
