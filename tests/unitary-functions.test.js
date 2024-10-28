import { expect } from 'chai';
import request from 'supertest';
import ImageModel from '../models/ImageModel.js';
import app from './app.test.js';


export const createImageForTest = () => {
    const image = {
        url: 'https://example.com/image.jpg',
        format: 'jpeg',
        resolution: '1024x768',
        title: 'Sunset at the Beach',
        tags: ['beach', 'sunset']
    };
    return ImageModel.saveImage(image);
}

// Función para probar la creación exitosa de una imagen
export const testCreateImageSuccessfully = (done) => {
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
            console.log('Respuesta recibida:', res.body);
            expect(res.body.url).to.deep.equal("https://example.com/image.jpg");
            done();
        });
};

export const testCreateImageMissingFields = (done) => {
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
};

// Prueba para obtener todas las imágenes
export const testGetAllImages = (done) => {
    request(app)
        .get('/images')
        .expect(200)
        .end((err, res) => {
            if (err) {
                console.error('Error al obtener todas las imágenes:', err);
                return done(err);
            }
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.greaterThan(0);
            done();
        });
};

// Prueba para actualizar una imagen existente
export const testUpdateImage = (done) => {
    request(app).get('/images').end((err, res) => {
        if (err) return done(err);
        const imageId = res.body[0].id;
        const updatedData = {
            title: 'Nueva imagen actualizada',
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
                if (err) return done(err);
                expect(res.body.title).to.equal(updatedData.title);
                done();
            });
    });
};

// Prueba para eliminar una imagen existente
export const testDeleteImage = (done) => {
    request(app).get('/images').end((err, res) => {
        if (err) return done(err);
        const imageId = res.body[0].id;
        request(app)
            .delete(`/images/${imageId}`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.message).to.equal('Imagen eliminada');
                done();
            });
    });
};
