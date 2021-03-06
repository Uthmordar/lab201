(function(ctx){
    "use strict";
    var params, positions, message;
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
            params = ctx.params.getParams();
            positions = ctx.params.getPosition();
            message = {
                params: params,
                positions: positions
            };
            message = JSON.stringify(message);
            app.socket.send(message);
            if(Math.sqrt(Math.pow(params.user.x-positions.grill.x, 2)+Math.pow(params.user.y-positions.grill.y, 2))<200){
                ctx.params.setUserGrillTime(params.user.time.grill+1);
            }else{
                ctx.params.setUserGrillTime(0);
            }
            if(params.hygrometrie.hygro<80){
                ctx.params.setHygroTime(params.hygrometrie.time.low+1, 0, 0);
            }else if(params.hygrometrie.hygro<90){
                ctx.params.setHygroTime(params.hygrometrie.time.medium+1, params.hygrometrie.time.medium+1, 0);
            }else{
                ctx.params.setHygroTime(params.hygrometrie.time.high+1, params.hygrometrie.time.high+1, params.hygrometrie.time.high+1);
            }
            if(params.grill.power<100){
                ctx.params.setGrillTime(0, 0, 0);
            }else if(params.grill.power<1000){
                ctx.params.setGrillTime(params.grill.time.low+1, 0, 0);
            }else if(params.grill.power<2000){
                ctx.params.setGrillTime(params.grill.time.medium+1, params.grill.time.medium+1, 0);
            }else{
                ctx.params.setGrillTime(params.grill.time.high+1, params.grill.time.high+1, params.grill.time.high+1);
            }
            if(params.user.status==0){
                ctx.params.setUserAwayTime(params.user.time.away+1);
            }else{
                ctx.params.setUserAwayTime(0);
            }
        },
        fromParams: function(params) {
            ctx.windows.shutter.setState(params.windows.shutter).updateState();
            /* Output lux */
            ctx.lamps.plan.setLux(params.luxPlan).updateLux();
            ctx.lamps.hotte.setLux(params.luxHotte).updateLux();
            ctx.lamps.table.setLux(params.luxTable).updateLux();
            ctx.lamps.wall.setLux(params.luxWall).updateLux();

            ctx.heating.setHeatingPower(params.heating).updateHeating();
            ctx.grill.setGrillPower(params.grill.power).updateGrill().setCursorPos(params.grill.power);

            ctx.ventilation.setDataDebit(params.ventilation).updateVentilation();
        },
        auto: function() {
            params = ctx.params.getParams();
            positions = ctx.params.getPosition();
            /** ---------------------------------------------
                             OUTPUT
                --------------------------------------------- */
            /* OUTPUT SHUTTER */
            if(params.time.hour>20 || params.time.hour<7){
                ctx.windows.shutter.setState(100).updateState();
            }else{
                ctx.windows.shutter.setState(0).updateState();
            }
            /* OUTPUT LUX */
            if((7>params.time.hour || params.time.hour>20 || params.luxEnv<25000) && ctx.user.getData()[0].alive){
                //ctx.user.say.setSay('<p><span class="strong red">IF</span> it\'s night, THEN lights will become brighter when I am near them</p>');
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
            if(params.tempInt<15 && ctx.user.getData()[0].alive){
                //ctx.user.say.setSay("<p><span class='strong red'>IF</span> it's cold outisde, THEN heating will warm me up</p>");
                if(params.tempExt<0){
                    ctx.heating.setHeatingPower(2000).updateHeating();
                }else if(params.tempExt<5){
                    ctx.heating.setHeatingPower(1000).updateHeating();
                }else if(params.tempExt<10){
                    ctx.heating.setHeatingPower(400).updateHeating();
                }else{
                    ctx.heating.setHeatingPower(0).updateHeating();
                }
            }
            if(params.user.time.grill>180 && params.grill.power==0){
                ctx.grill.setGrillPower(1500).updateGrill().setCursorPos(1500);
            }
            if(params.user.time.away>180){
                ctx.grill.setGrillPower(0).updateGrill().setCursorPos(0);
            }
            if(params.grill.time.high>180){
                if(params.hygrometrie.hygro>90 && (params.hygrometrie.time.low>180 || params.hygrometrie.time.medium>180 || params.hygrometrie.time.high>180)){
                    ctx.ventilation.setDataDebit(1000).updateVentilation();
                }else{
                    ctx.ventilation.setDataDebit(599).updateVentilation();
                }
            }else if((params.grill.time.low>180 || params.grill.time.medium>180)){
                if(params.hygrometrie.hygro>80 && (params.hygrometrie.time.low>180 || params.hygrometrie.time.medium>180)){
                    ctx.ventilation.setDataDebit(599).updateVentilation();
                }else{
                    ctx.ventilation.setDataDebit(299).updateVentilation();
                }
            }else{
                 ctx.ventilation.setDataDebit(0).updateVentilation();
            }
        }
    };
    ctx.controller=controller;
    var self=controller;
})(app);