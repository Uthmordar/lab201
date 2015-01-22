(function(ctx){
    "use strict";
    var data, count, $input, s, scene, stray, colorOn, colorOff, valMax;

    var heating={
        // Application Constructor
        initialize: function(data){
            $input=$('#heating_input');
            valMax=$input.attr('max');
            s=Snap("#heating");
            colorOn='#BC3D41';
            colorOff='#FFF';
            scene=Snap.load("assets/img/scene/heating.svg", function(loadedFragment){
                stray=loadedFragment.selectAll("path").attr({fill: colorOff, opacity: 0});
                s.append(stray);
            });
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
                self.setHeatingPower($(this).val()).updateHeating();
            });
        },
         /**
            set heating in data
        */
        setHeatingPower: function(val){
            $input.val(val).attr('value', val);
            data.initialPower=data.power;
            data.power=val;
            ctx.params.setHeating(val);
            return self;
        },
        /**
            update heating power value in scene
        */
        updateHeating: function(){
            count=0;
            //requestAnimFrame(self.changeDisplayVal);
            //self.changeDisplayVal();
            self.viewHeating();
        },
        /**
            change power heating from initial value to final value in display zone
        */
        changeDisplayVal: function(){
            if(data.initialPower<data.power){
                if(count+parseInt(data.$display.html())>data.power){
                    data.$display.html(data.power);
                }else{
                    requestAnimFrame(self.changeDisplayVal);
                    count+=0.1;
                    data.$display.html(Math.floor(parseInt(data.$display.html())+count));
                }
            }else{
                if(count+parseInt(data.$display.html())<data.power){
                    data.$display.html(data.power);
                }else{
                    requestAnimFrame(self.changeDisplayVal);
                    count-=0.1;
                    data.$display.html(Math.floor(parseInt(data.$display.html())+count));
                }
            }
        },
        /**
            change grill color based on value
        */
        viewHeating: function(){
            if(stray){
                if(data.power>450){
                    stray.attr({opacity: data.power/valMax, fill: colorOn});
                }else{
                    stray.attr({opacity: data.power/valMax, fill: colorOff});
                }
            }
        }

    };
    ctx.heating=heating;
    var self=heating;
})(app);