$(function () {
    var sTime = {
        elem: '#sTime',
        format: 'YYYY-MM-DD',
		min: '1970-01-01', //设定最小日期为当前日期
		max: laydate.now(), //最大日期
		istoday: false, //显示今天
		issure: true, //确定框
		istime: false,
		//start: laydate.now() + ' 00:00:00',
		choose: function (datas) {
			eTime.min = datas; //开始日选好后，重置结束日的最小日期
		},
		clear: function () {
			eTime.min = '1970-01-01'; //开始日清空后，重置结束日的最小日期
		}
    };
    var eTime = {
        elem: '#eTime',
        format	: 'YYYY-MM-DD',
		min		: "1970-01-01",
		max		: laydate.now(),
		istoday	: false,				//显示今天
		issure	: true,					//确认框
		istime	: false,
		//start: laydate.now(0, 'YYYY年MM月DD日 hh:mm:ss'),
		choose	: function (datas) {
			sTime.max = datas;			//结束日选好后，重置开始日的最大日期
		},
		clear: function () {
			sTime.min = '1970-01-01';	//结束日清空后，重置开始日的最小日期
			sTime.max = laydate.now();	//将开始日的最大值设定为今天
		}
    };
    laydate(sTime);
    laydate(eTime);
    
    $(".table-daily").find("td").each(function(){
    	$(this).hover(function (e) {
            var content =$(this).html();
            $(this).attr('title',content);
        })
    });
    //刷新按钮
    $(".refresh-btn").on("click", function () {
        $(".search-btn").trigger("click");
    });
});

function detail(id) {
    var options = {
        width: 900,
        top: 150,
        height: 500,
        overlay: true,
        dispose: true,
        move: true,
        title: "查看详情",
        url : ctx + "/sysOperatorLog/detail.action?id="+id
    };
    new Dialog("#log-dialog", options).show();
}
