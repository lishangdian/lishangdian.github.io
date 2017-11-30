/*
 * 参数声明
 * IIa.初始化参数声明
 * GGa.函数模块参数声明
 * SSa.snake模型模块参数声明
 * EEa.事件参数声明
 */
//IIa.初始化参数声明
var co = document.getElementById("completed"); //完成度
//GGa.游戏函数模块参数声明
var food = document.getElementById("food");
//SSa.snake模型模块参数声明
var snake = document.getElementById("snake"); //snake父标签
var sHeader = document.getElementById("sHeader"); //snake头部
var sFooter = document.getElementById("sFooter"); //snake尾部
var snakeW = sHeader.offsetWidth; //snake速度
var tSpeed = 0; //snakeY速度
var lSpeed = snakeW; //snakeX速度
var sBody = ["url(img/h.png)", "url(img/v.png)", "url(img/bt.png)"]; //snake身体贴图
var direction = -30; //sHeader贴图方向
var timer = null; //计时器
//EEa.事件参数声明
var gameStart = document.getElementById("gameStart");
//SCa.计分模块参数声明
var scoreTag = document.getElementById("score"); //计分
var scoreHighestTag = document.getElementById("scoreHighest"); //最高分
var scoring = 0; //计分参数
var scoreHighest = 0; //最高分计数
/*
 * II.初始化
 * IIa.游戏初始化函数intializeFn初始化
 */
//IIa.游戏初始化函数intializeFn
intializeFn();
/*
 * EE.事件模块
 * EEa.事件参数声明
 * EEb.gameStart开始事件
 * 		--导入游戏初始化函数intializeFn
 * 		--导入游戏开始函数gameStartFn
 */
//EEb.gameStart开始事件
gameStart.onclick = function() {
	intializeFn();
	gameStartFn();
};
/*
 * GG.函数模块
 * GGa.函数模块参数声明
 * GGb.食物随机出现函数foodFn
 * GGc.进食函数eatFn
 * 		--内嵌食物随机出现函数foodFn
 * 		--snake增长函数sankeGrowFn
 * GGd.死亡函数deathFn
 * 		--游戏结束函数gameOverFn
 * GGe.游戏结束函数gameOverFn
 * GGf.游戏开始函数gameStartFn
 * 		--导入游戏逻辑函数logicFn
 * 		--snake控制函数sankeControlFn
 * GGg.游戏初始化函数intializeFn
 * 		--食物随机出现函数foodFn
 * GGi.穿墙函数throughFn
 * GGj.游戏逻辑函数logicFn
 * 		--进食函数eatFn
 * 		--snake运动函数sankeMoveFn
 * 		--snake贴图处理函数snakeImgFn
 * 		--死亡函数deathFn
 * 		--穿墙函数throughFn
 * GGk.穿墙数据处理函数throughDataFn,清除throughFn引发snakeImgFn的bug
 */
