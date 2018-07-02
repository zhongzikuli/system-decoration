$(function () {

    //---------------------------------控件初始化------------------------------------------------------------------------
    //时间控件初始化
    orderTrackInitLaydate("orderTrack-start-time", "orderTrack-end-time");

    //搜索时间控件
    function orderTrackInitLaydate(start, end) {
        var sTime = {
            elem: '#' + start,
            format: 'YYYY-MM-DD',
            min: '1970-01-01 ', //设定最小日期为当前日期
            //max: laydate.now(), //最大日期
            istoday: false, //显示今天
            issure: true, //确定框
            istime: false,
            start: laydate.now(),
            choose: function (datas) {
                eTime.min = datas; //开始日选好后，重置结束日的最小日期
            },
            clear: function () {
                eTime.min = '1970-01-01 '; //开始日清空后，重置结束日的最小日期
            }
        };

        var eTime = {
            elem: '#' + end,
            format: 'YYYY-MM-DD',
            min: '1970-01-01', //设定最小日期为当前日期
            //max: laydate.now(), //最大日期
            istoday: false, //显示今天
            issure: true, //确定框
            istime: false,
            start: laydate.now(0, 'YYYY年MM月DD日'),
            choose: function (datas) {
                sTime.max = datas;			//结束日选好后，重置开始日的最大日期
            },
            clear: function () {
                sTime.min = '1970-01-01';	//结束日清空后，重置开始日的最小日期
                sTime.max = laydate.now();	//将开始日的最大值设定为今天
            }
        };
        laydate(sTime);
        laydate(eTime);
    }

    //------------------------------------------------------------------------------------------------------------------

    //刷新
    $(".refresh-btn").on("click",function () {
        $(".search-btn").trigger("click");
    });

    //重置
    $(".reset-btn").on("click", function () {
        $("#orderTrack-start-time").val('');
        $("#orderTrack-end-time").val('');
    });

});