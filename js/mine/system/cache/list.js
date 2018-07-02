function refreshCache(type){
	loadingShow();
	$.ajax({
		url : ctx + "/cache/refreshCache.action?refreshType=" + type,
		type : "post",
		dataType : "jsonp",
		success : function(data) {
			loadingHide();
			if (data.error == 1) {
				successMsg("操作成功。", 1000);
			} else if (data.error == -100) {
				alertDialog("会话超时，请重新登陆！");
			} else {
				alertDialog(data.message);
			}
		}
	});
}