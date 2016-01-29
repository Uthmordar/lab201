(function(ctx){
    "use strict";
    var params = {
        windowOpen: 0,
        time: {hour: 12, minute: 0, timestamp: 43200},
        luxEnv: 0,
        hygrometrie: {hygro:0, time: {low: 0, medium: 0, high: 0}},
        user: {x: 0, y:0, status: 0, time: {grill: 0, away:0}},
        grill: {power: 0, time: {low: 0, medium: 0, high: 0}},
        luxHotte: 0,
        luxPlan: 0,
        luxTable: 0,
        luxWall: 0,
        ventilation: 0,
        tempExt: 0,
        tempInt: 0,
        heating: 0,
        windows: {open: 0, shutter: 0}
    };
    var position = {
        luxHotte: {x:0, y:0},
        luxPlan: {x: 0, y:0},
        luxTable: {x: 0, y: 0},
        luxWall: {x: 0, y: 0},
        grill: {x: 0, y: 0}
    };
    var params = {
        // Application Constructor
        initialize: function(initParams){
            params  =  initParams;
        },
        setParams: function(data) {
            params  =  data;
        },
        getParams: function(){
            return params;
        },
        setWindow: function(val){
            params.windowOpen = parseInt(val);
        },
        setTime: function(hour, minute, timestamp){
            params.time.hour = parseInt(hour);
            params.time.minute = parseInt(minute);
            params.time.timestamp = timestamp;
        },
        setLuxEnv: function(val){
            params.luxEnv = parseInt(val);
        },
        setHygro: function(val){
            params.hygrometrie.hygro = parseInt(val);
        },
        setHygroTime: function(low, medium, high){
            params.hygrometrie.time.low = parseInt(low);
            params.hygrometrie.time.medium = parseInt(medium);
            params.hygrometrie.time.high = parseInt(high);
        },
        setUserPos: function(valX, valY){
            params.user.x = parseInt(valX);
            params.user.y = parseInt(valY);
        },
        setUserStatus: function(status){
            params.user.status = (status)? 1 : 0;
        },
        setUserGrillTime: function(time){
            params.user.time.grill = parseInt(time);      
        },
        setUserAwayTime: function(time){
            params.user.time.away = parseInt(time);      
        },
        setGrill: function(val){
            params.grill.power = parseInt(val);
        },
        setGrillTime: function(low, medium, high){
            params.grill.time.low = parseInt(low);
            params.grill.time.medium = parseInt(medium);
            params.grill.time.high = parseInt(high);
        },
        setLuxHotte: function(val){
            params.luxHotte = parseInt(val);
        },
        setLuxPlan: function(val){
            params.luxPlan = parseInt(val);
        },
        setLuxTable: function(val){
            params.luxTable = parseInt(val);
        },
        setLuxWall: function(val){
            params.luxWall = parseInt(val);
        },
        setVentilation: function(val){
            params.ventilation = parseInt(val);
        },
        setTempExt: function(val){
            params.tempExt = parseInt(val);
        },
        setTempInt: function(val){
            params.tempInt = parseInt(val);
        },
        setHeating: function(val){
            params.heating = parseInt(val);
        },
        setWindowsOpen: function(val){
            if(parseInt(val) <= 100 && parseInt(val) >= 0){
                params.windows.open = parseInt(val);
            }
        },
        setWindowsShutter: function(val){
            if(parseInt(val) <= 100 && parseInt(val) >= 0){
                params.windows.shutter = parseInt(val);
            }
        },
        setPositionLuxPlan: function(x, y){
            position.luxPlan.x = x - ctx.getSceneOffset().x;
            position.luxPlan.y = y - ctx.getSceneOffset().y;
        },
        setPositionLuxHotte: function(x, y){
            position.luxHotte.x = x - ctx.getSceneOffset().x;
            position.luxHotte.y = y - ctx.getSceneOffset().y;
        },
        setPositionLuxTable: function(x, y){
            position.luxTable.x = x - ctx.getSceneOffset().x;
            position.luxTable.y = y - ctx.getSceneOffset().y;
        },
        setPositionLuxWall: function(x, y){
            position.luxWall.x = x - ctx.getSceneOffset().x;
            position.luxWall.y = y - ctx.getSceneOffset().y;
        },
        setPositionGrill: function(x, y){
            position.grill.x = x - ctx.getSceneOffset().x;
            position.grill.y = y - ctx.getSceneOffset().y;
        },
        /**
            position x,y for all spacio type input : lux & grill
        */
        getPosition: function(){
            return position;
        }
    };
    ctx.params = params;
    var self = params;
})(app);