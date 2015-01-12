(function(ctx){
    "use strict";
    var data, base, calc, slow=0, slower;

    var lamps = {
        // Application Constructor
        initialize: function(slowerEl, data){
            slower=slowerEl;
            self.setData(data);
            self.bindEvents();
        },
        getData: function(){
            return data;
        },
        setData: function(dataset){
            data=dataset;
        },
        bindEvents: function() {
        },
        /** 
            close store at 60fps
        */
        openLamps: function(){
            if(data[0].state+1<data[0].nbStage){
                requestAnimFrame(window.app.lamps.openLamps);
            }
            for(var i=0; i<data.length; i++){
                calc=data[i].spriteStart-(data[i].elLength+data[i].gap)*data[i].state;
                $(data[i].el).css('background-position-x', calc);
                if(data[i].state<data[i].nbStage){
                    data[i].state+=1;
                }
            }
        },
        /** 
            close store with slow param
        */
        openLampsSlow: function(){
            if(data[slower].state<data[slower].nbStage || data[slower].slow%data[slower].speed!=0){
                requestAnimFrame(window.app.lamps.openLampsSlow);
            }
            for(var i=0; i<data.length; i++){
                data[i].slow+=1;
                if(data[i].slow%data[i].speed==0){
                    calc=data[i].spriteStart-(data[i].elLength+data[i].gap)*data[i].state;
                    $(data[i].el).css('background-position-x', calc);
                    if(data[i].state<data[i].nbStage){
                        data[i].state+=1;
                    }
                }
            }
        },
        /** 
            open store at 60fps
        */
        closeLamps: function(){
            if(data[0].state>1){
                requestAnimFrame(window.app.lamps.closeLamps);
            }
            for(var i=0; i<data.length; i++){
                calc=data[i].spriteStart-(data[i].elLength+data[i].gap) * (data[i].state);
                $(data[i].el).css('background-position-x', calc);
                if(data[i].state>0){
                    data[i].state-=1;
                }
            }
        },
        /** 
            open store with slow param
        */
        closeLampsSlow: function(){
            if(data[slower].state>0 || data[slower].slow%data[slower].speed!=0){
                requestAnimFrame(window.app.lamps.closeLampsSlow);
            }
            for(var i=0; i<data.length; i++){
                data[i].slow+=1;
                if(data[i].slow%data[i].speed==0){
                    calc=data[i].spriteStart-(data[i].elLength+data[i].gap)*data[i].state;
                    $(data[i].el).css('background-position-x', calc);
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