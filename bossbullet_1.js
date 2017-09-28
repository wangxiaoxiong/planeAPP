/*x:38,y:15,w:38,h:75*/
/*x:57,y:61,r:18*//*以此为圆心画圆*/
class BossBullet{
	constructor( rotate ){
		this.rotate=rotate||0;;
		this.x=200;
		this.y=110;
		this.move();
		this.timer=null;
		this.speed=5;
		this.flag=true;
	}
	draw(o2d){
		if( this.flag ){
			o2d.save();
			o2d.translate( this.x,this.y )
			o2d.rotate( r2a(this.rotate-90) )
			o2d.drawImage(JSON['epb_1.png'],
				38,15,37,75,
				-19/2,0,38/2,75/2
			)
			o2d.restore();
		}		
	}
	move(){
		clearInterval( this.timer )
		this.timer=setInterval(function(){
			this.x+=this.speed*Math.cos( r2a(this.rotate) ); 			
			this.y+=this.speed*Math.sin( r2a(this.rotate) );	
					
		}.bind(this),30)
	}
}