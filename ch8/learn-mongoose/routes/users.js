var express = require('express');
var router = express.Router();
var User = require('../schemas/user');

/* GET users listing. */
// GET /users
router.get('/', function(req, res, next) {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      console.error(error);
      next(error);
    });
});

router.post('/', function (req, res, next) {
  const user = new User({
    name: req.body.name,
    age: req.body.age,
    married: req.body.married
  });
  user.save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => {
      console.error(error);
      next(error);
    })
});

module.exports = router;
