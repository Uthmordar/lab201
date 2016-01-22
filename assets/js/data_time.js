(function(ctx){
    "use strict";
    var v, dataWidth, dataHeight, fontMax, input, output, cInput, cOutput, tInput, tOutput, inputUnit="h", outputUnit="%", valMax=86400, valMaxOutput=100;

    var time={
        // Application Constructor
        initialize: function(data){
            dataWidth=data.w;
            dataHeight=data.h;
            fontMax=data.f;

            input=Snap("#data_time .input");
            cInput = input.circle(40, 40, 25).attr({fill: '#502951'});
            tInput = input.text(23, 46, "12h").attr({fill: '#FFF', "font-size": "2rem"});

            output=Snap("#data_time .output");
            cOutput = output.circle(40, 40, 20).attr({fill: '#F6A541'});
            tOutput = output.text(23, 46, "30%").attr({fill: '#000', "font-size": "1.8rem"});
        },
        /**
            val : {hour: h, minute: m, timestamp: 0}
        */
        setInput: function(val){
            return self;
            v=val.timestamp/valMax;
            cInput.animate({r: v*40}, 10);
            tInput.attr({text: val.hour+inputUnit, "font-size": parseFloat(2.4-(1- val.timestamp/valMax)*0.6)+'rem'});
            return self;
        },
        setOutput: function(val){
            return self;
            v=(val/valMaxOutput)*40;
            cOutput.animate({r: v}, 500);
            tOutput.attr({text: parseInt(val)+outputUnit, "font-size": parseFloat(2.4-(1-val/valMaxOutput)*0.6)+'rem'});
            return self;
        }
        
    };
    ctx.time=time;
    var self=time;
})(app.data);