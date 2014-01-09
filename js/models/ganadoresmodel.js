window.GanadoresModel = Backbone.Model.extend({
    urlRoot: 'API/ganadores',
});

window.ganadores_list = Backbone.Collection.extend({
    model: GanadoresModel,
    url: 'API/ganadores',
    getModel: function (args){
        return this.where(args);
    }
});

window.ganadores_collection = new ganadores_list();