(function(ctx){
    "use strict";
    var data, count, $input;

    var inside={
        // Application Constructor
        initialize: function(data){
            $input=$('#temp_int_input');
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
                self.setTemperature($(this).val()).updateTemperature();
            });
        },
        /**
            set temp    
        */
        setTemperature: function(val){
            $input.val(val);
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
            requestAnimFrame(self.changeDisplayVal);
            self.changeDisplayVal();
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
        }
    };
    ctx.inside=inside;
    var self=inside;
})(app.temperature);