/**
 * 针对页面中form表单进行校验
 */
(function (w, d) {
    var defaultOptions = {
        trigger: "click",
        fade: true,//当前只支持 渐变/无效果  如果需要支持css3动画需要重写显示机制
        validate: false,
        context: null,
        callback: function () {
            return true;
        }
    };

    //var $body = $(d.body);
    var ValidateWin = function (el, options) {
        this.options = $.extend({}, defaultOptions, options || {});
        this.el = el;
        this.isSubmit = true;
        this.initEvent(options);
    }
    var fn = ValidateWin.prototype;
    fn.doCallback = function (_this, event) {
        if (_this.validator) {
            if (!_this.validator.checkStatus()) {
                return;
            }
        }
        if (!_this.isSubmit) {
            $(_this.el).unbind('submit');
            $(_this.el + " form").unbind('submit');
            return false;
        }
        var options = _this.options;
        var context = options.context || _this;
        var flag = options.callback.call(context, event);
    }

    fn.initEvent = function (options) {
        var me = this;
        var xOffset = -20;	// x distance from mouse
        var yOffset = 20;	// y distance from mouse
        $(this.el).on('mouseover mouseout', "[obj],[reg],[url],[tip],[check],[onchange]:file",
            function (e) {
                if (e.type == 'mouseover') {
                    if ($(this).attr('tip') != undefined) {
                        var top = (e.pageY + yOffset);
                        var left = (e.pageX + xOffset);
                        $('#v-tip').css("top", top + "px").css("left", left + "px");
                        $('#v-tip a').html($(this).attr('tip'));
                        $('#v-tip').show(regEx.SHOW_TIME);
                        $('#v-tip').bgiframe();
                    }
                } else {
                    if ($(this).attr('tip') != undefined) {
                        $("#v-tip").hide(regEx.HIDE_TIME);
                    }
                }
            }).on('mousemove', "[obj],[reg],[url],[tip],[check],[onchange]:file",
            function (e) {
                if ($(this).attr('tip') != undefined) {
                    var top = (e.pageY + yOffset);
                    var left = (e.pageX + xOffset);
                    $("#v-tip").css("top", top + "px").css("left", left + "px");
                }
            }
        ).on('blur', "[obj],[reg],[url],[tip],[check],[onchange]:file", function () {
            if ($(this).attr("reg") != undefined) {
                if (true == validate($(this))) {
                    //验证成功增加事件
                    if ($(this).attr("success")) {
                        eval($(this).attr("success"));
                    }
                    me.isSubmit = true;
                } else {
                    //验证失败增加事件
                    if ($(this).attr("faild")) {
                        eval($(this).attr("faild"));
                    }
                    me.isSubmit = false;
                }
            } else if ($(this).attr("obj") != undefined) {
                if (true == validate($(this))) {
                    $(this).removeAttr('tip');
                    change_error_style($(this), "remove");
                    //验证成功增加事件
                    if ($(this).attr("success")) {
                        eval($(this).attr("success"));
                    }
                    me.isSubmit = true;
                } else {
                    change_error_style($(this), "add");
                    //验证失败增加事件
                    if ($(this).attr("faild")) {
                        eval($(this).attr("faild"));
                    }
                    me.isSubmit = false;
                }
            } else if ($(this).attr("check") != undefined) {
                var checkState = eval($(this).attr("check"));
                if (checkState == null) {

                } else if (checkState == "success") {
                    $(this).removeAttr('tip');
                    change_error_style($(this), "remove");
                    if ($(this).attr("success")) {
                        eval($(this).attr("success"));
                    }
                    me.isSubmit = true;
                    return;
                }

                change_error_style($(this), "add");
                if ($(this).attr("faild")) {
                    eval($(this).attr("faild"));
                }
                me.isSubmit = false;
            } else if ($(this).attr("onchange") != undefined) {
                var checkState = eval($(this).attr("onchange"));
                if (checkState == null) {

                } else if (checkState == "success") {
                    change_error_style($(this), "remove");
                    if ($(this).attr("success")) {
                        eval($(this).attr("success"));
                    }
                    me.isSubmit = true;
                    return;
                }

                change_error_style($(this), "add");
                if ($(this).attr("faild")) {
                    eval($(this).attr("faild"));
                }
                me.isSubmit = false;
            } else if ($(this).attr("url") != undefined) {
                if (ajax_validate($(this))) {
                    if (true == $(this).attr("success")) {
                        eval($(this).attr("success"));
                    }
                    me.isSubmit = true;
                } else {
                    //验证失败增加事件
                    if ($(this).attr("faild")) {
                        eval($(this).attr("faild"));
                    }
                    me.isSubmit = false;
                }
            }
        }).on('onchange',"[obj],[reg],[tip],[check],[onchange]", function () {
            if ($(this).attr("reg") != undefined) {
                if (true == validate($(this))) {
                    //验证成功增加事件
                    if ($(this).attr("success")) {
                        eval($(this).attr("success"));
                    }
                    me.isSubmit = true;
                } else {
                    //验证失败增加事件
                    if ($(this).attr("faild")) {
                        eval($(this).attr("faild"));
                    }
                    me.isSubmit = false;
                }
            } else if ($(this).attr("obj") != undefined) {
                if (true == validate($(this))) {
                    $(this).removeAttr('tip');
                    change_error_style($(this), "remove");
                    //验证成功增加事件
                    if ($(this).attr("success")) {
                        eval($(this).attr("success"));
                    }
                    me.isSubmit = true;
                } else {
                    change_error_style($(this), "add");
                    //验证失败增加事件
                    if ($(this).attr("faild")) {
                        eval($(this).attr("faild"));
                    }
                    me.isSubmit = false;
                }
            } else if ($(this).attr("check") != undefined) {
                var checkState = eval($(this).attr("check"));
                if (checkState == null) {

                } else if (checkState == "success") {
                    $(this).removeAttr('tip');
                    change_error_style($(this), "remove");
                    if ($(this).attr("success")) {
                        eval($(this).attr("success"));
                    }
                    me.isSubmit = true;
                    return;
                }

                change_error_style($(this), "add");
                if ($(this).attr("faild")) {
                    eval($(this).attr("faild"));
                }
                me.isSubmit = false;
            } else if ($(this).attr("onchange") != undefined) {
                var checkState = eval($(this).attr("onchange"));
                if (checkState == null) {

                } else if (checkState == "success") {
                    change_error_style($(this), "remove");
                    if ($(this).attr("success")) {
                        eval($(this).attr("success"));
                    }
                    me.isSubmit = true;
                    return;
                }

                change_error_style($(this), "add");
                if ($(this).attr("faild")) {
                    eval($(this).attr("faild"));
                }
                me.isSubmit = false;
            }
        }).on('input propertychange', "[obj],[reg],[url],[tip],[check],[onchange]:file", function () {
            if ($(this).val() != "" && null != $(this).val()) {
                $("#v-tip").hide(regEx.HIDE_TIME);
                change_error_style($(this), "remove");
            }
        });

        //提交按钮事件
        $(this.el).find(".submit-button").eq(0).on("click", function (event, target) {
            me.mySubmit(me, event);
            me.doCallback(me, event);
        });
    }
    fn.mySubmit = function (_this, event) {
        var me = _this, isSubmit = true;
        var form = $(_this.el).find("form").get(0);
        $(form).find("[reg],[obj],[url],[check],[onchange]:file").each(function () {
            if (($(this).attr("obj") != undefined && $(this).attr("obj") != '') || ($(this).attr("reg") != undefined && $(this).attr("reg") != '')) {
                if (!validate($(this))) {
                    if (isSubmit) {
                        isSubmit = false;
                    }
                }
            }
            else if ($(this).attr("check") != undefined && $(this).attr("check") != '' && $(this).attr("check") != 'undefined') {
                var checkState = eval($(this).attr("check"));
                if (checkState != "success") {
                    change_error_style($(this), "add");
                    if (isSubmit) {
                        isSubmit = false;
                    }
                } else {
                    change_error_style($(this), "remove");
                }
            }
            else if ($(this).attr("onchange") != undefined && $(this).attr("onchange") != '' && $(this).attr("onchange") != 'undefined') {
                var checkState = eval($(this).attr("onchange"));
                if (checkState != "success") {
                    change_error_style($(this), "add");
                    if (isSubmit) {
                        isSubmit = false;
                    }
                } else {
                    change_error_style($(this), "remove");
                }
            } else if ($(this).attr("url") != undefined && $(this).attr("url") != '') {
                if (!ajax_validate($(this))) {
                    if (isSubmit) {
                        isSubmit = false;
                    }
                }
            }
        });
        //form表单下的控件
        /*var $form = $(form).find("input,select");
         $.each($form, function () {
         if ($(this).attr("obj") != undefined || $(this).attr("reg") != undefined) {
         if (!validate($(this))) {
         if (isSubmit) {
         isSubmit = false;
         }
         }
         }else if($(this).attr("check") != undefined){
         var checkState = eval($(this).attr("check"));
         if (checkState != "success") {
         change_error_style($(this), "add");
         if (isSubmit) {
         isSubmit = false;
         }
         } else {
         change_error_style($(this), "remove");
         }
         }else if ($(this).attr("url") != undefined){
         if (!ajax_validate($(this))) {
         if (isSubmit) {
         isSubmit = false;
         }
         }
         }else if ($(this).attr("onchange") != undefined){
         var checkState = eval($(this).attr("onchange"));
         if (checkState != "success") {
         change_error_style($(this), "add");
         if (isSubmit) {
         isSubmit = false;
         }
         } else {
         change_error_style($(this), "remove");
         }
         }
         });*/
        if (typeof(isExtendsValidate) != "undefined") {
            if (isSubmit && isExtendsValidate) {
                me.isSubmit = isSubmit;
                return extendsValidate();
            }
        }
        if (isSubmit == false) {
            if ($(this).attr("faild") != null) { //验证失败
                eval($(this).attr("faild"));
            }

        } else {
            if ($(this).attr("success") != null) {//验证成功
                eval($(this).attr("success"));
            }
        }
        me.isSubmit = isSubmit;
        return isSubmit;
    }

    function getCallback(func) {
        if ($.type(func) == 'string') {
            if (func.indexOf('.') == -1)
                return func = w[func];
            var ns = func.split('.');
            var name = w[ns.shift()];
            while (ns.length) {
                name = name[ns.shift()];
            }
            return name;
        }
        return func;
    }

    w.ValidateWin = ValidateWin;
})(window, document);