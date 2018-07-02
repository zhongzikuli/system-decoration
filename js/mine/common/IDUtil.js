//----------------------------------------------------------
//    功能：根据身份证号获得出生日期
//   参数：身份证号 IdNO
//    返回值：
//    出生日期
//----------------------------------------------------------
function getBirthday(IdNO){
	var birthdayno,birthdaytemp;
	if(IdNO.length==18){
		birthdayno=IdNO.substring(6,14);
	}else if(IdNO.length==15){
		birthdaytemp=IdNO.substring(6,12);
		birthdayno="19"+birthdaytemp;
	}else{
		return false;
	}
	var birthday=birthdayno.substring(0,4)+"-"+birthdayno.substring(4,6)+"-"+birthdayno.substring(6,8);
	return birthday;
}

//----------------------------------------------------------
//功能：根据身份证号获得性别
//参数：身份证号 IdNO
//返回值：1: 男，0：女
//性别
//----------------------------------------------------------
function getSex(IdNO){
	if(IdNO.length==18){
		return IdNO.slice(14,17) % 2 ? "1" : "0";
	}else if(IdNO.length==15){
		return IdNO.slice(11,14) % 2 ? "1" : "0";
	}else{
		return false;
	}
}