(function(ctx){
    "use strict";
    var params={
        windowOpen: 0,
        time: {hour: 12, minute: 0, timestamp: 43200},
        luxEnv: 0,
        hygrometrie: 0,
        user: {x: 0, y:0, status: 0},
        grill: 0,
        luxHotte: 0,
        luxPlan: 0,
        luxTable: 0,
        ventilation: 0,
        tempExt: 0,
        tempInt: 0,
        heating: 0,
        windows: {open: 0, shutter: 0}
    };
    var params={
        // Application Constructor
        initialize: function(initParams){
            params=initParams;
        },
        getParams: function(){
            return params;
        },
        setWindow: function(val){
            params.windowOpen=parseInt(val);
        },
        setTime: function(hour, minute, timestamp){
            params.time.hour=parseInt(hour);
            params.time.minute=parseInt(minute);
            params.time.timestamp=timestamp;
        },
        setLuxEnv: function(val){
            params.luxEnv=parseInt(val);
        },
        setHygro: function(val){
            params.hygrometrie=parseInt(val);
        },
        setUserPos: function(valX, valY){
            params.user.x=parseInt(valX);
            params.user.y=parseInt(valY);
        },
        setUserStatus: function(status){
            params.user.status=(status)? 1 : 0;
        },
        setGrill: function(val){
            params.grill=parseInt(val);
        },
        setLuxHotte: function(val){
            params.luxHotte=parseInt(val);
        },
        setLuxPlan: function(val){
            params.luxPlan=parseInt(val);
        },
        setLuxTable: function(val){
            params.luxTable=parseInt(val);
        },
        setVentilation: function(val){
            params.ventilation=parseInt(val);
        },
        setTempExt: function(val){
            params.tempExt=parseInt(val);
        },
        setTempInt: function(val){
            params.tempInt=parseInt(val);
        },
        setHeating: function(val){
            params.heating=parseInt(val);
        },
        setWindowsOpen: function(val){
            if(parseInt(val)<=100 && parseInt(val)>=0){
                params.windows.open=parseInt(val);
            }
        },
        setWindowsShutter: function(val){
            if(parseInt(val)<=100 && parseInt(val)>=0){
                params.windows.shutter=parseInt(val);
            }
        }
    };
    ctx.params=params;
    var self=params;
})(app);