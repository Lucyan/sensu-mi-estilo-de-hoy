window.MiEstiloView = Backbone.View.extend({

	compartir: function() {

		var el = this.el;

		$(el).find('img.btn-compartir').fadeOut(function() {
			$(el).find('img.loader').fadeIn();

			var obj = {
				method: 'feed',
				link: fbconfig.urlSite,
				picture: fbconfig.urlSite + $(el).find('img.estilo').attr('src-mini'),
				name: 'Mi Estilo de Hoy',
				caption: 'Espumante Sensus',
				description:  'Ya estoy participando por un viaje a Buenos Aires con mi mejor amiga o un año de Espumante Sensus. Ingresa a nuestro juego "Mi Estilo de Hoy", gira la ruleta para predecir tu estilo, compártelo y estarás participando por increíbles premios.'
			};

			FB.ui(obj, function(response){
				if (response) {
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