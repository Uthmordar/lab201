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
    var windowsTab=[
        {el: $('#window_1'), state:0, spriteStart:-25, elLength:156, gap:24, nbStage: 3, slow: 0, speed: 8, open:0, openTarget:75}, 
        {el: $('#window_2'), state: 0, spriteStart:-25, elLength:156, gap:24, nbStage: 3, slow: 0, speed: 16, open:0, openTarget:75}
    ];
    var envTab=[$('#bg_7'), $('#bg_7'), $('#bg_5'), $('#bg_1'), $('#bg_2'), $('#bg_2'), $('#bg_2'), $('#bg_3'), $('#bg_4'), $('#bg_5'), $('#bg_6'), $('#bg_7'), $('#bg_7')];
    var lampsTab=[
        {el: $('#lamp_1'), state:0, spriteStart:-30, elLength:80, gap:30, nbStage: 2, slow: 0, speed: 8, active: 0, intensity: 0}
    ];
    var user=[{el: $('#user'), alive: 1, width: 0, height: 0}];

    var $scene,sceneX,sceneY;
    var params={
        windowOpen: 0,
        time: 12,
        luxEnv: 50000,
        hygrometrie: 0,
        user: {x: 0, y:0, status: 0},
        plaque: 0,
        luxHotte: 0,
        luxPlan: 0,
        luxTable: 0,
        ventilation: 0,
        tempExt: 0,
        tempInt: 0,
        chauffage: 0
    };
    var app={
        // Application Constructor
        initialize: function(scene) {
            this.setScene(scene);
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
            this.params.initialize(params);
            this.windows.initialize(1, windowsTab);
            this.lamps.initialize(0, lampsTab);
            this.env.initialize(envTab);
            this.user.initialize(user, $scene);
            this.controller.initialize();
        },
        getScene: function(){
            return $scene;
        },
        setScene: function(scene){
            $scene=scene;
            sceneX=scene.offset().left;
            sceneY=scene.offset().top;
        },
        getSceneOffset: function(){
            return {x: sceneX, y: sceneY};
        }
    };
    ctx.app=app;
    var self=app;
})(window);