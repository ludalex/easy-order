module.exports = function(app) {
  var express = require('express');
  var orderRouter = express.Router();

  orderRouter.get('/', function(req, res) {
    res.send({
      'order': []
    });
  });

  orderRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  orderRouter.get('/:id', function(req, res) {
    res.send({
      'order': {
        id: req.params.id
      }
    });
  });

  orderRouter.put('/:id', function(req, res) {
    res.send({
      'order': {
        id: req.params.id
      }
    });
  });

  orderRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/order', orderRouter);
};
