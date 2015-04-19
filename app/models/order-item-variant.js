import DS from 'ember-data';

export default DS.Model.extend({
	orderItem: DS.hasMany('order-item'),
	tag: DS.attr('string'),
	priceModifier: DS.attr('number'),
	category: DS.attr('string')
});
