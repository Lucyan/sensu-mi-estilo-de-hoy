window.UsersModel = Backbone.Model.extend({
    urlRoot: '../API/admin/usuarios',

    toggleGanador: function() {
    	if (this.get('ganador')) {
    		this.set({ganador: false});
    	} else {
    		this.set({ganador: true});
    	}

    	this.save();
    }
});

window.users_list = Backbone.Collection.extend({
    model: UsersModel,
    url: '../API/admin/usuarios',
    getModel: function (args){
        return this.where(args);
    }
});

window.users_collection = new users_list();