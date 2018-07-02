var regEx = {
    tip_arrow: ctx + "/images/tip_arrow.png",
    SHOW_TIME: 0,
    HIDE_TIME: 0,
    email: "^[\\w-]+(\\.[\\w-]+)*@[\\w-]+(\\.[\\w-]+)+$",
    int: "^-?\\d+$",
    float: "^(-?\\d+)(\\.\\d+)?$",
    p_float: "^(\\d{0,2},?\\d{0,3},?\\d{1,3})(\\.\\d+)?$",
    string: "^[a-zA-Z0-9_]+$",
    url: "^(http|https|ftp)\\://[a-zA-Z0-9\\-\\.]+\\.[a-zA-Z]{2,3}(:[a-zA-Z0-9]*)?/?([a-zA-Z0-9\\-\\._\\?\\,\\'/\\\\+&%\$#\\=~])*$",
    not_null: "\.+",
    _null: "\\n[\\s| ]*\\r",
    letter: "^\\w+$",
    letter_or_int: "^[A-Za-z0-9]+$",
    china: "[\\u4e00-\\u9fa5]+",
    china_english: "^[a-zA-Z\\u4e00-\\u9fa5]+$",
    html: "<(.*)>.*<\/.+>|<(.*) \/>",
    trim: "(^\\s*)|(\\s*$)",
    phone11: "^[1]{1}[3,4,5,6,7,8,9]{1}[0-9]{9}$",
    idCard: "^[0-9]{15}$|^[0-9]{17}([0-9]{1}|X|x)$"
};


$('body').append('<p id="v-tip" style="display:none;"><img src="' + regEx.tip_arrow + '"/><a></a></p>');

function validate(obj) {
    var validata = obj.attr("obj");
    if (validata == null || validata == "undefined") {
        validata = obj.attr("reg");
    }
    var tipMsg = "";
    switch (validata) {
        case 'email':
            validata = regEx.email;
            tipMsg = "请输入正确的Email";
            break;
        case 'string':
            validata = regEx.string;
            break;
        case 'int':
            validata = regEx.int;
            tipMsg = "请输入整型数据";
            break;
        case 'float':
            tipMsg = "请输入有效数据";
            validata = regEx.float;
            break;
        case 'p_float':
            tipMsg = "请输入小于八位的有效数据";
            validata = regEx.p_float;
            break;
        case 'url':
            tipMsg = "请输入正确的url";
            validata = regEx.url;
            break;
        case 'not_null':
            tipMsg = "不能为空，请重新输入";
            validata = regEx.not_null;
            break;
        case 'null':
            validata = regEx._null;
            tipMsg = "不能输入，请删除";
            break;
        case 'letter':
            validata = regEx.letter;
            tipMsg = "请输入英文字母";
            break;
        case 'letter+int':
            validata = regEx.letter_or_int;
            tipMsg = "请输入英文字母或数值";
            break;
        case 'china':
            validata = regEx.china;
            tipMsg = "请输入中文字符";
            break;
        case 'china_english':
            validata = regEx.china_english;
            tipMsg = "请输入中文或英文字符";
            break;
        case 'html':
            validata = regEx.html;
            tipMsg = "请输入html";
            break;
        case 'phone11':
            tipMsg = "请输入正确的手机号码";
            validata = regEx.phone11;
            break;
        case 'idCard':
            tipMsg = "请输入正确的身份证号码";
            validata = regEx.idCard;
            break;
        default:
            break;
    }
    //第七页添加结束
    var reg = new RegExp(validata);
    var objValue = $.trim(obj.val());
    if (!reg.test(objValue)) {
        change_error_style(obj, "add");
        change_tip(obj, ("" != tipMsg ? tipMsg : null), "add");
        return false;
    } else {
        if (obj.attr("url") == undefined) {
            change_error_style(obj, "remove");
            change_tip(obj, null, "remove");
            if (obj.attr("obj") == 'idCard'){
                return true && idCard(objValue,obj,tipMsg);
            }
            return true;
        } else {
            if (obj.attr("obj") == 'idCard'){
                return ajax_validate(obj) && idCard(objValue,obj,tipMsg);
            }
            return ajax_validate(obj);
        }
    }
}

