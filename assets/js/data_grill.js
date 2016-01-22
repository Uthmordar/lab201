(function(ctx){
    "use strict";
    var v, dataWidth, dataHeight, fontMax, input, output, cInput, cOutput, tInput, tOutput, inputUnit="W", outputUnit="%", valMax=3000, valMin=0, valMaxOutput=100;

    var grill={
        // Application Constructor
        initialize: function(data){
            dataWidth=data.w;
            dataHeight=data.h;
            fontMax=data.f;

            input=Snap("#data_grill .input");
            cInput = input.circle(40, 40, 0).attr({fill: '#EB5B5C'});
            tInput = input.text(15, 46, "0W").attr({fill: '#000', "font-size": "2rem"});

            output=Snap("#data_grill .output");
            cOutput = output.circle(40, 40, 25).attr({fill: '#1D89AA'});
            tOutput = output.text(23, 46, "70%").attr({fill: '#000', "font-size": "1.8rem"});
        },
        setInput: function(val){
            return self;
            v=(val/valMax)*40;
            cInput.animate({r: v}, 500);
            tInput.attr({text: parseInt(val)+inputUnit, "font-size": parseFloat(2.4-(1- val/valMax)*0.6)+'rem'});
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
    ctx.grill=grill;
    var self=grill;
})(app.data);