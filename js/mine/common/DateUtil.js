DateUtil = {
		
		/**
		 * 日期对象转为"yyyy-mm-dd"格式文本
		 * @param {Date} oDate
		 * @return {String} yyyy-mm-dd
		 */
		toYYYYMMDD: function(oDate) {
			if(!oDate) return "";
			if(StringUtil.isNull(oDate)) return "";
			if(oDate.length == 0) return "";
			var regEx = new RegExp("\\-","gi");
			oDate=oDate.replace(regEx,"/");
			var sDate = new Date(oDate);
			  var sMonth = (sDate.getMonth() + 1).toString();
			  var sDay = (sDate.getDate()).toString();
			  if(sMonth.length < 2) sMonth = '0' + sMonth; 
			  if(sDay.length < 2) sDay = '0' + sDay; 
			  
			  return sDate.getFullYear() + '-' + sMonth + '-' + sDay;
		},
		toYYYYMMDD2: function(oDate) {
			if(!oDate) return "";
			if(StringUtil.isNull(oDate)) return "";
			  var sMonth = (oDate.getMonth() + 1).toString();
			  var sDay = (oDate.getDate()).toString();
			  if(sMonth.length < 2) sMonth = '0' + sMonth; 
			  if(sDay.length < 2) sDay = '0' + sDay; 
			  
			  return oDate.getFullYear() + '-' + sMonth + '-' + sDay;
		},
		toYYYYMMDD3: function(oDate) {
			/**
			 * 日期对象转为"yyyy/mm/dd"格式文本-index.html的记账日期格式化使用
			 * @param {Date} oDate
			 * @return {String} yyyy/mm/dd
			 */
			if(!oDate) return "";
			if(StringUtil.isNull(oDate)) return "";
			if(oDate.length == 0) return "";
			var regEx = new RegExp("\\-","gi");
			oDate=oDate.replace(regEx,"/");
			var sDate = new Date(oDate);
			var sMonth = (sDate.getMonth() + 1).toString();
			var sDay = (sDate.getDate()).toString();
			if(sMonth.length < 2) sMonth = '0' + sMonth; 
			if(sDay.length < 2) sDay = '0' + sDay; 
			return sDate.getFullYear() + '/' + sMonth + '/' + sDay;
		},
		toYYYYMMDDHHmmss: function(oDate) {
			if(StringUtil.isNull(oDate))return "";
			var regEx = new RegExp("\\-","gi");
			oDate=oDate.replace(regEx,"/");
			var sDate = new Date(oDate);
			  var sMonth = (sDate.getMonth() + 1).toString();
			  var sDay = (sDate.getDate()).toString();
			  var sHour = (sDate.getHours()).toString();
			  var sMinute = (sDate.getMinutes()).toString();
			  var sSecond = (sDate.getSeconds()).toString();
			  if(sMonth.length < 2) sMonth = '0' + sMonth; 
			  if(sDay.length < 2) sDay = '0' + sDay; 
			  if(sHour.length<2) sHour ='0'+sHour;
			  if(sMinute.length<2) sMinute ='0'+sMinute;
			  if(sSecond.length<2) sSecond ='0'+sSecond;
			  return sDate.getFullYear() + '-' + sMonth + '-' + sDay + ' '+sHour+':'+sMinute+':'+sSecond;
		},
		
		toHHmmss: function(oDate) {
			if(StringUtil.isNull(oDate))return "";
			var regEx = new RegExp("\\-","gi");
			oDate=oDate.replace(regEx,"/");
			var sDate = new Date(oDate);
			  var sMonth = (sDate.getMonth() + 1).toString();
			  var sDay = (sDate.getDate()).toString();
			  var sHour = (sDate.getHours()).toString();
			  var sMinute = (sDate.getMinutes()).toString();
			  var sSecond = (sDate.getSeconds()).toString();
			  if(sMonth.length < 2) sMonth = '0' + sMonth; 
			  if(sDay.length < 2) sDay = '0' + sDay; 
			  if(sHour.length<2) sHour ='0'+sHour;
			  if(sMinute.length<2) sMinute ='0'+sMinute;
			  if(sSecond.length<2) sSecond ='0'+sSecond;
			  return sHour+':'+sMinute+':'+sSecond;
		},
		/**
		 * 取得年份
		 * @param {Date|String} oDate，支持yyyy-mm-dd格式
		 * @return {Int} 四位年份
		 */
		getYear: function(oDate) {
			if (typeof oDate == 'string') return parseInt(oDate.split('-')[0],10);
			
			return oDate.getFullYear();
		},
		
		/**
		 * 取得月份值(0-11)
		 * @param {Date|String} oDate，支持yyyy-mm-dd格式
		 * @return {Int} 月份值
		 */
		getMonth: function(oDate) {
			if(typeof oDate == 'string') return parseInt(oDate.split('-')[1],10)-1;
			
			return oDate.getMonth();
		},
		
		/**
		 * 取得月的天数(1-31)
		 * @param {Date|String} oDate，支持yyyy-mm-dd格式
		 * @return {Int} 天数
		 */
		getMonthDay: function(oDate) {
			if(typeof oDate == 'string') return parseInt(oDate.split('-')[2],10);
			
			return oDate.getDate();
		},
		
		/**
		 * 取得小时数(0-23)
		 * @param {Date} oDate
		 * @return {Int} 小时数
		 */
		getHours:function(oDate) {
			
			return oDate.getHours();
		},
		
		/**
		 * 取得分钟数(0-59)
		 * @param {Date} oDate
		 * @return {Int} 分钟数
		 */
		getMinutes:function(oDate) {
			
			return oDate.getMinutes();
		},
		
		/**
		 * 是否是“yyyy=mm-dd”日期字符串
		 * @param {String} sDate
		 * @return {Boolean} 是或否
		 */
		isYYYYMMDD: function(sDate) {
			if(!sDate || typeof sDate != 'string') return false;
			//fuck,js不支持yyyy-MM-dd格式的parse，支持yyyy/MM/dd的格式
			if(!(new RegExp (/^(\d{1,4})(-)(\d{1,2})\2(\d{1,2})$/)).test(sDate)) return false;
			
			var y = this.getYear(sDate);
			if(y < 1970) return false;
			var m = this.getMonth(sDate);
			if(m < 0 || m > 11) return false;
			var d = this.getMonthDay(sDate);
			if(d < 1 || d > 31) return false;
			
			return true;
		},
		
		/**
		 * "yyyy-mm-dd"转换为日期对象。
		 * @param {Object} sYMD "yyyy-mm-dd"格式日期
		 * @return {Date}
		 */
		toDate: function(sYMD) {
			if(!this.isYYYYMMDD(sYMD)) return null;
			
			return new Date(this.getYear(sYMD), this.getMonth(sYMD), this.getMonthDay(sYMD));
		},
		
		/**
		 * 比较两个日期的数值差
		 * @param {Date|String} oDate1
		 * @param {Date|String} oDate2
		 * @return {Int} 两个日期的毫秒差值
		 */
		compare: function(oDate1, oDate2) {
			if(!oDate1 || !oDate2) return null;
			var o1 = (typeof oDate1 == 'string')?this.toDate(oDate1):oDate1;
			var o2 = (typeof oDate2 == 'string')?this.toDate(oDate2):oDate2;
			
			return Date.parse(o1) - Date.parse(o2);
		},
		
		/**
		 * 取得某年某月的最大天数：[1-31]
		 * @param {Int} iYear 四位整数
		 * @param {Int} iMonth 整数：[0-11]
		 * @return {Int} 最大天数
		 */
		getMaxDay:function(iYear,iMonth) {
			
			return new Date(iYear, iMonth+1, 0).getDate();
		},
		/*
		 * 获取某月第一天
		 */
		getFirstDay:function(iYear,iMonth){
			return new Date(iYear, iMonth+1, 0);
		},
		
		getThisMonthFirstDayString:function(){
			var oDate = new Date();
			return oDate.getFullYear()+"-"+(oDate.getMonth()+1)+"-1";
		},
		
		addMonths : function(sDate, num){
			var aYmd = sDate.split("-");
			var sYear = parseInt(aYmd[0]);
			var sMonth = parseInt(aYmd[1]) + 1;
			var sDay = parseInt(aYmd[2]);
			
			var eYear = sYear;
			var eMonth = sMonth + parseInt(num);
			var eDay = sDay;
			while(eMonth > 12){
				eYear++;
				eMonth -=12;
			}
			var eDate = new Date(eYear, eMonth-1, eDay);
			while(eDate.getMonth() != eMonth-1){
				eDay--;
				//eDate = new Date(eYear,eMonth-1,eDay);
			}
			return eYear + '-' + eMonth + '-' + eDay;
		},

		//加减几个月
		addOrSubMonth : function(sDate, num){
			var aYmd = sDate.split("-");
			var sYear = parseInt(aYmd[0]);
			var sMonth = parseInt(aYmd[1]);
			var sDay = parseInt(aYmd[2]);

			var eYear = sYear;
			var eMonth = sMonth + parseInt(num);
			var eDay = sDay;
			while(eMonth > 12){
				eYear++;
				eMonth -=12;
			}
			if(eYear%4 == 0 && eMonth==2 && eDay>29){
				eDay = 29;
			}
			if(eYear%4 != 0 && eMonth==2 && eDay>28){
				eDay = 28;
			}
			var eDate = new Date(eYear, eMonth-1, eDay);
			while(eDate.getMonth() != eMonth-1){
				eDay--;
				//eDate = new Date(eYear,eMonth-1,eDay);
			}
			return eYear + '-' + eMonth + '-' + eDay;
		},

		//两个日期相差的月数
		diffMonths : function(sDate, eDate){
			var sYmd = sDate.split("-");
			var sYear = parseInt(sYmd[0]);
			var sMonth = parseInt(sYmd[1]);
			var sDay = parseInt(sYmd[2]);

			var eYmd = eDate.split("-");
			var eYear = parseInt(eYmd[0]);
			var eMonth = parseInt(eYmd[1]);
			var eDay = parseInt(eYmd[2]);

			var len = (eYear - sYear) * 12 + eMonth - sMonth;
			var days = eDay - sDay;
			if (days < 0) {
				len -= 1;
			}
			return len;
		},

		//加减天数
		addDays : function(date, days) {
			var d = new Date(date);
			d.setDate(d.getDate() + days);
			var m = d.getMonth() + 1;
			return d.getFullYear() + "-" + m + "-" + d.getDate();
		},

		formatterDate : function(date){
			var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
			var month = (date.getMonth()+1) > 9 ? (date.getMonth() + 1) : "0" + (date.getMonth()+1);
			return date.getFullYear() + '-' + month + '-' + day;
		}
		
	};

//用法(new Date()).pattern("yyyy-MM-dd HH:mm:ss.S")
Date.prototype.pattern=function(fmt) {           
    var o = {           
    "M+" : this.getMonth()+1, //月份           
    "d+" : this.getDate(), //日           
    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时           
    "H+" : this.getHours(), //小时           
    "m+" : this.getMinutes(), //分           
    "s+" : this.getSeconds(), //秒           
    "q+" : Math.floor((this.getMonth()+3)/3), //季度           
    "S" : this.getMilliseconds() //毫秒           
    };           
    var week = {           
    "0" : "/u65e5",           
    "1" : "/u4e00",           
    "2" : "/u4e8c",           
    "3" : "/u4e09",           
    "4" : "/u56db",           
    "5" : "/u4e94",           
    "6" : "/u516d"          
    };           
    if(/(y+)/.test(fmt)){           
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));           
    }           
    if(/(E+)/.test(fmt)){           
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);           
    }           
    for(var k in o){           
        if(new RegExp("("+ k +")").test(fmt)){           
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));           
        }           
    }           
    return fmt;           
};