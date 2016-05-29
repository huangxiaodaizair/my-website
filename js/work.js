$(function(){
	var oMenu=$('.menu');
	var oMenuBox=$('.menu_box');
	oMenu.click(function(){
		$(this).hide();
		oMenuBox.addClass('move');
	});
});
$(function(){
	var oBanner=$('.banner');
	var oImg=$('.banner img');
	var oNav=$('.nav');
	var oHCont=$('.html_content');
	var oJCont=$('.js_content');
	oBanner.stop().animate({
		opacity:1,
		width:'900px',
	},{complete:function(){
		oNav.stop().animate({
			opacity:1,
			width:'500px'
		});
	}});
	oImg.stop().animate({opacity:1});
	
	//html/js
	var aHLi=$('.html_content ul li');
	var aJLi=$('.js_content ul li');
	$(window).scroll(function(){
		var top=$(document).scrollTop();
		var clientH=$(window).height();
		var hHtml=oHCont.offset().top;
		var hJ=oJCont.offset().top;
		if(hHtml < top + clientH){
			aHLi.each(function(index){
				aHLi.eq(index).css('transform','scale(1)').animate({
					opacity:1
				});
			});
		}
		if(hJ + 300 < top + clientH){
			aJLi.each(function(index){
				aJLi.eq(index).css('transform','scale(1)').animate({
					opacity:1
				});
			});
		}
	});
})