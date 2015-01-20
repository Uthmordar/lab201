(function(ctx){
    "use strict";
    var data, count, $input, $chaud, $froid,
    valMax, valMin, moy, diff, $container=$('.circle.temperature'), $slider=$('#slider_temperature'), sliderW2=$slider.width()/2, sliderH2=$slider.height()/2, radius=70, deg=80, elP=$container.offset(), elPos={ x: elP.left, y: elP.top}, X=0, Y=0, mdown=false, mPos={x: elPos.x, y: elPos.y}, atan=Math.atan2(mPos.x-radius, mPos.y-radius);

    var inside={
        // Application Constructor
        initialize: function(data){
            $chaud=$('#chaud');
            $froid=$('#froid');
            $input=$('#temp_int_input');
            valMax=parseInt($input.attr('max'));
            valMin=parseInt($input.attr('min'));
            moy=(valMax+valMin)/2;
            diff=Math.abs(valMax-valMin);
            self.setData(data);

            X = Math.round(radius* Math.sin(deg*Math.PI/180));    
            Y = Math.round(radius*  -Math.cos(deg*Math.PI/180));
            $slider.css({ left: X+radius-sliderW2, top: Y+radius-sliderH2 });
            self.setTemperature(deg*(diff/360)+valMin);
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
                self.setTemperature($(this).val()).updateTemperature();
            });
            /* range temp int */          
            $container
            .mousedown(function (e){mdown=true;})
            .mouseup(function (e){mdown=false;})
            .mousemove(function (e){
                if(mdown){
                    mPos = {x: e.clientX-elPos.x, y: e.clientY-elPos.y};
                    atan = Math.atan2(mPos.x-radius, mPos.y-radius);
                    deg = -atan/(Math.PI/180) + 180;
                         
                    X=Math.round(radius* Math.sin(deg*Math.PI/180));    
                    Y=Math.round(radius* -Math.cos(deg*Math.PI/180));
                    $slider.css({ left: X+radius-sliderW2, top: Y+radius-sliderH2 });
                    self.setTemperature(deg*(diff/360)+valMin).updateTemperature();
                }
            });
        },
        /**
            set temp    
        */
        setTemperature: function(val){
            $input.val(val).attr('value', val);
            data.initialT=data.t;
            data.t=val;
            window.app.params.setTempInt(val);
            return self;
        },
        /**
            update heating power value in scene
        */
        updateTemperature: function(){
            count=0;
            //requestAnimFrame(self.changeDisplayVal);
            //self.changeDisplayVal();
            self.viewTemperatureInside();
        },
        /**
            change power heating from initial value to final value in display zone
        */
        changeDisplayVal: function(){
            if(data.initialT<data.t){
                if(count+parseInt(data.$display.html())>data.t){
                    data.$display.html(data.t);
                }else{
                    requestAnimFrame(self.changeDisplayVal);
                    count+=0.1;
                    data.$display.html(Math.floor(parseInt(data.$display.html())+count));
                }
            }else{
                if(count+parseInt(data.$display.html())<data.t){
                    data.$display.html(data.t);
                }else{
                    requestAnimFrame(self.changeDisplayVal);
                    count-=0.1;
                    data.$display.html(Math.floor(parseInt(data.$display.html())+count));
                }
            }
        },
        viewTemperatureInside: function(){
            if(data.t>moy){
                $froid.css('opacity', 0);
                $chaud.css('opacity', Math.abs((data.t-moy)/(diff*0.5)));
            }else{
                $chaud.css('opacity', 0);
                $froid.css('opacity', Math.abs((data.t-moy)/(diff*0.5)));
            }
        }
    };
    ctx.inside=inside;
    var self=inside;
})(app.temperature);