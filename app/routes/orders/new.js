import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {

		var table = this.store.createRecord('table', { name: 'sample table'} );
		var order = this.store.createRecord('order', { name: 'sample order', table: table, price: 0, discount: 0 } );
		
		var coperto = this.store.createRecord('food', { id: 0, name: 'Cover', price: 1 });
		order.get('orderItems').createRecord({
			food: coperto,
			quantity: 1,
			price: coperto.get('price')
		});

		return order;

	},
	setupController: function(controller, model) {

		this._super(controller,model);
		var _this = this;

		// TODO: replace this with data loaded from server
		// TODO: use pushMany
		this.store.push('food', { id: 1, name: 'Marinara', category: 'Pizzeria', price: 3.5 } );
		this.store.push('food', { id: 2, name: 'Margherita', category: 'Pizzeria', price: 5 } );
		this.store.push('food', { id: 3, name: '4 Stagioni', category: 'Pizzeria', price: 5 } );
		this.store.push('food', { id: 4, name: 'Bufalina', category: 'Pizzeria', price: 5 } );

		this.store.push('food', { id: 5, name: 'Pasta al pomodoro', category: 'Ristorante', price: 5 } );
		this.store.push('food', { id: 6, name: 'Gnocchi alla sorrentina', category: 'Ristorante', price: 5 } );
		this.store.push('food', { id: 7, name: 'Risotto ai funghi', category: 'Ristorante', price: 7 } );

		this.store.push('food', { id: 8, name: 'Acqua Minerale 0.5L', category: 'Bevande', price: 1 } );
		this.store.push('food', { id: 9, name: 'Acqua Minerale 1L', category: 'Bevande', price: 1.50 } );		
		this.store.push('food', { id: 10, name: 'Heineken 0.33', category: 'Bevande', price: 2.50 } );
		this.store.push('food', { id: 11, name: 'Heineken 0.66', category: 'Bevande', price: 3.50 } );

		this.store.push('order-item-variant', { id: 0, tag: 'SENZA OLIO', category: 'Pizzeria', priceModifier: -0.3 } );
		this.store.push('order-item-variant', { id: 1, tag: 'CON PROVOLA', category: 'Pizzeria', priceModifier: 0 } );
		this.store.push('order-item-variant', { id: 2, tag: 'BEN COTTA', category: 'Pizzeria', priceModifier: 0 } );
		this.store.push('order-item-variant', { id: 3, tag: 'AL DENTE', category: 'Ristorante', priceModifier: 0 } );
		this.store.push('order-item-variant', { id: 4, tag: 'MOZZ X2',  category: 'Pizzeria', priceModifier: +0.5 } );
		this.store.push('order-item-variant', { id: 5, tag: 'SENZA TROPPO SALE', category: 'Ristorante', priceModifier: 0 } );
		this.store.push('order-item-variant', { id: 6, tag: 'SENZA PARMIG', category: 'Ristorante', priceModifier: -0.3 } );
		this.store.push('order-item-variant', { id: 7, tag: 'FRIZZANTE', category: 'Bevande', priceModifier: 0 } );
		this.store.push('order-item-variant', { id: 8, tag: 'NATURALE', category: 'Bevande', priceModifier: 0 } );
		this.store.push('order-item-variant', { id: 9, tag: 'PROSC X2',  category: 'Pizzeria', priceModifier: +0.5 } );


		var foods = this.store.find('food');
		controller.set('foods', foods );

		var variants = this.store.find('order-item-variant');
		controller.set('variants', variants );

		this.store.find('food').then( function(foods) {
			var foodCategoryIndex = 0;
			foods.forEach( function(food) {
				if( !_this.store.find('food-category').filterBy('category', food.get('category')).length ) {
					_this.store.push('food-category', { id: foodCategoryIndex++, name: food.get('category')});
				}
			});
		});


	}
});
