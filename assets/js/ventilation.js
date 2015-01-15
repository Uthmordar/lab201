(function(ctx){
    "use strict";
    var data, count, $input;

    var ventilation={
        // Application Constructor
        initialize: function(data){
            $input=$('#ventilation_input');
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
            requestAnimFrame(self.changeDisplayVal);
            self.changeDisplayVal();
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
        }
    };
    ctx.ventilation=ventilation;
    var self=ventilation;
})(app);