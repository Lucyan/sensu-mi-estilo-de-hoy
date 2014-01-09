window.GanadoresView = Backbone.View.extend({

	printGanadores: function() {
		$('div#ganadores div.lista ul').empty();
		var el = this.el;

		ganadores_collection.each(function(model) {
			var display = '<li>';

			display += '<div class="imagen">';
			display += '<img src="http://graph.facebook.com/' + model.get('fbid') + '/picture?width=210&redirect=1&type=normal&height=210" />';
			display += '</div>';

			display += '<div class="texto">';
			display += '<span>' + model.get('nombre') + '</span>';
			display += '<hr>';
			display += 'PREMIO: ' + model.get('premio');
			display += '</div>';

			display += '</li>';

			$(el).find('div#ganadores div.lista ul').append(display);
		})
	},

	volver: function() {
		window.location.replace('#');
	},

	events: {
		'click .btn-inicio': 'volver'
    },

	initialize: function() {
		_(this).bindAll('render', 'volver');

		var _this = this;
		ganadores_collection.fetch({
			success: function() {
				_this.printGanadores();
			}
		});
	},

	render: function() {
		$(this.el).html(this.template());
		
		return this;
	}
});