(function(ctx){
    "use strict";
    var data, count, $input;

    var plan={
        // Application Constructor
        initialize: function(data){
            $input=$('#lux_plan_input');
            self.setData(data);
            data.posX=$('#lamp_1').offset().left;
            data.posY=$('#lamp_1').offset().top;
            window.app.params.setPositionLuxPlan(data.posX, data.posY);
            self.bindEvents();
        },
        getData: function(){
            return data;
        },
        setData: function(dataset){
            data=dataset;
        },
        bindEvents: function(){
            $input.on('change', function(e){
                e.preventDefault();
                self.setLux($(this).val()).updateLux();
            });
        },
        /**
            set workbench luminosity   
        */
        setLux: function(val){
            $input.val(val);
            data.initialLux=data.lux;
            data.lux=val;
            window.app.params.setLuxPlan(val);
            return self;
        },
        /**
            update workbench luminosity value in scene
        */
        updateLux: function(){
            count=0;
            requestAnimFrame(self.changeDisplayVal);
            self.changeDisplayVal();
        },
        /**
            change workbench luminosity from initial value to final value in display zone
        */
        changeDisplayVal: function(){
            if(data.initialLux<data.lux){
                if(count+parseInt(data.$display.html())>data.lux){
                    data.$display.html(data.lux);
                }else{
                    requestAnimFrame(self.changeDisplayVal);
                    count+=0.1;
                    data.$display.html(Math.floor(parseInt(data.$display.html())+count));
                }
            }else{
                if(count+parseInt(data.$display.html())<data.lux){
                    data.$display.html(data.lux);
                }else{
                    requestAnimFrame(self.changeDisplayVal);
                    count-=0.1;
                    data.$display.html(Math.floor(parseInt(data.$display.html())+count));
                }
            }
        }
    };
    ctx.plan=plan;
    var self=plan;
})(app.lamps);