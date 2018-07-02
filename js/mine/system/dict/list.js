//节点树
var zTree;
//右键菜单
var rMenu;

//初始化数据
$(function () {
    initTree();
});

function initTree() {
    HQdecorate.post(
        ctx + "/dictionary/getTree.action",
        null,
        function (data) {
            if (data.error == 1) {
                var setting = {
                    callback: {
                        onRightClick: function (event, treeId, treeNode) {
                            if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
                                zTree.cancelSelectedNode();
                                showRMenu("root", treeNode, event.clientX, event.clientY);
                            } else if (treeNode) {
                                zTree.selectNode(treeNode);
                                showRMenu("node", treeNode, event.clientX, event.clientY);
                            }
                        }
                    }
                };

                var zNodes = data.rows;

                $(document).ready(function () {
                    $.fn.zTree.init($("#dictionary-manage-tree"), setting, zNodes);
                });


                $("#dictionary-manage-tree").mousedown(function (e) {
                    if (e.which == 1) {
                        hideRMenu();
                    }
                });
                zTree = $.fn.zTree.getZTreeObj("dictionary-manage-tree");
                rMenu = $("#dic-rMenu");
                zTree.expandAll(false);
            } else if (res.error == -100) {
                HQdecorate.faildMsg("获取节点数失败", 1000)
            }
        },
        function (res) {
            HQdecorate.faildMsg(res.responseText, 1000)
        }
    );

    /*$.ajax({
        url: ctx + "/dictionary/getTree.action",
        dataType: "jsonp",
        success: function (data) {
            if (data.error == 1) {
                var setting = {
                    callback: {
                        onRightClick: function (event, treeId, treeNode) {
                            if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
                                zTree.cancelSelectedNode();
                                showRMenu("root", treeNode, event.clientX, event.clientY);
                            } else if (treeNode) {
                                zTree.selectNode(treeNode);

                                showRMenu("node", treeNode, event.clientX, event.clientY);
                            }
                        }
                    }
                };

                var zNodes = data.rows;

                $(document).ready(function () {
                    $.fn.zTree.init($("#dictionary-manage-tree"), setting, zNodes);
                });


                $("#dictionary-manage-tree").mousedown(function (e) {
                    if (e.which == 1) {
                        hideRMenu();
                    }
                });
                zTree = $.fn.zTree.getZTreeObj("dictionary-manage-tree");
                rMenu = $("#dic-rMenu");
                zTree.expandAll(false);
            } else {
                alertDialog("获取失败");
            }
        }
    });*/
}


function showRMenu(type, treeNode, x, y) {
    $("#dic-rMenu ul").show();
    if (type == "root") {
        $("#data_dic_add").attr("parent-id", null != treeNode ? treeNode.id : 0).show();
        $("#data_dic_update").attr("parent-id", null != treeNode ? treeNode.id : 0).hide();
        $("#data_dic_delete").attr("parent-id", null != treeNode ? treeNode.id : 0).hide();
        $("#data_dic_refresh").attr("parent-id", null != treeNode ? treeNode.id : 0).show();
    } else if (type == "node") {
        $("#data_dic_add").attr("parent-id", null != treeNode ? treeNode.id : 0).show();
        $("#data_dic_update").attr("parent-id", null != treeNode ? treeNode.id : 0).show();
        $("#data_dic_delete").attr("parent-id", null != treeNode ? treeNode.id : 0).show();
        $("#data_dic_refresh").attr("parent-id", null != treeNode ? treeNode.id : 0).show();
    }
    rMenu.css({"top": (y) + "px", "left": (x) + "px", "z-index": 100, "display": "block"});
}

function hideRMenu() {
    if (rMenu) {
        rMenu.css({"display": "none"});
    }
}

function refreshTree() {
    hideRMenu();
    $.fn.zTree.destroy("dictionary-manage-tree");
    initTree();
}

//新增、修改登录账号检验
function checkKeyWorld() {
    var keyWorld = $.trim($("input[name='name']").val());
    var dictId = $("input[name='id']").val();
    if (keyWorld === '') {
        return;
    }
    HQdecorate.post(
        ctx + "/dictionary/checkKeyWorld.action",
        {id: dictId, keyWorld: keyWorld},
        function (res) {
            if (res.error == 1) {

            } else if (res.error == -100) {
                HQdecorate.faildMsg("请求超时", 1000)
            } else {
                HQdecorate.faildMsg(res.message, 1000, function () {
                    $("input[name='name']").addClass("validation-error");
                });
            }
        },
        function (res) {
            HQdecorate.faildMsg(res.responseText, 1000)
        }
    );
    /*$.ajax({
        url: ctx + "/dictionary/checkKeyWorld.action",
        type: "post",
        data: {id: dictId, keyWorld: keyWorld},
        dataType: "json",
        success: function (data) {
            if (data.error == 1) {
                //$('.dialog-ok').trigger('click');
            } else if (data.error == -100) {
                faildMsg("会话超时，请重新登陆！");
            } else {
                faildMsg(data.message);
                $("input[name='name']").addClass("validation-error");
            }
        }
    });*/
}

