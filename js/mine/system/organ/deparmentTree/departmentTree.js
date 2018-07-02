/*部门菜单*/
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
        beforeClick: beforeClick1,
        onCheck: onCheck1
    }
};

function beforeClick1(e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("organTree1");
    zTree.checkNode(treeNode, !treeNode.checked, null, true);
    return false;
}

function onCheck1(e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("organTree1"),
        nodes = zTree.getCheckedNodes(true),
        v = "";
    	ids = "";
    for (var i=0, l=nodes.length; i<l; i++) {
        v += nodes[i].name + ",";
        ids += nodes[i].id + ",";
    }
    if (v.length > 0 ){
        v = v.substring(0, v.length-1);
        ids = ids.substring(0, ids.length-1);
    }
    var organObj = $("#user-organ1");
    organObj.attr("value", v);
    $("#department_ids1").attr("value",ids);
}

var zTree
function showDepartmentMenu1() {
    var organObj = $("#user-organ1");
    var organOffset = $("#user-organ1").offset();
    $("#menuContent1").css({"background": "rgb(255,255,255)","overflow": "auto"})
    $("body").bind("mousedown", onBodyDown1);
    $.ajax({
        url: ctx + "/department/departmentTree.action",
        data : {ids:$("#department_ids1").val()},
        dataType: "json",
        success: function (result) {
            if (result.error == 1) {
                var zNodes = result.rows;
                $.fn.zTree.init($("#organTree1"), setting, zNodes);
                zTree = $.fn.zTree.getZTreeObj("organTree1");
                zTree.expandAll(true);
            }
        }
    });
}

function hideMenu1() {
    $("#menuContent1").fadeOut("fast");
    $("body").unbind("mousedown", onBodyDown1);
}
function onBodyDown1(event) {
    if (!(event.target.id == "user-organ1" || event.target.id == "menuContent1" || $(event.target).parents("#menuContent1").length > 0 )) {
        hideMenu1();
    }
}