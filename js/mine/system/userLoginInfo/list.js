$(document).ready(function(){
	
	//复选框全选
	$('.userLoginInfoCheckAll').click(function(){
		if($(this).prop('checked')){
			$('.userLoginInfoCheckone').prop('checked',true);
		}else{
			$('.userLoginInfoCheckone').prop('checked',false);
		}
	});
	$('.userLoginInfoCheckone').click(function(){
		var len = $('.userLoginInfoCheckone').length;
		if($('.userLoginInfoCheckone:checked').length<len){
			$('.userLoginInfoCheckAll').prop('checked',false);
		}else{
			$('.userLoginInfoCheckAll').prop('checked',true);
		}
	});
});

function detailInfo(userName, ctime, ip,type,devid) {
	var options = {
		width: 450,
		top: 200,
		height: 300,
		overlay: true,
		dispose: true,
		move	: true,
		title: '查看详细信息',
		url: "",
		callback: function () {
		
		}
	};
	var detailDlg = new Dialog("#loginInfo-dialog_detail", options);
	detailDlg.show();
	$("#loginInfo_name").val(userName);
	$("#loginInfo_IP").val(ip);
	if(type == '1'){
		$("#loginInfo_type").val("pc");
	}else if(type=='2'){
		$("#loginInfo_type").val("mobile");
	}
	$("#loginInfo_devide").val(devid);
}
