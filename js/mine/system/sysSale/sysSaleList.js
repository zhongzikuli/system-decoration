$(function () {

    //刷新
    $(".refresh-btn").on("click", function () {
        $(".search-btn").trigger("click");
    });

    //重置按钮
    $(".reset-btn").on("click", function(){
        $("#sysSaleName").val("");
        $("#sysSaleTel").val("");
        $("#sysSaleCompanyName").val("");
    });


    //删除
    $(".delete").on("click", function () {
        var id = $(this).attr("data-id");
        deleteInfo(id);
    });

    //新增
    $(".insert").on("click", function () {
        insertInfo()
    });

    //修改
    $(".edit").on("click", function () {
        var id = $(this).attr("data-id");
        editSysSaleInfo(id);
    });

    //查看
    $(".detail").on("click", function () {
        var id = $(this).attr("data-id");
        detailSysSaleInfo(id);
    });

    //新增
    function insertInfo() {
        var options = {
            width: 500,
            top: 200,
            height: 450,
            overlay: true,
            dispose: true,
            move: true,
            title: '新增',
            callback: function () {
                if ($("#sysSaleForm").valid("sysSaleForm")) {
                    var flag = true;
                    loadingShow();
                    $.ajax({
                        url: ctx + "/sale/insert.action",
                        type: "post",
                        data: {
                            name : $("#name").val(),
                            tel : $("#tel").val(),
                            companyName  : $("#companyName").val(),
                            status : $("#status option:selected").val(),
                            remark : $("#remark").val()
                        },
                        dataType: "json",
                        success: function (data) {
                            loadingHide();
                            if (data.error == 1) {
                                flag = false;
                                successMsg("操作成功！", 1000, function () {
                                    window.location.href = ctx + "/sale/listPage.action";
                                });
                            } else if (data.error == -100) {
                                faildMsg("会话超时，请重新登陆！");
                            } else {
                                faildMsg(data.message);
                            }
                        },
                        error:function (e) {
                            loadingHide();
                            alertDialog(e.responseText)
                        }
                    });
                    if (flag){
                        return false;
                    }
                }else {
                    return false;
                }
            }
        }
        var createDlg = new Dialog("#sysSale-dialog", options);
        createDlg.show();
    }

    //修改
    function editSysSaleInfo(_id) {
        var options = {
            width: 500,
            top: 200,
            height: 450,
            overlay: true,
            dispose: true,
            move: true,
            title: '修改',
            onBeforeShow:function(){
                loadingShow();
                $.ajax({
                    url: ctx + "/sale/getOneById.action",
                    type: "post",
                    data: {
                        id:_id
                    },
                    dataType: "json",
                    success: function (data) {
                        loadingHide();
                        if (data.error == 1) {
                            $("#name_edit").val(data.rows.name);
                            $("#tel_edit").val(data.rows.tel);
                            $("#companyName_edit").val(data.rows.companyName);
                            $("#status_edit").val(data.rows.status);
                            $("#remark_edit").val(data.rows.remark);
                        } else if (data.error == -100) {
                            faildMsg("会话超时，请重新登陆！");
                        } else {
                            faildMsg(data.message);
                        }
                    }
                });
            },
            callback: function () {
                var flag = false;
                if ($("#sysSaleForm_edit").valid("sysSaleForm_edit")) {
                    loadingShow();
                    $.ajax({
                        url: ctx + "/sale/update.action",
                        type: "post",
                        data: {
                            id:_id,
                            // name : $("#name_edit").val(),
                            // tel : $("#tel_edit").val(),
                            // companyName  : $("#companyName_edit").val(),
                            status : $("#status_edit option:selected").val(),
                            remark : $("#remark_edit").val()
                        },
                        dataType: "json",
                        success: function (data) {
                            loadingHide();
                            if (data.error == 1) {
                                successMsg("操作成功！", 1000, function () {
                                    window.location.href = ctx + "/sale/listPage.action";
                                });
                            } else if (data.error == -100) {
                                faildMsg("会话超时，请重新登陆！");
                            } else {
                                faildMsg(data.message);
                                flag = true;
                            }
                        },
                        error:function (e) {
                            loadingHide();
                            alertDialog(e.responseText)
                        }
                    });
                    if (flag){
                        return false;
                    }
                }else {
                    return false;
                }
            }
        };
        var editDlg = new Dialog("#sysSale-dialog-edit", options);
        editDlg.show();
    }

    //查看
    function detailSysSaleInfo(_id) {
        var options = {
            width: 500,
            top: 200,
            height: 450,
            overlay: true,
            dispose: true,
            move: true,
            title: '修改',
            onBeforeShow:function(){
                loadingShow();
                $.ajax({
                    url: ctx + "/sale/getOneById.action",
                    type: "post",
                    data: {
                        id:_id
                    },
                    dataType: "json",
                    success: function (data) {
                        loadingHide();
                        if (data.error == 1) {
                            $("#name_detail").val(data.rows.name);
                            $("#tel_detail").val(data.rows.tel);
                            $("#companyName_detail").val(data.rows.companyName);
                            $("#status_detail").val(data.rows.status);
                            $("#remark_detail").val(data.rows.remark);
                        } else if (data.error == -100) {
                            faildMsg("会话超时，请重新登陆！");
                        } else {
                            faildMsg(data.message);
                        }
                    }
                });
            },
            callback: function () {
            }
        };
        var detailDlg = new Dialog("#sysSale-dialog-detail", options);
        detailDlg.show();
    }

    //删除
    function deleteInfo(id) {
        confirmDialog("确认删除选中的系统销售信息吗？", function () {
            loadingShow();
            $.ajax({
                url: ctx + "/sale/delete.action",
                type: "post",
                data: {
                    id:id
                },
                dataType: "json",
                success: function (data) {
                    loadingHide();
                    if (data.error == 1) {
                        successMsg("操作成功！", 1000, function () {
                            window.location.href = ctx + "/sale/listPage.action?";
                        });
                    } else if (data.error == -100) {
                        faildMsg("会话超时，请重新登陆！");
                    } else {
                        faildMsg(data.message);
                    }
                }
            });
        })
    }
});

