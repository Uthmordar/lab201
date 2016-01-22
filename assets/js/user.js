(function(ctx){
    "use strict";
    var data,$input,mouseX,mouseY,activeUser, posX, posY, sceneX, sceneY, $movementPlan;

    var user={
        // Application Constructor
        initialize: function(data){
            $input=$('#user_input');
            $movementPlan = $("#movement_plan");
            self.say.initialize(data[0].$el);
            self.setData(data);
            sceneX=ctx.getSceneOffset().x;
            sceneY=ctx.getSceneOffset().y;
            if(data.length>0){
                self.setActiveUser(0);
            }
            for(var i=0; i<data.length; i++){
                self.setDimensions(i);
            }
            self.bindEvents();
        },
        getData: function(){
            return data;
        },
        setData: function(dataset){
            data=dataset;
        },
        getActiveUser: function(){
            return activeUser;
        },
        setActiveUser: function(idUser){
            activeUser=idUser;
        },
        /**
            specify user sprite dimensions
        */
        setDimensions: function(i){
            data[i].width=data[i].$el.width();
            data[i].height=data[i].$el.height();
        },
        bindEvents: function(){
            /* manage user presence */
            $input.on('click', function(e){
                e.preventDefault();
                if(data[activeUser].alive===1){
                    data[activeUser].alive=0;
                    ctx.params.setUserStatus(0);
                    data[activeUser].$el.css('display', 'none');
                    $input.val('N0');
                    self.say.silent();
                }else{
                    data[activeUser].alive=1;
                    ctx.params.setUserStatus(1);
                    data[activeUser].$el.css('display', 'block');
                    $input.val('YES');
                }
            });
            /**
                manage user movement by drag&drop
            */

            if ($.os !== undefined && $.os.tablet === true) {
                $movementPlan.show();
                $movementPlan.on("touchmove", function(e) {
                    e.preventDefault();
                    posY=e.targetTouches[0].clientY - sceneY - data[activeUser].height*0.5;
                    posX=e.targetTouches[0].clientX - sceneX - data[activeUser].width*0.5;
                    if(posY>370){
                        data[activeUser].$el.addClass("first-plan");
                    } else {
                        data[activeUser].$el.removeClass("first-plan");
                    }
                    ctx.params.setUserPos(posX, posY);
                    data[activeUser].$el.css({'top': posY +'px', 'left': posX + 'px'});
                    ctx.controller.controlOutput();                    
                });
            } else {
                $movementPlan.hide();
                data[activeUser].$el.on('mousedown', function(e){
                    var $this=$(this);
                    $this.on('mousemove', function(e){
                        e.preventDefault();
                        posY=e.clientY-sceneY-data[activeUser].height*0.5;
                        posX=e.clientX-sceneX-data[activeUser].width*0.5;
                        if(posY<320 && posY>212 && posX>-80 && posX<950){
                            ctx.params.setUserPos(posX, posY);
                            $this.css({'top': posY +'px', 'left': posX + 'px'});
                            ctx.controller.controlOutput();
                        }
                    });
                    $this.on('mouseup', function(e){
                        $(this).off('mousemove');
                    });
                });
            }
        }
    };
    ctx.user=user;
    var self=user;
})(app);