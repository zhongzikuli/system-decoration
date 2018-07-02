var zTree;
	
var rMenu;

//中英文数字
var strReg = new RegExp(/^[a-zA-Z0-9\u4e00-\u9fa5\-\【\】]+$/);

$(function(){
	$('#permissionChangeFlag', window.parent.document).val(false);
	initTree(null);
});

// 加载树
function initTree(id){
    var setting = null;
    HQdecorate.post(ctx + "/permission/queryAllTree.action",null,function (data) {
        if(data.error == 1){
            setting = {
                callback:{
                    onRightClick: function(event, treeId, treeNode){
                        if(!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0){
                            zTree.cancelSelectedNode();
                            showRMenu("root", treeNode, event.clientX, event.clientY);
                        }else if(treeNode){
                            zTree.selectNode(treeNode);
                            showRMenu("node", treeNode, event.clientX, event.clientY);
                        }
                    },
                    beforeDrag: function(treeId, treeNodes){
                        // 一次只能移动一个节点
                        if(treeNodes.length != 1){
                            return false;
                        }
                        // 权限节点不能移动
                        if(treeNodes[0].type == 'permission'){
                            return false;
                        }
                        return true;
                    },
                    beforeDrop: function(treeId, treeNodes, targetNode, moveType){
                        // 只能移动到节点下
                        if(moveType != 'inner'){
                            return false;
                        }
                        // 不能移动到权限节点下
                        if(targetNode != null && targetNode.type == 'permission'){
                            return false;
                        }
                        return true;
                    },
                    onDrop: function(event, treeId, treeNodes, targetNode, moveType){
                        // 不能移动到相同父节点下
                        if(targetNode == null && moveType == null){
                            return false;
                        }
                        // 开始执行后台方法
                        var id1 = null;
                        var idPath1 = null;
                        if(targetNode == null){
                            id1 = 1;
                            idPath1 = '0/';
                        }else{
                            id1 = targetNode.id;
                            idPath1 = targetNode.parentIds;
                        }
                        var id2 = treeNodes[0].id;
                        var idPath2 = treeNodes[0].parentIds;
                        var flag = true;
                        $.ajax({
                            url : ctx + "/permission/updateLevel.action",
                            type : "post",
                            data : {"id1": id1, "id2": id2, "idPath1": idPath1, "idPath2": idPath2},
                            dataType: "json",
                            success : function(data) {
                                if(data.error == 1){
                                    $('#permissionChangeFlag', window.parent.document).val(true);
                                    refreshTree(id2);
                                }else{
                                    faildMsg("移动失败", 500);
                                    flag = false;
                                }
                            }
                        });
                        return flag;
                    }
                },

                data: {
                    key: {
                        url: "xxxxxx" // 设置xxxxxx为url路径 即不跳转
                    },
                    keep: {
                        parent: true // 父节点属性锁，即使所有子节点移走，依旧保持父节点属性
                    }
                },

                edit: {
                    enable: true, // 可以拖动
                    showRemoveBtn: false, // 去掉删除按钮
                    showRenameBtn: false, // 去掉重命名按钮
                    drag: {
                        isCopy: false, // 不能复制
                        isMove: true, // 可以移动
                        prev: false, // 不能移动到目标节点前
                        next: false, // 不能移动到目标节点后
                        inner: true // 只能移动成为目标节点的子节点
                    }
                }
            };

            var zNodes = data.rows;
            $(document).ready(function(){
                $.fn.zTree.init($("#permission-manage-gridDialog-menu"), setting, zNodes);
            });
            zTree = $.fn.zTree.getZTreeObj("permission-manage-gridDialog-menu");
            rMenu = $("#rMenu");
            $("#permission-manage-gridDialog-menu").mousedown(function(e){
                if(e.which == 1){
                    hideRMenu();
                }
            });

            // 选中节点
            if(id != null){
                selectAndExpandNode(zTree, id, false);
            }

        }else{
            HQdecorate.faildMsg("获取菜单权限树失败", 500);
        }
    },function (res) {
        HQdecorate.faildMsg(res.responseText, 1000)
    })
}