/**
 * 新增
 */
function insertDataDic(_this) {
    hideRMenu();
    var parentId = $(_this).attr("parent-id");
    var nodes = zTree.getSelectedNodes();
    var options = {
        width: 300,
        top: 200,
        height: 260,
        overlay: true,
        dispose: true,
        title: '添加',
        fade: false,
        onAfterShow: function () {
            HQdecorate.post(
                ctx + "/dictionary/getMaxOrder.action",
                {},
                function (data) {
                    if (data.error == 1) {
                        $("#dataDic-add-classOrder").val(data.rows);
                    } else if (data.error == -100) {
                        HQdecorate.faildMsg("请求超时", 1000)
                    }
                },
                function (res) {
                    HQdecorate.faildMsg(res.responseText, 1000)
                }
            );
            this.setIndex(1000000, 1000001);
        },
        callback: function () {
            if (!$("#dictionary-add-form").valid()) {
                return false;
            }
            var obj = {
                keyWorld: $("#dictionary-add-keyWorld").val(),
                valueDesc: $("#dictionary-add-valueDesc").val(),
                classOrder: $("#dictionary-add-classOrder").val()
            };
            if (nodes.length != 0) {
                obj.parentId = parentId;//有选中的节点则其id为新增节点的父节点，否则默认为0
                obj.classLevel = nodes[0].classLevel + 1;
                obj.classType = nodes[0].classType;
            } else {
                obj.parentId = 0;
                obj.classLevel = 0;
                obj.classType = obj.keyWorld;
            }
            HQdecorate.post(
                ctx + "/dictionary/insert.action",
                obj,
                function (data) {
                    if (data.error == 1) {
                        HQdecorate.successMsg("添加节点成功", 1000, function () {
                            refreshTree();
                        })
                    } else if (data.error == -100) {
                        HQdecorate.faildMsg("请求超时", 1000)
                    }
                },
                function (res) {
                    HQdecorate.faildMsg(res.responseText, 1000)
                }
            );
            /*$.ajax({
                url: ctx + "/dictionary/insert.action",
                type: "post",
                data: obj,
                dataType: "jsonp",
                success: function (data) {
                    if (data.error == 1) {
                        refreshTree();
                        //refreshCache('dict');
                        successMsg("添加成功");
                    } else if (data.error == -100) {
                        faildMsg("会话超时，请重新登陆！");
                    } else {
                        faildMsg(data.message);
                    }
                }
            });*/
        }
    };
    var editDlg = new Dialog("#dictionary-add-gridDialog", options);
    //获取最大的排序号
    /*$.ajax({
        url: ctx + "/dictionary/getMaxOrder.action",
        type: "post",
        dataType: "jsonp",
        success: function (data) {
            if (data.error == 1) {
                $("#dataDic-add-classOrder").val(data.rows);
            }
        }
    });*/
    editDlg.show();
    $(".dialog-overlay").show();
}

/**
 * 修改
 */
function updateDataDic() {
    hideRMenu();
    var nodes = zTree.getSelectedNodes();
    var options = {
        width: 300,
        top: 200,
        height: 260,
        overlay: true,
        dispose: true,
        title: '修改',
        fade: false,
        callback: function () {
            if (!$("#dictionary-update-form").valid()) {
                return false;
            }
            var parmas = {
                keyWorld: $("#dictionary-update-keyWorld").val(),
                valueDesc: $("#dictionary-update-valueDesc").val(),
                classOrder: $("#dictionary-update-classOrder").val(),
                classType: nodes[0].classType,
                id: nodes[0].id
            };

            if (nodes[0].children != null && nodes[0].children != '') {
                parmas.isParent = 1;
            } else {
                parmas.isParent = 0;
            }
            HQdecorate.post(
                ctx + "/dictionary/update.action",
                parmas,
                function (res) {
                    if (res.error == 1) {
                        HQdecorate.successMsg("节点修改成功", 1000, function () {
                            refreshTree();
                        })
                    } else if (res.error == -100) {
                        HQdecorate.faildMsg("请求超时", 1000)
                    }
                },
                function (res) {
                    HQdecorate.faildMsg(res.responseText, 1000)
                }
            )

            /*$.ajax({
                url: ctx + "/dictionary/update.action",
                type: "post",
                data: obj,
                dataType: "jsonp",
                success: function (data) {
                    if (data.error == 1) {
                        refreshTree();
                        //refreshCache('dict');
                        successMsg("修改成功");
                    } else if (data.error == -100) {
                        faildMsg("会话超时，请重新登陆！");
                    } else {
                        faildMsg(data.message);
                    }
                }
            });*/
        },
        onInit: function () {
            $("#dictionary-update-keyWorld").val(nodes[0].keyWorld);
            $("#dictionary-update-valueDesc").val(nodes[0].valueDesc);
            $("#dictionary-update-classOrder").val(nodes[0].classOrder);
            $("#dictionary-update-keyWorld").attr("param", "id=" + nodes[0].id)
        },
        onBeforeShow: function () {
            this.setIndex(1000000, 1000001);
        }
    };
    var editDlg = new Dialog("#dictionary-update-gridDialog", options);
    editDlg.show();
    $(".dialog-overlay").show();
}

