(function(ctx){
    "use strict";
    var init, $panel, $controls, $articleParent, $articles, $this;

    var data={
        // Application Constructor
        initialize: function(){
            $panel = $("#data_panel");
            $controls = $panel.children(".system_menu").children("li");
            $articleParent = $panel.children(".system_items");
            $articles = $articleParent.children("article");
            $panel.css("opacity", 1);
            //init={w: $("#data_grill .input").width(), h: $("#data_grill .input").height(), f: 2.4};
            
            //this.grill.initialize(init);
            //this.inside.initialize(init);
            //this.outside.initialize(init);
            //this.time.initialize(init);
            self.bindEvents();
        },
        bindEvents: function() {
            $controls.on("click touch", function(e) {
                e.preventDefault();
                $this = $(this);
                $controls.removeClass("active");
                $this.addClass("active");
                $articles.removeClass("active");
                $articleParent.children("." + $this.attr("data-article")).addClass("active");
            });
        }
    };
    ctx.data=data;
    var self=data;
})(app);