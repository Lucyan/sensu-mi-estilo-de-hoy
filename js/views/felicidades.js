window.FelicidadesView = Backbone.View.extend({

	invitar: function() {
		FB.ui({
			method: 'apprequests',
			message: 'Selecciona a tus amigas para invitarlas a jugar "Mi estilo de hoy" de Espumante Sensus.'
		}, function(r){});
	},

	events: {
		'click .btn-invitar': 'invitar',
    },
	initialize: function() {
		_(this).bindAll('render', 'invitar');
	},

	render: function() {
		$(this.el).html(this.template());
		
		return this;
	}
});