// 右键菜单显示
function showRMenu(type, treeNode, x, y){
	$("#rMenu ul").show();
	if(type == "root"){
		$("#m_add_permission").hide();
		$("#m_add_menu").show();
		$("#m_update").hide();
		$("#m_delete").hide();
		$("#m_move_up").hide();
		$("#m_move_down").hide();
	}else if(type == "node"){
		if(treeNode.type == 'permission'){
			$("#m_add_permission").hide();
			$("#m_add_menu").hide();
			$("#m_update").show();
			$("#m_delete").show();
			$("#m_move_up").hide();
			$("#m_move_down").hide();
		}else if(treeNode.type == 'menu'){
			$("#m_add_permission").show();
			$("#m_add_menu").show();
			$("#m_update").show();
			$("#m_delete").show();
			$("#m_move_up").show();
			$("#m_move_down").show();
			var parentNode = zTree.getNodeByParam("id", treeNode.parentId, null);
			var allNodes = zTree.getNodes();
			if(parentNode != null){
				var parentChildren = parentNode.children;
				var firstFlag = 1;
				var lastNode = treeNode;
				for(var i=0; i<parentChildren.length; i++){
					if(parentChildren[i].type == 'menu'){
						lastNode = parentChildren[i];
						if(firstFlag == 1){
							if(lastNode == treeNode){
								$("#m_move_up").hide();
							}
							firstFlag = 0;
						}
					}
				}
				if(lastNode == treeNode){
					$("#m_move_down").hide();
				}
			}else{
				var firstFlag = 1;
				var lastNode = treeNode;
				for(var i=0; i<allNodes.length; i++){
					if(allNodes[i].type == 'menu'){
						lastNode = allNodes[i];
						if(firstFlag == 1){
							if(lastNode == treeNode){
								$("#m_move_up").hide();
							}
							firstFlag = 0;
						}
					}
				}
				if(lastNode == treeNode){
					$("#m_move_down").hide();
				}
			}
		}
	}
	rMenu.css({"top":y + "px", "left":x + "px", "display":"block"});
}

// 隐藏右键菜单
function hideRMenu(){
	if(rMenu){
		rMenu.css({"display":"none"});
	}
}

// 创建菜单
function createMenu(){
	hideRMenu();
	var nodes = zTree.getSelectedNodes();
	var options = {
		width:400,
		top:130,
		height:430,
		overlay:true,
		dispose:true,
		move:false,
		title: '添加菜单',
		callback:function()	{
			// 表单验证失败 阻止提交
			if(!$("#permission-edit-form").valid("permission-edit-form")){
				return false;
			}
			var obj = new Object();
			obj.type = 'menu';
			obj.name = $("#permission-edit-gridDialog-name").val();
			obj.url = $("#permission-edit-gridDialog-url").val();
			obj.style = $("#permission-edit-gridDialog-style").val();
            obj.visible = $("#permission-edit-gridDialog-visible").val();
            obj.sortNo = $("#permission-edit-gridDialog-orderNo").val();
			if(nodes.length != 0){
				obj.parentId = nodes[0].id;
				obj.parentIds = nodes[0].parentIds + obj.parentId + "/";
			}else{
				obj.parentId = 1;
				obj.parentIds = '0/1/';
			}
			var flag = true;

			//TODO
            HQdecorate.post(ctx + "/permission/create.action",obj,function (data) {
                if(data.error == 1){
                    $('#permissionChangeFlag', window.parent.document).val(true);
                    refreshTree(data.rows);
                    HQdecorate.successMsg("添加成功", 500);
                }else{
                    HQdecorate.faildMsg("添加失败", 500);
                    flag = false;
                }
            },function (res) {
                HQdecorate.faildMsg(res.responseText, 1000)
            },false);
			return flag;
		},
		onInit: function(){
			$("#permission-edit-gridDialog-perCode-div").empty();//删除权限码
			$("#permission-edit-gridDialog-url-div").show();
			$("#permission-edit-gridDialog-style-div").show();
			$("#permission-edit-gridDialog-visible-div").show();
			$("#permission-edit-gridDialog-orderNo-div").show();
			$("#permission-edit-gridDialog-type").val("menu");
			$("#permission-edit-gridDialog-type").attr("disabled", true);
			if(nodes.length != 0){
				$("#permission-edit-gridDialog-parentName").val(nodes[0].name);
			}
			changeType();
		}
	};
	var editDlg = new Dialog("#permission-edit-gridDialog", options);
    //下拉框初始化
    var config = {
        disable_search_threshold:10,
        no_results_text: '无数据',
        width:"274px"
    };
    $(".type-chosen-select").chosen(config);
	editDlg.show();
}

