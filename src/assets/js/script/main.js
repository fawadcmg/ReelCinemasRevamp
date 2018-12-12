var isRTL = ($('html').attr('dir') == "rtl") ? true : false,
	winWidth = $(window).width(),
	winHeight = $(window).height(),
	headerHeight = $('.c-main-header').outerHeight(),
	footerHeight = $('.c-main-footer').outerHeight(),
	bodyHeight,
	bodyTopPos,
	isIE = detectIE();

// loadPlayMovies();
ChangeToSvg();
setOnTopClass();
initSlick();
headerSpace();

if(winWidth<768){
	$('.js-movie-list .u-loader').remove();
}


$(function () {
	winDimensions();
	ChangeToSvg();
    footerLogosCarousel();
	headerAdjust();
	movieListSetHTML();
	movieList();
	tabs();
	sideNav();
	animWrapHeight();
	bindPopupEve();
	setOnTopClass();
	customSelectBox();
	filterSearch();
	scrollTo();
	$('.c-loader').fadeOut('slow', function () {
	    if(winWidth > 1024){
		   AOS.init({
			once: true,
			offset: 50,
		   });
	    }
	});
});

//On Window Load
$(window).on('load', function () {
	 // calcBodyarea();
	setTimeout(function () {
		addVideoPlugin();
		AOS.refresh();
		fixMobileCarouselWrongDisplay();
	}, 200);
});

//On Window Resize
var resizeTimer;
$(window).on('resize orientationchange', function () {
	if(winWidth != $(window).width()){
		winDimensions();
		setOnTopClass();
		// calcBodyarea();
		headerSpace();
		animWrapHeight();

		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function() {
			winDimensions();
			movieListSetHTML();
		}, 250);
		movieListCarousel();
	}
});

//On Scroll
$(window).on('scroll', function () {
   setOnTopClass();
});


//Escape Functionality
$(document).keyup(function(e) {
    if (e.keyCode == 27) {
    	$('html').removeClass('side-nav-is-open');
		$('.js-custom-select').removeClass('is--active');
		$('.js-custom-select input[type="text"]').blur();

        closePopup();
    }
});

//CLick on body
$(document).on('click touchstart', function (e) {
	/*if ($(e.target).closest('.js-langSelector').length === 0) {
		$('.js-langSelector').find('ul').removeClass('active');
	}*/
});

function setOnTopClass() {
   if($(window).scrollTop() === 0) {
		$('html').removeClass('not-at-top');
   }else{
   		$('html').addClass('not-at-top');
   }
}

function winDimensions() {
	winWidth = $(window).width(),
	winHeight = $(window).height(),
	headerHeight = $('.c-main-header').outerHeight(),
	footerHeight = $('.c-main-footer').outerHeight();
}
function ChangeToSvg() {
	$('img.js-inline-svg').each(function () {
	    var $img = $(this);
	    var imgID = $img.attr('id');
	    var imgClass = $img.attr('class');
	    var imgURL = $img.attr('src');
	    $.get(imgURL, function (data) {
	      var $svg = $(data).find('svg');
	      if (typeof imgID !== 'undefined') {
	        $svg = $svg.attr('id', imgID);
	      }
	      if (typeof imgClass !== 'undefined') {
	        $svg = $svg.attr('class', imgClass + ' insvg');
	      }
	      $svg = $svg.removeAttr('xmlns:a');
	      if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
	        $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
	      }
	      $img.replaceWith($svg);
	    }, 'xml');
	});
}
function loadPath() {
	var currentLoc = window.location.pathname.split('/')[1];
    $('.secondary-nav a[href="'+currentLoc+'"]').addClass('active');
}
function actionsOnClick() {
	$('.js-langSelector').on('click', function(e){
		e.preventDefault();
		$(this).find('ul').toggleClass('active');
	});
}
function calcBodyarea() {
	bodyHeight = winHeight - headerHeight - footerHeight;
	$('.js-page-body').css('min-height', bodyHeight)
}



