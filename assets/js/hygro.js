(function(ctx){
    "use strict";
    var data, count, $input;

    var hygro={
        // Application Constructor
        initialize: function(data){
            $input=$('#hygro_input');
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
                self.setHygroValue($(this).val()).updateHygro();
            });
        },
         /**
            set heating in data
        */
        setHygroValue: function(val){
            $input.val(val);
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