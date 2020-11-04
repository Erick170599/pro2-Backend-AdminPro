//Ruta api/materias

const Router = require('express');
const conString = require('../database/config');
const sql = require('mssql');

const router = Router();

//GET ALL
router.get('/', (req, res) => {
    sql.on('error', err => {
        console.log(err);
        res.json(err);
    });
    sql.connect(conString).then(pool => {
        return pool.request()
            .execute('stp_materias_getall');
    }).then(result => {
        res.json(result.recordset);
    }).catch(err => {
        res.json(err);
    });
});

//GET BYID
router.get('/:id', (req, res) => {
    sql.on('error', err => {
        console.log(err);
        res.json(err);
    });
    sql.connect(conString).then(pool => {
        return pool.request()
            .input('idMateria', sql.Int, req.params.id)
            .execute('stp_materias_getbyid');
    }).then(result => {
        res.json(result.recordset[0]);
    }).catch(err => {
        res.json(err);
    });
});

//ADD
router.post('/', (req, res) => {
    sql.on('error', err => {
        console.log(err);
        res.json(err);
    });
    sql.connect(conString).then(pool => {
        return pool.request()
            .input('nombre', sql.NVarChar, req.body.nombre)
            .input('horas', sql.Int, req.body.horas)
            .input('horasP', sql.Int, req.body.horasP)
            .input('horasT', sql.Int, req.body.horasT)
            .input('creditos', sql.Int, req.body.creditos)
            .execute('stp_materias_add');
    }).then(result => {
        res.status(201).json({
            status: "Ok",
            msg: "Materia agregada correctamente"
        });
    }).catch(err => {
        res.json(err);
    });
});

//UPDATE
router.put('/:id', (req, res) => {
    sql.on('error', err => {
        console.log(err);
        res.json(err);
    });
    sql.connect(conString).then(pool => {
        return pool.request()
            .input('idMateria', sql.Int, req.params.id)
            .input('nombre', sql.NVarChar, req.body.nombre)
            .input('horas', sql.Int, req.body.horas)
            .input('horasP', sql.Int, req.body.horasP)
            .input('horasT', sql.Int, req.body.horasT)
            .input('creditos', sql.Int, req.body.creditos)
            .execute('stp_materias_update');
    }).then(result => {
        res.status(202).json({
            status: "Ok",
            msg: "Materia actualizada correctamente"
        });
    }).catch(err => {
        res.json(err);
    });
});

//DELETE
router.delete('/:id', (req, res) => {
    sql.on('error', err => {
        console.log(err);
        res.json(err);
    });
    sql.connect(conString).then(pool => {
        return pool.request()
            .input('idMateria', sql.NVarChar, req.params.id)
            .execute('stp_materias_delete');
    }).then(result => {
        res.status(200).json({
            status: "Ok",
            msg: "Materia eliminada correctamente"
        });
    }).catch(err => {
        res.json(err);
    });
});

module.exports = router;