function initSlick() {
	// Main Carousel
	$('.js-main-carousel').slick({
		arrows: true,
		infinite: true,
		fade: true,
		speed: 600,
		autoplay: 5000,
		asNavFor: '.js-main-carousel-thumb',
	});
	$('.js-main-carousel-thumb').slick({
		arrows: false,
		slidesToShow: 6,
		slidesToScroll: 6,
		infinite: false,
		asNavFor: '.js-main-carousel',
	});
	$('.js-main-carousel-thumb .item').click(function (e) {
		e.preventDefault();
		var thisIndex = $(this).closest('.slick-slide').attr('data-slick-index');
		$('.js-main-carousel').slick('slickGoTo', thisIndex);
	});

	$('.js-nav-carousel').slick({
		dots: true,
		arrows: true,
	});

	// EXP Carousel
	$('.js-exp-carousel').slick({
		arrows: false,
		fade: true,
		asNavFor: '.js-exp-carousel-thumb',
		infinite: false,
		responsive: [
					    {
					      breakpoint: 768,
					      settings: {
							fade: false,
					      }
					    },
				   	],
	});
	$('.js-exp-carousel-thumb').slick({
		arrows: false,
		slidesToShow: 5,
		slidesToScroll: 5,
		infinite: false,
		asNavFor: '.js-exp-carousel',
		responsive: [
					    {
					      breakpoint: 768,
					      settings: {
					        slidesToShow: 1,
					        slidesToScroll: 1,
					        infinite: true,
					        focusOnSelect: true,
							swipeToSlide: true,
					      }
					    },
				   	],
	});
	$('.js-exp-carousel-thumb .item').click(function (e) {
		e.preventDefault();
		var thisIndex = $(this).closest('.slick-slide').attr('data-slick-index');
		$('.js-exp-carousel').slick('slickGoTo', thisIndex);
	});


	/*if (isRTL) {} else {
	    var bannerPrev = '<button class="slick-prev slick-arrow" aria-label="Previous" type="button" style=""><img src="assets/img/icons/angle-left.svg" alt="caret-left" class="toSvg js-inline-svg svgWhite" /></button>'
	    var bannerNext = '<button class="slick-next slick-arrow" aria-label="Next" type="button" style=""><img src="assets/img/icons/angle-right.svg" alt="caret-right" class="toSvg js-inline-svg svgWhite" /></button>'
	}
	$('.js-eventsCarousel').slick({
		autoplay: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		arrows: true,
		fade: false,
		infinite: true,
		centerMode: true,
		centerPadding: '0',
		rtl: isRTL,
		appendArrows: '.eventsCarouselNav',
		prevArrow: bannerPrev,
		nextArrow: bannerNext,
	});
	$('.js-captionSlider').slick({
		autoplay: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		arrows: false,
		fade: true,
		draggable: false,
		infinite: false,
		rtl: isRTL,
		asNavFor: '.js-figureSlider, .js-figureCaptionSlider',
	});
	$('.js-figureSlider').slick({
		autoplay: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		arrows: true,
		fade: false,
		infinite: false,
		rtl: isRTL,
		appendArrows: '.homeCarouselNav',
		prevArrow: bannerPrev,
		nextArrow: bannerNext,
		asNavFor: '.js-captionSlider, .js-figureCaptionSlider',
	});
	$('.js-figureCaptionSlider').slick({
		autoplay: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		arrows: false,
		fade: false,
		draggable: false,
		infinite: false,
		rtl: isRTL,
		asNavFor: '.js-captionSlider, .js-figureSlider',
	});*/
}


function headerAdjust() {
	$('.js-header-links ul ul').closest('li').addClass('has--sub-nav');
}

function initSelect2() {
	$('.js-select2').select2();
}


