jQuery(function($) {
//
// 変数を定義  
// define a variable
//------------------------------------
	var $body = $('body'),
		$header = $('l-header'),
		$menuButton = $('.l-menu__button'),
		$headerNav = $('.l-header__nav'),
		desktopMode = ($menuButton.css('display') != 'none'),
		$headerHeight;
		function headerHeight() {
			$headerHeight = $header.outerHeight();
		}


// header-menu l-header__logo
//------------------------------------
	//ハンバーガーボタンクリック
	$menuButton.click(function() {
		if ( $(this).hasClass('is-open') ) {
			$(this).removeClass('is-open');
			$('body').removeClass('is-hidden');
			$headerNav.fadeOut();
			$('.is-click1').fadeIn();
			$('.is-click2').hide();
			$('.js-mainslick').slick('refresh');
		} else {
			$(this).addClass('is-open');
			$headerNav.fadeIn();
			$('.l-header__logo').css('z-index', '1000');
			$('body').addClass('is-hidden');
			$('.is-click1').hide();
			$('.is-click2').fadeIn();
		}
	});
	
// pagetop
//------------------------------------	
	var $pagetop = $('#pagetop');
	$pagetop.click(function() {
		$('body,html').stop().animate({scrollTop: 0}, 500);
		return false;
	});

	// scroll 100vh dispaly scroll
	$(document).ready(function(){
		$("#is-backtop").hide()
		// var windowHeight = $(window).height();
		$(window).scroll(function(){
			// window hdeight ~ 100vh
			if($(this).scrollTop() > 200 ){
			$('#is-backtop').fadeIn("linear");
			$('#is-tabbar').css("display", "flex");
			}else{
				$('#is-backtop').fadeOut();
				$('#is-tabbar').fadeOut();
			}
			var scroll = $(this).scrollTop();
			var wH = window.innerHeight; 
			var footerPos =  $('#is-footer').offset().top;// lấy vị tri chân trang
			if(scroll+wH >= (footerPos+10)) {
			  var pos = (scroll+wH) - footerPos+10
			  $('#is-backtop').css('bottom',pos);
			}
			else{
				$('#is-backtop').css('bottom','90px');
			}
		})
	})
// スムーススクロール関係js ここから
//------------------------------------
	// ページ内リンク要
	$('a[href^="#"], area[href^="#"]').not('a[href="#"], area[href="#"]').click(function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname && this.hash.replace(/#/, '')) {
			headerHeight();
			var $targetId = $(this.hash), $targetAnchor = $('[name=' + this.hash.slice(1) + ']');
			var $target = $targetId.length ? $targetId : $targetAnchor.length ? $targetAnchor : false;
			if ($target) {
				var targetOffset = $target.offset().top - $headerHeight;
				$('body,html').stop().animate({
					scrollTop: targetOffset
				}, 500);
				return false;
			}
		}
	});
	// ページ外リンクで#の位置へ飛ぶ
	window.addEventListener('load', function(){
		if (location.hash) {
			var targetOffset = $(location.hash).offset().top - $headerHeight;
			$('body,html').stop().animate({
				scrollTop: targetOffset
			}, 0);
		}
	})
});


