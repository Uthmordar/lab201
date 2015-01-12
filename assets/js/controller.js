(function(ctx){
    "use strict";
    var controller={
        // Application Constructor
        initialize: function(){
            self.bindEvents();
        },
        bindEvents: function(){
            $('input[type="range"]').on('change', function(e){
                e.preventDefault();
                window.app.controller.controlOutput();
            });
            $('input:not([type="range"])').on('click', function(e){
                e.preventDefault();
                window.app.controller.controlOutput();
            });
        },
        controlOutput: function(){
            if($('#time_input').val()>4){
                requestAnimFrame(window.app.windows.closeWindowSlow);
                window.app.windows.closeWindowSlow();
            }else{
                requestAnimFrame(window.app.windows.openWindowSlow);
                window.app.windows.openWindowSlow();
            }
            if(($('#time_input').val()>4 || $('#darkness_input').val()>0.11) && window.app.user.getData()[0].alive){
                requestAnimFrame(window.app.lamps.openLampsSlow);
                window.app.lamps.openLampsSlow();
            }else{
                requestAnimFrame(window.app.lamps.closeLampsSlow);
                window.app.lamps.closeLampsSlow();
            }
        }
    };
    ctx.controller=controller;
    var self=controller;
})(app);