(function(ctx){
    "use strict";
    var data, count, $input, s, scene, plaque, colorOn, sCas, viewCas,
    valMax, $container, $slider, sliderW2, sliderH2, radius, deg, elP, elPos, X, Y, mdown, mPos, atan;

    var grill={
        // Application Constructor
        initialize: function(data){
            $input=$('#grill_input');
            data.posX=$('#grill').offset().left;
            data.posY=$('#grill').offset().top;
            valMax=parseInt($input.attr('max'));
            data.power=parseInt($input.val());
            window.app.params.setPositionGrill(data.posX, data.posY);
            s=Snap("#grill");
            colorOn='#BC3D41';
            scene=Snap.load("assets/img/scene/plaque.svg", function(loadedFragment){
                plaque=loadedFragment.selectAll("ellipse").attr({fill: colorOn, opacity: 0});
                s.append(plaque);
            });

            sCas=Snap("#casserole");
            viewCas=sCas.image('assets/img/scene/casserole.svg', 0, 0, 140, 60).attr({opacity: 0});

            self.setData(data);
            $container=$('.circle.heating'), $slider=$('#slider_heating'), sliderW2=$slider.width()/2, sliderH2=$slider.height()/2, radius=70, deg=0, elP=$container.offset(), elPos={ x: elP.left, y: elP.top}, X=0, Y=0, mdown=false, mPos={x: elPos.x, y: elPos.y}, atan=Math.atan2(mPos.x-radius, mPos.y-radius);
            X=Math.round(radius* Math.sin(deg*Math.PI/180));    
            Y=Math.round(radius*  -Math.cos(deg*Math.PI/180));
            $slider.css({ left: X+radius-sliderW2, top: Y+radius-sliderH2 });      
            self.setGrillPower(deg * (valMax/360));
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
                self.setGrillPower($(this).val()).updateGrill();
            });
            /* range grill */            
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
                    self.setGrillPower(deg * (valMax/360)).updateGrill();
                }
            });
        },
        /**
            move cursor to new val 
        */
        setCursorPos: function(val){
            deg=(val/valMax)*360;
            X = Math.round(radius* Math.sin(deg*Math.PI/180));    
            Y = Math.round(radius* -Math.cos(deg*Math.PI/180));
            $slider.css({ left: X+radius-sliderW2, top: Y+radius-sliderH2 });
            return self;
        },
        /**
            set grill power in data
        */
        setGrillPower: function(val){
            $input.val(val).attr('value', val);
            data.initialPower=data.power;
            data.power=val;
            ctx.params.setGrill(val);
            return self;
        },
        /**
            update grill power value in scene
        */
        updateGrill: function(){
            count=0;
            requestAnimFrame(self.changeDisplayVal);
            self.changeDisplayVal();
            self.viewGrill();
            self.updateDatavis();
            return self;
        },
        /**
            change grill power from initial value to final value in display zone
        */
        changeDisplayVal: function(){
            data.$display.html(Math.floor(data.power));
            data.$display.parent().siblings('.circle').eq(0).css('border', '3px solid rgba(255,255,255,'+parseFloat(0.1+data.power/valMax)+')');
            /*if(data.initialPower<data.power){
                if(count+parseInt(data.$display.html())>data.power){
                    data.$display.html(Math.floor(data.power));
                }else{
                    requestAnimFrame(self.changeDisplayVal);
                    count+=0.1;
                    data.$display.html(Math.floor(parseInt(data.$display.html())+count));
                }
            }else{
                if(count+parseInt(data.$display.html())<data.power){
                    data.$display.html(Math.floor(data.power));
                }else{
                    requestAnimFrame(self.changeDisplayVal);
                    count-=0.1;
                    data.$display.html(Math.floor(parseInt(data.$display.html())+count));
                }
            }*/
        },
        /**
            change grill color based on value
        */
        viewGrill: function(){
            if(data.power!=0){
                viewCas.attr({opacity: 1});
            }else{
                viewCas.attr({opacity: 0});
            }
            plaque.animate({opacity: data.power/valMax}, 500);
        },
        updateDatavis: function(){
            ctx.data.grill.setInput(data.power).setOutput(70+ Math.random() * 30);
        }
    };
    ctx.grill=grill;
    var self=grill;
})(app);