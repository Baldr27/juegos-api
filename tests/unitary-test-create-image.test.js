/*import { expect } from 'chai';
import request from 'supertest';
import express from 'express';
import imageRoutes from '../routes/ImageRoutes.js';

const app = express();
app.use(express.json());
app.use('/images', imageRoutes);

describe('unitary test for create image', () => {
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

    it('No debería permitir guardar una imagen si algún campo obligatorio falta', (done) => {
    const image = {
        url: "", // Falta el URL
        format: "jpeg",
        resolution: "1024x768",
        title: "Imagen sin URL",
        tags: ["tag1", "tag2"]
    };

    ImageModel.saveImage(image)
        .then(() => {
            done(new Error('Debería haber fallado la validación.'));
        })
        .catch((err) => {
            expect(err.status).to.equal(400);
            expect(err.message).to.include('Faltan campos obligatorios o están vacíos: url');
            done();
        });
});


    
});*/