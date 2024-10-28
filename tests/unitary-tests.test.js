import { describe, it } from "mocha";
import { clearDatabase } from "./db-setup.test.js";
import {
    testCreateGameMissingFields,
    testCreateGameSuccessfully,
    testGetAllGames,
    testUpdateGame,
    testDeleteGame,
    createGameForTest
} from "./unitary-functions.test.js";


before((done) => {
    clearDatabase(done);
});

describe('Prueba unitaria para crear gamen', () => {
    it('Debería permitir guardar la gamen solo si todos los campos requeridos están completos', testCreateGameSuccessfully);
});

describe('Prueba unitaria para crear gamen', () => {
    it('No debería permitir crear una gamen si falta un campo obligatorio', testCreateGameMissingFields);
});

describe('Prueba unitaria para obtener gamenes', () => {
    it('Debería obtener todas las imágenes', testGetAllGames);
});

describe('Prueba unitaria para actualizar gamen', () => {
    //primero se debe crear una gamen para poder actualizarla
    createGameForTest();
    it('Debería actualizar una gamen existente', testUpdateGame);
});

describe('Prueba unitaria para eliminar imágen', () => {
    //primero se debe crear una gamen para poder eliminarla
    createGameForTest();
    it('Debería eliminar una gamen existente', testDeleteGame);
});