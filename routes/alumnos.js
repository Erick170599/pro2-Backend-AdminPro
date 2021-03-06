//Ruta api/alumnos

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
            .execute('stp_alumnos_getall');
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
            .input('idAlumno', sql.Int, req.params.id)
            .execute('stp_alumnos_getbyid');
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
            .input('edad', sql.Int, req.body.edad)
            .input('sexo', sql.NVarChar, req.body.sexo)
            .input('semestre', sql.Int, req.body.semestre)
            .input('carrera', sql.NVarChar, req.body.carrera)
            .execute('stp_alumnos_add');
    }).then(result => {
        res.status(201).json({
            status: "Ok",
            msg: "Alumno agregado correctamente"
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
            .input('idAlumno', sql.Int, req.params.id)
            .input('nombre', sql.NVarChar, req.body.nombre)
            .input('edad', sql.Int, req.body.edad)
            .input('sexo', sql.NVarChar, req.body.sexo)
            .input('semestre', sql.Int, req.body.semestre)
            .input('carrera', sql.NVarChar, req.body.carrera)
            .execute('stp_alumnos_update');
    }).then(result => {
        res.status(202).json({
            status: "Ok",
            msg: "Alumno actualizado correctamente"
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
            .input('idAlumno', sql.NVarChar, req.params.id)
            .execute('stp_alumnos_delete');
    }).then(result => {
        res.status(200).json({
            status: "Ok",
            msg: "Alumno eliminado correctamente"
        });
    }).catch(err => {
        res.json(err);
    });
});

module.exports = router;