//GGb.食物随机出现函数foodFn
function foodFn() {
	food.style.top = Math.floor(Math.random() * food.offsetParent.clientHeight / food.clientHeight) * food.clientHeight + "px";
	food.style.left = Math.floor(Math.random() * food.offsetParent.clientWidth / food.clientWidth) * food.clientWidth + "px";
	for (var i = 0; i < snake.children.length; i++) {
		if (food.offsetTop == snake.children[i].offsetTop && food.offsetLeft == snake.children[i].offsetLeft) {
			food.style.top = Math.floor(Math.random() * food.offsetParent.clientHeight / food.clientHeight) * food.clientHeight + "px";
			food.style.left = Math.floor(Math.random() * food.offsetParent.clientWidth / food.clientWidth) * food.clientWidth + "px";
		}
	}
}
//GGc.进食函数eatFn
function eatFn() {
	if (food.offsetTop == sHeader.offsetTop && food.offsetLeft == sHeader.offsetLeft) {
		foodFn();
		sankeGrowFn();
		scoreGetFn();
		return false;
	} else {
		return true;
	}
}
//GGd.死亡函数deathFn
function deathFn() {
	for (var i = 1; i < snake.children.length; i++) {
		if (sHeader.offsetTop == snake.children[i].offsetTop && sHeader.offsetLeft == snake.children[i].offsetLeft) {
			gameOverFn();
			return;
		}
	}
}
//GGi.穿墙函数throughFn
function throughFn() {
	if (sHeader.offsetTop >= document.documentElement.clientHeight) {
		sHeader.style.top = 0 + "px";
	}
	if (sHeader.offsetLeft >= document.documentElement.clientWidth) {
		sHeader.style.left = 0 + "px";
	}
	if (sHeader.offsetTop < 0) {
		sHeader.style.top = Math.floor(document.documentElement.clientHeight / sHeader.offsetHeight) * sHeader.offsetHeight + "px";
	}
	if (sHeader.offsetLeft < 0) {
		sHeader.style.left = Math.floor(document.documentElement.clientWidth / sHeader.offsetWidth) * sHeader.offsetWidth + "px";
	}
}
//GGe.游戏结束函数gameOverFn
function gameOverFn() {
	clearInterval(timer);
	document.onkeydown = null;
	scoreIntializeFn();
	gameStart.style.display = "block";
}
//GGf.游戏开始函数gameStartFn
function gameStartFn() {
	clearInterval(timer);
	gameStart.style.display = "none";
	timer = setInterval(logicFn, 500);
	document.onkeydown = sankeControlFn;
}
//GGg.游戏初始化函数intializeFn
function intializeFn() {
	//snake初始化
	while (sHeader.nextElementSibling != sFooter.previousElementSibling) {
		snake.removeChild(sHeader.nextElementSibling);
	}
	var ranT = (Math.floor(Math.random() * (snake.offsetParent.clientHeight / sHeader.clientHeight - 20)) + 10) * sHeader.clientHeight;
	var ranL = (Math.floor(Math.random() * (snake.offsetParent.clientWidth / sHeader.clientWidth - 20)) + 10) * sHeader.clientWidth;
	sHeader.style.top = ranT + "px";
	sHeader.style.left = ranL + "px";
	sHeader.nextElementSibling.style.top = ranT + "px";
	sHeader.nextElementSibling.style.left = ranL - snakeW + "px";
	sFooter.style.top = ranT + "px";
	sFooter.style.left = ranL - snakeW * 2 + "px";
	//GG参数初始化
	tSpeed = 0;
	lSpeed = snakeW;
	direction = -30;
	timer = null;
	scoreIntializeFn();
	//函数初始化
	foodFn();
	snakeImgFn();
}
//GGj.游戏逻辑函数logicFn
function logicFn() {
	if (eatFn()) {
		sankeMoveFn();
	}
	snakeImgFn();
	deathFn();
	throughFn();
}
//GGk.穿墙数据处理函数throughDataFn
function throughDataFn(data) {
	return data > snakeW ? -snakeW : data < -snakeW ? snakeW : data;
}
/*
 * SS.snake模型模块
 * SSa.snake模型模块参数声明
 * SSb.snake运动函数sankeMoveFn
 * SSc.snake控制函数sankeControlFn
 * 		--内嵌游戏逻辑函数logicFn
 * SSd.snake贴图处理函数snakeImgFn
 * SSe.snake增长函数sankeGrowFn
 */
