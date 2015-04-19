import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	order: DS.belongsTo('order')
});
