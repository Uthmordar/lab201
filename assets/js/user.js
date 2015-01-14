(function(ctx){
    "use strict";
<<<<<<< HEAD
    var data,$input,mouseX,mouseY;
=======
    var data,$input,mouseX,mouseY,activeUser;
>>>>>>> gh-pages

    var user={
        // Application Constructor
        initialize: function(data){
            $input=$('#user_input');
            self.setData(data);
<<<<<<< HEAD
=======
            if(data.length>0){
                self.setActiveUser(0);
            }
            for(var i=0; i<data.length; i++){
                self.setDimensions(i);
            }
>>>>>>> gh-pages
            self.bindEvents();
        },
        getData: function(){
            return data;
        },
        setData: function(dataset){
            data=dataset;
        },
<<<<<<< HEAD
        bindEvents: function(){
            $($input).on('click', function(e){
                e.preventDefault();
                if(data[0].alive===1){
                    data[0].alive=0;
                    $(data[0].el).css('display', 'none');
                    $input.val('Away');
                }else{
                    data[0].alive=1;
                    $(data[0].el).css('display', 'block');
                    $input.val('Alive');
                }
            });
            $(data[0].el).on('mousemove', function(e){
                e.preventDefault();
                console.log(e.clientY);
                console.log(e.clientX);
                var $this=$(this);
                $this.css({'top':e.clientY+'px', 'left': e.clientX+'px'});
=======
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
            data[i].width=data[i].el.width();
            data[i].height=data[i].el.height();
        },
        bindEvents: function(){
            /* manage user precense */
            $input.on('click', function(e){
                e.preventDefault();
                if(data[activeUser].alive===1){
                    data[activeUser].alive=0;
                    data[activeUser].el.css('display', 'none');
                    $input.val('Away');
                }else{
                    data[activeUser].alive=1;
                    data[activeUser].el.css('display', 'block');
                    $input.val('Alive');
                }
            });
            /**
                manage user movement by drag&drop
            */
            data[activeUser].el.on('mousedown', function(e){
                var $this=$(this);
                $this.on('mousemove', function(e){
                    e.preventDefault();
                    $(this).css({'top':e.clientY - ctx.getSceneOffset().y - data[activeUser].height*0.5 +'px', 'left':e.clientX - ctx.getSceneOffset().x - data[activeUser].width*0.5+'px'});
                    ctx.controller.controlOutputMvt();
                });
                $this.on('mouseup', function(e){
                    $(this).off('mousemove');
                });
>>>>>>> gh-pages
            });
        }
    };
    ctx.user=user;
    var self=user;
})(app);