/**
 * 身份证逻辑校验
 * @param code 身份证号码
 * @returns {boolean}
 * @author huming
 * @date 2018/6/26 17:58
 */
function idCard(code,obj,tipMsg) {
    var city = {
                1: "北京", 12: "天津", 13: "河北", 14: "山西",
                15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ",
                31: "上海", 32: "江苏", 33: "浙江", 34: "安徽",
                35: "福建", 36: "江西", 37: "山东", 41: "河南",
                42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西",
                46: "海南", 50: "重庆", 51: "四川", 52: "贵州",
                53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃",
                63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾",
                81: "香港", 82: "澳门", 91: "国外 "
                };
    var pass = true;

    if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
        pass = false;
    }

    else if (!city[code.substr(0, 2)]) {
        pass = false;
    }
    else {
        //18位身份证需要验证最后一位校验位
        if (code.length == 18) {
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            //校验位
            var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++) {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }
            var last = parity[sum % 11];
            if (parity[sum % 11] != code[17]) {
                pass = false;
            }
        }
    }

    if (!pass){
        change_error_style(obj, "add");
        change_tip(obj, ("" != tipMsg ? tipMsg : null), "add");
    }
    return pass;
}

function ajax_validate(obj) {
    var url_str = obj.attr("url");

    if (!url_str) {
        return false;
    }
    var param = "";
    if (typeof(obj.attr("param")) != "undefined" && "" != obj.attr("param") && null != obj.attr("param")) {
        param = obj.attr("param");
    }
    if (url_str.indexOf("?") != -1) {
        url_str = url_str + "&" + ("" != param ? param + "&" : "") + obj.attr("name") + "=" + obj.val();
    } else {
        url_str = url_str + "?" + ("" != param ? param + "&" : "") + obj.attr("name") + "=" + obj.val();
    }
    var feed_back = $.ajax({url: url_str, cache: false, async: false}).responseText;
    feed_back = feed_back.replace(/(^\s*)|(\s*$)/g, "");
    if (feed_back == 'success') {
        change_error_style(obj, "remove");
        change_tip(obj, null, "remove");
        return true;
    } else {
        change_error_style(obj, "add");
        change_tip(obj, feed_back, "add");
        return false;
    }
}

function change_tip(obj, msg, action_type) {
    if (obj.attr("tip") == undefined) {//初始化判断TIP是否为空
        obj.attr("is_tip_null", "yes");
    }
    if (action_type == "add") {
        if (obj.attr("is_tip_null") == "yes") {
            obj.attr("tip", msg);
        } else {
            if (msg != null) {
                if (obj.attr("tip_bak") == undefined) {
                    obj.attr("tip_bak", obj.attr("tip"));
                }
                obj.attr("tip", msg);
            }
        }
    } else {
        if (obj.attr("is_tip_null") == "yes") {
            obj.removeAttr("tip");
            obj.removeAttr("tip_bak");
        } else {
            obj.attr("tip", obj.attr("tip_bak"));
            obj.removeAttr("tip_bak");
        }
    }
}

function change_error_style(obj, action_type) {
    if (action_type == "add") {
        obj.addClass("validation-error");
    } else {
        obj.removeClass("validation-error");
    }
}

$.fn.validate_callback = function (msg, action_type, options) {
    this.each(function () {
        if (action_type == "failed") {
            change_error_style($(this), "add");
            change_tip($(this), msg, "add");
        } else {
            change_error_style($(this), "remove");
            change_tip($(this), null, "remove");
        }
    });
};


function validateLength100Bak(_this) {
    var bak = $(_this).val();
    if (!bakLimitLength100(bak)) {
        $(_this).attr("tip", "长度不能超过100个字符 ");
        return "faild";
    } else {
        return "success";
    }
}

function bakLimitLength100(value) {
    return value.length <= 100;
}
