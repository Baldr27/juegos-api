// crear un mapper para hacer que game pase de object a json
class GameMapper {
    static toDTO(game) {
        return {
            nombre: game.nombre,
            genero: game.genero,
            plataforma: game.plataforma,
            fecha_lanzamiento: game.fecha_lanzamiento,
            precio: game.precio
        };
    }
}

export default GameMapper;
