$(function(){
	var height = $(window).height();
	var _height = $('.mod_header').outerHeight();
	if($('.J_Ocuppy').length==0){
		$('.mod_header').after('<div class="J_Ocuppy"></div>')
	}
	$('.J_Ocuppy').css('height',_height);
	$('.mod_basic').css('min-height',height-_height-50);
	$(window).resize(function() {
		var height = $(window).height();
		$('.mod_basic').css('min-height',height-_height-50);
	});
	
	//阻止点击冒泡事件
	$('.sub_content').on('click','input,a,button',function(e){
		e.stopPropagation();
	})
	$('.sub_content').on('click','tr',function(e){
		var _this = $(this);
		_this.find('input[type="checkbox"]').click();
	})
	
	
	if($('.mt-20').length>0){
		//保存按钮位置
		scrollBtnShow();
		$(window).on("scroll",scrollBtnShow);
		var h1 = $('.mod_basic').height();
		setInterval(function(){
			var h2 = $('.mod_basic').height();
			if(h1 != h2){
				
			}
		},100);
	}
	
})


function scrollBtnShow(){
	var $mt = $('.mt-20');
	if($mt.length==0){
		return;
	}
	var sTop = $(window).scrollTop();
	var height = $(window).height();
	var pTop = $mt.position().top;
	if(pTop <= height+sTop - 58 - 40){
		$mt.find('.button').show();
		$('.fixed-block').hide();
	}else{
		$mt.find('.button').hide();
		$('.fixed-block').show();
	}
}