window.HomeView = Backbone.View.extend({
	login: function() {
		var el = this.el;
		$(el).find('.fblogin').fadeOut();
		window.activeSession.login({
			before: function () {
				$(el).find('img.loader').fadeIn();
			},
			after: function () {
				$(el).find('img.loader').fadeOut(function() {
					if (window.activeSession.isAuthorized()) {
						window.location.replace('#formulario');
					} else {
						$(el).find('.fblogin').fadeIn();
					}
				});
			}
		}, true);
	},

	preLogin: function() {
		var el = this.el;
		window.activeSession.login({
			before: function () {
				
			},
			after: function () {
				$(el).find('img.loader').fadeOut(function() {
					if (window.activeSession.isAuthorized()) {
						$(el).find('.prelogin').fadeIn();
					} else {
						$(el).find('.fblogin').fadeIn();
					}
				});
			}
		}, false);
	},

	formulario: function() {
		window.location.replace('#formulario');
	},

	events: {
		'click .fblogin': 'login',
		'click .prelogin': 'formulario'
    },
	initialize: function() {
		_(this).bindAll('login', 'render', 'preLogin', 'formulario');
	},

	render: function() {
		$(this.el).html(this.template());
		
		return this;
	}
});