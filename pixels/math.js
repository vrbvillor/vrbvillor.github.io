//为了保正运算正常，所有非数字的值（但应该使用数字的话）都被对待为零

var DECIMAL = 2,
	//默认保留两位小数
	//数学函数
	PI = Math.PI,
	sin = Math.sin,
	cos = Math.cos,
	tan = Math.tan,
	asin = Math.asin,
	acos = Math.acos,
	atan = Math.atan,
	abs = Math.abs,
	random = rnd = Math.random,
	round = Math.round,
	sqrt = Math.sqrt,
	pow = Math.pow,
	ceil = Math.ceil,
	floor = Math.floor,
	max = Math.max,
	min = Math.min;

function root(x, n) {
	return isNaN(n) ? 0 : pow(float(x), 1 / float(n));
}
//正则表达式
var reg_free = /^[\w\W]*$/,
	//不限制
	reg_int = /^[\+\-]?\d+$/,
	//十进制整数
	reg_int_pos = /^[\+]?[0]*[1-9]\d*$/,
	//正整数，+0不算
	reg_int_neg = /^[\-][0]*[1-9]\d*$/,
	//负整数，-0不算
	reg_0 = /^[+-]?[0]+$/,
	//零，多个0算是一个0
	reg_int_nat = /^[\+]?\d+$/,
	//自然数
	reg_int_odd = /^[\+\-]?\d*[13579]$/,
	//奇数
	reg_int_evn = /^[\+\-]?\d*[24680]$/,
	//偶数
	reg_int_fiv = /^[\+\-]?\d*[50]$/,
	//五的倍数
	reg_int_bin = /^[01]+$/,
	//二进制整数
	reg_int_oct = /^[0-8]+$/,
	//八进制整数
	reg_int_hex = /^[a-f\d]+$/i,
	//十六进制整数
	reg_float = /^[\+\-]?((\d+(\.\d+)?)|(\d*\.\d+))$/,
	//单精度浮点数（包含整数，与无整数的小数）
	reg_double = /^[\+\-]?\d(\.\d+)?(e\d+)?$/i,
	//双精数度浮点数，有效数字一定在1到10的右半开区间上，所以不能出现.5的状况
	reg_percentage = /^[\+\-]?\d*(\.\d*)?\%$/,
	//百分量，1%或1.5%，不能出现.5%的状况
	reg_pixel = /^([\+\-]?(\d+(\.\d+)?)|(\d*\.\d+))px$/i
	//像素值，使用单精度数加px，忽略大小写
;
//判别函数

function isInt(n) {
	return !isNaN(n) && reg_int.test(n);
}

function isPos(n) {
	return !isNaN(n) && n * 1 > 0;
}

function isPosInt(n) {
	return !isNaN(n) && reg_int_pos.test(n);
}

function is0(n) {
	return !isNaN(n) && reg_0.test(n);
}

function isNat(n) {
	return !isNaN(n) && reg_int_nat.test(n);
}

function isArr(o) {
	return o instanceof Array;
}

function isObj(o) {
	return o instanceof Object;
}

function isArg(o) {
	return "callee" in o;
}

function isFun(o) {
	return o instanceof Function;
}
//转化函数

function t2a(t) {
	return isNaN(t) ? 0 : t / PI * 180;
}

function a2t(a) {
	return isNaN(a) ? 0 : a * PI / 180;
}

function int(n) {
	return isNaN(n) ? 0 : parseInt(n);
}

function float(n) {
	return isNaN(n) ? 0 : parseFloat(n);
}

function bool(n) {
	return Boolean(n);
}

function num(n) {
	return isNaN(n) ? 0 : Number(n);
}

function fix(n, bit) { //将小数n，保留bit位小数，如果bit不设置，则使用全局DECIMAL变量
	if (isNaN(n)) return 0;
	if (isNaN(bit)) bit = DECIMAL;
	return n.toFixed(bit);
}
//杂项函数

function rand(m, n) { //范围内的随机整数，若不指定范围，则取0-9内的随机数
	if (isNaN(m)) m = 0;
	if (isNaN(n)) n = 9;
	return floor(random() * (max(m, n) - min(m, n))) + min(m, n);
}

function HCF(m, n) /*最大公约数highest common factor*/
{
	if (isNaN(m) || isNaN(n)) return 0;
	a = max(m, n);
	b = min(m, n);
	return a % b ? HCF(b, a % b) : b;
}

