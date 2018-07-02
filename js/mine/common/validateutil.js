var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}; 
var wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
/**
* 检查输入的身份证号是否正确
* 输入:str  字符串
*  返回:true 或 flase; true表示格式正确
*/
function isCardID (sId) {
	// 18位身份证判断
	if (typeof(sId) != "undefined" && sId.length == 18) {
		var iSum = 0;
		if (!/^\d{17}(\d|x)$/i.test(sId))
			return "你输入的身份证长度或格式错误";
		sId = sId.replace(/x$/i, "a");
		if (aCity[parseInt(sId.substr(0, 2))] == null)
			return "你的身份证地区非法";
		sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
		var d = new Date(sBirthday.replace(/-/g, "/"));
		if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()))
			return "身份证上的出生日期非法";
		for ( var i = 17; i >= 0; i--)
			iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
		if (iSum % 11 != 1)
			return "你输入的身份证号非法";
		return true;
	} else if (typeof(sId) != "undefined" && sId.length == 15) {// 15位身份证判断
		if (!/^\d{15}$/i.test(sId))
			return "你输入的身份证长度或格式错误";
		if (aCity[parseInt(sId.substr(0, 2))] == null)
			return "你的身份证地区非法";
		sBirthday = "19" + sId.substr(6, 2) + "-" + Number(sId.substr(8, 2)) + "-" + Number(sId.substr(10, 2));
		var d = new Date(sBirthday.replace(/-/g, "/"));
		if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()))
			return "身份证上的出生日期非法";
		return true;
	} else {
		return "身份证长度不合法";
	}
}

/**
 * 校验密码复杂度，避免密码过于简单
 * @param {Object} code
 */
function isValidPassWord(val) {
	
	if (val.length < 6) {
		return '密码长度不能少于6位';
	}
//	console.log(/^[0-9]+$/.test(val));
//	if (/[0-9]+/.test(val)) {
//		return '密码长度不能全为数字';
//	}
	val = val.replace(/^(?:([a-z])|([A-Z])|([0-9])|(.)){6,}|(.)+$/, "$1$2$3$4$5");
	//console.log (val.length);

	return true;
}

/**
 * 校验企业组织机构代码
 * @param code
 * @returns {Boolean}
 */
function isValidEnterpriseCode(code) {
	var ws = [3, 7, 9, 10, 5, 8, 4, 2];
	var str = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var reg = /^([0-9A-Z]){8}-[0-9|X]$/; 
	if (!reg.test(code)) {
	return false;
	}
	var sum = 0;
	for (var i = 0; i < 8; i++) {
		sum += str.indexOf(code.charAt(i)) * ws[i];
	}
	var c9 = 11 - (sum % 11);
	c9 = c9 == 10 ? 'X' : c9;
	if(c9 == 10){
		if(code.charAt(9) == 'X'){
			return true;
		}else{
			return false;
		}
	}else if(c9 == 11){
		if(code.charAt(9) == 0){
			return true;
		}else{
			return false;
		}
	}else{
		return c9 == code.charAt(9);
	}
}
/**
 * 是否为有效的企业信用代码
 * @param code
 * @returns {Boolean}
 */
function isValidEnterpriseCreditCode(code) {
	// 18位业信用代码判断
	if (typeof(code) != "undefined" && code.length == 18) {
		var orgNo  = code.substr(8, 8) + "-" + code.substr(16, 1);
		var ws = [3, 7, 9, 10, 5, 8, 4, 2];
		var str = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		var reg = /^([0-9A-Z]){8}-[0-9|X]$/; 
		if (!reg.test(orgNo)) {
			return false;
		}
		var sum = 0;
		for (var i = 0; i < 8; i++) {
			sum += str.indexOf(orgNo.charAt(i)) * ws[i];
		}
		var c9 = 11 - (sum % 11);
		c9 = c9 == 10 ? 'X' : c9;
		if(c9 == 10){
			if(orgNo.charAt(9) == 'X'){
				return true;
			}else{
				return false;
			}
		}else if(c9 == 11){
			if(orgNo.charAt(9) == 0){
				return true;
			}else{
				return false;
			}
		}else{
			return c9 == orgNo.charAt(9);
		}
	}else{
		return false;
	}
}