function movieList() {
	$('.js-movie-list .movie-item .item-wrap').click(function (e) {
		e.preventDefault();
		var _self = this;
		if(!$(this).closest('.js-movie-list').hasClass('js-movie-list--not-open')){

			// Check if some other movie is already open and if its on another row
			// then make sure we keep scroll jerk off the bay
			if(!$(this).closest('.list-wrap').next().find('.item-details').get(0) && $(this).closest('.js-movie-list').find('.movie-details .item-details').get(0)){
				/*var prevDetailHeight = $(this).closest('.js-movie-list').find('.movie-details .item-details').height();
				var prevDetailTopOffset = $(this).closest('.js-movie-list').find('.movie-details .item-details').offset().top;
				var thisItemTopScroll = $(this).offset().top;
				var currentScroll = $(window).scrollTop();
				if(thisItemTopScroll > prevDetailTopOffset){
					// window.scrollTo(0, (currentScroll - prevDetailHeight) );
				}*/

				var openOnOtherRowDetail = $(this).closest('.js-movie-list').find('.movie-details .item-details');
				openOnOtherRowDetail.parent().slideUp();

				setTimeout(function () {
					openOnOtherRowDetail.closest('.movie-details').prev().find('.movie-item').removeClass('is--active');
					openOnOtherRowDetail.remove();

					slideDownMovieDetails(_self);
				}, 400);
			}else{
				slideDownMovieDetails(_self);
			}
		}
	});
}

function slideDownMovieDetails(thisSelf) {
	if(winWidth >=768){
		$(thisSelf).closest('.js-movie-list').find('.movie-item').removeClass('is--active');
		$(thisSelf).closest('.js-movie-list').find('.movie-details .item-details').remove();

		var detailsHTML = $(thisSelf).parent().find('.item-details')[0].outerHTML;
		$(thisSelf).closest('.movie-item').addClass('is--active');
		$(thisSelf).closest('.list-wrap').next().append(detailsHTML);
		$(thisSelf).closest('.list-wrap').next().slideDown();
		$(thisSelf).closest('.list-wrap').next().find('.popup--even-binded').removeClass('popup--even-binded');
		bindPopupEve();

		setInView($(thisSelf).closest('.list-wrap').next().find('.item-details')[0]);

		$('.movie-details .js-close-movie-list-detail').click(function (e) {
			e.preventDefault();

			$(this).closest('.movie-details').slideUp();
			setTimeout(function () {
				$(thisSelf).closest('.js-movie-list').find('.movie-item').removeClass('is--active');
				$(thisSelf).closest('.js-movie-list').find('.movie-details .item-details').remove();
			}, 400);
		});
	}
}
function setInView(el) {

	var top = el.offsetTop;
	var height = el.offsetHeight + 20;

	while(el.offsetParent) {
		el = el.offsetParent;
		top += el.offsetTop;
	}

	var a = top;
	var b = height;
	var d = a + b;
	var e = window.innerHeight + window.pageYOffset;
	var c = d - e;
	var scroll = window.pageYOffset - c;

	if(e < d){
		$('html, body').stop().animate({
			scrollTop: a+b - window.innerHeight
		}, 500);
	}
}

function movieListSetHTML() {
	if(winWidth < 1024){
		var itemsPerRow = 4;
	}else{
		var itemsPerRow = 6;
	}

	if($('.js-movie-list').hasClass('slick-initialized')){
		$('.js-movie-list').slick('unslick');
		if(winWidth >=768){
			movieList();
		}else{
			$('.js-movie-list .movie-item:nth-child(10) ~ .movie-item').remove();

			var movieListInfinite = false;
			if($('.js-movie-list > *').length > 2){
				movieListInfinite = true;
			}
			$('.js-movie-list').slick({
				arrows: false,
				focusOnSelect: true,
				swipeToSlide: true,
				infinite: movieListInfinite,
			});
		}
	}
	
	// Normalize First
		$('.js-movie-list .movie-item.is--active').removeClass('is--active');
	if($('.js-movie-list .list-wrap').get(0)){
		$('.js-movie-list').each(function () {
			$('.list-wrap .movie-item .is--active', this).removeClass('is--active');
			$('.list-wrap .movie-item', this).appendTo($(this));
			$('.list-wrap', this).remove();
			$('.movie-details', this).remove();
		});
	}

	$('.js-movie-list .is--last-item').removeClass('is--last-item');
	$('.js-movie-list .is--first-item').removeClass('is--first-item');

	if(winWidth >= 768){
		// Set HTML
		$('.js-movie-list').each(function () {
			var i = 1;
			while ($('> .movie-item', this).length) {
				$('> .movie-item:lt('+itemsPerRow+')', this).wrapAll('<div class="list-wrap list-wrap-page list-wrap-page--'+ i +'" />');
				i++;
			}
			$('.list-wrap', this).after('<div class="movie-details"></div>');

			if(!$('.u-loader', this).get(0)){
				$(this).append('<div class="u-loader"></div>');
			}
		});
		$('.js-movie-list .movie-item:last-child .item-details').addClass('is--last-item');
		$('.js-movie-list .movie-item:first-child .item-details').addClass('is--first-item');
	}
}