//表单参数校验
function sysSaleForm(_this){
    if (undefined !== _this && null != _this && "" !== _this){
        if ($(_this).val() == null || $(_this).val() == "" || $.trim($(_this).val()) == "") {
            if ($(_this).attr("id") == "name" || $(_this).attr("id") == "name_edit") {
                $(_this).attr('tip', '姓名为空，请重新输入。');
                return "fail";
            }else if  ($(_this).attr("id") == "tel" || $(_this).attr("id") == "tel_edit") {
                $(_this).attr('tip', '手机号码为空，请重新输入。');
                return "fail";
            }else if  ($(_this).attr("id") == "companyName" || $(_this).attr("id") == "companyName_edit") {
                $(_this).attr('tip', '公司名称为空，请重新输入。');
                return "fail";
            }else if  ($(_this).attr("id") == "status" || $(_this).attr("id") == "status_edit") {
                $(_this).attr('tip', '状态为空，请选择状态。');
                return "fail";
            }else if  ($(_this).attr("id") == "remark" || $(_this).attr("id") == "remark_edit") {
                $(_this).attr('tip', '备注为空，请重新输入。');
                return "fail";
            }
            return "success";
        }else {
            if ($(_this).attr("id") == "name" || $(_this).attr("id") == "name_edit") {
                if ($(_this).val().length > 100){
                    $(_this).attr('tip', '姓名长度超出100，请重新输入。');
                    return "fail";
                }
            }else if  ($(_this).attr("id") == "tel" || $(_this).attr("id") == "tel_edit") {
                var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
                if (!reg.test($(_this).val())){
                    $(_this).attr('tip', '手机号码不正确，请重新输入。');
                    return "fail";
                }
            }else if  ($(_this).attr("id") == "companyName" || $(_this).attr("id") == "companyName_edit") {
                if ($(_this).val().length > 100){
                    $(_this).attr('tip', '公司名称长度超出100，请重新输入。');
                    return "fail";
                }
            }else if  ($(_this).attr("id") == "remark" || $(_this).attr("id") == "remark_edit") {
                if ($(_this).val().length > 255){
                    $(_this).attr('tip', '备注长度超出255，请重新输入。');
                    return "fail";
                }
            }
            return "success";
        }
        return "success";
    }
}