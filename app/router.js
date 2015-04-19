import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('orders', { path: '/' }, function() {
    this.route('new', { path: '/' } );
  });
  this.route('food', function() {
    this.route('index');
  });
});

export default Router;
