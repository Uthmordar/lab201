(function(ctx){
    "use strict";
    var temperature={
        // Application Constructor
        initialize: function(data){
            self.ext.initialize(data.ext);
            self.inside.initialize(data.inside);
        },
        bindEvents: function(){
        }
    };
    ctx.temperature=temperature;
    var self=temperature;
})(app);