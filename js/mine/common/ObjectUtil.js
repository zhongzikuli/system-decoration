ObjectUtil = {
	/*
	 * 从list中根据keyName属性，获取值等于keyValue的对象
	 * 如从列表中取id=100的对象，可以 getDataFormList(list,'id',100);
	 */
	getDataFromList:function(list, keyName, keyValue){
		var result = null;
		$.each(list,function(index, row){
			var v = row[keyName];
			if(v==keyValue){
				result = row;
			}
		});
		return result;
	}
};