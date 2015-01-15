(function(ctx){
    "use strict";
    var params, lamp;
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
            if(params.time.hour>20 || params.time.hour<7){
                //requestAnimFrame(ctx.windows.closeWindowSlow);
                //ctx.windows.closeWindowSlow();
                ctx.windows.shutter.setState(100);
            }else{
                //requestAnimFrame(ctx.windows.openWindowSlow);
                //ctx.windows.openWindowSlow();
                ctx.windows.shutter.setState(0);
            }
            if((7>params.time.hour || params.time.hour>20 || params.luxEnv<25000) && ctx.user.getData()[0].alive){
                lamp=ctx.lamps.plan.getData();
                if(Math.sqrt(Math.pow(params.user.x+ctx.getSceneOffset().x-lamp.posX, 2)+Math.pow(params.user.y+ctx.getSceneOffset().y-lamp.posY, 2))<200){
                    ctx.lamps.plan.setLux(300).updateLux();
                }else if(Math.sqrt(Math.pow(params.user.x+ctx.getSceneOffset().x-lamp.posX, 2)+Math.pow(params.user.y+ctx.getSceneOffset().y-lamp.posY, 2))>=200){
                    ctx.lamps.plan.setLux(0).updateLux();
                }
            }else{
                ctx.lamps.plan.setLux(0).updateLux();
                ctx.lamps.table.setLux(0).updateLux();
                ctx.lamps.hotte.setLux(0).updateLux();
            }
        },
        /**
            params which change based on user movements
        */
       /* controlOutputMvt: function(){
            params=ctx.params.getParams();
            lamps=ctx.lamps.getData();
            for(var i=0; i<lamps.length; i++){
                if(Math.sqrt(Math.pow(ctx.user.getData()[ctx.user.getActiveUser()].el.offset().left-lamps[i].el.offset().left, 2)+Math.pow(ctx.user.getData()[0].el.offset().top-lamps[i].el.offset().top, 2))<200 && !ctx.lamps.getData()[0].active){
                    requestAnimFrame(ctx.lamps.openLampsSlow);
                    ctx.lamps.openLampsSlow();
                }else if(Math.sqrt(Math.pow(ctx.user.getData()[ctx.user.getActiveUser()].el.offset().left-lamps[i].el.offset().left, 2)+Math.pow(ctx.user.getData()[0].el.offset().top-lamps[i].el.offset().top, 2))>=200 && ctx.lamps.getData()[0].active){
                    requestAnimFrame(ctx.lamps.closeLampsSlow);
                    ctx.lamps.closeLampsSlow();
                }
            }
        }*/
    };
    ctx.controller=controller;
    var self=controller;
})(app);