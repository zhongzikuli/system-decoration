UrlUtil={
	getQueryString:function (name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]); return null;
	},
	UrlParamsFormat:function (name) {
		/**
		 * 该方法转换的是URL中参数的编码，不是整个URL的编码
		 * 如：
		 * var url = "sanding/fdfs/downloadFile.action?fileName=";
		 * url += UrlUtil.UrlParamsFormat(c + 123.txt);
		 * 之后URL将会变为……fileName=c%20%2B%20123.txt
		 * 注：空格和/url会自己识别，这里不做转换
		 */
		name = name.replace(/\+/g, "%2B"); //URL中，+表示空格，所以将+号转为URL识别的字符——%2B
		name = name.replace(/\?/g, "%3F"); //URL中，?分割URL和参数，所以将?号转为URL识别的字符——%3F
		name = name.replace(/\#/g, "%23"); //URL中，#表示书签，所以将#号转为URL识别的字符——%23
		name = name.replace(/\&/g, "%26"); //URL中，&表示参数分隔符，所以将&号转为URL识别的字符——%26
		name = name.replace(/\=/g, "%3D"); //URL中，=表示指定参数的值，所以将=号转为URL识别的字符——%3D
		return name;
	}
};
