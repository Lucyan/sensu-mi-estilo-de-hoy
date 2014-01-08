window.UsersView = Backbone.View.extend({
	pagina: 1,
	porpagina: 20,

	menu: function(e) {
		e.preventDefault();

		$('div#azar').hide();

		switch ($(e.currentTarget).attr('menu')) {
			case 'todos':
				this.todos();
				break;
			case 'compartieron':
				this.compartieron();
				$('div#azar').show();
				break;
			case 'ganadores':
				this.ganadores();
				break;
		}

		this.actualizarBadges();
		$('ul.menu-lateral li.active').removeClass('active');
		$(e.currentTarget).addClass('active');
	},

	todos: function() {
		var _this = this;
		$('table#datos tbody').empty();
		users_collection.each(function(model) {
			_this.printModel(model);
		});
	},

	compartieron: function() {
		var _this = this;
		$('table#datos tbody').empty();
		_.each(users_collection.getModel({compartido: 1}), function(model) {
			_this.printModel(model);
		});
	},

	ganadores: function() {
		var _this = this;
		$('table#datos tbody').empty();
		_.each(users_collection.getModel({ganador: 1}), function(model) {
			_this.printModel(model);
		});
	},

	printModel: function(model, table) {

		if (table == undefined) {
			table = 'table#datos tbody';
		}

		var display = '<tr>';

		display += '<td>';
		display += '<img src="http://graph.facebook.com/' + model.get('facebook_id') + '/picture" />&nbsp;&nbsp;&nbsp;&nbsp;';
		display += '<a href="' + model.get('link') + '" target="_blank">';
		display += model.get('first_name') + ' ' + model.get('last_name');
		display += '</a>';
		display += '</td>';

		display += '<td>';
		display += model.get('birthday');
		display += '</td>';

		display += '<td>';
		display += model.get('mail');
		display += '</td>';

		display += '<td>';
		display += model.get('telefono');
		display += '</td>';

		
		display += '<td>';
		display += model.get('comuna');
		display += '</td>';

		display += '<td>';
		display += '<div class="btn-group">';
		display += '<button type="button" class="btn btn-default ganador" data-id="' + model.get('id') + '">';
		display += (model.get('ganador')) ? 'Quitar Ganador' : 'Añadir Ganador';
		display += '</button>';
		display += '</div>';
		display += '</td>';

		display += '</tr>';

		$(table).append(display);
	},

	actualizarBadges: function() {
		$('ul.nav li[menu="todos"] a span.badge').html(users_collection.length);
		$('ul.nav li[menu="compartieron"] a span.badge').html(users_collection.getModel({compartido: 1}).length);
		$('ul.nav li[menu="ganadores"] a span.badge').html(users_collection.getModel({ganador: 1}).length);
	},

	ganador: function(e) {

		model = users_collection.get(parseInt($(e.currentTarget).attr('data-id')));
		model.toggleGanador();

		$(e.currentTarget).html((model.get('public')) ? 'Quitar Ganador' : 'Añadir Ganador');

		this.actualizarBadges();
		switch($('ul.menu-lateral li.active').attr('menu')) {
			case 'todos':
				this.todos();
				break;
			case 'compartieron':
				this.compartieron();
				break;
			case 'ganadores':
				this.ganadores();
				break;
		}
	},

	getAzar: function() {
		models = users_collection.getModel({compartido: 1, ganador: 0});
		model = models[Math.floor(Math.random() * models.length)];

		$('table#seleccionar tbody').empty();
		this.printModel(model, 'table#seleccionar tbody');
	},

	events: {
		'click ul.nav li': 'menu',
		'click button.ganador': 'ganador',
		'click div#azar button': 'getAzar'
    },
	initialize: function() {
		_(this).bindAll('render');
	},

	render: function() {
		$(this.el).html(this.template());
		
		return this;
	}
});