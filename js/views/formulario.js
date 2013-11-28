window.FormularioView = Backbone.View.extend({
	siguiente: function() {
		var el = this.el;

		$(el).find('img.btn-siguiente').fadeOut(function() {
			$(el).find('img.loader').fadeIn();
		});

		$.post(fbconfig.apiUrl + '/datos', {
			first_name: $(el).find('input[name="first_name"]').val(),
			last_name: $(el).find('input[name="last_name"]').val(),
			email: $(el).find('input[name="email"]').val(),
			telefono: $(el).find('input[name="telefono"]').val(),
			comuna: $(el).find('input[name="comuna"]').val()
		}, function(response) {
			if (!response.error) {
				window.location.replace('#ruleta');
			} else {
				$(el).find('img.loader').fadeOut(function() {
					$(el).find('img.btn-siguiente').fadeIn();
				});
				alert('Error al intentar guardar los datos, intentalo nuevamente')
			}
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