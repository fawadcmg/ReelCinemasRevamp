var isRTL = ($('html').attr('dir') == "rtl") ? true : false,
	winWidth = $(window).width(),
	winHeight = $(window).height(),
	headerHeight = $('.c-main-header').outerHeight(),
	footerHeight = $('.c-main-footer').outerHeight(),
	bodyHeight;

loadPlayMovies();
ChangeToSvg();
setOnTopClass();
initSlick();
headerSpace();

if(winWidth > 1024){
    // $('.c-main-header').attr('data-aos', 'fade-down');
    // $('.c-main-banner, .c-main-banner .main-carousel-thumb').attr('data-aos', 'fade-up');
}
$('.c-loader').fadeOut('slow', function () {
    if(winWidth > 1024){
	   // AOS.init();
    }
});


$(function () {
	winDimensions();
	ChangeToSvg();
    footerLogosCarousel();
	/*loadPath();
	actionsOnClick();*/
	headerAdjust();
	// initSelect2();
	movieListSetHTML();
	movieList();
	tabs();
	sideNav();
	setOnTopClass();
	customSelectBox();
});

//On Window Load
$(window).on('load', function () {
	 // calcBodyarea();
});

//On Window Resize
var resizeTimer;
$(window).on('resize orientationchange', function () {
	if(winWidth != $(window).width()){
		winDimensions();
		setOnTopClass();
		// calcBodyarea();
		headerSpace();

		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function() {
			winDimensions();
			movieListSetHTML();
		}, 250);
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
		arrows: false,
		infinite: false,
		fade: true,
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
		arrows: false,
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
		if(!$(this).closest('.js-movie-list').hasClass('js-movie-list--not-open')){
			var detailsHTML = $(this).parent().find('.item-details')[0].outerHTML;
			$(this).closest('.js-movie-list').find('.movie-item').removeClass('is--active');
			$(this).closest('.movie-item').addClass('is--active');

			$(this).closest('.js-movie-list').find('.movie-details .item-details').remove();
			$(this).closest('.list-wrap').next().append(detailsHTML);

			setInView($(this).closest('.list-wrap').next()[0]);

			$('.movie-details .js-close-movie-list-detail').click(function (e) {
				e.preventDefault();
				$(this).closest('.js-movie-list').find('.movie-item').removeClass('is--active');
				$(this).closest('.js-movie-list').find('.movie-details .item-details').remove();
			});
		}
	});
}
function setInView(el) {

	var top = el.offsetTop;
	var height = el.offsetHeight;

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
		movieList();
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
	}else{
		$('.js-movie-list').slick({
			arrows: false,
			// asNavFor: '.js-main-carousel-thumb',
			focusOnSelect: true,
			swipeToSlide: true,
			infinite: false,
		});
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
	});
}

function sideNav() {
	$('.js-open-side-nav').click(function (e) {
		e.preventDefault();
		$('html').addClass('side-nav-is-open');
	});
	$('.js-close-side-nav').click(function (e) {
		e.preventDefault();
		$('html').removeClass('side-nav-is-open');
	});
}

function customSelectBox() {
	$('.js-custom-select .js-field').on('focus', function() {
		$(this).closest('.js-custom-select').addClass('is--active');
		$(this).closest('.js-custom-select').addClass('is--active-now');
		$('.js-custom-select:not(.is--active-now)').removeClass('is--active');
		$('.js-custom-select.is--active-now').removeClass('is--active-now');
		
        if(winWidth > 1024){
		  $(this).closest('.js-custom-select').find('.field-dropdown .js-field').val('').focus();
        }
		$('html').addClass('filter-open');
	});
	$('.js-custom-select .js-field').on('blur', function() {
		// $(this).closest('.js-custom-select').removeClass('is--active');
	});

	$('.js-custom-select').each(function (i) {
		hideOnClickOutside($(this));
	});

	$('.js-select-all').click(function () {
		if($(this).find('input').is(":checked")){
			$(this).closest('.js-custom-select').find('input[type="checkbox"]').prop( "checked", false );
		}else{
			$(this).closest('.js-custom-select').find('input[type="checkbox"]').prop( "checked", true );
			
		}
	});

	// for mobile
	$('.js-custom-select .field').click(function (e) {
		$(this).closest('.js-custom-select').addClass('is--active');
		$(this).closest('.js-custom-select').addClass('is--active-now');
		$('.js-custom-select:not(.is--active-now)').removeClass('is--active');
		$('.js-custom-select.is--active-now').removeClass('is--active-now');

        if(winWidth > 1024){
		  $(this).closest('.js-custom-select').find('.field-dropdown .js-field').val('').focus();
        }
		$('html').addClass('filter-open');
	});

	$('.js-close-filter-m').click(function (e) {
		e.preventDefault();
		$('.js-custom-select').removeClass('is--active');
		$('html').removeClass('filter-open');
	});

	$('.js-filter-search').click(function (e) {
		$('.js-custom-select').removeClass('is--active');
		$('html').removeClass('filter-open');
	});
}

function hideOnClickOutside(selector) {
	if(selector.hasClass('js-custom-select')){
		$('.js-custom-select input[type="text"]').blur();
	}
  const outsideClickListener = (event) => {
    if(winWidth >= 768){
        if (!$(event.target).closest(selector).length) {
          if ($(selector).hasClass('is--active')) {
            $(selector).removeClass('is--active');
            // removeClickListener();
          }
        }
    }
  }

  const removeClickListener = () => {
    document.removeEventListener('click', outsideClickListener)
  }

  document.addEventListener('click', outsideClickListener)
}


$(document).ready(function(e) {
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
	
});

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
            infinite: false,
        });
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
var isIE = detectIE();
if(isIE){
    $('html').addClass('is--ie');
    $('html').addClass('is--ie-'+isIE);

    $('[src*=reel-logo]').attr('src', 'assets/img/brand/logo.png');
}

function headerSpace() {
	$('.header-space').css('height', $('.c-main-header').height());
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