(function(ctx){
    "use strict";
    var data, count, $input;

    var grill={
        // Application Constructor
        initialize: function(data){
            $input=$('#grill_input');
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
                self.setGrillPower($(this).val()).updateGrill();
            });
        },
         /**
            set grill power in data
        */
        setGrillPower: function(val){
            $input.val(val);
            data.initialPower=data.power;
            data.power=val;
            ctx.params.setGrill(val);
            return self;
        },
        /**
            update heating power value in scene
        */
        updateGrill: function(){
            count=0;
            requestAnimFrame(self.changeDisplayVal);
            self.changeDisplayVal();
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
        }
    };
    ctx.grill=grill;
    var self=grill;
})(app);