/**
 * 删除
 */
function deleteDataDic() {
    hideRMenu();
    HQdecorate.confirmDialog('确定删除该节点？', true, {}, function () {
        var nodes = zTree.getSelectedNodes();
        if (nodes[0].children != null && nodes[0].children != '') {
            HQdecorate.alertDialog("该节点包含子节点，不能删除！");
            return false;
        }
        var parmas = {
            id: nodes[0].id
        };
        HQdecorate.post(
            ctx + "/dictionary/delete.action",
            parmas,
            function (res) {
                if (res.error == 1) {
                    HQdecorate.successMsg("节点删除成功", 1000, function () {
                        refreshTree();
                    })
                } else if (res.error == -100) {
                    HQdecorate.faildMsg("请求超时", 1000)
                }
            },
            function (res) {
                HQdecorate.faildMsg(res.responseText, 1000)
            }
        )
        /*$.ajax({
            url: ctx + "/dictionary/delete.action",
            type: "post",
            data: obj,
            dataType: "jsonp",
            success: function (data) {
                if (data.error == 1) {
                    refreshTree();
                    //refreshCache('dict');
                    successMsg("删除成功");
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });*/
    });
}

//值集新增表单校验
function validDictForm(lableId) {
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $(lableId).val() == "") {
            if ($(lableId).attr("id") == "dictionary-add-keyWorld") {
                $(lableId).attr('tip', '关键字为空，请重新输入。');
                return "faild";
            } else if ($(lableId).attr("id") == "dictionary-add-classOrder") {
                $(lableId).attr('tip', '排序为空，请重新输入。');
                return "faild";
            } else if ($(lableId).attr("id") == "dictionary-add-valueDesc") {
                $(lableId).attr('tip', '名称为空，请重新输入。');
                return "faild";
            }
            return "success";
        }
        if ($(lableId).val() != null && $(lableId).val() != "") {
            var _this = $(lableId);
            //新建
            if ($(lableId).attr("id") == "dictionary-add-classOrder") {
                if (!(/(^[1-9]([0-9]+)?(\[0-9])?$)|(^[0-9]\[0-9]([0-9])?$)/).exec(_this.val())) {
                    $(lableId).attr('tip', '排序只能为正整数');
                    return "faild";
                } else {
                    return "success";
                }
            }
            return "success";
        }
        return "success";
    }
}

//值集修改表单校验
function validDictEditForm(lableId) {
    if (undefined != lableId && null != lableId && lableId != "") {

        if ($(lableId).val() == null || $(lableId).val() == "") {
            if ($(lableId).attr("id") == "dictionary-update-keyWorld") {
                $(lableId).attr('tip', '关键字为空，请重新输入。');
                return "faild";
            } else if ($(lableId).attr("id") == "dictionary-update-classOrder") {
                $(lableId).attr('tip', '排序为空，请重新输入。');
                return "faild";
            } else if ($(lableId).attr("id") == "dictionary-update-valueDesc") {
                $(lableId).attr('tip', '名称为空，请重新输入。');
                return "faild";
            }
            return "success";
        }
        if ($(lableId).val() != null && $(lableId).val() != "") {
            var _this = $(lableId);
            //新建
            if ($(lableId).attr("id") == "dictionary-update-classOrder") {
                if (!(/(^[1-9]([0-9]+)?(\[0-9])?$)|(^[0-9]\[0-9]([0-9])?$)/).exec(_this.val())) {
                    $(lableId).attr('tip', '排序只能为正整数');
                    return "faild";
                } else {
                    return "success";
                }
            }
            return "success";
        }
        return "success";
    }
}