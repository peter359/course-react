const express = require('express');
const indicative = require('indicative');
const router = express.Router();

router.get('/', function (req, res, next) {
  const db = req.app.locals.db;
  const selectQuery = 'SELECT * FROM users';

  db.all(selectQuery, [], (err, result) => {
    if (err) throw err;

    res.json(result);
  });
});

router.get('/:id', function (req, res, next) {
  const db = req.app.locals.db;
  const params = indicative.sanitize(req.params, { id: 'to_int' });

  const selectQuery = 'SELECT * FROM users WHERE id = ?';

  db.get(selectQuery, [params.id], (err, result) => {
    if (err) throw err;
    if (typeof result !== 'undefined') {
      res.json(result);
    }
    else {
      error(req, res, 404, `User with Id=${params.id} not found.`);
    }
  });
});

router.post('/', function (req, res, next) {
  const db = req.app.locals.db;
  const user = req.body;

  console.log('Creating user');

  indicative.validate(user, {
    username: 'required|string|min:5',
    email: 'required|string|min:5',
    password: 'required|min:6|max:30'
  })
    .then(() => {
      const query = 'INSERT INTO users (username, email, password) VALUES(?, ?, ?)';

      console.log('User will be created');

      db.run(query, [user.username, user.email, user.password], function (err, result) {
        if (err) throw err;

        user.id = this.lastID;
        const uri = req.baseUrl + '/' + user.id;

        console.log('User created');

        res.location(uri)
          .status(201)
          .json(user);
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.put('/:id', function (req, res, next) {
  const db = req.app.locals.db;

  const params = indicative.sanitize(req.params, { id: 'to_int' });

  const user = req.body;

  indicative.validate(user, {
    password: 'required|min:6|max:30'
  })
    .then(() => {
      const query = 'UPDATE users SET password = ? WHERE id = ?';

      db.run(query, [user.password, params.id], function (err, result) {
        if (err) throw err;
        if (this.changes > 0) {
          res.json({ message: 'User updated successfully' });
        }
        else {
          error(req, res, 404, `User with Id=${params.id} not found.`);
        }
      });
    });
});

module.exports = router;
