/*
 @初始版本
 */
(function (w, d) {
    var defaultOptions = {
        trigger: "click",
        overlay: false,
        overlayClose: false,
        autoClose: null,
        opacity: 0.1,
        top: 300,
        left: null,
        title: "",
        html: "",
        template: "",
        width: 300,
        height: null,
        url: "",//iframeMode
        fade: true,//当前只支持 渐变/无效果  如果需要支持css3动画需要重写显示机制
        timeOut: 200,
        show: false,
        move: false,
        //toMovelCallback:null,
        validate: false,
        isStick: false,//iframe弹框置顶
        context: null,
        dispose: false,
        onInit: function () {
        },
        onBeforeShow: function () {
        },
        onAfterShow: function () {
        },
        onAfterHide: function () {
        },
        callback: function () {
            return true;
        }
    };
    var showDialogs = [];
    lastIndex = 10000;
    var DialogId = 0;
    var $window = $(w);
    var $doc = $(d);
    var $body = $(d.body);
//    var $body = $(parent.document.body);
    var Dialog = function (el, options) {
        this.options = $.extend({}, defaultOptions, options || {});
        this.el = el;
        this.id = DialogId++;
        this.init();
        this.bind();
        this.isSubmit = true;
    };
    var fn = Dialog.prototype;
    fn.init = function () {
        this.buildDialog();
        this.initDialog();
    };
    fn.buildDialog = function () {
        var options = this.options;
        this.iframeMode = options.url != "" ? true : false;
        if (options.overlay) {
            this.overlay = $("<div class='dialog-overlay'></div>");
            if (options.isStick) {
                $(parent.document.body).append(this.overlay);
            } else {
                $body.append(this.overlay);
            }
        }
        this.dialog = $("<div class='dialog-container animated bounceInDown'></div>");
        var dialogBody = $("<div class='dialog-body'><div class='dialog-header'><span class='dialog-title'></span><span class='dialog-close'></span></div><div class='dialog-content'></div></div>");
        this.body = dialogBody;
        this.header = dialogBody.find(".dialog-header");
        this.title = dialogBody.find(".dialog-title");
        this.content = dialogBody.find(".dialog-content");
        this.dialog.append(dialogBody);
        if (options.isStick) {
            $(parent.document.body).append(this.dialog);
        } else {
            $body.append(this.dialog);
        }
    };
    fn.initDialog = function () {
        var options = this.options;
        var tmpl;
        if (!this.iframeMode) {
            var template = options.template;
            if (template) {
                template = $(template);
                tmpl = template.html();
                if (template.attr("title")) options.title = template.attr("title");
            } else if (this.el) {
                var el = this.el;
                if (typeof (el) == "string") {
                    this.el = $(el);
                }
                tmpl = this.el.html();
                if (this.el.attr("title")) options.title = this.el.attr("title");
            } else {
                tmpl = options.html;
            }
        } else {
            var url = options.url;
            var me = this;
            var iframeOnloadName = "iframeOnload" + this.id;
            w[iframeOnloadName] = function () {
                var iframe = me.dialog.find("iframe");
                var iframeWin = iframe.get(0).contentWindow;
                iframeWin.parentDialog = me;
                var body = $(iframeWin.document.body);
                body.on("click", ".dialog-close", function (event) {
                    event.preventDefault();
                    me.removeClass("bounceInDown").addClass("bounceOutDown");
                });
            };// onload='"+iframeOnloadName+"()'
            tmpl = "<iframe frameBorder='no' style='width:100%;height:100%;background:transparent;border:0' src='" + url + "'></iframe>";
        }
        this.content.html(tmpl);
        if (options.width) {
            if (this.iframeMode) {
                this.setContentWidth(options.width);
            } else {
                this.dialog.width(options.width);
            }
        }
        if (options.height) {
            if (options.url) {
                this.setContentHeight(options.height);
            } else {
                this.dialog.height(options.height);
            }
        }
        if (options.title) this.title.html(options.title);
        if (this.overlay) {
            if (options.overlayClose) this.overlay.addClass("dialog-close");
            if (options.opacity !== null) this.overlay.css("opacity", options.opacity);
        }
        if (options.move) this.header.addClass("dialog-move");
        if (options.top) options.top = parseInt(options.top);
        if (options.left) options.left = parseInt(options.left);
        this.setPosition();
        if (options.validate) {
            this.validator = new FormValid(this.dialog);
        }
        this.addItems();
        var context = options.context || this;
        options.onInit.call(context);
        if (options.show) {
            this.show();
        }
        this.initComponents();
    };
    fn.bind = function (type) {
        type = type || "on";
        var options = this.options;
        var me = this;
        if (options.node) {
            options.node[type](options.trigger, function (event) {
                event.preventDefault();
                me.show();
            });
        }
        var clickHandler = function (event) {
            var target = $(event.target);
            me.clickHandler(event, target);
        };
        this.dialog[type]("click", clickHandler);
        if (this.overlay) this.overlay[type]("click", clickHandler);
        $window[type]("resize", function () {
            me.refreshPosition();
        });
        if (options.move) {
            //当前默认为标题拖动
            this.header[type]("mousedown", $.proxy(this.beginMove, this));
            $body[type]("mousemove", $.proxy(this.toMove, this));
            $body[type]("mouseup", $.proxy(this.endMove, this));
        }
        if (options.autoClose) {
            var autoClose = parseInt(options.autoClose);
            var onAfterShow = options.onAfterShow;
            var closeCallback = function () {
                setTimeout(function () {
                    me.hide();
                }, autoClose);
            };
            var callback = function () {
                onAfterShow.call(this);
                closeCallback();
            };
            options.onAfterShow = callback;
        }
    };
    fn.clickHandler = function (event, target) {
        var className = target.attr("class") || "";
        className = className.split(' ');
        var captured = false;
        for (var i = 0, l = className.length; i < l; i++) {
            var name = className[i];
            switch (name) {
                case "dialog-close":
                    event.stopPropagation();
                    this.hide(true);
                    captured = true;
                    break;
                case "dialog-ok":
                    this.mySubmit();
                    this.doCallback(event);
                    captured = true;
                    break;
            }
            if (captured) {
                break;
            }
        }
        if (captured) {
            event.preventDefault();
            return;
        }
        //激活当前弹窗机制
        setActiveDialog(this);
    };
    fn.addItems = function () {
        var items = this.dialog.find(".dialog-item");
        var me = this;
        this.items = {};
        items.each(function (i, item) {
            var item = $(item);
            var id = item.attr("data-id") || item.attr("id") || item.attr("name");
            if (!id) {
                throw new Error("需要为该元素指定data-id,id或name属性");
            }
            me.items[id] = item;
        });
    };
    fn.getWidth = function () {
        return this.dialog.width();
    };
    fn.setContentWidth = function (val) {
        this.content.width(val);
    };
    fn.setContentHeight = function (val) {
        this.content.height(val);
    };
    fn.isPosition = function () {
        var options = this.options;
        return options.top && options.left;
    };
    fn.refreshPosition = function () {
        for (var i = 0; i < showDialogs.length; i++) {
            var dialog = showDialogs[i];
            if ((dialog.moveTop && dialog.moveLeft) || this.isPosition()) {
                continue;
            }
            dialog.setPosition();
        }
    };
    fn.setPosition = function (position) {
        var options = this.options;
        var top;
        var left;
        if (position) {
            top = position.top;
            left = position.left;
        } else {
            var options = this.options;
            top = options.top;
            left = options.left;
        }
        if (!left) {
            var cw = 0;
            if (options.isStick) {
                var cw = parent.document.documentElement.clientWidth;
            } else {
                var cw = $window.width();
            }
            var dw = this.getWidth();
            //获取父页面左侧菜单栏宽度
            if (options.isStick) {
                left = (cw - dw) / 2;
            } else {
                var lw = $('.navbar-default', parent.document).width();
                left = (cw - dw - lw) / 2;
            }
        }
        if (options.isStick) {
            this.dialog.css("top", top + "px");
            this.dialog.css("left", left + "px");
            this.position = {
                top: top,
                left: left
            };
        } else {
            this.dialog.css("top", top - 110 + "px");
            this.dialog.css("left", left + "px");
            this.position = {
                top: top - 110,
                left: left
            };
        }
    };
    fn.beforeShow = function () {
        //setActiveDialog(this);
        var options = this.options;
        var context = options.context || this;
        options.onBeforeShow.call(context);
    };
    fn.show = function () {
        if (this.showing) return;
        this.showing = true;
        this.beforeShow();
        var options = this.options;
        var me = this;
        var context = options.context || this;
        var showHanlder = function () {
            if (options.fade) {
                this.dialog.fadeIn(options.timeOut, function () {
                    options.onAfterShow.call(context);
                });
            } else {
                this.dialog.show();
                options.onAfterShow.call(context);
            }
        };
        if (this.overlay) {
            if (options.fade) {
                this.overlay.fadeIn(options.timeOut, function () {
                    showHanlder.call(me);
                });
            } else {
                showHanlder.call(me);
            }
        } else {
            showHanlder.call(me);
        }
        if (!options.isStick) {
            var _width = $('.slimScrollDiv', parent.document).outerWidth(true);
            var _height = $('.slimScrollDiv', parent.document).outerHeight(true);
            $('.slimScrollDiv', parent.document).append('<div class="dialog-overlay-left"></div>');
            $('.navbar-static-top', parent.document).append('<div class="dialog-nav-top"></div>');
            $('.mod_header', parent.document).append('<div class="dialog-overlay-top"></div>');
            $('.footer', parent.document).append('<div class="dialog-overlay-foot"></div>');
            $('.dialog-overlay-left', parent.document).css({
                height: _height,
                width: _width,
                position: 'fixed',
                top: '50px'
            }).fadeIn(options.timeOut);
            var tHeight = $('.navbar-static-top', parent.document).height() + $('.content-tabs', parent.document).height();
            var fHeight = $('.footer', parent.document).height();

            $('.dialog-nav-top', parent.document).css({
                height: _height,
                width: '100%',
                position: 'fixed',
                top: '0px',
                height: tHeight + 2
            }).fadeIn(options.timeOut);
            $('.dialog-overlay-foot', parent.document).css({
                width: '100%',
                left: _width,
                position: 'fixed',
                bottom: '0px',
                height: fHeight + 31
            }).fadeIn(options.timeOut);
            $('.dialog-overlay-top', parent.document).fadeIn(options.timeOut);
        }

        var xOffset = -20; // x distance from mouse
        var yOffset = 20; // y distance from mouse  
        this.dialog.on('mouseover mouseout', "[obj],[reg],[url]:not([reg],[obj]),[tip],[check],[onchange]:file",
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
        }).on('input propertychange', "[obj],[reg],[url]:not([reg],[obj]),[tip],[check],[onchange]:file", function () {
            if ($(this).val() != "" && null != $(this).val()) {
                $("#v-tip").hide(regEx.HIDE_TIME);
                change_error_style($(this), "remove");
            }
        });
    };
    fn.mySubmit = function () {
        var me = this;
        $(".dialog-container form").submit(function () {
            var isSubmit = true;
            $(this).find("[reg],[obj],[url]:not([reg],[obj]),[check],[onchange]:file").each(function () {
                if ($(this).attr("url")) {
                    if (!ajax_validate($(this))) {
                        if (isSubmit) isSubmit = false;
                    }
                } else if ($(this).attr("obj") || $(this).attr("reg")) {
                    if (!validate($(this))) {
                        if (isSubmit) isSubmit = false;
                    }
                }
                else if ($(this).attr("check") != undefined) {
                    var checkState = eval($(this).attr("check"));
                    if (checkState != "success") {
                        change_error_style($(this), "add");
                        if (isSubmit) isSubmit = false;
                    } else {
                        change_error_style($(this), "remove");
                    }
                }
                else if ($(this).attr("onchange") != undefined) {
                    var checkState = eval($(this).attr("onchange"));
                    if (checkState != "success") {
                        change_error_style($(this), "add");
                        if (isSubmit) isSubmit = false;
                    } else {
                        change_error_style($(this), "remove");
                    }
                }
            });
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
        });
    };
    fn.hide = function (flag) {
        this.showing = false;
        removeShowDialog(this);
        var options = this.options;
        var me = this;
        var context = options.context || this;
        if (flag) context = this;
        var hideHandler = function () {
            options.onAfterHide.call(this);
            if (options.dispose) {
                me.dispose();
            }
        };
        this.dialog.removeClass("bounceInDown").addClass("fadeOutDown");
        if (options.fade) {
            this.dialog.fadeOut(options.timeOut, function () {
                if (me.overlay) {
                    me.overlay.fadeOut(options.timeOut, function () {
                        hideHandler.call(context);
                    });
                } else {
                    hideHandler.call(context);
                }
            });
        } else {
            this.dialog.hide();
            if (this.overlay) this.overlay.hide();
            hideHandler.call(context);
        }
        if (!options.isStick) {
            $('.dialog-overlay-left', parent.document).eq(0).remove();
            $('.dialog-overlay-top', parent.document).eq(0).remove();

            $('.dialog-nav-top', parent.document).eq(0).remove();
            $('.dialog-overlay-foot', parent.document).eq(0).remove();
        }
    };
    fn.doCallback = function (event) {
        if (this.validator) {
            if (!this.validator.checkStatus()) {
                return;
            }
        }
        if (!this.isSubmit) {
            $(".dialog-container form").unbind('submit');
            return false;
        }
        var options = this.options;
        var context = options.context || this;
        var flag = options.callback.call(context, event);
        if (flag === false) return;
        this.hide();
    };
    fn.beginMove = function (event) {
        this.moving = true;
        $body.addClass("dialog-moving");
        this.beginX = event.pageX;
        this.beginY = event.pageY;
        this.beginTop = this.position.top;
        this.beginLeft = this.position.left;
        var page = getViewport();
        this.pageWidth = page.width;
        this.pageHeight = page.height;
        //setActiveDialog(this);
    };
    fn.toMove = function (event) {
        if (!this.moving) return;
        event.preventDefault();
        var pageX = event.pageX;
        var pageY = event.pageY;
        var offsetX = pageX - this.beginX;
        var offsetY = pageY - this.beginY;
        var top = this.beginTop + offsetY;
        var left = this.beginLeft + offsetX;
        if (top < 0) top = 0;
        if (top > this.pageHeight - 32) top = this.pageHeight - 32;
        this.moveTop = top;
        this.moveLeft = left;
        this.setPosition({top: top + 110, left: left});
        if (this.dialog.next().css('display') == 'block') {
            this.setPosition({top: this.beginTop + 110, left: this.beginLeft});
        }
    };
    fn.endMove = function (event) {
        event.stopPropagation();
        if (!this.moving) return;
        this.moving = false;
        $body.removeClass("dialog-moving");
        delete this.beginX;
        delete this.beginY;
        delete this.beginTop;
        delete this.beginLeft;
        delete this.pageWidth;
        delete this.pageHeight;
    };
    fn.setIndex = function (oz, dz) {
        if (this.overlay.length) this.overlay.css("z-index", oz);
        this.dialog.css("z-index", dz);
    };
    fn.initComponents = function () {
        //当前先用此方法来进行弹窗内的组件初始化 需要修改
        var el = this.dialog;
        init(el);
        if (typeof(Datatable) !== "undefined") DataTable.init(el);
        if (typeof(FormValid) !== "undefined") FormValid.init(el);
        if (typeof(Tab) !== "undefined") Tab.init(el);
    };
    fn.dispose = function () {
        this.bind("off");
        this.dialog.remove();
        if (this.overlay) this.overlay.remove();
        if (this.iframeMode) {
            var iframeOnloadName = "iframeOnload" + this.id;
            //delete w[iframeOnloadName];
            w[iframeOnloadName] = null;
        }
    };

    function setActiveDialog(dialog) {
        removeShowDialog(dialog);
        lastIndex--;
        if (showDialogs.length == 0) {
            var l = showDialogs.length;
            var oz = lastIndex - 1;
            var dz = lastIndex;
            dialog.setIndex(oz, dz);
        }
        showDialogs.push(dialog);
    }

    function removeShowDialog(dialog) {
        for (var i = 0; i < showDialogs.length; i++) {
            if (showDialogs[i] == dialog) {
                showDialogs.splice(i, 1);
                break;
            }
        }
    }

    function getViewport() {
        return {
            width: d.documentElement && d.documentElement.clientWidth || d.body.clientWidth,
            height: d.documentElement && d.documentElement.clientHeight || d.body.clientHeight
        }
    }

    var toNum = function (num, def) {
        num = parseInt(num, 10);
        if (isNaN(num)) return def || 0;
        return num;
    };

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

    function readOptions(el) {
        var options = {};
        var config = [];
        for (var n in defaultOptions) {
            n = n.replace(/([A-Z])/g, "-$1").toLowerCase();
            config.push(n);
        }
        for (var i = 0, l = config.length; i < l; i++) {
            var n = config[i];
            var an = "data-" + n;
            if (n.indexOf('-') != -1) {
                n = (n.split('-')).map(function (v, i) {
                    if (i == 0) return v;
                    return v.charAt(0).toUpperCase() + v.substring(1, v.length);
                }).join('');
            }
            var val = el.attr(an);
            if (val) {
                if (val == "false") {
                    val = false;
                }
                else if (n.substr(0, 2) == "on") {
                    val = getCallback(val);
                }
                options[n] = val;
            }
        }
        return options;
    }

    if (!Array.prototype.map) {
        Array.prototype.map = function (f, oThis) {
            if (!f || f.constructor != Function.toString()) return;
            oThis = oThis || window;
            var a = [];
            for (var i = 0, len = this.length; i < len; i++) {
                a.push(f.call(oThis, this[i], i, this));
            }
            return a;
        }
    }

    function init(context) {
        var selector = '[data-component="dialog"]';
        context.find(selector).each(function () {
            var el = $(this);
            var options = readOptions(el);
            options.node = el;
            el.data("dialog", new Dialog(null, options));
        });
    }

    Dialog.init = init;
    $(function () {
        init($doc);
    });
    w.Dialog = Dialog;

    var confirmOptions = {
        top: 250,
        show: true,
        overlay: true,
        opacity: 0,
        title: "提示",
        buttonText: "确定",
        buttonCancelText: "取消",
        dispose: true,
        html: "<div class='confirm-content'>{{msg}}</div><div class='confirm-button'><a href='#' class='dialog-ok dialog-button dialog-submit'>{{buttonText}}</a><a href='#' class='dialog-close dialog-button dialog-cancel'>{{buttonCancelText}}</a></div>"
    };
    confirmOptions = $.extend({}, defaultOptions, confirmOptions);
    Dialog.confirm = function (msg, callback, options) {
        if (arguments.length < 2) {
            throw new Error("至少需要两个参数");
        }
        options = options || {};
        var options = $.extend({}, confirmOptions, options);
        var html = options.html.replace("{{msg}}", msg);
        html = html.replace("{{buttonText}}", options.buttonText);
        options.html = html.replace("{{buttonCancelText}}", options.buttonCancelText);
        options.callback = getCallback(callback);
        this.dialog = new Dialog(null, options);
    }

    var alertOptions = {
        top: 100,
        show: true,
        overlay: true,
        opacity: 0,
        title: "提示",
        buttonText: "确定",
        dispose: true,
        html: "<div class='alert-content'>{{msg}}</div><div class='alert-button'><a href='#' class='dialog-close dialog-button dialog-submit'>{{buttonText}}</a></div>"
    };
    alertOptions = $.extend({}, defaultOptions, alertOptions);
    Dialog.alert = function (msg, options) {
        options = options || {};
        var options = $.extend({}, alertOptions, options);
        var html = options.html.replace("{{msg}}", msg);
        options.html = html.replace("{{buttonText}}", options.buttonText);
        this.dialog = new Dialog(null, options);
    }
})(window, document);