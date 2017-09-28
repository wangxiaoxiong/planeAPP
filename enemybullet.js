class EnemyBullet{
	constructor(rotate){
		this.x=0;
		this.y=0;
		this.timer=null;
		this.speed=10;
		this.rotate=rotate;
		this.move();
	};
	draw(o2d){
		o2d.save();
		o2d.drawImage(JSON['BossBullet.png'],
			0,0,20,20,
			this.x,this.y,10,10
			);
		o2d.restore();
	};
	move(){
		clearInterval( this.timer );
		this.timer=setInterval(function(){
			this.x+=Math.cos(this.rotate)*this.speed
			this.y+=Math.sin(this.rotate)*this.speed			
		}.bind(this),50)
	};
}