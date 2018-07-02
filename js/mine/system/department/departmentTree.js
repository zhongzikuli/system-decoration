$(function () {
    initTree();

    $("#dic-add").on("click", function () {
        insertDepartment()
    })
    $("#dic-update").on("click", function () {
        updateDepartment()
    })
    $("#dic-delete").on("click", function () {
        deleteDepartment()
    })

    /*添加部门*/
    function insertDepartment() {
        hideRMenu();
        var nodes = zTree.getSelectedNodes();
        if (nodes.length == 0) {
            return;
        }
        var id = nodes[0].id;
        var grandId = nodes[0].grandId;
        var options = {
            width: 350,
            top: 200,
            height: $("#orgType").val() == 2 ? 300 : 450,
            overlay: true,
            dispose: true,
            title: '添加',
            move: true,
            fade: false,
            onBeforeShow: function () {
                init_city_select($("#create-department-province"), 2);
                $("#establishDate").on("click", function () {
                    laydate({
                        format: 'YYYY-MM-DD',
                        min: '1970-01-01', //设定最小日期为当前日期
                        max: laydate.now(), //最大日期
                        istoday: false, //显示今天
                        issure: true, //确定框
                        istime: false,
                        start: laydate.now()
                    });
                });
            },
            callback: function () {
                var flag = false;
                if ($("#department-add-form").valid("department-add-form")) {
                    var name = $("#department-add-name").val();
                    var sortNo = $("#department-add-sortNo").val();
                    var province = $("#create-department-province").val();
                    var areaCode = $("#department-area-code").val();
                    var departmentType = $("#department-add-form").find("select[name='departmentType']").val();
                    var forbidden = $("#department-add-form").find("select[name='forbidden']").val();
                    var establishDate = $("#establishDate").val();
                    HQdecorate.post(ctx + "/department/create.action", {
                        name: name,
                        sortNo: sortNo,
                        parentId: id,
                        grandId: grandId,
                        forbidden: forbidden,
                        departmentType: departmentType,
                        province: province,
                        areaCode: areaCode,
                        establishDateStr: establishDate
                    }, function (data) {
                        if (data.error == 1) {
                            refreshTree();
                            HQdecorate.successMsg("添加成功");
                        } else if (data.error == -100) {
                            flag = true;
                            HQdecorate.faildMsg("会话超时，请重新登陆！");
                        } else {
                            flag = true;
                            HQdecorate.faildMsg(data.message);
                        }
                    }, function (res) {
                        HQdecorate.faildMsg(res.responseText, 1000)
                    }, false);
                    if (flag) {
                        return false;
                    }
                } else {
                    return false;
                }

            }
        };
        var editDlg = new Dialog("#department-add", options);
        //下拉框初始化
        $(".chosen-select").chosen({
            disable_search_threshold: 8,
            no_results_text: "没有找到",
            allow_single_deselect: true,
            width: "100%"
        });
        editDlg.show();
        $(".dialog-overlay").show();
    }

    /*更新部门*/
    function updateDepartment() {
        hideRMenu();
        var nodes = zTree.getSelectedNodes();
        if (nodes.length == 0) {
            return;
        }
        var id = nodes[0].id;
        var parentId = nodes[0].parentId;
        var grandId = nodes[0].grandId;
        var province = nodes[0].province;
        var areaCode = nodes[0].areaCode;
        var establishDate = nodes[0].establishDateStr;
        var options = {
            width: 350,
            top: 200,
            height: $("#orgType").val() == 2 ? 300 : 500,
            overlay: true,
            dispose: true,
            title: '更新',
            fade: false,
            onBeforeShow: function () {
                init_city_select($("#department-update-province"), 2);

                HQdecorate.post(ctx + "/department/getDepartmentName.action", {id: parentId}, function (data) {
                    if (data.error == 1) {
                        $("#parent-department").val(data.rows.name);
                        $("#parent-department").data("id", data.rows.id);
                    } else if (data.error == -100) {
                        HQdecorate.faildMsg("会话超时，请重新登陆！");
                    } else {
                        HQdecorate.faildMsg(data.message);
                    }
                }, function (res) {
                    HQdecorate.faildMsg(res.responseText, 1000)
                });


                $("#establishDate").on("click", function () {
                    laydate({
                        format: 'YYYY-MM-DD',
                        min: '1970-01-01', //设定最小日期为当前日期
                        max: laydate.now(), //最大日期
                        istoday: false, //显示今天
                        issure: true, //确定框
                        istime: false,
                        start: laydate.now()
                    });
                });
            },
            callback: function () {
                if ($("#department-update-form").valid("department-update-form")) {
                    var name = $("#department-update-name").val();
                    var parentId = $("#parent-department").data("id");
                    var grandId = $("#parent-department").data("grandId");
                    var sortNo = $("#department-update-sortNo").val();
                    var province = $("#department-update-province").val();
                    var areaCode = $("#department-update-area-code").val();
                    var departmentType = $("#department-update-form").find("select[name='departmentType']").val();
                    var forbidden = $("#department-update-form").find("select[name='forbidden']").val();
                    var establishDate = $("#establishDate").val();
                    HQdecorate.post(ctx + "/department/update.action", {
                        name: name,
                        sortNo: sortNo,
                        id: id,
                        parentId: parentId,
                        grandId: grandId,
                        forbidden: forbidden,
                        departmentType: departmentType,
                        province: province,
                        areaCode: areaCode,
                        establishDateStr: establishDate
                    }, function (data) {
                        if (data.error == 1) {
                            refreshTree();
                            HQdecorate.successMsg("更新成功");
                        } else if (data.error == -100) {
                            HQdecorate.faildMsg("会话超时，请重新登陆！");
                        } else {
                            HQdecorate.faildMsg(data.message);
                        }
                    }, function (res) {
                        HQdecorate.faildMsg(res.responseText, 1000)
                    })
                } else {
                    return false;
                }
            },
            onInit: function () {
                $("#department-update-name").val(nodes[0].name);
                $("#department-update-name").data("id", nodes[0].id);
                $("#department-update-name").attr("param", "id=" + nodes[0].id);
                $("#department-update-sortNo").val(nodes[0].sortNo);
                $("#department-update-province").val(province);
                $("#department-update-area-code").val(areaCode);
                $("#establishDate").val(establishDate);
                $("#department-update-area-code").trigger("chosen:updated");
                $("#department-update-form").find("select[name='departmentType']").val(nodes[0].departmentType);
                $("#department-update-form").find("select[name='forbidden']").val(nodes[0].forbidden);
            }
        };

        var editDlg = new Dialog("#department-update", options);
        //下拉框初始化
        $(".chosen-select").chosen({
            disable_search_threshold: 8,
            no_results_text: "没有找到",
            allow_single_deselect: true,
            width: "100%"
        });
        editDlg.show();
        $(".dialog-overlay").show();
    }

    function deleteDepartment() {
        hideRMenu();
        var nodes = zTree.getSelectedNodes();
        if (nodes.length == 0) {
            return;
        }
        HQdecorate.confirmDialog('确定删除？', true, {}, function () {
            HQdecorate.post(ctx + "/department/delete.action", {id: nodes[0].id}, function (data) {
                if (data.error == 1) {
                    refreshTree();
                    HQdecorate.successMsg("删除成功");
                } else if (data.error == -100) {
                    HQdecorate.faildMsg("会话超时，请重新登陆！");
                } else {
                    HQdecorate.faildMsg(data.message);
                }
            }, function (res) {
                HQdecorate.faildMsg(res.responseText, 1000)
            })
        });
    }

});