// 创建权限
function createPermission(){
	hideRMenu();
	var nodes = zTree.getSelectedNodes();
	var options = {
		width:400,
		top:150,
		height:340,
		overlay:true,
		dispose:true,
		move:false,
		title: '添加权限',
		callback:function()	{
			// 表单验证失败 阻止提交
			if(!$("#permission-edit-form").valid("permission-edit-form")){
				return false;
			}
			var obj = new Object();
			obj.type = 'permission';
			obj.name = $("#permission-edit-gridDialog-name").val();
			obj.perCode = $("#permission-edit-gridDialog-perCode").val();
			obj.parentId = nodes[0].id;
			obj.parentIds = nodes[0].parentIds + obj.parentId + "/";
			var flag = true;

            HQdecorate.post(ctx + "/permission/create.action",obj,function (data) {
                if(data.error == 1){
                    $('#permissionChangeFlag', window.parent.document).val(true);
                    refreshTree(data.rows);
                    HQdecorate.successMsg("添加成功", 500);
                }else{
                    HQdecorate.faildMsg("添加失败", 500);
                    flag = false;
                }
            },function (res) {
                HQdecorate.faildMsg(res.responseText, 1000)
            });
			return flag;
		},
		onInit: function(){
			$("#permission-edit-gridDialog-perCode-div").show();
			$("#permission-edit-gridDialog-type").val("permission");
			$("#permission-edit-gridDialog-type").attr("disabled", true);
			$("#permission-edit-gridDialog-parentName").val(nodes[0].name);
			$("#permission-edit-gridDialog-orderNo-div").empty();
			changeType();
		}
	};
	var editDlg = new Dialog("#permission-edit-gridDialog", options);
    //下拉框初始化
    var config = {
        disable_search_threshold:10,
        no_results_text: '无数据',
        width:"274px"
    };
    $(".type-chosen-select").chosen(config);
	editDlg.show();
}

// 删除
function deleteOne(){
	hideRMenu();
	var nodes = zTree.getSelectedNodes();
	var options = {
		width:300,
		top:200,
		height:145,
		overlay:true,
		dispose:true,
		move:false,
		title: "操作提示",
		callback:function()	{
			var id = nodes[0].id;
			var type = nodes[0].type;
			var parentIds = nodes[0].parentIds;

            HQdecorate.post(ctx + "/permission/delete.action",{"id": id, "type": type, "parentIds": parentIds},function (data) {
                if(data.error == 1){
                    $('#permissionChangeFlag', window.parent.document).val(true);
                    refreshTree(nodes[0].parentId == 1 ? null : nodes[0].parentId);
                    HQdecorate.successMsg("删除成功", 500);
                }else{
                    HQdecorate.faildMsg("删除失败", 500);
                }
            },function (res) {
                HQdecorate.faildMsg(res.responseText, 1000)
            })
		},
		onInit: function(){
			$("#confirm-dialog-tips").html(nodes[0].children.length > 0 ? "该节点非末级节点，是否确定删除？" : "是否要删除该末级节点？");
		}
	};

	var editDlg = new Dialog("#confirm-dialog",options);
	editDlg.show();
}

