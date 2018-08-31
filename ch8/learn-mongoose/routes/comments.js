const express = require('express');
const router = express.Router();
const Comment = require('../schemas/comment');

router.get('/:id', (req, res, next) => {
  Comment.find({ commenter: req.params.id }).populate('commenter')
    .then((comments) => {
      res.json(comments);
    })
    .catch((error) => {
      console.error(error);
      next(error);
    });
});

router.post('/', (req, res, next) => {
  const post = new Comment({
    commenter: req.body.id,
    comment: req.body.comment
  });
  post.save()
    .then((result) => {
      return Comment.populate(result, { path: 'commenter' });
    })
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => {
      console.error(error);
      next(error);
    });
});

router.patch('/:id', (req, res, next) => {
  Comment.update({ _id: req.param.id}, { comment: req.body.comment })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.error(error);
      next(error);
    });
});

router.delete('/:id', (req, res, next) => {
  Comment.remove({ _id: req.param.id})
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.error(error);
      next(error);
    });
});


module.exports = router;