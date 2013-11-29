window.GanadoresView = Backbone.View.extend({
	volver: function() {
		window.location.replace('#');
	},

	events: {
		'click .btn-inicio': 'volver'
    },

	initialize: function() {
		_(this).bindAll('render', 'volver');
	},

	render: function() {
		$(this.el).html(this.template());
		
		return this;
	}
});