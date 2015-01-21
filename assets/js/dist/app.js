// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x){
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
(function(ctx){
    "use strict";
    /*  MODEL */
    var windows={open:{$el: $('#window_open'), $display: $('#windows_open_output .display'), state:0, initialState: 0},
        shutter:{$el: $('#window_shutter'), $display: $('#windows_shutter_output .display'), state:0, initialState: 0}};
    var envTab=[$('#bg_7'), $('#bg_7'), $('#bg_5'), $('#bg_1'), $('#bg_2'), $('#bg_2'), $('#bg_2'), $('#bg_3'), $('#bg_4'), $('#bg_5'), $('#bg_6'), $('#bg_7'), $('#bg_7')];
    var lamps={
        table: {$el: $('#lamp_table'), $display: $('#lamp_table_output .display'), lux: 0, initialLux: 0, posX: 0, posY: 0, state:0, active: 0, intensity: 0},
        plan: {$el: $('#lamp_plan'), $display: $('#lamp_plan_output .display'), lux: 0, initialLux: 0, posX: 0, posY: 0, state:0, active: 0, intensity: 0},
        hotte: {$el: $('#lamp_hotte'), $display: $('#lamp_hotte_output .display'), lux: 0, initialLux: 0, posX: 0, posY: 0, state:0, active: 0, intensity: 0},
        wall: {$el: $('#lamp_wall'), $display: $('#lamp_wall_output .display'), lux: 0, initialLux: 0, posX: 0, posY: 0, state:0, active: 0, intensity: 0}
    };
    var user=[{$el: $('#user'), alive: 1, width: 0, height: 0}];
    var ventilation={$el: $('#ventilation'), debit:0, initialDebit:0, $display: $('#ventilation_output .display')};
    var heating={$el: $('#heating'), power:0, initialPower:0, $display: $('#heating_output .display')};
    var hygro={$el: $('#hygro'), hygro:0, initialHygro:0, $display: $('#hygro_output .display')};
    var temperature={ext:{$el: $('#temp_ext'), t:15, initialT:0, $display: $('#temp_ext_output .display')},
        inside:{$el: $('#temp_int'), t:18, initialT:0, $display: $('#temp_int_output .display')}};
    var grill={$el: $('#grill'), power:0, initialPower:0, posX: 0, posY: 0, $display: $('#grill_output .display')};

    var $scene,sceneX,sceneY, sceneWidth, sceneHeight;
    var params={
        windowOpen: 0,
        time: {hour: 12, minute: 0, timestamp: 43200},
        luxEnv: 50000,
        hygrometrie: {hygro:80, time: {low: 0, medium: 0, high: 0}},
        user: {x: 0, y:0, status: 1},
        grill: {power: 0, time: {low: 0, medium: 0, high: 0}},
        luxHotte: 0,
        luxPlan: 0,
        luxTable: 0,
        luxWall: 0,
        ventilation: 0,
        tempExt: 15,
        tempInt: 18,
        heating: 0,
        windows: {open: 0, shutter: 0}
    };
    var app={
        // Application Constructor
        initialize: function(scene) {
            window.requestAnimFrame = (function(){
            return  window.requestAnimationFrame       ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame    ||
                    window.oRequestAnimationFrame      ||
                    window.msRequestAnimationFrame     ||
                    function( callback ){
                        window.setTimeout(callback, 1000 / 60);
                    };
            })();
            this.setScene(scene);
            // Initialize data for api/controller 
            this.params.initialize(params);
            // Initialize all input/output && set data
            this.form.initialize($('#submit_rules'));
            this.windows.initialize(windows);
            this.lamps.initialize(lamps);
            this.env.initialize(envTab);
            this.user.initialize(user, $scene);
            this.ventilation.initialize(ventilation);
            this.heating.initialize(heating);
            this.hygro.initialize(hygro);
            this.temperature.initialize(temperature);
            this.grill.initialize(grill);
            // Initialize algorithm controller 
            this.controller.initialize();
        },
        /**
            return scene;
        */
        getScene: function(){
            return $scene;
        },
        /**
            set scene coord
            scene: scene selector
        */
        setScene: function(scene){
            $scene=scene;
            sceneX=scene.offset().left;
            sceneY=scene.offset().top;
            sceneWidth=parseFloat(scene.width());
            sceneHeight=parseFloat(scene.height());
        },
        /**
            get scene coord
            return x: sceneX, y: sceneY
        */
        getSceneOffset: function(){
            return {x: sceneX, y: sceneY};
        },
        getSceneWidth: function(){
            return sceneWidth;
        },
        getSceneHeight: function(){
            return sceneHeight;
        }
    };
    ctx.app=app;
    var self=app;
})(window);
(function(ctx){
    "use strict";
    var $input, $popIn, $sceneBlur, $formSubmit, $close;

    var form={
        // Application Constructor
        initialize: function(data){
            $input=$('.circle.more');
            $popIn=$('#rules_form');
            $sceneBlur=$('#app_blur');
            $close=$popIn.children('.pop_in').children('.close');
            $formSubmit=data;
            self.bindEvents();
        },
        bindEvents: function(){
            $input.on('click', function(e){
                e.preventDefault();
                self.displayPopIn();
            });

            $formSubmit.on('click', function(e){
                e.preventDefault();
                self.hidePopIn();
            });

            $close.on('click', function(e){
                e.preventDefault();
                self.hidePopIn();
            });
        },
        displayPopIn: function(){
            $popIn.removeClass('hidden');
            $popIn.css({'left': window.innerWidth*0.5-$popIn.width()*0.5 +'px', 'top': window.innerHeight*0.5-$popIn.height()*0.5 + 'px'});
            $sceneBlur.addClass('blur');
        },
        hidePopIn: function(){
            $popIn.addClass('hidden');
            $sceneBlur.removeClass('blur');
        }
    };
    ctx.form=form;
    var self=form;
})(app);
(function(ctx){
    "use strict";
    var windows={
        // Application Constructor
        initialize: function(data){
            self.open.initialize(data.open);
            self.shutter.initialize(data.shutter);
        },
        bindEvents: function(){
        }
    };
    ctx.windows=windows;
    var self=windows;
})(app);
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
            rec.animate({height: h*0.01*data.state}, 500);
        }
    };
    ctx.shutter=shutter;
    var self=shutter;
})(app.windows);
(function(ctx){
    "use strict";
    var lamps={
        // Application Constructor
        initialize: function(data){
            // Initialize lamp children
            self.hotte.initialize(data.hotte);
            self.plan.initialize(data.plan);
            self.table.initialize(data.table);
            self.wall.initialize(data.wall);
        },
        bindEvents: function(){
        }
    };
    ctx.lamps=lamps;
    var self=lamps;
})(app);
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
(function(ctx){
    "use strict";
    var data, count, $input, s, viewLux, valMax;

    var plan={
        // Application Constructor
        initialize: function(data){
            $input=$('#lux_plan_input');
            self.setData(data);
            data.posX=$('#lux_plan').offset().left;
            data.posY=$('#lux_plan').offset().top;
            valMax=$input.attr('max');
            s=Snap("#lux_plan");
            viewLux=s.image('assets/img/scene/lux_plan.svg', 0, 0, 300, 150).attr({'opacity': 0});
            window.app.params.setPositionLuxPlan(data.posX, data.posY);
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
            set workbench luminosity   
        */
        setLux: function(val){
            $input.val(val);
            data.initialLux=data.lux;
            data.lux=val;
            window.app.params.setLuxPlan(val);
            return self;
        },
        /**
            update workbench luminosity value in scene
        */
        updateLux: function(){
            count=0;
            //requestAnimFrame(self.changeDisplayVal);
            //self.changeDisplayVal();
            self.viewLamp();
        },
        /**
            change workbench luminosity from initial value to final value in display zone
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
            viewLux.animate({'opacity': (data.lux/valMax)*2}, 400);
        }
    };
    ctx.plan=plan;
    var self=plan;
})(app.lamps);
(function(ctx){
    "use strict";
    var data, count, $input, s, viewLux, valMax;

    var hotte={
        // Application Constructor
        initialize: function(data){
            $input=$('#lux_hotte_input');
            data.posX=$('#hotte').offset().left;
            data.posY=$('#hotte').offset().top;
            valMax=$input.attr('max');
            s=Snap("#lux_hotte");
            viewLux=s.image('assets/img/scene/lux_hotte.svg', -110, -160, 500, 500).attr({'opacity': 0});
            window.app.params.setPositionLuxHotte(data.posX, data.posY);
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
            set luminosity   
        */
        setLux: function(val){
            $input.val(val);
            data.initialLux=data.lux;
            data.lux=val;
            window.app.params.setLuxHotte(val);
            return self;
        },
        /**
            update hotte luminosity value in scene
        */
        updateLux: function(){
            count=0;
            //requestAnimFrame(self.changeDisplayVal);
            //self.changeDisplayVal();
            self.viewLamp();
        },
        /**
            change hotte lamp luminosity from initial value to final value in display zone
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
    ctx.hotte=hotte;
    var self=hotte;
})(app.lamps);
(function(ctx){
    "use strict";
    var data, count, $input, s, viewLux, valMax;

    var wall={
        // Application Constructor
        initialize: function(data){
            $input=$('#lux_wall_input');
            data.posX=$('#lamp_wall').offset().left;
            data.posY=$('#lamp_wall').offset().top;
            valMax=$input.attr('max');
            s=Snap("#lux_wall");
            viewLux=s.image('assets/img/scene/lux_wall.svg', -187, -200, 520, 520).attr({'opacity': 0});
            window.app.params.setPositionLuxWall(data.posX, data.posY);
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
            set luminosity   
        */
        setLux: function(val){
            $input.val(val);
            data.initialLux=data.lux;
            data.lux=val;
            window.app.params.setLuxWall(val);
            return self;
        },
        /**
            update hotte luminosity value in scene
        */
        updateLux: function(){
            count=0;
            //requestAnimFrame(self.changeDisplayVal);
            //self.changeDisplayVal();
            self.viewLamp();
        },
        /**
            change hotte luminosity from initial value to final value in display zone
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
    ctx.wall=wall;
    var self=wall;
})(app.lamps);
/**
    MANAGE HOUSE ENVIRONMENT  &&  RANGE SLIDER LINKED
    SUN && MOON
    TIME CHANGE
    CLOUD
    LUMINOSITY
*/
(function(ctx){
    "use strict";
    var $moon, $sun, x0, y0, t, angle, r, x, y, data,start,end,$inputTime,valDarkness,$inputDarkness,$bgDarkness,time, val, $clock, timeProgress=0, hour, minute, $displayDarkness,
    $nuages, vecteurNuage,
    valMax, $container=$('.circle.time'), $slider=$('#slider_time'), sliderW2=$slider.width()/2, sliderH2=$slider.height()/2, radius=70, deg=180, elP=$container.offset(), elPos={ x: elP.left, y: elP.top}, X=0, Y=0, mdown=false, mPos={x: elPos.x, y: elPos.y}, atan=Math.atan2(mPos.x-radius, mPos.y-radius),
    valMaxDarkness, $containerDarkness=$('.circle.luminosity'), $sliderDarkness=$('#slider_luminosity'), sliderW2Darkness=$sliderDarkness.width()/2, sliderH2Darkness=$sliderDarkness.height()/2, radiusDarkness=70, degDarkness=180, elPDarkness=$containerDarkness.offset(), elPosDarkness={ x: elPDarkness.left, y: elPDarkness.top}, XDarkness=0, YDarkness=0, mdownDarkness=false, mPosDarkness={x: elPosDarkness.x, y: elPosDarkness.y}, atanDarkness=Math.atan2(mPosDarkness.x-radiusDarkness, mPosDarkness.y-radiusDarkness);

    var env={
        // Application Constructor
        initialize: function(data){
            $inputTime=$('#time_input');
            $inputDarkness=$('#darkness_input');
            $bgDarkness=$('#darkness');
            $displayDarkness=$('#luminosity_output .display');
            $clock=$('#timer');
            valDarkness=$inputDarkness.val();
            valMax=parseInt($inputTime.attr('max'));
            valMaxDarkness=parseInt($inputDarkness.attr('max'));
            // init sun & moon
            $sun=$('#sun');
            $moon=$('#moon');
            x0=window.innerWidth*0.5;
            y0=window.innerHeight-94;
            r=y0 * 0.98;
            angle=0;
            // init nuages
            $nuages=$('#nuages');
            vecteurNuage=0;
            // init time
            time=ctx.params.getParams().time;
            start=Math.floor(time.timestamp/(60*60*2));
            self.setData(data);
            // init range env
            X=Math.round(radius* Math.sin(deg*Math.PI/180));    
            Y=Math.round(radius*  -Math.cos(deg*Math.PI/180));
            $slider.css({ left: X+radius-sliderW2, top: Y+radius-sliderH2 });      
            $inputTime.attr('value', deg * (valMax/360)).val(deg*(valMax/360));
            // init range darkness
            XDarkness = Math.round(radiusDarkness* Math.sin(degDarkness*Math.PI/180));    
            YDarkness = Math.round(radiusDarkness*  -Math.cos(degDarkness*Math.PI/180));
            $sliderDarkness.css({ left: XDarkness+radiusDarkness-sliderW2Darkness, top: YDarkness+radiusDarkness-sliderH2Darkness});      
            $inputDarkness.attr('value', degDarkness * (valMaxDarkness/360));
            self.bindEvents();
            requestAnimFrame(self.timeProgress);
            self.timeProgress();
            self.changeDarknessDisplayVal();
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
            return self;
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
            /* range time */
            $container
            .mousedown(function (e){mdown=true;})
            .mouseup(function (e){mdown=false;})
            .mousemove(function (e){
                if(mdown){
                    mPos = {x: e.clientX-elPos.x, y: e.clientY-elPos.y};
                    atan = Math.atan2(mPos.x-radius, mPos.y-radius);
                    deg = -atan/(Math.PI/180) + 180;
                         
                    X = Math.round(radius* Math.sin(deg*Math.PI/180));    
                    Y = Math.round(radius*  -Math.cos(deg*Math.PI/180));
                    $slider.css({ left: X+radius-sliderW2, top: Y+radius-sliderH2 });      
                    $inputTime.attr('value', deg * (valMax/360)).val(deg*(valMax/360));
                }
            });
            /* range luminosity */            
            $containerDarkness
            .mousedown(function (e){mdownDarkness=true;})
            .mouseup(function (e){mdownDarkness=false;})
            .mousemove(function (e){
                if(mdownDarkness){
                    mPosDarkness = {x: e.clientX-elPosDarkness.x, y: e.clientY-elPosDarkness.y};
                    atanDarkness = Math.atan2(mPosDarkness.x-radiusDarkness, mPosDarkness.y-radiusDarkness);
                    degDarkness = -atanDarkness/(Math.PI/180) + 180;
                         
                    XDarkness = Math.round(radiusDarkness* Math.sin(degDarkness*Math.PI/180));    
                    YDarkness = Math.round(radiusDarkness*  -Math.cos(degDarkness*Math.PI/180));
                    $sliderDarkness.css({ left: XDarkness+radiusDarkness-sliderW2Darkness, top: YDarkness+radiusDarkness-sliderH2Darkness });      
                    $inputDarkness.attr('value', degDarkness * (valMaxDarkness/360)).val(degDarkness * (valMaxDarkness/360));
                    self.setDarkness(degDarkness * (valMaxDarkness/360)).changeDarkness();
                }
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
            self.rotateSun(val);
            self.moveCloud(val);
        },
        /**
            rotate the sun 
        */
        rotateSun: function(val){
            t=(val.timestamp/86400)*360;
            t= (t * Math.PI / 180)+Math.PI*0.5;
            angle+=0.01;
            x = x0 + r*Math.cos(t);
            y = y0 + r*Math.sin(t);
            $sun.css({'left': x+'px', 'top': y+'px'});
            x = x0 + r*Math.cos(t-Math.PI);
            y = y0 + r*Math.sin(t-Math.PI);
            $moon.css({'left': x+'px', 'top': y+'px'});
        },
        /** 
            move nugaes background with parallax
        */
        moveCloud: function(val){
            vecteurNuage+=0.5;
            $nuages.css('background', "url(assets/img/fond/fond_nuage_1.svg) "+vecteurNuage*0.7+"px -80px repeat-x, url(assets/img/fond/fond_nuage_2.svg) "+vecteurNuage+"px 50px repeat-x, url(assets/img/fond/fond_nuage_1.svg) "+vecteurNuage*1.8+"px 100px repeat-x")
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
            }else if(valDarkness>5000){
                $bgDarkness.css('opacity', 0.4);
            }else{
                $bgDarkness.css('opacity', 0.9);
            }
            self.changeDarknessDisplayVal();
        },
        /**
            auto progress for time
        */
        timeProgress: function(){
            requestAnimFrame(self.timeProgress);
            if($inputTime.attr('value')==86400){
                $inputTime.val(1);
                $inputTime.attr('value', 1);
            }else{
                $inputTime.attr('value', parseInt($inputTime.attr('value'))+1);
            }
            self.updateTime($inputTime);
            ctx.controller.controlOutput();
        },
        /**
            change darkness from initial value to final value in display
        */
        changeDarknessDisplayVal: function(){
            $displayDarkness.html(Math.floor(valDarkness));
            $displayDarkness.parent().siblings('.circle').eq(0).css('border', '3px solid rgba(255,255,255,'+parseFloat(0.1+valDarkness/valMaxDarkness)+')');
        }
    };
    ctx.env=env;
    var self=env;
})(app);
(function(ctx){
    "use strict";
    var data,$input,mouseX,mouseY,activeUser, posX, posY, sceneX, sceneY;

    var user={
        // Application Constructor
        initialize: function(data){
            $input=$('#user_input');
            self.setData(data);
            sceneX=ctx.getSceneOffset().x;
            sceneY=ctx.getSceneOffset().y;
            if(data.length>0){
                self.setActiveUser(0);
            }
            for(var i=0; i<data.length; i++){
                self.setDimensions(i);
            }
            self.bindEvents();
        },
        getData: function(){
            return data;
        },
        setData: function(dataset){
            data=dataset;
        },
        getActiveUser: function(){
            return activeUser;
        },
        setActiveUser: function(idUser){
            activeUser=idUser;
        },
        /**
            specify user sprite dimensions
        */
        setDimensions: function(i){
            data[i].width=data[i].$el.width();
            data[i].height=data[i].$el.height();
        },
        bindEvents: function(){
            /* manage user presence */
            $input.on('click', function(e){
                e.preventDefault();
                if(data[activeUser].alive===1){
                    data[activeUser].alive=0;
                    ctx.params.setUserStatus(0);
                    data[activeUser].$el.css('display', 'none');
                    $input.val('N0');
                }else{
                    data[activeUser].alive=1;
                    ctx.params.setUserStatus(1);
                    data[activeUser].$el.css('display', 'block');
                    $input.val('YES');
                }
            });
            /**
                manage user movement by drag&drop
            */
            data[activeUser].$el.on('mousedown', function(e){
                var $this=$(this);
                $this.on('mousemove', function(e){
                    e.preventDefault();
                    posY=e.clientY-sceneY-data[activeUser].height*0.5;
                    posX=e.clientX-sceneX-data[activeUser].width*0.5;
                    if(posY<320 && posY>212 && posX>-80 && posX<950){
                        ctx.params.setUserPos(posX, posY);
                        $(this).css({'top': posY +'px', 'left': posX + 'px'});
                        ctx.controller.controlOutput();
                    }
                });
                $this.on('mouseup', function(e){
                    $(this).off('mousemove');
                });
            });
        }
    };
    ctx.user=user;
    var self=user;
})(app);
(function(ctx){
    "use strict";
    var params={
        windowOpen: 0,
        time: {hour: 12, minute: 0, timestamp: 43200},
        luxEnv: 0,
        hygrometrie: {hygro:0, time: {low: 0, medium: 0, high: 0}},
        user: {x: 0, y:0, status: 0},
        grill: {power: 0, time: {low: 0, medium: 0, high: 0}},
        luxHotte: 0,
        luxPlan: 0,
        luxTable: 0,
        luxWall: 0,
        ventilation: 0,
        tempExt: 0,
        tempInt: 0,
        heating: 0,
        windows: {open: 0, shutter: 0}
    };
    var position={
        luxHotte: {x:0, y:0},
        luxPlan: {x: 0, y:0},
        luxTable: {x: 0, y: 0},
        luxWall: {x: 0, y: 0},
        grill: {x: 0, y: 0}
    };
    var params={
        // Application Constructor
        initialize: function(initParams){
            params=initParams;
        },
        getParams: function(){
            return params;
        },
        setWindow: function(val){
            params.windowOpen=parseInt(val);
        },
        setTime: function(hour, minute, timestamp){
            params.time.hour=parseInt(hour);
            params.time.minute=parseInt(minute);
            params.time.timestamp=timestamp;
        },
        setLuxEnv: function(val){
            params.luxEnv=parseInt(val);
        },
        setHygro: function(val){
            params.hygrometrie.hygro=parseInt(val);
        },
        setHygroTime: function(low, medium, high){
            params.hygrometrie.time.low=parseInt(low);
            params.hygrometrie.time.medium=parseInt(medium);
            params.hygrometrie.time.high=parseInt(high);
        },
        setUserPos: function(valX, valY){
            params.user.x=parseInt(valX);
            params.user.y=parseInt(valY);
        },
        setUserStatus: function(status){
            params.user.status=(status)? 1 : 0;
        },
        setGrill: function(val){
            params.grill.power=parseInt(val);
        },
        setGrillTime: function(low, medium, high){
            params.grill.time.low=parseInt(low);
            params.grill.time.medium=parseInt(medium);
            params.grill.time.high=parseInt(high);
        },
        setLuxHotte: function(val){
            params.luxHotte=parseInt(val);
        },
        setLuxPlan: function(val){
            params.luxPlan=parseInt(val);
        },
        setLuxTable: function(val){
            params.luxTable=parseInt(val);
        },
        setLuxWall: function(val){
            params.luxWall=parseInt(val);
        },
        setVentilation: function(val){
            params.ventilation=parseInt(val);
        },
        setTempExt: function(val){
            params.tempExt=parseInt(val);
        },
        setTempInt: function(val){
            params.tempInt=parseInt(val);
        },
        setHeating: function(val){
            params.heating=parseInt(val);
        },
        setWindowsOpen: function(val){
            if(parseInt(val)<=100 && parseInt(val)>=0){
                params.windows.open=parseInt(val);
            }
        },
        setWindowsShutter: function(val){
            if(parseInt(val)<=100 && parseInt(val)>=0){
                params.windows.shutter=parseInt(val);
            }
        },
        setPositionLuxPlan: function(x, y){
            position.luxPlan.x=x-ctx.getSceneOffset().x;
            position.luxPlan.y=y-ctx.getSceneOffset().y;
        },
        setPositionLuxHotte: function(x, y){
            position.luxHotte.x=x-ctx.getSceneOffset().x;
            position.luxHotte.y=y-ctx.getSceneOffset().y;
        },
        setPositionLuxTable: function(x, y){
            position.luxTable.x=x-ctx.getSceneOffset().x;
            position.luxTable.y=y-ctx.getSceneOffset().y;
        },
        setPositionLuxWall: function(x, y){
            position.luxWall.x=x-ctx.getSceneOffset().x;
            position.luxWall.y=y-ctx.getSceneOffset().y;
        },
        setPositionGrill: function(x, y){
            position.grill.x=x-ctx.getSceneOffset().x;
            position.grill.y=y-ctx.getSceneOffset().y;
        },
        /**
            position x,y for all spacio type input : lux & grill
        */
        getPosition: function(){
            return position;
        }
    };
    ctx.params=params;
    var self=params;
})(app);
(function(ctx){
    "use strict";
    var data, count, $input, $hottePower, s, scene, stray, color, valMax;

    var ventilation={
        // Application Constructor
        initialize: function(data){
            $input=$('#ventilation_input');
            valMax=$input.attr('max');
            $hottePower=$('#hotte_power');
            s=Snap("#hotte_power");
            color='#FFF';
            scene=Snap.load("assets/img/scene/hotte_power.svg", function(loadedFragment){
                stray=loadedFragment.selectAll("path").attr({fill: color, opacity: 0});
                s.append(stray);
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
            //requestAnimFrame(self.changeDisplayVal);
            //self.changeDisplayVal();
            self.viewVentilation();
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
        },
        /**
            change ventilation stray view in scene
        */
        viewVentilation: function(){
            if(data.debit<valMax*0.3){
                $hottePower.css('width', '25px');
            }else if(data.debit<valMax*0.6){
                $hottePower.css('width', '40px');
            }else{
                $hottePower.css('width', '60px');
            }
            stray.animate({opacity: (data.debit/valMax)*2}, 500);
        }
    };
    ctx.ventilation=ventilation;
    var self=ventilation;
})(app);
(function(ctx){
    "use strict";
    var data, count, $input, s, scene, stray, colorOn, colorOff, valMax;

    var heating={
        // Application Constructor
        initialize: function(data){
            $input=$('#heating_input');
            valMax=$input.attr('max');
            s=Snap("#heating");
            colorOn='#BC3D41';
            colorOff='#FFF';
            scene=Snap.load("assets/img/scene/heating.svg", function(loadedFragment){
                stray=loadedFragment.selectAll("path").attr({fill: colorOff, opacity: 0});
                s.append(stray);
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
                self.setHeatingPower($(this).val()).updateHeating();
            });
        },
         /**
            set heating in data
        */
        setHeatingPower: function(val){
            $input.val(val).attr('value', val);
            data.initialPower=data.power;
            data.power=val;
            ctx.params.setHeating(val);
            return self;
        },
        /**
            update heating power value in scene
        */
        updateHeating: function(){
            count=0;
            //requestAnimFrame(self.changeDisplayVal);
            //self.changeDisplayVal();
            self.viewHeating();
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
        },
        /**
            change grill color based on value
        */
        viewHeating: function(){
            if(data.power>300){
                stray.animate({opacity: data.power/valMax, fill: colorOn}, 500);
            }else{
                stray.animate({opacity: (data.power/valMax)*5, fill: colorOff}, 500);
            }
        }

    };
    ctx.heating=heating;
    var self=heating;
})(app);
(function(ctx){
    "use strict";
    var data, count, $input, s, viewHumiLow, viewHumiHigh, sceneWidth, sceneHeight,
    valMax, valMin, diff, $container=$('.circle.humidity'), $slider=$('#slider_humidity'), sliderW2=$slider.width()/2, sliderH2=$slider.height()/2, radius=70, deg=120, elP=$container.offset(), elPos={ x: elP.left, y: elP.top}, X=0, Y=0, mdown=false, mPos={x: elPos.x, y: elPos.y}, atan=Math.atan2(mPos.x-radius, mPos.y-radius);

    var hygro={
        // Application Constructor
        initialize: function(data){
            $input=$('#hygro_input');
            valMax=parseInt($input.attr('max'));
            valMin=parseInt($input.attr('min'));
            diff=Math.abs(valMax-valMin);
            data.t=parseInt($input.val());
            self.setData(data);

            s=Snap('#humidity');
            sceneWidth=app.getSceneWidth();
            sceneHeight=app.getSceneHeight();
            viewHumiLow=s.group(s.image('assets/img/scene/humi_1.svg', -sceneWidth*0.05, -sceneHeight*0.2, 370, 370), s.image('assets/img/scene/humi_2.svg', sceneWidth*0.2, sceneHeight*0.5, 300, 300), s.image('assets/img/scene/humi_1.svg', sceneWidth*0.7, sceneHeight*0.4, 350, 350)).attr({opacity: 0});
            viewHumiHigh=s.group(s.image('assets/img/scene/humi_1.svg', 0, sceneHeight*0.25, 500, 500), s.image('assets/img/scene/humi_1.svg', sceneWidth*0.35, 0, 500, 500), s.image('assets/img/scene/humi_1.svg', sceneWidth*0.4, sceneHeight*0.45, 450, 450)).attr({opacity: 0});
            X=Math.round(radius* Math.sin(deg*Math.PI/180));    
            Y=Math.round(radius*  -Math.cos(deg*Math.PI/180));
            $slider.css({ left: X+radius-sliderW2, top: Y+radius-sliderH2 });  
            self.setHygroValue((deg * ((valMax-valMin)/360))+valMin).updateHygro();
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
            /* range hygro */
            $container
            .mousedown(function (e){mdown=true;})
            .mouseup(function (e){mdown=false;})
            .mousemove(function (e){
                if(mdown){
                    mPos = {x: e.clientX-elPos.x, y: e.clientY-elPos.y};
                    atan = Math.atan2(mPos.x-radius, mPos.y-radius);
                    deg = -atan/(Math.PI/180) + 180;
                         
                    X = Math.round(radius* Math.sin(deg*Math.PI/180));    
                    Y = Math.round(radius* -Math.cos(deg*Math.PI/180));
                    $slider.css({ left: X+radius-sliderW2, top: Y+radius-sliderH2 });
                    self.setHygroValue((deg * (diff/360))+valMin).updateHygro();
                }
            });
        },
         /**
            set hygro in data
        */
        setHygroValue: function(val){
            $input.val(val).attr('val', val);
            data.initialHygro=data.hygro;
            data.hygro=val;
            ctx.params.setHygro(val);
            return self;
        },
        /**
            update humidity % value in scene
        */
        updateHygro: function(){
            count=0;
            requestAnimFrame(self.changeDisplayVal);
            self.changeDisplayVal();
            self.viewHumi();
        },
        /**
            change humidity from initial value to final value in display zone
        */
        changeDisplayVal: function(){
            data.$display.html(Math.floor(data.hygro));
            data.$display.parent().siblings('.circle').eq(0).css('border', '3px solid rgba(255,255,255,'+parseFloat(0.1+(data.hygro-valMin)/diff)+')');
            /*if(data.initialHygro<data.hygro){
                if(count+parseInt(data.$display.html())>data.hygro){
                    data.$display.html(Math.floor(data.hygro));
                }else{
                    requestAnimFrame(self.changeDisplayVal);
                    count+=0.1;
                    data.$display.html(Math.floor(parseInt(data.$display.html())+count));
                }
            }else{
                if(count+parseInt(data.$display.html())<data.hygro){
                    data.$display.html(Math.floor(data.hygro));
                }else{
                    requestAnimFrame(self.changeDisplayVal);
                    count-=0.1;
                    data.$display.html(Math.floor(parseInt(data.$display.html())+count));
                }
            }*/
        },
        /**
            change humidity in view
        */
        viewHumi: function(){
            if(data.hygro>90){
                self.animateHumiGroups((data.hygro-valMin)/diff, (data.hygro-valMin)/diff);
            }else if(data.hygro>80){
                self.animateHumiGroups((data.hygro-valMin)/diff, 0);
            }else{
                self.animateHumiGroups(0, 0);
            }
        },
        /**
            animate humi groups
        */
        animateHumiGroups: function(low, high){
            viewHumiLow.animate({'opacity': low}, 500);
            viewHumiHigh.animate({'opacity': high}, 500);
        }
    };
    ctx.hygro=hygro;
    var self=hygro;
})(app);
(function(ctx){
    "use strict";
    var temperature={
        // Application Constructor
        initialize: function(data){
            // Initialize temperature children
            self.ext.initialize(data.ext);
            self.inside.initialize(data.inside);
        },
        bindEvents: function(){
        }
    };
    ctx.temperature=temperature;
    var self=temperature;
})(app);
(function(ctx){
    "use strict";
    var data, count, $input, $chaud, $froid,
    valMax, valMin, moy, diff, $container=$('.circle.temperature'), $slider=$('#slider_temperature'), sliderW2=$slider.width()/2, sliderH2=$slider.height()/2, radius=70, deg=80, elP=$container.offset(), elPos={ x: elP.left, y: elP.top}, X=0, Y=0, mdown=false, mPos={x: elPos.x, y: elPos.y}, atan=Math.atan2(mPos.x-radius, mPos.y-radius);

    var inside={
        // Application Constructor
        initialize: function(data){
            $chaud=$('#chaud');
            $froid=$('#froid');
            $input=$('#temp_int_input');
            valMax=parseInt($input.attr('max'));
            valMin=parseInt($input.attr('min'));
            moy=(valMax+valMin)/2;
            diff=Math.abs(valMax-valMin);
            data.t=parseInt($input.val());
            self.setData(data);

            X = Math.round(radius* Math.sin(deg*Math.PI/180));    
            Y = Math.round(radius*  -Math.cos(deg*Math.PI/180));
            $slider.css({ left: X+radius-sliderW2, top: Y+radius-sliderH2 });
            self.setTemperature(deg*(diff/360)+valMin);
            self.bindEvents();
            self.changeDisplayVal();
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
            /* range temp int */          
            $container
            .mousedown(function (e){mdown=true;})
            .mouseup(function (e){mdown=false;})
            .mousemove(function (e){
                if(mdown){
                    mPos = {x: e.clientX-elPos.x, y: e.clientY-elPos.y};
                    atan = Math.atan2(mPos.x-radius, mPos.y-radius);
                    deg = -atan/(Math.PI/180) + 180;
                         
                    X=Math.round(radius* Math.sin(deg*Math.PI/180));    
                    Y=Math.round(radius* -Math.cos(deg*Math.PI/180));
                    $slider.css({ left: X+radius-sliderW2, top: Y+radius-sliderH2 });
                    self.setTemperature(deg*(diff/360)+valMin).updateTemperature();
                }
            });
        },
        /**
            set temp    
        */
        setTemperature: function(val){
            $input.val(val).attr('value', val);
            data.initialT=data.t;
            data.t=val;
            window.app.params.setTempInt(val);
            return self;
        },
        /**
            update T° outside value in scene
        */
        updateTemperature: function(){
            count=0;
            requestAnimFrame(self.changeDisplayVal);
            self.changeDisplayVal();
            self.viewTemperatureInside();
        },
        /**
            change T° inside from initial value to final value in display zone
        */
        changeDisplayVal: function(){
            data.$display.html(Math.floor(data.t));
            data.$display.parent().siblings('.circle').eq(0).css('border', '3px solid rgba(255,255,255,'+parseFloat(0.1+(data.t-valMin)/diff)+')');
            /*if(data.initialT<data.t){
                if(count+parseInt(data.$display.html())>data.t){
                    data.$display.html(Math.floor(data.t));
                }else{
                    requestAnimFrame(self.changeDisplayVal);
                    count+=0.1;
                    data.$display.html(Math.floor(parseInt(data.$display.html())+count));
                }
            }else{
                if(count+parseInt(data.$display.html())<data.t){
                    data.$display.html(Math.floor(data.t));
                }else{
                    requestAnimFrame(self.changeDisplayVal);
                    count-=0.1;
                    data.$display.html(Math.floor(parseInt(data.$display.html())+count));
                }
            }*/
        },
        /**
            change background T° atmosphere
        */ 
        viewTemperatureInside: function(){
            if(data.t>moy){
                $froid.css('opacity', 0);
                $chaud.css('opacity', Math.abs((data.t-moy)/(diff*0.5)));
            }else{
                $chaud.css('opacity', 0);
                $froid.css('opacity', Math.abs((data.t-moy)/(diff*0.5))*0.7);
            }
        }
    };
    ctx.inside=inside;
    var self=inside;
})(app.temperature);
(function(ctx){
    "use strict";
    var data, count, $input,
    valMax, valMin, $container=$('.circle.meteorology'), $slider=$('#slider_meteorology'), sliderW2=$slider.width()/2, sliderH2=$slider.height()/2, radius=70, deg=180, elP=$container.offset(), elPos={ x: elP.left, y: elP.top}, X=0, Y=0, mdown=false, mPos={x: elPos.x, y: elPos.y}, atan=Math.atan2(mPos.x-radius, mPos.y-radius);

    var ext={
        // Application Constructor
        initialize: function(data){
            $input=$('#temp_ext_input');
            valMax=parseInt($input.attr('max'));
            valMin=parseInt($input.attr('min'));
            data.t=parseInt($input.val());
            self.setData(data);
            X = Math.round(radius* Math.sin(deg*Math.PI/180));    
            Y = Math.round(radius*  -Math.cos(deg*Math.PI/180));
            $slider.css({ left: X+radius-sliderW2, top: Y+radius-sliderH2 });      
            self.setTemperature(deg * ((valMax-valMin)/360) + valMin);
            self.bindEvents();
            self.changeDisplayVal();
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
            /* range temp ext */
            $container
            .mousedown(function (e){mdown=true;})
            .mouseup(function (e){mdown=false;})
            .mousemove(function (e){
                if(mdown){
                    mPos = {x: e.clientX-elPos.x, y: e.clientY-elPos.y};
                    atan = Math.atan2(mPos.x-radius, mPos.y-radius);
                    deg = -atan/(Math.PI/180) + 180;
                         
                    X = Math.round(radius* Math.sin(deg*Math.PI/180));    
                    Y = Math.round(radius* -Math.cos(deg*Math.PI/180));
                    $slider.css({ left: X+radius-sliderW2, top: Y+radius-sliderH2 });
                    self.setTemperature(deg * ((valMax-valMin)/360) + valMin).updateTemperature();
                }
            });
        },
        /**
            set temp    
        */
        setTemperature: function(val){
            $input.val(val).attr('value', val);
            data.initialT=data.t;
            data.t=val;
            window.app.params.setTempExt(val);
            return self;
        },
        /**
            update T° outside value in scene
        */
        updateTemperature: function(){
            count=0;
            requestAnimFrame(self.changeDisplayVal);
            self.changeDisplayVal();
        },
        /**
            change T° outside from initial value to final value in display zone
        */
        changeDisplayVal: function(){
            data.$display.html(Math.floor(data.t));
            data.$display.parent().siblings('.circle').eq(0).css('border', '3px solid rgba(255,255,255,'+parseFloat(0.1+(data.t-valMin)/(valMax-valMin))+')');
            /*if(data.initialT<data.t){
                if(count+parseInt(data.$display.html())>data.t){
                    data.$display.html(Math.floor(data.t));
                }else{
                    requestAnimFrame(self.changeDisplayVal);
                    count+=0.1;
                    data.$display.html(Math.floor(parseInt(data.$display.html())+count));
                }
            }else{
                if(count+parseInt(data.$display.html())<data.t){
                    data.$display.html(Math.floor(data.t));
                }else{
                    requestAnimFrame(self.changeDisplayVal);
                    count-=0.1;
                    data.$display.html(Math.floor(parseInt(data.$display.html())+count));
                }
            }*/
        }
    };
    ctx.ext=ext;
    var self=ext;
})(app.temperature);
(function(ctx){
    "use strict";
    var data, count, $input, s, scene, plaque, colorOn,
    valMax, $container=$('.circle.heating'), $slider=$('#slider_heating'), sliderW2=$slider.width()/2, sliderH2=$slider.height()/2, radius=70, deg=0, elP=$container.offset(), elPos={ x: elP.left, y: elP.top}, X=0, Y=0, mdown=false, mPos={x: elPos.x, y: elPos.y}, atan=Math.atan2(mPos.x-radius, mPos.y-radius);

    var grill={
        // Application Constructor
        initialize: function(data){
            $input=$('#grill_input');
            data.posX=$('#grill').offset().left;
            data.posY=$('#grill').offset().top;
            valMax=parseInt($input.attr('max'));
            data.power=parseInt($input.val());
            window.app.params.setPositionGrill(data.posX, data.posY);
            s=Snap("#grill");
            colorOn='#BC3D41';
            scene=Snap.load("assets/img/scene/plaque.svg", function(loadedFragment){
                plaque=loadedFragment.selectAll("ellipse").attr({fill: colorOn, opacity: 0});
                s.append(plaque);
            });
            self.setData(data);

            X=Math.round(radius* Math.sin(deg*Math.PI/180));    
            Y=Math.round(radius*  -Math.cos(deg*Math.PI/180));
            $slider.css({ left: X+radius-sliderW2, top: Y+radius-sliderH2 });      
            self.setGrillPower(deg * (valMax/360));
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
            /* range grill */            
            $container
            .mousedown(function (e){mdown=true;})
            .mouseup(function (e){mdown=false;})
            .mousemove(function (e){
                if(mdown){
                    mPos = {x: e.clientX-elPos.x, y: e.clientY-elPos.y};
                    atan = Math.atan2(mPos.x-radius, mPos.y-radius);
                    deg = -atan/(Math.PI/180) + 180;
                         
                    X = Math.round(radius* Math.sin(deg*Math.PI/180));    
                    Y = Math.round(radius* -Math.cos(deg*Math.PI/180));
                    $slider.css({ left: X+radius-sliderW2, top: Y+radius-sliderH2 });
                    self.setGrillPower(deg * (valMax/360)).updateGrill();
                }
            });
        },
         /**
            set grill power in data
        */
        setGrillPower: function(val){
            $input.val(val).attr('value', val);
            data.initialPower=data.power;
            data.power=val;
            ctx.params.setGrill(val);
            return self;
        },
        /**
            update grill power value in scene
        */
        updateGrill: function(){
            count=0;
            requestAnimFrame(self.changeDisplayVal);
            self.changeDisplayVal();
            self.viewGrill();
        },
        /**
            change grill power from initial value to final value in display zone
        */
        changeDisplayVal: function(){
            data.$display.html(Math.floor(data.power));
            data.$display.parent().siblings('.circle').eq(0).css('border', '3px solid rgba(255,255,255,'+parseFloat(0.1+data.power/valMax)+')');
            /*if(data.initialPower<data.power){
                if(count+parseInt(data.$display.html())>data.power){
                    data.$display.html(Math.floor(data.power));
                }else{
                    requestAnimFrame(self.changeDisplayVal);
                    count+=0.1;
                    data.$display.html(Math.floor(parseInt(data.$display.html())+count));
                }
            }else{
                if(count+parseInt(data.$display.html())<data.power){
                    data.$display.html(Math.floor(data.power));
                }else{
                    requestAnimFrame(self.changeDisplayVal);
                    count-=0.1;
                    data.$display.html(Math.floor(parseInt(data.$display.html())+count));
                }
            }*/
        },
        /**
            change grill color based on value
        */
        viewGrill: function(){
            plaque.animate({opacity: data.power/valMax}, 500);
        }
    };
    ctx.grill=grill;
    var self=grill;
})(app);
(function(ctx){
    "use strict";
    var params, positions;
    var controller={
        // Application Constructor
        initialize: function(){
            self.bindEvents();
        },
        bindEvents: function(){
            $('input[type="range"]').on('change', function(e){
                e.preventDefault();
                self.controlOutput();
            });
            $('input:not([type="range"])').on('click', function(e){
                e.preventDefault();
                self.controlOutput();
            });
        },
        /**
            change output behaviour / input
        */
        controlOutput: function(){
            params=ctx.params.getParams();
            positions=ctx.params.getPosition();
            if(params.time.hour>20 || params.time.hour<7){
                ctx.windows.shutter.setState(100).updateState();
            }else{
                ctx.windows.shutter.setState(0).updateState();
            }
            if((7>params.time.hour || params.time.hour>20 || params.luxEnv<25000) && ctx.user.getData()[0].alive){
                if(Math.sqrt(Math.pow(params.user.x-positions.luxPlan.x, 2)+Math.pow(params.user.y-positions.luxPlan.y, 2))<200){
                    ctx.lamps.plan.setLux(300).updateLux();
                }else if(Math.sqrt(Math.pow(params.user.x-positions.luxPlan.x, 2)+Math.pow(params.user.y-positions.luxPlan.y, 2))>=200){
                    ctx.lamps.plan.setLux(100).updateLux();
                }
                if(Math.sqrt(Math.pow(params.user.x-positions.luxHotte.x, 2)+Math.pow(params.user.y-positions.luxHotte.y, 2))<250){
                    ctx.lamps.hotte.setLux(300).updateLux();
                }else if(Math.sqrt(Math.pow(params.user.x-positions.luxHotte.x, 2)+Math.pow(params.user.y-positions.luxHotte.y, 2))<400){
                    ctx.lamps.hotte.setLux(150).updateLux();
                }else if(Math.sqrt(Math.pow(params.user.x-positions.luxHotte.x, 2)+Math.pow(params.user.y-positions.luxHotte.y, 2))>=400){
                    ctx.lamps.hotte.setLux(0).updateLux();
                }
                if(Math.sqrt(Math.pow(params.user.x-positions.luxTable.x, 2)+Math.pow(params.user.y-positions.luxTable.y, 2))<350){
                    ctx.lamps.table.setLux(300).updateLux();
                }else if(Math.sqrt(Math.pow(params.user.x-positions.luxTable.x, 2)+Math.pow(params.user.y-positions.luxTable.y, 2))>=350){
                    ctx.lamps.table.setLux(100).updateLux();
                }
                if(Math.sqrt(Math.pow(params.user.x-positions.luxWall.x, 2)+Math.pow(params.user.y-positions.luxWall.y, 2))<200){
                    ctx.lamps.wall.setLux(300).updateLux();
                }else if(Math.sqrt(Math.pow(params.user.x-positions.luxWall.x, 2)+Math.pow(params.user.y-positions.luxWall.y, 2))>=200){
                    ctx.lamps.wall.setLux(100).updateLux();
                }
            }else{
                ctx.lamps.plan.setLux(0).updateLux();
                ctx.lamps.table.setLux(0).updateLux();
                ctx.lamps.hotte.setLux(0).updateLux();
                ctx.lamps.wall.setLux(0).updateLux();
            }
            /* duration of hygro treshold */
            if(params.hygrometrie.hygro<80){
                ctx.params.setHygroTime(params.hygrometrie.time.low+1, 0, 0);
            }else if(params.hygrometrie.hygro<90){
                ctx.params.setHygroTime(0, params.hygrometrie.time.medium+1, 0);
            }else{
                ctx.params.setHygroTime(0, 0, params.hygrometrie.time.high+1);
            }
            /* duration of grill activity */
            if(params.grill.power<1){
                ctx.params.setGrillTime(0, 0, 0);
            }else if(params.grill.power<1000){
                ctx.params.setGrillTime(params.grill.time.low+1, 0, 0);
            }else if(params.grill.power<2000){
                ctx.params.setGrillTime(0, params.grill.time.medium+1, 0);
            }else{
                ctx.params.setGrillTime(0, 0, params.grill.time.high+1);
            }
        }
    };
    ctx.controller=controller;
    var self=controller;
})(app);