function tabs() {
	$('.js-tab-link').click(function (e) {
		e.preventDefault();
		var tabName = $(this).attr('data-tab-name');
		$('.tab-link[data-tab-name="'+tabName+'"]').removeClass('is--active');
		$(this).addClass('is--active');
		$('.is-tab[data-tab-name="'+tabName+'"]').removeClass('is--active');
		var target = $(this).attr('href');
		$(target).addClass('is--active');
		if($(target).find('.js-movie-list').get(0)){
			movieListCarousel();
		}
		setTimeout(function () {
			AOS.refresh();
		}, 200);
	});
}

function sideNav() {
	$('.js-open-side-nav').click(function (e) {
		e.preventDefault();
		setBodyTopOffset();
		$('html').addClass('side-nav-is-open');
	});
	$('.js-close-side-nav').click(function (e) {
		e.preventDefault();
		$('html').removeClass('side-nav-is-open');
		setBodyToNormal();
	});
}

function customSelectBox() {
	/*$('.js-custom-select .js-field').on('focus', function() {
		$(this).closest('.js-custom-select').addClass('is--active');
		$(this).closest('.js-custom-select').addClass('is--active-now');
		$('.js-custom-select:not(.is--active-now)').removeClass('is--active');
		$('.js-custom-select.is--active-now').removeClass('is--active-now');
		
        if(winWidth > 1024){
		  $(this).closest('.js-custom-select').find('.field-dropdown .js-field').val('').focus();
        }
		$('html').addClass('filter-open');
	});*/
	// $('.js-custom-select .js-field').on('blur', function() {
		// $(this).closest('.js-custom-select').removeClass('is--active');
	// });

	$('.js-custom-select').each(function (i) {
		hideOnClickOutside($(this));
	});

	selectOutsideClickEvent();

	$('.js-select-all').click(function () {
		if($(this).find('input').is(":checked")){
			$(this).closest('.js-custom-select').find('input[type="checkbox"]').prop( "checked", false );
		}else{
			$(this).closest('.js-custom-select').find('input[type="checkbox"]').prop( "checked", true );
			
		}
	});

	// for mobile
	$('.js-custom-select .field').click(function (e) {
			var self = this;
			$(this).closest('.js-custom-select').addClass('is--active');
			$(this).closest('.js-custom-select').addClass('is--active-now');
			$('.js-custom-select:not(.is--active-now)').removeClass('is--active');
			$('.js-custom-select:not(.is--active-now) .field-dropdown .scroll').slideUp();
			$('.js-custom-select.is--active-now').removeClass('is--active-now');

			$(this).closest('.js-custom-select').find('.field-dropdown .scroll').slideDown();

			if(winWidth < 768){
				setBodyTopOffset();
			}
			$('html').addClass('filter-open');
	});

	$('.js-close-filter-m').click(function (e) {
		e.preventDefault();
		$('.js-custom-select').removeClass('is--active');
		$('.js-custom-select').find('.field-dropdown .scroll').slideUp();
		$('html').removeClass('filter-open');
		console.log(bodyTopPos);
		setBodyToNormal();
	});

	$('.js-filter-search').click(function (e) {
		$('.js-custom-select').removeClass('is--active');
		$('.js-custom-select').find('.field-dropdown .scroll').slideUp();
		$('html').removeClass('filter-open');
		setBodyToNormal();
	});

	$(document).on('click', '.js-close-custom-select', function(e){
		e.preventDefault();
		var thisSelect = $(this).closest('.js-custom-select');
		thisSelect.find('input[type="text"]').blur();
		thisSelect.find('.field-dropdown .scroll').slideUp(function () {
			thisSelect.removeClass('is--active');
		});
	});
}
function setBodyTopOffset() {
	if(winWidth < 768){
		bodyTopPos = $(window).scrollTop();
		$('body').css('top', -bodyTopPos);
	}
}
function setBodyToNormal() {
	window.scrollTo(0, bodyTopPos);
}

