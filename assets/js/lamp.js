(function(ctx){
    "use strict";
    var lamps={
        // Application Constructor
        initialize: function(data){
            // Initialize lamp children
            self.hotte.initialize(data.hotte);
            self.plan.initialize(data.plan);
            self.table.initialize(data.table);
            self.wall.initialize(data.wall);
        },
        bindEvents: function(){
        }
    };
    ctx.lamps=lamps;
    var self=lamps;
})(app);