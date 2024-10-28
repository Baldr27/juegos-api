import { describe, it } from "mocha";
import { clearDatabase } from "./db-setup.test.js";
import {
    testCreateImageMissingFields,
    testCreateImageSuccessfully,
    testGetAllImages,
    testUpdateImage,
    testDeleteImage,
    createImageForTest
} from "./unitary-functions.test.js";


before((done) => {
    clearDatabase(done);
});

describe('Prueba unitaria para crear imagen', () => {
    it('Debería permitir guardar la imagen solo si todos los campos requeridos están completos', testCreateImageSuccessfully);
});

describe('Prueba unitaria para crear imagen', () => {
    it('No debería permitir crear una imagen si falta un campo obligatorio', testCreateImageMissingFields);
});

describe('Prueba unitaria para obtener imagenes', () => {
    it('Debería obtener todas las imágenes', testGetAllImages);
});

describe('Prueba unitaria para actualizar imagen', () => {
    //primero se debe crear una imagen para poder actualizarla
    createImageForTest();
    it('Debería actualizar una imagen existente', testUpdateImage);
});

describe('Prueba unitaria para eliminar imágen', () => {
    //primero se debe crear una imagen para poder eliminarla
    createImageForTest();
    it('Debería eliminar una imagen existente', testDeleteImage);
});