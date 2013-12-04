window.Router = Backbone.Router.extend({
    routes: {
        '': 'home',
        'formulario': 'formulario',
        'ruleta': 'ruleta',
        'miestilo': 'miestilo',
        'felicidades': 'felicidades',
        'premios': 'premios',
        'ganadores': 'ganadores'
    },

    beforeFilter: {
        filterMethod: function() {
            
            if (!window.activeSession.isAuthorized()) {
                window.location.replace('#');
            }

            return window.activeSession.isAuthorized();
        },
        routes: {
            //only: ['categories']
            except: ['']
        }
    },

    home: function() {
        if (!this.homeView) {
            this.homeView = new HomeView();
            this.homeView.render();
        } else {
            this.homeView.delegateEvents();
        }

        cambiaVista(this.homeView.el);
    },

    formulario: function() {
        if (!this.formularioView) {
            this.formularioView = new FormularioView();
            this.formularioView.render();
        } else {
            this.formularioView.delegateEvents();
        }

        cambiaVista(this.formularioView.el, function() {
            $('input[name="first_name"]').val(window.activeSession.get('first_name'));
            $('input[name="last_name"]').val(window.activeSession.get('last_name'));
            $('input[name="email"]').val(window.activeSession.get('email'));
            $('input[name="telefono"]').val(window.activeSession.get('telefono'));
            $('input[name="celular"]').val(window.activeSession.get('celular'));
            $('input[name="comuna"]').val(window.activeSession.get('comuna'));
        });
    },

    ruleta: function() {
        if (!this.ruletaView) {
            this.ruletaView = new RuletaView();
            this.ruletaView.render();
        } else {
            this.ruletaView.delegateEvents();
        }

        cambiaVista(this.ruletaView.el, function() {
            window.wheel.init();
        });
    },

    miestilo: function() {
        if (!this.miestiloView) {
            this.miestiloView = new MiEstiloView();
            this.miestiloView.render();
        } else {
            this.miestiloView.delegateEvents();
        }

        cambiaVista(this.miestiloView.el, function() {
            $('img.estilo').attr('src', 'img/miestilo/estilos/' + window.miestilo.get('estilo') + '/' + window.miestilo.get('numero') + '.png')
            $('img.estilo').attr('src-mini', 'img/miestilo/estilos-mini/' + window.miestilo.get('estilo') + '/' + window.miestilo.get('numero') + '.png')
        });
    },

    felicidades: function() {
        if (!this.felicidadesView) {
            this.felicidadesView = new FelicidadesView();
            this.felicidadesView.render();
        } else {
            this.felicidadesView.delegateEvents();
        }

        cambiaVista(this.felicidadesView.el);
    },

    premios: function() {
        if (!this.premiosView) {
            this.premiosView = new PremiosView();
            this.premiosView.render();
        } else {
            this.premiosView.delegateEvents();
        }

        cambiaVista(this.premiosView.el);
    },

    ganadores: function() {
        if (!this.ganadoresView) {
            this.ganadoresView = new GanadoresView();
            this.ganadoresView.render();
        } else {
            this.ganadoresView.delegateEvents();
        }

        cambiaVista(this.ganadoresView.el);
    }
})

function cambiaVista(newVista, callback) {
    $("#content").fadeOut(function() {
        $("#content").html(newVista);
        if (callback) callback();
        $("#content").fadeIn();
    });
}

templateLoader.load(["HomeView", "FormularioView", "RuletaView", "MiEstiloView", "FelicidadesView", "PremiosView", "GanadoresView"],
    function () {
    app = new Router();
    Backbone.history.start();

    window.fbAsyncInit = function() {

        window.FB.init({
            appId  : fbconfig.appId,
            status : true, // check login status
            cookie : true, // enable cookies to allow the server to access the session
            xfbml  : true, // parse XFBML
            channelUrl : fbconfig.channel // channel.html file
        });

        window.FB.Canvas.setAutoGrow();

        app.homeView.preLogin();
    };

    // Load the SDK asynchronously
    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/es_LA/all.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
});


$.ajaxSetup({
    statusCode: {
        401: function(){
            // Redirec the to the login page.
            window.location.replace('#');
         
        },
        403: function() {
            // 403 -- Access denied
            window.location.replace('#');
        }
    }
});