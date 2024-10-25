// crear un mapper para hacer que image pase de objet a json
class ImageMapper {
    static toDTO(image) {
        return {
            url: image.url,
            format: image.format,
            resolution: image.resolution,
            title: image.title,
            tags: image.tags
        };
    }
}

export default ImageMapper;
