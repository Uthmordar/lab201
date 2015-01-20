(function(ctx){
    "use strict";
    var data, count, $input, $hottePower, s, scene, stray, color, valMax;

    var ventilation={
        // Application Constructor
        initialize: function(data){
            $input=$('#ventilation_input');
            valMax=$input.attr('max');
            $hottePower=$('#hotte_power');
            s=Snap("#hotte_power");
            color='#FFF';
            scene=Snap.load("assets/img/scene/hotte_power.svg", function(loadedFragment){
                stray=loadedFragment.selectAll("path").attr({fill: color, opacity: 0});
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
                self.setDataDebit($(this).val()).updateVentilation();
            });
        },
        /**
            set debit in data
        */
        setDataDebit: function(val){
            $input.val(val);
            data.initialDebit=data.debit;
            data.debit=val;
            ctx.params.setVentilation(val);
            return self;
        },
        /**
            update ventilation debit value in scene
        */
        updateVentilation: function(){
            count=0;
            //requestAnimFrame(self.changeDisplayVal);
            //self.changeDisplayVal();
            self.viewVentilation();
        },
        /**
            increase ventilation debit from initial value to final value
        */
        changeDisplayVal: function(){
            if(data.initialDebit<data.debit){
                if(count+parseInt(data.$display.html())>data.debit){
                    data.$display.html(data.debit);
                }else{
                    requestAnimFrame(self.changeDisplayVal);
                    count+=0.1;
                    data.$display.html(Math.floor(parseInt(data.$display.html())+count));
                }
            }else{
                if(count+parseInt(data.$display.html())<data.debit){
                    data.$display.html(data.debit);
                }else{
                    requestAnimFrame(self.changeDisplayVal);
                    count-=0.1;
                    data.$display.html(Math.floor(parseInt(data.$display.html())+count));
                }
            }
        },
        viewVentilation: function(){
            if(data.debit<valMax*0.3){
                $hottePower.css('width', '25px');
            }else if(data.debit<valMax*0.6){
                $hottePower.css('width', '40px');
            }else{
                $hottePower.css('width', '60px');
            }
            stray.animate({opacity: (data.debit/valMax)*2}, 500);
        }
    };
    ctx.ventilation=ventilation;
    var self=ventilation;
})(app);