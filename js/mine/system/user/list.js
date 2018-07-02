$(function () {

    $(".chosen-select").chosen({
        disable_search_threshold: 8,
        no_results_text: "没有找到",
        allow_single_deselect: true,
        width: "160px"
    });
    //新增
    $(".add-btn").on("click", function () {
        createUser();
    });

    //重置密码
    $(".reset-btn").on("click", function () {
        resetUserPassword();
    });

    //删除
    $(".delete-btn").on("click", function () {
        deleteUser();
    });
    //详情
    $(".detail").on("click", function () {
        var id = $(this).data("id");
        detailUser(id);
    });
    //编辑
    $(".edit-btn").on("click", function () {
        var id = $(this).data("id");
        editUser(id);
    });
    //角色分配
    $(".role-btn").on("click", function () {
        var id = $(this).data("id");
        roleUser(id);
    });

    var config = {
        disable_search_threshold: 10,
        no_results_text: '无数据',
        width: "100%"
    };

    //启用
    $(".enable-btn").on("click", function () {
        var id = $(this).data("id");
        HQdecorate.post(
            ctx + "/user/enable.action",
            {id: id},
            function (res) {
                if (res.error == 1) {
                    HQdecorate.successMsg("用户启用成功", 1000, function () {
                        refresh();
                    })
                } else if (res.error == -100) {
                    HQdecorate.faildMsg("请求超时", 1000)
                }
            },
            function (res) {
                HQdecorate.faildMsg(res.responseText, 1000)
            }
        );
    });

    //禁用
    $(".disable-btn").on("click", function () {
        var ck = $("input[name='userList_input']:checked");
        if (ck.length == 0) {
            HQdecorate.alertDialog("请选择要禁用的用户");
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
                HQdecorate.alertDialog("所选信息包含无效账户，不允许删除");
                return false;
            }
            HQdecorate.confirmDialog("确认禁用选中的用户吗？", true, {}, function () {
                var params = {};
                params.idArr = idArr.toString();
                HQdecorate.post(
                    ctx + "/user/disable.action",
                    params,
                    function (res) {
                        if (res.error == 1) {
                            HQdecorate.successMsg("用户禁用成功", 1000, function () {
                                refresh();
                            })
                        } else if (res.error == -100) {
                            HQdecorate.faildMsg("请求超时", 1000)
                        }
                    },
                    function (res) {
                        HQdecorate.faildMsg(res.responseText, 1000)
                    }
                );
            });
        }
    });

    $('body').on('click', '.add-all', function () {
        $('#rightValue').append($('#leftValue').html());
        $('#leftValue').html('');
    });
    $('body').on('click', '.remove-all', function () {
        $('#leftValue').append($('#rightValue').html());
        $('#rightValue').html('');
    });
    $('body').on('click', '.add-one', function () {
        var lvSelected = $('#leftValue option:selected');
        if (lvSelected.length > 0) {
            lvSelected.each(function () {
                $('#rightValue').append($(this).prop('outerHTML'));
                $(this).remove();
            });
        }
    });
    $('body').on('click', '.remove-one', function () {
        var lvSelected = $('#rightValue option:selected');
        if (lvSelected.length > 0) {
            lvSelected.each(function () {
                $('#leftValue').append($(this).prop('outerHTML'));
                $(this).remove();
            });
        }
    });

    // 新增、修改登录账号检验
    function checkLoginName() {
        var loginName = $.trim($("input[name='loginName']").val());
        var userId = $("input[name='userId']").val();
        if (loginName === '') {
            return;
        }
        HQdecorate.post(
            ctx + "/user/checkLoginName.action",
            {id: userId, loginName: loginName},
            function (res) {
                if (res.error == 1) {
                    HQdecorate.successMsg("用户未重名，可被添加", 1000, function () {

                    })
                } else if (res.error == -100) {
                    HQdecorate.faildMsg("请求超时", 1000)
                } else {
                    HQdecorate.faildMsg(res.message, 1000);
                    $("input[name='loginName']").addClass("validation-error");
                }
            },
            function (res) {
                HQdecorate.faildMsg(res.responseText, 1000)
            }
        );
    }


    //用户新增
    function createUser() {
        var options = {
            width: 740,
            top: 200,
            height: $("#currentOrgType").val() == 2 ? 250 : 310,
            overlay: true,
            dispose: true,
            move: true,
            title: '新增',
            url: "",
            onBeforeShow: function () {
                $("#reset").trigger('click');
                $("#user-loginName").val('');
            },
            onAfterShow: function () {
                if ($("#joinedDate").length > 0) {
                    $("#joinedDate").on("click", function () {
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
                }
                if ($("#departmentManagerBeginDate").length > 0) {
                    $("#departmentManagerBeginDate").on("click", function () {
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
                }

                //下拉框
                $(".user-add-level").chosen(config).on('change', function (e, selected) {
                    if ("" != selected) {
                        change_error_style($(".user-add-level").parent(), "remove");
                    } else {
                        change_error_style($(".user-add-level").parent(), "add");
                    }
                });
                if ($(".area-chosen-select").length > 0) {
                    $(".area-chosen-select").chosen(config).on('change', function (e, selected) {
                        if ("" != selected) {
                            change_error_style($(".area-chosen-select").parent(), "remove");
                        } else {
                            change_error_style($(".area-chosen-select").parent(), "add");
                        }
                    });
                }
                if ($(".i-checks").length > 0) {
                    $(".i-checks").iCheck({checkboxClass: "icheckbox_square-green"});
                }
            },
            callback: function () {
                var flag = false;
                if ($("#userCreateForm").valid("userCreateForm")) {
                    var dateString = new Date().getTime();
                    var param = null;
                    //根据当前用户所在单位类型获取新增用户值
                    var isSpecial = [];
                    $('input[name="isSpecial"]:checked').each(function () {
                        isSpecial.push($(this).val());
                    });
                    var $isSpecial = $.trim(JSON.stringify(isSpecial).replace(/\[/g, ""));

                    var joinedDate = $("#joinedDate").val();
                    var departmentManagerBeginDate = $("#departmentManagerBeginDate").val();
                    if ($("#currentOrgType").val() == 2) {
                        param = {
                            loginName: $("#user-loginName").val(),
                            password: $("#user-password").val(),
                            userName: $("#user-realName").val(),
                            salt: dateString,
                            tel: $("#user-tel").val(),
                            userLevel: $("#user-add-level").val(),
                            departmentIds: $(".department_ids").val(),
                            isOpenYX: 0
                        };
                    } else {
                        param = {
                            loginName: $("#user-loginName").val(),
                            userName: $("#user-realName").val(),
                            password: $("#user-password").val(),
                            salt: dateString,
                            tel: $("#user-tel").val(),
                            userLevel: $("#user-add-level").val(),
                            areaId: $("#user-areaId").val(),
                            departmentIds: $(".department_ids").val(),
                            isSpecial: $isSpecial,
                            joinedDateStr: joinedDate,
                            departmentManagerBeginDateStr: departmentManagerBeginDate,
                            isOpenYX: 0
                        };
                    }
                    HQdecorate.post(
                        ctx + "/user/create.action",
                        param,
                        function (res) {

                            flag = false;
                            if (res.error == 1) {
                                HQdecorate.successMsg("添加用户成功", 1000, function () {
                                    window.location.href = ctx + "/user/query.action";
                                })
                            } else if (res.error == -100) {
                                flag = true;
                                HQdecorate.faildMsg("请求超时", 1000);
                            } else {
                                flag = true;
                                HQdecorate.faildMsg(data.message, 1000);
                            }
                        },
                        function (res) {
                            HQdecorate.faildMsg(res.responseText, 1000);
                        }, false
                    );
                    if (flag) {
                        return false;
                    }
                } else {
                    return false;
                }
            },
            onAfterHide: function () {
                $("#v-tip").hide();
                $("body").find("#laydate_box").hide();
            }
        };
        var createDlg = new Dialog("#userCreate-dialog", options);
        createDlg.show();
    }

    /**
     * 重置密码
     * @returns {boolean}
     */
    function resetUserPassword() {
        var ck = $("input[name='userList_input']:checked");
        if (ck.length == 0) {
            HQdecorate.alertDialog("请选择要重置密码的用户。");
            return false;
        } else if (ck.length > 1) {
            HQdecorate.alertDialog("对不起，只能对单个用户进行重置。");
            return false;
        }
        var options = {
            width: 400,
            top: 200,
            height: 150,
            overlay: true,
            dispose: true,
            move: true,
            title: '重置密码',
            url: "",
            callback: function () {
                var flag = false;
                var userIsvalid = true;
                //盐
                var dateString = new Date().getTime();
                var idArr = new Array();
                $(ck).each(function () {
                    idArr.push($(this).val());
                    if ($(this).attr("isvalid") == "0") {
                        userIsvalid = false;
                    }
                });
                if (!userIsvalid) {
                    alertDialog("所选信息包含无效账户，不允许重置密码");
                    return false;
                }
                var password = $("#rest-user-password").val();
                if (password == '') {
                    alertDialog("密码不能为空");
                    return false;
                }
                HQdecorate.confirmDialog("确认重置选中的用户吗？", true, {}, function () {
                    var params = {};
                    params.idArr = idArr.toString();
                    params.salt = dateString;
                    params.password = password;

                    HQdecorate.post(
                        ctx + "/user/resetPwd.action",
                        params,
                        function (res) {
                            if (res.error == 1) {
                                HQdecorate.successMsg("重置密码成功", 1000, function () {
                                    refresh();
                                })
                            } else if (res.error == -100) {
                                flag = true;
                                HQdecorate.faildMsg("请求超时", 1000);
                            } else {
                                flag = true;
                                HQdecorate.faildMsg(data.message, 1000);
                            }
                        },
                        function (res) {
                            HQdecorate.faildMsg(res.responseText, 1000);
                        },false);
                });

                if (flag) {
                    return false;
                }
            }
        };
        var resetPwdDlg = new Dialog("#resetPassword-dialog", options);
        resetPwdDlg.show();
    }

    //删除用户
    function deleteUser() {
        var ck = $("input[name='userList_input']:checked");
        if (ck.length == 0) {
            HQdecorate.alertDialog("请选择要删除的用户。");
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
                HQdecorate.alertDialog("所选信息包含无效账户，不允许删除");
                return false;
            }
            HQdecorate.confirmDialog("确认删除选中的用户吗？", true, {}, function () {
                var params = {
                    idArr: idArr.toString()
                };

                HQdecorate.post(
                    ctx + "/user/delete.action",
                    params,
                    function (res) {
                        if (res.error == 1) {
                            HQdecorate.successMsg("用户删除成功", 1000, function () {
                                refresh();
                            })
                        } else if (res.error == -100) {
                            HQdecorate.faildMsg("请求超时", 1000);
                        } else {
                            HQdecorate.faildMsg(data.message, 1000);
                        }
                    },
                    function (res) {
                        HQdecorate.faildMsg(res.responseText, 1000);
                    }
                );
            });
        }
    }


    //查看用户
    function detailUser(id) {
        var options = {
            width: 740,
            top: 200,
            height: 250,
            overlay: true,
            dispose: true,
            move: true,
            title: '查看用户',
            url: "",
            onBeforeShow: function () {
                HQdecorate.post(
                    ctx + "/user/detail.action",
                    {id: id},
                    function (data) {
                        if (data.error == 1) {
                            var user = data.rows;
                            $(".user-view-loginName").val(user.loginName);
                            $(".user-view-realName").val(user.userName);
                            $(".user-view-tel").val(user.tel);
                            $(".user-view-password").val(user.password);
                            $(".user-view-level").val(user.userLevelName);
                            $(".user-view-areaId").val(user.areaName);
                            $(".user-view-department").val(user.departmentName);
                            $(".user-view-balance").val(user.balance);
                            $("#user-view-select-money-unit").val(user.cfMoneyUnit);
                            var text = $("#user-view-select-money-unit").find("option:selected").text();
                            $(".user-view-money-unit").val(text);
                        } else if (data.error == -100) {
                            HQdecorate.faildMsg("请求超时", 1000)
                        }
                    },
                    function (res) {
                        HQdecorate.faildMsg(res.responseText, 1000)
                    }
                );
            }
        };
        var detailDlg = new Dialog("#userView-dialog", options);
        detailDlg.show();
    }

    function getUserInfo(id) {
        HQdecorate.post(
            ctx + "/user/preLoad.action",
            {id: id},
            function (data) {
                if (data.error == 1) {
                    var user = data.rows;
                    $("#user-edit-id").val(user.id);
                    $("#user-edit-loginName").val(user.loginName);
                    $("#user-edit-loginName").attr("param", "id=" + user.id)
                    $("#user-edit-realName").val(user.userName);
                    $("#user-edit-password").val(user.password);
                    $("#user-edit-tel").val(user.tel);
                    $("#user-edit-level").val(user.userLevel);
                    if (user.areaId != '' && user.areaId != undefined) {
                        $("#user-edit-areaId").val(user.areaId);
                    }
                    $("#user-department").val(user.orgName);
                    $(".department_ids").val(user.departmentIds);

                    $("#joinedDate").val(user.joinedDateStr);
                    $("#departmentManagerBeginDate").val(user.departmentManagerBeginDateStr);
                    if (user.isSpecial != '' && user.isSpecial != null) {
                        if (user.isSpecial.indexOf("N") >= 0) {
                            $("#user-edit-office").val('N');
                            $("#user-edit-office").attr("checked", "true");
                        }
                        if (user.isSpecial.indexOf("H") >= 0) {
                            $("#user-edit-contract").val('H');
                            $("#user-edit-contract").attr("checked", "true");
                        }
                        if (user.isSpecial.indexOf("Z") >= 0) {
                            $("#user-edit-complex").val('Z');
                            $("#user-edit-complex").attr("checked", "true");
                        }
                        if (user.isSpecial.indexOf("M") >= 0) {
                            $("#user-edit-area-manager").val('M');
                            $("#user-edit-area-manager").attr("checked", "true");
                        }
                    }
                } else if (data.error == -100) {
                    HQdecorate.faildMsg("请求超时", 1000)
                }
                //显示下拉框
                $(".user-edit-level").chosen(config).on('change', function (e, selected) {
                    if ("" != selected) {
                        change_error_style($(".user-edit-level").parent(), "remove");
                    } else {
                        change_error_style($(".user-edit-level").parent(), "add");
                    }
                });
                if ($("#currentOrgType").val() != 2) {
                    $(".area-chosen-select").chosen(config).on('change', function (e, selected) {
                        if ("" != selected) {
                            change_error_style($(".area-chosen-select").parent(), "remove");
                        } else {
                            change_error_style($(".area-chosen-select").parent(), "add");
                        }
                    });
                }
                $(".i-checks").iCheck({checkboxClass: "icheckbox_square-green"});
            },
            function (res) {
                HQdecorate.faildMsg(res.responseText, 1000)
            }
        );
    }

    //用户修改
    function editUser(id) {
        var options = {
            width: 740,
            top: 200,
            height: $("#currentOrgType").val() == 2 ? 250 : 310,
            overlay: true,
            dispose: true,
            move: true,
            title: '编辑',
            url: "",
            onBeforeShow: function () {
                getUserInfo(id);
                if ($("#joinedDate").length > 0) {
                    $("#joinedDate").on("click", function () {
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
                }
                if ($("#departmentManagerBeginDate").length > 0) {
                    $("#departmentManagerBeginDate").on("click", function () {
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
                }
            },
            callback: function () {
                if ($("#userEditForm").valid("userEditForm")) {
                    var param = null;
                    var isSpecial = [];
                    $('input[name="isSpecial"]:checked').each(function () {
                        isSpecial.push($(this).val());
                    });
                    var $isSpecial = $.trim(JSON.stringify(isSpecial).replace(/\[/g, ""));
                    var $isSpecial = $.trim($isSpecial.replace(/\]/g, ""));
                    var $isSpecial = $.trim($isSpecial.replace(/\"/g, ""));

                    var joinedDate = $("#joinedDate").val();
                    var departmentManagerBeginDate = $("#departmentManagerBeginDate").val();
                    if ($("#currentOrgType").val() == 2) {
                        param = {
                            userId: id,
                            loginName: $("#user-edit-loginName").val(),
                            userName: $("#user-edit-realName").val(),
                            departmentIds: $(".department_ids").val(),
                            tel: $("#user-edit-tel").val(),
                            userLevel: $("#user-edit-level").val()
                        };
                    } else {
                        param = {
                            userId: id,
                            loginName: $("#user-edit-loginName").val(),
                            userName: $("#user-edit-realName").val(),
                            departmentIds: $(".department_ids").val(),
                            tel: $("#user-edit-tel").val(),
                            userLevel: $("#user-edit-level").val(),
                            areaId: $("#user-edit-areaId").val(),
                            isOpenYX: $(".isOpenYX").is(':checked') ? 1 : 0,
                            joinedDateStr: joinedDate,
                            departmentManagerBeginDateStr: departmentManagerBeginDate,
                            isSpecial: $isSpecial
                        };
                    }
                    HQdecorate.post(
                        ctx + "/user/update.action",
                        param,
                        function (data) {
                            if (data.error == 1) {
                                HQdecorate.successMsg("用户信息修改成功！", 1000, function () {
                                    refresh();
                                });
                            } else if (data.error == -100) {
                                HQdecorate.faildMsg("请求超时", 1000)
                            }
                        },
                        function (res) {
                            HQdecorate.faildMsg(res.responseText, 1000)
                        }
                    );
                } else {
                    return false;
                }
            },
            onAfterHide: function () {
                $("#v-tip").hide();
                $("body").find("#laydate_box").hide();
            }
        };
        var editDlg = new Dialog("#userEdit-dialog", options);
        $(".i-checks").iCheck({checkboxClass: "icheckbox_square-green"});
        editDlg.show();
    }

    //（删除、更新、重置密码、角色分配后）刷新页面
    function refresh() {
        var searchLoginName = escape($.trim($("#search-login-name").val()));
        var searchUserTel = $.trim($("#search-user-tel").val());
        window.location.href = ctx + "/user/query.action?searchUserTel=" + searchUserTel + "&searchLoginName=" + searchLoginName;
    }

    //用户角色分配
    function roleUser(userId) {
        if (userId == '') {
            return false;
        }
        HQdecorate.post(
            ctx + "/user/queryRole.action",
            {userId: userId},
            function (data) {
                if (data.error == 1) {
                    var options = {
                        width: 600,
                        top: 200,
                        height: 340,
                        overlay: true,
                        dispose: true,
                        move: true,
                        title: '角色分配',
                        url: "",
                        callback: function () {
                            var roleIds = [];
                            var options = $('#rightValue option');

                            if (options.length > 0) {
                                options.each(function () {
                                    roleIds.push(this.value);
                                });
                            }
                            var param = {};
                            param.userId = userId;
                            param.roleIds = roleIds.join(",");
                            HQdecorate.post(
                                ctx + "/user/saveRole.action",
                                param,
                                function (res) {
                                    if (res.error == 1) {
                                        HQdecorate.successMsg("角色分配成功！", 1000, function () {
                                            refresh();
                                        });
                                    } else if (res.error == -100) {
                                        HQdecorate.faildMsg("请求超时", 1000)
                                    }
                                },
                                function (res) {
                                    HQdecorate.faildMsg(res.responseText, 1000)
                                }
                            );
                        }
                    };
                    var editDlg = new Dialog("#fp-dialog", options);
                    editDlg.show();
                    var assigneds = data.rows.assigneds;
                    var unAssigneds = data.rows.unAssigneds;
                    var html1 = '';
                    $.each(assigneds, function (i, v) {
                        html1 += "<option title='" + v.roleDescription + "' value='" + v.roleId + "'>" + v.roleName + "</option>";
                    });
                    $("#rightValue").html(html1);
                    var html2 = '';
                    $.each(unAssigneds, function (i, v) {
                        html2 += "<option title='" + v.roleDescription + "' value='" + v.roleId + "'>" + v.roleName + "</option>";
                    });
                    $("#leftValue").html(html2);
                } else if (data.error == -100) {
                    HQdecorate.faildMsg("请求超时", 1000)
                }
            },
            function (res) {
                HQdecorate.faildMsg(res.responseText, 1000)
            }
        );
    }


    //激活用户
    function enableUser(userId) {
        if (userId == '') {
            return false;
        }
        HQdecorate.confirmDialog("确认激活选中的用户吗？", true, {}, function () {
            var params = {};
            params.userId = userId;
            params.isvalid = 1;
            HQdecorate.post(
                ctx + "/user/update.action",
                params,
                function (res) {
                    if (res.error == 1) {
                        HQdecorate.successMsg("用户激活成功", 1000, function () {
                            refresh()
                        })
                    } else if (res.error == -100) {
                        HQdecorate.faildMsg("请求超时", 1000)
                    }
                },
                function (res) {
                    HQdecorate.faildMsg(res.responseText, 1000)
                }
            );
        })
    }
});

/**
 * 用户表单验证
 */
function validUserForm(lableId) {
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $(lableId).val() == "") {
            if ($(lableId).attr("id") == "user-password") {
                $(lableId).attr('tip', '密码为空，请重新输入。');
                return "faild";
            } else if ($(lableId).attr("id") == "user-realName"
                || $(lableId).attr("id") == "user-edit-realName") {
                $(lableId).attr('tip', '真实姓名为空，请重新输入。');
                return "faild";
            } else if ($(lableId).attr("id") == "user-add-level"
                || $(lableId).attr("id") == "user-edit-level") {
                $(lableId).parent().attr('tip', '权限等级不能为空，请重新输入。').addClass("validation-error");
                return "faild";
            } else if ($(lableId).attr("id") == "user-areaId"
                || $(lableId).attr("id") == "user-edit-areaId") {
                $(lableId).parent().attr('tip', '区域不能为空，请重新输入。').addClass("validation-error");
                return "faild";
            } else if ($(lableId).attr("id") == "user-department") {
                $(lableId).attr('tip', '所属部门不能为空，请重新输入。');
                return "faild";
            }
            return "success";
        }
        if ($(lableId).val() != null && $(lableId).val() != "") {
            var _this = $(lableId);
            if ($(lableId).attr("id") == "user-realName" ||
                $(lableId).attr("id") == "user-edit-realName") {
                if (!(/^.{1,10}$/).exec(_this.val())) {
                    $(lableId).attr('tip', '姓名长度不超过10个字符。');
                    return "faild";
                } else {
                    return "success";
                }
            }
            if ($(lableId).attr("id") == "user-password") {
                if (!(/^[A-Za-z0-9]+$/).exec(_this.val())) {
                    $(lableId).attr('tip', '密码只支持为英文、数字。');
                    return "faild";
                } else {
                    if (!(/^.{1,16}$/).exec(_this.val())) {
                        $(lableId).attr('tip', '密码长度不超过16个字符。');
                        return "faild";
                    } else {
                        return "success";
                    }
                }
            }
            return "success";
        }
        return "success";
    }
}

var setting = {
    check: {
        enable: true,
        chkboxType: {"Y": "", "N": ""}
    },
    view: {
        dblClickExpand: false
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    callback: {
        beforeClick: beforeClick,
        onCheck: onCheck
    }
};

function beforeClick(e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("departmentTree");
    zTree.checkNode(treeNode, !treeNode.checked, null, true);
    return false;
}

function onCheck(e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("departmentTree"),
        nodes = zTree.getCheckedNodes(true),
        v = "";
    ids = "";

    if (zTree.getNodes()[0].children.length == 0) {
        faildMsg("请先创建部门");
        return;
    }

    if (zTree.getNodes().length > 0 && nodes.length == 0) {
        $("#user-department").val(v);
        $(".department_ids").val(ids);
        $("#" + treeId).parent().prev().addClass("validation-error");
        //faildMsg("请选中复选框");
        return;
    }
    for (var i = 0, l = nodes.length; i < l; i++) {
        v += nodes[i].name + ",";
        ids += nodes[i].id + ",";
    }
    if (v.length > 0) {
        v = v.substring(0, v.length - 1);
        ids = ids.substring(0, ids.length - 1);
    }
    $("#" + treeId).parent().prev().removeClass("validation-error");
    $("#user-department").val(v);
    $(".department_ids").val(ids);
}

var zTree

function showDepartmentMenu(width, form) {
    $("#menuContent").css({
        "background": "rgb(255,255,255)",
        "overflow": "auto",
        "z-index": 999,
        "top": "40px",
        "width": width + "px"
    }).slideDown("fast");
    $("body").bind("mousedown", onBodyDown);
    $.ajax({
        url: ctx + "/department/departmentTree.action",
        data: {ids: $(".department_ids").val(), forbidden: 0},
        dataType: "json",
        success: function (result) {
            /*如果没有部门，添加提示去创建部门*/
            if (result.error == 1 && result.rows[0].children.length > 0) {
                var zNodes = result.rows;
                $.fn.zTree.init($("#departmentTree"), setting, zNodes);
                zTree = $.fn.zTree.getZTreeObj("departmentTree");
                zTree.expandAll(true);
            } else {
                $("#user-department").attr('tip', "请先创建部门");
                $("#" + form).valid(form);
            }
        }
    });
}

function hideMenu() {
    $("#menuContent").fadeOut("fast");
    $("body").unbind("mousedown", onBodyDown);
}

function onBodyDown(event) {
    if (!(event.target.id == "user-department" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length > 0)) {
        hideMenu();
    }
}

//导出excel
function exportExcel() {
    var frame = $('<iframe>');//定义一个iframe
    frame.attr("src", ctx + "/user/exportList.action");
    frame.attr("style", "display:none");
    frame.append("</iframe>")
    $("body").append(frame);
}

//导入excel
function importExcel() {
    var options = {
        width: 400,
        top: 200,
        height: 400,
        overlay: true,
        dispose: true,
        move: true,
        title: '导入用户',
        onAfterShow: function () {
            new HYUpload({
                auto: true,
                containerId: '#addUploader',
                uploadImg: false,						//图片上传标记
                dropTip: '',
                buttonText: '选择文件',
                server: ctx + '/user/importExcel.action'
            });
        },
        callback: function () {
            window.location.reload();
        }
    };

    new Dialog("#excel-dialog", options).show();
}

//导入人事excel
function importAllUserExcel() {
    var options = {
        width: 400,
        top: 200,
        height: 400,
        overlay: true,
        dispose: true,
        move: true,
        title: '导入用户',
        onAfterShow: function () {
            new HYUpload({
                auto: true,
                containerId: '#addAllUserUploader',
                uploadImg: false,						//图片上传标记
                dropTip: '',
                buttonText: '选择文件',
                server: ctx + '/user/importAllUserExcel.action'
            });
        },
        callback: function () {
            window.location.reload();
        }
    };

    new Dialog("#excelAllUser-dialog", options).show();
}


//导出所有用户
function exportUserInfoList() {
    window.location.href = ctx + "/user/exportUserInfoList.action";
}


