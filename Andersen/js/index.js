var body = document.getElementsByTagName("body")[0];
var index = document.getElementById("index");
var music_btnoff = document.getElementsByClassName("music_btnoff")[0];
var music_btnon = document.getElementsByClassName("music_btnon")[0];
var an_head = document.getElementById("an_head");
var i_txt = document.getElementById("i_txt");
var i_start = document.getElementById("i_start");
var i_foot = document.getElementById("i_foot");
var musicDiv = document.getElementById("music");
//loading
var loading = document.getElementById("loading");
var txt = document.getElementById("txt");
var timer = null;
//page
var page1 = document.getElementById("page1");
var page2 = document.getElementById("page2");
var page3 = document.getElementById("page3");
var page4 = document.getElementById("page4");
var page5 = document.getElementById("page5");
//time
var t_time = document.getElementById("t_time");
var time = document.getElementById("time");
var t_txt = 30;
var t_timer = null;
//游戏结束
var victory = document.getElementById("victory");
var vic_btn = document.getElementById("vic_btn");
//抽奖
var cj = document.getElementById("cj");
var cj_box = document.getElementById("cj_box");
var cj_img = document.getElementById("cj_img");
var cj_btn = document.getElementById("cj_btn");
var cj_txtbox = document.getElementById("cj_txtbox");
var cj_txt = document.getElementById("cj_txt");
var cj_sw = true;//抽奖开关
//一等奖
var cj_1 = document.getElementById("cj_1");
var cj_1_btn = document.getElementById("cj_1_btn");
//奖品
var ok_1 = document.getElementById("ok_1");
var ok_2 = document.getElementById("ok_2");
//二等奖
var cj_2 = document.getElementById("cj_2");
//三等奖
var cj_3 = document.getElementById("cj_3");
//谢谢参与
var cj_0 = document.getElementById("cj_0");
//超时
var tmo = document.getElementById("tmo");
//不及格
var gmo = document.getElementById("gmo");
//答题
var t = 0;
var sw = true;

