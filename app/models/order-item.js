import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
	food: DS.belongsTo('food'),
	quantity: DS.attr('number'),
	variants: DS.hasMany('order-item-variant', { async: true }),
	hasVariants: function() {
		return Ember.isPresent(this.get('variants'));
	}.property('model.@each.variants'),
	price: DS.attr('number'),
	isGift: DS.attr('boolean')
});