function compareH() {
    var _height = $(".department-right").height();
    var height = $(".sub_content").height();
    var maxNum = Math.max(_height, height)
    $(".border-r-3").height(maxNum);
}

var zTreeObj;
var zTree;
var rMenu;

/*初始化部门树*/
function initTree() {
    $.ajax({
        url: ctx + "/department/departmentTree.action",
        dataType: "json",
        success: function (result) {
            if (result.error == 1) {
                var setting = {
                    callback: {
                        onRightClick: function (event, treeId, treeNode) {
                            if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
                                zTree.cancelSelectedNode();
                                showRMenu("root", treeNode, event.pageX, event.pageY);
                            } else if (treeNode) {
                                zTree.selectNode(treeNode);
                                showRMenu("node", treeNode, event.pageX, event.pageY);
                            }
                        },
                        onClick: function (event, treeId, treeNode) {

                        }
                    }
                };
                var zNodes = result.rows;
                $(document).ready(function () {
                    zTreeObj = $.fn.zTree.init($("#organ-manage-tree"), setting, zNodes);
                });
                $("#organ-manage-tree").mousedown(function (e) {
                    if (e.which == 1) {
                        hideRMenu();
                    }
                });
                zTree = $.fn.zTree.getZTreeObj("organ-manage-tree");
                rMenu = $("#dic-rMenu");
                zTree.expandAll(true);
            } else {

            }

        }
    })
}

