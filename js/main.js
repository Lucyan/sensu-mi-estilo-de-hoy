window.Router = Backbone.Router.extend({
    routes: {
        '': 'home'
    },

    beforeFilter: {
        filterMethod: function() {
            console.log('beforeFilter');
            
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

        $("#content").html(this.homeView.el);
    }
})

templateLoader.load(["HomeView"],
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