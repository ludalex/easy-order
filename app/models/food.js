import DS from 'ember-data';

var Food = DS.Model.extend({
	name: DS.attr('string'),
	price: DS.attr('string'),
	category: DS.attr('string'),
	variants: DS.hasMany('food-variant')
});


// Food.reopenClass({
//   FIXTURES: [
//     {id: 1, name: 'Marinara', category: 'Pizzeria', price: '2' },
//     {id: 2, name: 'Margherita', category: 'Pizzeria', price: '3'},
//     {id: 3, name: 'Lasagna', category: 'Ristorante', price: '3'},
//     {id: 4, name: 'Acqua Minerale 0.5L', category: 'Bevande', price: '3'},
//   ]
// });

export default Food;
