(function(ctx){
    "use strict";
    var data, base, calc, slow=0, slower;

    var windows = {
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
            $('.call-to-action.close').on('click', function(e){
                e.preventDefault();
                requestAnimFrame(window.app.windows.closeWindow);
                window.app.windows.closeWindow();
            });
            $('.call-to-action-slow.close').on('click', function(e){
                e.preventDefault();
                requestAnimFrame(window.app.windows.closeWindowSlow);
                window.app.windows.closeWindowSlow();
            });
            $('.call-to-action.open').on('click', function(e){
                e.preventDefault();
                requestAnimFrame(window.app.windows.openWindow);
                window.app.windows.openWindow();
            });
            $('.call-to-action-slow.open').on('click', function(e){
                e.preventDefault();
                requestAnimFrame(window.app.windows.openWindowSlow);
                window.app.windows.openWindowSlow();
            });
        },
        /** 
            close store at 60fps
        */
        closeWindow: function(){
            if(data[0].state+1<data[0].nbStage){
                requestAnimFrame(window.app.windows.closeWindow);
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
        closeWindowSlow: function(){
            if(data[slower].state<data[slower].nbStage || data[slower].slow%data[slower].speed!=0){
                requestAnimFrame(window.app.windows.closeWindowSlow);
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
        openWindow: function(){
            if(data[0].state>1){
                requestAnimFrame(window.app.windows.openWindow);
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
        openWindowSlow: function(){
            if(data[slower].state>0 || data[slower].slow%data[slower].speed!=0){
                requestAnimFrame(window.app.windows.openWindowSlow);
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
    ctx.windows=windows;
    var self=windows;
})(app);