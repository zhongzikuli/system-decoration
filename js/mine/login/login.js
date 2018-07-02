$(function () {
    var ua = navigator.userAgent.toLocaleLowerCase();
    var browserType = null;
    if (ua.match(/chrome/) != null) {
        var is360 = _mime("type", "application/vnd.chromium.remoting-viewer");

        if (is360) {
            browserType = '360';
        } else {
            browserType = "chrome";
        }
    }
    if (browserType != "chrome") {
        $(".login-form .col-xs-12:last-of-type").show();
    }else{
        $(".login-form .col-xs-12:last-of-type").hide();
    }

    $(".down-btn").on("click", function () {
        try {
            var elemIF = document.createElement("iframe");
            elemIF.src = " http://116.62.235.182:8888/group1/M00/00/02/rBAhJVnoXSeANgwmAsUGaEkU18Y871.exe";
            elemIF.style.display = "none";
            document.body.appendChild(elemIF);
        } catch (e) {

        }
    });

    if ($.cookie("save-btn") == "true") {
        $("#usercode").val($.cookie("usercode"));
        $("#pwd").val($.cookie("pwd"));
        $("#save-btn").attr('checked', 'true');
    }

    function _mime(option, value) {
        var mimeTypes = navigator.mimeTypes;
        for (var mt in mimeTypes) {
            if (mimeTypes[mt][option] == value) {
                return true;
            }
        }
        return false;
    }

    if (window.top !== window.self) {
        window.top.location = window.location
    }

});


function randomcodeRefresh() {
    var $img = $('#randomcode_img');
    var _src = $img.attr('src').split('?')[0];
    var dateString = new Date().getTime();
    var new_src = _src + '?c=' + dateString;
    $img.attr('src', new_src);
}


function checkForm() {
    var flag = true;
    var _tips = $("#tips");
    var _error = _tips.find(".error");
    var message = $("#hiddenMessage").val();
    if (message != "null" && message != "") {
        _error.text(message);
        $("#tips").css("display", "flex");
        flag = false;
    }
    return flag;
}

function userLogin() {
    var _tips = $("#tips");
    var _error = _tips.find(".error");
    var username = $("#usercode").val();
    var password = $("#pwd").val();
    var randomcode = $("#randomcode").val();
    if (!username) {
        _error.text("账号不能为空");
        $("#tips").css("display", "flex");
        return false;
    }
    if (!password) {
        _error.text("密码不能为空");
        $("#tips").css("display", "flex");
        return false;
    }
    if (!randomcode) {
        _error.text("验证码不能为空");
        $("#tips").css("display", "flex");
        return false;
    }
    return true;
}


