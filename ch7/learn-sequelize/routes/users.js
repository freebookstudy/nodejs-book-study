var express = require('express');
var router = express.Router();
var { User } = require('../models');

/* GET users listing. */
router.get('/', (req, res, next) => {
  User.findAll()
    .then((users) => {

    })
    .catch((err) => {
      console.error(err);
      next(err);
    })
});

router.post('/', (req, res, next) => {
  User.create({
    name: req.body.name,
    age: req.body.age,
    married: req.body.married
  })
    .then((result) => {
      console.log(result);
      res.status(201).json(result); //post 요청 성공 시 보통 200보다 201
    })
    .catch((err) => {
      console.error(err);
      next(err);
    })
});

module.exports = router;
