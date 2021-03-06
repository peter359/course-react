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

    db.all(selectQuery, [params.projectId], (err, result) => {
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
        })
        .catch(function(err){
            console.log(err);
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

// GET all project members
router.get('/:projectId/members', function (req, res, next) {
    const db = req.app.locals.db;
    const params = indicative.sanitize(req.params, { projectId: 'to_int' });
    const selectQuery = `SELECT u.* 
        FROM projects p 
        JOIN project_member pm ON p.id = pm.project_id 
        JOIN users u ON u.id = pm.user_id
        WHERE p.id = ?`;

    db.all(selectQuery, [params.projectId], (err, result) => {
        if (err) throw err;

        res.json(result);
    });
});

// Add member
router.post('/:projectId/members/:userId', function (req, res, next) {
    const db = req.app.locals.db;
    const params = indicative.sanitize(req.params, { projectId: 'to_int', userId: 'to_int' });
    const query = 'INSERT INTO project_member (project_id, user_id) VALUES(?, ?)';

    db.run(query, [params.projectId, params.userId], function (err, result) {
        if (err) throw err;

        // const pmId = this.lastID;
        const uri = req.baseUrl + '/' + params.projectId + '/members';

        res.location(uri)
            .status(201);
    });
});

// Remove member
router.delete('/:projectId/members/:userId', function (req, res, next) {
    const db = req.app.locals.db;
    const params = indicative.sanitize(req.params, { projectId: 'to_int', userId: 'to_int' });
    const query = 'DELETE FROM project_member WHERE project_id = ? AND user_id = ?';

    db.run(query, [params.projectId, params.userId], function (err, result) {
        if (err) throw err;

        res.json({ message: 'Member removed successfully' });
    });
});

module.exports = router;