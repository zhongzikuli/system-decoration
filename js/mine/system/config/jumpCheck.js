function jumpCredit(id) {
    var options = {
        width: 400,
        top: 200,
        height:170,
        overlay: true,
        dispose: true,
        move: true,
        title: '设置',
        url: "",
        callback: function () {
            var flag = false;
            if ($("#configForm").valid("configForm")) {
            loadingShow();
            $.ajax({
                url: ctx + "/CreditConfig/creditSet.action",
                type: "post",
                data: {
                    id: id,
                    skipCreditValidation: 1,
                    skipCreditValidationReason: $('#remarkJump').val()
                },
                dataType: "json",
                success: function (data) {
                    loadingHide();
                    if (data.error == 1) {
                        successMsg("操作成功！", 1000, function () {
                            window.location.href = ctx + "/CreditConfig/jumpCheck.action";
                        });
                    } else if (data.error == -100) {
                        faildMsg("会话超时，请重新登陆！");
                    } else {
                        faildMsg(data.message);
                    }
                }
            });
                if (flag) {
                    return false;
                }
            } else {
                return false;
            }
        }
    }
    var detailDlg = new Dialog("#config-dialog_jump", options);
    detailDlg.show();
}

function creditSet(id) {
    var options = {
        width: 400,
        top: 200,
        height: 170,
        overlay: true,
        dispose: true,
        move: true,
        title: '设置',
        url: "",
        callback: function () {
            var flag = false;
            if ($("#configSetForm").valid("configSetForm")) {
            loadingShow();
            $.ajax({
                url: ctx + "/CreditConfig/creditSet.action",
                type: "post",
                data: {
                    id: id,
                    skipCreditValidation: 0,
                    skipCreditValidationReason: $('#remarkSet').val()
                },
                dataType: "json",
                success: function (data) {
                    loadingHide();
                    if (data.error == 1) {
                        successMsg("操作成功！", 1000, function () {
                            window.location.href = ctx + "/CreditConfig/jumpCheck.action";
                        });
                    } else if (data.error == -100) {
                        faildMsg("会话超时，请重新登陆！");
                    } else {
                        faildMsg(data.message);
                    }
                }
            });
                if (flag) {
                    return false;
                }
            } else {
                return false;
            }
        }
    }
    var detailDlg = new Dialog("#config-dialog_set", options);
    detailDlg.show();
}

function jump(id){
    window.location.href=ctx + '/cfBusinessOrderAccept/detail.action?id='+id;
}

//表单校验
function jumpForm(lableId){
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $(lableId).val() == "") {
            if ($(lableId).attr("id") == "remarkJump" ) {
                $(lableId).attr('tip', '备注不能为空。');
                return "faild";
            }
            if ($(lableId).attr("id") == "remarkSet"  ) {
                $(lableId).attr('tip', '备注不能为空。');
                return "faild";
            }
            return "success";
        }
        return "success";
    }
}