function LCM(m, n) /*最小公倍数least common multiple*/
{
	if (isNaN(m) || isNaN(n)) return 0;
	return m * n / HCF(m, n);
}

function module() { //求向量的模，也可以求若干个数的平方和的算术平方根
	var arr = arguments;
	if (!arr.length) return 0;
	if (isArr(arr[0])) arr = arr[0];
	var n = 0;
	//IE678下，没有办法用for...in遍历argumets对象
	for (var x = 0; x < arr.length; x++) n += pow(float(arr[x]), 2);
	return sqrt(n);
}

function sigma(m, n, fun) { //求和，m跟n只能用整数，fun只能用需要一个参数的有返回值的函数，或者为空（求累加）
	if (!isInt(m) || !isInt(n)) return 0;
	var a = max(m, n),
		b = min(m, n),
		s = 0;
	if (!isFun(fun)) fun = function(x) {
		return x;
	}
	for (var x = b; x <= a; x++) {
		var t = fun(x);
		if (t === undefined) return 0;
		s += fun(x) * 1.0;
	}
	return s;
}

function factorial(n) { //阶乘
	if (!isPosInt(n)) return 0;
	return n == 1 ? 1 : factorial(n - 1) * n;
}

function Fibonacci(n) { //斐波那切数列
	if (!isPosInt(n)) return 0;
	if (n == 1 || n == 2) return 1;
	else return Fibonacci(n - 1) + Fibonacci(n - 2);
}

function checkMatrix() {
	if (!CHImatrix) {
		alert("需要matrix.js文件");
		return false;
	}
	return true;
}

//解常规方程的函数
//一元一次：r * x + v = 0

function Equation(o) {
	return o.r ? (o.v / o.r * -1 || 0) : undefined;
}
//二元一次：a * x + b * y + c = 0

function Equation21(o1, o2) {
	function test(o) { //参数a，b不能同时不存在或为零
		return o.a || o.b;
	}
	if (!test(o1) || !test(o2)) return undefined;
	var a = o1.a || 0,
		b = o1.b || 0,
		c = o1.c || 0,
		m = o2.a || 0,
		n = o2.b || 0,
		p = o2.c || 0;
	if (a * n == b * m) return undefined;
	return {
		x: (b * p - c * n) / (a * n - b * m),
		y: (a * p - c * m) / (b * m - a * n)
	};
}
//三元一次：a * x + b * y + c * z + d = 0

function Equation31(o1, o2, o3) {
	function test(o) { //参数a，b，c不能同时不存在或为零
		return o.a || o.b || o.c;
	}

	function seek(arr) { //找到z有系数c的式子
		for (var n in arr) {
			var o = arr[n];
			if (o.c) return o;
		}
		return undefined;
	}
	if (!test(o1) || !test(o2) || !test(o3)) return undefined;
	var a1 = o1.a || 0,
		b1 = o1.b || 0,
		c1 = o1.c || 0,
		d1 = o1.d || 0,
		a2 = o2.a || 0,
		b2 = o2.b || 0,
		c2 = o2.c || 0,
		d2 = o2.d || 0,
		a3 = o3.a || 0,
		b3 = o3.b || 0,
		c3 = o3.c || 0,
		d3 = o3.d || 0;
	var oo1 = {
		a: a1 * c2 - a2 * c1,
		b: b1 * c2 - b2 * c1,
		c: d1 * c2 - d2 * c1
	},
		oo2 = {
			a: a1 * c3 - a3 * c1,
			b: b1 * c3 - b3 * c1,
			c: d1 * c3 - d3 * c1
		};
	var rXY = Equation21(oo1, oo2);
	if (rXY == undefined) return undefined;
	var x = rXY.x,
		y = rXY.y;
	var o = seek([o1, o2, o3]);
	var z = -1 * (o.a * x + o.b * y + o.d) / o.c;
	return {
		x: x,
		y: y,
		z: z
	};
}
//一元二次：a * x * x + b * x + c = 0

function Equation12(o) { //参数a，b不能同时不存在或为零
	if (!o.a && !o.b) return undefined;
	if (!o.a) return Equation({
		r: o.b,
		v: o.c
	});
	var a = o.a || 0,
		b = o.b || 0,
		c = o.c || 0;
	var delta = b * b - 4 * a * c;
	if (delta < 0) return undefined;
	else if (!delta) return -0.5 * b / a;
	return [(-1 * b + sqrt(delta)) / a * 0.5, (-1 * b - sqrt(delta)) / a * 0.5];
}