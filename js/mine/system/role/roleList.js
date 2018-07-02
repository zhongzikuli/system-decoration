$(document).ready(function () {

    // 新增、修改角色账号检验
    function checkRoleName() {
        var roleName = $.trim($("input[name='name']").val());
        if (roleName === '') {
            return;
        }
        HQdecorate.post(ctx + "/role/checkName.action", {roleName: roleName}, function (res) {
            if (res.error == 1) {
            } else if (res.error == -100) {
                HQdecorate.faildMsg("会话超时，请重新登陆！", 1000);
            } else {
                HQdecorate.faildMsg(res.message);
                $("input[name='name']").addClass("validation-error");
            }
        }, function (res) {
            HQdecorate.faildMsg(res.responseText, 1000)
        })
    }
})

// 删除角色
function deleteRole() {
    var ck = $("input[name='roleList_input']:checked");
    var ids;
    var flag1 = false;
    var flag2 = false;
    if (ck.length == 0) {
        HQdecorate.alertDialog("请选择记录！");
        return
    } else {
        var idArr = new Array();
        ck.each(function () {
            if ($(this).attr("level") == 1) {
                flag1 = true;
            }
            if ($(this).attr("level") == 2) {
                flag2 = true;
            }
            idArr.push($(this).attr("value"));
        });
        ids = idArr.join(",");

    }
    if (flag1) {
        HQdecorate.alertDialog("超级管理员角色不能删除！");
        return
    }
    if (flag2) {
        HQdecorate.alertDialog("默认客户角色不能删除！");
        return
    }

    var options = {
        width: 310,
        top: 200,
        height: 160,
        overlay: true,
        dispose: true,
        move: true,
        title: '提示',
        url: '',
        callback: function () {
            deleteRequest(ids);
        }
    };
    var editDlg = new Dialog("#deleteRole-dialog", options);

    HQdecorate.post(ctx + "/role/isUsed.action", {ids: ids}, function (data) {
        if (data.error == 1) {
            var number = data.rows;
            if (number == 1) {
                HQdecorate.confirmDialog("所选角色中有被用户分配的角色，确定删除？", true, {}, function () {
                    deleteRequest(ids);
                });
            } else {
                editDlg.show();
            }
        } else if (data.error == -100) {
            HQdecorate.faildMsg("会话超时，请重新登陆！");
        } else {
            HQdecorate.faildMsg(data.message);
        }
    }, function (res) {
        HQdecorate.faildMsg(res.responseText, 1000)
    })
}

//删除请求
function deleteRequest(ids) {
    HQdecorate.post(ctx + "/role/delete.action", {ids: ids}, function (data) {
        if (data.error == 1) {
            HQdecorate.successMsg("删除成功！", 1000, function () {
                refresh();
            });
        } else if (data.error == -100) {
            HQdecorate.faildMsg("会话超时，请重新登陆！");
        } else {
            HQdecorate.faildMsg(data.message);
        }
    }, function (res) {
        HQdecorate.faildMsg(res.responseText, 1000)
    })
}

//查看角色
function viewRole(id) {
    var setting = {
        check: {
            enable: true
        },
        data: {
            simpleData: {
                enable: true,
                idKey: "id"
            },
            key: {
                url: "xxxxxx" // 设置xxxxxx为url路径 即不跳转
            }
        }
    };
    var zNodes;

    HQdecorate.post(ctx + "/permission/queryMenuPermission.action", null, function (data) {
        if (data.error == 1) {
            $(document).ready(function () {
                zNodes = data.rows;
                $.fn.zTree.init($("#view-role-permission-tree"), setting, zNodes);
                checkNode(id);
            });
        } else if (data.error == -100) {
            HQdecorate.faildMsg("会话超时，请重新登陆！");
        } else {
            HQdecorate.faildMsg(data.message);
        }
    }, function (res) {
        HQdecorate.faildMsg(res.responseText, 1000)
    })


    var options = {
        width: 400,
        top: 200,
        height: 390,
        overlay: true,
        dispose: true,
        move: true,
        title: '查看',
        url: '',
        callback: function () {

        }
    };
    var editDlg = new Dialog("#viewRole-dialog", options);
    editDlg.show();
}

