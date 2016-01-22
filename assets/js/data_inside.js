(function(ctx){
    "use strict";
    var v, dataWidth, dataHeight, fontMax, input, output, cInput, cOutput, tInput, tOutput, inputUnit="%", outputUnit="%", valMax=3000, valMin=0, valMaxOutput=100;

    var inside={
        // Application Constructor
        initialize: function(data){
            dataWidth=data.w;
            dataHeight=data.h;
            fontMax=data.f;

            input=Snap("#data_inside .input");
            cInput = input.circle(40, 40, 40).attr({fill: '#49B19C'});
            tInput = input.text(16, 46, "100%").attr({fill: '#000', "font-size": "2.4rem"});

            output=Snap("#data_inside .output");
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
    ctx.inside=inside;
    var self=inside;
})(app.data);