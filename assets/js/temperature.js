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