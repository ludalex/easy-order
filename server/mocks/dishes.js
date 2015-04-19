module.exports = function(app) {
  var express = require('express');
  var dishesRouter = express.Router();

  dishesRouter.get('/', function(req, res) {
    res.send({
      'dishes': []
    });
  });

  dishesRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  dishesRouter.get('/:id', function(req, res) {
    res.send({
      'dishes': {
        id: req.params.id
      }
    });
  });

  dishesRouter.put('/:id', function(req, res) {
    res.send({
      'dishes': {
        id: req.params.id
      }
    });
  });

  dishesRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/dishes', dishesRouter);
};
