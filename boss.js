var BOSS_SIZE=[
	null,
	{x:20,y:20,w:978,h:978,r:424},
]
class BigBoss{
	constructor(type){
		this.type=type||1;
		this.r=BOSS_SIZE[ this.type ].r*200/978;
		this.rotate=0;
		this.timer=null;
		this.move();		
		this.shut=0;
		this.hp=50;
		this.flag=true;		
		this.bulletFlag=true;
		this.bulletTimer=null;
		if( this.bulletFlag ){
			this.attack2();
		}
	}
	draw(o2d){
		var x = BOSS_SIZE[ this.type ].x
		var y = BOSS_SIZE[ this.type ].y
		var w = BOSS_SIZE[ this.type ].w
		var h = BOSS_SIZE[ this.type ].h
		if( this.flag ){
			o2d.save();
			o2d.translate(200,110);
			o2d.rotate( r2a(this.rotate) );
			o2d.drawImage(JSON["boss_1.png"],
				x,y,w,h,
				-100,-100,200,200
			);
			o2d.restore();
		}		
	}
	move(){
		this.timer=setInterval(function(){
			this.rotate++;
		}.bind(this),16)
	}
	attack(){
		for( var i=1;i<=5;i++ ){
			setTimeout(function(){
				this.shut=1;
			}.bind(this),i*1000)
		}
	}
	attack2(){
		this.bulletTimer=setInterval(function(){
			this.shut=2;
		}.bind(this),800)		
	}
	isIn(x,y){
		var a = 200-x;
		var b = 90-y;
		var c =this.r;
		if( Math.sqrt( a*a+b*b )<c ){
			return true;
		}
	}
}