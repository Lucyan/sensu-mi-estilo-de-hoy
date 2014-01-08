window.HomeView = Backbone.View.extend({
	login: function() {
		var _this = this;
		var el = this.el;
		$('button.login.fblogin').fadeOut(function() {
			$('img.login.loader').fadeIn();
		});
		window.activeSession.login({
			before: function () {
				//$('img.login.loader').fadeIn();
			},
			after: function () {
				$('img.login.loader').fadeOut(function() {
					if (window.activeSession.isAuthorized()) {
						$('div.login.nombre').html(window.activeSession.get('name'));
						$('div.login.nombre').fadeIn();
						if (window.activeSession.isAdmin()) {
							$('div#home p').html('Se están obteniendo los datos, por favor espera.');
							_this.getUsers();
						} else {
							$('div#home p').html('Lo sentimos, pero no tienes acceso al sistema.');
						}
					} else {
						$('button.login.fblogin').fadeIn();
					}
				});
			}
		}, true);
	},

	preLogin: function() {
		var _this = this;
		var el = this.el;
		window.activeSession.login({
			before: function () {
				
			},
			after: function () {
				$('img.login.loader').fadeOut(function() {
					if (window.activeSession.isAuthorized()) {
						$('div.login.nombre').html(window.activeSession.get('name'));
						$('div.login.nombre').fadeIn();
						if (window.activeSession.isAdmin()) {
							$('div#home p').html('Ya estas logeado :).');
							_this.getUsers();
						} else {
							$('div#home p').html('Lo sentimos, pero no tienes acceso al sistema.');
						}
					} else {
						$('button.login.fblogin').fadeIn();
						$('div#home p').html('Haz login para comenzar.');
					}
				});
			}
		}, false);
	},

	getUsers: function() {
		users_collection.fetch({
			success: function() {
				window.location.replace('#users');
			}
		});
	},

	events: {
		'click .fblogin': 'login'
    },
	initialize: function() {
		_(this).bindAll('login', 'preLogin', 'render');
	},

	render: function() {
		$(this.el).html(this.template());
		
		return this;
	}
});