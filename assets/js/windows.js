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