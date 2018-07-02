$(function(){
	var orderId = $("#order_id").val();
	var cardNo = $("#card_no").val();
	var realName = $("#real_name").val();
	
	//退回订单
	if ($(".back-order-btn").length > 0) {
		$(".back-order-btn").on("click", showBackOrderWin);
	}
	//作废订单按钮
	if ($(".discard-order-btn").length > 0) {
		$(".discard-order-btn").on("click", discardOrderWin);
	}
	
	//大数据征信
	HQdecorate.post(ctx + "/risk/getBigDataCredit.action", {
		"acceptId"	: orderId
	}, function(data){
		for(var i=0; i<data["rows"].length; i++){
			$("#risk_data_list").find("input").each(function(index, n){
				var name = $(n).attr("name");
				if(name == "isBlack"){
					$(n).val(data["rows"][i][name] == 1 ? "是" : "否");
				}else if(name == "mobileOnlineTime"){
					$("#mobile_online_time").html(data["rows"][i][name]);
				}else{
					$(n).val(data["rows"][i][name]);
				}
			});
		}
	}, function(){
		console.log("error");
	}, "#risk_data_list");
	
	
	// 查询征信、征信详情查看按钮
	var isQueryed = false;
	$(".query-credit-btn").on("click", function () {
		if(isQueryed){
			return;
		}else{
			isQueryed = true;
		}
		HQdecorate.loadingShow();
		var _this = $(this);
		_this.addClass("disabled").attr("disabled", "disabled");
		$.ajax({
			url		: ctx + '/risk/queryForLoan.action?acceptId=' + orderId,
			type	: "post",
			dataType: "json",
			async	: false,
			success	: function (data) {
				HQdecorate.loadingHide();
				isQueryed = false;
				_this.removeClass("disabled").removeAttr("disabled");
				if (data.error == 1) {
					for(var i=0; i<data["rows"].length; i++){
						$("#risk_data_list").find("input").each(function(index, n){
							var name = $(n).attr("name");
							if(name == "isBlack"){
								$(n).val(data["rows"][i][name] == 1 ? "是" : "否");
							}else{
								$(n).val(data["rows"][i][name]);
							}
						});
                        _this.attr("disabled","disabled");
                    }
				} else if (data.error == -100) {
					HQdecorate.faildMsg("会话超时，请重新登陆！");
				} else {
					HQdecorate.faildMsg(data.message);
				}
			}
		});
	});
	// 详情查看
	new LoanCreditQuery(".detail-credit-btn", orderId);
	
	
	//获取历史订单
	HQdecorate.post(ctx + "/dlBusinessHandle/getOrderHistory.action", {
		id			: orderId,
		realName	: realName,
		cardNo		: cardNo
	}, function(data){
		//创建表格
		var html = createHistoryTable(data["rows"]);
		$("#detail_history_order").empty().html(html);
		
		//初始化详情按钮
		$(".detail").on("click", function(){
			var _this = this;
			var acceptId = $(_this).attr("data-id");
			var dataTitle = $(_this).attr("data-title");
			var dataHref = $(_this).attr("data-href");
			HQdecorate.openTabForParent(dataHref, "-order-detail-" + acceptId, "订单详情-" + dataTitle);
		});
		
	}, function(){
		console.log("error");
	}, "#detail_history_order");
	
	//获取审核信息
	HQdecorate.post(ctx + "/dlBusinessHandle/getAuditDetail.action", {
		id			: orderId
	}, function(data){
		//创建表格
		var html = createAuditInfoTable(data["rows"]);
		$("#detail_audit_list").empty().html(html);
		
		//审核详情查看
		$(".audit-detail").on("click", function(){
			var _this = this;
			var status = $(_this).attr("data-status");
			openAuditDetailDialog(status);
		});
		
	}, function(){
		console.log("error");
	}, "#detail_audit_list");
	
	//查看审核详情窗口
	function openAuditDetailDialog(orderStatus){
		var options = {
			width	: 600,
			top		: 200,
			height	: 340,
			overlay	: true,
			dispose	: true,
			move	: true,
			move	: true,
			onBeforeShow: function () {
				$.ajax({
                    url: ctx + "/dlBusinessHandle/getAuditNodeDetail.action",
                    type: "post",
                    data: {
                    	"id"			: orderId,
                    	"orderStatus"	: orderStatus
                    },
                    dataType: "json",
                    success: function (data) {
                    	$("#audit_type").html(data["rows"]["auditType"]);
                    	$("#audit_result").html(data["rows"]["auditResult"]);
                    	$("#auditor_name").html(data["rows"]["auditorName"]);
                    	$("#audit_time").html(data["rows"]["auditTime"]);
                    	$("#audit_suggest").html(data["rows"]["remark"]);
                    	if(20 == orderStatus || 28 == orderStatus){
                    		$("#audit_amount").html(data["rows"]["amount"]);
                    		$(".amount").show();
                    	}else if(8 == orderStatus){
                    		if(data["rows"]["fileStatus"] == 1){
                    			$("#file_all_status").html("齐全").parents(".file-detail").show();
                    		}else{
                    			$("#file_all_status").html("未齐全").parents(".file-detail").show();
                    			for(var i=0; i<data["rows"]["files"].length; i++){
                    				var _this = $("#file_not_"+data["rows"]["files"][i]["fileType"]);
                    				_this.append(data["rows"]["files"][i]["fileName"] + "、");
                    				_this.parents(".file-detail").show();
                    			}
                    			$("p[id^=file_not_]").each(function(i,n){
                    				$(n).html($(n).html().substring(0, $(n).html().length-1));
                    			}); 
                    			
                    			$(".dialog-container").css({
                    				height:"470px",
                    				width:"700px"
                    			});
                    			
                    		}
                    	}else if(4 == orderStatus){
                    		$("#audit_tel_detail").html(data["rows"]["telInfo"]);
                    		$("#audit_previou_time").html(data["rows"]["preTime"]);
                    		$(".business-handle").show();
                    	}
                    }
                });
			},
			callback: function () {
				
			}
		};
		var detailDlg = new Dialog("#audit-detail-dialog", options);
		detailDlg.show();
	}
	
	//创建历史订单表格
	function createHistoryTable(rows){
		var html = '<table class="table table-bordered">';
			html += '<thead>';
			html += '<th style="width:15%;">客户姓名</th>';
			html += '<th style="width:15%;">身份证号码</th>';
			html += '<th style="width:10%;">订单状态</th>';
			html += '<th style="width:10%;">贷款申请时间</th>' ;
			html += '<th style="width:15%;">操作</th></tr></thead>';
			html += '<tbody>';
		if (null == rows || rows.length <= 0) {
			html += '<td class="col-td" colspan="5">暂无历史订单</td>';
		} else {
			for (var i = 0; i < rows.length; i++) {
				html += '<tr>';
				html += '<td class="cel">' + rows[i]["realName"] + '</td>';
				html += '<td class="cel" title="' + rows[i]["cardNo"] + '">' + rows[i]["cardNo"] + '</td>';
				html += '<td class="cel" title="' + rows[i]["orderStatusName"] + '">' + rows[i]["orderStatusName"] + '</td>';
				html += '<td class="cel">' + rows[i]["applyLoanTimeStr"] + '</td>';
				html += '<td><a data-id="' + rows[i]["id"] + '" data-title="'+rows[i]["realName"]+'" data-href="'+ ctx +'/dlBusinessHandle/detail.action?id=' + rows[i]["id"] +'" class="btn btn-info btn-xs detail"><i class="fa fa-search-plus"></i>订单(' + rows[i]["orderNo"] + ')</a></td></tr>';
			}
		}
		html += '</tbody></table>';
		return html;
	}
	
	//审核信息列表
	function createAuditInfoTable(rows){
		var html = '<table class="table table-bordered">';
			html += '<thead>';
			html += '<th style="width:2%;">序号</th>';
			html += '<th style="width:8%;">审核类型</th>';
			html += '<th style="width:8%;">审核结果</th>';
			html += '<th style="width:40%;">审核意见</th>' ;
			html += '<th style="width:8%;">审核人</th>' ;
			html += '<th style="width:8%;">审核时间</th>' ;
			html += '<th style="width:8%;">操作</th></tr></thead>';
			html += '<tbody>';
		if (null == rows || rows.length <= 0) {
			html += '<td class="col-td" colspan="7">暂无审核记录</td>';
		} else {
			for (var i = 0; i < rows.length; i++) {
				html += '<tr>';
				html += '<td class="cel">' + (i+1) + '</td>';
				html += '<td class="cel">' + rows[i]["auditTypeName"] + '</td>';
				html += '<td class="cel">' + rows[i]["auditResult"] + '</td>';
				html += '<td class="cel desc">' + rows[i]["auditDesc"] + '</td>';
				html += '<td class="cel">' + rows[i]["auditorName"] + '</td>';
				html += '<td class="cel">' + rows[i]["auditTimeStr"] + '</td>';
				html += '<td><a data-status="' + rows[i]["orderStatus"]  +'" class="btn btn-info btn-xs audit-detail"><i class="fa fa-search-plus"></i>查看</a></td></tr>';
			}
		}
		html += '</tbody></table>';
		return html;
	}
	
	//展示退回订单窗口
    function showBackOrderWin() {
        var options = {
            width: 600,
            top: 200,
            height: 300,
            overlay: true,
            dispose: true,
            move: true,
            move: true,
            url: '',
            onBeforeShow: function () {
                $('#auditDescription').keyup(function () {							//审核描述信息提示
                    var curLength = $(this).val().trim().length;
                    $(this).next("span").find(".input").html(curLength);
                    $(this).next("span").find(".can-input").html(100 - curLength);
                    if (curLength > 100) {
                        var num = $(this).val().trim().substr(0, 140);
                        $(this).val(num);
                    }
                });
            },
            callback: function () {
                if ($("#backOrderForm").valid("backOrderForm")) {
                    var desc = $.trim($("#auditDescription").val());
                    HQdecorate.loadingShow();
                    var params = {
                        id: orderId,
                        remark: $.trim(desc)
                    };
                    $.ajax({
                        url: ctx + "/dlBusinessHandle/backOrder.action",
                        type: "post",
                        data: params,
                        dataType: "json",
                        success: function (data) {
                        	HQdecorate.loadingHide();
                            if (data.error == 1) {
                            	HQdecorate.successMsg("操作成功！", 1000, function () {
                                    history.go(-1);
                                });
                            } else if (data.error == -100) {
                            	HQdecorate.faildMsg("会话超时，请重新登陆！");
                            } else {
                            	HQdecorate.faildMsg(data.message);
                            }
                        }
                    });
                } else {
                    return false;
                }
            }
        };
        var backDlg = new Dialog("#back-order-dialog", options);
        backDlg.show();
    }
    
    //作废订单
    function discardOrderWin() {
        var options = {
            width: 520,
            top: 200,
            height: 260,
            overlay: true,
            dispose: true,
            move: true,
            url: '',
            onBeforeShow: function () {
                $('#discardDescription').keyup(function () {							//审核描述信息提示
                    var curLength = $(this).val().trim().length;
                    $(this).next("span").find(".input").html(curLength);
                    $(this).next("span").find(".can-input").html(100 - curLength);
                    if (curLength > 100) {
                        var num = $(this).val().trim().substr(0, 140);
                        $(this).val(num);
                    }
                });
            },
            callback: function () {
                if ($("#discardOrderForm").valid("discardOrderForm")) {
                    var desc = $.trim($("#discardDescription").val());
                    HQdecorate.loadingShow();
                    var params = {
                        id: orderId,
                        remark: $.trim(desc)
                    };
                    $.ajax({
                        url: ctx + "/dlBusinessHandle/discardOrder.action",
                        type: "post",
                        data: params,
                        dataType: "json",
                        success: function (data) {
                        	HQdecorate.loadingHide();
                            if (data.error == 1) {
                            	HQdecorate.successMsg("操作成功！", 1000, function () {
                                    history.go(-1);
                                });
                            } else if (data.error == -100) {
                            	HQdecorate.faildMsg("会话超时，请重新登陆！");
                            } else {
                            	HQdecorate.faildMsg(data.message);
                            }
                        }
                    });
                } else {
                    return false;
                }
            }
        };
        var discardDlg = new Dialog("#discard-order-dialog", options);
        discardDlg.show();
    }
});