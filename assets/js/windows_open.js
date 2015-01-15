(function(ctx){
    "use strict";
    var data, count, $input;

    var open={
        // Application Constructor
        initialize: function(data){
            $input=$('#windows_open_input');
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
                self.setState($(this).val()).updateState();
            });
        },
        /**
            set opening
        */
        setState: function(val){
            $input.val(val);
            data.initialState=data.state;
            data.state=val;
            window.app.params.setWindowsOpen(val);
            return self;
        },
        /**
            update windows openning in scene
        */
        updateState: function(){
            count=0;
            requestAnimFrame(self.changeDisplayVal);
            self.changeDisplayVal();
        },
        /**
            change windows openning with transition in scene
        */
        changeDisplayVal: function(){
            if(data.initialState<data.state){
                if(count+parseInt(data.$display.html())>data.state){
                    data.$display.html(data.state);
                }else{
                    requestAnimFrame(self.changeDisplayVal);
                    count+=0.1;
                    data.$display.html(Math.floor(parseInt(data.$display.html())+count));
                }
            }else{
                if(count+parseInt(data.$display.html())<data.state){
                    data.$display.html(data.state);
                }else{
                    requestAnimFrame(self.changeDisplayVal);
                    count-=0.1;
                    data.$display.html(Math.floor(parseInt(data.$display.html())+count));
                }
            }
        }
    };
    ctx.open=open;
    var self=open;
})(app.windows);