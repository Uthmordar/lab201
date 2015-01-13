(function(ctx){
	"use strict";
	var $div, freq, width, height, ballWidth, token;
	var vector={x:0,y:0};
	var pos={top:0,left:0};

	var ball={
		init: function(){
			$div=$('#ball');
			freq=18;
			var offset=$div.offset();
			pos.top=offset.top;
			pos.left=offset.left;
			width=window.innerWidth;
			height=window.innerHeight;
			ballWidth=$div.width();
			var watchID=navigator.accelerometer.watchAcceleration(self.accSuccess,
                                                       self.accError, {frequency: freq});
		},
		accSuccess: function(acceleration){
			token=0;
			if((pos.left<5 || pos.left + ballWidth + 5>=width) && Math.abs(vector.x)<3 && acceleration.x<0.2){
				vector.x=0;
				token++;
			}else
				vector.x=vector.x+acceleration.x*0.1;
			if((pos.top<5 || pos.top + ballWidth + 5>=width) && Math.abs(vector.y)<3 && acceleration.y<0.2){
				vector.y=0;
				token++;
			}else
				vector.y=vector.y+acceleration.y*0.1;
			if(token!=2)
				self.moveBall();
		},
		accError: function(){
			console.log('error');
		},
		moveBall: function(){
			if(pos.top<6){
				pos.top=7;
				vector.y=vector.y*(-0.5);
			}
			if(pos.top + ballWidth + 6>=height){
				pos.top=height - ballWidth - 7;
				vector.y=vector.y*(-0.5);
			}
			if(pos.left<6){
				vector.x=vector.x*(-0.5);
				pos.left=7;
			}
			if(pos.left + ballWidth + 6>=width){
				vector.x=vector.x*(-0.5);
				pos.left=width-ballWidth-7;
			}
			if(Math.abs(vector.y)>0.01)
				pos.top=pos.top-vector.y;
			if(Math.abs(vector.x)>0.01)
				pos.left=pos.left+vector.x;
			$div.css({'top': pos.top + 'px', 'left': pos.left + 'px'});
		}
	};

	ctx.ball=ball;
	var self=ball;
})(app);