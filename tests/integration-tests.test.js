import { describe, it } from "mocha";
import { clearDatabase } from "./db-setup.test.js";
import {
    testCreateImageMissingFields,
    testCreateImageSuccessfully,
    testGetAllImages,
    testUpdateImage,
    testDeleteImage
} from "./unitary-functions.test.js";


before((done) => {
    clearDatabase(done);
});

describe('Pruebas de integracion para el modulo de imagen', () => {
    it('Debería permitir guardar la imagen solo si todos los campos requeridos están completos', testCreateImageSuccessfully);
    it('No debería permitir crear una imagen si falta un campo obligatorio', testCreateImageMissingFields);
    it('Debería obtener todas las imágenes', testGetAllImages);
    it('Debería actualizar una imagen existente', testUpdateImage);
    it('Debería eliminar una imagen existente', testDeleteImage);
});