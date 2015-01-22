(function(ctx){
    "use strict";
    var data, count, $input, s, rec, w, h;

    var shutter={
        // Application Constructor
        initialize: function(data){
            $input=$('#windows_shutter_input');
            s = Snap("#windows_shutter");
            w=250;
            h=430;
            rec=s.rect(0,0,w,0);
            rec.attr({
                fill: "#000"
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
                self.setState($(this).val()).updateState();
            });
        },
        /**
            set shutter opening   
        */
        setState: function(val){
            $input.val(val);
            data.initialState=data.state;
            data.state=val;
            window.app.params.setWindowsShutter(val);
            return self;
        },
        /**
            update shutter opening value in scene
        */
        updateState: function(){
            count=0;
            //requestAnimFrame(self.changeDisplayVal);
            //self.changeDisplayVal();
            self.viewChange();
        },
        /**
            change shutter opening from initial value to final value in display zone
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
        },
        /**
            change svg height based on opening percent
        */
        viewChange: function(){
            rec.animate({height: h*0.01*data.state}, 300);
        }
    };
    ctx.shutter=shutter;
    var self=shutter;
})(app.windows);