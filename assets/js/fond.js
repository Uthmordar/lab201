(function(ctx){
    "use strict";
    var data,start,end,$input,valDarkness,$inputDarkness,$bgDarkness;

    var fond={
        // Application Constructor
        initialize: function(data){
            $input=$('#time_input');
            $inputDarkness=$('#darkness_input');
            $bgDarkness=$('#darkness');
            start=$input.val();
            self.setData(data);
            self.bindEvents();
        },
        getData: function(){
            return data;
        },
        setData: function(dataset){
            data=dataset;
        },
        getDarkness: function(){
            return valDarkness;
        },
        setDarkness: function(darkness){
            valDarkness=darkness;
        },
        bindEvents: function(){
            $input.on('change', function(e){
                e.preventDefault();
                end=$(this).val();
                window.app.fond.changeTime(start,end);
            });
            $inputDarkness.on('change', function(e){
                e.preventDefault();
                window.app.fond.setDarkness($(this).val());
                window.app.fond.changeDarkness();
            });
        },
        /** 
            change time background stage
            stageInit: initial stage;
            stageEnd: final stage;
        */
        changeTime: function(stageInit, stageEnd){
            data[stageInit].css('opacity', 0);
            data[stageEnd].css('opacity', 1);
            start=stageEnd;
        },
        /** 
            change darkness background stage
        */
        changeDarkness: function(){
            $bgDarkness.css('opacity', valDarkness);
        }
    };
    ctx.fond=fond;
    var self=fond;
})(app);