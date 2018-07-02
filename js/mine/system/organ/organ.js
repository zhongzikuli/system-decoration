$(document).ready(function () {
    // 新增、修改单位账号检验
    function checkOrgName() {
        var orgName = $.trim($("input[name='orgName']").val());
        if (orgName === '') {
            return;
        }
        HQdecorate.post(ctx + "/organ/checkOrgName.action", {orgName: orgName}, function (data) {
            if (data.error == 1) {
            } else if (data.error == -100) {
                HQdecorate.faildMsg("会话超时，请重新登陆！");
            } else {
                HQdecorate.faildMsg(data.message);
                $("input[name='orgName']").addClass("validation-error");
            }
        }, function (res) {
            HQdecorate.faildMsg(res.responseText, 1000)
        })
    }
})

// 新增单位
function createOrgan() {
    var options = {
        width: 700,
        top: 200,
        height: 550,
        overlay: true,
        dispose: true,
        title: '新增单位',
        url: '',
        move: true,
        fade: true,
        onBeforeShow: function () {
            $(".reset").trigger('click');
            $("#create-user-name").val('');//原先的BUG：253解决用户名、密码自动填充问题导致，有误
            //城市组件
            init_city_select($("#create-organ-province"));
        },
        onAfterHide: function () {
            $(".provinceCityAll").hide();
        },
        callback: function () {
            var flag = false;
            if ($("#createOrganForm").valid("createOrganForm")) {
                HQdecorate.post(ctx + "/organ/create.action", $("#createOrganForm").serialize(), function (data) {
                    if (data.error == 1) {
                        HQdecorate.successMsg("新增成功！", 1000, function () {
                            window.location.href = ctx + "/organ/query.action";
                        });
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

    var addDlg = new Dialog("#createOrgan-dialog", options);
    //下拉框初始化
    var config = {
        disable_search_threshold: 10,
        no_results_text: '无数据',
        width: "225px"
    };
    $(".org-type-chosen-select").chosen(config);
    addDlg.show();
}

//查看单位
function viewOrgan(id) {
    var options = {
        width: 700,
        top: 200,
        height: 550,
        overlay: true,
        dispose: true,
        move: true,
        title: '查看单位',
        url: '',
        onBeforeShow: function () {

            HQdecorate.post(ctx + "/organ/detail.action", {id: id}, function (data) {
                if (data.error == 1) {
                    var organ = data.rows;
                    $("#view-organ-name").val(organ.orgName);
                    $("#view-short-name").val(organ.shortName);
                    $("#view-organ-address").val(organ.province + organ.city + organ.town + organ.address);
                    $("#view-organ-contacts").val(organ.contacts);
                    $("#view-organ-tel").val(organ.orgTel);
                    $("#view-tel").val(organ.tel);
                    $("#view-organ-url").val(organ.url);
                    $("#view-organ-remark").val(organ.remark);

                    $("#view-username").val(organ.userName);
                    $("#view-user-employees").val(organ.employees);
                    $("#view-user-real-name").val(organ.userRealName);
                    $("#view-pass").val(organ.userPassword);
                    $("#view-organ-type").val(organ.orgTypeName);
                } else if (data.error == -100) {
                    HQdecorate.faildMsg("会话超时，请重新登陆！");
                } else {
                    HQdecorate.faildMsg(data.message);
                }
            }, function (res) {
                HQdecorate.faildMsg(res.responseText, 1000)
            });
        }
    };
    var viewDlg = new Dialog("#viewOrgan-dialog", options);
    viewDlg.show();
}

/*启用单位信息*/
function startUpOrgan(id) {

    HQdecorate.post(ctx + "/organ/startup.action", {id: id}, function (data) {
        if (data.error == 1) {
            HQdecorate.successMsg("操作成功！", 1000, function () {
                window.location.href = ctx + "/organ/query.action";
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


//编辑
function editOrgan(id) {
    var options = {
        width: 700,
        top: 200,
        height: 550,
        overlay: true,
        dispose: true,
        title: '单位编辑',
        move: true,
        url: "",
        onBeforeShow: function () {
            $(".reset").trigger('click');
            $("#edit-organ-username").val(' ');//不能删除，见bug编号：253
            //城市组件
            init_city_select($("#edit-organ-province"));
        },
        onAfterHide: function () {
            $(".provinceCityAll").hide();
        },
        onAfterShow: function () {
            var flag = false;
            HQdecorate.post(ctx + "/organ/edit.action", {id: id}, function (data) {
                if (data.error == 1) {
                    var organ = data.rows;
                    $("#edit-organ-id").val(organ.id);
                    $("#edit-organ-userId").val(organ.userId);
                    $("#edit-organ-name").val(organ.orgName);
                    $("#edit-organ-name").attr("param", "id=" + organ.id);
                    $("#edit-organ-short-name").val(organ.shortName);
                    $("#edit-organ-province").val(organ.province + "-" + organ.city + "-" + organ.town);
                    $("#edit-organ-address").val(organ.address);
                    $("#edit-organ-contacts").val(organ.contacts);
                    $("#edit-tel").val(organ.tel);
                    $("#edit-organ-tel").val(organ.orgTel);
                    $("#edit-organ-remark").val(organ.remark);
                    $("#edit-organ-username").val(organ.userName);
                    $("#edit-user-real-name").val(organ.userRealName);
                    $("#edit-user-employees").val(organ.employees);
                    $("#edit-organ-username").attr("param", "userId=" + organ.userId);
                    $("#edit-organ-pass").val(organ.userPassword);
                    $("#edit-organ-pass-old").val(organ.userPassword);
                    $("#dit-organ-type").val(organ.orgType);
                    $("#edit-organ-type-name").val(organ.orgTypeName);
                    $("#edit-organ-url").val(organ.url);
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
        },
        callback: function () {
            if ($("#editOrganForm").valid("editOrganForm")) {
                HQdecorate.post(ctx + "/organ/update.action", $("#editOrganForm").serialize(), function (data) {
                    if (data.error == 1) {
                        HQdecorate.successMsg("操作成功！", 1000, function () {
                            window.location.href = ctx + "/organ/query.action";
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

    var editDlg = new Dialog("#editOrgan-dialog", options);
    editDlg.show();
}

function deleteOrgan() {
    var ck = $("input[name='organList_input']:checked");
    if (ck.length == 0) {
        HQdecorate.alertDialog("请选择要删除的单位。");
        return
    } else {
        var idArr = new Array();
        $(ck).each(function () {
            idArr.push($(this).val());
        });
        HQdecorate.confirmDialog("确认删除选中的单位吗？", true,{},function () {
            var params = {}
            params.idArr = idArr.toString();
            HQdecorate.post(ctx + "/organ/delete.action",params,function (data) {
                if (data.error == 1) {
                    HQdecorate.successMsg("操作成功！", 1000, function () {
                        window.location.href = ctx + "/organ/query.action";
                    });
                } else if (data.error == -100) {
                    HQdecorate.faildMsg("会话超时，请重新登陆！");
                } else {
                    HQdecorate.faildMsg(data.message);
                }
            },function (res) {
                HQdecorate.faildMsg(res.responseText, 1000)
            })
        })
    }
}

function validOrgForm(lableId) {
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $.trim($(lableId).val()) == "") {
            if ($(lableId).attr("id") == "create-organ-address" ||
                $(lableId).attr("id") == "edit-organ-address") {
                $(lableId).attr('tip', '单位地址详情为空，请重新输入。');
                return "faild";
            } else if ($(lableId).attr("id") == "create-organ-tel" ||
                $(lableId).attr("id") == "edit-organ-tel") {
                $(lableId).attr('tip', '单位电话为空，请重新输入。');
                return "faild";
            } else if ($(lableId).attr("id") == "create-user-name" ||
                $(lableId).attr("id") == "edit-organ-username") {
                $(lableId).attr('tip', '单位管理员为空，请重新输入。');
                return "faild";
            } else if ($(lableId).attr("id") == "create-pass" ||
                $(lableId).attr("id") == "edit-organ-pass") {
                $(lableId).attr('tip', '密码为空，请重新输入。');
                return "faild";
            }
            return "success";
        }
        if ($(lableId).val() != null && $(lableId).val() != "") {
            var _this = $(lableId);
            if ($(lableId).attr("id") == "create-organ-name" ||
                $(lableId).attr("id") == "edit-organ-name") {
                if (!(/^[\u4E00-\u9FA5A-Za-z]+$/).exec(_this.val())) {
                    $(lableId).attr('tip', '单位名称只支持中文或英文字母。');
                    return "faild";
                } else if (!(/^.{1,20}$/).exec(_this.val())) {
                    $(lableId).attr('tip', '字符长度不超过20个字符。');
                    return "faild";
                }
                return "success";
            }
        }
        if ($(lableId).attr("id") == "create-user-name" ||
            $(lableId).attr("id") == "edit-organ-username") {
            if (!(/^.{1,20}$/).exec(_this.val())) {
                $(lableId).attr('tip', '管理员长度不超过16个字符。');
                return "faild";
            } else {
                return "success";
            }
        }
        if ($(lableId).attr("id") == "create-pass") {
            if (!(/^[A-Za-z0-9]+$/).exec(_this.val())) {
                $(lableId).attr('tip', '密码只支持为英文、数字。');
                return "faild";
            } else if (!(/^.{1,16}$/).exec(_this.val())) {
                $(lableId).attr('tip', '密码长度不超过16个字符。');
                return "faild";
            } else {
                return "success";
            }
        }
        if ($(lableId).attr("id") == "edit-organ-pass" && $("#edit-organ-pass").val() != $("#edit-organ-pass-old").val()) {
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
        if ($(lableId).attr("id") == "create-organ-tel" ||
            $(lableId).attr("id") == "edit-organ-tel") {
            if (!(/^0\d{2,3}-\d{7,8}$/).exec(_this.val())) {
                $(lableId).attr('tip', '单位电话格式错误（区号+座机电话号码）。');
                return "faild";
            } else {
                return "success";
            }
        }
        if ($(lableId).attr("id") == "edit-organ-username") {
            if (!(/^.{1,20}$/).exec(_this.val())) {
                $(lableId).attr('tip', '管理员长度不超过16个字符。');
                return "faild";
            } else {
                return "success";
            }
        }
        return "success";
    }
    return "success";
}