function hideOnClickOutside(selector) {
	if(selector.hasClass('js-custom-select')){
		$('.js-custom-select input[type="text"]').blur();
	}
}

function selectOutsideClickEvent() {

  const outsideClickListener = (event) => {
  	console.log('clicked');
    if(winWidth >= 768){
        if (!$(event.target).closest('.js-custom-select').length) {
			$('.js-custom-select.is--active').find('.field-dropdown .scroll').slideUp(function () {
				$('.js-custom-select.is--active').removeClass('is--active');
			});
			// removeClickListener();
        }
    }
  }

  /*const removeClickListener = () => {
    document.removeEventListener('click', outsideClickListener)
  }*/
  document.addEventListener('click', outsideClickListener);
}

function scrollCustomSelect() {
	if(winWidth < 768){
		$('.js-custom-select').each(function () {

			if($(this).find('.scroll-area .item').length > 3 && !$(this).find('.js-custom-select--scroll-up').get(0)){
				$(this).find('.scroll-area').after('<a href="#" class="scroll-up-arrow is--deactive js-custom-select--scroll-up"></a> <a href="#" class="scroll-down-arrow js-custom-select--scroll-down"></a>');
				
				$(this).find('.js-custom-select--scroll-down').click(function (e) {
					e.preventDefault();
					var itemHeight = $(this).closest('.js-custom-select').find('.scroll-area .item').height();

					var scrollArea = $(this).closest('.js-custom-select').find('.scroll-area');
					var currentScrollPos = scrollArea.scrollTop();
					scrollArea.stop().animate({scrollTop: (currentScrollPos + itemHeight)+'px'}, 200);
				});

				$(this).find('.js-custom-select--scroll-up').click(function (e) {
					e.preventDefault();
					var itemHeight = $(this).closest('.js-custom-select').find('.scroll-area .item').height();

					var scrollArea = $(this).closest('.js-custom-select').find('.scroll-area');
					var currentScrollPos = scrollArea.scrollTop();
					scrollArea.stop().animate({scrollTop: (currentScrollPos - itemHeight)+'px'}, 200);
				});


				$(this).find('.scroll-area').scroll(function () {
					scrollAreaScrolled(this);
				});
			}
		});
	}
}

function scrollAreaScrolled(scrollAreaRef) {
	var thisHeight = $(scrollAreaRef).height();
	var thisScrollHeight = scrollAreaRef.scrollHeight;
	var thisScrollPos = $(scrollAreaRef).scrollTop();
	var thisParent = $(scrollAreaRef).closest('.js-custom-select');
	var thisUpArrow = thisParent.find('.js-custom-select--scroll-up');
	var thisDownArrow = thisParent.find('.js-custom-select--scroll-down');
	
	if(thisScrollPos == 0){
		thisUpArrow.addClass('is--deactive');
	}else{
		thisUpArrow.removeClass('is--deactive');
	}

	if((thisScrollPos + thisHeight) >= thisScrollHeight){
		thisDownArrow.addClass('is--deactive');
	}else{
		thisDownArrow.removeClass('is--deactive');
	}
}

$.fn.hasScrollBar = function() {
    return this.get(0).scrollHeight > this.height();
}

$(document).ready(function(e) {
	scrollCustomSelect();
	toSVG();
});

