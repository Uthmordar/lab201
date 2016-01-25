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
            self.setSay('<p>Use the bottom panel to control parameters into the kitchen to control lights, shutter and hood.</p>');
            $('#controls_panel').on('tap', function() {
                ctx.say.silent();
            });
        },
        sayTraditional: function() {
            self.setSay("<p>These traditional fuzzy rules are like <span class='strong red'>if</span> the luminosity is low and the kitchent is not empty and the time is 20h00 <span class='strong red'>then</span> the lights are high.</p>");
            setTimeout(function(){ctx.say.silent()}, 5000);
        },
        sayTemporal: function() {
            self.setSay("<p>With this semantic, fuzzy rules are like <span class='red strong'>if</span> the luminosity is low and the user is staying at the table <span class='strong red'>since</span> 2 minutes <span class='strong red'>then</span> the hood light is low and the wall light is low. You can give me another place by drag&drop.</p>");
            setTimeout(function(){ctx.say.silent()}, 5000);
        },
        saySpatioTemporal: function() {
            self.setSay("<p>With this semantic, fuzzy rules are like <span class='strong red'>if</span> the luminosity is low the user <span class='red strong'>walk along</span> the work surface and the time is 3h00 <span class='red strong'>then</span> the hood light is very low and the table light is very low and the wall light is off. You can give me another place by drag&drop.");
            setTimeout(function(){ctx.say.silent()}, 5000);
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