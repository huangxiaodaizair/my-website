$(document).ready(function (){
	var canvas=$('#canvas')[0];
	$(canvas).css({
		position:'absolute',
		left:'0',
		top:'0'/*,
		zIndex:'-2'*/
		});
	//定义画笔 brush 画布宽高w,h
	var brush=canvas.getContext('2d');
	resize();//如果王亚直接是缩放的就直接获取，所以必须执行一遍
	window.onresize = resize;
	//处理各个浏览器的高帧动画的刷新重播问题
	var RAF=(function(){
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback){
			window.setTimeout(callBack,1000/60);
		}
	})();
	//添加粒子 x,y是坐标，xs,ys是x,y轴速度，max连线最大距离
	var particle=[];
	for(var i = 0; i < 300; i++){
		var x=Math.random()*w;
		var y=Math.random()*h;
		var xs=Math.random()*2-1;
		var ys=Math.random()*2-1;
		particle.push({
			x:x,
			y:y,
			xs:xs,
			ys:ys,
			max:6000
		});
	};
	//让粒子运动
	setTimeout(function(){
		sport();
	},100)
	function sport(){
		brush.clearRect( 0, 0, w, h);
		particle.forEach(function(par){
			//粒子移动
			par.x+=par.xs;
			par.y+=par.ys;
			//遇到边界加速度反向
			par.xs *=(par.x>w || par.x < 0) ? -1 : 1;
			par.ys *=(par.y>h || par.y < 0) ? -1 : 1;
			//绘制点
			brush.fillRect(par.x-0.5, par.y-0.5, 1, 1);
			brush.fillStyle="#fff";
			//比较粒子的间距	
			for(var i=0; i<particle.length; i++){
				
				var par2=particle[i];
				var xDis=par.x-par2.x;
				var yDis=par.y-par2.y;
				//两个离子键的距离
				var dis=xDis * xDis + yDis * yDis;
				var ratio;
				if(dis < par2.max){
					//比例
					ratio=(par2.max - dis) / par2.max;
					//划线
					brush.beginPath();
					brush.lineWidth = ratio / 2;
					brush.strokeStyle='rgba(255,255,255,'+(ratio )+')';
					brush.moveTo(par.x, par.y);
					brush.lineTo(par2.x, par2.y);
					brush.stroke();
				}
			}
		});
		RAF(sport);
	};
});
function resize(){
	w=canvas.width=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	
	h=canvas.height=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}