// 匹配节点
function checkNode(id) {
    var treeObj = $.fn.zTree.getZTreeObj("view-role-permission-tree");
    var nodes = treeObj.transformToArray(treeObj.getNodes());

    HQdecorate.post(ctx + "/rolePermission/list.action", {id: id}, function (data) {
        if (data.error == 1) {
            var pers = data.rows;
            for (var i = 0; i < pers.length; i++) {
                for (var j = 0; j < nodes.length; j++) {
                    if (pers[i].permissionId == nodes[j].id) {
                        treeObj.checkNode(nodes[j], true, false, false);
                        treeObj.expandNode(nodes[j], true, true, false, false);
                        break;
                    }
                }
            }
        } else if (data.error == -100) {
            HQdecorate.faildMsg("会话超时，请重新登陆！");
        } else {
            HQdecorate.faildMsg(data.message);
        }
    }, function (res) {
        HQdecorate.faildMsg(res.responseText, 1000)
    })
}

// 新增角色
function createRole() {
    var options = {
        width: 400,
        top: 200,
        height: 210,
        overlay: true,
        dispose: true,
        move: true,
        title: '新增',
        url: '',
        callback: function () {
            var flag = false;
            if ($("#createRoleForm").valid("createRoleForm")) {
                HQdecorate.post(ctx + "/role/create.action", {
                    name: $("#create-role-name").val(),
                    bak: $("#create-role-bak").val()
                }, function (data) {
                    if (data.error == 1) {
                        HQdecorate.successMsg("新增成功！", 1000, function () {
                            window.location.href = ctx + "/role/query.action";
                        });
                    } else if (data.error == -100) {
                        HQdecorate.faildMsg("会话超时，请重新登陆！");
                    } else {
                        HQdecorate.faildMsg(data.message);
                    }
                }, function (res) {
                    HQdecorate.faildMsg(res.responseText, 1000)
                }, false)
                if (flag) {
                    return false;
                }
            } else {
                return false;
            }
        }
    };

    var creatDlg = new Dialog("#createRole-dialog", options);
    creatDlg.show();
}

//绑定权限
function assignRolePermission(id) {
    var setting = {
        check: {
            enable: true
        },
        data: {
            simpleData: {
                enable: true,
                idKey: "id"
            },
            key: {
                url: "xxxxxx" // 设置xxxxxx为url路径 即不跳转
            }
        }
    };
    var zNodes;

    HQdecorate.post(ctx + "/permission/queryMenuPermission.action", null, function (data) {
        if (data.error == 1) {
            $(document).ready(function () {
                zNodes = data.rows;
                $.fn.zTree.init($("#assign-role-permission-tree"), setting, zNodes);
                $.fn.zTree.getZTreeObj("assign-role-permission-tree").expandAll(true);
                updateCheckNode(id);
            });
        } else if (data.error == -100) {
            HQdecorate.faildMsg("会话超时，请重新登陆！");
        } else {
            HQdecorate.faildMsg(data.message);
        }
    }, function (res) {
        HQdecorate.faildMsg(res.responseText, 1000)
    })

    var options = {
        width: 450,
        top: 200,
        height: 410,
        overlay: true,
        dispose: true,
        move: true,
        title: '绑定权限',
        url: '',
        callback: function () {
            var nodes = $.fn.zTree.getZTreeObj("assign-role-permission-tree").getCheckedNodes(true);
            var ids = "";
            for (var i = 0; i < nodes.length; i++) {
                ids = ids + nodes[i].id + ",";
            }

            HQdecorate.post(ctx + "/role/updatePermission.action", {id: id, ids: ids}, function (data) {
                if (data.error == 1) {
                    HQdecorate.successMsg("绑定权限成功！", 1000, function () {
                        refresh();
                    });
                } else if (data.error == -100) {
                    HQdecorate.faildMsg("会话超时，请重新登陆！");
                } else {
                    HQdecorate.faildMsg(data.message);
                }
            }, function (res) {
                HQdecorate.faildMsg(res.responseText, 1000)
            })

        }
    };

    var editDlg = new Dialog("#assignPermission-dialog", options);
    editDlg.show();
}