// 更新
function updateOne(){
	hideRMenu();
	var nodes = zTree.getSelectedNodes();
	var options = {
		width:400,
		top:120,
		height:430,
		overlay:true,
		dispose:true,
		move:false,
		title: '修改节点',
		callback:function()	{
			// 表单验证失败 阻止提交
            /*if(!$("#permission-edit-form").valid("permission-edit-form")){
                return false;
            }*/
			var obj = new Object();
			obj.id = nodes[0].id;
			obj.type = $("#permission-edit-gridDialog-type").val();
			obj.name = $("#permission-edit-gridDialog-name").val();
			obj.perCode = $("#permission-edit-gridDialog-perCode").val();
			obj.url = $("#permission-edit-gridDialog-url").val();
			obj.style = $("#permission-edit-gridDialog-style").val();

			if(obj.type == 'permission'){
				obj.url = null;
				obj.style = null;
			}else if(obj.type == 'menu'){
				obj.perCode = null;
                obj.visible = $("#permission-edit-gridDialog-visible").val();
                obj.sortNo = $("#permission-edit-gridDialog-orderNo").val();
			}
			var flag = true;

            HQdecorate.post(ctx + "/permission/update.action",obj,function (data) {
                if(data.error == 1){
                    $('#permissionChangeFlag', window.parent.document).val(true);
                    refreshTree(obj.id);
                    HQdecorate.successMsg("修改成功", 500);
                }else{
                    HQdecorate.faildMsg(data.message, 500);
                    flag = false;
                }
            },function (res) {
                HQdecorate.faildMsg(res.responseText, 1000)
            });
			return flag;
		},
		onInit: function(){
			if(nodes[0].type == "permission"){
				$("#permission-edit-gridDialog-perCode-div").show();
				$("#permission-edit-gridDialog-type").val("permission");
				$("#permission-edit-gridDialog-perCode").val(nodes[0].perCode);
                $("#permission-edit-gridDialog-perCode").attr("param","id="+nodes[0].id);
				$("#permission-edit-gridDialog-orderNo-div").empty();
			}else if(nodes[0].type == "menu"){
				$("#permission-edit-gridDialog-url-div").show();
				$("#permission-edit-gridDialog-style-div").show();
                $("#permission-edit-gridDialog-visible-div").show();
                $("#permission-edit-gridDialog-orderNo-div").show();
				$("#permission-edit-gridDialog-type").val("menu");
				$("#permission-edit-gridDialog-url").val(nodes[0].url);
				$("#permission-edit-gridDialog-style").val(nodes[0].style);
                $("#permission-edit-gridDialog-visible").val(nodes[0].visible);
                $("#permission-edit-gridDialog-orderNo").val(nodes[0].sortNo);

			};
			$("#permission-edit-gridDialog-name").val(nodes[0].name);
			$("#permission-edit-gridDialog-name").attr("param","id="+nodes[0].id);

			var parentNode = zTree.getNodeByParam("id", nodes[0].parentId, null);
			$("#permission-edit-gridDialog-parentName").val(parentNode == null ? '' : parentNode.name);
			if(nodes[0].children.length != 0 || nodes[0].parentId == 1){
				$("#permission-edit-gridDialog-type").attr("disabled", true);
			}
			changeType();
		}
	};
	var editDlg = new Dialog("#permission-edit-gridDialog", options);
    //下拉框初始化
    var config = {
        disable_search_threshold:10,
        no_results_text: '无数据',
        width:"274px"
    };
    $(".type-chosen-select").chosen(config);
	editDlg.show();
}

// 上移
function moveUp(){
	hideRMenu();
	var treeNode = zTree.getSelectedNodes()[0];
	var parentNode = zTree.getNodeByParam("id", treeNode.parentId, null);
	var allNodes = zTree.getNodes();
	var swapNode = null;
	if(parentNode != null){
		var parentChildren = parentNode.children;
		var flag = 0;
		for(var i = parentChildren.length - 1; i >= 0; i--){
			if(parentChildren[i].type == 'menu'){
				if(flag == 1){
					swapNode = parentChildren[i];
					break;
				}
				if(parentChildren[i] == treeNode){
					flag = 1;
				}
			}
		}
	}else{
		var flag = 0;
		for(var i = allNodes.length - 1; i >= 0; i--){
			if(allNodes[i].type == 'menu'){
				if(flag == 1){
					swapNode = allNodes[i];
					break;
				}
				if(allNodes[i] == treeNode){
					flag = 1;
				}
			}
		}
	}
	if(swapNode != null){
		doSwapSortNo(treeNode, swapNode);
	}
}

// 下移
function moveDown(){
	hideRMenu();
	var treeNode = zTree.getSelectedNodes()[0];
	var parentNode = zTree.getNodeByParam("id", treeNode.parentId, null);
	var allNodes = zTree.getNodes();
	var swapNode = null;
	if(parentNode != null){
		var parentChildren = parentNode.children;
		var flag = 0;
		for(var i = 0; i < parentChildren.length; i++){
			if(parentChildren[i].type == 'menu'){
				if(flag == 1){
					swapNode = parentChildren[i];
					break;
				}
				if(parentChildren[i] == treeNode){
					flag = 1;
				}
			}
		}
	}else{
		var flag = 0;
		for(var i = 0; i < allNodes.length; i++){
			if(allNodes[i].type == 'menu'){
				if(flag == 1){
					swapNode = allNodes[i];
					break;
				}
				if(allNodes[i] == treeNode){
					flag = 1;
				}
			}
		}
	}
	if(swapNode != null){
		doSwapSortNo(treeNode, swapNode);
	}
}

// 执行交换节点
function doSwapSortNo(node1, node2){

    HQdecorate.post(ctx + "/permission/move.action",{"id1": node1.id, "id2": node2.id, "sortNo1": node1.sortNo, "sortNo2": node2.sortNo},function (data) {
        if(data.error == 1){
            $('#permissionChangeFlag', window.parent.document).val(true);
            refreshTree(node1.id);
        }else{
            HQdecorate.faildMsg("排序失败", 500);
        }
    },function (res) {
        HQdecorate.faildMsg(res.responseText, 1000)
    })
}

