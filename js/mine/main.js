$(document).ready(function () {
    $(document).on("click", function () {
        $(".J_iframe").contents().find(".btn-box").hide();
        $(".J_iframe").contents().find(".btn-search").children('i').removeClass('fa-caret-down').addClass('fa-caret-up');
        $(".J_iframe").contents().find('.laydate_box').hide();
    });

    //默认出发第一个菜单
    $($("#side-menu").find(".J_menuItem").get(0)).trigger("click");
    //换肤

    var skin = "";
    setSkin();

    function setSkin() {
        skin = localStorage.getItem("skin");
        if (skin) {
            if (skin == 'blue') {
                $("#wrapper").removeClass();
            } else {
                $("#wrapper").addClass(skin);
            }
        } else {
            skin = "blue";
            localStorage.setItem("skin", skin);
        }
    }

    $(".change-color-btn").on("click", function () {
        skin = $(this).attr("data-color");
        localStorage.setItem("skin", skin);
        refresh()
    });

    // MetsiMenu
    $('#side-menu').metisMenu();

    //固定菜单栏
    $(function () {
        $('.sidebar-collapse').slimScroll({
            height: '100%',
            railOpacity: 0.9,
            alwaysVisible: false
        });
    });

    //移入显示小程序二维码
    $(".mini-program").hover(function (e) {
        var offright = $(".navbar-top-links").width() - 35;
        $(".program-box").removeClass("hidden").css("right", offright);
    }, function (e) {
        $(".program-box").addClass("hidden");
    });

    // 菜单切换
    $('.navbar-minimalize').click(function () {
        $("body").toggleClass("mini-navbar");
        SmoothlyMenu();
    });

    function mouseIn() {
        $(".menu_item").hover(function (e) {
            var _top = $(this).offset().top;
            var _text = $(this).find('.nav-label').html();
            var textLen = _text.length;
            if (/App/i.test(_text)) {
                textLen = textLen - 1
            }
            var _width = textLen * 14;
            if (textLen == 2) {
                _width = textLen * 16 + 5;
            }
            $('.navbar-minimalize-tip').css({
                'top': _top,
                'left': ($(this).width() + 22) + "px",
                'width': _width + 5
            }).html(_text).show();
            e.stopPropagation();
        }, function (e) {
            $('.navbar-minimalize-tip').hide();
            e.stopPropagation();
        });
    }

    function mouseOut() {
        $(".menu_item").off('mouseenter').unbind('mouseleave');
    }

    //监听屏幕宽度
    $(window).bind("load resize", function () {
        var winHeight = $(this).height();
        var winWidth = $(this).width();
        $(".sidebar").height(winHeight);
        $("#page-wrapper", parent.document).width(winWidth - $(".sidebar").width());
        if (winWidth < 1280) {
            $('body').addClass('mini-navbar');
            $('.navbar-static-side').fadeIn();
        }
        SmoothlyMenu();
    });

    function SmoothlyMenu() {
        if ($('body').hasClass('mini-navbar')) {
            $(".nav-header").children("img").attr("src", ctx + "/images/logo-small.png").css("width", 70);
            $('#side-menu').hide();
            setTimeout(
                function () {
                    $('#side-menu').fadeIn(500);
                }, 100);
            mouseIn()
        } else if ($('body').hasClass('fixed-sidebar')) {
            $(".nav-header").children("img").attr("src", ctx + "/images/logo-large.png").css("width", 170);
            $('#side-menu').hide();
            setTimeout(
                function () {
                    $('#side-menu').fadeIn(500);
                }, 300);
            mouseOut();
        }
    }

    //点击页面iframe区域关闭dropDown
    $(document, ".J_iframe").ready(function () {
        $(".J_iframe").contents().find("body").attr("onclick", "parent.iframeClick()");
    });

    $(".changePsd-btn").on("click", function () {
        changePassword();
    });

    function changePassword() {
        var sessionScope = $("#userInfo").val();
        if (sessionScope == null) {
            location.href = ctx + '/logout.action';
        }
        var options = {
            width: 400,
            top: 240,
            height: 200,
            overlay: true,
            move: true,
            dispose: true,
            title: '修改密码',
            url: "",
            callback: function () {
                var dateString = new Date().getTime();
                if ($("#changePwdForm").valid("changePwdForm")) {
                    $.ajax({
                        url: ctx + "/user/changePwd.action",
                        type: "post",
                        data: {
                            userId: $("#userId").val(),
                            password: $("#login-password").val(),
                            salt: dateString
                        },
                        async: true,
                        dataType: "jsonp",
                        success: function (data) {
                            if (data.error == 1) {
                                successMsg("修改密码成功", 1000);
                            } else if (data.error == -100) {
                                faildMsg("会话超时，请重新登陆！");
                            } else {
                                faildMsg(data.message);
                            }
                        }
                    });
                } else {
                    return false;
                }
            }
        };
        var editDlg = new Dialog("#change-password-dialog", options);
        editDlg.show();
    }

    $(".logOut-btn").on("click", function () {
        HQdecorate.confirmDialog("您确定要退出本系统吗?", true, {}, function () {
            location.href = ctx + '/logout.action';
        });
    });

    function refresh() {
        window.location.reload();
    }
});

function iframeClick() {
    $(".dropdown").removeClass("open");
    $(".roll-nav").removeClass("open");
}

/**
 * 表单验证
 */
function validSealForm(lableId) {
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $(lableId).val() == "") {
            if ($(lableId).attr("id") == "login-password") {
                $(lableId).attr('tip', '登录密码为空，请重新输入。');
                return "faild";
            } else if ($(lableId).attr("id") == "login-password-again") {
                $(lableId).attr('tip', '密码确认为空，请重新输入。');
                return "faild";
            }
            return "success";
        }
        //2、判断格式
        if (null != $(lableId).val() && $(lableId).val() != "") {
            if ($(lableId).attr("id") == "login-password") {
                if (!(/^.{6,20}$/).exec($(lableId).val())) {
                    $(lableId).attr('tip', '密码长度应在6~~20个字符之间。');
                    return "faild";
                } else {
                    return "success";
                }
            }
            if ($(lableId).attr("id") == "login-password-again") {
                if ($("#login-password").val().toString() != $(lableId).val().toString()) {
                    $(lableId).attr('tip', '两次的密码不一致，请重新输入。');
                    return "faild";
                } else {
                    return "success";
                }
            }
            return "success";
        }
        return "success";
    }
}
