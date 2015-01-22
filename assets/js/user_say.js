(function(ctx){
    "use strict";
    var $user, $say, tuto=0;

    var say={
        // Application Constructor
        initialize: function(data){
            $user=data;
            $say=$user.children('.talk');
            self.bindEvents();
            self.initSpeech();
        },
        setTuto: function(val){
            tuto=val;
            self.initSpeech();
            return self;
        },
        getTuto: function(){
            return tuto;
        },
        bindEvents: function(){

        },
        setSay: function(talk){
            $say.removeClass('hidden').html(talk);
            return self;
        },
        silent: function(){
            $say.addClass('hidden').html('');
        },
        initSpeech: function(){
            self.setSay('<p>Touch me</p>');
            $('#user').on('click', function(){
                ctx.say.setSay('<p>Ooooooooooooh YES!!!!!!!!</p><p>You can move me by drag&drop</p>').secondStep();
                $(this).off('click');
            });
        },
        secondStep: function(){
            self.setSay('<p>Try to use the controls at screen bottom</p>');
            $('#controls_panel .circle').on('click', function(){
                ctx.say.setSay('<p>You can alter each intput parameter only by interacting with this bullet.</p><p class="red strong">Now watch the scene and show the rules implications</p>');
                $(this).off('click');
            });
        }
    };
    ctx.say=say;
    var self=say;
})(app.user);