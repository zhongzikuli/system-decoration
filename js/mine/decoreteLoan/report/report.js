$(function () {


    function getRecord() {
        /*实时战报*/
        $.ajax({
            url: ctx + "/battleReport/getRecord.action",
            type: "post",
            dataType: "json",
            success: function (result) {
                var html = "";
                $("#record").empty();
                if (result.error == 1) {
                    var data = result.rows;
                    var userLevel = data.userLevel;
                    if (userLevel != 5 || userLevel != 4) {
                        html += '<div class="ibox-items"><div class="ibox-item">';
                        html += '<h1>' + HQdecorate.formatMoney(formetMoney(data.dayLoanMoney), 2) + '</h1>';
                        html += '<p>今日贷款额(万元)</p></div></div>';
                        html += '<div class="ibox-items"><div class="ibox-item">';
                        html += '<h1>' + data.dayLoanNumber + '</h1>';
                        html += '<p>今日业务量(笔)</p></div></div>';
                        html += '<div class="ibox-items"><div class="ibox-item">';
                        html += '<h1>' + HQdecorate.formatMoney(formetMoney(data.monthLoanMoney), 2) + '</h1>';
                        html += '<p>本月贷款额(万元)</p></div></div>';
                        html += '<div class="ibox-items"><div class="ibox-item">';
                        html += '<h1>' + data.monthLoanNumber + '</h1>';
                        html += '<p>本月业务量(笔)</p></div></div>';
                    } else if (userLevel == 5) {
                        html += '<div class="ibox-items"><div class="ibox-item">';
                        html += '<h1>' + HQdecorate.formatMoney(formetMoney(data.dayLoanMoney), 2) + '</h1>';
                        html += '<p>个人今日贷款额(万元)</p></div></div>';
                        html += '<div class="ibox-items"><div class="ibox-item">';
                        html += '<h1>' + data.dayLoanNumber + '</h1>';
                        html += '<p>个人今日业务量(笔)</p></div></div>';
                        html += '<div class="ibox-items"><div class="ibox-item">';
                        html += '<h1>' + HQdecorate.formatMoney(formetMoney(data.monthLoanMoney), 2) + '</h1>';
                        html += '<p>个人本月贷款额(万元)</p></div></div>';
                        html += '<div class="ibox-items"><div class="ibox-item">';
                        html += '<h1>' + data.monthLoanNumber + '</h1>';
                        html += '<p>个人本月业务量(笔)</p></div></div>';
                    } else if (userLevel == 4) {
                        html += '<div class="ibox-items"><div class="ibox-item">';
                        html += '<h1>' + HQdecorate.formatMoney(formetMoney(data.dayLoanMoney), 2) + '</h1>';
                        html += '<p>部门今日贷款额(万元)</p></div></div>';
                        html += '<div class="ibox-items"><div class="ibox-item">';
                        html += '<h1>' + data.dayLoanNumber + '</h1>';
                        html += '<p>部门今日业务量(笔)</p></div></div>';
                        html += '<div class="ibox-items"><div class="ibox-item">';
                        html += '<h1>' + HQdecorate.formatMoney(formetMoney(data.monthLoanMoney), 2) + '</h1>';
                        html += '<p>部门本月贷款额(万元)</p></div></div>';
                        html += '<div class="ibox-items"><div class="ibox-item">';
                        html += '<h1>' + data.monthLoanNumber + '</h1>';
                        html += '<p>部门本月业务量(笔)</p></div></div>';
                    }
                    html += '<div style="clear: both;"></div>'
                    $("#record").append(html);
                } else if (result.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(result.message);
                }
            }

        });
    }


    function hideMenu() {
        $("#menuContent").fadeOut("fast");
    }


    var rank_zTree
    var rank_setting = {
        view: {
            dblClickExpand: false
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            onClick: rankDepartment
        }
    };

    function selectRankDepartment() {
        $("#rank-menuContent").css({
            "background": "#cff",
            "overflow": "auto",
            "z-index": 999,
            "top": "84px",
            "width": "198px",
            "border": "1px solid #08e6f5"

        }).slideDown("fast");
        $("body").bind("mousedown", onRankBodyDown);
        var id = $("#rank-departmentId").data("id");
        $.ajax({
            url: ctx + "/department/reportDeportmentTree.action",
            data: {id: id},
            dataType: "json",
            success: function (result) {
                if (result.error == 1) {
                    var zNodes = result.rows;
                    $.fn.zTree.init($("#rank-departmentTree"), rank_setting, zNodes);
                    rank_zTree = $.fn.zTree.getZTreeObj("rank-departmentTree");
                    rank_zTree.expandAll(true);
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    function onRankBodyDown(event) {
        if (!(event.target.id == "rank-menuContent" || $(event.target).parents("#rank-menuContent").length > 0)) {
            hideRankMenu();
        }
    }

    function hideRankMenu() {
        $("#rank-menuContent").fadeOut("fast");
    }

    function rankDepartment(event, treeId, treeNode) {
        $("#rank-departmentId").val(treeNode.name);
        $("#rank-departmentId").data("id", treeNode.id);
        hideRankMenu();
    }

    //
    $(".search").on("click", function () {
        searchSumbit();
    });

    //获取部门列表
    function init(userLevel) {
        if (userLevel != 5) {
            getPersonalDataList(0, null);
        }
        //
        getRecord();
    }


    //****************************//
    //*							*//
    //*	AJAX分页全部变量定义		*//
    //*							*//
    //***************************//
    var pageSize = 10;		//每页显示条数初始化，修改显示条数，修改这里即可
    var initFlag = true;	//是否为初始化第一页标记
    var userLevel = $(".wrapper-content").data("userlevel");

    init(userLevel);

    $("#pagerForm").find("input").keypress(function (event) {
        var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
        if (keyCode == 13) {
            searchSumbit();
        }
    });

    function searchSumbit() {
        initFlag = true;
        $("#pageNum").val(0);
        getPersonalDataList(0, null);
    };


    //部门树切换
    $("#rank-departmentId").on("click", function () {
        selectRankDepartment();
    });

    function getPersonalDataList(currPage, jg) {
        var departmentId = $("#rank-departmentId").data("id");
        $(".table-more tbody").html('');
        $.ajax({
            url: ctx + "/battleReport/reportList.action",
            type: "post",
            data: {
                'pageNum': currPage,
                'departmentId': departmentId,
                'numPerPage': pageSize
            },
            dataType: "json",
            success: function (data) {
                if (data.error == 1) {
                    if (data["rows"] != null && data["rows"]["totalCount"] > 0) {
                        if (initFlag) {
                            $("#pagination").pagination(data["rows"]["totalCount"], {
                                items_per_page: pageSize,
                                num_edge_entries: 1,
                                num_display_entries: 8,
                                callback: function (currPage, jg) {
                                    getPersonalDataList(currPage, jg);
                                }//回调函数
                            });
                            initFlag = false;
                        }
                        loadPersonalDataTbody(data, currPage);
                    } else {
                        $(".table-more tbody").html("<tr><td class='col-td text-center' colspan='10'>暂无数据</td></tr>");
                        $("#pagination").html("");
                    }
                } else {
                    $(".table-more tbody").html("<tr><td class='col-td text-center' colspan='10'>暂无数据</td></tr>");
                    $("#pagination").html("");
                }
            },
            error: function () {
                $(".table-more tbody").html("<tr><td class='col-td text-center' colspan='10'>暂无数据</td></tr>");
            }
        });
    }

    function loadPersonalDataTbody(data, currPage) {
        var tbody = "";
        var result = data.rows;
        $(".table-more tbody").html('');
        if (result.recordList == null || result.recordList == '' || result.recordList.length == 0) {
            tbody += '<tr><td class="col-td" colspan="6" >暂无数据</td></tr>';
        } else {
            var list = result.recordList;
            for (var j = 0; j < list.length; j++) {
                var num = Number(currPage * pageSize) + parseInt(j) + 1;
                tbody += '<tr><td>' + num + '</td>';
                if (userLevel == 4) {
                    tbody += '<td>' + list[j].userName + '</td>';
                } else {
                    tbody += '<td>' + list[j].departmentName + '</td>';
                }
                if (list[j].dayLoanMoney == 0) {
                    tbody += '<td>--</td>';
                } else {
                    tbody += '<td>' + HQdecorate.formatMoney(formetMoney(list[j].dayLoanMoney), 2) + '</td>';
                }
                if (list[j].dayLoanNumber == 0) {
                    tbody += '<td>--</td>';
                } else {
                    tbody += '<td>' + list[j].dayLoanNumber + '</td>';
                }
                if (list[j].monthLoanMoney == 0) {
                    tbody += '<td>--</td>';
                } else {
                    tbody += '<td>' + HQdecorate.formatMoney(formetMoney(list[j].monthLoanMoney), 2) + '</td>';
                }
                if (list[j].monthLoanNumber == 0) {
                    tbody += '<td>--</td>';
                } else {
                    tbody += '<td>' + list[j].monthLoanNumber + '</td>';
                }
                tbody += '</tr>';
            }
        }
        $(".table-more tbody").append(tbody);
    }

    //横向滚动条
    $('.scroll-x').scroll(function () {
        var winWidth = $(window).width();
        var scrollWidth = this.scrollWidth;
        var scrollLeft = this.scrollLeft;
        $(".pagination").css('right', (-18 - scrollLeft) + 'px');
        if (scrollWidth - winWidth < scrollLeft) {
            $(".pagination").css('right', -(scrollWidth - winWidth + 68) + 'px');
        }
    });

    function formetMoney(num) {
        if (num == "0") return "0.00";
        return num / 10000
    }
});
