var MYBULLET_SIZE=[
	null,	
	{x:32,y:18,w:29,h:63},
	{x:20,y:18,w:58,h:63},
	{x:4,y:18,w:88,h:63}
]
class MyBullet{
	constructor(type,x,y){
		this.type=type;		
		this.timer=null;
		this.x=x-MYBULLET_SIZE[this.type].w/4;
		this.y=y-MYBULLET_SIZE[this.type].h*3/4;
		this.move();
		this.w =MYBULLET_SIZE[this.type].w
		this.h =MYBULLET_SIZE[this.type].h
	}
	draw(o2d){
		var x = MYBULLET_SIZE[this.type].x
		var y = MYBULLET_SIZE[this.type].y
		var w = MYBULLET_SIZE[this.type].w
		var h = MYBULLET_SIZE[this.type].h		
		o2d.save();
		o2d.drawImage(JSON['myb_'+this.type+'.png'],
			x,y,w,h,
			this.x,this.y,w/2,h/2
		)
		o2d.restore();
	}
	move(){		
		clearInterval( this.timer )
		this.timer=setInterval(function(){
			this.y-=2;
		}.bind(this),8) 
	}
}