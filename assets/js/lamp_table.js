(function(ctx){
    "use strict";
    var data, count, $input, s, viewLux, valMax;

    var table={
        // Application Constructor
        initialize: function(data){
            $input=$('#lux_table_input');
            data.posX=$('#lamp_table').offset().left;
            data.posY=$('#lamp_table').offset().top;
            valMax=$input.attr('max');
            s=Snap("#lux_table");
            viewLux=s.image('assets/img/scene/lux_table.svg', -75, -85, 440, 540).attr({'opacity': 0});
            window.app.params.setPositionLuxTable(data.posX, data.posY);
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
            set table luminosity    
        */
        setLux: function(val){
            $input.val(val);
            data.initialLux=data.lux;
            data.lux=val;
            window.app.params.setLuxTable(val);
            return self;
        },
        /**
            update table luminosity value in scene
        */
        updateLux: function(){
            count=0;
            //requestAnimFrame(self.changeDisplayVal);
            //self.changeDisplayVal();
            self.viewLamp();
        },
        /**
            change table luminosity from initial value to final value in display zone
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
    ctx.table=table;
    var self=table;
})(app.lamps);