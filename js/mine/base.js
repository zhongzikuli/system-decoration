(function ($) {
    //隐藏父页面操作菜单
    $(document).on("click", function (e) {
        e = window.event || e; // 兼容IE7
        var obj = $(e.srcElement || e.target);
        if ($(".btn-box").css("display") == 'block') {
            if (!obj.parents().is('.laydate_box, .laydate_box*, .btn-box,.btn-box*')) {
                $(".btn-box").hide();
                $(".btn-search").children('i').removeClass('fa-caret-down').addClass('fa-caret-up');
            }
        } else {
            if ($(obj).is(".btn-search") || $(obj).is(".fa-caret-up")) {
                $(".btn-box").show();
                $(".btn-search").children('i').removeClass('fa-caret-up').addClass('fa-caret-down');
            }
        }

        parent.$(".dropdown").removeClass("open");
        parent.$(".roll-nav").removeClass("open");
    });

    //回车键提交表单
    $("#pagerForm").find("input").keypress(function (event) {
        var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
        if (keyCode == 13) {
            $("#pageNum").val(0);
            $("#pagerForm").submit();
        }
    });

    //表格列表全选 取消全选
    $('.checkAll').click(function () {
        if ($(this).prop("checked")) {
            $(this).parents(".table").find('.checkOne').each(function () {
                $(this).prop("checked", true);
            });
        } else {
            $(this).parents(".table").find('.checkOne').each(function () {
                $(this).prop("checked", false);
            });
        }
    });

    $('.checkOne').click(function () {
        var len = $('.checkOne').length;
        if ($(".checkOne:checked").length < len) {
            $('.checkAll').prop('checked', false);
        } else {
            $('.checkAll').prop('checked', true);
        }
    });

    //表格列表行选
    $("tr").find("td:not(:first)").click(function () {
        var _this = $(this).parent().find(".checkOne");
        if (_this.length > 0 && _this.is(':checked')) {
            _this.prop('checked', false);
        } else if (_this.length > 0) {
            _this.prop('checked', true);
        }
        var len = $('.checkOne').length;
        if ($('.checkOne:checked').length < len) {
            $('.checkAll').prop('checked', false);
        } else if (len != 0) {
            $('.checkAll').prop('checked', true);
        }
    });

    //表格列表双击事件
    $(".table-striped tr").dblclick(function () {
        $(this).find("td .detail").trigger("click");
    });

    $("img").each(function () {
        $(this).bind("error", function () {
            this.src = ctx + "/images/errPic.png";
        })
    });

    function toType(obj) {
        return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
    }

    function filterNull(obj) {// 参数过滤函数
        for (var key in obj) {
            if (obj[key] === null) {
                delete obj[key]
            }
            if (toType(obj[key]) === 'string') {
                obj[key] = obj[key].trim()
            } else if (toType(obj[key]) === 'object') {
                obj[key] = filterNull(obj[key])
            } else if (toType(obj[key]) === 'array') {
                obj[key] = filterNull(obj[key])
            }
        }
        return obj
    }

    /*
    * method:请求方式,没有默认
    * url：
    * params：请求参数
    * successfn：成功回调
    * errorfn：错误回调，
    * async:同步异步，默认为true异步
    * dom:局部请求时，必须传，默认为全局请求
    * */
    function ajax(method, url, params, successfn, errorfn, async, dom) {
        var global = dom ? false : true;
        async = async == undefined ? true : async;
        if (params) {
            params = filterNull(params)
        }
        global ? HQdecorate.loadingShow() : HQdecorate.showLoading(dom);
        $.ajax({
            method: method,
            url: url,
            dataType: "json",
            async: async,
            cache: false,//浏览器缓存
            data: method === 'POST' || method === 'PUT' ? params : null,
            params: method === 'GET' || method === 'DELETE' ? params : null,
            success: function (res) {
                global ? HQdecorate.loadingHide() : HQdecorate.hideLoading(dom)
                successfn(res);
            },
            error: function (res) {
                errorfn(res);
            }
        })
    }

    function jsonPost(url, params, successfn, errorfn, async, dom) {
        var global = dom ? false : true;
        async = async == undefined ? true : async;
        params = params || null;
        if (params) {
            params = filterNull(params)
        }
        global ? HQdecorate.loadingShow() : HQdecorate.showLoading(dom);
        $.ajax({
            method: "POST",
            url: url,
            dataType: "json",
            async: async,
            cache: false,//浏览器缓存
            data: params,
            contentType: "application/json;charset=utf-8",
            params: params,
            success: function (res) {
                global ? HQdecorate.loadingHide() : HQdecorate.hideLoading(dom)
                successfn(res);
            },
            error: function (res) {
                errorfn(res);
            }
        })
    }

    /*
    * text：消息文本
    * */
    function alertDialog(text) {
        var sHtml = '';
        var salt = new Date().getTime();
        sHtml += '<script type="text/template" title="" id="dialog-' + salt + '">\
            <div data-id="title" class="dialog-item"><div class="dialog-tips">\
                        <p class="tips">' + text + '</p></div></div>\
                <div class="dialog-manage"><a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a></div></script>';
        $('body').append(sHtml);

        var defults = {
            width: 300,
            top: 200,
            height: 150,
            overlay: true,
            dispose: true,
            isStick: true,
            move: true,
            title: '提示',
            callback: function () {

            },
            onAfterHide: function () {
                $('#dialog-' + salt).remove();
            }
        };

        var alertDlg = new Dialog('#dialog-' + salt, defults);
        alertDlg.show();
    }

    function confirmDialog(text, hasCancel, option, callback) {
        hasCancel = hasCancel || true;
        var salt = new Date().getTime();
        var defults = {
            width: 300,
            top: 240,
            height: 150,
            overlay: true,
            dispose: true,
            move: true,
            title: '提示',
            callback: function () {
                callback();
            },
            onAfterHide: function () {
                $('#dialog-' + salt).remove();
            }
        };
        option = $.extend({}, defults, option || {});

        var sHtml = '';
        sHtml += '<script type="text/template" title="" id="dialog-' + salt + '">\
	        <div data-id="title" class="dialog-item">\
	        	<div class="dialog-tips">\
	        		<p class="tips">' + text + '</p></div></div>\
	        <div class="dialog-manage">\
		            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a> ';
        if (hasCancel) {
            sHtml += '<a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>';
        }
        sHtml += '</div></script>';
        $('body').append(sHtml);
        var confirmDlg = new Dialog('#dialog-' + salt, option);
        confirmDlg.show();
    }

    /*
    * type:消息类型：默认success,可选faild
    * */
    function alertMsg(text, sec, type, callback) {
        sec = sec || 1500;
        type = type || "success";
        callback = callback || function () {

        };
        var sHtml = '';
        sHtml += '<div class="loading-overlay"></div>';
        if (type == "success") {
            sHtml += '<div class="success-msg">';
        } else {
            sHtml += '<div class="faild-msg">';
        }
        sHtml += '<div class="msg-text"><p title="' + text + '">' + text + '</p></div></div>';
        if (window.location.href.indexOf('file://') > -1) {
            $('body').append(sHtml);
        } else {
            $('body', parent.document).append(sHtml);
        }

        var $overlay = null;
        var $container = null;
        if (window.location.href.indexOf('file://') > -1) {
            $overlay = $('.loading-overlay');
            if (type == "success") {
                $container = $('.success-msg');
            } else {
                $container = $('.faild-msg');
            }
        } else {
            $overlay = $('.loading-overlay', parent.document);
            if (type == "success") {
                $container = $('.success-msg', parent.document);
            } else {
                $container = $('.faild-msg', parent.document);
            }
        }

        var _w = $container.width();
        $overlay.fadeIn(600);
        $container.css('margin-left', -_w / 2).fadeIn(600);

        setTimeout(function () {
            $overlay.fadeOut(600, function () {
                $(this).remove()
            });
            $container.css('margin-left', -_w / 2).fadeOut(600, function () {
                $(this).remove()
            });
            setTimeout(function () {
                callback();
            }, 800);
        }, sec);
    }

    function loadingShow(sec) {
        sec = sec || 300;
        var sHtml = '';
        sHtml += '<div class="loading-overlay"></div>\
		<div class="loading-container">\
			<div class="loading-img"><img src="images/loading.gif"></div>\
		</div>';
        $('body', parent.document).append(sHtml);
        $('.loading-overlay', parent.document).fadeIn(sec);
        $('.loading-container', parent.document).fadeIn(sec);
    }

    function loadingHide(sec) {
        sec = sec || 300;
        try {
            var $overlay = $('.loading-overlay', parent.document);
            var $container = $('.loading-container', parent.document);
            $overlay.fadeOut(sec);
            $container.fadeOut(sec);
            setTimeout(function () {
                $overlay.remove();
                $container.remove();
            }, sec);
        } catch (e) {
            console.log(e);
        }
    }

    function showLoading(dom) {
        var sHtml = '<div class="loading-wrap bounceIn show">' +
            '<div class="loading-img"><img src="' + ctx + '/images/loading.gif"></div></div>';
        $(dom).append(sHtml);
    }

    function hideLoading(dom) {
        $(dom).find(".loading-wrap").remove();
    }

    function openTabForParent(dataUrl, dataIndex, menuName) {
        // 获取标识数据
        var flag = true;
        if (dataUrl == undefined || $.trim(dataUrl).length == 0) {
            return false;
        }
        // 选项卡菜单已存在
        $('.J_menuTab', parent.document).each(function () {
            var target = $('.J_iframe[data-id="' + $(this).data('id') + '"]', parent.document);
            var Index = target.attr("name").replace(/[^0-9]/ig, "");
            if ($(this).data('id') == dataUrl || Index == dataIndex) {
                HQdecorate.loadingShow();
                if (!$(this).hasClass('active')) {
                    $(this).addClass('active').siblings('.J_menuTab').removeClass('active');
                    $(this).find("i").attr("class", "fa fa-times-circle-active");
                    scrollToTabForParent(this);
                    // 显示tab对应的内容区
                    $('.J_mainContent .J_iframe', parent.document).each(function () {
                        var Index = $(this).attr("name").replace(/[^0-9]/ig, "");
                        if ($(this).data('id') == dataUrl || Index === dataIndex) {
                            $(this).show().siblings('.J_iframe').hide();
                            HQdecorate.loadingHide();
                            return false;
                        }
                    });
                } else {
                    HQdecorate.loadingHide();
                }
                flag = false;
                return flag;
            }
        });

        // 选项卡菜单不存在
        if (flag) {
            var str = '<a href="javascript:;" class="active J_menuTab" data-id="' + dataUrl + '">' + menuName + ' <i class="fa fa-times-circle-active"></i></a>';
            var str1 = '<iframe class="J_iframe" name="iframe' + dataIndex + '" width="100%" height="100%" src="' + dataUrl + ' " frameborder="0" data-id="' + dataUrl + '" seamless></iframe>';
            $('.J_menuTab', parent.document).removeClass('active').find("i").attr("class", "fa fa-times-circle");

            // 添加选项卡对应的iframe
            $('.J_mainContent', parent.document).find('iframe.J_iframe').hide().parents('.J_mainContent').append(str1);
            $('.J_menuTabs .page-tabs-content', parent.document).append(str);
            //显示loading提示
            HQdecorate.loadingShow();

            scrollToTabForParent($('.J_menuTab.active', parent.document));
            $('.J_mainContent iframe:visible', parent.document).load(function () {
                //iframe加载完成后隐藏loading提示
                HQdecorate.loadingHide();
            });
        }
        return false;
    }

    function closeTabForParent(dataUrl) {
        if (dataUrl == undefined || $.trim(dataUrl).length == 0) {
            return false;
        }
        $('.J_menuTab', parent.document).each(function () {
            if ($(this).data('id') == dataUrl) {
                var width = $(this).width();
                if ($(this).hasClass("active")) {
                    if ($(this).next(".J_menuTab").size()) {
                        var nextDataId = $(this).next(".J_menuTab:eq(0)").data("id");
                        $(this).next(".J_menuTab:eq(0)").addClass("active");
                        $(".J_mainContent .J_iframe", parent.document).each(function () {
                            if ($(this).data("id") == nextDataId) {
                                $(this).show().siblings(".J_iframe").hide();
                                return false
                            }
                        });
                        var marginLeft = parseInt($(".page-tabs-content", parent.document).css("margin-left"));
                        if (marginLeft < 0) {
                            $(".page-tabs-content", parent.document).animate({
                                marginLeft: (marginLeft + width) + "px"
                            }, "fast")
                        }
                        $(this).remove();
                        $(".J_mainContent .J_iframe", parent.document).each(function () {
                            if ($(this).data("id") == dataUrl) {
                                $(this).remove();
                                return false
                            }
                        });
                        return
                    }
                    if ($(this).prev(".J_menuTab").size()) {
                        var preDataId = $(this).prev(".J_menuTab:last").data("id");
                        $(this).prev(".J_menuTab:last").addClass("active").find("i").attr("class", "fa fa-times-circle-active");
                        $(".J_mainContent .J_iframe", parent.document).each(function () {
                            if ($(this).data("id") == preDataId) {
                                $(this).show().siblings(".J_iframe").hide();
                                return false
                            }
                        });
                        $(this).remove();
                        $(".J_mainContent .J_iframe", parent.document).each(function () {
                            if ($(this).data("id") == dataUrl) {
                                $(this).remove();
                                return false
                            }
                        })
                    }
                } else {
                    $(this).remove();
                    $(".J_mainContent .J_iframe", parent.document).each(function () {
                        if ($(this).data("id") == dataUrl) {
                            $(this).remove();
                            return false
                        }
                    });
                    scrollToTabForParent($('.J_menuTab.active', parent.document));
                }
                return false
            }
        });
    }

    function scrollToTabForParent(element) {//滚动到指定选项卡
        var marginLeftVal = calSumWidthForParent($(element).prevAll()),
            marginRightVal = calSumWidthForParent($(element).nextAll());
        // 可视区域非tab宽度
        var tabOuterWidth = calSumWidthForParent($(".content-tabs", parent.document).children().not(".J_menuTabs"));
        //可视区域tab宽度
        var visibleWidth = $(".content-tabs", parent.document).outerWidth(true) - tabOuterWidth;
        //实际滚动宽度
        var scrollVal = 0;
        if ($(".page-tabs-content", parent.document).outerWidth() < visibleWidth) {
            scrollVal = 0;
        } else if (marginRightVal <= (visibleWidth - $(element).outerWidth(true) - $(element).next().outerWidth(true))) {
            if ((visibleWidth - $(element).next().outerWidth(true)) > marginRightVal) {
                scrollVal = marginLeftVal;
                var tabElement = element;
                while ((scrollVal - $(tabElement).outerWidth()) > ($(".page-tabs-content", parent.document).outerWidth() - visibleWidth)) {
                    scrollVal -= $(tabElement).prev().outerWidth();
                    tabElement = $(tabElement).prev();
                }
            }
        } else if (marginLeftVal > (visibleWidth - $(element).outerWidth(true) - $(element).prev().outerWidth(true))) {
            scrollVal = marginLeftVal - $(element).prev().outerWidth(true);
        }
        $('.page-tabs-content', parent.document).animate({
            marginLeft: 0 - scrollVal + 'px'
        }, "fast");
    }

    function calSumWidthForParent(elements) {//计算元素集合的总宽度
        var width = 0;
        $(elements).each(function () {
            width += $(this).outerWidth(true);
        });
        return width;
    }

    function formatMoney(s, n) {
        if (s == 0 || s == "0") return "0.00";
        if (undefined == s || null == s || s == "") return "";
        var mark = "";
        if (parseFloat(s) < 0) {
            mark = "-";
            s = (s + "").replace("-", "");
        }
        n = n > 0 && n <= 20 ? n : 2;
        var temp = parseFloat((s + "").replace(/[^\d\.-]/g, ""))
        s = Math.round(Math.pow(10, n) * temp) / Math.pow(10, n) + "";
        //如果四舍五入后s是个整数，则给小数部分添加n个0
        if (s.indexOf('.') < 0) {
            s = temp.toFixed(n) + "";
        }

        var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
        t = "";
        for (i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return mark + t.split("").reverse().join("") + "." + r;
    }

    function formatNumber(s, n) {
        if (s == 0 || s == "0") return "0.00";
        if (undefined == s || null == s || s == "") return "";
        var mark = "";
        if (parseFloat(s) < 0) {
            mark = "-";
            s = (s + "").replace("-", "");
        }
        n = n > 0 && n <= 20 ? n : 2;
        var temp = parseFloat((s + "").replace(/[^\d\.-]/g, ""))
        s = Math.round(Math.pow(10, n) * temp) / Math.pow(10, n) + "";
        //如果四舍五入后s是个整数，则给小数部分添加n个0
        if (s.indexOf('.') < 0) {
            s = temp.toFixed(n) + "";
        }
        return s;
    }

    function save2Point(s) {
        if (s == 0 || s == "0") return "0.00";
        if (undefined == s || null == s || s == "") return "";
        s = Math.ceil(Math.round(s * 10000) / 100) / 100;
        var mark = "";
        if (parseFloat(s) < 0) {
            mark = "-";
            s = (s + "").replace("-", "");
        }
        n = 2;
        var temp = parseFloat((s + "").replace(/[^\d\.-]/g, ""))
        s = Math.round(Math.pow(10, n) * temp) / Math.pow(10, n) + "";
        //如果四舍五入后s是个整数，则给小数部分添加n个0
        if (s.indexOf('.') < 0) {
            s = temp.toFixed(n) + "";
        }
        var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
        t = "";
        for (i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return mark + t.split("").reverse().join("") + "." + r;
    }

    function rmoney(s) {
        if (!s) {
            return s;
        }
        return parseFloat(s.replace(/[^\d\.-]/g, ""));
    }

    window.HQdecorate = {
        get: function (url, params, successfn, failurefn, async, dom) {
            return ajax('GET', url, params, successfn, failurefn, async, dom)
        },
        post: function (url, params, successfn, failurefn, async, dom) {//post请求
            return ajax('POST', url, params, successfn, failurefn, async, dom)
        },
        jsonPost: function (url, params, successfn, failurefn, async, dom) {//post请求
            return jsonPost(url, params, successfn, failurefn, async, dom)
        },
        alertDialog: function (text) {//简单提示框创建//text:提示文字//seconds:时间，单位毫秒，多少毫秒之后消失
            return alertDialog(text)
        },
        confirmDialog: function (text, hasCancel, option, callbackfn) {//简单提示框创建//text:提示文字//hasCancel:是否有取消按钮，默认：有；传入参数boolean类型//option:弹出框配置参数//func:回调函数
            return confirmDialog(text, hasCancel, option, callbackfn)
        },
        successMsg: function (text, sec, callback) {
            return alertMsg(text, sec, "success", callback)
        },
        faildMsg: function (text, sec, callback) {
            return alertMsg(text, sec, "faild", callback)
        },
        loadingShow: function (sec) {//全局刷新显示loading
            return loadingShow(sec)
        },
        loadingHide: function (sec) {
            return loadingHide(sec)
        },
        showLoading: function (dom) {//页面局部刷新显示loading
            return showLoading(dom)
        },
        hideLoading: function (dom) {
            return hideLoading(dom)
        },
        openTabForParent: function (dataUrl, dataIndex, menuName) {
            return openTabForParent(dataUrl, dataIndex, menuName)
        },
        closeTabForParent: function (dataUrl) {
            return closeTabForParent(dataUrl)
        },
        formatMoney: function (s, n) {
            return formatMoney(s, n)
        },
        formatNumber: function (s, n) {
            return formatNumber(s, n)
        },
        save2Point: function (s) {
            return save2Point(s)
        },
        rmoney: function (s) {
            return rmoney(s)
        }
    }
})(jQuery);