function movieListRemoveCarousel(){
	if($('.js-movie-list').hasClass('slick-initialized')){
		$('.js-movie-list').slick('unslick');
	}
}
function movieListStartCarousel(){
	if($(window).width() < 768 && $('.js-movie-list').get(0)){
		$('.js-movie-list .movie-item:nth-child(10) ~ .movie-item').remove();

		var movieListInfinite = false;
		if($('.js-movie-list > *').length > 2){
			movieListInfinite = true;
		}
		$('.js-movie-list').slick({
			arrows: false,
			focusOnSelect: true,
			swipeToSlide: true,
			infinite: movieListInfinite,
		});
	}
}
function movieListCarousel() {
	movieListRemoveCarousel();
	movieListStartCarousel();
}
var jsMovieCarouselTimmer;
function fixMobileCarouselWrongDisplay() {
	setTimeout(function () {
		if($(window).width() < 768 && $('.js-movie-list').get(0)){
			jsMovieCarouselTimmer = setInterval(function () {
				if(!$('.js-movie-list').hasClass('slick-initialized')){
					$('.js-movie-list .movie-item:nth-child(10) ~ .movie-item').remove();

					var movieListInfinite = false;
					if($('.js-movie-list > *').length > 2){
						movieListInfinite = true;
					}
					$('.js-movie-list').slick({
						arrows: false,
						focusOnSelect: true,
						swipeToSlide: true,
						infinite: movieListInfinite,
					});
				}
			}, 1000);
		}
	}, 1000);
}

function toSVG() {
	$('img.svg').each(function(){
	    var $img = jQuery(this);
	    var imgID = $img.attr('id');
	    var imgClass = $img.attr('class');
	    var imgURL = $img.attr('src');

	    jQuery.get(imgURL, function(data) {
	        // Get the SVG tag, ignore the rest
	        var $svg = jQuery(data).find('svg');

	        // Add replaced image's ID to the new SVG
	        if(typeof imgID !== 'undefined') {
	            $svg = $svg.attr('id', imgID);
	        }
	        // Add replaced image's classes to the new SVG
	        if(typeof imgClass !== 'undefined') {
	            $svg = $svg.attr('class', imgClass+' replaced-svg');
	        }

	        // Remove any invalid XML tags as per http://validator.w3.org
	        $svg = $svg.removeAttr('xmlns:a');

	        // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
	        if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
	            $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
	        }

	        // Replace image with new SVG
	        $img.replaceWith($svg);

	    }, 'xml');

	});
}

$('.js-date-time').slick({
	dots: false,
	infinite: false,
	speed: 300,
	slidesToShow: 7,
	slidesToScroll: 1,
	responsive: [
	    {
	      breakpoint: 1024,
	      settings: {
	        slidesToShow: 5,
	        dots: false
	      }
	    },
	    {
	      breakpoint: 767,
	      settings: {
	      	arrows: false,
	        slidesToShow: 5,
	      }
	    },
  	]
});


$('.time-itemss').slick({
  dots: false,
  infinite: false,
  speed: 300,
 slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
		  arrows:false
      }
    }
   
  ]
});

function footerLogosCarousel() {
    if($('.js-footer-logos-carousel').hasClass('slick-initialized')){
        $('.js-footer-logos-carousel').slick('unslick');
    }
    if(winWidth < 768){
        $('.js-footer-logos-carousel').slick({
            arrows: false,
            dots: false,
            items: 1,
            infinite: true,
            focusOnSelect: true,
        });
        // $('.js-footer-logos-carousel').slick('slickGoTo', 1);
    }
}

function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
       // Edge (IE 12+) => return version number
       return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}

