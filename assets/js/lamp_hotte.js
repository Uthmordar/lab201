(function(ctx){
    "use strict";
    var data, count, $input, s, viewLux, valMax;

    var hotte={
        // Application Constructor
        initialize: function(data){
            $input=$('#lux_hotte_input');
            data.posX=$('#hotte').offset().left;
            data.posY=$('#hotte').offset().top;
            valMax=$input.attr('max');
            s=Snap("#lux_hotte");
            viewLux=s.image('assets/img/scene/lux_hotte.svg', -110, -160, 500, 500).attr({'opacity': 0});
            window.app.params.setPositionLuxHotte(data.posX, data.posY);
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
            window.app.params.setLuxHotte(val);
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
            change hotte lamp luminosity from initial value to final value in display zone
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
            viewLux.animate({'opacity': (data.lux/valMax)*1.2}, 400);
        }
    };
    ctx.hotte=hotte;
    var self=hotte;
})(app.lamps);