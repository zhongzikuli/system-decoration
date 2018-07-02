var areaUtilJson;
var secondJson;

$(function(){
//	loadAreaTree();
});

/**
 * 加载地区json
 */
function loadAreaTree(){
	$.ajax({
		url : ctx + "/userUtil/userTree.action",
		type : "post",
        async: false,
		dataType : "jsonp",
		success : function(data) {
			if (data.error == 1) {
				areaUtilJson = data.rows;
			} else if (data.error == -100) {
				alertDialog("会话超时，请重新登陆！");
			} else {
				alertDialog(data.message);
			}
		}
	});
}

/**
 * @param firstId
 * @param secondId
 * @param thirdId
 * @param hideAreaId
 * 组装第一个下拉框
 */
function loadFirstSelect(firstId, secondId, thirdId, hideAreaId){
	setTimeout(function(){
		var firstParentId;
		var lastAreaId;
		if(undefined !== hideAreaId && null != hideAreaId){
			firstParentId = $("#" + hideAreaId).attr("firstParentId");
			lastAreaId = $("#" + hideAreaId).attr("areaId");
		}
		if(undefined !== firstId && null != firstId){
			$.each(areaUtilJson, function(j, n){
				$("#" + firstId).append("<option value='" + areaUtilJson[j].id + "'parentId='"+ areaUtilJson[j].parentId + "' index='" + j + "' idPath='" + areaUtilJson[j].idPath + "'>" + areaUtilJson[j].areaName + "</option>");
			});
			if(null != firstParentId && firstParentId != ""){
				$("#" + firstId).val(firstParentId);
			}else{
				if(null != lastAreaId && lastAreaId != ""){
					$("#" + firstId).val(lastAreaId);
				}
			}
		}
		//默认选中二、三级的第一个
		if(undefined !== secondId && null != secondId){
			loadSecondSelect(firstId, secondId, thirdId, hideAreaId);
		}
	}, 100);
}

/**
 * @param firstId
 * @param secondId
 * @param thirdId
 * @param hideAreaId
 * 组装第二个下拉
 */
function loadSecondSelect(firstId, secondId, thirdId, hideAreaId){
	var secondParentId;
	var lastAreaId;
	if(undefined !== hideAreaId && null != hideAreaId){
		secondParentId = $("#" + hideAreaId).attr("secondParentId");
		lastAreaId = $("#" + hideAreaId).attr("areaId");
	}
	if(undefined !== secondId && null != secondId){
		//清除下拉内容
		$("#" + secondId).empty();
		var index = 0;
		index = $("#" + firstId + " option:selected").attr("index");
		secondJson = areaUtilJson[index].children;
		$.each(secondJson, function(j, n){
			$("#" + secondId).append("<option value='" + secondJson[j].id + "'parentId='"+ secondJson[j].parentId + "' index='" + j + "' idPath='" + secondJson[j].idPath + "'>" + secondJson[j].areaName + "</option>");
		});
		if(null != secondParentId && secondParentId != ""){
			$("#" + secondId).val(secondParentId);
		}
	}
	if(undefined !== thirdId && null != thirdId){
		loadThirdSelect(firstId, secondId, thirdId, hideAreaId);
	}
}

/**
 * @param firstId
 * @param secondId
 * @param thirdId
 * @param hideAreaId
 * 组装第三个下拉
 */
function loadThirdSelect(firstId, secondId, thirdId, hideAreaId){
	if(undefined !== thirdId && null != thirdId){
		var lastAreaId;
		if(undefined !== hideAreaId && null != hideAreaId){
			lastAreaId = $("#" + hideAreaId).attr("areaId");
		}
		$("#" + thirdId).empty();
		var index = 0;
		index = $("#" + secondId + " option:selected").attr("index");
		var thirdJson = secondJson[index].children;
		$.each(thirdJson, function(j, n){
			$("#" + thirdId).append("<option value='" + thirdJson[j].id + "'parentId='"+ thirdJson[j].parentId + "' index='" + j + "' idPath='" + thirdJson[j].idPath + "'>" + thirdJson[j].areaName + "</option>");
		});
		if(null != lastAreaId && lastAreaId != ""){
			$("#" + thirdId).val(lastAreaId);
		}
	}
}

/**
 * @param firstId
 * @param secondId
 * @param thirdId
 * @param firstValue
 * @param secondValue
 * 孙峻强使用
 */
function useForEdit(firstId, secondId, thirdId,firstValue, secondValue){

	if(null != firstValue){
		//清除下拉内容
		$("#" + secondId).empty();
		var index = 0;
		index = $("#" + firstId + " option:selected").attr("index");
		secondJson = areaUtilJson[index].children;
		$.each(secondJson, function(j, n){
			$("#" + secondId).append("<option value='" + secondJson[j].id + "'parentId='"+ secondJson[j].parentId + "' index='" + j + "' idPath='" + secondJson[j].idPath + "'>" + secondJson[j].areaName + "</option>");
		});
	}
	
	if(null != secondValue){
		//清除下拉内容
		$("#" + thirdId).empty();
		var index = 0;
		index = $("#" + secondId + " option:selected").attr("index");
		var thirdJson = secondJson[index].children;
		$.each(thirdJson, function(j, n){
			$("#" + thirdId).append("<option value='" + thirdJson[j].id + "'parentId='"+ thirdJson[j].parentId + "' index='" + j + "' idPath='" + thirdJson[j].idPath + "'>" + thirdJson[j].areaName + "</option>");
		});
	}
}