if(isIE){
	console.log("IE Version:" + isIE);
    $('html').addClass('is--ie');
    $('html').addClass('is--ie-'+isIE);

    $('[src*=reel-logo]').attr('src', 'assets/img/brand/logo.png');

    if($('.c-main-banner').get(0)){
    	var itemHeight = $('.c-main-banner .item-inner').height();
    	$('.c-main-banner .item-inner .txt').each(function(){
			$(this).wrapAll('<div class="item-inner-wrap"></div>');
    	});

		$('.c-main-banner .item-inner .item-inner-wrap').height(itemHeight);
    }
}
addingAOSData();
function addingAOSData() {
	if(winWidth > 1024 && isIE == false){
		// Left
		$('.movieheader .txt .movie-poster-detail').attr('data-aos', 'fade-left');
		// Right
		$('.movieheader .txt .movie-poster, .popular-heading, .logo img').attr('data-aos', 'fade-right');
		// Down
	    $('.c-main-header').attr('data-aos', 'fade-down');
	    // Up
	    $('.movieheader, .c-whats-popular .sec-title, .tileview-movies-list, .c-show-list-page, .c-show-list-page .d-box-wrap, .c-show-list-page > .o-container:first-child, .list-main-action, .c-exp-views .carousel .item:first-child .txt, .c-main-footer, .c-main-footer > .o-container > .row > *, .c-exp-views, .c-movie-filters, .c-movies-list .list-tabs, .c-main-banner, .c-main-banner .main-carousel-thumb').attr('data-aos', 'fade-up');

	    $('.c-exp-views .carousel-thumb .slick-slide').each(function (i) {
	    	$(this).attr('data-aos', 'fade-right');
	    	$(this).attr('data-aos-delay', (50*i));
	    });
		$('.popular-heading').attr('data-aos-delay', 300);
		$('.movieheader .txt .movie-poster-detail, .movieheader .txt .movie-poster, .popular-heading').attr('data-aos-delay', 300);

		$('.c-movies-list .list-wrap').each(function () {
			$(this).find('.movie-item').each(function (i) {
		    	$(this).attr('data-aos', 'fade-up');
		    	$(this).attr('data-aos-delay', (50*i));
			});
		});

		AOS.refresh();
	}
}

function refreshAOS(aosFunc){
	if(winWidth > 1024 && isIE == false){
		if(aosFunc == 'init'){
			AOS.init({
			once: true,
			offset: 50,
		   });
		}
		if(aosFunc == 'refresh'){
			AOS.refresh();
		}
	}
}

function headerSpace() {
	var filterSpace = 0;
	if(winWidth < 768){
		filterSpace = 66;
		if(winHeight <= 650){
			filterSpace = 58;
		}
	}
	
	$('.header-space').css('height', $('.c-main-header').height() + filterSpace);
}
ChangeToSvg();
function ChangeToSvg() {
	jQuery('img.tosvg').each(function () {
	    var $img = jQuery(this);
	    var imgID = $img.attr('id');
	    var imgClass = $img.attr('class');
	    var imgURL = $img.attr('src');
	    jQuery.get(imgURL, function (data) {
	      var $svg = jQuery(data).find('svg');
	      if (typeof imgID !== 'undefined') {
	        $svg = $svg.attr('id', imgID);
	      }
	      if (typeof imgClass !== 'undefined') {
	        $svg = $svg.attr('class', imgClass + ' insvg');
	      }
	      $svg = $svg.removeAttr('xmlns:a');
	      if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
	        $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
	      }
	      $img.replaceWith($svg);
	    }, 'xml');
	});
}


