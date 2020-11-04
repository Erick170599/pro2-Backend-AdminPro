//Ruta api/docentes

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
            .execute('stp_docentes_getall');
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
            .input('idDocente', sql.Int, req.params.id)
            .execute('stp_docentes_getbyid');
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
            .input('titulo', sql.NVarChar, req.body.titulo)
            .input('tipo', sql.NVarChar, req.body.tipo)
            .execute('stp_docentes_add');
    }).then(result => {
        res.status(201).json({
            status: "Ok",
            msg: "Docente agregado correctamente"
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
            .input('idDocente', sql.Int, req.params.id)
            .input('nombre', sql.NVarChar, req.body.nombre)
            .input('edad', sql.Int, req.body.edad)
            .input('titulo', sql.NVarChar, req.body.titulo)
            .input('tipo', sql.NVarChar, req.body.tipo)
            .execute('stp_docentes_update');
    }).then(result => {
        res.status(202).json({
            status: "Ok",
            msg: "Docente actualizado correctamente"
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
            .input('idDocente', sql.NVarChar, req.params.id)
            .execute('stp_docentes_delete');
    }).then(result => {
        res.status(200).json({
            status: "Ok",
            msg: "Docente eliminado correctamente"
        });
    }).catch(err => {
        res.json(err);
    });
});

module.exports = router;