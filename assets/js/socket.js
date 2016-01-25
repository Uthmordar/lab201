(function(ctx){
    "use strict";
    var ws, data;

    var socket = {
        // Application Constructor
        initialize: function(socketAddr){
           ws = new WebSocket(socketAddr); 
           self.bind();
        },
        bind: function() {
            self.onOpen();
            self.onClose();
            self.onMessage();
        },
        onOpen: function() {
            ws.onopen = function() {
                console.log("Socket open");
            }
        },
        onClose: function() {
            ws.onclose = function(e) {
                console.log("Socket close");
            }
        },
        onMessage: function() {
            ws.onmessage = function(e) {
                data = JSON.parse(e.data);
                if (data.params !== undefined && !window.app.isAuto()) {
                    app.params.setParams(data.params);
                    app.controller.fromParams(data.params);
                } else {
                    app.controller.auto();
                }
                if (data.say !== undefined) {
                    ctx.user.say.setSay(data.say);
                } else {
                    ctx.user.say.silent();
                }
            }
        },
        send: function(msg) {
            ws.send(msg);
        }
    }
    ctx.socket = socket;
    var self = socket;
})(app);