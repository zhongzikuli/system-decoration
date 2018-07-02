StringUtil = {
    getText: function (list, key) {
        var text = key;
        for (var i in list) {
            if (list[i].flexvalue == key) {
                text = list[i].valueDescription;
                break;
            }
        }
        return text;
    },
    trimNull: function (exp) {
        if (!exp && typeof exp != "undefined" && exp != 0) return "";
        else return exp;
    },

    /**
     * 去掉字符串左右空格
     */
    trim: function (str) {

        return (!str) ? '' : str.replace(/(^\s*)|(\s*$)/g, '');
    },

    /**
     * 去掉左边空格
     */
    leftTrim: function (str) {

        return (!str) ? '' : str.replace(/(^\s*)/g, '');
    },

    /**
     * 去掉右边空格
     */
    rightTrim: function (str) {

        return (!str) ? '' : str.replace(/(\s*$)/g, '');
    },

    /**
     * 获取字符串长度
     */
    length: function (str) {

        return str.replace(/[^\x00-\xff]/g, 'aaa').length;
    },

    /**
     * 检查邮箱格式
     */
    isEmail: function (email) {
        var regu = "^(([0-9a-zA-Z]+)|([0-9a-zA-Z]+[_.0-9a-zA-Z-]*))@([a-zA-Z0-9-]+[.])+([a-zA-Z]{2}|net|com|gov|mil|org|edu|int|name|asia)$";

        return (email.search(new RegExp(regu)) == -1) ? false : true;
    },

    /**
     * 检查字段是否为空
     */
    isNull: function (exp) {

        return !exp && typeof exp != "undefined" && exp != 0;
    },

    /**
     * 检查手机号码
     */
    isPhone: function (mobile) {
        var reg0 = /^13\d{5,9}$/;
        var reg1 = /^153\d{8}$/;
        var reg2 = /^159\d{8}$/;
        var reg3 = /^158\d{8}$/;
        var reg4 = /^150\d{8}$/;
        var reg5 = /^155\d{8}$/;
        var reg6 = /^189\d{8}$/;
        var reg7 = /^186\d{8}$/;
        var reg8 = /^188\d{8}$/;
        var reg9 = /^187\d{8}$/;
        var reg10 = /^183\d{8}$/;

        var mo = false;
        if (reg0.test(mobile)) mo = true;
        if (reg1.test(mobile)) mo = true;
        if (reg2.test(mobile)) mo = true;
        if (reg3.test(mobile)) mo = true;
        if (reg4.test(mobile)) mo = true;
        if (reg5.test(mobile)) mo = true;
        if (reg6.test(mobile)) mo = true;
        if (reg7.test(mobile)) mo = true;
        if (reg8.test(mobile)) mo = true;
        if (reg9.test(mobile)) mo = true;
        if (reg10.test(mobile)) mo = true;

        return mo ? "true" : false;
    },


    /**
     * URL检查
     */
    isURL: function (url) {
        var ex = /([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;

        return (new RegExp(ex).test(url) == true) ? true : false;
    },
    showKeyPress: function (evt) {
        evt = (evt) ? evt : window.event;
        return StringUtil.checkSpecificKey(evt.keyCode);
    },
    checkSpecificKey: function (keyCode) {
        var specialKey = "><";//Specific Key list
        var realkey = String.fromCharCode(keyCode);
        var flg = false;
        flg = (specialKey.indexOf(realkey) >= 0);
        if (flg) {
            return false;
        }
        return true;
    },
    displayIDCard: function (str, frontLen, endLen) {
        var firstLen = 0;
        var second = 0;
        var last = 0;
        var result = "";
        if (str.length < frontLen) {
            firstLen = str.length;
            second = 0;
            last = 0;
        } else if (str.length < frontLen + endLen) {
            firstLen = frontLen;
            last = str.length - frontLen;
            second = 0;
        } else {
            firstLen = frontLen;
            last = endLen;
            second = str.length - frontLen - endLen;
        }
        for (var i = 0; i < firstLen; i++) {
            result += '*';
        }
        for (var i = 0; i < second; i++) {
            result += str.charAt(firstLen + i);
        }
        for (var i = 0; i < last; i++) {
            result += '*';
        }
        return result;
    }
};
