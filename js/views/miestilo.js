window.MiEstiloView = Backbone.View.extend({

	compartir: function() {

		var el = this.el;

		$(el).find('img.btn-compartir').fadeOut(function() {
			$(el).find('img.loader').fadeIn();

			FB.api('/me/photos', 'post', {
				message: 'mensaje compartir',
				url: fbconfig.urlSite + $(el).find('img.estilo').attr('src')
			}, function(response){
				if (!response.error) {
					response.estilo_id = window.miestilo.get('id');
					$.post(fbconfig.apiUrl + '/compartido', response, function(response) {
						if (!response.error) {
							window.location.replace('#felicidades');
						} else {
							window.location.replace('#');
						}
					});
				} else {
					$(el).find('img.loader').fadeOut(function() {
						$(el).find('img.btn-compartir').fadeIn();
					});
					alert('Error al intentar compartir, intentalo nuevamente');
				}
			});
		});
	},

	events: {
		'click .btn-compartir': 'compartir',
    },
	initialize: function() {
		_(this).bindAll('render', 'compartir');
	},

	render: function() {
		$(this.el).html(this.template());
		
		return this;
	}
});