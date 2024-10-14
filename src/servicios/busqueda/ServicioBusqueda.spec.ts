import { expect } from "chai";
import "mocha";
import imagenesFiltradas from "../../mocks/imagenesFiltradas.json";
import imagenesNoFiltradas from "../../mocks/imagenesNoFiltradas.json";
import { ServicioBusqueda } from './ServicioBusqueda.ts';

describe("Pruebas de servicios de Busqueda", () => {
    it("Deberia retornar una json con una lista de imágenes que contengan el parámetro de búsqueda", () => {
        const busqueda = new ServicioBusqueda();

        const jsonEsperado = imagenesFiltradas;
        const jsonCompleto = imagenesNoFiltradas;
        const parametroDeBusqueda = "montaña playa";

        const filtradas = busqueda.filtrarImagenes(jsonCompleto, parametroDeBusqueda);

        expect(jsonEsperado).to.equal(filtradas);
    });
});
