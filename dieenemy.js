/*x:80,y:86,w:68,h:66*/

class DieEnemy{
	constructor(){
		this.x=0;
		this.y=0;
	}
	draw(o2d){
		o2d.save();
		o2d.drawImage(JSON["blow.gif"],
			94,84,63,68,
			this.x,this.y,63,68
		)
		o2d.restore();
	}
}