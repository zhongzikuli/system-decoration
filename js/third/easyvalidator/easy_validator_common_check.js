/*
 * 通用easy_validator的check方法
 */

(function($) {
	$.extend($.fn, {
		valid : function(formId) {
			var result = false;
			var form = $("form")[0];
			if(undefined != formId && null != formId){
				form = $("#" + formId)[0];
			}
			if(form.fireEvent){
				result = form.fireEvent("onsubmit");
			}else if(document.createEvent){
				var ev = document.createEvent("HTMLEvents");
				ev.initEvent("submit", false, true);
				result = form.dispatchEvent(ev);
			}
			return result;
		}
	})
})(jQuery);

/**
 * @param checkId 验证的输入框ID
 * @param type 验证的类型
 *   1、type=str：不验证内容，只判断长度；
 *   2、type=num：内容必须是数字。
 * @param minLength 最小长度
 * @param maxLength 最大程度
 * 检查输入内容长度，超出范围，返回faild
 */
function checkLength(checkId, type, minLength, maxLength){
	if(undefined != checkId && checkId != null 
			&& undefined != type && type != null 
			&& undefined != minLength && minLength != null 
			&& undefined != maxLength && maxLength != null){
		var thisValue = $("#" + checkId).val();
		if(type == "str"){
			if(thisValue.length > maxLength){
				return "faild";
			}else if(thisValue.length < minLength){
				return "faild";
			}else{
				return "success";
			}
		}
	}
}

/**
 * @param selectId select的ID
 * @param equalsType 
 *        ——true则判断两个是是否相等，相等则faild(判断非空)；
 *        ——false则判断两个是是否不相等，不相等则faild(判断选中特定的值)。
 * @param checkValue 传入需要比对的值
 * 检查select是否有选中或选中特定的值
 */
function checkSelect(selectId, checkValue, submitValue){
	var selectValue = $("#" + selectId).val();
	var tipMsg = $("#" + selectId).attr("tip");
	if(checkValue){
		if(selectValue == submitValue){
			if($('#select2_span_' + selectId)[0]){
				$('#select2_span_' + selectId).addClass('validation-error');
				$('#select2_span_' + selectId).attr('title', tipMsg);
			}
			return "faild";
		}else{
			if($('#select2_span_' + selectId)[0]){
				$('#select2_span_' + selectId).removeClass('validation-error');
				$('#select2_span_' + selectId).removeAttr('title', tipMsg);
			}
			return "success";
		}
	}else{
		if(selectValue == submitValue){
			return "success";
		}else{
			return "faild";
		}
	}
}

/**
 * @param selfId 第一个数字输入框的ID
 * @param otherId 第二个数字输入框的ID
 * @param numType 数字类型
 *        ——numType=int，"^-?\\d+$"
 *        ——numType=float，"^(-?\\d+)(\\.\\d+)?$"
 * @param compareType 
 *        ——compareType=-1，比较结果selfId>otherId，返回faild，否则返回success；
 *        ——compareType=0，比较结果selfId=otherId，返回success，否则返回faild。
 *        ——compareType=1，比较结果selfId>otherId，返回success，否则返回faild；
 */
function checkTowNumLarger(selfId, otherId, numType, compareType){
	var num1 = $("#" + selfId).val().replace(/,/g, '');
	var num2 = $("#" + otherId).val().replace(/,/g, '');
	if(undefined != numType && null != numType){
		if(numType == "int"){
			var reg = new RegExp("^-?\\d+$");
			if(!reg.test(num1)){
				$("#" + selfId).attr('tip', '必须是整数。');
				return "faild";
			}
			if(!reg.test(num2)){
				$("#" + otherId).attr('tip', '必须是整数。');
				return "faild";
			}
			if(compareType == -1 || compareType == "-1"){
				if(parseFloat(num1).toFixed(2) - parseFloat(num2).toFixed(2) > 0){
					return "faild";
				}else{
					return "success";
				}
			}
			if(compareType == 0 || compareType == "0"){
				if(parseFloat(num1).toFixed(2) == parseFloat(num2).toFixed(2)){
					return "success";
				}else{
					return "faild";
				}
			}
			if(compareType == 1 || compareType == "1"){
				if(parseFloat(num1).toFixed(2) - parseFloat(num2).toFixed(2) > 0){
					return "success";
				}else{
					return "faild";
				}
			}
		}
		if(numType == "float"){
			var reg = new RegExp("^(-?\\d+)(\\.\\d+)?$");
			if(!reg.test(num1)){
				$("#" + selfId).attr('tip', '必须是浮点数。');
				return "faild";
			}
			if(!reg.test(num2)){
				$("#" + otherId).attr('tip', '必须是浮点数。');
				return "faild";
			}
			if(compareType == -1 || compareType == "-1"){
				if(parseFloat(num1).toFixed(2) - parseFloat(num2).toFixed(2) > 0){
					return "faild";
				}else{
					return "success";
				}
			}
			if(compareType == 0 || compareType == "0"){
				if(parseFloat(num1).toFixed(2) == parseFloat(num2).toFixed(2)){
					return "success";
				}else{
					return "faild";
				}
			}
			if(compareType == 1 || compareType == "1"){
				if(parseFloat(num1).toFixed(2) - parseFloat(num2).toFixed(2) > 0){
					return "success";
				}else{
					return "faild";
				}
			}
		}
	}else{
		$("#" + selfId).attr('tip', '验证规则有误。');
		return "faild";
	}
}

/**
 * @param lableId 标签ID
 * @param tipMsg tip信息
 * @param objMsg obj信息
 * @param checkMsg check信息
 * 动态给标签添加验证规则
 */
function addRequire(lableId, tipMsg, objMsg, checkMsg){
	if(undefined != lableId && null != lableId){
		if(undefined != tipMsg && null != tipMsg && "" != tipMsg){
			$("#" + lableId).attr("tip", tipMsg);
		}
		if(undefined != objMsg && null != objMsg && "" != objMsg){
			$("#" + lableId).attr("obj", objMsg);
		}
		if(undefined != checkMsg && null != checkMsg && "" != checkMsg){
			$("#" + lableId).attr("check", checkMsg);
		}
	}
}

/**
 * @param lableId 标签ID
 * @param tipMsg tip信息
 * @param objMsg obj信息
 * @param checkMsg check信息
 * 动态给标签去掉验证规则
 */
function removeRequire(lableId, tipMsg, objMsg, checkMsg){
	if(undefined != lableId && null != lableId){
		if(undefined != tipMsg && null != tipMsg && "" != tipMsg){
			$("#" + lableId).removeAttr("tip");
		}
		if(undefined != objMsg && null != objMsg && "" != objMsg){
			$("#" + lableId).removeAttr("obj");
		}
		if(undefined != checkMsg && null != checkMsg && "" != checkMsg){
			$("#" + lableId).removeAttr("check");
		}
		$("#" + lableId).removeClass("validation-error");
	}
}











