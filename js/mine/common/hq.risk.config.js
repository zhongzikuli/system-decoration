HQdecorate.TDConfig={
	types:[{
		name	: 'black_list',
		desc	: '风险名单规则'
	},{
		name	: 'grey_list',
		desc	: '关注名单规则'
	},{
		name	: 'fuzzy_black_list',
		desc	: '模糊证据库规则'
	},{
		name	: 'custom_list',
		desc	: '自定义列表规则'
	},{
		name	: 'association_industry',
		desc	: '关联行业类型规则'
	},{
		name	: 'association_partner',
		desc	: '关联合作方规则'
	},{
		name	: 'discredit_count',
		desc	: '信贷逾期统计规则'
	},{
		name	: 'frequency_one_dim',
		desc	: '频度规则单维度'
	},{
		name	: 'frequency_distinct',
		desc	: '频度规则关联个数'
	},{
		name	: 'proxy_ip',
		desc	: '代理IP规则'
	}],
	dimTypes	: [{
		type	: 'account_login',
		desc	: '登陆账号'
	},{
		type	: 'id_number',
		desc	: '身份证'
	},{
		type	: 'contact1_id_number',
		desc	: '身份证'
	},{
		type	: 'contact2_id_number',
		desc	: '身份证'
	},{
		type	: 'contact3_id_number',
		desc	: '身份证'
	},{
		type	: 'contact4_id_number',
		desc	: '身份证'
	},{
		type	: 'contact5_id_number',
		desc	: '身份证'
	},{
		type	: 'contact6_id_number',
		desc	: '身份证'
	},{
		type	: 'account_mobile',
		desc	: '手机号码'
	},{
		type	: 'ip_address',
		desc	: 'ip地址'
	},{
		type	: 'ext_address',
		desc	: '扩展地址'
	}],
	getDimTypeName : function(dimType){
		var types = HQdecorate.TDConfig.dimTypes;
		for(var i = 0; i < types.length; i++){
			var type = types[i]["type"];
			if( type == dimType ){
				return types[i]["desc"];
			}
		}
	},
	getTypeName	: function(type){
		var types = HQdecorate.TDConfig.types;
		for(var i = 0; i < types.length; i++){
			var name = types[i]["name"];
			if( name == type ){
				return types[i]["desc"];
			}
		}
	},
	getFieldName: function(type, field){
		var items = HQdecorate.TDConfig.items;
		for(var i = 0; i < items.length; i++){
			if( items[i]["type"] == type ){
				for (var j = 0; j < items[i]["fields"].length; j++) {
					var f = items[i]["fields"][j]['field'];
					if(field == f){
						return items[i]["fields"][j]["desc"];
					}
				}
				
			}
		}
	}
}