SessionModel = Backbone.Model.extend({
    defaults: {
        id: null,
        third_party_id: null,
        first_name: null,
        last_name: null,
        email: null,
        telefono: null,
        celular: null,
        comuna: null,
        status: 0,
        isAdmin: false
    },
    isAuthorized: function () {
        return Boolean(this.get("third_party_id"))
    },
    isAdmin: function () {
        return Boolean(this.get("isAdmin"))
    },
    logout: function () {
        window.activeSession.id = "";
        window.activeSession.clear();
        $.post(fbconfig.apiUrl + "/logout", function (e) {})
    },
    login: function (e, t) {
        e.before && e.before();
        _session = this;
        this._onERROR = function (t) {
            e.after && e.after();
            $.post(fbconfig.apiUrl + "/logout", function (e) {})
        };
        this._onSUCCESS = function (t) {
            $.post(fbconfig.apiUrl + "/login", function (t) {
                if (t.isAdmin) {
                    _session.set({
                        isAdmin: true
                    })
                }

                _session.set({
                    first_name: t.user.first_name,
                    last_name: t.user.last_name,
                    email: t.user.mail,
                    telefono: t.user.telefono,
                    celular: t.user.celular,
                    comuna: t.user.comuna
                });

                e.after && e.after()
            })
        };
        this._getuserdata = function (e) {
            FB.api("/me?fields=third_party_id,email,first_name,last_name", function (t) {
                if (!t || t.error) {
                    e(true, t.error)
                } else {
                    e(null, t)
                }
            })
        };
        this._savesession = function (e, t) {
            if (e["third_party_id"]) {
                _session.set({
                    id: e["id"],
                    third_party_id: e["third_party_id"],
                    status: "1"
                }, {
                    silent: true
                });
                if (_session.get("email") == null) {
                    _session.set({
                        first_name: e["first_name"],
                        last_name: e["last_name"],
                        email: e["email"]
                    }, {
                        silent: true
                    });
                }
                t(null, "Everything is wonderful.")
            } else {
                t(true, "third_party_id check failed!");
                return false
            }
        };
        if (t) {
            FB.login(function (e) {
                if (e.authResponse) {
                    async.waterfall([_session._getuserdata, _session._savesession], function (e, t) {
                        e && _session._onERROR(t); !! !e && _session._onSUCCESS(t)
                    })
                } else {
                    _session._onERROR("User cancelled login or did not fully authorize.")
                }
            }, {
                scope: fbconfig.permissions
            })
        } else {
            FB.getLoginStatus(function (e) {
                if (e.authResponse) {
                    async.waterfall([_session._getuserdata, _session._savesession], function (e, t) {
                        e && _session._onERROR(t); !! !e && _session._onSUCCESS(t)
                    })
                } else {
                    _session._onERROR("User not login.")
                }
            })
        }
    }
});
window.activeSession = new SessionModel();