$(document).ready(function () {
	 $(".status").chosen({
	        disable_search_threshold	: 8,
	        no_results_text				: "没有找到",
	        allow_single_deselect		: true,
	        width: "160px"
	    });
	var start = {
        elem: '#search-app-start-date',
        format: 'YYYY-MM-DD ',
        min: '1970-01-01 ', //设定最小日期为当前日期
        max: laydate.now(), //最大日期
        istoday: false, //显示今天
        issure: false, //确定框
        choose: function (datas) {
            end.min = datas; //开始日选好后，重置结束日的最小日期
            end.start = datas //将结束日的初始值设定为开始日
        },
        clear: function () {
            end.min = '1970-01-01 '; //开始日清空后，重置结束日的最小日期
            end.start = laydate.now(); //将结束日的初始值设定为开始日
        }
    };
    var end = {
        elem: '#search-app-end-date',
        format: 'YYYY-MM-DD ',
        min: "1970-01-01",
        max: laydate.now(),
        istoday: false, //显示今天
        issure: false,  //确认框
        choose: function (datas) {
            start.max = datas; //结束日选好后，重置开始日的最大日期
        },
        clear: function () {
            start.min = '1970-01-01 '; //结束日清空后，重置开始日的最小日期
            start.max = laydate.now(); //将开始日的最大值设定为今天
        }
    };
    laydate(start);
    laydate(end);
    $(".type").chosen({
        disable_search_threshold	: 8,
        no_results_text				: "没有找到",
        allow_single_deselect		: true,
        width: "160px"
    });

});

//删除app
function deleteApp() {
    var ck = $("input[name='appList_input']:checked");
    if (ck.length == 0) {
        alertDialog("请选择要删除的信息。");
        return
    } else {
        var idArr = new Array();
        var userIsvalid = true;
        $(ck).each(function () {
            idArr.push($(this).val());
            if ($(this).attr("isvalid") == "0") {
                userIsvalid = false;
            }
        });
        if (!userIsvalid) {
            alertDialog("所选信息包含无效信息，不允许删除");
            return false;
        }
        confirmDialog("确认删除选中的App信息吗？", function () {
            var params = {}
            params.idArr = idArr.toString();
            $.ajax({
                url: ctx + "/sysVideo/delete.action",
                type: "post",
                data: params,
                dataType: "json",
                success: function (data) {
                    if (data.error == 1) {
                        successMsg("操作成功！", 1000, function () {
                            window.location.href = ctx + "/sysVideo/query.action";
                        });
                    } else if (data.error == -100) {
                        faildMsg("会话超时，请重新登陆！");
                    } else {
                        faildMsg(data.message);
                    }
                }
            });
        })
    }
}
//上传APP
function appUpload(){
	 window.location.href = ctx + "/sysVideo/preCreateVideo.action";
}
//上传APP
function editVideo(id){
	 window.location.href = ctx + "/sysVideo/preUpdate.action?id="+id;
}


