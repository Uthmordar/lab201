(function(ctx){
    "use strict";
    var v, dataWidth, dataHeight, fontMax, input, output, cInput, cOutput, tInput, tOutput, inputUnit="°C", outputUnit="%", valMax=45, valMin=-15, valMaxOutput=100;

    var outside={
        // Application Constructor
        initialize: function(data){
            dataWidth=data.w;
            dataHeight=data.h;
            fontMax=data.f;

            input=Snap("#data_outside .input");
            cInput = input.circle(40, 40, 20).attr({fill: '#AA4859'});
            tInput = input.text(23, 46, "15°C").attr({fill: '#000', "font-size": "1.8rem"});

            output=Snap("#data_outside .output");
            cOutput = output.circle(40, 40, 16).attr({fill: '#49B19C'});
            tOutput = output.text(23, 46, "40%").attr({fill: '#000', "font-size": "1.8rem"});
        },
        setInput: function(val){
            v=((15+val)/Math.abs(valMax-valMin))*40;
            cInput.animate({r: v}, 500);
            tInput.attr({text: parseInt(val)+inputUnit, "font-size": parseFloat(2.4-(1- val/valMax)*0.6)+'rem'});
            return self;
        },
        setOutput: function(val){
            v=(val/valMaxOutput)*40;
            cOutput.animate({r: v}, 500);
            tOutput.attr({text: parseInt(val)+outputUnit, "font-size": parseFloat(2.4-(1-val/valMaxOutput)*0.6)+'rem'});
            return self;
        }
    };
    ctx.outside=outside;
    var self=outside;
})(app.data);