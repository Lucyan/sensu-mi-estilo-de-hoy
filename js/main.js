window.Router = Backbone.Router.extend({
    routes: {
        '': 'home',
        'formulario': 'formulario',
        'ruleta': 'ruleta'
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
    }
})

function cambiaVista(newVista, callback) {
    $("#content").fadeOut(function() {
        $("#content").html(newVista);
        if (callback) callback();
        $("#content").fadeIn();
    });
}

templateLoader.load(["HomeView", "FormularioView", "RuletaView"],
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