var MYPLANE_SIZE=[
	null,
	{x:20,y:40,w:157,h:117},
	{x:0,y:37,w:200,h:100},
	{x:9,y:34,w:182,h:120}
]
class MyPlane{
	constructor(type){
		if( type>3 ){
			this.type=3;
		}
		this.type=type;		/*类型即血量，击中一下，type--,等于0结束游戏*/
		this.x=100;
		this.y=500;
		this.shut=false;
		this.timer=null;
		this.success=true;
		if( this.success ){
			this.move();
		}
	}
	draw(o2d){
		if( this.type>0 ){
			var x = MYPLANE_SIZE[this.type].x
			var y = MYPLANE_SIZE[this.type].y
			var w = MYPLANE_SIZE[this.type].w
			var h = MYPLANE_SIZE[this.type].h
			this.w=w;
			this.h=h;
			o2d.save();
			o2d.drawImage(JSON["my_blue"+this.type+'.png'],
				x,y,w,h,
				this.x,this.y,w/2,h/2
				)
			o2d.restore();
		}				
	}
	move(){		
		var _this=this;
		window.addEventListener('touchmove',function(e){
			e.preventDefault();
			var x=e.touches[0].clientX-_this.w/4
			var y=e.touches[0].clientY-_this.h/4

			x=Math.min( Math.max( 0,x ),$("can").width-_this.w/2 )
			y=Math.min( Math.max( 0,y ),$("can").height-_this.h/2 )
			_this.x=x;
			_this.y=y;
		})
		this.timer=setInterval(function(){
			this.shut=true;
		}.bind(this),500)
	}
	isIn(x,y){
		if( x-5>this.x&&
			x<this.x+this.w/2&& 
			y-5>this.y&&
			y<this.y+this.h/2 
		){
			return true;		
		}
	}
}
