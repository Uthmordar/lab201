(function(ctx){
    "use strict";
    var data, base, calc, slow=0, slower;

    var lamps={
        // Application Constructor
        initialize: function(idSlower, data){
            slower=idSlower;
            self.setData(data);
            self.bindEvents();
        },
        getData: function(){
            return data;
        },
        setData: function(dataset){
            data=dataset;
        },
        /**
            active user near lamp
        */
        setUserNearLamp: function(id, val){
            data[id].userNear=val;
        },
        bindEvents: function(){
        },
        /** 
            open lamps
        */
        openLamps: function(){
            data[0].active=1;
            if(data[0].state+1<data[0].nbStage){
                requestAnimFrame(self.openLamps);
            }
            for(var i=0; i<data.length; i++){
                calc=data[i].spriteStart-(data[i].elLength+data[i].gap)*data[i].state;
                data[i].$el.css('background-position-x', calc);
                if(data[i].state<data[i].nbStage){
                    data[i].state+=1;
                }
            }
        },
        /** 
            open lamp
            id: data index
        */
        /*openLampsSlow: function(){
            data[0].active=1;
            if(data[slower].state<data[slower].nbStage || data[slower].slow%data[slower].speed!=0){
                requestAnimFrame(self.openLampsSlow);
            }
            for(var i=0; i<data.length; i++){
                data[i].slow+=1;
                if(data[i].slow%data[i].speed==0){
                    calc=data[i].spriteStart-(data[i].elLength+data[i].gap)*data[i].state;
                    data[i].el.css('background-position-x', calc);
                    if(data[i].state<data[i].nbStage){
                        data[i].state+=1;
                    }
                }
            }
        },*/
        openLampsSlow: function(){
            var id=0;
            data[id].active=1;
            if(data[id].state<data[id].nbStage || data[id].slow%data[id].speed!=0){
                requestAnimFrame(self.openLampsSlow);
            }
            data[id].slow+=1;
            if(data[id].slow%data[id].speed==0){
                calc=data[id].spriteStart-(data[id].elLength+data[id].gap)*data[id].state;
                data[id].$el.css('background-position-x', calc);
                if(data[id].state<data[id].nbStage){
                    data[id].state+=1;
                }
            }
        },
        /** 
            open lamp at 60fps
        */
        closeLamps: function(){
            data[0].active=0;
            if(data[0].state>1){
                requestAnimFrame(self.closeLamps);
            }
            for(var i=0; i<data.length; i++){
                calc=data[i].spriteStart-(data[i].elLength+data[i].gap) * (data[i].state);
                data[i].$el.css('background-position-x', calc);
                if(data[i].state>0){
                    data[i].state-=1;
                }
            }
        },
        /** 
            close lamp
            id: data index
        */
        closeLampsSlow: function(){
            var id=0;
            data[id].active=0;
            if(data[id].state>0 || data[id].slow%data[id].speed!=0){
                requestAnimFrame(self.closeLampsSlow);
            }
            data[id].slow+=1;
            if(data[id].slow%data[id].speed==0){
                calc=data[id].spriteStart-(data[id].elLength+data[id].gap)*data[id].state;
                data[id].$el.css('background-position-x', calc);
                if(data[id].state>0){
                    data[id].state-=1;
                }
            }
        },
        /**
            close all lamps
        */
        closeAllLampsSlow: function(){
            data[0].active=0;
            if(data[slower].state>0 || data[slower].slow%data[slower].speed!=0){
                requestAnimFrame(self.closeAllLampsSlow);
            }
            for(var i=0; i<data.length; i++){
                data[i].slow+=1;
                if(data[i].slow%data[i].speed==0){
                    calc=data[i].spriteStart-(data[i].elLength+data[i].gap)*data[i].state;
                    data[i].$el.css('background-position-x', calc);
                    if(data[i].state>0){
                        data[i].state-=1;
                    }
                }
            }
        }
    };
    ctx.lamps=lamps;
    var self=lamps;
})(app);