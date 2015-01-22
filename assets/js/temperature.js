(function(ctx){
    "use strict";
    var temperature={
        // Application Constructor
        initialize: function(data){
            // Initialize temperature children
            self.ext.initialize(data.ext);
            self.inside.initialize(data.inside);
        },
        resetControls: function(){
            self.ext.resetControls();
            self.inside.resetControls();
        },
        bindEvents: function(){
        }
    };
    ctx.temperature=temperature;
    var self=temperature;
})(app);