//SSb.snake运动函数
function sankeMoveFn() {
	for (var i = snake.children.length - 1; i > 0; i--) {
		snake.children[i].style.top = snake.children[i - 1].offsetTop + "px";
		snake.children[i].style.left = snake.children[i - 1].offsetLeft + "px";
	}
	sHeader.style.top = sHeader.offsetTop + tSpeed + "px";
	sHeader.style.left = sHeader.offsetLeft + lSpeed + "px";
}
//SSc.snake控制函数
function sankeControlFn() {
	switch (window.event.keyCode) {
		case 37: //向左
			if (direction != -30) {
				tSpeed = 0;
				lSpeed = -snakeW;
				direction = 0;
				logicFn();
			}
			break;
		case 38: //向上
			if (direction != -45) {
				tSpeed = -snakeW;
				lSpeed = 0;
				direction = -15;
				logicFn();
			}
			break;
		case 39: //向右
			if (direction != 0) {
				tSpeed = 0;
				lSpeed = snakeW;
				direction = -30;
				logicFn();
			}
			break;
		case 40: //向下
			if (direction != -15) {
				tSpeed = snakeW;
				lSpeed = 0;
				direction = -45;
				logicFn();
			}
			break;
		default:
			return;
	}
}
//SSd.snake贴图处理函数
function snakeImgFn() {
	//头部贴图
	sHeader.style.backgroundPositionY = direction + "px";
	//身体贴图
	for (var i = 1; i < snake.children.length - 1; i++) {
		var bigT = snake.children[i + 1].offsetTop - snake.children[i].offsetTop;
		var litT = snake.children[i].offsetTop - snake.children[i - 1].offsetTop;
		var bigL = snake.children[i + 1].offsetLeft - snake.children[i].offsetLeft;
		var litL = snake.children[i].offsetLeft - snake.children[i - 1].offsetLeft;
		//穿墙数据处理
		bigT = throughDataFn(bigT);
		litT = throughDataFn(litT);
		bigL = throughDataFn(bigL);
		litL = throughDataFn(litL);
		//贴图处理
		if (bigT == -litT) {
			snake.children[i].style.backgroundImage = sBody[0];
		} else {
			if (bigL == -litL) {
				snake.children[i].style.backgroundImage = sBody[1];
			} else {
				snake.children[i].style.backgroundImage = sBody[2];
				if (litT - bigL == -30 || bigT - litL == 30) {
					snake.children[i].style.backgroundPositionY = -30 + "px";
				} else {
					if (litT - bigL == 30 || bigT - litL == -30) {
						snake.children[i].style.backgroundPositionY = -15 + "px";
					} else {
						if (litT + bigL == -30 || bigT + litL == 30) {
							snake.children[i].style.backgroundPositionY = 0 + "px";
						} else {
							snake.children[i].style.backgroundPositionY = -45 + "px";
						}
					}
				}
			}
		}
	}
	//尾巴贴图
	var sF = 0;
	var sFT = sFooter.offsetTop - sFooter.previousElementSibling.offsetTop;
	var sFL = sFooter.offsetLeft - sFooter.previousElementSibling.offsetLeft;
	//穿墙数据处理
	sFT = throughDataFn(sFT);
	sFL = throughDataFn(sFL);
	//贴图处理
	sF = sFT ? sFT == snakeW ? -45 : -15 : sFL == snakeW ? -30 : 0;
	sFooter.style.backgroundPositionY = sF + "px";
}
//SSe.snake增长函数sankeGrowFn
function sankeGrowFn() {
	snake.insertBefore(sHeader.nextElementSibling.cloneNode(true), sHeader.nextElementSibling); //克隆身体第一块
	sHeader.nextElementSibling.style.top = sHeader.offsetTop + "px";
	sHeader.nextElementSibling.style.left = sHeader.offsetLeft + "px";
	sHeader.style.top = sHeader.offsetTop + tSpeed + "px";
	sHeader.style.left = sHeader.offsetLeft + lSpeed + "px";
}
/*
 * SC.计分模块
 * SCa.计分模块参数声明
 * SCb.计分初始化函数scoreIntialiizeFn
 * SCc.计分展示系统scoreShowFn
 * SCc.计分展示系统scoreShowFn
 * SCd.得分函数scoreGetFn
 * SCe.失分函数scoreLostFn
 * SCf.计分特效函数scoreAniFn
 */
//SCb.计分初始化函数scoreIntializeFn
function scoreIntializeFn() {
	scoring = 0;
	scoreShowFn();
}
//SCc.计分展示系统scoreShowFn
function scoreShowFn() {
	if (scoring > scoreHighest) {
		scoreHighest = scoring;
		scoreHighestTag.children[0].innerText = scoreHighest;
		scoreAniFn(scoreHighestTag, "+1");
	}
	scoreTag.children[0].innerText = scoring;
}
//SCd.加分函数scoreGetFn
function scoreGetFn() {
	scoring++;
	scoreAniFn(scoreTag, "+1");
	scoreShowFn();
}
//SCe.失分函数scoreLostFn
function scoreLostFn() {
	scoring--;
	scoreAniFn(scoreTag, "-1");
	scoreShowFn();
}
//SCf.计分特效函数scoreAniFn
function scoreAniFn(obj, sc) {
	var plus = document.createElement("span");
	plus.innerText = sc;
	obj.appendChild(plus);
	setTimeout(function() {
		obj.removeChild(obj.children[1]);
	}, 1000);
}