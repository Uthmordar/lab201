(function(ctx){
    "use strict";
    var data, count, $input,
    valMax, valMin, $container=$('.circle.humidity'), $slider=$('#slider_humidity'), sliderW2=$slider.width()/2, sliderH2=$slider.height()/2, radius=70, deg=120, elP=$container.offset(), elPos={ x: elP.left, y: elP.top}, X=0, Y=0, mdown=false, mPos={x: elPos.x, y: elPos.y}, atan=Math.atan2(mPos.x-radius, mPos.y-radius);

    var hygro={
        // Application Constructor
        initialize: function(data){
            $input=$('#hygro_input');
            valMax=parseInt($input.attr('max'));
            valMin=parseInt($input.attr('min'));
            self.setData(data);

            X=Math.round(radius* Math.sin(deg*Math.PI/180));    
            Y=Math.round(radius*  -Math.cos(deg*Math.PI/180));
            $slider.css({ left: X+radius-sliderW2, top: Y+radius-sliderH2 });  
            self.setHygroValue((deg * ((valMax-valMin)/360))+valMin).updateHygro();
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
                self.setHygroValue($(this).val()).updateHygro();
            });
            /* range hygro */
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
                    self.setHygroValue((deg * ((valMax-valMin)/360))+valMin).updateHygro();
                }
            });
        },
         /**
            set heating in data
        */
        setHygroValue: function(val){
            $input.val(val).attr('val', val);
            data.initialHygro=data.hygro;
            data.hygro=val;
            ctx.params.setHygro(val);
            return self;
        },
        /**
            update heating power value in scene
        */
        updateHygro: function(){
            count=0;
            requestAnimFrame(self.changeDisplayVal);
            self.changeDisplayVal();
        },
        /**
            change power heating from initial value to final value in display zone
        */
        changeDisplayVal: function(){
            if(data.initialHygro<data.hygro){
                if(count+parseInt(data.$display.html())>data.hygro){
                    data.$display.html(data.hygro);
                }else{
                    requestAnimFrame(self.changeDisplayVal);
                    count+=0.1;
                    data.$display.html(Math.floor(parseInt(data.$display.html())+count));
                }
            }else{
                if(count+parseInt(data.$display.html())<data.hygro){
                    data.$display.html(data.hygro);
                }else{
                    requestAnimFrame(self.changeDisplayVal);
                    count-=0.1;
                    data.$display.html(Math.floor(parseInt(data.$display.html())+count));
                }
            }
        }
    };
    ctx.hygro=hygro;
    var self=hygro;
})(app);