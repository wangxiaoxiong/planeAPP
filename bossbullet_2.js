class BossBulletS{
	constructor(){
		this.x=200;
		this.y=110;
		this.timer=null;
		this.rotate=0;
		this.speed=10;
		this.move();
	}
	draw(o2d){
		o2d.save();
		o2d.drawImage(JSON['BossBullet.png'],
			0,0,20,20,
			this.x,this.y,10,10
		)
		o2d.restore();
	}
	move(){
		this.timer=setInterval(function(){
			this.x+=this.speed*Math.cos( r2a(  this.rotate) )
			this.y+=this.speed*Math.sin( r2a(  this.rotate) )
		}.bind(this),40)
	}
}