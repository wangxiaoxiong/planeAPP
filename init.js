window.onload=function(){
	(function(doc, win) {
		var docEl = doc.documentElement,
			resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
			recalc = function() {
				var clientWidth = docEl.clientWidth;
				if(!clientWidth) return;
				docEl.style.fontSize = 100 * (clientWidth / 720) + 'px';
			};
		if(!doc.addEventListener) return;
		win.addEventListener(resizeEvt, recalc, false);
		doc.addEventListener('DOMContentLoaded', recalc, false);
	})(document, window);
	var pos = 0;
	var can = $("#can")
	var o2d = can[0].getContext("2d")
	can[0].width=window.innerWidth;
	can[0].height=window.innerHeight;
	loading( resource,load,success )
	var plane = new MyPlane();	
	$("#start").click(function(){
		if( this.innerHTML=="GAME OVER" ){
			history.go(0)
		}
		plane.type=1;
		$("#chose").hide();

		setTimeout(function(){
			game = setInterval( start,16 )
		},500);
		setTimeout(function(){
			bossFlag=false;
			bossAppear=true;
			console.log("boss来了");
			bigBoss= new BigBoss();
		},1000*60*5)
	})
	var arrMyBullet=[];
	var arrEnemy=[];
	var arrEnemyBullet=[];
	var arrDieEnemy=[];
	var arrBossBullet=[];
	var arrBossBulletS=[];
	var arrAddBullet=[];
	var bossFlag=true;
	var bulletFlag=true;
	var bossAppear=false;
/*升级子弹需要的时间*//*升级子弹需要的时间*//*升级子弹需要的时间*/
	for( var i=1;i<=8;i++ ){
		(function(index){
			setTimeout(function(){
				if( Math.random()>0.8 ){
					var addBullet = new AddBullet();
					addBullet.x=rand( 15,can[0].width-15)
					addBullet.y=-50;
					arrAddBullet.push( addBullet )
				}				
			},index*1000*30)
		})(i)
	}
	/*统一绘制*/
	var start =function(){
		/*背景图*/
		/*$("#can").css(backgroundPosition )*/
		$("#can")[0].style.backgroundPosition = "0px "+ (++pos) +"px";
		o2d.clearRect(0,0,can[0].width,can[0].height)		
/*升级子弹*//*升级子弹*//*升级子弹*//*升级子弹*//*升级子弹*//*升级子弹*/
		if( arrAddBullet.length>0 ){
			for( var i=0;i<arrAddBullet.length;i++ ){
				arrAddBullet[i].draw(o2d);
/*碰撞检测之升级子弹*//*碰撞检测之升级子弹*//*碰撞检测之升级子弹*/
				if( plane.isIn( arrAddBullet[i].x,arrAddBullet[i].y ) ){
					plane.type++;
					clearInterval( arrAddBullet[i].timer );
					arrAddBullet.splice(i,1)
				}
			}	
		}
/*boss子弹1发射*//*boss子弹1发射*/	/*boss子弹1发射*/	/*boss子弹1发射*/
		for( var i =0 ;i<arrBossBullet.length;i++ ){
				arrBossBullet[i].rotate=45+(i%7)*15			
				arrBossBullet[i].draw(o2d)					
			if( 
				arrBossBullet[i].x<-200 ||
				arrBossBullet[i].x>can[0].width+200||
				arrBossBullet[i].y<-200 ||
				arrBossBullet[i].y>can[0].height+200
			){
				clearInterval( arrBossBullet[i].timer );
				arrBossBullet[i].flag=false;				
			}
		}	
		
/*boss子弹2发射*//*boss子弹2发射*//*boss子弹2发射*//*boss子弹2发射*/
		for( var i=0;i<arrBossBulletS.length;i++ ){
			arrBossBulletS[i].rotate=30+(i%10)*rand(8,15)
			arrBossBulletS[i].draw(o2d)
			if(
				arrBossBulletS[i].x<-20 ||
				arrBossBulletS[i].x>can[0].width+20||
				arrBossBulletS[i].y<-20 ||
				arrBossBulletS[i].y>can[0].height+20
			){
				clearInterval( arrBossBulletS[i].timer )
			}
		}	

/*BIGBOSS*//*BIGBOSS*//*BIGBOSS*//*BIGBOSS*//*BIGBOSS*//*BIGBOSS*//*BIGBOSS*/
		if( bossFlag==false ){
			bigBoss.draw(o2d)	
/*boss子弹1*//*boss子弹1*//*boss子弹1*//*boss子弹1*//*boss子弹1*//*boss子弹1*/
			if( bigBoss.shut==1 ){				
				var bossBullet = new BossBullet();
				arrBossBullet.push( bossBullet )
				if( arrBossBullet.length%7==0 ){
					bigBoss.shut=0;
				}
				if( arrBossBullet.length==35 ){
					setTimeout( function(){						
						arrBossBullet=[]
					},10000 )					
				}
			}
			if( bigBoss.shut==2 ){
				var bossBulletS=new BossBulletS();
				arrBossBulletS.push(bossBulletS )
				if( arrBossBulletS.length%10==0 ){
					bigBoss.shut=0;
				}
			}					
		}

/*敌机起飞*//*敌机起飞*//*敌机起飞*//*敌机起飞*//*敌机起飞*//*敌机起飞*/
		if( bossFlag&&Math.random()<0.01 ){
			var enemy = new Enemy(rand(1,8));
			enemy.x=rand( 0,can[0].width-100 )
			arrEnemy.push( enemy )		
		}
/*敌机生成*//*敌机生成*//*敌机生成*//*敌机生成*//*敌机生成*//*敌机生成*/
		for( var i=0;i<arrEnemy.length;i++ ){
			arrEnemy[i].draw(o2d)	
			if(arrEnemy[i].y>can[0].height+100){ /*超出清除*//*超出清除*/				
				clearInterval( arrEnemy[i].timer )
				arrEnemy.splice(i,1)
			}
/*敌机每隔XS发射一颗子弹*//*敌机每隔XS发射一颗子弹*//*敌机每隔XS发射一颗子弹*/				if( arrEnemy[i].shut ){
				var a = plane.x-arrEnemy[i].x
				var b = plane.y-arrEnemy[i].y
				var rotate = Math.acos( a/Math.sqrt( a*a+b*b ) )	

				var enemyBullet = new EnemyBullet(rotate);	

				enemyBullet.x=arrEnemy[i].x+arrEnemy[i].w/4
				enemyBullet.y=arrEnemy[i].y+arrEnemy[i].h/4
				
				arrEnemyBullet.push( enemyBullet );
				arrEnemy[i].shut=false;
			}
		}
/*敌机死亡*//*敌机死亡*//*敌机死亡*//*敌机死亡*//*敌机死亡*//*敌机死亡*/
		for( var i = 0 ; i <arrDieEnemy.length;i++ ){
			arrDieEnemy[i].draw(o2d);
			setTimeout(function(){
				arrDieEnemy.shift();
			},400)
		}
/*敌机子弹*//*敌机子弹*//*敌机子弹*//*敌机子弹*//*敌机子弹*//*敌机子弹*/
		for( var i =0 ;i<arrEnemyBullet.length;i++ ){
			arrEnemyBullet[i].draw(o2d)
			if( 
				arrEnemyBullet[i].x<-10|| 
				arrEnemyBullet[i].x>can[0].width+10||
				arrEnemyBullet[i].y<-10||
				arrEnemyBullet[i].y>can[0].height+10 
			){	/*超出清除*//*超出清除*//*超出清除*//*超出清除*//*超出清除*/
				clearInterval( arrEnemyBullet[i].timer )
				arrEnemyBullet.splice(i,1)
			}
		}				
/*飞机子弹*//*飞机子弹*//*飞机子弹*//*飞机子弹*//*飞机子弹*//*飞机子弹*/
		for(var i = 0 ; i<arrMyBullet.length;i++ ){
			arrMyBullet[i].draw(o2d);
			var flag=true
			if( bossAppear ){
				if( bigBoss.isIn( arrMyBullet[i].x,arrMyBullet[i].y ) ){

					bigBoss.hp-=arrMyBullet[i].type

					clearInterval( arrMyBullet[i].timer )
					arrMyBullet.splice(i,1)
					/*boss的血量检测*/
					if( bigBoss.hp==15 ){
						bigBoss.attack();
					}
					if( bigBoss.hp<=0 ){
						bigBoss.flag=false;
						bigBoss.bulletFlag=false;
						clearInterval( bigBoss.bulletTimer )
						clearInterval( plane.timer )
						plane.success=false;
					}
				}
			}	
			if(  arrMyBullet[i].y<-10){/*超出清除*//*超出清除*//*超出清除*/
				clearInterval( arrMyBullet[i].timer );
				arrMyBullet.splice(i,1)
			}else{
/*本机子弹与敌机碰撞检测*//*本机子弹与敌机碰撞检测*//*本机子弹与敌机碰撞检测*/	
				for( var j=0;j<arrEnemy.length;j++ ){	
				/*血量为0.死亡*//*血量为0.死亡*//*血量为0.死亡*/	
					if( arrEnemy[j].hp<=0 ){
						var dieEnemy=new DieEnemy();
						dieEnemy.x=arrEnemy[j].x
						dieEnemy.y=arrEnemy[j].y
						arrDieEnemy.push( dieEnemy )
						/*飞机死亡出现爆炸效果*/
						clearInterval( arrEnemy[j].timer );
						arrEnemy.splice( j,1 );		
						break;
					}
/*高度判断指标*//*高度判断指标*//*高度判断指标*//*高度判断指标*/
					var h1 = 0;
					var h2 = 0;		
					if( arrEnemy[j].y&&arrMyBullet[i].y ){
						h1 = arrEnemy[j].y+arrEnemy[j].h/2
						h2 = arrMyBullet[i].y;
					}
/*这个宽度范围内的都会被检测*//*这个宽度范围内的都会被检测*/	
					if( 
						arrMyBullet[i].x+arrMyBullet[i].w/2>arrEnemy[j].x&&
						arrEnemy[j].x+arrEnemy[j].w/2>arrMyBullet[i].x
					){
						if(arrEnemy[j].type==1||arrEnemy[j].type==3||arrEnemy[j].type==4||arrEnemy[j].type==5||arrEnemy[j].type==7){
				/*每个类型的敌机碰撞检测不同，如果1,3,4,5,7，用这个碰撞检测*/
				/*拆解成3个长方形宽度比 35 30 35高度比65 100 65*/
				/*都是基于ep_1这个机型进行检测的，所以其他的会有点误差*/
							/*35检测*/
							var w1 = arrEnemy[j].x+arrEnemy[j].w/2*0.35	
							/*65检测*/
							var w2 = arrEnemy[j].x+arrEnemy[j].w/2*0.65	
							/*100检测*/
							var w3 = arrEnemy[j].x+arrEnemy[j].w/2	
							if( 
								arrMyBullet[i].x+arrMyBullet[i].w/4>arrEnemy[j].x&&
								arrMyBullet[i].x<w1	
							){												
								if( h2-( arrEnemy[j].y+arrEnemy[j].h/2*0.65 )<2 ){
									arrEnemy[j].hp-=arrMyBullet[i].type
									clearInterval( arrMyBullet[i].timer );
									arrMyBullet.splice(i,1);
								}
							}else if( 											
								arrMyBullet[i].x+arrMyBullet[i].w/2>w1&&
								arrMyBullet[i].x<w2	
							){
								if( h2-( arrEnemy[j].y+arrEnemy[j].h/2*0.65 )<2 ){
									arrEnemy[j].hp-=arrMyBullet[i].type				
									clearInterval( arrMyBullet[i].timer );
									arrMyBullet.splice(i,1);						
								}
							}else if( 
								arrMyBullet[i].x+arrMyBullet[i].w/2>w2&&
								arrMyBullet[i].x<w3	
							){
								if( h2-h1<2 ){
									arrEnemy[j].hp-=arrMyBullet[i].type
									clearInterval( arrMyBullet[i].timer );
									arrMyBullet.splice(i,1);						
								}
							}					
						}else{
					/*其余敌机判断*//*其余敌机判断*//*其余敌机判断*/			
							if( h2-h1<2 ){
								arrEnemy[j].hp-=arrMyBullet[i].type
								clearInterval( arrMyBullet[i].timer );
								arrMyBullet.splice(i,1);	
							}
						}
					}				
				}
			}		
		}
/*飞机*//*飞机*//*飞机*//*飞机*//*飞机*//*飞机*//*飞机*//*飞机*//*飞机*/
		plane.draw(o2d)
		if( plane.type<=0 ){
			var dieEnemy=new DieEnemy();
			dieEnemy.x=plane.x
			dieEnemy.y=plane.y
			arrDieEnemy.push( dieEnemy )
			clearInterval( game )
			$("#chose").show();				
			$("#start").html("GAME OVER")
		}
/*碰撞检测之敌方子弹与本机*//*碰撞检测之敌方子弹与本机*//*碰撞检测之敌方子弹与本机*/	for( var i=0;i<arrEnemyBullet.length;i++ ){
			if( plane.isIn( arrEnemyBullet[i].x,arrEnemyBullet[i].y ) ){
				plane.type--				
			}
		}	
/*碰撞检测之本机子弹与boss*//*碰撞检测之本机子弹与boss*//*碰撞检测之本机子弹与boss*/
		for( var i=0; i<arrBossBullet.length;i++ ){
			if( plane.isIn( arrBossBullet[i].x,arrBossBullet[i].y ) ){
				plane.type--
			}
		}
/*碰撞检测之本机子弹与boss*//*碰撞检测之本机子弹与boss*//*碰撞检测之本机子弹与boss*/
		for( var i=0;i<arrBossBulletS.length;i++ ){
			if( plane.isIn( arrBossBulletS[i].x,arrBossBulletS[i].y ) ){
				plane.type--
			}
		}	
/*按一下Z发射一颗子弹*//*按一下Z发射一颗子弹*//*按一下Z发射一颗子弹*/
/*自动发射每0.5S一颗*/
		if( plane.shut ){		
			var myBullet = new MyBullet(plane.type,plane.x+plane.w/4,plane.y+plane.h/4);			
			arrMyBullet.push( myBullet )
			plane.shut=false;
		}
/*碰撞检测本机与敌机*//*碰撞检测本机与敌机*//*碰撞检测本机与敌机*/

	}
}