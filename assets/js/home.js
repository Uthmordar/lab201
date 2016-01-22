(function(ctx){
    "use strict";
    var $scene;

    var dialog = {
        first: "<p>Welcome to our simulator ! Through presentation, you can imagine how your system can help controlled to be smarter with EXPRESS<span class='red strong'>IF</span>.<br/><br/>Let us make a point on our product.</p>",
        second: "<p>EXPRESS<span class='red strong'>IF</span> is a fuzzy inference system completed by semantics to easily made control based on 'IF-Then' rules.</p>",
        third: "<p><div class='button'>Read more about Fuzzy Inference System and ExpressIF</div><div class='button'>Enter in the simulator</div></p>"
    };

    var home = {
        // Application Constructor
        initialize: function(scene) {
            $scene = $(scene);
            $scene.children(".content").html(dialog.first);
            self.bindEvents();
        },
        bindEvents: function() {
            $scene.siblings(".close").on("touch click", function(e) {
                $scene.parent().hide();
                app.initialize($('#simulation_container'));
            });
        }
    };
    ctx.home = home;
    var self = home;
})(window);