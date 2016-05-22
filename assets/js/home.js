(function(ctx){
    "use strict";
    var $scene, $prev, $next, $arrow, current = 0, $this, length, $home;

    var dialog = [
        "<p>Welcome to our simulator ! Through this presentation, you can imagine how your system can help controlled to be smarter with EXPRESS<span class='red strong'>IF</span>.<br/><br/>Let us make a point on our product.</p>",
        '<p>EXPRESS<span class="red strong">IF</span> is a fuzzy inference system completed by semantics to easily made control based on "IF-Then" rules.</p>',
        "<p>Learn more about Express<span class='red strong'>IF</span> or discover our simulator now</p><section class='buttons_container'><div class='button_container'><a href='#'>LEARN</a></div><div class='button_container'><a href='' id='start_simulation'>DISCOVER</a></div></section>"
    ];

    var home = {
        // Application Constructor
        initialize: function(output) {
            $scene = $("#home .talk");
            $home = $("#home");
            $arrow = $scene.children(".arrow");
            $prev = $scene.children(".arrow.previous");
            $next = $scene.children(".arrow.next");
            if (Array.isArray(output)) {
                dialog = output;
            }
            length = dialog.length;
            $scene.children(".content").html(dialog[current]);
            self.bindEvents();
        },
        bindEvents: function() {
            $scene.siblings(".close").on("touch click", function(e) {
                self.startSimulation();
            });
            $(document).on("touch click", "#start_simulation", function(e) {
                e.preventDefault();
                self.startSimulation();
                return false;
            });
            $arrow.on("click touch", function(e) {
                e.preventDefault();
                self.changeTalk($(this));
            });
        },
        startSimulation: function(auto) {
            $home.remove();
            app.run();
        },
        changeTalk: function(control) {
            if (control.hasClass("next")) {
                current = (current < length - 1) ? current + 1 : current;
                $prev.css({"opacity": 1});
            } else {
                current = (current > 0) ? current - 1 : current;
                $next.css({"opacity": 1});
            }
            $scene.children(".content").html(dialog[current]);
            if (current == length - 1) {
                $next.css({"opacity": 0});
            } else if (current == 0) {
                $prev.css({"opacity": 0});
            }
        }
    };
    ctx.home = home;
    var self = home;
})(window);