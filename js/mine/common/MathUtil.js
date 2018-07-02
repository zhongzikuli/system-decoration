//浮点数相加
function accAddFloat(arg1,arg2){
	arg1 = parseFloat(arg1).toFixed(2);
	arg2 = parseFloat(arg2).toFixed(2);
	var r1,r2,m,n;  
	try {
		r1 = arg1.toString().split(".")[1].length;
	} catch (e) {
		r1 = 0;
	}
	try {
		r2 = arg2.toString().split(".")[1].length;
	} catch (e) {
		r2 = 0;
	}
	m = Math.pow(10,Math.max(r1,r2));
	n = (r1 >= r2) ? r1 : r2;
	return ((arg1 * m + arg2 * m) / m).toFixed(n);
}

//浮点数相减
function accSubFloat(arg1, arg2) {
	arg1 = parseFloat(arg1).toFixed(2);
	arg2 = parseFloat(arg2).toFixed(2);
	var r1, r2, m, n;
	try {
		r1 = arg1.toString().split(".")[1].length;
	}
	catch (e) {
	    r1 = 0;
	}
	try {
	    r2 = arg2.toString().split(".")[1].length;
	}
	catch (e) {
	    r2 = 0;
	}
	m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
	n = (r1 >= r2) ? r1 : r2;
	return ((arg1 * m - arg2 * m) / m).toFixed(n);
}
