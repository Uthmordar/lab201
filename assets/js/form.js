(function(ctx){
    "use strict";
    var $input, $popIn, $sceneBlur, $formSubmit, $close;

    var form={
        // Application Constructor
        initialize: function(data){
            $input=$('.circle.more');
            $popIn=$('#rules_form');
            $sceneBlur=$('#app_blur');
            $close=$popIn.children('.pop_in').children('.close');
            $formSubmit=data;
            self.bindEvents();
        },
        bindEvents: function(){
            $input.on('click', function(e){
                e.preventDefault();
                self.displayPopIn();
            });

            $formSubmit.on('click', function(e){
                e.preventDefault();
                self.hidePopIn();
            });

            $close.on('click', function(e){
                e.preventDefault();
                self.hidePopIn();
            });
        },
        displayPopIn: function(){
            $popIn.removeClass('hidden');
            $popIn.css({'left': window.innerWidth*0.5-$popIn.width()*0.5 +'px', 'top': window.innerHeight*0.5-$popIn.height()*0.5 + 'px'});
            $sceneBlur.addClass('blur');
        },
        hidePopIn: function(){
            $popIn.addClass('hidden');
            $sceneBlur.removeClass('blur');
        }
    };
    ctx.form=form;
    var self=form;
})(app);