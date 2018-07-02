jQuery(function ($) {
    $(".status").chosen({
        disable_search_threshold	: 8,
        no_results_text				: "没有找到",
        allow_single_deselect		: true,
        width: "100%"
    });
    // 新增编辑栏实例化
    var ue = UE.getEditor('addEditor');
    UE.Editor.prototype._bkGetActionUrl=UE.Editor.prototype.getActionUrl;
    UE.Editor.prototype.getActionUrl=function(action){
		if(action == 'uploadimage'){
	        return ctx+'/notice/uploadFile.action';
		}else{
			return this._bkGetActionUrl.call(this,action);
		}
	}
   
    new HYUpload({
        auto: true,
        fileNumLimit: 1,
        containerId: '#fileUploader',
        uploadImg: false,//图片上传标记
        formData: {filetype: 5},
        fileSizeLimit: 1048576*100,				//设置文件总大小
        fileSingleSizeLimit: 1048576*100,			//设置单个文件大小
        dropTip: '或将视频拖到这里',
        buttonText: '选择视频',
        server: ctx + '/fdfs/uploadFile.action'
    });
    
    new HYUpload({
        auto: true,
        fileNumLimit: 1,
        containerId: '#fileUploader2',
        uploadImg: false,//图片上传标记
        formData: {filetype: 1},
        dropTip: '或将图片拖到这里',
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
            param.title=$("#title").val();
            param.type=$("#type").val();
            param.isRecommand=$("#isRecommand").val();
            loadingShow();
            $.ajax({ 
                url: ctx + "/sysVideo/create.action",
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
                param.logoGroup = $(this).data("group");
                param.logoPath = $(this).data("filepath");
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
