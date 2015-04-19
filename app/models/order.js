import DS from 'ember-data';

var Order = DS.Model.extend({
	name: DS.attr('string'),
	orderItems: DS.hasMany('orderItem', { async: true }),
	discount: DS.attr('number'),
	totalPrice: function(){
	    // var orderItems = this.get("orderItems");
	    // return orderItems.reduce(function(previousValue, orderItem){
	    //     return previousValue + orderItem.get("price");
	    // }, 0);
		var orderItems = this.get("orderItems");
		var totalPrice = 0;
		orderItems.forEach( function(orderItem) {
			var orderItemPrice = 0, orderItemBasePrice = 0, orderItemVariantsPrice = 0;
			if ( !orderItem.get('isGift') ) {
				if( orderItem.get('hasVariants') ) {
					orderItemBasePrice += orderItem.get("price");
					orderItem.get('variants').forEach( function(orderItemVariant) {
						if ( orderItemVariant.get('priceModifier') ) {
							orderItemVariantsPrice += orderItemVariant.get('priceModifier');
						}
					});
					orderItemPrice = ( orderItemBasePrice + orderItemVariantsPrice ) * orderItem.get("quantity");
				} else {
					orderItemPrice += orderItem.get("price") * orderItem.get("quantity");
				}
			}
			totalPrice += orderItemPrice;
		});
		if( this.get("discount") ) {
			totalPrice = totalPrice - this.get("discount");
		}
		return totalPrice;
	}.property("orderItems.@each.price", "orderItems.@each.quantity", "orderItems.@each.isGift", "discount"),


});

export default Order;