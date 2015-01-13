(function(ctx){
    "use strict";
    var data,$input,mouseX,mouseY;

    var user={
        // Application Constructor
        initialize: function(data){
            $input=$('#user_input');
            self.setData(data);
            self.bindEvents();
        },
        getData: function(){
            return data;
        },
        setData: function(dataset){
            data=dataset;
        },
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
            });
        }
    };
    ctx.user=user;
    var self=user;
})(app);