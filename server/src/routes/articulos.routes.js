const router = require('express').Router();
const pool = require('../database');

// Crear un aticulo nuevo.
router.post('/', (req, res) => {
    try {
        const { numero_registro, nombre, descripcion } = req.body;

        // Verificar si existe otro registro con mismo numero de registro.
        const query = `SELECT * FROM articulos WHERE numero_registro=${numero_registro};`;
        pool.query(query, (err, result) => {
            if (result.rows.length > 0) {
                return res.status(401).send();
            } else {
                // Despues de verificado, se crea el registro.
                pool.query(`INSERT INTO articulos (numero_registro, nombre, descripcion) VALUES (${numero_registro}, '${nombre}', '${descripcion}')`,
                    (err, result) => {
                        return res
                            .json({ mensaje: `Artículo ${numero_registro} creado.` })
                            .status(201)
                            .send();
                    })
            }
        })
    } catch (error) {
        console.log(error);
    }
});

// // Eliminar una categoría 
// router.delete('/:id', async (req, res) => {

//     const id = req.params.id;
//     const query = `DELETE FROM categorias WHERE id = ${id}`;
//     try {
//         pool.query(query, (err, result) => {
//             res.json({ mensaje: 'Registro eliminado.' });
//         })
//     }
//     catch (error) {
//         console.log(error);
//     }
// });

// // Modificar una categoría específica
// router.put('/', async (req, res) => {
//     const nuevo_nombre = req.body.nombre_categoria;
//     const id = req.body.id;
//     const query = `UPDATE categorias SET nombre_categoria ='${nuevo_nombre}' WHERE id=${id}`;

//     try {
//         pool.query(query, (err, result) => {
//             if (!err) {
//                 res
//                     .json({ mensaje: `Categoría actualizada a ${nuevo_nombre}` })
//                     .status(200)
//                     .send();
//             } else {
//                 console.log(err);
//             }
//         })
//     } catch (error) {
//         console.log(error);
//     }
// });

module.exports = router;