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
    var auto = false;
    var windows={open:{$el: $('#window_open'), $display: $('#windows_open_output .display'), state:0, initialState: 0},
        shutter:{$el: $('#window_shutter'), $display: $('#windows_shutter_output .display'), state:0, initialState: 0}};
    var envTab=[$('#bg_7'), $('#bg_7'), $('#bg_7'), $('#bg_5'), $('#bg_1'), $('#bg_2'), $('#bg_2'), $('#bg_3'), $('#bg_4'), $('#bg_5'), $('#bg_6'), $('#bg_7')];
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
    var params, config;
    /*var params = {
        windowOpen: 0,
        time: {hour: 12, minute: 0, timestamp: 43200},
        luxEnv: 60000,
        hygrometrie: {hygro:80, time: {low: 0, medium: 0, high: 0}},
        user: {x: 0, y:0, status: 1, time: {grill:0, away: 0}},
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
    };*/

    var app={
        // Application Constructor
        initialize: function(scene, configData) {
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
            config = configData;
            $scene = scene;
            this.setParams(config.params);
            this.socket.initialize(config.socket);
            auto = config.simulationEnabled;
            home.initialize(configData.home.dialog);
        },
        run: function() {
            $("#controls_panel").css("opacity", 1);
            this.setScene($scene);
            // Initialize data for api/controller 
            this.params.initialize(params);
            // Initialize all input/output && set data
            this.form.initialize();
            this.heating.initialize(heating);
            this.windows.initialize(windows);
            this.lamps.initialize(lamps);
            this.user.initialize(user, $scene);
            this.ventilation.initialize(ventilation);
            this.hygro.initialize(hygro);
            this.temperature.initialize(temperature);
            this.grill.initialize(grill);
            this.data.initialize();
            // Initialize algorithm controller 
            this.controller.initialize();
            this.env.initialize(envTab);
            self.bindEvents();
        },
        reInitialize: function(scene){
            this.setScene(scene);
            this.hygro.resetControls();
            this.temperature.resetControls();
            this.grill.resetControls();
            this.env.resetControls();
        },
        bindEvents: function(){
            $(window).on('resize', function(e){
                // stop previous timeProgress to increase performance
                self.reInitialize($($scene));
            });
        },
        isAuto: function() {
            return auto;
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
            sceneX=scene.offset().left;
            sceneY=scene.offset().top;
            sceneWidth=parseFloat(scene.width());
            sceneHeight=parseFloat(scene.height());
        },
        setParams: function(data) {
            params = data;
        },
        getParams: function() {
            return self.params.getParams();
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