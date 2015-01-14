(function(ctx){
    "use strict";
    var params, lamps;
    var controller={
        // Application Constructor
        initialize: function(){
            self.bindEvents();
        },
        bindEvents: function(){
            $('input[type="range"]').on('change', function(e){
                e.preventDefault();
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
        controlOutput: function(){
            params=ctx.params.getParams();
            if(params.time>20 || params.time<7){
                requestAnimFrame(window.app.windows.closeWindowSlow);
                window.app.windows.closeWindowSlow();
            }else{
                requestAnimFrame(window.app.windows.openWindowSlow);
                window.app.windows.openWindowSlow();
            }
            if((7>params.time || params.time>20 || params.luxEnv<25000) && window.app.user.getData()[0].alive){
                requestAnimFrame(window.app.lamps.openLampsSlow);
                window.app.lamps.openLampsSlow();
            }else{
                requestAnimFrame(window.app.lamps.closeLampsSlow);
                window.app.lamps.closeLampsSlow();
            }
        },
        /**
            params which change based on user movements
        */
        controlOutputMvt: function(){
            params=ctx.params.getParams();
            lamps=ctx.lamps.getData();
            for(var i=0; i<lamps.length; i++){
                if(Math.sqrt(Math.pow(ctx.user.getData()[ctx.user.getActiveUser()].el.offset().left-lamps[i].el.offset().left, 2)+Math.pow(ctx.user.getData()[0].el.offset().top-lamps[i].el.offset().top, 2))<200 && !ctx.lamps.getData()[0].active){
                    requestAnimFrame(window.app.lamps.openLampsSlow);
                    window.app.lamps.openLampsSlow();
                }else if(Math.sqrt(Math.pow(ctx.user.getData()[ctx.user.getActiveUser()].el.offset().left-lamps[i].el.offset().left, 2)+Math.pow(ctx.user.getData()[0].el.offset().top-lamps[i].el.offset().top, 2))>=200 && ctx.lamps.getData()[0].active){
                    requestAnimFrame(window.app.lamps.closeLampsSlow);
                    window.app.lamps.closeLampsSlow();
                }
            }
        }
    };
    ctx.controller=controller;
    var self=controller;
})(app);