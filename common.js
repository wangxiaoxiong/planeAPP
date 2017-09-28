var JSON={}
var resource = ["my_yellow1.png","my_yellow2.png","my_yellow3.png","my_blue1.png","my_blue2.png","my_blue3.png","ep_1.png","ep_2.png","ep_3.png","ep_4.png","ep_5.png","ep_6.png","ep_7.png","ep_8.png","boss1.png","boss2.png","BossBullet.png","myb_1.png","myb_2.png","myb_3.png","blow.gif","boss_1.png",'epb_1.png',"addbullet.gif"]

function loading( data,load,success ){
	var count = 0;
	for( var i=0;i<data.length;i++ ){
		(function(index){
			var oImg = new Image();
			oImg.onload=function(){
				count++
				load&&load(count,data.length);
				JSON[ data[index] ]=this
				if(data.length==count){
					success&&success();
				}		
			}
			oImg.src="img/"+data[i]
		})(i)	
	}	
}
function load(a,b){
	//console.log( a/b*100+"%" )
}
function success(){
	$("#load").hide();
}
function rand(min,max){
	return Math.floor( Math.random()*(max-min+1)+min )
}
function r2a(n){
	return n*Math.PI/180
}
