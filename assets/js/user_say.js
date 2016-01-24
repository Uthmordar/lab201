(function(ctx){
    "use strict";
    var $user, $say, tuto=0;

    var say={
        // Application Constructor
        initialize: function(data){
            $user=data;
            $say=$user.children('.talk');
            self.bindEvents();
        },
        setTuto: function(val){
            tuto=val;
            //self.initSpeech();
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
            $('#user').on('tap', function(){
                ctx.say.secondStep();
                $(this).off('tap');
            });
        },
        secondStep: function(){
            self.setSay('<p>You can move me by drag&drop</p><br/><p>Now try to use the controls at screen bottom</p>');
            $('#controls_panel').on('tap', function(){
                ctx.say.setSay('<p>You can alter each intput parameter only by interacting with this bullet.</p><p class="red strong">Now watch the scene and show the rules implications</p>');
                $(this).off('tap');
                setTimeout(function(){ctx.say.silent()}, 3000);
            });
        }
    };
    ctx.say=say;
    var self=say;
})(app.user);