const express = require('express');
const indicative = require('indicative');
const router = express.Router();

const getUserId = (req) => {
    const userId = 1; //hardcoded untill we have login

    return userId;
}

// GET project tasks
router.get('/project/:projectId', function (req, res, next) {
    const db = req.app.locals.db;

    const params = indicative.sanitize(req.params, { projectId: 'to_int' });

    const selectQuery = 'SELECT * FROM tasks t JOIN projects p ON p.id == t.projectId WHERE p.id = ?';

    db.all(selectQuery, [projectId], (err, result) => {
        if (err) throw err;

        res.json(result);
    });
});

// GET sprint tasks
router.get('/sprint/:spirntId', function (req, res, next) {
    const db = req.app.locals.db;

    const params = indicative.sanitize(req.params, { sprintId: 'to_int' });

    const selectQuery = 'SELECT * FROM tasks WHERE sprintId == sprintId';

    db.all(selectQuery, [projectId], (err, result) => {
        if (err) throw err;

        res.json(result);
    });
});

// CREATE task for project
router.post('/project/:projectId', function (req, res, next) {
    const db = req.app.locals.db;

    const params = indicative.sanitize(req.params, { projectId: 'to_int' });

    const task = req.body;

    indicative.validate(task, {
        name: 'required',
        description: 'required|min:5|max:300',
        status: 'required|integer'
    })
        .then(() => {
            const query = 'INSERT INTO tasks (name, description, status, autorId, projectId) VALUES(?, ?, ?, ?, ?)';

            db.run(query, [task.name, task.description, task.status, getUserId(), params.projectId], function (err, result) {
                if (err) throw err;

                task.id = this.lastID;
                const uri = req.baseUrl + '/' + task.id;

                res.location(uri)
                    .status(201)
                    .json(task);
            });
        });
});

// CREATE task for sprint
router.post('/sprint/:spirntId/project/:projectId', function (req, res, next) {
    const db = req.app.locals.db;

    const params = indicative.sanitize(req.params, { projectId: 'to_int', sprintId: 'to_int' });

    const task = req.body;

    indicative.validate(task, {
        name: 'required',
        description: 'required|min:5|max:300',
        status: 'required|integer'
    })
        .then(() => {

            const query = 'INSERT INTO tasks (name, description, status, autorId, projectId, sprintId) VALUES(?, ?, ?, ?, ?, ?)';

            db.run(query, [task.name, task.description, task.status, getUserId(), params.projectId, params.sprintId], function (err, result) {
                if (err) throw err;

                task.id = this.lastID;
                const uri = req.baseUrl + '/' + task.id;

                res.location(uri)
                    .status(201)
                    .json(task);
            });
        });
});

router.put('/:taskId', function (req, res, next) {
    const db = req.app.locals.db;

    const params = indicative.sanitize(req.params, { taskId: 'to_int' });

    const task = req.body;

    indicative.validate(task, {
        name: 'required',
        description: 'required|min:5|max:300',
        status: 'required|integer'
    })
        .then(() => {
            const query = 'UPDATE tasks name = ?, description = ?, status = ? WHERE id = ?';

            db.run(query, [task.name, task.description, task.status, params.taskId], function (err, result) {
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