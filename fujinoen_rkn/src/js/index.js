jQuery(function($) {
	$('.js-mainslick').slick({
		infinite: true,
		initialSlide: 2,
		autoplay: true,
		autoplaySpeed: 2000,
		speed: 2000,
		cssEase: 'linear',
		slidesToShow: 1,
		fade: true,
		dots: true,
		arrows: false,
		pauseOnFocus: false,
		pauseOnHover: false,
		pauseOnDotsHover: false,
		responsive: [
			{
				breakpoint: 740,
				settings: {
					dots: false,
				}
			},
		]
	})
	
	// slider page index 5img
	$('.c-slider').slick({
		arrows: false,
		autoplay: true,
		autoplaySpeed: 0,
		speed: 6900,
		infinite: true,
		centerMode: true,
		pauseOnHover: false,
		pauseOnFocus: false,
		cssEase: 'linear',
		slidesToShow: 6,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
				slidesToShow: 5,
				}
			},
			{
				breakpoint: 960,
				settings: {
				slidesToShow: 4,
				}
			},
			{
				breakpoint: 740,
				settings: {
				slidesToShow: 2,
				}
			},
			{
				breakpoint: 376,
				settings: {
				slidesToShow: 1,
				}
			},
		]
	});
	$('.c-slider--rtl').slick({
		arrows: false,
		autoplay: true,
		autoplaySpeed: 0,
		speed: 6900,
		infinite: true,
		centerMode: true,
		pauseOnHover: false,
		pauseOnFocus: false,
		cssEase: 'linear',
		slidesToShow: 2,
		slidesToScroll: 1,
		rtl: true,
		responsive: [
			{
				breakpoint: 376,
				settings: {
				slidesToShow: 1,
				}
			},
		]
	});
});