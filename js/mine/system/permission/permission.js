// 权限管理
function doManage() {
    var options = {
        width: 560,
        top: 200,
        height: 520,
        overlay: true,
        dispose: true,
        move: true,
        isStick: false,
        title: '权限管理',
        url: ctx + "/permission/permissionTree.action",
        callback: function () {

        },
        onAfterHide: function () {
            if ($('#permissionChangeFlag').val() == 'true') {
                window.location.href = ctx + "/permission/query.action";
            }
        }
    };
    var manageDialog = new Dialog("#permission-manage-btn", options);
    manageDialog.show();
}

// 查看
function viewOne(name, type, url, perCode, parentName, id, visible, sortNo) {
    var options = {
        width: 640,
        top: 200,
        height: 410,
        overlay: true,
        dispose: true,
        move: true,
        title: '查看权限',
        callback: function () {

        },
        onInit: function () {
            $("#permission-view-gridDialog-name").val(name);
            $("#permission-view-gridDialog-parentName").val(parentName);
            if (type == 'permission') {
                $("#permission-view-gridDialog-type").val('权限');
                $("#permission-view-gridDialog-perCode-div").show();
                $("#permission-view-gridDialog-url-div").hide();
                $("#permission-view-gridDialog-visible-div").hide();
                $("#permission-view-gridDialog-orderNo-div").hide();
                $("#permission-view-gridDialog-perCode").val(perCode);
            } else if (type == 'menu') {
                $("#permission-view-gridDialog-type").val('菜单');
                $("#permission-view-gridDialog-perCode-div").hide();
                $("#permission-view-gridDialog-url-div").show();
                $("#permission-view-gridDialog-url").val(url);

                $("#permission-view-gridDialog-visible-div").show();
                $("#permission-view-gridDialog-visible").val(visible);

                $("#permission-view-gridDialog-orderNo-div").show();
                $("#permission-view-gridDialog-orderNo").val(sortNo);

            }

            var setting = null;
            HQdecorate.post(ctx + "/permission/queryAllTree.action", null, function (data) {
                setting = {
                    callback: {
                        beforeClick: function (treeId, treeNode, clickFlag) {
                            return false; // 禁止点击
                        }
                    },

                    data: {
                        key: {
                            url: "xxxxxx" // 设置xxxxxx为url路径 即不跳转
                        }
                    }
                };

                var zNodes = data.rows;

                $(document).ready(function () {
                    $.fn.zTree.init($("#permission-view-gridDialog-menu"), setting, zNodes);
                });
                var treeObj = $.fn.zTree.getZTreeObj("permission-view-gridDialog-menu");
                selectAndExpandNode(treeObj, id, true);
            }, function (res) {
                HQdecorate.faildMsg(res.responseText, 1000)
            })
        }
    };
    var editDlg = new Dialog("#permission-view-gridDialog", options);
    editDlg.show();
}

//选中并展开节点
function selectAndExpandNode(treeObj, id, flag) {
    var node = treeObj.getNodeByParam("id", id, null);
    treeObj.selectNode(node);
    if (flag) {
        treeObj.expandNode(node, true, true);
    }
}
