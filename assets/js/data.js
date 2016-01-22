(function(ctx){
    "use strict";
    var init;

    var data={
        // Application Constructor
        initialize: function(){
            init={w: $("#data_grill .input").width(), h: $("#data_grill .input").height(), f: 2.4};
            
            //this.grill.initialize(init);
            //this.inside.initialize(init);
            //this.outside.initialize(init);
            //this.time.initialize(init);
        }
    };
    ctx.data=data;
    var self=data;
})(app);