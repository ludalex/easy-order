import Ember from 'ember';
var $ = Ember.$;

export default Ember.View.extend({
	templateName: 'food/index',

	click: function(event) {
		if( $(event.target).hasClass('btn-add-food') ) {
			//$(event.target).velocity("callout.pulse");
			//.velocity({
			//     backgroundColorRed : "0",
			//     translateY: "-1.5rem",
			//     rotateZ: "-10deg"
			//   }, 100, "easeOut").velocity({
			//     rotateZ: "8deg",
			//   }, 150).velocity({
			//     translateY: "0",
			//     rotateZ: "0"
			//   }, 600, "easeOutBounce");
			//.velocity({ translateY: -30 }, { duration: 350 });
		}
	},
	didInsertElement: function() {
		//this.$().hide();
		this.$(".panel").velocity("transition.slideDownIn", { stagger: 200 });
		//this.$("div").velocity("callout.flash", { stagger: 300 });
	}
});