// 刷新树
function refreshTree(id){
	hideRMenu();
	$.fn.zTree.destroy("permission-manage-gridDialog-menu");
	initTree(id);
}

// 选中并展开节点
function selectAndExpandNode(treeObj, id, flag) {
	var node = treeObj.getNodeByParam("id", id, null);
	treeObj.selectNode(node);
	if(flag){
		treeObj.expandNode(node, true, true);
	}
}

// alert
function myAlertDialog(title, tips){
	var options = {
		width:300,
		top:200,
		height:180,
		overlay:true,
		dispose:true,
		move:false,
		title: title == null ? '' : title,
		callback:function()	{
			
		},
		onInit: function(){
			$("#alert-dialog-tips").html(tips);
		}
	};

	var editDlg = new Dialog("#alert-dialog",options);
	editDlg.show();
}

// 改变类型的ui控制
function changeType(){
	if($("#permission-edit-gridDialog-type").val() == 'permission'){
		$("#permission-edit-gridDialog-perCode-div").show();
		$("#permission-edit-gridDialog-url-div").hide();
		$("#permission-edit-gridDialog-style-div").hide();
		$("#permission-edit-gridDialog-visible-div").hide();
		$("#permission-edit-gridDialog-orderNo-div").hide();
		// 权限的验证加上
		$("#permission-edit-gridDialog-perCode").attr("check", "checkPerCode(this)");
		// 菜单的验证去除
		$("#permission-edit-gridDialog-url").removeAttr("check");
		$("#permission-edit-gridDialog-style").removeAttr("check");
	}else if($("#permission-edit-gridDialog-type").val() == 'menu'){
		$("#permission-edit-gridDialog-perCode-div").hide();
		$("#permission-edit-gridDialog-url-div").show();
		$("#permission-edit-gridDialog-style-div").show();
        $("#permission-edit-gridDialog-visible-div").show();
        $("#permission-edit-gridDialog-orderNo-div").show();
		// 权限的验证去除
		$("#permission-edit-gridDialog-perCode").removeAttr("check");
		// 菜单的验证加上
		$("#permission-edit-gridDialog-url").attr("check", "checkUrl(this)");
		$("#permission-edit-gridDialog-style").attr("check", "checkStyle(this)");
	}
}

/**
 * 校验名称
 * @param self
 * @returns {String}
 */
function checkName(self){
	var value = $(self).val();
	if(value.trim() == ""){
		$(self).attr('tip', '名称不能为空');
		return "faild";
	}
	if(!strReg.test(value)){
		$(self).attr('tip', '名称只支持中英文或数字');
		return "faild";
	}
	if(value.length > 50){
		$(self).attr('tip', '名称长度不能超过50个字符');
		return "faild";
	}
	$(self).removeAttr("tip");
	return "success";
}

/**
 * 校验权限代码
 * @param self
 * @returns {String}
 */
function checkPerCode(self){
	var value = $(self).val();
	if(value.trim() == ""){
		$(self).attr('tip', '权限代码不能为空');
		return "faild";
	}
	if(value.length > 50){
		$(self).attr('tip', '权限代码长度不能超过50个字符');
		return "faild";
	}
	$(self).removeAttr("tip");
	return "success";
}

/**
 * 校验url
 * @param self
 * @returns {String}
 */
function checkUrl(self){
	var value = $(self).val();
	if(value.length > 100){
		$(self).attr('tip', 'URL长度不能超过100个字符');
		return "faild";
	}
	$(self).removeAttr("tip");
	return "success";
}

/**
 * 校验图标名
 * @param self
 * @returns {String}
 */
function checkStyle(self){
	var value = $(self).val();
	if(value.length > 30){
		$(self).attr('tip', '图标名称长度不能超过30个字符');
		return "faild";
	}
	$(self).removeAttr("tip");
	return "success";
}

function checkType(self){
    var value = $(self).val();
    if(value == "-1" || value == undefined){
        $(self).attr('tip', '类型不能为空');
        return "faild";
    }
    $(self).removeAttr("tip");
    return "success";
}

function checkSortNo(self) {
	var value = $(self).val();
	if (!new RegExp("^\\d+$").test(value)){
        $(self).attr('tip', '请输入整型数据');
        return "faild";
	}
    $(self).removeAttr("tip");
    return "success";
}
