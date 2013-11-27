window.RuletaView = Backbone.View.extend({

	girar: function() {
		var el = this.el;

		if (!$(el).find('.btn-girar').hasClass('disabled')) window.wheel.spin();
	},

	events: {
		'click .btn-girar': 'girar',
    },
	initialize: function() {
		_(this).bindAll('render', 'girar');
	},

	render: function() {
		$(this.el).html(this.template());
		
		return this;
	}
});