(function(ctx){
    "use strict";
    var data,start,end,$inputTime,valDarkness,$inputDarkness,$bgDarkness,time, val, $clock, timeProgress=0, hour, minute;

    var env={
        // Application Constructor
        initialize: function(data){
            $inputTime=$('#time_input');
            $inputDarkness=$('#darkness_input');
            $bgDarkness=$('#darkness');
            $clock=$('#timer');
            time=ctx.params.getParams().time;
            start=Math.floor(time.timestamp/(60*60*2));
            self.setData(data);
            self.bindEvents();
            requestAnimFrame(self.timeProgress);
            self.timeProgress();
        },
        getData: function(){
            return data;
        },
        setData: function(dataset){
            data=dataset;
        },
        getDarkness: function(){
            return valDarkness;
        },
        setDarkness: function(darkness){
            valDarkness=darkness;
            ctx.params.setLuxEnv(darkness);
        },
        getTime: function(){
            return time;
        },
        setTime: function(val){
            hour=Math.floor(val/(60*60));
            minute=Math.floor((val-(hour*60*60))/60);
            ctx.params.setTime(hour, minute, val);
            time.hour=(hour<10)? "0"+hour : hour;
            time.minute=(minute<10)? "0"+minute : minute;
            time.timestamp=parseInt(val);
        },
        bindEvents: function(){
            $inputTime.on('change', function(e){
                e.preventDefault();
                $(this).attr('value', $(this).val());
                self.updateTime(this);
            });
            $inputDarkness.on('change', function(e){
                e.preventDefault();
                val=$(this).val();
                ctx.params.setLuxEnv(val);
                self.setDarkness(val);
                self.changeDarkness();
            });
        },
        /**
            launch action link to time change
        */
        updateTime: function(el){
            val=$(el).attr('value');
            end=Math.floor(val/(60*60*2));
            self.setTime(val);
            self.changeTime(start,end);
            self.changeClock();
        },
        /** 
            change time background stage
            stageInit: initial stage;
            stageEnd: final stage;
        */
        changeTime: function(stageInit, stageEnd){
            data[stageInit].css('opacity', 0);
            data[stageEnd].css('opacity', 1);
            start=stageEnd;
        },
        /**
            change numbers displays in clock
        */
        changeClock: function(){
            val=self.getTime();
            $clock.children('#hour').html(val.hour).siblings('#minute').html(val.minute);
        },
        /** 
            change darkness background stage
        */
        changeDarkness: function(){
            if(valDarkness>25000){
                $bgDarkness.css('opacity', 0);
            }else if(valDarkness>500){
                $bgDarkness.css('opacity', 0.4);
            }else{
                $bgDarkness.css('opacity', 0.8);
            }
        },
        /**
            auto progress for time
        */
        timeProgress: function(){
            requestAnimFrame(self.timeProgress);
            if($inputTime.attr('value')==86400){
                $inputTime.attr('value', 1);
            }else{
                $inputTime.attr('value', parseInt($inputTime.attr('value'))+1);
            }
            self.updateTime($inputTime);
            ctx.controller.controlOutput();
        }
    };
    ctx.env=env;
    var self=env;
})(app);