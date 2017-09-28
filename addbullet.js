/*x:0,y:0,w:60,h:100,r:30*/
class AddBullet{
	constructor(){
		this.x=0;
		this.y=0;
		this.timer=null;
		this.move();
	}
	draw(o2d){
		o2d.save();
		o2d.translate( this.x,this.y );
		o2d.drawImage(JSON['addbullet.gif'],
			0,0,60,100,
			-15,-25,30,50
		);
		o2d.restore();
	}
	move(){
		clearInterval( this.timer )
		this.timer=setInterval(function(){
			this.y+=10;
		}.bind(this),32)
	}
}