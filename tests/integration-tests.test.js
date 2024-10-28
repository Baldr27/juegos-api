import { describe, it } from "mocha";
import { clearDatabase } from "./db-setup.test.js";
import {
    testCreateGameMissingFields,
    testCreateGameSuccessfully,
    testGetAllGames,
    testUpdateGame,
    testDeleteGame
} from "./unitary-functions.test.js";


before((done) => {
    clearDatabase(done);
});

describe('Pruebas de integracion para el modulo de gamen', () => {
    it('Debería permitir guardar la gamen solo si todos los campos requeridos están completos', testCreateGameSuccessfully);
    it('No debería permitir crear una gamen si falta un campo obligatorio', testCreateGameMissingFields);
    it('Debería obtener todas las imágenes', testGetAllGames);
    it('Debería actualizar una gamen existente', testUpdateGame);
    it('Debería eliminar una gamen existente', testDeleteGame);
});