(function(ctx){
    "use strict";
    var data, count, $input,
    valMax, valMin, $container, $slider, sliderW2, sliderH2, radius, deg, elP, elPos, X, Y, mdown, mPos, atan,
    s, jauge, h;

    var ext={
        // Application Constructor
        initialize: function(data){
            $input=$('#temp_ext_input');
            valMax=parseInt($input.attr('max'));
            valMin=parseInt($input.attr('min'));
            data.t=parseInt($input.val());
            self.setData(data);
            s=Snap("#thermo_masque");
            h=35;
            jauge=s.rect(0,0,10,h*(data.t-valMin)/(valMax-valMin));
            jauge.attr({
                fill: "#FFF"
            });

            $container=$('.circle.meteorology'), $slider=$('#slider_meteorology'), sliderW2=$slider.width()/2, sliderH2=$slider.height()/2, radius=70, deg=180, elP=$container.offset(), elPos={ x: elP.left, y: elP.top}, X=0, Y=0, mdown=false, mPos={x: elPos.x, y: elPos.y}, atan=Math.atan2(mPos.x-radius, mPos.y-radius);
            X = Math.round(radius* Math.sin(deg*Math.PI/180));    
            Y = Math.round(radius*  -Math.cos(deg*Math.PI/180));
            $slider.css({ left: X+radius-sliderW2, top: Y+radius-sliderH2 });      
            self.setTemperature(deg * ((valMax-valMin)/360) + valMin);
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
            /* range temp ext */
            $container
            .mousedown(function (e){mdown=true;})
            .mouseup(function (e){mdown=false;})
            .mousemove(function (e){
                if(mdown){
                    mPos = {x: e.clientX-elPos.x, y: e.clientY-elPos.y};
                    atan = Math.atan2(mPos.x-radius, mPos.y-radius);
                    deg = -atan/(Math.PI/180) + 180;
                         
                    X = Math.round(radius* Math.sin(deg*Math.PI/180));    
                    Y = Math.round(radius* -Math.cos(deg*Math.PI/180));
                    $slider.css({ left: X+radius-sliderW2, top: Y+radius-sliderH2 });
                    self.setTemperature(deg * ((valMax-valMin)/360) + valMin).updateTemperature();
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
            window.app.params.setTempExt(val);
            return self;
        },
        /**
            update T° outside value in scene
        */
        updateTemperature: function(){
            count=0;
            requestAnimFrame(self.changeDisplayVal);
            self.changeDisplayVal();
            self.viewTemperature();
            self.updateDatavis();
        },
        /**
            change T° outside from initial value to final value in display zone
        */
        changeDisplayVal: function(){
            data.$display.html(Math.floor(data.t));
            data.$display.parent().siblings('.circle').eq(0).css('border', '3px solid rgba(255,255,255,'+parseFloat(0.1+(data.t-valMin)/(valMax-valMin))+')');
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
        viewTemperature: function(){
            jauge.animate({height: 35 - h*(data.t-valMin)/(valMax-valMin)}, 300);
        },
        updateDatavis: function(){
            window.app.data.outside.setInput(data.t).setOutput(70+ Math.random() * 30);
        }
    };
    ctx.ext=ext;
    var self=ext;
})(app.temperature);