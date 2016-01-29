(function(ctx){
    "use strict";
    var $input, $popIn, $sceneBlur, $formSubmit, $close, $popInTuto, $tutoYes, $tutoNo;

    var form = {
        // Application Constructor
        initialize: function(){
            $input = $('.circle.more');
            $popIn = $('#rules_form');
            $sceneBlur = $('#app_blur');
            $close = $popIn.children('.pop_in').children('.close');

            $popInTuto = $('#tuto_form');
            $popInTuto.css({'opacity': 1, 'left': window.innerWidth * 0.5 - $popInTuto.width() * 0.5 + 'px', 'top': window.innerHeight * 0.5 - $popInTuto.height() * 0.5 + 'px'});
            $tutoYes = $('#tuto_yes');
            $tutoNo = $('#tuto_no, #tuto_form .close');
            self.bindEvents();
        },
        bindEvents: function(){
            // FORM RULES
            $input.on('click', function(e){
                e.preventDefault();
                self.displayPopIn();
            });

            /*$formSubmit.on('click', function(e){
                e.preventDefault();
                self.hidePopIn();
            });*/

            $close.on('click', function(e){
                e.preventDefault();
                self.hidePopIn();
            });
            // FORM TUTO
            $tutoYes.on('click', function(e){
                e.preventDefault();
                $popInTuto.remove();
                ctx.user.say.setTuto(1);
                $sceneBlur.removeClass('blur');
            });

            $tutoNo.on('click', function(e){
                e.preventDefault();
                $popInTuto.remove();
                ctx.user.say.setTuto(0);
                $sceneBlur.removeClass('blur');
            });
        },
        displayPopIn: function(){
            $popIn.removeClass('hidden');
            $popIn.css({'left': window.innerWidth * 0.5 - $popIn.width() * 0.5 + 'px', 'top': window.innerHeight * 0.5 - $popIn.height() * 0.5 + 'px'});
            $sceneBlur.addClass('blur');
        },
        hidePopIn: function(){
            $popIn.addClass('hidden');
            $sceneBlur.removeClass('blur');
        }
    };
    ctx.form = form;
    var self = form;
})(app);