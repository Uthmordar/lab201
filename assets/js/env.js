/**
    MANAGE HOUSE ENVIRONMENT  &&  RANGE SLIDER LINKED
    SUN && MOON
    TIME CHANGE
    CLOUD
    LUMINOSITY
*/
(function(ctx){
    "use strict";
    var $moon, $sun, x0, y0, t, angle, r, x, y, data,start,end,$inputTime,valDarkness,$inputDarkness,$bgDarkness,time, val, $clock, timeProgress = 0, hour, minute, $displayDarkness,
    $nuages, vecteurNuage, calc,
    valMax, $container, $slider, sliderW2, sliderH2, radius, deg, elP, elPos, X, Y, mdown, mPos, atan,
    valMaxDarkness, $containerDarkness, $sliderDarkness, sliderW2Darkness, sliderH2Darkness, radiusDarkness, degDarkness, elPDarkness, elPosDarkness, XDarkness, YDarkness, mdownDarkness, mPosDarkness, atanDarkness;

    var env = {
        // Application Constructor
        initialize: function(data){
            $inputTime = $('#time_input');
            $inputDarkness = $('#darkness_input');
            $bgDarkness = $('#darkness');
            $displayDarkness = $('#luminosity_output .display');
            $clock = $('#timer');
            valDarkness = ctx.getParams().luxEnv;
            valMax = parseInt($inputTime.attr('max'));
            valMaxDarkness = parseInt($inputDarkness.attr('max'));
            if (valDarkness > valMaxDarkness) {
                valDarkness = valMaxDarkness;
            } else if (valDarkness < 0) {
                valDarkness = 0;
            }
            // init sun & moon
            $sun = $('#sun');
            $moon = $('#moon');
            x0 = window.innerWidth * 0.5;
            y0 = window.innerHeight - 94;
            r = y0 * 0.98;
            angle = 0;
            // init nuages
            $nuages = $('#nuages');
            vecteurNuage = 0;
            // init time
            time = ctx.params.getParams().time;
            start = Math.floor(43200/(60*60*2));
            end = Math.floor(time.timestamp/(60*60*2));
            $container = $('.circle.time'), $slider = $('#slider_time'), sliderW2 = $slider.width()/2, sliderH2 = $slider.height()/2, radius = 70, deg = 360 * (time.timestamp / 86400), elP = $container.offset(), elPos = { x: elP.left, y: elP.top}, X = 0, Y = 0, mdown = false, mPos = {x: elPos.x, y: elPos.y}, atan = Math.atan2(mPos.x - radius, mPos.y - radius);
            self.setData(data);
            self.changeTime(start, end);
            // init range env
            X = Math.round(radius* Math.sin(deg*Math.PI/180));    
            Y = Math.round(radius*  -Math.cos(deg*Math.PI/180));
            $slider.css({ left: X + radius - sliderW2, top: Y + radius - sliderH2 });      
            $inputTime.attr('value', deg * (valMax/360)).val(deg * (valMax/360));
            // init range darkness
            $containerDarkness = $('.circle.luminosity'), $sliderDarkness = $('#slider_luminosity'), sliderW2Darkness = $sliderDarkness.width()/2, sliderH2Darkness = $sliderDarkness.height()/2, radiusDarkness = 70, degDarkness =  360 * (valDarkness / valMaxDarkness), elPDarkness = $containerDarkness.offset(), elPosDarkness = { x: elPDarkness.left, y: elPDarkness.top}, XDarkness = 0, YDarkness = 0, mdownDarkness = false, mPosDarkness = {x: elPosDarkness.x, y: elPosDarkness.y}, atanDarkness = Math.atan2(mPosDarkness.x - radiusDarkness, mPosDarkness.y - radiusDarkness);
            XDarkness = Math.round(radiusDarkness * Math.sin(degDarkness*Math.PI/180));    
            YDarkness = Math.round(radiusDarkness * -Math.cos(degDarkness*Math.PI/180));
            $sliderDarkness.css({ left: XDarkness + radiusDarkness - sliderW2Darkness, top: YDarkness + radiusDarkness - sliderH2Darkness});      
            $inputDarkness.attr('value', degDarkness * (valMaxDarkness/360));
            self.changeDarkness();
            self.bindEvents();
            requestAnimFrame(self.timeProgress);
            self.timeProgress();
            self.changeDarknessDisplayVal();
        },
        resetControls: function(){
            sliderW2 = $slider.width()/2, sliderH2 = $slider.height()/2, elP = $container.offset(), elPos = { x: elP.left, y: elP.top}, X = 0, Y = 0, mdown = false, mPos = {x: elPos.x, y: elPos.y}, atan = Math.atan2(mPos.x - radius, mPos.y - radius);
            // init range env
            // init range darkness
            sliderW2Darkness = $sliderDarkness.width()/2, sliderH2Darkness = $sliderDarkness.height()/2, elPDarkness = $containerDarkness.offset(), elPosDarkness = { x: elPDarkness.left, y: elPDarkness.top}, XDarkness = 0, YDarkness = 0, mdownDarkness = false, mPosDarkness = {x: elPosDarkness.x, y: elPosDarkness.y}, atanDarkness = Math.atan2(mPosDarkness.x - radiusDarkness, mPosDarkness.y - radiusDarkness);
        },
        getData: function(){
            return data;
        },
        setData: function(dataset){
            data = dataset;
        },
        getDarkness: function(){
            return valDarkness;
        },
        setDarkness: function(darkness){
            valDarkness = darkness;
            ctx.params.setLuxEnv(darkness);
            return self;
        },
        getTime: function(){
            return time;
        },
        setTime: function(val){
            hour = Math.floor(val/(60 * 60));
            minute = Math.floor((val - (hour * 60 * 60))/60);
            ctx.params.setTime(hour, minute, val);
            time.hour = (hour < 10)? "0" + hour : hour;
            time.minute = (minute < 10)? "0" + minute : minute;
            time.timestamp = parseInt(val);
        },
        bindEvents: function(){
            $inputTime.on('change', function(e){
                e.preventDefault();
                $(this).attr('value', $(this).val());
                self.updateTime(this);
            });
            $inputDarkness.on('change', function(e){
                e.preventDefault();
                val = $(this).val();
                ctx.params.setLuxEnv(val);
                self.setDarkness(val);
                self.changeDarkness();
            });
            if (ctx.isTablet()) {
                self.controlTablet();
            } else {
                self.controlStandard();
            }
        },
        controlTablet: function() {
            $container
            .on("touchmove touchstart", function (e){
                e.preventDefault();
                self.controlChangeTime(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
            });     
            $containerDarkness
            .on("touchmove touchstart", function (e){
                e.preventDefault();
                self.controlChangeLux(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
            });
        },
        controlStandard: function() {
            $container
            .mousedown(function (e){mdown = true;})
            .mouseup(function (e){mdown = false;/*self.updateDataTime();*/})
            .mousemove(function (e){
                e.preventDefault();
                if(mdown){
                   self.controlChangeTime(e.clientX, e.clientY);
                }
            });
            /* range luminosity */            
            $containerDarkness
            .mousedown(function (e){mdownDarkness = true;})
            .mouseup(function (e){mdownDarkness = false;})
            .mousemove(function (e){
                e.preventDefault();
                if(mdownDarkness){
                    self.controlChangeLux(e.clientX, e.clientY);
                }
            });
        },
        controlChangeTime: function(x, y) {
            mPos = {x: x - elPos.x, y: y - elPos.y};
            atan = Math.atan2(mPos.x - radius, mPos.y - radius);
            deg = -atan/(Math.PI/180) + 180;
                 
            X = Math.round(radius * Math.sin(deg * Math.PI/180));    
            Y = Math.round(radius *  -Math.cos(deg * Math.PI/180));
            $slider.css({left: X + radius - sliderW2, top: Y + radius - sliderH2});      
            $inputTime.attr('value', deg * (valMax/360)).val(deg * (valMax/360));
        },
        controlChangeLux: function(x, y) {
            mPosDarkness = {x: x - elPosDarkness.x, y: y - elPosDarkness.y};
            atanDarkness = Math.atan2(mPosDarkness.x - radiusDarkness, mPosDarkness.y - radiusDarkness);
            degDarkness = -atanDarkness/(Math.PI/180) + 180;
                 
            XDarkness = Math.round(radiusDarkness * Math.sin(degDarkness * Math.PI/180));    
            YDarkness = Math.round(radiusDarkness * -Math.cos(degDarkness * Math.PI/180));
            $sliderDarkness.css({left: XDarkness + radiusDarkness - sliderW2Darkness, top: YDarkness + radiusDarkness - sliderH2Darkness});      
            $inputDarkness.attr('value', degDarkness * (valMaxDarkness/360)).val(degDarkness * (valMaxDarkness/360));
            self.setDarkness(degDarkness * (valMaxDarkness/360)).changeDarkness();
        },
        /**
            move cursor to new val 
        */
        setCursorPos: function(val){
            deg = (val/valMax) * 360;
            X = Math.round(radius * Math.sin(deg * Math.PI/180));    
            Y = Math.round(radius * -Math.cos(deg * Math.PI/180));
            $slider.css({left: X + radius - sliderW2, top: Y + radius - sliderH2});
            return self;
        },
        /**
            launch action link to time change
        */
        updateTime: function(el){
            val = $(el).attr('value');
            end = Math.floor(val/(60 * 60 * 2));
            self.setTime(val);
            self.changeTime(start,end);
            self.changeClock();
            self.rotateSun(val);
            self.moveCloud(val);
        },
        /**
            rotate the sun 
        */
        rotateSun: function(val){
            t = (val.timestamp/86400) * 360;
            t = (t * Math.PI / 180) + Math.PI * 0.5;
            angle += 0.01;
            x = x0 + r * Math.cos(t);
            y = y0 + r * Math.sin(t);
            $sun.css({'left': x + 'px', 'top': y + 'px'});
            x = x0 + r * Math.cos(t - Math.PI);
            y = y0 + r * Math.sin(t - Math.PI);
            $moon.css({'left': x + 'px', 'top': y + 'px'});
        },
        /** 
            move nugaes background with parallax
        */
        moveCloud: function(val){
            vecteurNuage += 0.5;
            $nuages.css('background', "url(assets/img/fond/fond_nuage_1.svg) " + vecteurNuage * 0.7 + "px -80px repeat-x, url(assets/img/fond/fond_nuage_2.svg) " + vecteurNuage + "px 50px repeat-x, url(assets/img/fond/fond_nuage_1.svg) " + vecteurNuage * 1.8 + "px 100px repeat-x")
        },
        /** 
            change time background stage
            stageInit: initial stage;
            stageEnd: final stage;
        */
        changeTime: function(stageInit, stageEnd){
            if (data[stageInit] && data[stageEnd]) {
                data[stageInit].css('opacity', 0);
                data[stageEnd].css('opacity', 1);
                start = stageEnd;
            }
        },
        /**
            change numbers displays in clock
        */
        changeClock: function(){
            val = self.getTime();
            $clock.children('#hour').html(val.hour).siblings('#minute').html(val.minute);
        },
        /** 
            change darkness background stage
        */
        changeDarkness: function(){
            if(valDarkness > 25000){
                $bgDarkness.css('opacity', 0);
            } else if (valDarkness > 15000) {
                $bgDarkness.css('opacity', 0.15);
            }else if (valDarkness > 7000) {
                $bgDarkness.css('opacity', 0.4);
            } else {
                $bgDarkness.css('opacity', 0.9);
            }
            self.changeDarknessDisplayVal();
        },
        /**
            auto progress for time
        */
        timeProgress: function(){
            requestAnimFrame(self.timeProgress);
            if($inputTime.attr('value') == 86400){
                $inputTime.val(1);
                $inputTime.attr('value', 1);
                self.setCursorPos(1);
            }else{
                calc = parseInt($inputTime.attr('value')) + 1;
                $inputTime.attr('value', calc);
                self.setCursorPos(calc);
            }
            self.updateTime($inputTime);
            ctx.controller.controlOutput();
        },
        /**
            change darkness from initial value to final value in display
        */
        changeDarknessDisplayVal: function(){
            $displayDarkness.html(Math.floor(valDarkness));
            $displayDarkness.parent().siblings('.circle').eq(0).css('border', '3px solid rgba(255,255,255,' + parseFloat(0.1 + valDarkness/valMaxDarkness) + ')');
        },
        /**
            update data linked with time
        */
        updateDataTime: function(){
            val = self.getTime();
            ctx.data.time.setInput(val).setOutput(Math.random() * 100);
        }
    };
    ctx.env = env;
    var self = env;
})(app);