$(document).ready(function(){

   $(".order").on("click",function(){
       var feetype=$(".order").attr("data-feeType");
       var id=$(".order").attr("data-id");
       order(feetype,id);
   });

    $(".tongdunStrategy").on("click",function(){
        var feetype=$(".tongdunStrategy").attr("data-feeType");
        var id=$(".tongdunStrategy").attr("data-id");
        order(feetype,id);
    });

    $(".tongdunNetTime").on("click",function(){
        var feetype=$(".tongdunNetTime").attr("data-feeType");
        var id=$(".tongdunNetTime").attr("data-id");
        order(feetype,id);
    });

    $(".bairongStatery").on("click",function(){
        var feetype=$(".bairongStatery").attr("data-feeType");
        var id=$(".bairongStatery").attr("data-id");
        order(feetype,id);
    });

    $(".bairongNetTime").on("click",function(){
        var feetype=$(".bairongNetTime").attr("data-feeType");
        var id=$(".bairongNetTime").attr("data-id");
        order(feetype,id);
    });

    $(".bairongTelThird").on("click",function(){
        var feetype=$(".bairongTelThird").attr("data-feeType");
        var id=$(".bairongTelThird").attr("data-id");
        order(feetype,id);
    });

    $(".bairongPerson").on("click",function(){
        var feetype=$(".bairongPerson").attr("data-feeType");
        var id=$(".bairongPerson").attr("data-id");
        order(feetype,id);
    });
    
    $(".idCardPhoto").on("click",function(){
        var feetype=$(".idCardPhoto").attr("data-feeType");
        var id=$(".idCardPhoto").attr("data-id");
        order(feetype,id);
    });



    function order(feetype,id) {
        var options = {
            width: 350,
            top: 150,
            height: 230,
            overlay: true,
            dispose: true,
            title: '编辑',
            url: '',
            move: true,
            fade: true,
            onBeforeShow: function () {
                var orgId=$("#orgId").val();
                $.ajax({
                    url:ctx+"/sysOrganFee/findOrganFeeForOrgIdAndFeeType.action",
                    data:{
                        feeType:feetype,
                        orgId:orgId
                    },
                    type:"post",
                    dataType:"json",
                    success:function(data){
                        if (data.error == 1) {
                            if(null!=data.rows){
                                $("#originalFee").val(data.rows.originalFee);
                                $("#saleFee").val(data.rows.saleFee);
                            }
                        }
                    }
                });
            },
            callback: function () {
                var flag = false;
                if ($("#organFeeForm").valid("organFeeForm")) {
                    loadingShow();
                    var id=id;
                    var orgId=$("#orgId").val();
                    var feeType=feetype;
                    var originalFee=$("#originalFee").val();
                    var saleFee= $("#saleFee").val();
                    $.ajax({
                        url:ctx+"/sysOrganFee/setUp.action",
                        data:{
                            id:id,
                            orgId:orgId,
                            feeType:feeType,
                            originalFee:originalFee,
                            saleFee:saleFee
                },
                    type:"post",
                        dataType:"json",
                        success:function(data){
                        if (data.error == 1) {
                            loadingHide();
                            successMsg("设置成功！", 1000, function () {
                                window.location.href = ctx + "/sysOrganFee/query.action?id="+orgId;
                            });
                        } else if (data.error == -100) {
                            faildMsg("会话超时，请重新登陆！");
                        } else if (data.error == -1) {
                            faildMsg("设置失败！");
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
        };
        var addDlg = new Dialog("#organFee-dialog", options);
        addDlg.show();
    }

});

//表单校验
/*function valid(lableId){
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $(lableId).val() == "") {
            if ($(lableId).attr("id") == "originalFee" ) {
                $(lableId).attr('tip', '成本价不能为空。');
                return "faild";
            }
            if ($(lableId).attr("id") == "saleFee" ) {
                $(lableId).attr('tip', '收费价不能为空。');
                return "faild";
            }
            return "success";
        }
        if ($(lableId).val() != null && $(lableId).val() != "") {
            var _this = $(lableId);
            if ($(lableId).attr("id") == "originalFee") {
                if (!(/^[0-9]*$/).exec(_this.val())) {
                    $(lableId).attr('tip', '成本价只能输入数字。');
                    return "faild";
                }
                return "success";
            }else  if ($(lableId).attr("id") == "saleFee") {
                if (!(/^[0-9]*$/).exec(_this.val())) {
                    $(lableId).attr('tip', '收费价只能输入数字。');
                    return "faild";
                }
                return "success";
            }
        }
        return "success";
    }
}*/