//app权限
function assignRoleAppPermission(id) {
    var setting = {
        check: {
            enable: true
        },
        data: {
            simpleData: {
                enable: true,
                idKey: "id"
            },
            key: {
                url: "xxxxxx" // 设置xxxxxx为url路径 即不跳转
            }
        }
    };
    var zNodes;


    HQdecorate.post(ctx + "/appMenu/queryMenuPermission.action", {roleId: id}, function (data) {
        if (data.error == 1) {
            $(document).ready(function () {
                zNodes = data.rows;
                $.fn.zTree.init($("#assign-role-permission-tree"), setting, zNodes);
                $.fn.zTree.getZTreeObj("assign-role-permission-tree").expandAll(true);
                updateCheckNode(id);
            });
        } else if (data.error == -100) {
            HQdecorate.faildMsg("会话超时，请重新登陆！");
        } else {
            HQdecorate.faildMsg(data.message);
        }
    }, function (res) {
        HQdecorate.faildMsg(res.responseText, 1000)
    })

    var options = {
        width: 450,
        top: 200,
        height: 410,
        overlay: true,
        dispose: true,
        move: true,
        title: 'App菜单分配',
        onBeforeShow: function () {
            $("#permissionAssign").find(".control-label").html("绑定菜单");
        },
        callback: function () {
            var nodes = $.fn.zTree.getZTreeObj("assign-role-permission-tree").getCheckedNodes(true);
            var ids = "";
            for (var i = 0; i < nodes.length; i++) {
                ids = ids + nodes[i].id + ",";
            }

            HQdecorate.post(ctx + "/appMenu/updatePermission.action", {roleId: id, ids: ids}, function (data) {
                if (data.error == 1) {
                    console.log(data)
                    HQdecorate.successMsg("绑定权限成功！", 1000, function () {
                        refresh();
                    });
                } else if (data.error == -100) {
                    HQdecorate.faildMsg("会话超时，请重新登陆！");
                } else {
                    HQdecorate.faildMsg(data.message);
                }
            }, function (res) {
                HQdecorate.faildMsg(res.responseText, 1000)
            })
        }
    };

    var editDlg = new Dialog("#assignPermission-dialog", options);
    editDlg.show();
}

// 修改角色
function updateRole(self, id, name, level) {
    var bak = $(self).attr('data-bak');
    var options = {
        width: 400,
        top: 200,
        height: 210,
        overlay: true,
        dispose: true,
        move: true,
        title: '修改',
        url: '',
        callback: function () {
            if ($("#updateRoleForm").valid("updateRoleForm")) {
                HQdecorate.post(ctx + "/role/update.action", {
                        id: id,
                        name: $("#update-role-name").val(),
                        bak: $("#update-role-bak").val(),
                        level: level
                    },
                    function (data) {
                        if (data.error == 1) {
                            HQdecorate.successMsg("修改成功！", 1000, function () {
                                refresh();
                            });
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
        }
    };

    var editDlg = new Dialog("#updateRole-dialog", options);
    $("#update-role-name").val(name);
    $("#update-role-name").attr("param", "id=" + id);
    $("#update-role-bak").val(bak);
    editDlg.show();
}

// 匹配节点
function updateCheckNode(id) {
    var treeObj = $.fn.zTree.getZTreeObj("assign-role-permission-tree");
    var nodes = treeObj.transformToArray(treeObj.getNodes());


    HQdecorate.post(ctx + "/rolePermission/list.action", {id: id}, function (data) {
        if (data.error == 1) {
            var pers = data.rows;
            for (var i = 0; i < pers.length; i++) {
                for (var j = 0; j < nodes.length; j++) {
                    if (pers[i].permissionId == nodes[j].id) {
                        treeObj.checkNode(nodes[j], true, false, false);
                        break;
                    }
                }
            }
        } else if (data.error == -100) {
            HQdecorate.faildMsg("会话超时，请重新登陆！");
        } else {
            HQdecorate.faildMsg(data.message);
        }
    }, function (res) {
        HQdecorate.faildMsg(res.responseText, 1000)
    })
}

//（删除、更新、重置密码、角色分配后）刷新页面
function refresh() {
    var name = escape($.trim($("#search-role-name").val()));
    window.location.href = ctx + "/role/query.action?name=" + name;
}

function validateRoleName(self) {
    var name = $(self).val();
    if (!notEmpty(name)) {
        $(self).attr("tip", "请输入角色名称");
        return "faild";
    } else {
        if (!ChineseAndEnglish(name)) {
            $(self).attr("tip", "只能输入中文和英文字母 ");
            return "faild";
        } else {
            if (!limitLength(name)) {
                $(self).attr("tip", "长度不能超过50个字符");
                return "faild";
            } else {
                return "success";
            }
        }
    }
}

function validateRoleBak(self) {
    var bak = $(self).val();
    if (!bakLimitLength(bak)) {
        $(self).attr("tip", "长度不能超过50个字符 ");
        return "faild";
    } else {
        return "success";
    }
}

// 输入项验证
function notEmpty(value) {
    if (null == value || value == "") {
        return false;
    } else {
        return true;
    }
}

function ChineseAndEnglish(value) {
    var re = new RegExp("^[\u4e00-\u9fa5a-zA-Z]+$");
    return re.test(value);
}

function limitLength(value) {
    var re = new RegExp("^[\u4e00-\u9fa5a-zA-Z]{0,50}$");
    return re.test(value);
}

function bakLimitLength(value) {
    return value.length <= 50;
}