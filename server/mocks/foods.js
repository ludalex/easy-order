module.exports = function(app) {
  var express = require('express');
  var foodsRouter = express.Router();

  foodsRouter.get('/', function(req, res) {
    res.send({
      'foods': []
    });
  });

  foodsRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  foodsRouter.get('/:id', function(req, res) {
    res.send({
      'foods': {
        id: req.params.id
      }
    });
  });

  foodsRouter.put('/:id', function(req, res) {
    res.send({
      'foods': {
        id: req.params.id
      }
    });
  });

  foodsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/foods', foodsRouter);
};
