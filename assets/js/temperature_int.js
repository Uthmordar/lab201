(function(ctx){
    "use strict";
    var data, count, $input, $chaud, $froid,
    valMax, valMin, moy, diff, $container, $slider, sliderW2, sliderH2, radius, deg, elP, elPos, X, Y, mdown, mPos, atan;

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
            $container=$('.circle.temperature'), $slider=$('#slider_temperature'), sliderW2=$slider.width()/2, sliderH2=$slider.height()/2, radius=70, deg=80, elP=$container.offset(), elPos={ x: elP.left, y: elP.top}, X=0, Y=0, mdown=false, mPos={x: elPos.x, y: elPos.y}, atan=Math.atan2(mPos.x-radius, mPos.y-radius);
            data.t=parseInt($input.val());
            self.setData(data);

            X = Math.round(radius* Math.sin(deg*Math.PI/180));    
            Y = Math.round(radius*  -Math.cos(deg*Math.PI/180));
            $slider.css({ left: X+radius-sliderW2, top: Y+radius-sliderH2 });
            self.setTemperature(deg*(diff/360)+valMin);
            self.bindEvents();
            self.changeDisplayVal();
        },
        resetControls: function(){
            sliderW2=$slider.width()/2, sliderH2=$slider.height()/2, elP=$container.offset(), elPos={ x: elP.left, y: elP.top}, X=0, Y=0, mdown=false, mPos={x: elPos.x, y: elPos.y}, atan=Math.atan2(mPos.x-radius, mPos.y-radius);
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
            if ($.os !== undefined && $.os.tablet === true ) {
                self.controlTablet();
            } else {
                self.controlStandard();
            }
        },
        controlStandard: function() {
            $container
            .mousedown(function (e){mdown=true;})
            .mouseup(function (e){mdown=false;})
            .mousemove(function (e){
                e.preventDefault();
                if(mdown){
                    self.controlChange(e.clientX, e.clientY);
                }
            });
        },
        controlTablet: function() {
            $container
            .on("touchmove", function(e) {
                e.preventDefault();
                self.controlChange(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
            });
        },
        controlChange: function(x, y) {
            mPos = {x: x - elPos.x, y: y - elPos.y};
            atan = Math.atan2(mPos.x-radius, mPos.y-radius);
            deg = -atan/(Math.PI/180) + 180;
                 
            X=Math.round(radius* Math.sin(deg*Math.PI/180));    
            Y=Math.round(radius* -Math.cos(deg*Math.PI/180));
            $slider.css({ left: X+radius-sliderW2, top: Y+radius-sliderH2 });
            self.setTemperature(deg*(diff/360)+valMin).updateTemperature();
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
            update T° outside value in scene
        */
        updateTemperature: function(){
            count=0;
            requestAnimFrame(self.changeDisplayVal);
            self.changeDisplayVal();
            self.viewTemperatureInside();
        },
        /**
            change T° inside from initial value to final value in display zone
        */
        changeDisplayVal: function(){
            data.$display.html(Math.floor(data.t));
            data.$display.parent().siblings('.circle').eq(0).css('border', '3px solid rgba(255,255,255,'+parseFloat(0.1+(data.t-valMin)/diff)+')');
            /*if(data.initialT<data.t){
                if(count+parseInt(data.$display.html())>data.t){
                    data.$display.html(Math.floor(data.t));
                }else{
                    requestAnimFrame(self.changeDisplayVal);
                    count+=0.1;
                    data.$display.html(Math.floor(parseInt(data.$display.html())+count));
                }
            }else{
                if(count+parseInt(data.$display.html())<data.t){
                    data.$display.html(Math.floor(data.t));
                }else{
                    requestAnimFrame(self.changeDisplayVal);
                    count-=0.1;
                    data.$display.html(Math.floor(parseInt(data.$display.html())+count));
                }
            }*/
        },
        /**
            change background T° atmosphere
        */ 
        viewTemperatureInside: function(){
            if(data.t>moy){
                $froid.css('opacity', 0);
                $chaud.css('opacity', Math.abs((data.t-moy)/(diff*0.5)));
            }else{
                $chaud.css('opacity', 0);
                $froid.css('opacity', Math.abs((data.t-moy)/(diff*0.5))*0.7);
            }
        }
    };
    ctx.inside=inside;
    var self=inside;
})(app.temperature);