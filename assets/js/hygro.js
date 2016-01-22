(function(ctx){
    "use strict";
    var data, count, $input, s, viewHumiLow, viewHumiHigh, sceneWidth, sceneHeight,
    valMax, valMin, diff, $container, $slider, sliderW2, sliderH2, radius, deg, elP, elPos, X, Y, mdown, mPos, atan;

    var hygro={
        // Application Constructor
        initialize: function(data){
            $input=$('#hygro_input');
            valMax=parseInt($input.attr('max'));
            valMin=parseInt($input.attr('min'));
            diff=Math.abs(valMax-valMin);
            data.t=parseInt($input.val());
            self.setData(data);
            $container=$('.circle.humidity'), $slider=$('#slider_humidity'), sliderW2=$slider.width()/2, sliderH2=$slider.height()/2, radius=70, deg=120, elP=$container.offset(), elPos={ x: elP.left, y: elP.top}, X=0, Y=0, mdown=false, mPos={x: elPos.x, y: elPos.y}, atan=Math.atan2(mPos.x-radius, mPos.y-radius);
            s=Snap('#humidity');
            sceneWidth=app.getSceneWidth();
            sceneHeight=app.getSceneHeight();
            viewHumiLow=s.group(s.image('assets/img/scene/humi_1.svg', -sceneWidth*0.05, -sceneHeight*0.2, 370, 370), s.image('assets/img/scene/humi_2.svg', sceneWidth*0.2, sceneHeight*0.5, 300, 300), s.image('assets/img/scene/humi_1.svg', sceneWidth*0.7, sceneHeight*0.4, 350, 350)).attr({opacity: 0});
            viewHumiHigh=s.group(s.image('assets/img/scene/humi_1.svg', 0, sceneHeight*0.25, 500, 500), s.image('assets/img/scene/humi_1.svg', sceneWidth*0.35, 0, 500, 500), s.image('assets/img/scene/humi_1.svg', sceneWidth*0.4, sceneHeight*0.45, 450, 450)).attr({opacity: 0});
            X=Math.round(radius* Math.sin(deg*Math.PI/180));    
            Y=Math.round(radius*  -Math.cos(deg*Math.PI/180));
            $slider.css({ left: X+radius-sliderW2, top: Y+radius-sliderH2 });  
            self.setHygroValue((deg * ((valMax-valMin)/360))+valMin).updateHygro();
            self.bindEvents();
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
                self.setHygroValue($(this).val()).updateHygro();
            });
            /* range hygro */
            if ($.os !== undefined && $.os.tablet === true) {
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
            .on("touchmove touchstart", function(e) {
                e.preventDefault();
                self.controlChange(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
            });
        },
        controlChange: function(x, y) {
            mPos = {x: x - elPos.x, y: y - elPos.y};
            atan = Math.atan2(mPos.x-radius, mPos.y-radius);
            deg = -atan/(Math.PI/180) + 180;
                 
            X = Math.round(radius* Math.sin(deg*Math.PI/180));    
            Y = Math.round(radius* -Math.cos(deg*Math.PI/180));
            $slider.css({ left: X+radius-sliderW2, top: Y+radius-sliderH2 });
            self.setHygroValue((deg * (diff/360))+valMin).updateHygro();
        },
         /**
            set hygro in data
        */
        setHygroValue: function(val){
            $input.val(val).attr('val', val);
            data.initialHygro=data.hygro;
            data.hygro=val;
            ctx.params.setHygro(val);
            return self;
        },
        /**
            update humidity % value in scene
        */
        updateHygro: function(){
            count=0;
            requestAnimFrame(self.changeDisplayVal);
            self.changeDisplayVal();
            self.viewHumi();
        },
        /**
            change humidity from initial value to final value in display zone
        */
        changeDisplayVal: function(){
            data.$display.html(Math.floor(data.hygro));
            data.$display.parent().siblings('.circle').eq(0).css('border', '3px solid rgba(255,255,255,'+parseFloat(0.1+(data.hygro-valMin)/diff)+')');
            /*if(data.initialHygro<data.hygro){
                if(count+parseInt(data.$display.html())>data.hygro){
                    data.$display.html(Math.floor(data.hygro));
                }else{
                    requestAnimFrame(self.changeDisplayVal);
                    count+=0.1;
                    data.$display.html(Math.floor(parseInt(data.$display.html())+count));
                }
            }else{
                if(count+parseInt(data.$display.html())<data.hygro){
                    data.$display.html(Math.floor(data.hygro));
                }else{
                    requestAnimFrame(self.changeDisplayVal);
                    count-=0.1;
                    data.$display.html(Math.floor(parseInt(data.$display.html())+count));
                }
            }*/
        },
        /**
            change humidity in view
        */
        viewHumi: function(){
            if(data.hygro>90){
                self.animateHumiGroups((data.hygro-valMin)/diff, (data.hygro-valMin)/diff);
            }else if(data.hygro>80){
                self.animateHumiGroups((data.hygro-valMin)/diff, 0);
            }else{
                self.animateHumiGroups(0, 0);
            }
        },
        /**
            animate humi groups
        */
        animateHumiGroups: function(low, high){
            viewHumiLow.animate({'opacity': low}, 500);
            viewHumiHigh.animate({'opacity': high}, 500);
        }
    };
    ctx.hygro=hygro;
    var self=hygro;
})(app);