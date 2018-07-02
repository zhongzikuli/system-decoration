HQdecorate.config= {
    updateModel : [{
        name	: 'baseInfo',
        display	: true,
        des		: '基本信息'
    },{
        name	: 'creditInfo',
        display	: true,
        des		: '征信'
    },{
        name	: 'buyerInfo',
        display	: true,
        des		: '购车人信息'
    },{
        name	: 'partnerInfo',
        display	: true,
        des		: '配偶信息'
    },{
        name	: 'carInfo',
        display	: true,
        des		: '车辆信息'
    },{
        name	: 'oldwolfApply',
        display	: true,
        des		: '垫付申请'
    },{
        name	: 'contactorInfo',
        display	: false,
        des		: '紧急联系人'
    }],
    updateItem	: [{
        model:'baseInfo',
        items :[{
            name	: 'dealerName',
            desc	: '经销商'
        }]
    },{
        model:'creditInfo',
        items :[{
            name	: 'loanBank',
            desc	: '贷款银行'
        }]
    },{
        model:'buyerInfo',
        items :[{
            name	: 'realName',
            desc	: '姓名'
        },{
            name	: 'sysFlexKeyCode',
            desc	: '学历'
        },{
            name	: 'cardNo',
            desc	: '身份证号'
        },{
            name	: 'cardArea',
            desc	: '身份证归属地'
        },{
            name	: 'province',
            desc	: '户籍'
        },{
            name	: 'tel',
            desc	: '手机号'
        },{
            name	: 'telArea',
            desc	: '手机号归属地'
        },{
            name	: 'marriedCode',
            desc	: '婚否'
        },{
            name	: 'currentAddress',
            desc	: '现住地址'
        },{
            name	: 'phone',
            desc	: '现住固话'
        },{
            name	: 'familyAddress',
            desc	: '家庭住址'
        },{
            name	: 'houseOwner',
            desc	: '房产所有权人',
        },{
            name	: 'houseAddress',
            desc	: '房产地址'
        },{
            name	: 'housePropertyCode',
            desc	: '房屋性质'
        },{
            name	: 'houseSpace',
            desc	: '房屋面积(㎡)'
        },{
            name	: 'currentPrice',
            desc	: '目前市价(万元)'
        },{
            name	: 'relationBuyerCode',
            desc	: '与购车人关系'
        },{
            name	: 'loanMoney',
            desc	: '房贷金额(万元)'
        },{
            name	: 'loanPeriodMonthCode',
            desc	: '房贷年限(月)'
        },{
            name	: 'repayAmountMonth',
            desc	: '月还款额(元)'
        },{
            name	: 'companyName',
            desc	: '单位名称'
        },{
            name	: 'companyAddress',
            desc	: '单位地址'
        },{
            name	: 'companyTel',
            desc	: '单位电话'
        },{
            name	: 'companyTypeCode',
            desc	: '单位类型'
        },{
            name	: 'jobTypeCode',
            desc	: '职务类别'
        },{
            name	: 'jobCode',
            desc	: '职务'
        },{
            name	: 'runingPeriodCode',
            desc	: '经营期限'
        },{
            name	: 'employedPeriodCode',
            desc	: '工龄'
        },{
            name	: 'stockRatio',
            desc	: '所占股份'
        },{
            name	: 'monthIncome',
            desc	: '月收入(元)'
       /* },{
            name	: 'realName',
            desc	: '紧急联系人姓名'
        },{
            name	: 'tel',
            desc	: '紧急联系人手机'
        },{
            name	: 'phone',
            desc	: '紧急联系人电话'
        },{
            name	: 'relationTypeCode',
            desc	: '紧急联系人关系'*/
        },{
            name	: 'remark',
            desc	: '备注'
        }]
    },{
        model:'partnerInfo',
        items :[{
            name	: 'realName',
            desc	: '配偶姓名'
        },{
            name	: 'sysFlexKeyCode',
            desc	: '学历'
        },{
            name	: 'cardNo',
            desc	: '身份证号'
        },{
            name	: 'cardArea',
            desc	: '身份证归属地'
        },{
            name	: 'currentAddress',
            desc	: '现住地址'
        },{
            name	: 'province',
            desc	: '户籍'
        },{
            name	: 'tel',
            desc	: '手机号'
        },{
            name	: 'telArea',
            desc	: '手机号归属地'
        },{
            name	: 'phone',
            desc	: '现住固话'
        },{
            name	: 'companyName',
            desc	: '单位名称'
        },{
            name	: 'companyAddress',
            desc	: '单位地址'
        },{
            name	: 'companyTel',
            desc	: '单位电话'
        },{
            name	: 'companyTypeCode',
            desc	: '单位类型'
        },{
            name	: 'jobTypeCode',
            desc	: '职务类别'
        },{
            name	: 'jobCode',
            desc	: '职务'
        },{
            name	: 'runingPeriodCode',
            desc	: '经营期限'
        },{
            name	: 'employedPeriodCode',
            desc	: '工龄'
        },{
            name	: 'monthIncome',
            desc	: '月收入(元)'
        },{
            name	: 'remark',
            desc	: '备注'
        }]
    },{
        model:'carInfo',
        items :[{
            name	: 'carProduceArea',
            desc	: '车辆类型'
        },{
            name	: 'carBrandId',
            desc	: '车型'
        },{
            name	: 'seats',
            desc	: '座位数'
        },{
        	 name	: 'newOrOld',
        	 desc	: '车型构成'
        },{
            name	: 'board',
            desc	: '是否公牌'
        },{
            name	: 'carLicenseProvince',
            desc	: '上牌地'
        },{
            name	: 'driverLicneseOwner',
            desc	: '行驶证车主'
        },{
            name	: 'loanPeriodMonthCode',
            desc	: '年限(月)'
        },{
            name	: 'loanBank',
            desc	: '贷款银行'
        },{
            name	: 'cfProductId',
            desc	: '产品类型'
        },{
            name	: 'auditCarPrice',
            desc	: '审核车价(元)'
        },{
            name	: 'actualLoadMoney',
            desc	: '实际贷款额(元)'
        },{
            name	: 'actualFirstPay',
            desc	: '实际首付额(元)'
        },{
            name	: 'actualFirstPayRatio',
            desc	: '实际首付比例(%)'
        },{
            name	: 'actualLoanRatio',
            desc	: '实际贷款比例(%)'
        },{
            name	: 'installmentPayMoney',
            desc	: '分期付款总额(元)'
        },{
            name	: 'installmentPayRatio',
            desc	: '分期付款总额比例(%)'
        },{
            name	: 'installmentPayPoundage',
            desc	: '分期手续费(元)'
        },{
            name	: 'contractCarPrice',
            desc	: '合同车价(元)'
        },{
            name	: 'bankRate',
            desc	: '银行费率(%)'
        },{
            name	: 'contractPrice',
            desc	: '合同价(元)'
        },{
            name	: 'contractPriceRatio',
            desc	: '合同价比例(%)'
        },{
            name	: 'repayMonth',
            desc	: '月还款(元)'
        },{
            name	: 'firstRepay',
            desc	: '首期还款(元)'
        },{
            name	: 'remark',
            desc	: '备注'
        }]
    },{
        model:'oldwolfApply',
        items :[{
            name	: 'gpsInstallNumber',
            desc	: 'GPS安装数量(个)'
        },{
            name	: 'insuranceMethodCode',
            desc	: '投保方式'
        },{
            name	: 'promotion',
            desc	: '促销情况'
        },{
            name	: 'collectMoneyCompany',
            desc	: '收款单位'
        },{
            name	: 'billCompany',
            desc	: '发票开具单位'
        },{
            name	: 'bank',
            desc	: '开户银行'
        },{
            name	: 'account',
            desc	: '账号'
        },{
            name	: 'balanceMethod',
            desc	: '结算方式'
        },{
            name	: 'moneyAmount',
            desc	: '用款金额(元)'
        },{
            name	: 'highInterest',
            desc	: '按揭服务费-高息部分(元)'
        },{
            name	: 'agreeEnsureMoney',
            desc	: '履约保证金(元)'
        },{
            name	: 'channelEnsureMoney',
            desc	: '渠道保证金(元)'
        },{
            name	: 'licensePlateEnsureMoney',
            desc	: '上牌押金(元)'
        },{
            name	: 'poundage',
            desc	: '按揭手续费(元)'
        }]
    }],
    getAllModel		: function(){
        return HYCarFinance.config.updateModel;
    },
    getItemObject : function(name){
        var config = HYCarFinance.config.updateItem;
        for(var i = 0; i < config.length; i++){
            var model = config[i]["model"];
            if( model == name ){
                var items = config[i]["items"];
                return items;
            }
        }
    },
    getModuleDesc : function(name){
        var models = HYCarFinance.config.updateModel;
        for(var i = 0; i < models.length; i++){
            var mName = models[i]["name"];
            if( mName == name ){
                return  models[i]["des"];
            }
        }
    }
}