//初始化
reFn();
function reFn(){
	document.addEventListener("touchmove",function(){
		event.preventDefault();
	})
	body.style.width = document.body.clientWidth + "px";
	//获取屏幕高度
	body.style.height = document.documentElement.clientHeight + "px";
	index.style.height = document.documentElement.clientHeight + "px";
	loading.style.height = document.documentElement.clientHeight + "px";
	page1.style.height = document.documentElement.clientHeight + "px";
	page2.style.height = document.documentElement.clientHeight + "px";
	page3.style.height = document.documentElement.clientHeight + "px";
	page4.style.height = document.documentElement.clientHeight + "px";
	page5.style.height = document.documentElement.clientHeight + "px";
	victory.style.height = document.documentElement.clientHeight + "px";
	cj.style.height = document.documentElement.clientHeight + "px";
	cj_1.style.height = document.documentElement.clientHeight + "px";
	ok_1.style.height = document.documentElement.clientHeight + "px";
	ok_2.style.height = document.documentElement.clientHeight + "px";
	cj_2.style.height = document.documentElement.clientHeight + "px";
	cj_3.style.height = document.documentElement.clientHeight + "px";
	cj_0.style.height = document.documentElement.clientHeight + "px";
	tmo.style.height = document.documentElement.clientHeight + "px";
	gmo.style.height = document.documentElement.clientHeight + "px";
}
//对象 -- 函数
var iFn = {//首页
	on:function(){//打开音乐
		music_btnoff.style.display = "none";
		music_btnon.style.display = "block";
		musicDiv.innerHTML = "";
	},
	off:function(){//关闭音乐
		music_btnon.style.display = "none";
		music_btnoff.style.display = "block";
		musicDiv.innerHTML = '<audio loop autoplay src="media/bgm.mp3"></audio>';
	},
	start:function(){
		index.className = "animated bounceOutLeft";//主页消失
		var img = loading.getElementsByTagName("img");
		var rond = document.getElementById("rond");
		var count = 0;
		setTimeout(function(){//显示加载页
			index.style.zIndex = -1;
			index.style.opacity = 0;
			loading.style.zIndex = 19;
			loading.style.opacity = 1;
			rond.className = "loading_txt animated fadeIn";
			img[0].className = "loading_left animated rotateInDownLeft";
			img[3].className = "loading_img animated slideInDown";
			setTimeout(function(){
				img[1].className = "loading_right animated rotateInDownRight";
				setTimeout(function(){
					img[2].className = "loading_mid animated slideInDown";
				},1000)
			},1000)
			timer = setInterval(function(){//进度条
				count++;
				txt.innerText = count;
				if(count == 100){
					clearInterval(timer);
					loading.style.zIndex = -1;
					loading.style.opacity = 0;
					page1.style.opacity = 1;//page1出现
					t_time.style.opacity = 1;
					//page1Fn();
					page.page1();
					t_timer = setInterval(function(){//倒计时
						t_txt--;
						time.innerText = t_txt;
						if (t_txt == 0) {
							clearInterval(t_timer);
							console.log("time out");//游戏结束
							tmo.style.opacity = 1;//超时界面出现
							tmo.style.zIndex = 20;
							game.tmo();
						}
					},1000);
				}
			},50);
		},150)
	}
}
var page = {//游戏内容
	page1:function(){
		var img = page1.getElementsByTagName("img");
		if (page1.style.opacity == 1) {
			sw = true;
			setTimeout(function(){
				img[0].className = "page1_head animated fadeInUp";
				img[1].className = "page1_num animated bounceIn";
				img[2].className = "page1_test animated slideInUp";
				img[3].className = "page1_1_5 animated fadeIn";
			},150)
		}
		var box = page1.getElementsByClassName("box")[0];
		var boxes = box.getElementsByTagName("div");
		for (var i=0;i<boxes.length;i++) {
			boxes[i].addEventListener("touchstart",function(){
				var chk = this.getElementsByTagName("input")[0];
				this.style.outline = "1px dotted white";
				chk.checked = true;
				if (sw) {
					scoreFn(chk);
				}
				page1.className = "animated bounceOutLeft";//page1消失
				page2.style.opacity = 1;//page2出现
				page.page2();
			})
		}
	},
	page2:function(){
		var img = page2.getElementsByTagName("img");
		if (page2.style.opacity == 1) {
			sw = true;
			setTimeout(function(){
				img[0].className = "page2_head animated fadeInUp";
				img[1].className = "page2_num animated bounceIn";
				img[2].className = "page2_test animated slideInUp";
				img[3].className = "page2_2_5 animated fadeIn";
				img[4].className = "page2_img animated fadeInRightBig";
			},150)
		}
		var box = page2.getElementsByClassName("box")[0];
		var boxes = box.getElementsByTagName("div");
		for (var i=0;i<boxes.length;i++) {
			boxes[i].addEventListener("touchstart",function(){
				var chk = this.getElementsByTagName("input")[0];
				this.style.outline = "1px dotted white";
				chk.checked = true;
				if (sw) {
					scoreFn(chk);
				}
				page2.className = "animated bounceOutLeft";//page2消失
				page3.style.opacity = 1;//page3出现
				page.page3();
			})
		}
	},
	page3:function(){
		var img = page3.getElementsByTagName("img");
		if (page3.style.opacity == 1) {
			sw = true;
			setTimeout(function(){
				img[0].className = "page3_head animated fadeInUp";
				img[1].className = "page3_num animated bounceIn";
				img[2].className = "page3_test animated slideInUp";
				img[3].className = "page3_3_5 animated fadeIn";
			},150)
		}
		var box = page3.getElementsByClassName("box")[0];
		var boxes = box.getElementsByTagName("div");
		for (var i=0;i<boxes.length;i++) {
			boxes[i].addEventListener("touchstart",function(){
				var chk = this.getElementsByTagName("input")[0];
				this.style.outline = "1px dotted white";
				chk.checked = true;
				if (sw) {
					scoreFn(chk);
				}
				page3.className = "animated bounceOutLeft";//page3消失
				page4.style.opacity = 1;//page4出现
				page.page4();
			})
		}
	},
	page4:function(){
		var img = page4.getElementsByTagName("img");
		if (page4.style.opacity == 1) {
			sw = true;
			setTimeout(function(){
				img[0].className = "page4_head animated fadeInUp";
				img[1].className = "page4_num animated bounceIn";
				img[2].className = "page4_test animated slideInUp";
				img[3].className = "page4_4_5 animated fadeIn";
				img[4].className = "page4_img animated fadeInRightBig";
			},150)
		}
		var box = page4.getElementsByClassName("box")[0];
		var boxes = box.getElementsByTagName("div");
		for (var i=0;i<boxes.length;i++) {
			boxes[i].addEventListener("touchstart",function(){
				this.style.outline = "1px dotted white";
				var chk = this.getElementsByTagName("input")[0];
				chk.checked = true;
				if (sw) {
					scoreFn(chk);
				}
				page4.className = "animated bounceOutLeft";//page4消失
				page5.style.opacity = 1;//page3出现
				page.page5();
			})
		}
	},
	page5:function(){
		var img = page5.getElementsByTagName("img");
		if (page5.style.opacity == 1) {
			sw = true;
			setTimeout(function(){
				img[0].className = "page5_head animated fadeInUp";
				img[1].className = "page5_num animated bounceIn";
				img[2].className = "page5_test animated slideInUp";
				img[3].className = "page5_5_5 animated fadeIn";
				img[4].className = "page5_img animated fadeInRightBig";
			},150)
		}
		var box = page5.getElementsByClassName("box")[0];
		var boxes = box.getElementsByTagName("div");
		for (var i=0;i<boxes.length;i++) {
			boxes[i].addEventListener("touchstart",function(){
				var chk = this.getElementsByTagName("input")[0];
				this.style.outline = "1px dotted white";
				chk.checked = true;
				if (sw) {
					scoreFn(chk);
				}
				page5.className = "animated bounceOutLeft";//page5消失
				if (t == 5) {
					victory.style.opacity = 1;//victory出现
					game.victory();
				} else{
					gmo.style.opacity = 1;//不及格界面出现
					game.gmo();
				}
			})
		}
	}
}
var game = {//游戏结束---通关
	victory:function(){
		var img = victory.getElementsByTagName("img");
		if (victory.style.opacity == 1) {
			setTimeout(function(){
				img[0].className = "vic_head animated fadeInUp";
				img[1].className = "vic_num animated bounceIn";
				img[2].className = "vic_btn animated fadeIn";
			},150)
			clearInterval(t_timer);
			t_txt = 30 - Number(time.innerText);
			t_time.innerHTML = '用时<br /><span id="time">'+ t_txt +'</span>秒';
			t_time.style.top = "44%";
			t_time.style.left = "44.5%";
			//t_time.style.transform = "scale(1.5)";
			vic_btn.addEventListener("touchstart",function(){
				victory.className = "animated bounceOutLeft";//通关界面消失
				t_time.style.display = "none";//时间消失
				music_btnoff.style.display = "none";
				music_btnon.style.display = "none";
				cj.style.opacity = 1;//抽奖界面显示
				game.cj();
			})
		}
	},
	cj:function(){
		//抽奖
		//			   0  3  0   3   2   0   3   0   2   3   0   1
		var cj_arr = [15,45,75,105,135,165,195,225,255,285,315,345];
		cj_box.style.height = cj_box.offsetWidth + "px";
		cj_img.style.height = cj_img.offsetWidth + "px";
		var img = victory.getElementsByTagName("img");
		if (cj.style.opacity == 1) {
			setTimeout(function(){
				cj_box.className = "animated fadeInDown";
				cj_txtbox.className = "animated fadeInUp";
			},150)
		}
			cj_btn.addEventListener("touchstart",function cjFn(){//点击抽奖
				var r = Math.floor(Math.random()*11);
				//var r = 0;
				cj_img.style.transform = "rotateZ("+ (cj_arr[r] + 1800) +"deg)";
				setTimeout(function(){
					if (r==11) {//一等奖
						cj.className = "animated bounceOutLeft";//抽奖界面消失
						cj_1.style.opacity = 1;//一等奖界面界面出现
						game.cj_1();
					}
					if (r == 4 || r == 8) {
						cj.className = "animated bounceOutLeft";//抽奖界面消失
						cj_2.style.opacity = 1;//二等奖界面出现
						game.cj_2();
					}
					if (r == 1 || r == 3 || r == 6 || r == 9) {
						cj.className = "animated bounceOutLeft";//抽奖界面消失
						cj_3.style.opacity = 1;//三等奖界面出现
						game.cj_3();
					}
					if (r == 0 || r == 2 || r == 5 || r == 7 || r == 10) {
						cj.className = "animated bounceOutLeft";//抽奖界面消失
						cj_0.style.opacity = 1;//谢谢参与界面出现
						game.cj_0();
					}
				},6500)
				cj_btn.removeEventListener("touchstart",cjFn);
			})
		//奖励等级说明
		cj_txtbox.style.height = (cj_txt.offsetWidth*0.64) + "px";
		touch.on(cj_txt,"swipeup",function(){
			cj_txt.style.top = -30 + "%";
		})
		touch.on(cj_txt,"swipedown",function(){
			cj_txt.style.top = 10 + "%";
		})
	},
	cj_1:function(){//一等奖界面
		var img = cj_1.getElementsByTagName("img");
		var reg_name = /^[\u4e00-\u9fa5]{2,4}$/;
		var reg_tel = /^\d{11}$/;
		var reg_ad = /^\w|[\u4e00-\u9fa5]$/;
		if (cj_1.style.opacity == 1) {
			setTimeout(function(){
				img[0].className = "cj_1_head animated fadeInUp";
				img[1].className = "cj_1_num animated bounceIn";
				img[2].className = "cj_1_btn animated fadeIn";
				img[3].className = "cj_1_txt animated fadeInUp";
			},150)
		}
		cj_1_btn.addEventListener("touchstart",function(){//提交事件
			var cj_1_name = cj_1.getElementsByClassName("name")[0];
			var cj_1_tel = cj_1.getElementsByClassName("tel")[0];
			var cj_1_ad = cj_1.getElementsByClassName("ad")[0];
			if (reg_name.test(cj_1_name.value) && reg_tel.test(cj_1_tel.value) && reg_ad.test(cj_1_ad.value)) {
				cj_1.className = "animated bounceOutLeft";//一等奖界面消失
				var index = Math.ceil(Math.random()*2);
				if (Math.random()<0.5) {
					ok_1.style.opacity = 1;//奖品1显示
					game.ok[1]();
				}else{
					ok_2.style.opacity = 1;//奖品2显示
					game.ok[2]();
				}
			} else {
				console.info("请正确输入信息");
			}
		})
	},
	ok:{
		1:function(){
			var img = ok_1.getElementsByTagName("img");
			if (ok_1.style.opacity == 1) {
				setTimeout(function(){
					img[0].className = "ok_1_txt animated fadeInUp";
					img[1].className = "i_foot animated fadeInUp";
				},150)
				setTimeout(function(){
					fxFn();
				},1500)
			}
		},
		2:function(){
			var img = ok_2.getElementsByTagName("img");
			if (ok_2.style.opacity == 1) {
				setTimeout(function(){
					img[0].className = "ok_2_txt animated fadeInUp";
					img[1].className = "i_foot animated fadeInUp";
					setTimeout(function(){
						fxFn();
					},1500)
				},150)
			}
		}
	},
	cj_2:function(){//二等奖界面
		var img = cj_2.getElementsByTagName("img");
		if (cj_2.style.opacity == 1) {
			setTimeout(function(){
				img[0].className = "cj_2_txt animated fadeInUp";
				img[1].className = "cj_2_img animated fadeInLeft";
				img[2].className = "i_foot animated fadeInUp";
			},150)
			fxFn();
		}
	},
	cj_3:function(){
		var img = cj_3.getElementsByTagName("img");
		if (cj_3.style.opacity == 1) {
			setTimeout(function(){
				img[0].className = "cj_3_txt animated fadeInUp";
				img[1].className = "cj_3_img animated fadeInLeft";
				img[2].className = "i_foot animated fadeInUp";
			},150)
			fxFn();
		}
	},
	cj_0:function(){
		var img = cj_0.getElementsByTagName("img");
		if (cj_0.style.opacity == 1) {
			setTimeout(function(){
				img[0].className = "cj_0_txt animated fadeInUp";
				img[1].className = "cj_0_img animated fadeInLeft";
				img[2].className = "i_foot animated fadeInUp";
			},150)
			fxFn();
		}
	},
	tmo:function(){
		var img = tmo.getElementsByTagName("img");
		if (tmo.style.opacity == 1) {
			t_time.innerHTML = '答对'+ t +'题';
			t_time.style.top = "50%";
			t_time.style.left = "40%";
			setTimeout(function(){
				img[0].className = "tmo_txt animated fadeInUp";
				img[1].className = "i_foot animated fadeInUp";
			},150)
			fxFn();
		}
	},
	gmo:function(){
		var img = gmo.getElementsByTagName("img");
		if (gmo.style.opacity == 1) {
			clearInterval(t_timer);
			t_time.innerHTML = '用时<span id="time">'+ t_txt +'</span>秒<br />答对'+ t +'题';
			t_time.style.top = "50%";
			t_time.style.left = "40%";
			setTimeout(function(){
				img[0].className = "gmo_txt animated fadeInUp";
				img[1].className = "i_foot animated fadeInUp";
			},150)
			fxFn();
		}
	}
}
//BGM
music_btnoff.addEventListener("touchstart",iFn.on);
music_btnon.addEventListener("touchstart",iFn.off);
//开始游戏按钮
// document.onready = function(){
	i_start.addEventListener("touchend",iFn.start);
// }
function fxFn(){//分享界面
	setTimeout(function(){
		document.addEventListener("touchstart",function newdivFn(){
			var newdiv = document.createElement("div");
			newdiv.style.zIndex = 100;
			newdiv.className = "fx animated fadeIn";
			body.appendChild(newdiv);
			console.log("分享");
			document.addEventListener("touchend",function(){
				document.removeEventListener("touchstart",newdivFn);
			})
		})
	},500)
}
function scoreFn(chk){//分数
	if (chk.value == "丹麦人") {
		t+=1;
		console.log(t);
		sw = false;
	}
	if (chk.value == "伊埃斯科城堡") {
		t+=1;
		console.log(t);
		sw = false;
	}
	if (chk.value == "菲英岛") {
		t+=1;
		console.log(t);
		sw = false;
	}
	if (chk.value == "安徒生童话游船") {
		t+=1;
		console.log(t);
		sw = false;
	}
	if (chk.value == "维京村") {
		t+=1;
		console.log(t);
		sw = false;
	}
}
