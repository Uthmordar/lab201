(function(ctx){
    "use strict";
    var data, count, $input, s, viewLux, valMax;

    var wall={
        // Application Constructor
        initialize: function(data){
            $input=$('#lux_wall_input');
            data.posX=$('#lamp_wall').offset().left;
            data.posY=$('#lamp_wall').offset().top;
            valMax=$input.attr('max');
            s=Snap("#lux_wall");
            viewLux=s.image('assets/img/scene/lux_wall.svg', -187, -200, 520, 520).attr({'opacity': 0});
            window.app.params.setPositionLuxWall(data.posX, data.posY);
            self.setData(data);
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
            set luminosity   
        */
        setLux: function(val){
            $input.val(val);
            data.initialLux=data.lux;
            data.lux=val;
            window.app.params.setLuxWall(val);
            return self;
        },
        /**
            update hotte luminosity value in scene
        */
        updateLux: function(){
            count=0;
            //requestAnimFrame(self.changeDisplayVal);
            //self.changeDisplayVal();
            self.viewLamp();
        },
        /**
            change hotte luminosity from initial value to final value in display zone
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
    ctx.wall=wall;
    var self=wall;
})(app.lamps);