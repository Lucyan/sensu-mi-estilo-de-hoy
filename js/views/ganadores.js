window.GanadoresView = Backbone.View.extend({

	initialize: function() {
		_(this).bindAll('render');
	},

	render: function() {
		$(this.el).html(this.template());
		
		return this;
	}
});