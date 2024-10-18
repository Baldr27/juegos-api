import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ruta a la base de datos SQLite
const dbPath = path.resolve(__dirname, '../database/images.db');

// Conexión a la base de datos
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al abrir la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite de imágenes.');
    }
});

// Crear las tablas en la base de datos si no existen
db.serialize(() => {
    // Crear tabla para los usuarios
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL
        )
    `);

    // Crear tabla para las imágenes
    db.run(`
        CREATE TABLE IF NOT EXISTS images (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            url TEXT NOT NULL,
            format TEXT NOT NULL,
            resolution TEXT NOT NULL,
            title TEXT,
            user_id INTEGER,
            FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL
        )
    `);

    // Crear tabla para las etiquetas
    db.run(`
        CREATE TABLE IF NOT EXISTS tags (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        )
    `);

    // Crear tabla intermedia para la relación entre imágenes y etiquetas
    db.run(`
        CREATE TABLE IF NOT EXISTS image_tags (
            image_id INTEGER,
            tag_id INTEGER,
            FOREIGN KEY (image_id) REFERENCES images (id) ON DELETE CASCADE,
            FOREIGN KEY (tag_id) REFERENCES tags (id) ON DELETE CASCADE,
            PRIMARY KEY (image_id, tag_id)
        )
    `);
});

// Función para insertar una imagen con sus detalles
const insertImage = (image) => {
    // Desestructuramos los datos de la imagen
    const { url, formato, resolucion, titulo, etiquetas, usuario } = image;

    // Inicia una transacción
    db.serialize(() => {
        // Inserta al usuario (si no existe)
        db.run(`
            INSERT OR IGNORE INTO users (id, name, email)
            VALUES (?, ?, ?)
        `, [usuario.id, usuario.nombre, usuario.email], function (err) {
            if (err) {
                console.error('Error al insertar el usuario:', err.message);
            }
        });

        // Inserta la imagen
        db.run(`
            INSERT INTO images (url, format, resolution, title, user_id)
            VALUES (?, ?, ?, ?, ?)
        `, [url, formato, resolucion, titulo, usuario.id], function (err) {
            if (err) {
                console.error('Error al insertar la imagen:', err.message);
            } else {
                const imageId = this.lastID;

                // Inserta las etiquetas
                etiquetas.forEach((etiqueta) => {
                    // Inserta la etiqueta si no existe
                    db.run(`
                        INSERT OR IGNORE INTO tags (name)
                        VALUES (?)
                    `, [etiqueta], function (err) {
                        if (err) {
                            console.error('Error al insertar la etiqueta:', err.message);
                        } else {
                            const tagId = this.lastID;

                            // Relaciona la imagen con la etiqueta
                            db.run(`
                                INSERT INTO image_tags (image_id, tag_id)
                                VALUES (?, ?)
                            `, [imageId, tagId], function (err) {
                                if (err) {
                                    console.error('Error al insertar la relación image_tags:', err.message);
                                }
                            });
                        }
                    });
                });
            }
        });
    });
};

// Ejemplo de inserción de una imagen
const imagenEjemplo = {
    id: 3,
    url: "https://example.com/imagen3.jpg",
    formato: "jpeg",
    resolucion: "1024x768",
    etiquetas: ["mar", "playa"],
    titulo: "Playa al atardecer",
    usuario: {
        id: 103,
        nombre: "Carlos Sanchez",
        email: "carlos.sanchez@example.com"
    }
};

// Insertar la imagen con sus detalles
insertImageWithDetails(imagenEjemplo);

// Exportar la base de datos para uso en otros módulos
export default db;