EstiloModel = Backbone.Model.extend({
    defaults: {
        id: null,
        estilo: null,
        numero: null
    }
});

window.miestilo = new EstiloModel();