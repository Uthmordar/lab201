(function(ctx){
    "use strict";
    var data,start,end,$inputTime,valDarkness,$inputDarkness,$bgDarkness,time={hour:0,minute:0}, val, $clock, timeProgress=0, timeFactor;

    var env={
        // Application Constructor
        initialize: function(data){
            $inputTime=$('#time_input');
            $inputDarkness=$('#darkness_input');
            $bgDarkness=$('#darkness');
            $clock=$('#timer');
            /* facteur déterminant la vitesse de déroulement de la journée */
            timeFactor=400;
            start=Math.floor(ctx.params.getParams().time * 0.5);
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
            ctx.params.setTime(val);
            time.hour=(Math.floor(val))? Math.floor(val) : "00";
            time.minute=((val-Math.floor(val)))? (val-Math.floor(val))*60 : "00";
        },
        bindEvents: function(){
            $inputTime.on('change', function(e){
                e.preventDefault();
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
            val=$(el).val();
            end=(Math.floor(val*0.5));
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
            timeProgress+=1;
            if(timeProgress%timeFactor===0){
                if($inputTime.val()==24){
                    $inputTime.val(0.25);
                }else{
                    $inputTime.val(parseFloat($inputTime.val())+0.25);
                }
                self.updateTime($inputTime);
                ctx.controller.controlOutput();
            }

        }
    };
    ctx.env=env;
    var self=env;
})(app);