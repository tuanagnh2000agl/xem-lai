jQuery(function($) {
//
// 変数を定義  
//------------------------------------
	var $body = $('body'),
		$header = $('#header'),
		$menuButton = $('.l-menu__button'),
		$crollTopButton = $('#pagetop'),
		$headerNav = $('.l-header__nav'),
		$closeSubNavBtn = $('.l-header__subitem__btn'),
		$desktopMode = ($menuButton.css('display') == 'none'),
		$sidebar = $('#sidebar'),
		$pagetitleBtn = $('.js-pagetitleNav'),
		$headerHeight;
		
		headerHeight();       
		openSubNavPc();
		btnCloseSubNavPc();
		openSubNavSp();
		closeNavSp();
		

//  
// viewport resize 
//------------------------------------	
	$(window).on('resize orientationchange', function() {
		if ($menuButton.css('display') == 'none') {
			if (!$desktopMode) {   
				$desktopMode = true;
				$('head').find('meta[name="viewport"]').attr('content', 'width=1240');
				// $('head').find('meta[name="viewport"]').attr('content', 'width=device-width,initial-scale=1,user-scalable=yes');
			}
		} else {
			if ($desktopMode) {
				$desktopMode = false;
				$('head').find('meta[name="viewport"]').attr('content', 'width=device-width,initial-scale=1,user-scalable=yes');
			}
		} 
		$(this).trigger('scroll'); 
	}).trigger('resize');  

//  
// document scroll 
//------------------------------------
	$(window).scroll(function (){
		let scrollTop = $(window).scrollTop();
		
		showScrollTop(scrollTop);
		headerFixed(scrollTop);
		showSidebarSp(scrollTop);
		bodyStatus(scrollTop)
		
	});
//  
// document load 
//------------------------------------
	$(window).on('load',function (){
		let scrollTop = $(window).scrollTop();
		showScrollTop(scrollTop);
		headerFixed(scrollTop);
		showSidebarSp(scrollTop);
		bodyStatus(scrollTop)
	});

//
// header-menu 
//------------------------------------
	
	//ハンバーガーボタンクリック   
	$menuButton.click(function() {
		if ( $(this).hasClass('is-open') ) {
			
			$(this).removeClass('is-open');
			$header.removeClass('is-open');
			$('.l-header__subitem').slideUp(500);
			$headerNav.fadeOut(300); 
		} else {
			$(this).addClass('is-open');  
			$header.addClass('is-open');
			$headerNav.delay(200).fadeIn(400); 
		}
	});

	
	//SPメニュー内アコーディオン 
	$(".l-header__item.is-hover").click(function (e) { 
		if(!$desktopMode){
			if ( $(this).hasClass('is-open') ) {
				$(this).removeClass('is-open');
				$(this).children('.l-header__subitem').slideUp(500)
			} else {  
				$(this).addClass('is-open'); 
				$(this).children('.l-header__subitem').slideDown(500)
			}
		} 
	}); 
//  
// pagetop 
//------------------------------------	
	var $pagetop = $('#pagetop');
	$pagetop.find('> a').click(function() {
		$('body,html').stop().animate({scrollTop: 0}, 500);
		return false;  
	});
//  
// page-0title nav 
//------------------------------------	
	$pagetitleBtn.click(function() {
		var pageTilteNav = $('.c-pagetitle__navCont');
		pageTilteNav.closest('.c-pagetitle__nav').toggleClass('is-open');
		pageTilteNav.fadeToggle('fast');
	})
// 
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
	if (location.hash) {
		var targetOffset = $(location.hash).offset().top - $headerHeight;
		$('body,html').stop().animate({
			scrollTop: targetOffset
		}, 0);
	}

//
// functions
//------------------------------------
	function showScrollTop(currentScrollTop) {
		if (currentScrollTop > 1000) {
			$crollTopButton.addClass('is-active');
		} else {
			$crollTopButton.removeClass('is-active');
		}
	}

	function headerFixed(currentScrollTop) {
		if (!$desktopMode) return;
		if (currentScrollTop > 250) {
			$header.addClass('is-fixed');
		} else {
			$header.removeClass('is-fixed');
		}
	}

	function openSubNavPc() {
		$('.l-header__item.--subitem').hover(function(){
			if($desktopMode){
				let subNav = $(this).find('.l-header__subitem');
				subNav.stop().slideDown();
			}
		},function() {
			if($desktopMode){
				let subNav = $(this).find('.l-header__subitem');
				subNav.hide();
			}
		})
	}

	function headerHeight() {
		$headerHeight = $header.outerHeight();   
		if($desktopMode) {
			$headerHeight = 80;
		}
	}

	function btnCloseSubNavPc() {
		$closeSubNavBtn.click(function(){
			$(this).parents('.l-header__subitem').hide();
		})
	}

	function showSidebarSp(currentScrollTop) {
		if (currentScrollTop > 1000 || 
			currentScrollTop + $(window).height() >= $(document).height() - 70) {

			$sidebar.addClass('is-show');
		}else {
			$sidebar.removeClass('is-show');
		}
	}
	function bodyStatus(currentScrollTop) {
		if(currentScrollTop > 0) {
			$body.addClass('is-scroll');
		} else {
			$body.removeClass('is-scroll');
		}
	}
	function openSubNavSp() {
		$('.l-header__item.--subitem').click(function() {
			if(!$desktopMode) {
				$(this).find('.l-header__subitem').slideToggle();
			}
		})
	}
	function closeNavSp() {
		$(".l-header__btnClose").click(function(){
			if(!$desktopMode){
				$(".l-menu__button").trigger('click');
			}
		})
	}
});