function showRMenu(type, treeNode, x, y) {
    $("#dic-rMenu ul").show();
    if (type == "node") {
        if (treeNode.grandId) {
            $("#data_dic_add").show();
            $("#data_dic_update").hide();
            $("#data_dic_delete").hide();
        } else {
            $("#data_dic_add").show();
            $("#data_dic_update").show();
            $("#data_dic_delete").show();
        }
    }
    rMenu.css({"top": (y) + "px", "left": (x) + "px", "display": "block"});
}

function hideRMenu() {
    if (rMenu) {
        rMenu.css({"display": "none"});
    }
}

function refreshTree() {
    hideRMenu();
    initTree();
}


var zTree2

function showDepartmentMenu(width) {
    $("#menuContent").css({
        "background": "rgb(255,255,255)",
        "overflow": "auto",
        "z-index": 999,
        "top": "39px",
        "width": width + "px"
    }).slideDown("fast");
    $("body").bind("mousedown", onBodyDown);
    var name = $("#department-update-name").val();
    var setting = null;
    HQdecorate.post(ctx + "/department/departmentTreeNotId.action", {id: $("#department-update-name").data("id")}, function (data) {
        /*如果没有部门，添加提示去创建部门*/
        if (result.error == 1 && result.rows[0].children.length > 0) {
            setting = {
                view: {
                    dblClickExpand: false
                },
                data: {
                    simpleData: {
                        enable: true
                    }
                },
                callback: {
                    onClick: onClick
                }
            };
            var zNodes = result.rows;
            $.fn.zTree.init($("#departmentTree"), setting, zNodes);
            zTree2 = $.fn.zTree.getZTreeObj("departmentTree");
            zTree2.expandAll(true);
        }
    }, function (res) {
        HQdecorate.faildMsg(res.responseText, 1000)
    })
}

function onClick(event, treeId, treeNode) {
    $("#parent-department").data("id", treeNode.id);
    $("#parent-department").data("grandId", treeNode.grandId);
    $("#parent-department").val(treeNode.name);
}

function hideMenu() {
    $("#menuContent").fadeOut("fast");
    $("body").unbind("mousedown", onBodyDown);
}

function onBodyDown(event) {
    if (!(event.target.id == "parent-department" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length > 0)) {
        hideMenu();
    }
}

/**
 * 删除
 */

function validForm(lableId) {
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $(lableId).val() == "") {
            if ($(lableId).attr("id") == "department-add-name"
                || $(lableId).attr("id") == "department-add-name") {
                $(lableId).attr('tip', '部门名称为空，请重新输入。');
                return "faild";
            } else if ($(lableId).attr("id") == "department-add-sortNo"
                || $(lableId).attr("id") == "department-add-sortNo") {
                $(lableId).attr('tip', '排序为空，请重新输入。');
                return "faild";
            } else if ($(lableId).attr("name") == "departmentType") {
                $(lableId).parent().attr('tip', '部门类型为空，请重新选择。').addClass("validation-error");
                return "faild";
            }
            return "success";
        }
        if ($(lableId).val() != null && $(lableId).val() != "") {
            var _this = $(lableId);
            if ($(lableId).attr("id") == "department-add-name") {
                if (!(/^[\u4E00-\u9FA5A-Za-z]+$/).exec(_this.val())) {
                    $(lableId).attr('tip', '部门名称只支持中文或英文字母。');
                    return "faild";
                } else {
                    if (!(/^.{1,20}$/).exec(_this.val())) {
                        $(lableId).attr('tip', '长度不超过20个字符。');
                        return "faild";
                    } else {
                        return "success";
                    }
                }
            }
            if ($(lableId).attr("id") == "department-add-sortNo") {
                if (!(/^[1-9]\d*$/).exec(_this.val())) {
                    $(lableId).attr('tip', '序号必须为正整数。');
                    return "faild";
                }
            }
        }
        return "success";
    }
}


