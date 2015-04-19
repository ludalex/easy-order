module.exports = function(app) {
  var express = require('express');
  var dishRouter = express.Router();

  dishRouter.get('/', function(req, res) {
    res.send({
      'dish': []
    });
  });

  dishRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  dishRouter.get('/:id', function(req, res) {
    res.send({
      'dish': {
        id: req.params.id
      }
    });
  });

  dishRouter.put('/:id', function(req, res) {
    res.send({
      'dish': {
        id: req.params.id
      }
    });
  });

  dishRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/dish', dishRouter);
};
