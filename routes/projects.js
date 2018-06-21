const express = require('express');
const indicative = require('indicative');
const router = express.Router();

const getUserId = (req) => {
    const userId = 1; //hardcoded untill we have login

    return userId;
}

router.get('/', function (req, res, next) {
    const db = req.app.locals.db;
    const selectQuery = 'SELECT * FROM projects WHERE owner_id = ?';

    db.all(selectQuery, [getUserId(req)], (err, result) => {
        if (err) throw err;

        res.json(result);
    });
});

router.post('/', function (req, res, next) {
    const db = req.app.locals.db;
    const project = req.body;

    indicative.validate(project, {
        name: 'required',
        description: 'required|min:5|max:300'
    })
    .then(() => {
        const query = 'INSERT INTO projects (name, description, owner_id) VALUES(?, ?, ?)';

        db.run(query, [project.name, project.description, getUserId(req)], function (err, result) {
            if (err) throw err;

            project.id = this.lastID;
            const uri = req.baseUrl + '/' + project.id;

            res.location(uri)
                .status(201)
                .json(project);
        });
    });
})

module.exports = app;