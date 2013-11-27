window.FormularioView = Backbone.View.extend({
	siguiente: function() {
		var el = this.el;

		$(el).find('img.btn-siguiente').fadeOut(function() {
			$(el).find('img.loader').fadeIn();
		});
	},

	events: {
		'click .btn-siguiente': 'siguiente',
    },
	initialize: function() {
		_(this).bindAll('render', 'siguiente');
	},

	render: function() {
		$(this.el).html(this.template());
		
		return this;
	}
});