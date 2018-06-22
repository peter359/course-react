const express = require('express');
const indicative = require('indicative');
const router = express.Router();

const getUserId = (req) => {
    const userId = 1; //hardcoded untill we have login

    return userId;
}

// GET all projects
router.get('/', function (req, res, next) {
    const db = req.app.locals.db;
    const selectQuery = 'SELECT * FROM projects WHERE userId = ?';

    db.all(selectQuery, [getUserId(req)], (err, result) => {
        if (err) throw err;

        res.json(result);
    });
});


// GET project by id
router.get('/:projectId', function (req, res, next) {
    const db = req.app.locals.db;

    const params = indicative.sanitize(req.params, { projectId: 'to_int' });

    const selectQuery = 'SELECT * FROM projects WHERE id = ?';

    db.all(selectQuery, [projectId], (err, result) => {
        if (err) throw err;

        res.json(result);
    });
});

// CREATE project
router.post('/', function (req, res, next) {
    const db = req.app.locals.db;
    const project = req.body;

    indicative.validate(project, {
        name: 'required',
        description: 'required|min:5|max:300'
    })
        .then(() => {
            const query = 'INSERT INTO projects (name, description, userId) VALUES(?, ?, ?)';

            db.run(query, [project.name, project.description, getUserId(req)], function (err, result) {
                if (err) throw err;

                project.id = this.lastID;
                const uri = req.baseUrl + '/' + project.id;

                res.location(uri)
                    .status(201)
                    .json(project);
            });
        });
});

// UPDATE project
router.put('/:projectId', function (req, res, next) {
    const db = req.app.locals.db;

    const params = indicative.sanitize(req.params, { projectId: 'to_int' });

    const project = req.body;

    indicative.validate(project, {
        name: 'required',
        description: 'required|min:5|max:300'
    })
        .then(() => {
            const query = 'UPDATE projects (name, description) VALUES(?, ?)';

            db.run(query, [project.name, project.description], function (err, result) {
                if (err) throw err;
                if (this.changes > 0) {
                    res.json({ message: 'Project updated successfully' });
                }
                else {
                    error(req, res, 404, `Project with Id=${params.id} not found.`);
                }
            });
        });
});

module.exports = router;