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
<<<<<<< HEAD
                window.app.controller.controlOutput();
            });
            $('input:not([type="range"])').on('click', function(e){
                e.preventDefault();
                window.app.controller.controlOutput();
            });
        },
=======
                self.controlOutput();
            });
            $('input:not([type="range"])').on('click', function(e){
                e.preventDefault();
                self.controlOutput();
            });
        },
        /**
            change output behaviour / input
        */
>>>>>>> gh-pages
        controlOutput: function(){
            if($('#time_input').val()>4){
                requestAnimFrame(window.app.windows.closeWindowSlow);
                window.app.windows.closeWindowSlow();
            }else{
                requestAnimFrame(window.app.windows.openWindowSlow);
                window.app.windows.openWindowSlow();
            }
<<<<<<< HEAD
            if(($('#time_input').val()>4 || $('#darkness_input').val()>0.11) && window.app.user.getData()[0].alive){
=======
            if(($('#time_input').val()>4 || $('#darkness_input').val()>0.19) && window.app.user.getData()[0].alive){
>>>>>>> gh-pages
                requestAnimFrame(window.app.lamps.openLampsSlow);
                window.app.lamps.openLampsSlow();
            }else{
                requestAnimFrame(window.app.lamps.closeLampsSlow);
                window.app.lamps.closeLampsSlow();
            }
<<<<<<< HEAD
=======
        },
        /**
            params which change based on user movements
        */
        controlOutputMvt: function(){
            if(Math.sqrt(Math.pow(ctx.user.getData()[ctx.user.getActiveUser()].el.offset().left-$('#lamp_1').offset().left, 2)+Math.pow(ctx.user.getData()[0].el.offset().top-$('#lamp_1').offset().top, 2))<200 && !ctx.lamps.getData()[0].active){
                requestAnimFrame(window.app.lamps.openLampsSlow);
                window.app.lamps.openLampsSlow();
            }else if(Math.sqrt(Math.pow(ctx.user.getData()[ctx.user.getActiveUser()].el.offset().left-$('#lamp_1').offset().left, 2)+Math.pow(ctx.user.getData()[0].el.offset().top-$('#lamp_1').offset().top, 2))>=200 && ctx.lamps.getData()[0].active){
                requestAnimFrame(window.app.lamps.closeLampsSlow);
                window.app.lamps.closeLampsSlow();
            }
>>>>>>> gh-pages
        }
    };
    ctx.controller=controller;
    var self=controller;
})(app);