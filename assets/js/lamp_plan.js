(function(ctx){
    "use strict";
    var data, count, $input, s, viewLux, valMax;

    var plan={
        // Application Constructor
        initialize: function(data){
            $input=$('#lux_plan_input');
            self.setData(data);
            data.posX=$('#lux_plan').offset().left;
            data.posY=$('#lux_plan').offset().top;
            valMax=$input.attr('max');
            s=Snap("#lux_plan");
            viewLux=s.image('assets/img/scene/lux_plan.svg', 0, 0, 300, 150).attr({'opacity': 0});
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
            //requestAnimFrame(self.changeDisplayVal);
            //self.changeDisplayVal();
            self.viewLamp();
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
        },
        /**
            change luminosity in view
        */
        viewLamp: function(){
            viewLux.animate({'opacity': (data.lux/valMax)*2}, 400);
        }
    };
    ctx.plan=plan;
    var self=plan;
})(app.lamps);