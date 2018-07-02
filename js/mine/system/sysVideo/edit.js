jQuery(function ($) {

    $(".status").chosen({
        disable_search_threshold	: 8,
        no_results_text				: "没有找到",
        allow_single_deselect		: true,
        width: "100%"
    });
    // 新增编辑栏实例化addEditor
    var ue = UE.getEditor('addEditor');
    ue.ready(function(){
    	var temp = ue.setContent($("#temp").val());
    	//temp = removeCode(temp);
    });
    UE.Editor.prototype._bkGetActionUrl=UE.Editor.prototype.getActionUrl;
    UE.Editor.prototype.getActionUrl=function(action){
		if(action == 'uploadimage'){
			return ctx+'/notice/uploadFile.action';
		}else{
			return this._bkGetActionUrl.call(this,action);
		}
	}
    var preData = new Array();
    var fileId =2;
    var fileGroup = $("#fileGroup").val();
    var filePath = $("#filePath").val();
    var fileName = $("#fileName").val();
    var temp = {
            "fileId": fileId,
            "fileGroup": fileGroup,
            "filePath": filePath,
            "fileName": fileName
        };
    preData.push(temp);
    new HYUpload({
        auto: true,
        fileNumLimit: 1,
        containerId: '#fileUploader',
        uploadImg: false,//图片上传标记
        formData: {filetype: 5},
        fileSizeLimit: 1048576*100,				//设置文件总大小
        fileSingleSizeLimit: 1048576*100,			//设置单个文件大小
        dropTip: '或将视频拖到这里',
        initData: preData,
        buttonText: '选择视频',
        server: ctx + '/fdfs/uploadFile.action'
    });
    var preData1 = new Array();
    var logoId = 1;
    var logoName = $("#logoName").val();
    var logoGroup = $("#logoGroup").val();
    var logoPath = $("#logoPath").val();
    var temp1 = {
    		 "fileId": logoId,
             "fileGroup": logoGroup,
             "filePath": logoPath,
             "fileName": logoName
        };
    preData1.push(temp1);
    new HYUpload({
        auto: true,
        fileNumLimit: 1,
        containerId: '#fileUploader2',
        uploadImg: false,//图片上传标记
        formData: {filetype: 1},
        dropTip: '或将图片拖到这里',
        initData: preData1,
        buttonText: '选择图片',
        server: ctx + '/fdfs/uploadFile.action'
    });
    
    new ValidateWin("#tab-sysVideoFrom", {
        callback: function (content, event) {
            var param = getVideo();
            if(param.filePath==null ||param.filePath==undefined||param.filePath=='' ){
            	 faildMsg("请选择上传的视频")
				 return 
            }
             param=getPic(param);
             if(param.logoPath==null ||param.logoPath==undefined||param.logoPath=='' ){
            	 faildMsg("请选择上传的图片")
				 return 
            }
            var addContent = ue.getContent();
            if(addContent.length<1){
            	faildMsg("公告内容为空，请重新输入内容");
            	return
            }
            param.content=addContent;
            param.id=$("#id").val();
            param.title=$("#title").val();
            param.type=$("#type").val();
            param.isRecommand=$("#isRecommand").val();
           
            loadingShow();
            $.ajax({ 
                url: ctx + "/sysVideo/update.action",
                type: "post",
                contentType: "application/json",
                data: JSON.stringify(param),
                dataType: "json",
                async: false,
                success: function (data) {
                	 loadingHide();
                	if (data.error == 1) {
                       
                        successMsg("操作成功！", 1000, function () {
                            window.location.href = ctx + "/sysVideo/query.action";
                        });
                    } else if (data.error == -100) {
                        faildMsg("会话超时，请重新登陆！");
                    } else {
                        faildMsg(data.message);
                    }
                }
            });
        }
    });

    function getVideo() {
    	var param = {};
        //遍历文件列表
        $("#fileUploader .filelist li").each(function () {
                param.fileGroup = $(this).data("group");
                param.filePath = $(this).data("filepath");
                param.fileName = $(this).data("filename");
                return param
        })
        return param;
    }
    function getPic(param) {
        //遍历文件列表
        $("#fileUploader2 .filelist li").each(function () {
                param.logoPath = $(this).data("filepath");
                param.logoGroup = $(this).data("group");
                param.logoName = $(this).data("filename");
                return param
        })
        return param;
    }

})

function validFrom(lableId) {
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $(lableId).val() == "") {
            if ($(lableId).attr("id") == "title" ) {
                $(lableId).attr('tip', '标题为空，请重新输入。');
                return "faild";
            } else if ($(lableId).attr("id") == "type") {
            	$(lableId).parent().addClass("validation-error");
                return "faild";
            }else if ($(lableId).attr("id") == "isRecommand") {
            	$(lableId).parent().addClass("validation-error");
                return "faild";
            }
            return "success";
        }
        return "success";
    }
}
