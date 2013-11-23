window.HomeView = Backbone.View.extend({
	login: function() {
		var el = this.el;
		$(el).find('button.fblogin').fadeOut();
		window.activeSession.login({
			before: function () {
				$(el).find('img.loader').fadeIn();
			},
			after: function () {
				$(el).find('img.loader').fadeOut(function() {
					if (window.activeSession.isAuthorized()) {
						$(el).find('div.nombre').html(window.activeSession.get('name'));
						$(el).find('div.nombre').fadeIn();
					} else {
						$(el).find('button.fblogin').fadeIn();
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
						$(el).find('div.nombre').html(window.activeSession.get('name'));
						$(el).find('div.nombre').fadeIn();
					} else {
						$(el).find('button.fblogin').fadeIn();
					}
				});
			}
		}, false);
	},

	events: {
		'click .fblogin': 'login'
    },
	initialize: function() {
		_(this).bindAll('login', 'render');
	},

	render: function() {
		$(this.el).html(this.template());
		
		return this;
	}
});