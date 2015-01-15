(function(ctx){
    "use strict";

    var lamps={
        // Application Constructor
        initialize: function(data){
            self.hotte.initialize(data.hotte);
            self.plan.initialize(data.plan);
            self.table.initialize(data.table);
        },
        bindEvents: function(){
        }
    };
    ctx.lamps=lamps;
    var self=lamps;
})(app);