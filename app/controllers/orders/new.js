import Ember from 'ember';
var $ = Ember.$;

export default Ember.Controller.extend({

	foodVariants: function() {
		if( this.get('variantsModal') ) {
			return this.get('variants').filterProperty( 'category', this.get('variantsModal.food').get('category') );
		} else {
			return this.get('variants');
		}
	}.property('variants.@each', 'variantsModal.food'),

	actions: {

		increaseOrderItemQuantity: function(orderItem) {
			orderItem.set('quantity', orderItem.get('quantity') + 1 );
		},

		decreaseOrderItemQuantity: function(orderItem) {
			orderItem.set('quantity', orderItem.get('quantity') - 1 );
			if ( orderItem.get('quantity') === 0 ) {
				orderItem.deleteRecord();
			}
		},

		addFoodToOrder: function(food, evt) {

			var order = this.get('model');

			// food already in the order?
			var existingOrderItem = order.get('orderItems').any( function(orderItem) {

				if( !orderItem.get('hasVariants') && orderItem.get('food').id === food.id) {
					return orderItem;
				}
			});


			if( existingOrderItem ) {
				// update quantity
				existingOrderItem.set('quantity', existingOrderItem.get('quantity') + 1 );
			} else {
				// create orderItem with food passed
				order.get('orderItems').createRecord({
					food: food,
					quantity: 1,
					price: food.get('price')
				});
			}
			console.log(food.context);
			console.log(this.context);
			console.log(evt);
			console.log(food.target);

		},

		loadVariantsModal: function(food) {
			//var foodVariants = this.store.find('order-item-variant');
			this.get('foodVariants').forEach( function(foodVariant) {
				foodVariant.set('isSelected', false);
			});

			this.set('variantsModal', Ember.Object.create() );
			this.set('variantsModal.title', "Aggiungi " + food.get('name') + " con varianti");
			//this.set('variantsModal.foodVariants', foodVariants);
			this.set('variantsModal.food', food);

			$("#variants-modal").modal('show');
		},

		selectFoodVariant: function(foodVariant) {
			foodVariant.toggleProperty('isSelected', true);
		},

		toggleOrderItemAsGift: function(orderItem) {

			orderItem.toggleProperty('isGift', true);
		},

		addFoodWithVariantToOrder: function(food) {
			
			$("#variants-modal").modal('hide');

			var foodVariants = this.get('foodVariants'); //this.get('variantsModal').get('foodVariants');
			var order = this.get('model');
			var newOrderWithVariants = order.get('orderItems').createRecord({
				food: food,
				quantity: 1,
				price: food.get('price')
			});
			var _this = this;


			foodVariants.forEach( function(foodVariant) {
				if( foodVariant.get('isSelected') ) {
					_this.store.find('order-item-variant', foodVariant.id ).then( function(orderItemVariant){
						newOrderWithVariants.get('variants').pushObject(orderItemVariant);
					});
				}
			});

		},

		removeVariantFromOrderItem: function(variant, orderItem) {
			orderItem.get('variants').findBy('variant.id', variant.id).deleteRecord();
		},

		startNewVariant: function() {
			$("#new-variant-form").show();
			$("#new-variant-text-input").focus();
			$("#new-variant-button").hide();
		},

		saveNewVariant: function(newVariantTag) {
			if (!Ember.isEmpty(newVariantTag)) {
				this.store.createRecord('order-item-variant', {
					tag: newVariantTag,
					category: this.get('variantsModal.food').get('category'),
					isSelected: true
				});
				$("#new-variant-form").hide();
				$("#new-variant-button").show();
			}
		},

		removeOrderItemFromOrder: function(orderItem) {
			orderItem.deleteRecord();			
		},

		increaseOrderDiscount: function(order) {
			if( ( order.get('totalPrice') - 0.50 ) < 0 ) {
				return;
			}			
			order.set('discount', order.get('discount') + 0.50 );
		},
		decreaseOrderDiscount: function(order) {
			if( order.get('discount') === 0) {
				return;
			}
			order.set('discount', order.get('discount') - 0.50 );
		}

	}

});