//
//$.extend($.fn.validatebox.defaults.rules, {
//    CHS: {
//        validator: function (value, param) {
//            return /^[\u0391-\uFFE5]+$/.test(value);
//        },
//        message: '请输入汉字'
//    },
//    english: {// 验证英语
//        validator: function (value) {
//            return /^[A-Za-z]+$/i.test(value);
//        },
//        message: '请输入英文'
//    },
//    ip: {// 验证IP地址
//        validator: function (value) {
//            return /\d+\.\d+\.\d+\.\d+/.test(value);
//        },
//        message: 'IP地址格式不正确'
//    },
//    ZIP: {
//        validator: function (value, param) {
//            return /^[0-9]\d{5}$/.test(value);
//        },
//        message: '邮政编码不存在'
//    },
//    QQ: {
//        validator: function (value, param) {
//            return /^[1-9]\d{4,10}$/.test(value);
//        },
//        message: 'QQ号码不正确'
//    },
//    mobile: {
//        validator: function (value, param) {
//            return /^(?:13\d|15\d|18\d)-?\d{5}(\d{3}|\*{3})$/.test(value);
//        },
//        message: '手机号码不正确'
//    },
//    tel: {
//        validator: function (value, param) {
//            return /^(\d{3}-|\d{4}-)?(\d{8}|\d{7})?(-\d{1,6})?$/.test(value);
//        },
//        message: '电话号码不正确'
//    },
//    mobileAndTel: {
//        validator: function (value, param) {
//            return /(^([0\+]\d{2,3})\d{3,4}\-\d{3,8}$)|(^([0\+]\d{2,3})\d{3,4}\d{3,8}$)|(^([0\+]\d{2,3}){0,1}13\d{9}$)|(^\d{3,4}\d{3,8}$)|(^\d{3,4}\-\d{3,8}$)/.test(value);
//        },
//        message: '请正确输入电话号码'
//    },
//    number: {
//        validator: function (value, param) {
//        	value = value.replace(/,/g, "");
//            return /^[0-9]+\.?[0-9]*$/.test(value);
//        },
//        message: '请输入数字'
//    },
//    numberWithOutDot: {
//        validator: function (value, param) {
//            return /^[0-9]+?[0-9]*$/.test(value);
//        },
//        message: '请输入数字'
//    },
//    year: {
//        validator: function (value, param) {
//            return (/^[0-9]{4}$/.test(value)) && (value >=1900 && value <=2050);
//        },
//        message: '请输入(1900-2050)之间的4位数字'
//    },
//    money: {
//        validator: function (value, param) {
//        	value = value.replace(/,/g, "");
//            return (/^(([1-9]\d*)|\d)(\.\d{1,2})?$/).test(value);
//        },
//        message: '请输入正确的金额'
//
//    },
//    mone: {
//        validator: function (value, param) {
//        	value = value.replace(/,/g, "");
//            return (/^(([1-9]\d*)|\d)(\.\d{1,2})?$/).test(value);
//        },
//        message: '请输入整数或两位小数'
//
//    },
//    integer: {
//        validator: function (value, param) {
//        	value = value.replace(/,/g, "");
//            return /^[+]?[1-9]\d*$/.test(value);
//        },
//        message: '请输入最小为1的整数'
//    },
//    integerWithZero: {
//        validator: function (value, param) {
//        	value = value.replace(/,/g, "");
//            return /^[+]?[0-9]\d*$/.test(value);
//        },
//        message: '请输入最小为0的整数'
//    },
//    integ: {
//        validator: function (value, param) {
//            return /^([+]?[0-9])|([-]?[0-9])+\d*$/.test(value);
//        },
//        message: '请输入整数'
//    },
//    range: {
//        validator: function (value, param) {
//        	value = value.replace(/,/g, "");
//        	value = parseFloat(value, 10);
//        	if (/^(([1-9]\d*)|\d)(\.\d{1,2})?$/.test(value)) {
//                return value >= param[0] && value <= param[1];
//            } else {
//                return false;
//            }
//        },
//        message: '输入的数字在{0}到{1}之间'
//    },
//    rangeRate: {
//        validator: function (value, param) {
//        	value = value.replace(/,/g, "");
//        	value = parseFloat(value, 10);
//        	if (/^(([1-9]\d*)|\d)(\.\d{1,6})?$/.test(value)) {
//                return value >= param[0] && value <= param[1];
//            } else {
//                return false;
//            }
//        },
//        message: '输入的利率在{0}到{1}之间'
//    },
//    rangeDynamic: {
//        validator: function (value, param) {
//        	value = value.replace(/,/g, "");
//        	value = parseFloat(value, 10);
//            if (/^(([1-9]\d*)|\d)(\.\d{1,2})?$/.test(value)) {
//                return value >= parseFloat($(param[0]).html(),10) && value <= parseFloat($(param[1]).html(),10);
//            } else {
//                return false;
//            }
//        },
//        message: '请根据右边范围正确填写'
//    },
//    sumCompare: {
//    	validator: function(value,param){
//    		var sum = 0;
//    		for(var i = 0,len = param && param.length; i<len;i++){
//    			var pm = $(param[i]).val()== "" ? 0 : parseInt($(param[i]).val(),10);  			 
//    			sum+=pm;
//    		}    	
//    		return (parseInt(value,10)+sum) >= 100;
//    	},
//    	message: '担保比例总和应该大于或等于100'
//    },
//    sumCompareDuty: {
//        validator: function (value, param) {
//            var sum = 0;
//            for (var i = 0, len = param && param.length; i < len; i++) {
//                //var pm = $(param[i]).val()== "" ? 0 : parseInt($(param[i]).val(),10);
//                var pm = parseInt($(param[i]).numberbox("getValue"), 10);
//                sum += (isNaN(pm) ? 0 : pm);
//            }
//            //return (parseInt(value,10)+sum) <= 100;
//            var total = parseInt(value, 10) + (isNaN(sum) ? 0 : sum);
//            return total <= 100;
//        },
//    	message: '责任比例总和应该小于或等于100'
//    },
//    sumMoney: {
//        validator: function (value, param) {
//        	value = value.replace(/,/g, "");
//        	var shoudSum = param[0];
//            var sum = 0;
//            for (var i = 0, len = shoudSum && shoudSum.length; i < len; i++) {
//                var pm = parseFloat($(shoudSum[i]).numberbox("getValue"), 10);
//                sum += (isNaN(pm) ? 0 : pm);
//            }
//            var total = parseFloat(value, 10) + (isNaN(sum) ? 0 : sum);
//            return total == parseFloat($(param[1]).numberbox("getValue"), 10);
//        },
//    	message: '实收金额应等于还款总额'
//    },
//    rangeCompare: {
//    	validator: function(value,param){
//    		value = value.replace(/,/g, "");
//    		return parseInt($(param[0]).val(),10) <= parseInt(value,10);
//    	},
//    	message: '后面一个值应该大于前面一个值'
//    },
//    rangeLess: {
//    	validator: function(value,param){
//    		value = value.replace(/,/g, "");
//    		return parseInt($(param[0]).val(),10) >= parseInt(value,10);
//    	},
//    	message: '后面一个值应该小于前面一个值'
//    },
//    rangeCompareLess: {
//    	validator: function(value,param){
//    		value = value.replace(/,/g, "");
//    		var pm0,pm1;
//    		pm1 = $(param[1]).val() == "" ? 0 : parseInt($(param[1]).val(),10);
//    		pm0 = $(param[0]).val() == "" ? 0 : parseInt($(param[0]).val(),10);
//    		return (parseInt(value,10) <= pm1 && parseInt(value,10) >= pm0);
//    	},
//    	message: '请输入正常范围内的数值'
//    },
//    rangeAndLess: {
//    	validator: function(value,param){
//    		value = value.replace(/,/g, "");
//    		var pm0,pm1;
//    		pm1 = $(param[1]).val() == "" ? 0 : parseFloat($(param[1]).val(),10);
//    		pm0 = $(param[0]).val() == "" ? 0 : parseFloat($(param[0]).val(),10);
//    		return (parseFloat(value,10) <= pm0 && parseFloat(value,10) <= pm1);
//    	},
//    	message: '请输入正常范围内的数值'
//    },
//    rangeAndLessEmpty: {
//    	validator: function(value,param){
//    		value = value.replace(/,/g, "");
//    		var pm0,pm1,pm2,pm3;
//    		if(!$(param[2]).val()){
//    			pm2 = parseFloat($(param[0]).val(),10);
//    		}else{
//    			pm2 = parseFloat($(param[2]).val(),10);
//    		}
//    		if(!$(param[3]).val()){
//    			pm3 = parseFloat($(param[1]).val(),10);
//    		}else{
//    			pm3 = parseFloat($(param[3]).val(),10);
//    		}
//    		pm1 = pm3 == "" ? 0 : parseFloat(pm3,10);
//    		pm0 = pm2 == "" ? 0 : parseFloat(pm2,10);
//    		return (parseFloat(value,10) <= pm0 && parseFloat(value,10) <= pm1);
//    	},
//    	message: '请输入正常范围内的数值'
//    },
//    //1-28之间的正整数
//    rangeValue: {
//    	validator: function(value,param){
//    		return value >= 1 && value <= 28;
//    	},
//    	message: '请输入1-28之间整数'
//    },
//    minLength: {
//        validator: function (value, param) {
//            return value.length >= param[0];
//        },
//        message: '至少输入{0}个字'
//    },
//    maxLength: {
//        validator: function (value, param) {
//            return value.length <= param[0];
//        },
//        message: '最多{0}个字'
//    },
//    maxValue: {
//    	validator: function(value,param){
//    		console.log(param[0]);
//    		var val = parseInt(param[0].toString().split(",").join(""),10);
//    		var value = parseInt(value.toString().split(",").join(""),10);
//    		return value <= val;
//    	},
//    	message: '最大值不能超过{0}'
//    },
//    //select即选择框的验证
//    selectValid: {
//        validator: function (value, param) {
//            if (value == param[0]) {
//                return false;
//            } else {
//                return true;
//            }
//        },
//        message: '请选择'
//    },
//    idCode: {
//        validator: function (value, param) {
//            return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value);
//        },
//        message: '请输入正确的身份证号'
//    },
//    loginName: {
//        validator: function (value, param) {
//            return /^[\u0391-\uFFE5\w]+$/.test(value);
//        },
//        message: '登录名称只允许汉字、英文字母、数字及下划线。'
//    },
//    equalTo: {
//        validator: function (value, param) {
//            return value == $(param[0]).val();
//        },
//        message: '两次输入的字符不一至'
//    },
//    englishOrNum: {// 只能输入英文和数字
//        validator: function (value) {
//            return /^[a-zA-Z0-9_ ]{1,}$/.test(value);
//        },
//        message: '请输入英文、数字、下划线或者空格'
//    },
//    xiaoshu: {
//        validator: function (value) {
//            return /^(([1-9]+)|([0-9]+\.[0-9]{1,2}))$/.test(value);
//        },
//        message: '最多保留两位小数！'
//    },
//    liangweixiaoshu: {
//    	validator: function (value) {
//    		return /^(([1-9][0-9]*)(\.[0-9]{1,2})?|(0\.[0-9]{1,2}))$/.test(value);
//    	},
//    	message: '最多保留两位小数！'
//    },
//    zhengzhengshu: {
//    	validator: function (value) {
//    		return /^(([1-9][0-9]*)|(0))$/.test(value);
//    	},
//    	message: '请输入正整数！'
//    },
//    xiaoshuWithoutDigitLimit:{
//    	  validator: function (value) {
//              return /^(([1-9]+)|([0-9]+\.[0-9]+))$/.test(value);
//          },
//          message: '请输入非零整数或小数！'   	
//    },
//    ddPrice: {
//        validator: function (value, param) {
//            if (/^[1-9]\d*$/.test(value)) {
//                return value >= param[0] && value <= param[1];
//            } else {
//                return false;
//            }
//        },
//        message: '请输入1到100之间正整数'
//    },
//    jretailUpperLimit: {
//        validator: function (value, param) {
//            if (/^[0-9]+([.]{1}[0-9]{1,2})?$/.test(value)) {
//                return parseFloat(value) > parseFloat(param[0]) && parseFloat(value) <= parseFloat(param[1]);
//            } else {
//                return false;
//            }
//        },
//        message: '请输入0到100之间的最多俩位小数的数字'
//    },
//    rateCheck: {
//        validator: function (value, param) {
//            if (/^[0-9]+([.]{1}[0-9]{1,2})?$/.test(value)) {
//                return parseFloat(value) > parseFloat(param[0]) && parseFloat(value) <= parseFloat(param[1]);
//            } else {
//                return false;
//            }
//        },
//        message: '请输入0到1000之间的最多俩位小数的数字'
//    },
//    email: {
//        validator: function (value, param) {
//            return /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value);
//        },
//        message: '请输入正确的邮箱'
//    },
//    /**
//     * 身份证合法性校验
//     */
//    idcard: {   
//        validator: function(value,param){  
//    		var flag= isCardID(value);
//            return flag==true?true:false;  
//        },   
//        message: '不是有效的身份证号码'  
//    },
//	/**
//	 * 
//	 * 组织扩张号校验
//	 */
//	extendnum: {   
//        validator: function(value, param){  
//    		return /^[0-9]{4}$/.test(value);
//        },   
//        message: '输入正确格式的扩张号'  
//    },
//    // 结束日期大于初始日期验证
//    validDate:{
//        validator:function(value,param){
//            var beginValue=$(param[0]).datebox("getValue");
//            var begin=$.fn.datebox.defaults.parser(beginValue);
//            var end=$.fn.datebox.defaults.parser(value);
//            return end>=begin;
//        },
//        message:"结束时间不能小于开始时间"
//    },
//    //验证输入日期的正确性
//    validDateType:{
//        validator:function(value,param){           
//            return /^(\d{4})-(\d{2})-(\d{2})$/.test(value);
//        },
//        message:"不是有效的日期格式"
//    },
//    //验证输入日期的正确性
//    validDatePlus:{
//        validator:function(value,param){
//            return /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/.test(value);
//        },
//        message:"不是有效的日期,且格式应为“yyyy-MM-dd”"
//    },
//    //验证输入日期的正确性(yyyy-MM)
//    validDateYYYYMM:{
//        validator:function(value,param){
//            return /^((?!0000)[0-9]{4})-(0[1-9]|1[0-2])$/.test(value);
//        },
//        message:"不是有效的日期,且格式应为“yyyy-MM”"
//    },
//    organizationNo:{
//    	validator: function(value,param){  
//    		var flag= isValidEnterpriseCode(value);
//            return flag==true?true:false;  
//        },   
//        message: '请输入有效的组织机构代码'
//    },
//    creditNo:{
//    	validator: function(value,param){  
//    		var flag= isValidEnterpriseCreditCode(value);
//            return flag==true?true:false;  
//        },   
//        message: '请输入有效的信用代码'
//    },
//	password: {
//		validator: function (value, param) {
//			var flag = isValidPassWord(value);
//			return flag==true?true:false;  
//		},
//		message: '密码过于简单'
//	},
//	nojiankuohao: {
//    	validator: function (value) {
//    		 if(/<|>/.test(value)){
//    			 return false;
//    		 }
//    		 else return true;
//    	},
//    	message: '不能输入尖括号！'
//    },
//    mustChoose: {
//    	validator: function(value) {
//    		return (value.indexOf("请选择") >= 0)?false:true;
//    	},
//    	message: '请选择'
//    }
//   
//});
