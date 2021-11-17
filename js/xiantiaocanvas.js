 var canvas = document.getElementById("canvas")
 // canvas覆盖整个页面
 canvas.width=window.innerWidth
 canvas.height=window.innerHeight
 var ctx=canvas.getContext("2d")
 // 新建粒子数组，存放粒子
 var particlesArray=[]
 // 根据画面尺寸生成粒子数量，每100*100范围内产生一个粒子
 
	// 返回画面可以分为多少个100*100的小块
 var count=parseInt(canvas.width/100*canvas.height/100)
	// 利用类的方式设置粒子
 class Particle{
	 constructor(x,y) {
	     this.x=x
		 this.y=y
		 // 随机生成移动方向
		 this.directionY=0.5-Math.random()
		 this.directionX=0.5-Math.random()
	 }
	 // update方法来改变粒子坐标
	 update(){
		 this.y+=this.directionY
		 this.x+=this.directionX
	 }
	 // draw方法根据粒子的x，y属性绘制圆点
	 draw(){
		 ctx.beginPath()
		 ctx.arc(this.x,this.y,2,0,Math.PI*2)
		 ctx.fillStyle="white"
		 ctx.fill()
	 }
 }
 
 
 function createParticle(){
	 var x=Math.random()*canvas.width
	 var y=Math.random()*canvas.height
	 particlesArray.push(new Particle(x,y))
 }
 
 function handleParticle(){
	 for(var i=0;i<particlesArray.length;i++){
		 var particle=particlesArray[i]
		 particle.update()
		 particle.draw()
		 if(particle.x<0||particle.x>canvas.width||particle.y<0||particle.y>canvas.height){
			 particlesArray.splice(i,1)
		}
		for(var j=i;j<particlesArray.length;j++){
			dx=particlesArray[i].x-particlesArray[j].x
			dy=particlesArray[i].y-particlesArray[j].y
			long=Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2))
			if(long<100){
				 ctx.beginPath()
				 ctx.strokeStyle="rgba(255,255,255,"+(1-long/100)+")"
				 ctx.moveTo(particlesArray[i].x,particlesArray[i].y)
				 ctx.lineTo(particlesArray[j].x,particlesArray[j].y)
				 ctx.lineWidth=1
				 ctx.stroke()
				 }
			 }
	 }
 }
 
 
 function draw(){
	 ctx.clearRect(0,0,canvas.width,canvas.height)
	 if(particlesArray.length<count){
		 createParticle()
	 }
	 handleParticle()
 }
 function achai(){
	 alert("阿柴出品")
 }
 
 // setInterval(()=>{
	//  draw(),1
 // })
 setInterval(draw,1)
 
 
  