function openPopup(target) {
	$('html').addClass('popup-is-active');
	$(target).show();
	$(target).closest('.c-popup').show();
	setTimeout(function(){
		$(target).addClass('active');
		$(target).closest('.c-popup').addClass('popup--open');
		console.log($(target).find('.plyr'));
		if($(target).find('.plyr').length){
			var videoInstance = $(target).find('.plyr').attr('data-video-instance');
			console.log(videoInstance);
			players[videoInstance].play();
		}

	}, 10);


	$('html').addClass('popup-is-active');
	$(target).show();
	$(target).closest('.c-popup').show();
	setTimeout(function(){
		$(target).addClass('active');
		$(target).closest('.c-popup').addClass('popup--open');

		// Play Video
		if(winWidth > 1024 && $(target).find('.plyr').length){
			var videoInstance = $(target).find('.js-video').attr('data-video-instance');
			if(players[videoInstance]){
				players[videoInstance].play();
			}
		}else if($(target).find('.js-video').length){
			$('.popup.active iframe')[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
		}

	}, 10);
}

function closePopup() {
	if($('.c-popup .active').length){
		// Pause Video In Popup
		if(winWidth > 1024 && $('.c-popup .active .plyr').length){
			var videoInstance = $('.c-popup .active .plyr').attr('data-video-instance');
			if(players[videoInstance]){
				players[videoInstance].pause();
			}
		}else if($('.c-popup .active .js-video').length){
			$('.popup.active iframe')[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
		}

		// Close Popup
		$('.c-popup .active').removeClass('active');
		$('.c-popup').removeClass('popup--open');
		setTimeout(function () {
			$('.c-popup .popup').hide();
			$('.c-popup').hide();
			$('html').removeClass('popup-is-active');
		}, 310);
	}
}

function addVideoPlugin() {
	if(winWidth > 1024 && $('.js-video').get(0) && isIE == false){
		var plyrScriptElement = document.createElement("script");
		plyrScriptElement.setAttribute('src', 'assets/js/plyr.min.js');

		plyrScriptElement.setAttribute('async', 'true');
		document.body.appendChild(plyrScriptElement);
	}else{
		jsVideoDirect();
	}
}

var players = [];
function jsVideo() {
	// Custom player
	if($('.js-video').length){
		$('.js-video').each(function(i) {
			var thisParent = $(this).parent();
			players[i] = new Plyr(this, {
				playsinline: true,
			});
			thisParent.find('.plyr').attr('data-video-instance', i);
		});
	}
}

function jsVideoDirect() {
	if($('.js-video').length){
		$('.js-video').each(function(i) {
			$(this).attr('data-video-instance', i);
			var videoId = $(this).attr('data-plyr-embed-id');
			$(this).html('<iframe width="100%" height="100%" src="https://www.youtube.com/embed/'+videoId+'?rel=0&playsinline=1&enablejsapi=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
		});
	}
}

function bindPopupEve() {

	console.log('binding');
	// Popup Open
	$('.js-popup-link:not(.popup--even-binded)').click(function (e) {
		e.preventDefault();
		console.log('clicked poup even');
		var target = $(this).attr('href');
		openPopup(target);
	}).addClass('popup--even-binded');

	// Popup Close
	$('.js-close-popup:not(.js-close-even-binded)').click(function (e) {
		e.preventDefault();
		closePopup();
	}).addClass('js-close-even-binded');
}

function animWrapHeight() {
	$('.anim-wrap').css('height', 'auto');
	$('.anim-wrap').removeClass('anim-wrap--ready');

	$('.anim-wrap').each(function () {
		$(this).css('height', $(this).height()).addClass('anim-wrap--ready');
	});
}

function filterSearch() {

	$('.js-custom-select .field-dropdown .js-field:not(.has--filter-func)').keyup(function() {
	    var input, filter, ul, li, a, i, txtValue;
	    input = this;
	    filter = input.value.toUpperCase();
	    ul = $(this).closest('.js-custom-select').find('.field-dropdown .scroll-area')[0];
	    li = ul.getElementsByClassName("item");
	    for (i = 0; i < li.length; i++) {
	        a = li[i];
	        txtValue = a.textContent || a.innerText;
	        if (txtValue.toUpperCase().indexOf(filter) > -1) {
	            li[i].style.display = "";
	        } else {
	            li[i].style.display = "none";
	        }

	        scrollAreaScrolled($(this).closest('.js-custom-select').find('.scroll-area')[0]);
	    }
	});
	$('.js-custom-select .field-dropdown .js-field').addClass('has--filter-func');
}


function scrollTo() {
	$('[data-scrollto]').click(function (e) {
		e.preventDefault();
		var target = '#' + $(this).attr('data-scrollto');
		$('html, body').stop().animate({
			scrollTop: $(target).offset().top - $('.header-space').height()
		}, 500);
	});
}