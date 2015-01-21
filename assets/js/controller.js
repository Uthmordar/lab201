(function(ctx){
    "use strict";
    var params, positions;
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
            positions=ctx.params.getPosition();
            if(params.time.hour>20 || params.time.hour<7){
                ctx.windows.shutter.setState(100).updateState();
            }else{
                ctx.windows.shutter.setState(0).updateState();
            }
            if((7>params.time.hour || params.time.hour>20 || params.luxEnv<25000) && ctx.user.getData()[0].alive){
                if(Math.sqrt(Math.pow(params.user.x-positions.luxPlan.x, 2)+Math.pow(params.user.y-positions.luxPlan.y, 2))<200){
                    ctx.lamps.plan.setLux(300).updateLux();
                }else if(Math.sqrt(Math.pow(params.user.x-positions.luxPlan.x, 2)+Math.pow(params.user.y-positions.luxPlan.y, 2))>=200){
                    ctx.lamps.plan.setLux(100).updateLux();
                }
                if(Math.sqrt(Math.pow(params.user.x-positions.luxHotte.x, 2)+Math.pow(params.user.y-positions.luxHotte.y, 2))<250){
                    ctx.lamps.hotte.setLux(300).updateLux();
                }else if(Math.sqrt(Math.pow(params.user.x-positions.luxHotte.x, 2)+Math.pow(params.user.y-positions.luxHotte.y, 2))<400){
                    ctx.lamps.hotte.setLux(150).updateLux();
                }else if(Math.sqrt(Math.pow(params.user.x-positions.luxHotte.x, 2)+Math.pow(params.user.y-positions.luxHotte.y, 2))>=400){
                    ctx.lamps.hotte.setLux(0).updateLux();
                }
                if(Math.sqrt(Math.pow(params.user.x-positions.luxTable.x, 2)+Math.pow(params.user.y-positions.luxTable.y, 2))<350){
                    ctx.lamps.table.setLux(300).updateLux();
                }else if(Math.sqrt(Math.pow(params.user.x-positions.luxTable.x, 2)+Math.pow(params.user.y-positions.luxTable.y, 2))>=350){
                    ctx.lamps.table.setLux(100).updateLux();
                }
                if(Math.sqrt(Math.pow(params.user.x-positions.luxWall.x, 2)+Math.pow(params.user.y-positions.luxWall.y, 2))<200){
                    ctx.lamps.wall.setLux(300).updateLux();
                }else if(Math.sqrt(Math.pow(params.user.x-positions.luxWall.x, 2)+Math.pow(params.user.y-positions.luxWall.y, 2))>=200){
                    ctx.lamps.wall.setLux(100).updateLux();
                }
            }else{
                ctx.lamps.plan.setLux(0).updateLux();
                ctx.lamps.table.setLux(0).updateLux();
                ctx.lamps.hotte.setLux(0).updateLux();
                ctx.lamps.wall.setLux(0).updateLux();
            }
            /* duration of hygro treshold */
            if(params.hygrometrie.hygro<80){
                ctx.params.setHygroTime(params.hygrometrie.time.low+1, 0, 0);
            }else if(params.hygrometrie.hygro<90){
                ctx.params.setHygroTime(0, params.hygrometrie.time.medium+1, 0);
            }else{
                ctx.params.setHygroTime(0, 0, params.hygrometrie.time.high+1);
            }
            /* duration of grill activity */
            if(params.grill.power<1){
                ctx.params.setGrillTime(0, 0, 0);
            }else if(params.grill.power<1000){
                ctx.params.setGrillTime(params.grill.time.low+1, 0, 0);
            }else if(params.grill.power<2000){
                ctx.params.setGrillTime(0, params.grill.time.medium+1, 0);
            }else{
                ctx.params.setGrillTime(0, 0, params.grill.time.high+1);
            }
        }
    };
    ctx.controller=controller;
    var self=controller;
})(app);