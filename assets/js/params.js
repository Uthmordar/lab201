(function(ctx){
    "use strict";
    var params={
        windowOpen: 0,
        time: 0,
        luxEnv: 0,
        hygrometrie: 0,
        user: {x: 0, y:0, status: 0},
        plaque: 0,
        luxHotte: 0,
        luxPlan: 0,
        luxTable: 0,
        ventilation: 0,
        tempExt: 0,
        tempInt: 0,
        chauffage: 0
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
        setTime: function(val){
            params.time=parseFloat(val);
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
        setPlaque: function(val){
            params.plaque=parseInt(val);
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
        setChauffage: function(val){
            params.chauffage=parseInt(val);
        }
    };
    ctx.params=params;
    var self=params;
})(app);