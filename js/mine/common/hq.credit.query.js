(function($){
	var realCreditMap = new Map();
	var realCreditNumber = 0;
	var isInit = false;
	function LoanCreditQuery(btnId, acceptId){
		this.initEvent(btnId, acceptId);
		return this;
	}
	//组件初始化
	LoanCreditQuery.prototype.initBeside = function(){
		if($("#beside-query-box").length > 0){
			$("#beside-query-box").remove();
		}
		
		var tips = '<div id="beside-query-box" class="beside-query-box expand animated">'+
						'<div class="heading"><i class="fa fa-database"></i>&nbsp;征信大数据</div>'+
						'<div class="content"><div class="text-center tip-message">暂无数据</div></div>'+
					'</div>';
		$("body").append(tips);
		//收缩按钮
		$(".open-beside-query").click(function(e) {
			if($(".beside-query-box").hasClass("active")){
				hideBesideBox();
			}else{
				showBesideBox();
			}
			e.stopPropagation();
		});
		isInit = true;
	}
	
	function hideBesideBox(){
		$(".beside-query-box").removeClass("slideInRight");
		$(".beside-query-box").addClass("slideOutRight");
		setTimeout(function(){
			$(".beside-query-box").removeClass("active");
		}, 1000);
		
		$(parent.document.body).add($(".mod_basic, .mod_header")).unbind("click");
	}
	
	function showBesideBox(){
		$(".beside-query-box").removeClass("slideOutRight");
		$(".beside-query-box").addClass("slideInRight");
		$(".beside-query-box").addClass("active");
		//隐藏事件
		$(parent.document.body).add($(".mod_basic, .mod_header")).on("click", function (e) {
			if($(".beside-query-box").hasClass("active")){
				hideBesideBox();
			}
			e.stopPropagation();
		});
	}
	//初始化事件
	LoanCreditQuery.prototype.initEvent = function(btnId, acceptId){
		var _this = this;
		$(btnId).on("click", function(e){
			_this.query(acceptId);
			e.stopPropagation();
		});
	}
	//（同盾-贷款风控详情）
	LoanCreditQuery.prototype.query = function(acceptId){
		var _this = this;
		if("" != acceptId){
			$.ajax({
				url		: ctx + "/risk/queryRiskDetail.action",
				type	: "post",
				data	: {
					acceptId	: acceptId
				},
				dataType: "json",
				success	: function (data) {
					if (data.error == 1) {
						var rows = data["rows"];
						if(!isInit) {
							_this.initBeside();
						}else{
							$("#beside-query-box").find(".heading").html('<i class="fa fa-database"></i>&nbsp;征信大数据');
						}
						//创建查询类目
						_this.createQueryCategory(rows);
					} else if (data.error == -100) {
                        HQdecorate.faildMsg("会话超时，请重新登陆！");
					} else {
                        HQdecorate.faildMsg(data.message);
					}
				}
			});
		}else{
			this.deleteItem(_type);
		}
	}
	
	//创建查询类目
	LoanCreditQuery.prototype.createQueryCategory = function (rows){
		var html = "";
		if(rows.length > 0){
			for(var i=0; i<rows.length; i++){
				html += '<div class="category" id="category-'+rows[i]["userType"]+'">';
				html += '<div class="title"><span class="name">'+ "贷款人" +":"+rows[i]["realName"]+'</span> '+ (rows[i]["isBlack"] > 0 ? '<span class="pull-right badge badge-danger">已拉黑</span>' : "") +'</div>';
				var policyType = "--";
				if(null != rows[i]["decision"] && "" != rows[i]["decision"] && rows[i]["decision"].indexOf("通过") > 0){
					policyType = '<code class="alert-success">'+rows[i]["decision"]+'</code>';
				}else if(null != rows[i]["decision"] && "" != rows[i]["decision"] && rows[i]["decision"].indexOf("拒绝") > 0){
					policyType = '<code class="alert-danger">'+rows[i]["decision"]+'</code>';
				}else if(null != rows[i]["decision"] && "" != rows[i]["decision"] && rows[i]["decision"].indexOf("审核") > 0){
					policyType = '<code class="alert-info">'+rows[i]["decision"]+'</code>';
				}
				//风险参数
				html += '<div class="clear item score">';
					html += '<div class="col-sm-2 no-padding"><div class="text-center" id="indicatorScoreContainer-' + i + '" data-score="'+ (null != rows[i]["score"] ? rows[i]["score"] : 0 )+'"><span class="score-label">风险分</span></div></div>';
					html += '<div class="col-sm-4 no-right">';
						html += "<div class='risk'>身份证:"+ rows[i]["cardNo"] +"</div>"
						html += "<div class='risk'>手&nbsp;&nbsp;&nbsp;机:"+ rows[i]["tel"] +"</div>"
						html += "<div class='risk'>审核意见:"+ policyType +"</div>"
					html += '</div>';
					html += '<div class="col-sm-4 no-right">';
						html += "<div class='risk'>手机在网:"+ (null != rows[i]["mobileOnlineTime"] && "" != rows[i]["mobileOnlineTime"] ? rows[i]["mobileOnlineTime"] : "--") +"</div>"
						html += "<div class='risk'>手机实名:校验"+ (null != rows[i]["telCertificationName"] && "" != rows[i]["telCertificationName"] ? rows[i]["telCertificationName"] : "--") +"</div>"
						html += "<div class='risk'>生成时间:"+ rows[i]['ctimeStr'] +"</div>"
					html += '</div>';
				html += '</div>';
				//命中项
				html +=  '<div class="clear item"><h6><span class="btn btn-outline btn-xs btn-default">命中项</span></h6></div>';
				html += '<div class="clear item">';
				if(rows[i]["hits"].length > 0){
					for (var j = 0; j < rows[i]["hits"].length; j++) {
						var details = rows[i]["hits"][j]["details"];
						if(null != details){
							for (var m = 0; m < details.length; m++) {
								var data = $.parseJSON(details[m]["result"]);
								html += createDetailContent(rows[i]["hits"][j]["ruleName"], data);
							}
							
						}
					}
				}else{
					html+= "<div>暂无数据</div>";
				}
				html += '</div>';
				html += '</div>';
			}
		}else{
			html+= "<p class='text-center'>暂无数据</p>";
		}
		$(".beside-query-box > .content").empty();
		$(".beside-query-box > .content").find(".tip-message").remove();
		$(".beside-query-box > .content").append(html);
		
		//动态展示风险分
		$("div[id^='indicatorScoreContainer']").each(function(i, n){
			var score = $(n).attr("data-score");
			$(n).radialIndicator({
				barColor: {
					0	: '#33CC33',
					33	: '#33CC33',
					60	: '#33CC33',
					80	: '#FF0000'
				},
				barWidth	: 5,
				radius		: 35,
				initValue	: 0,
				minValue	: 0,
				maxValue	: 100,
				roundCorner : true,
				percentage: false
			});
			var radialObj = $(n).data('radialIndicator');
			radialObj.animate(score);
		});
		//展示命中项
		showBesideBox();
	}
	
	function createDetailContent(title, details){
		var html = "";
		for (var i = 0; i < details.length; i++) {
			var type = details[i]["type"];
			var data = details[i];
			if("black_list" == type){
				html += createBlackListHtml(title, data);
			}else if("grey_list" == type){
				html += createGreyListHtml(title, data);
			}else if("fuzzy_black_list" == type){
				html +=  createFuzzyBlackListHtml(title, data);
			}else if("custom_list" == type){
				html +=  createCustomListHtml(title, data);
			}else if("association_partner" == type || "association_industry" == type || "cross_partner" == type){
				html += createAssociationHtml(title, data);
			}else if("discredit_count" == type){
				html +=  createDiscreditCountHtml(title, data);
			}else if("frequency_one_dim" == type){
				html += createFrequencyOneDimHtml(title, data);
			}else if("frequency_distinct" == type){
				html +=  createFrequencyDistinctHtml(title, data);
			}else if("proxy_ip" == type){
				html += createProxyIpHtml(title, details);
			}
			html +="</br>"
		}
		return html;
	}
	
	function createProxyIpHtml(title, data){
		var html = '';
        html += '<table class="table table-bordered table-striped no-margin">';
        html += '<thead>';
        html += '<tr>';
        html += '<th colspan="8" class="gray-bg">'+title+ '</th>';
		html += '</tr>';
        html += '</thead>';
        html += '<tbody>';
        var proxyIpType = data["proxyIpType"];
        html += '<tr>';
        html += "<td width='10%'>列表</td><td width='90%'>" + list.toString() +"</code></td>";
        html += '</tr>';
        html += '</tbody></table>';
		return html;
	}
	
	function createFrequencyDistinctHtml(title, dimType, dimValue, data){
		var html = '';
        html += '<table class="table table-bordered table-striped no-margin">';
        html += '<thead>';
        html += '<tr>';
        html += '<th colspan="8" class="gray-bg">'+title+ '</th>';
		html += '</tr>';
        html += '</thead>';
        html += '<tbody>';
        var dimType = data["dimType"];
        var dimValue = data["dimValue"];
        var result = data["result"];
        var list = data["list"];
        html += '<tr>';
        html += "<td width='12.5%'>命中属性字典</td><td width='12.5%'>"+getValue(HQdecorate.TDConfig.getDimTypeName(dimType))+"</td>";
        html += "<td width='12.5%'>命中属性值</td><td width='12.5%'>"+getValue(dimValue)+"</td>";
        html += "<td width='12.5%'>结果</td><td width='12.5%'><code class='alert-success'>"+getValue(result)+"</code></td>";
        html += "<td width='12.5%'>列表</td><td width='12.5%'>" + list.toString() +"</code></td>";
        html += '</tr>';
        html += '</tbody></table>';
		return html;
	}
	
	function createFrequencyOneDimHtml(title, data){
		var html = '';
        html += '<table class="table table-bordered table-striped no-margin">';
        html += '<thead>';
        html += '<tr>';
        html += '<th colspan="8" class="gray-bg">'+title+ '</th>';
		html += '</tr>';
        html += '</thead>';
        html += '<tbody>';
        var dimType = data["dimType"];
        var dimValue = data["dimValue"];
        var result = data["result"];
        html += '<tr>';
        html += "<td width='12.5%'>命中属性字典</td><td width='12.5%'>"+getValue(HQdecorate.TDConfig.getDimTypeName(dimType))+"</td>";
        html += "<td width='12.5%'>命中属性值</td><td width='12.5%'>"+getValue(dimValue)+"</td>";
        html += "<td width='12.5%'>结果</td><td width='12.5%'><code class='alert-success'>"+getValue(result)+"</code></td>";
        html += '</tr>';
        html += '</tbody></table>';
		return html;
	}
	
	function createDiscreditCountHtml(title, data){
		var calcDimType = data["calcDimType"];
		var calcDimTypeValue = data["calcDimTypeValue"];
		var calcType = data["calcType"];
		var count = data["result"];
		var hits = data["hits"];
		var html = '';
        html += '<table class="table table-bordered table-striped no-margin">';
        html += '<thead>';
        html += '<tr>';
        html += '<th colspan="8" class="gray-bg">'+title+ '</th>';
		html += '</tr>';
        html += '</thead>';
        html += '<tbody>';
        
        if (null == hits || hits.length <= 0) {
            html += '<tr><td class="col-td" colspan="8">暂无相关信息</td></trd>';
        } else {
            
            //属性
        	html += '<tr  class="white-bg">';
        	html += '<td width="12.5%" class="cel text-center">字段</td><td>'+getValue(HQdecorate.TDConfig.getDimTypeName(calcDimType))+'</td>';
        	html += '<td width="12.5%" class="cel text-center">值</td><td>'+calcDimTypeValue+'</td>';
        	html += '<td width="12.5%" class="cel text-center">类型</td><td>'+ (calcType=="count" ? "失信次数" : "平台个数") + '</td>';
        	html += '<td width="12.5%" class="cel text-center">次数</td><td>'+count+'</td>';
        	html += '</tr>';
        	
        	html += '<tr><td class="col-td" colspan="8"><strong>逾期详情</strong></td></tr>';
        	//hits
        	html += '<tr>';
        	html += '<td class="cel text-center" colspan="2">逾期金额</td>';
        	html += '<td class="cel text-center" colspan="2">逾期笔数</td>';
        	html += '<td class="cel text-center" colspan="2">逾期天数区间</td>';
        	html += '<td class="cel text-center" colspan="2">入库时间</td>';
        	html += '</tr>';
        	for (var i = 0; i < hits.length; i++) {
        		html += '<tr>';
                html += '<td class="cel text-center" colspan="2">'+ hits[i]["overdueAmount"] + '</td>';
                html += '<td class="cel text-center" colspan="2">'+ hits[i]["overdueCount"] + '</td>';
                html += '<td class="cel text-center" colspan="2">'+ hits[i]["overdueDay"] + '</td>';
                html += '<td class="cel text-center" colspan="2">'+ hits[i]["overdueTime"] + '</td>';
                html += '</tr>';
            }
        }
        html += '</tbody></table>';
		return html;
	}
	
	function createAssociationHtml(title, data){
		var html = '';
        html += '<table class="table table-bordered table-striped no-margin">';
        html += '<thead>';
        html += '<tr>';
        html += '<th colspan="3" class="gray-bg">'+title+ '（命中个数：' + data["result"] + '）</th>';
		html += '</tr>';
        html += '</thead>';
        html += '<tbody>';
        var hits = data["hits"];
        var resultsDim = data["resultsForDim"];
        var hitsDim = data["hitsForDim"];
        if (null == hits || hits.length <= 0) {
            html += '<td class="col-td white-bg" colspan="4">暂无相关信息</td>';
        } else {
        	html += '<tr class="white-bg"><td >命中项</td><td>匹配类型</td><td>明细</td></tr>';
        	
        	html += '<tr>';
        	//hits
        	html += '<td class="cel text-center">';
        	for (var i = 0; i < hits.length; i++) {
                html += hits[i]["industryDisplayName"] + '</br>';
            }
        	html += '</td>';
        	//results_for_dim
         	html += '<td class="cel text-center">';
        	for (var i = 0; i < resultsDim.length; i++) {
        		var dimType = typeof(resultsDim[i]["dimType"]) != "undefined" ? resultsDim[i]["dimType"] : resultsDim[i]["matchDimType"];
                html += HQdecorate.TDConfig.getDimTypeName(dimType) + "(" + resultsDim[i]["count"] + '个)</br>';
            }
        	html += '</td>';
        	
        	//hits_for_dim
        	if(null != hitsDim && typeof(hitsDim) != "undefined"){
        		html += '<td class="cel text-center">';
            	for (var i = 0; i < hitsDim.length; i++) {
            		var dimType = typeof(hitsDim[i]["dimType"]) != "undefined" ? hitsDim[i]["dimType"] : hitsDim[i]["matchDimType"];
                    html += hitsDim[i]["industryDisplayName"] + ":" + hitsDim[i]["count"] + '('+ HQdecorate.TDConfig.getDimTypeName(dimType) +')' + '</br>';
                }
            	html += '</td>';
        	}else{
        		html += '<td class="cel"></td>';
        	}
        	html += '</tr>';
        }
        html += '</tbody></table>';
		return html;
	}
	
	function createCustomListHtml(title, dimType, dimValue, data){
		var html = '';
        html += '<table class="table table-bordered table-striped no-margin">';
        html += '<thead>';
        html += '<tr>';
        html += '<th colspan="6" class="gray-bg">'+title+ '</th>';
		html += '</tr>';
        html += '</thead>';
        html += '<tbody>';
        if (null == hits || hits.length <= 0) {
            html += '<tr><td class="col-td" colspan="6">暂无相关信息</td></trd>';
        } else {
			html += "<tr class='white-bg'>"
			html += "<td width='16%'>命中属性</td><td width='17%'><code class='alert-success'>"+ getValue(HQdecorate.TDConfig.getDimTypeName(data["dimType"])) +"</code></td>";
			html += "<td width='16%'>命中属性值</td><td width='17%'>"+getValue(data["dimValue"])+"</td>";
			html += "<td width='16%'>属性值</td><td width='17%'>"+getValue(data["list"].toString())+"</td>";
			html += "</tr>";
        }
        html += '</tbody></table>';
		return html;
	}
	
	function createFuzzyBlackListHtml(title, data){
		var html = '';
        html += '<table class="table table-bordered table-striped no-margin">';
        html += '<thead>';
        html += '<tr>';
        html += '<th colspan="4" class="gray-bg">'+title+ '</th>';
		html += '</tr>';
        html += '</thead>';
        html += '<tbody>';
        var hits = data["hits"];
        if (null == hits || hits.length <= 0) {
            html += '<tr><td class="col-td" colspan="4">暂无相关信息</td></trd>';
        } else {
        	html += '<tr class="white-bg"><td class="cel text-center">风险类型</td><td class="cel text-center">模糊姓名</td><td class="cel text-center">模糊身份证</td><td class="cel text-center">证据时间</td></tr>';
        	//hits
        	for (var i = 0; i < hits.length; i++) {
        		html += '<tr>';
                html += '<td class="cel text-center">'+ hits[i]["fraudTypeDisplayName"] + '</td>';
                html += '<td class="cel text-center">'+ hits[i]["fuzzyName"] + '</td>';
                html += '<td class="cel text-center">'+ hits[i]["fuzzyIdNumber"] + '</td>';
                var time = new Date(hits[i]["evidenceTime"]);
                html += '<td class="cel text-center">'+ time.pattern("yyyy-MM-dd HH:mm") + '</td>';
                html += '</tr>';
            }
        }
        html += '</tbody></table>';
		return html;
	}
	
	function createGreyListHtml(title, data){
		var html = '';
        html += '<table class="table table-bordered table-striped no-margin">';
        html += '<thead>';
        html += '<tr>';
        html += '<th colspan="4" class="gray-bg">'+title+ '</th>';
		html += '</tr>';
        html += '</thead>';
        html += '<tbody>';
        var hits = data["hits"];
        if (null == hits || hits.length <= 0) {
            html += '<tr><td class="col-td" colspan="4">暂无相关信息</td></trd>';
        } else {
        	html += '<tr class="white-bg"><td class="cel text-center">风险类型</td><td class="cel text-center">风险级别</td><td class="cel text-center">字段</td><td class="cel text-center">证据时间</td></tr>';
        	//hits
        	for (var i = 0; i < hits.length; i++) {
        		html += '<tr>';
                html += '<td class="cel text-center">'+ hits[i]["fraudTypeDisplayName"] + '</td>';
                html += '<td class="cel text-center">'+ hits[i]["riskLevelDisplayName"] + '</td>';
                html += '<td class="cel text-center">'+ hits[i]["value"] + '</td>';
                var time = new Date(hits[i]["evidenceTime"]);
                html += '<td class="cel text-center">'+  (typeof(hits[i]["evidenceTime"]) != "undefined" ? getValue(time.pattern("yyyy-MM-dd HH:mm")) : "--") + '</td>';
                html += '</tr>';
            }
        }
        html += '</tbody></table>';
		return html;
	}
	
	function createBlackListHtml(title, data){
		var hits = data["hits"];
		var html = '';
        html += '<table class="table table-bordered table-striped no-margin">';
        html += '<thead>';
        html += '<tr>';
        html += '<th colspan="4" class="gray-bg">'+title+ '</th>';
		html += '</tr>';
        html += '</thead>';
        html += '<tbody>';
        var hits = data["hits"];
        var dimType = data["dimType"];
        if (null == hits || hits.length <= 0) {
            html += '<tr><td class="col-td" colspan="4">暂无相关信息</td></trd>';
        } else {
        	for (var i = 0; i < hits.length; i++) {
        		var hit = hits[i];
        		html += "<table class='table table-bordered'>"
    			html += "<tr>"
				html += "<td width='16%'>命中属性</td><td width='17%'><code class='alert-success'>"+ HQdecorate.TDConfig.getDimTypeName(dimType) +"</code></td>";
        		html += "<td width='16%'>属性值</td><td width='17%'>"+getValue(hits[i]["value"])+"</td>";
        		html += "<td width='16%'>被执行人姓名</td><td width='17%'>"+getValue(hits[i]["executedName"])+"</td>";
        		html += "</tr>";
        		html += "<tr>";
        		html += "<td>年龄</td><td>"+getValue(hits[i]["age"])+"</td>";
        		html += "<td>性别</td><td>"+getValue(hits[i]["gender"])+"</td>";
        		html += "<td>省份</td><td>"+getValue(hits[i]["province"])+"</td>";
        		html += "</tr>";
        		html += "<tr>";
        		html += "<td>立案时间</td><td>"+getValue(hits[i]["caseDate"])+"</td>";
        		html += "<td>执行法院</td><td>"+getValue(hits[i]["executeCourt"])+"</td>";
        		html += "<td>执行标的</td><td>"+getValue(hits[i]["executeSubject"])+"</td>";
        		html += "</tr>";
        		html += "<tr>";
        		html += "<td>执行状态</td><td>"+getValue(hits[i]["executeStatus"])+"</td>";
        		html += "<td>做出依据执行法院</td><td>"+getValue(hits[i]["evidenceCourt"])+"</td>";
        		html += "<td>生效法律文书确定的义务</td><td>"+getValue(hits[i]["termDuty"])+"</td>";
        		html += "</tr>";
        		html += "<tr>";
        		html += "<td>被执行人履行情况</td><td>"+getValue(hits[i]["carryOut"])+"</td>";
        		html += "<td>失信被执行人行为具体情形</td><td>"+getValue(hits[i]["specificCircumstances"])+"</td>";
        		html += "<td>执行依据文号</td><td>"+getValue(hits[i]["executeCode"])+"</td>";
        		html += "</tr>";
        		html += "<tr>";
        		html += "<td>案号</td><td>"+getValue(hits[i]["caseCode"])+"</td>";
        		
        		var time = new Date(hits[i]["evidenceTime"]);
        		html += "<td>证据时间</td><td>"+ (typeof(hits[i]["evidenceTime"]) != "undefined" ? getValue(time.pattern("yyyy-MM-dd HH:mm")) : "--") +"</td>";
        		html += "<td>逾期时间</td><td>"+getValue(hits[i]["overdueTime"])+"</td>";
        		html += "</tr>";
        		html += "<tr>";
        		html += "<td>逾期金额区间</td><td>"+getValue(hits[i]["overdueAmount"])+"</td>";
        		html += "<td>逾期笔数</td><td>"+getValue(hits[i]["overdueCount"])+"</td>";
        		html += "<td>逾期天数区间</td><td>"+getValue(hits[i]["overdueDay"])+"</td>";
        		html += "</tr>";
        		html += "</table>";
        	}
        }
		return html;
	}
	
	function getValue(value){
		if(typeof(value) != "undefined" && null != value && "" != value){
			return value;
		}else{
			return "--";
		}
	}
	window.LoanCreditQuery = LoanCreditQuery;
	
	//用法(new Date()).pattern("yyyy-MM-dd HH:mm:ss.S")
	Date.prototype.pattern=function(fmt) {           
	    var o = {           
	    "M+" : this.getMonth()+1, //月份           
	    "d+" : this.getDate(), //日           
	    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时           
	    "H+" : this.getHours(), //小时           
	    "m+" : this.getMinutes(), //分           
	    "s+" : this.getSeconds(), //秒           
	    "q+" : Math.floor((this.getMonth()+3)/3), //季度           
	    "S" : this.getMilliseconds() //毫秒           
	    };           
	    var week = {           
	    "0" : "/u65e5",           
	    "1" : "/u4e00",           
	    "2" : "/u4e8c",           
	    "3" : "/u4e09",           
	    "4" : "/u56db",           
	    "5" : "/u4e94",           
	    "6" : "/u516d"          
	    };           
	    if(/(y+)/.test(fmt)){           
	        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));           
	    }           
	    if(/(E+)/.test(fmt)){           
	        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);           
	    }           
	    for(var k in o){           
	        if(new RegExp("("+ k +")").test(fmt)){           
	            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));           
	        }           
	    }           
	    return fmt;
	};
})($);