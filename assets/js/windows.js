(function(ctx){
    "use strict";
    var data, base, calc, slow=0, slower;

    var windows = {
        // Application Constructor
        initialize: function(slowerEl, data){
            slower=slowerEl;
            self.setData(data);
        },
        getData: function(){
            return data;
        },
        setData: function(dataset){
            data=dataset;
        },
        /** 
            close store at 60fps
        */
        closeWindow: function(){
            if(data[0].state+1<data[0].nbStage){
                requestAnimFrame(self.closeWindow);
            }
            for(var i=0; i<data.length; i++){
                calc=data[i].spriteStart-(data[i].elLength+data[i].gap)*data[i].state;
                data[i].el.css('background-position-x', calc);
                //data[i].open+=25;
                if(data[i].state<data[i].nbStage){
                    data[i].state+=1;
                }
            }
        },
        /** 
            close store with slow param
        */
        closeWindowSlow: function(){
            if(data[slower].state<data[slower].nbStage || data[slower].slow%data[slower].speed!=0){
                requestAnimFrame(self.closeWindowSlow);
            }
            for(var i=0; i<data.length; i++){
                data[i].slow+=1;
                if(data[i].slow%data[i].speed==0){
                    calc=data[i].spriteStart-(data[i].elLength+data[i].gap)*data[i].state;
                    data[i].el.css('background-position-x', calc);
                    //data[i].open+=25;
                    if(data[i].state<data[i].nbStage){
                        data[i].state+=1;
                    }
                }
            }
        },
        /** 
            open store at 60fps
        */
        openWindow: function(){
            if(data[0].state>1){
                requestAnimFrame(self.openWindow);
            }
            for(var i=0; i<data.length; i++){
                calc=data[i].spriteStart-(data[i].elLength+data[i].gap) * (data[i].state);
                data[i].el.css('background-position-x', calc);
                //data[i].open-=25;
                if(data[i].state>0){
                    data[i].state-=1;
                }
            }
        },
        /** 
            open store with slow param
        */
        openWindowSlow: function(){
            if(data[slower].state>0 || data[slower].slow%data[slower].speed!=0){
                requestAnimFrame(self.openWindowSlow);
            }
            for(var i=0; i<data.length; i++){
                data[i].slow+=1;
                if(data[i].slow%data[i].speed==0){
                    calc=data[i].spriteStart-(data[i].elLength+data[i].gap)*data[i].state;
                    data[i].el.css('background-position-x', calc);
                    //data[i].open-=25;
                    if(data[i].state>0){
                        data[i].state-=1;
                    }
                }
            }
        }
    };
    ctx.windows=windows;
    var self=windows;
})(app);