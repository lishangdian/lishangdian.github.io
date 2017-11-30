var bg = document.getElementsByTagName("body")[0];
var sta = document.getElementById("sta");//开始游戏
var txt = document.getElementById("txt");//文字
var btn = document.getElementsByClassName("btn");//按钮
var time = document.getElementById("time");//时间
var score = document.getElementById("score");//成绩
var over = document.getElementById("over");
var cn = ["红","绿","蓝","紫","橙"];
var en = ["red","green","blue","purple","orange"];
var bgc = ["deeppink","palegreen","skyblue","plum","coral"];
var arr_t = [0,1,2,3,4]//随机cn
var arr_c = [0,1,2,3,4]//随机en
var timer;//倒计时,计时器
var sw = false;
//随机排序
function ranFn(){
	arr_t.sort(function(){
		return Math.random()-0.5;
	})
	arr_c.sort(function(){
		return Math.random()-0.5;
	})
	for(var i=0;i<btn.length;i++){
		btn[i].innerText = cn[arr_t[i]];
		btn[i].style.color = en[arr_c[i]];
	}
//	console.log(cn,en);
//	var rb = Math.floor(Math.random()*5)
//	var rc = Math.floor(Math.random()*5);
//	var rt = Math.floor(Math.random()*5);
	txt.style.color = en[Math.floor(Math.random()*5)];
	txt.innerText = cn[Math.floor(Math.random()*5)];
	bg.style.backgroundColor = bgc[Math.floor(Math.random()*5)];
//	console.log(rc,rt);
}
ranFn();
//按钮点击
function clr(obj){
//	ranFn();
	return obj.innerText;
}
for(var j=0;j<btn.length;j++){
	btn[j].onclick = function(){
//		console.log(cn,en);
//		console.log(clr(this),cn.indexOf(clr(this)));
//		console.log(txt.style.color,en.indexOf(txt.style.color));
		if(cn.indexOf(clr(this))==en.indexOf(txt.style.color)){
			score.innerText++;
			ranFn();
		}else{
			score.innerText--;
			ranFn();
		}
	}
}
//开始游戏
sta.onclick = function(){
	this.style.opacity = 0;
	clearInterval(timer);
	time.innerText=30;
	score.innerText=0
	over.innerText="";
	timer = setInterval(function(){
		time.innerText--;
		if(time.innerText==0){
			sta.style.opacity = 1;
			clearInterval(timer);
			if(score.innerText<0){
				over.innerText = "Σ(ﾟдﾟlll)  "+score.innerText + "分？！，居然能玩出负分，真是人才→_→ ";
			}
			if(score.innerText == 0){
				over.innerText = "竟然是"+score.innerText + "分，跟没玩有什么区别（╯‵□′）╯︵┴─┴";
			}
			if(score.innerText<=5 && score.innerText>0){
				over.innerText = "才"+score.innerText + "分(¬_¬)，连我一半的水平都没有♪～(´ε｀　)";
			}
			if(score.innerText>5 && score.innerText<10){
				over.innerText = "才"+score.innerText + "分（　^ω^）,也就跟我差不多(o￣∇￣o)";
			}
			if(score.innerText >=10){
				over.innerText = score.innerText + "分Σ(￣。￣ノ)ノ  ,有我巅峰的水平p(#￣▽￣#)o";
			}
//			over.innerText = "游戏结束，得分:"+score.innerText;
			time.innerText=30;
			score.innerText=0;
		}
	},1000)
}
