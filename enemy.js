var ENEMY=[
	null,
	{x:41,y:53,w:117,h:93},
	{x:42,y:52,w:115,h:95},
	{x:42,y:52,w:115,h:95},
	{x:42,y:52,w:115,h:95},
	{x:42,y:52,w:115,h:95},
	{x:42,y:52,w:115,h:95},
	{x:42,y:52,w:115,h:95},
	{x:42,y:52,w:115,h:95}
]
class Enemy{
	constructor(type){
		this.type=type;
		this.x=100;
		this.y=-ENEMY[this.type].h/2;
		this.timer=null;
		this.move();
		this.shut=false;
		this.w=ENEMY[this.type].w;
		this.h=ENEMY[this.type].h;
		switch( type ){
			case 1 :
			case 5 : this.hp=1;break;
			case 2 :
			case 4 : 
			case 6 :
			case 7 :
			case 8 : this.hp=2;break;
			case 3 : this.hp=3;break;
		}
	};
	draw(o2d){
		var x = ENEMY[this.type].x
		var y = ENEMY[this.type].y
		o2d.save();
		o2d.drawImage(JSON['ep_'+this.type+'.png'],
			x,y,this.w,this.h,
			this.x,this.y,this.w/2,this.h/2
		)
		o2d.restore();
	};
	move(){
		clearInterval( this.timer );
		this.timer=setInterval(function(){
			this.y+=3;
		}.bind(this),32)
		var twice = rand( 1,3 )
		for( var i=0;i<twice;i++ ){
			setTimeout(function(){
				this.shut=true;
			}.bind(this),rand( twice*1000+500,twice*1000+2000  ))
		}
	};
}