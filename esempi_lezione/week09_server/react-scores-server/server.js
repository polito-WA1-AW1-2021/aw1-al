'use strict';

const express = require('express');
const morgan = require('morgan'); // logging middleware
const {check, validationResult} = require('express-validator'); // validation middleware
const dao = require('./dao'); // module for accessing the DB


// init express
const app = express();
const port = 3001;

// set-up the middlewares
app.use(morgan('dev'));
app.use(express.json());

/*** APIs ***/
/*
Bozza possibili API

GET /api/courses
GET /api/courses/:code
GET /api/exams
POST /api/exams    ricevera' un body con il contenuto dell'esame,  ci restituira' eventualmente l'ID
     esempio: ricevo {code: , score: , date: }   restituisco: {id: ,  code: , score: , date: }

PUT  /api/exams/:code    idem,   di solito restituisce l'oggetto cosi' come modificato
DELETE /api/exams/:code    
*/

// GET /api/courses
app.get('/api/courses', async (req, res) => {
    try {
        const courses = await dao.listCourses();
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).end();
    }
})

// GET /api/exams
app.get('/api/exams', async (req, res) => {
    dao.listExams()
        .then((exams) => res.json(exams))
        .catch((err) => res.status(500).json({ error: 'DB error' }))
});

app.get('/api/courses/:code', async (req, res) => {
    try {
        // ATTENZIONE MANCA VALIDAZIONE
        const result = await dao.getCourse(req.params.code);
        if (result.error)
            res.status(404).json(result);
        else
            res.status(200).json(result);
    } catch (err) {
        res.status(500).end();
    }
})


app.post('/api/exams', [
    check('score').isInt({min:18, max:31}),
    check('code').isLength({min:7, max:7}),
    check('date').isDate({format: 'YYYY-MM-DD', strictMode: true})
], async (req, res) => {
    // VALIDAZIONE FATTA!   NB: Attenzione a quanto inserito in DB prima della validazione
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()})
    }
    const exam = {
        code: req.body.code,
        date: req.body.date,
        score: req.body.score,
    };
    try {
        await dao.createExam(exam);
        res.status(201).end();
    } catch (err) {
        res.status(503).json({ error: `Database error during the update of exam ${exam.code}.` });
    }

})



// Activate the server
app.listen(port, () => {
    console.log(`react-score-server listening at http://localhost:${port}`);
});