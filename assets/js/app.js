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
        {el: $('#window_1'), state:0, spriteStart:-25, elLength:156, gap:24, nbStage: 3, slow: 0, speed: 8}, 
        {el: $('#window_2'), state: 0, spriteStart:-25, elLength:156, gap:24, nbStage: 3, slow: 0, speed: 16}
    ];
    var fondTab=[$('#bg_1'), $('#bg_2'), $('#bg_3'), $('#bg_4'), $('#bg_5'), $('#bg_6'), $('#bg_7')];
    var lampsTab=[
        {el: $('#lamp_1'), state:0, spriteStart:-30, elLength:80, gap:30, nbStage: 2, slow: 0, speed: 8}
    ];
    var user=[{el: $('#user'), alive: 1}];
    var app={
        // Application Constructor
        initialize: function() {
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
            this.windows.initialize(1, windowsTab);
            this.lamps.initialize(0, lampsTab);
            this.fond.initialize(fondTab);
            this.user.initialize(user);
            this.controller.initialize();
        }
    };
    ctx.app=app;
    var self=app;
})(window);