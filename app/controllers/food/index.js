import Ember from 'ember';

export default Ember.Controller.extend({
	// model: function() {
	// 	return this.store.find('food');
	// },
	pizzeriaFoods: Ember.computed.filterBy('model', 'category', 'Pizzeria'),
	ristoranteFoods: Ember.computed.filterBy('model', 'category', 'Ristorante'),
	bevandeFoods: Ember.computed.filterBy('model', 'category', 'Bevande'),
});
