(function(ctx){
    "use strict";
    var $input, $popIn, $sceneBlur, $formSubmit;

    var form={
        // Application Constructor
        initialize: function(data){
            $input=$('.circle.more');
            $popIn=$('#rules_form');
            $sceneBlur=$('#app_blur');
            $formSubmit=data;
            self.bindEvents();
        },
        bindEvents: function(){
            $input.on('click', function(e){
                e.preventDefault();
                $popIn.removeClass('hidden');
                $popIn.css({'left': window.innerWidth*0.5-$popIn.width()*0.5 +'px', 'top': window.innerHeight*0.5-$popIn.height()*0.5 + 'px'});
                $sceneBlur.addClass('blur');
            });

            $formSubmit.on('click', function(e){
                e.preventDefault();
                $popIn.addClass('hidden');
                $sceneBlur.removeClass('blur');
            });
        }
    };
    ctx.form=form;
    var self=form;
})(app);