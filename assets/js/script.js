var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.9.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
/* global window, document, define, jQuery, setInterval, clearInterval */
;(function (factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
})(function ($) {
    'use strict';

    var Slick = window.Slick || {};

    Slick = function () {

        var instanceUid = 0;

        function Slick(element, settings) {

            var _ = this,
                dataSettings;

            _.defaults = {
                accessibility: true,
                adaptiveHeight: false,
                appendArrows: $(element),
                appendDots: $(element),
                arrows: true,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: false,
                autoplaySpeed: 3000,
                centerMode: false,
                centerPadding: '50px',
                cssEase: 'ease',
                customPaging: function customPaging(slider, i) {
                    return $('<button type="button" />').text(i + 1);
                },
                dots: false,
                dotsClass: 'slick-dots',
                draggable: true,
                easing: 'linear',
                edgeFriction: 0.35,
                fade: false,
                focusOnSelect: false,
                focusOnChange: false,
                infinite: true,
                initialSlide: 0,
                lazyLoad: 'ondemand',
                mobileFirst: false,
                pauseOnHover: true,
                pauseOnFocus: true,
                pauseOnDotsHover: false,
                respondTo: 'window',
                responsive: null,
                rows: 1,
                rtl: false,
                slide: '',
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: true,
                swipeToSlide: false,
                touchMove: true,
                touchThreshold: 5,
                useCSS: true,
                useTransform: true,
                variableWidth: false,
                vertical: false,
                verticalSwiping: false,
                waitForAnimate: true,
                zIndex: 1000
            };

            _.initials = {
                animating: false,
                dragging: false,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: false,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: false,
                slideOffset: 0,
                swipeLeft: null,
                swiping: false,
                $list: null,
                touchObject: {},
                transformsEnabled: false,
                unslicked: false
            };

            $.extend(_, _.initials);

            _.activeBreakpoint = null;
            _.animType = null;
            _.animProp = null;
            _.breakpoints = [];
            _.breakpointSettings = [];
            _.cssTransitions = false;
            _.focussed = false;
            _.interrupted = false;
            _.hidden = 'hidden';
            _.paused = true;
            _.positionProp = null;
            _.respondTo = null;
            _.rowCount = 1;
            _.shouldClick = true;
            _.$slider = $(element);
            _.$slidesCache = null;
            _.transformType = null;
            _.transitionType = null;
            _.visibilityChange = 'visibilitychange';
            _.windowWidth = 0;
            _.windowTimer = null;

            dataSettings = $(element).data('slick') || {};

            _.options = $.extend({}, _.defaults, settings, dataSettings);

            _.currentSlide = _.options.initialSlide;

            _.originalSettings = _.options;

            if (typeof document.mozHidden !== 'undefined') {
                _.hidden = 'mozHidden';
                _.visibilityChange = 'mozvisibilitychange';
            } else if (typeof document.webkitHidden !== 'undefined') {
                _.hidden = 'webkitHidden';
                _.visibilityChange = 'webkitvisibilitychange';
            }

            _.autoPlay = $.proxy(_.autoPlay, _);
            _.autoPlayClear = $.proxy(_.autoPlayClear, _);
            _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
            _.changeSlide = $.proxy(_.changeSlide, _);
            _.clickHandler = $.proxy(_.clickHandler, _);
            _.selectHandler = $.proxy(_.selectHandler, _);
            _.setPosition = $.proxy(_.setPosition, _);
            _.swipeHandler = $.proxy(_.swipeHandler, _);
            _.dragHandler = $.proxy(_.dragHandler, _);
            _.keyHandler = $.proxy(_.keyHandler, _);

            _.instanceUid = instanceUid++;

            // A simple way to check for HTML strings
            // Strict HTML recognition (must start with <)
            // Extracted from jQuery v1.11 source
            _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;

            _.registerBreakpoints();
            _.init(true);
        }

        return Slick;
    }();

    Slick.prototype.activateADA = function () {
        var _ = this;

        _.$slideTrack.find('.slick-active').attr({
            'aria-hidden': 'false'
        }).find('a, input, button, select').attr({
            'tabindex': '0'
        });
    };

    Slick.prototype.addSlide = Slick.prototype.slickAdd = function (markup, index, addBefore) {

        var _ = this;

        if (typeof index === 'boolean') {
            addBefore = index;
            index = null;
        } else if (index < 0 || index >= _.slideCount) {
            return false;
        }

        _.unload();

        if (typeof index === 'number') {
            if (index === 0 && _.$slides.length === 0) {
                $(markup).appendTo(_.$slideTrack);
            } else if (addBefore) {
                $(markup).insertBefore(_.$slides.eq(index));
            } else {
                $(markup).insertAfter(_.$slides.eq(index));
            }
        } else {
            if (addBefore === true) {
                $(markup).prependTo(_.$slideTrack);
            } else {
                $(markup).appendTo(_.$slideTrack);
            }
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slides.each(function (index, element) {
            $(element).attr('data-slick-index', index);
        });

        _.$slidesCache = _.$slides;

        _.reinit();
    };

    Slick.prototype.animateHeight = function () {
        var _ = this;
        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.animate({
                height: targetHeight
            }, _.options.speed);
        }
    };

    Slick.prototype.animateSlide = function (targetLeft, callback) {

        var animProps = {},
            _ = this;

        _.animateHeight();

        if (_.options.rtl === true && _.options.vertical === false) {
            targetLeft = -targetLeft;
        }
        if (_.transformsEnabled === false) {
            if (_.options.vertical === false) {
                _.$slideTrack.animate({
                    left: targetLeft
                }, _.options.speed, _.options.easing, callback);
            } else {
                _.$slideTrack.animate({
                    top: targetLeft
                }, _.options.speed, _.options.easing, callback);
            }
        } else {

            if (_.cssTransitions === false) {
                if (_.options.rtl === true) {
                    _.currentLeft = -_.currentLeft;
                }
                $({
                    animStart: _.currentLeft
                }).animate({
                    animStart: targetLeft
                }, {
                    duration: _.options.speed,
                    easing: _.options.easing,
                    step: function step(now) {
                        now = Math.ceil(now);
                        if (_.options.vertical === false) {
                            animProps[_.animType] = 'translate(' + now + 'px, 0px)';
                            _.$slideTrack.css(animProps);
                        } else {
                            animProps[_.animType] = 'translate(0px,' + now + 'px)';
                            _.$slideTrack.css(animProps);
                        }
                    },
                    complete: function complete() {
                        if (callback) {
                            callback.call();
                        }
                    }
                });
            } else {

                _.applyTransition();
                targetLeft = Math.ceil(targetLeft);

                if (_.options.vertical === false) {
                    animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
                } else {
                    animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
                }
                _.$slideTrack.css(animProps);

                if (callback) {
                    setTimeout(function () {

                        _.disableTransition();

                        callback.call();
                    }, _.options.speed);
                }
            }
        }
    };

    Slick.prototype.getNavTarget = function () {

        var _ = this,
            asNavFor = _.options.asNavFor;

        if (asNavFor && asNavFor !== null) {
            asNavFor = $(asNavFor).not(_.$slider);
        }

        return asNavFor;
    };

    Slick.prototype.asNavFor = function (index) {

        var _ = this,
            asNavFor = _.getNavTarget();

        if (asNavFor !== null && (typeof asNavFor === 'undefined' ? 'undefined' : _typeof(asNavFor)) === 'object') {
            asNavFor.each(function () {
                var target = $(this).slick('getSlick');
                if (!target.unslicked) {
                    target.slideHandler(index, true);
                }
            });
        }
    };

    Slick.prototype.applyTransition = function (slide) {

        var _ = this,
            transition = {};

        if (_.options.fade === false) {
            transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
        } else {
            transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
        }

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }
    };

    Slick.prototype.autoPlay = function () {

        var _ = this;

        _.autoPlayClear();

        if (_.slideCount > _.options.slidesToShow) {
            _.autoPlayTimer = setInterval(_.autoPlayIterator, _.options.autoplaySpeed);
        }
    };

    Slick.prototype.autoPlayClear = function () {

        var _ = this;

        if (_.autoPlayTimer) {
            clearInterval(_.autoPlayTimer);
        }
    };

    Slick.prototype.autoPlayIterator = function () {

        var _ = this,
            slideTo = _.currentSlide + _.options.slidesToScroll;

        if (!_.paused && !_.interrupted && !_.focussed) {

            if (_.options.infinite === false) {

                if (_.direction === 1 && _.currentSlide + 1 === _.slideCount - 1) {
                    _.direction = 0;
                } else if (_.direction === 0) {

                    slideTo = _.currentSlide - _.options.slidesToScroll;

                    if (_.currentSlide - 1 === 0) {
                        _.direction = 1;
                    }
                }
            }

            _.slideHandler(slideTo);
        }
    };

    Slick.prototype.buildArrows = function () {

        var _ = this;

        if (_.options.arrows === true) {

            _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
            _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');

            if (_.slideCount > _.options.slidesToShow) {

                _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
                _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

                if (_.htmlExpr.test(_.options.prevArrow)) {
                    _.$prevArrow.prependTo(_.options.appendArrows);
                }

                if (_.htmlExpr.test(_.options.nextArrow)) {
                    _.$nextArrow.appendTo(_.options.appendArrows);
                }

                if (_.options.infinite !== true) {
                    _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                }
            } else {

                _.$prevArrow.add(_.$nextArrow).addClass('slick-hidden').attr({
                    'aria-disabled': 'true',
                    'tabindex': '-1'
                });
            }
        }
    };

    Slick.prototype.buildDots = function () {

        var _ = this,
            i,
            dot;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$slider.addClass('slick-dotted');

            dot = $('<ul />').addClass(_.options.dotsClass);

            for (i = 0; i <= _.getDotCount(); i += 1) {
                dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));
            }

            _.$dots = dot.appendTo(_.options.appendDots);

            _.$dots.find('li').first().addClass('slick-active');
        }
    };

    Slick.prototype.buildOut = function () {

        var _ = this;

        _.$slides = _.$slider.children(_.options.slide + ':not(.slick-cloned)').addClass('slick-slide');

        _.slideCount = _.$slides.length;

        _.$slides.each(function (index, element) {
            $(element).attr('data-slick-index', index).data('originalStyling', $(element).attr('style') || '');
        });

        _.$slider.addClass('slick-slider');

        _.$slideTrack = _.slideCount === 0 ? $('<div class="slick-track"/>').appendTo(_.$slider) : _.$slides.wrapAll('<div class="slick-track"/>').parent();

        _.$list = _.$slideTrack.wrap('<div class="slick-list"/>').parent();
        _.$slideTrack.css('opacity', 0);

        if (_.options.centerMode === true || _.options.swipeToSlide === true) {
            _.options.slidesToScroll = 1;
        }

        $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

        _.setupInfinite();

        _.buildArrows();

        _.buildDots();

        _.updateDots();

        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        if (_.options.draggable === true) {
            _.$list.addClass('draggable');
        }
    };

    Slick.prototype.buildRows = function () {

        var _ = this,
            a,
            b,
            c,
            newSlides,
            numOfSlides,
            originalSlides,
            slidesPerSection;

        newSlides = document.createDocumentFragment();
        originalSlides = _.$slider.children();

        if (_.options.rows > 0) {

            slidesPerSection = _.options.slidesPerRow * _.options.rows;
            numOfSlides = Math.ceil(originalSlides.length / slidesPerSection);

            for (a = 0; a < numOfSlides; a++) {
                var slide = document.createElement('div');
                for (b = 0; b < _.options.rows; b++) {
                    var row = document.createElement('div');
                    for (c = 0; c < _.options.slidesPerRow; c++) {
                        var target = a * slidesPerSection + (b * _.options.slidesPerRow + c);
                        if (originalSlides.get(target)) {
                            row.appendChild(originalSlides.get(target));
                        }
                    }
                    slide.appendChild(row);
                }
                newSlides.appendChild(slide);
            }

            _.$slider.empty().append(newSlides);
            _.$slider.children().children().children().css({
                'width': 100 / _.options.slidesPerRow + '%',
                'display': 'inline-block'
            });
        }
    };

    Slick.prototype.checkResponsive = function (initial, forceUpdate) {

        var _ = this,
            breakpoint,
            targetBreakpoint,
            respondToWidth,
            triggerBreakpoint = false;
        var sliderWidth = _.$slider.width();
        var windowWidth = window.innerWidth || $(window).width();

        if (_.respondTo === 'window') {
            respondToWidth = windowWidth;
        } else if (_.respondTo === 'slider') {
            respondToWidth = sliderWidth;
        } else if (_.respondTo === 'min') {
            respondToWidth = Math.min(windowWidth, sliderWidth);
        }

        if (_.options.responsive && _.options.responsive.length && _.options.responsive !== null) {

            targetBreakpoint = null;

            for (breakpoint in _.breakpoints) {
                if (_.breakpoints.hasOwnProperty(breakpoint)) {
                    if (_.originalSettings.mobileFirst === false) {
                        if (respondToWidth < _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    } else {
                        if (respondToWidth > _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    }
                }
            }

            if (targetBreakpoint !== null) {
                if (_.activeBreakpoint !== null) {
                    if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
                        _.activeBreakpoint = targetBreakpoint;
                        if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                            _.unslick(targetBreakpoint);
                        } else {
                            _.options = $.extend({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]);
                            if (initial === true) {
                                _.currentSlide = _.options.initialSlide;
                            }
                            _.refresh(initial);
                        }
                        triggerBreakpoint = targetBreakpoint;
                    }
                } else {
                    _.activeBreakpoint = targetBreakpoint;
                    if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                        _.unslick(targetBreakpoint);
                    } else {
                        _.options = $.extend({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]);
                        if (initial === true) {
                            _.currentSlide = _.options.initialSlide;
                        }
                        _.refresh(initial);
                    }
                    triggerBreakpoint = targetBreakpoint;
                }
            } else {
                if (_.activeBreakpoint !== null) {
                    _.activeBreakpoint = null;
                    _.options = _.originalSettings;
                    if (initial === true) {
                        _.currentSlide = _.options.initialSlide;
                    }
                    _.refresh(initial);
                    triggerBreakpoint = targetBreakpoint;
                }
            }

            // only trigger breakpoints during an actual break. not on initialize.
            if (!initial && triggerBreakpoint !== false) {
                _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
            }
        }
    };

    Slick.prototype.changeSlide = function (event, dontAnimate) {

        var _ = this,
            $target = $(event.currentTarget),
            indexOffset,
            slideOffset,
            unevenOffset;

        // If target is a link, prevent default action.
        if ($target.is('a')) {
            event.preventDefault();
        }

        // If target is not the <li> element (ie: a child), find the <li>.
        if (!$target.is('li')) {
            $target = $target.closest('li');
        }

        unevenOffset = _.slideCount % _.options.slidesToScroll !== 0;
        indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

        switch (event.data.message) {

            case 'previous':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
                }
                break;

            case 'next':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
                }
                break;

            case 'index':
                var index = event.data.index === 0 ? 0 : event.data.index || $target.index() * _.options.slidesToScroll;

                _.slideHandler(_.checkNavigable(index), false, dontAnimate);
                $target.children().trigger('focus');
                break;

            default:
                return;
        }
    };

    Slick.prototype.checkNavigable = function (index) {

        var _ = this,
            navigables,
            prevNavigable;

        navigables = _.getNavigableIndexes();
        prevNavigable = 0;
        if (index > navigables[navigables.length - 1]) {
            index = navigables[navigables.length - 1];
        } else {
            for (var n in navigables) {
                if (index < navigables[n]) {
                    index = prevNavigable;
                    break;
                }
                prevNavigable = navigables[n];
            }
        }

        return index;
    };

    Slick.prototype.cleanUpEvents = function () {

        var _ = this;

        if (_.options.dots && _.$dots !== null) {

            $('li', _.$dots).off('click.slick', _.changeSlide).off('mouseenter.slick', $.proxy(_.interrupt, _, true)).off('mouseleave.slick', $.proxy(_.interrupt, _, false));

            if (_.options.accessibility === true) {
                _.$dots.off('keydown.slick', _.keyHandler);
            }
        }

        _.$slider.off('focus.slick blur.slick');

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
            _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);

            if (_.options.accessibility === true) {
                _.$prevArrow && _.$prevArrow.off('keydown.slick', _.keyHandler);
                _.$nextArrow && _.$nextArrow.off('keydown.slick', _.keyHandler);
            }
        }

        _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
        _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
        _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
        _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);

        _.$list.off('click.slick', _.clickHandler);

        $(document).off(_.visibilityChange, _.visibility);

        _.cleanUpSlideEvents();

        if (_.options.accessibility === true) {
            _.$list.off('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().off('click.slick', _.selectHandler);
        }

        $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);

        $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);

        $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);

        $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);
    };

    Slick.prototype.cleanUpSlideEvents = function () {

        var _ = this;

        _.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));
        _.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));
    };

    Slick.prototype.cleanUpRows = function () {

        var _ = this,
            originalSlides;

        if (_.options.rows > 0) {
            originalSlides = _.$slides.children().children();
            originalSlides.removeAttr('style');
            _.$slider.empty().append(originalSlides);
        }
    };

    Slick.prototype.clickHandler = function (event) {

        var _ = this;

        if (_.shouldClick === false) {
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault();
        }
    };

    Slick.prototype.destroy = function (refresh) {

        var _ = this;

        _.autoPlayClear();

        _.touchObject = {};

        _.cleanUpEvents();

        $('.slick-cloned', _.$slider).detach();

        if (_.$dots) {
            _.$dots.remove();
        }

        if (_.$prevArrow && _.$prevArrow.length) {

            _.$prevArrow.removeClass('slick-disabled slick-arrow slick-hidden').removeAttr('aria-hidden aria-disabled tabindex').css('display', '');

            if (_.htmlExpr.test(_.options.prevArrow)) {
                _.$prevArrow.remove();
            }
        }

        if (_.$nextArrow && _.$nextArrow.length) {

            _.$nextArrow.removeClass('slick-disabled slick-arrow slick-hidden').removeAttr('aria-hidden aria-disabled tabindex').css('display', '');

            if (_.htmlExpr.test(_.options.nextArrow)) {
                _.$nextArrow.remove();
            }
        }

        if (_.$slides) {

            _.$slides.removeClass('slick-slide slick-active slick-center slick-visible slick-current').removeAttr('aria-hidden').removeAttr('data-slick-index').each(function () {
                $(this).attr('style', $(this).data('originalStyling'));
            });

            _.$slideTrack.children(this.options.slide).detach();

            _.$slideTrack.detach();

            _.$list.detach();

            _.$slider.append(_.$slides);
        }

        _.cleanUpRows();

        _.$slider.removeClass('slick-slider');
        _.$slider.removeClass('slick-initialized');
        _.$slider.removeClass('slick-dotted');

        _.unslicked = true;

        if (!refresh) {
            _.$slider.trigger('destroy', [_]);
        }
    };

    Slick.prototype.disableTransition = function (slide) {

        var _ = this,
            transition = {};

        transition[_.transitionType] = '';

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }
    };

    Slick.prototype.fadeSlide = function (slideIndex, callback) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).css({
                zIndex: _.options.zIndex
            });

            _.$slides.eq(slideIndex).animate({
                opacity: 1
            }, _.options.speed, _.options.easing, callback);
        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 1,
                zIndex: _.options.zIndex
            });

            if (callback) {
                setTimeout(function () {

                    _.disableTransition(slideIndex);

                    callback.call();
                }, _.options.speed);
            }
        }
    };

    Slick.prototype.fadeSlideOut = function (slideIndex) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).animate({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            }, _.options.speed, _.options.easing);
        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            });
        }
    };

    Slick.prototype.filterSlides = Slick.prototype.slickFilter = function (filter) {

        var _ = this;

        if (filter !== null) {

            _.$slidesCache = _.$slides;

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.filter(filter).appendTo(_.$slideTrack);

            _.reinit();
        }
    };

    Slick.prototype.focusHandler = function () {

        var _ = this;

        // If any child element receives focus within the slider we need to pause the autoplay
        _.$slider.off('focus.slick blur.slick').on('focus.slick', '*', function (event) {
            var $sf = $(this);

            setTimeout(function () {
                if (_.options.pauseOnFocus) {
                    if ($sf.is(':focus')) {
                        _.focussed = true;
                        _.autoPlay();
                    }
                }
            }, 0);
        }).on('blur.slick', '*', function (event) {
            var $sf = $(this);

            // When a blur occurs on any elements within the slider we become unfocused
            if (_.options.pauseOnFocus) {
                _.focussed = false;
                _.autoPlay();
            }
        });
    };

    Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function () {

        var _ = this;
        return _.currentSlide;
    };

    Slick.prototype.getDotCount = function () {

        var _ = this;

        var breakPoint = 0;
        var counter = 0;
        var pagerQty = 0;

        if (_.options.infinite === true) {
            if (_.slideCount <= _.options.slidesToShow) {
                ++pagerQty;
            } else {
                while (breakPoint < _.slideCount) {
                    ++pagerQty;
                    breakPoint = counter + _.options.slidesToScroll;
                    counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
                }
            }
        } else if (_.options.centerMode === true) {
            pagerQty = _.slideCount;
        } else if (!_.options.asNavFor) {
            pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
        } else {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
            }
        }

        return pagerQty - 1;
    };

    Slick.prototype.getLeft = function (slideIndex) {

        var _ = this,
            targetLeft,
            verticalHeight,
            verticalOffset = 0,
            targetSlide,
            coef;

        _.slideOffset = 0;
        verticalHeight = _.$slides.first().outerHeight(true);

        if (_.options.infinite === true) {
            if (_.slideCount > _.options.slidesToShow) {
                _.slideOffset = _.slideWidth * _.options.slidesToShow * -1;
                coef = -1;

                if (_.options.vertical === true && _.options.centerMode === true) {
                    if (_.options.slidesToShow === 2) {
                        coef = -1.5;
                    } else if (_.options.slidesToShow === 1) {
                        coef = -2;
                    }
                }
                verticalOffset = verticalHeight * _.options.slidesToShow * coef;
            }
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
                    if (slideIndex > _.slideCount) {
                        _.slideOffset = (_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth * -1;
                        verticalOffset = (_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight * -1;
                    } else {
                        _.slideOffset = _.slideCount % _.options.slidesToScroll * _.slideWidth * -1;
                        verticalOffset = _.slideCount % _.options.slidesToScroll * verticalHeight * -1;
                    }
                }
            }
        } else {
            if (slideIndex + _.options.slidesToShow > _.slideCount) {
                _.slideOffset = (slideIndex + _.options.slidesToShow - _.slideCount) * _.slideWidth;
                verticalOffset = (slideIndex + _.options.slidesToShow - _.slideCount) * verticalHeight;
            }
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.slideOffset = 0;
            verticalOffset = 0;
        }

        if (_.options.centerMode === true && _.slideCount <= _.options.slidesToShow) {
            _.slideOffset = _.slideWidth * Math.floor(_.options.slidesToShow) / 2 - _.slideWidth * _.slideCount / 2;
        } else if (_.options.centerMode === true && _.options.infinite === true) {
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
        } else if (_.options.centerMode === true) {
            _.slideOffset = 0;
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
        }

        if (_.options.vertical === false) {
            targetLeft = slideIndex * _.slideWidth * -1 + _.slideOffset;
        } else {
            targetLeft = slideIndex * verticalHeight * -1 + verticalOffset;
        }

        if (_.options.variableWidth === true) {

            if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
            } else {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
            }

            if (_.options.rtl === true) {
                if (targetSlide[0]) {
                    targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                } else {
                    targetLeft = 0;
                }
            } else {
                targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
            }

            if (_.options.centerMode === true) {
                if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
                } else {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
                }

                if (_.options.rtl === true) {
                    if (targetSlide[0]) {
                        targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                    } else {
                        targetLeft = 0;
                    }
                } else {
                    targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
                }

                targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
            }
        }

        return targetLeft;
    };

    Slick.prototype.getOption = Slick.prototype.slickGetOption = function (option) {

        var _ = this;

        return _.options[option];
    };

    Slick.prototype.getNavigableIndexes = function () {

        var _ = this,
            breakPoint = 0,
            counter = 0,
            indexes = [],
            max;

        if (_.options.infinite === false) {
            max = _.slideCount;
        } else {
            breakPoint = _.options.slidesToScroll * -1;
            counter = _.options.slidesToScroll * -1;
            max = _.slideCount * 2;
        }

        while (breakPoint < max) {
            indexes.push(breakPoint);
            breakPoint = counter + _.options.slidesToScroll;
            counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        }

        return indexes;
    };

    Slick.prototype.getSlick = function () {

        return this;
    };

    Slick.prototype.getSlideCount = function () {

        var _ = this,
            slidesTraversed,
            swipedSlide,
            swipeTarget,
            centerOffset;

        centerOffset = _.options.centerMode === true ? Math.floor(_.$list.width() / 2) : 0;
        swipeTarget = _.swipeLeft * -1 + centerOffset;

        if (_.options.swipeToSlide === true) {

            _.$slideTrack.find('.slick-slide').each(function (index, slide) {

                var slideOuterWidth, slideOffset, slideRightBoundary;
                slideOuterWidth = $(slide).outerWidth();
                slideOffset = slide.offsetLeft;
                if (_.options.centerMode !== true) {
                    slideOffset += slideOuterWidth / 2;
                }

                slideRightBoundary = slideOffset + slideOuterWidth;

                if (swipeTarget < slideRightBoundary) {
                    swipedSlide = slide;
                    return false;
                }
            });

            slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;

            return slidesTraversed;
        } else {
            return _.options.slidesToScroll;
        }
    };

    Slick.prototype.goTo = Slick.prototype.slickGoTo = function (slide, dontAnimate) {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'index',
                index: parseInt(slide)
            }
        }, dontAnimate);
    };

    Slick.prototype.init = function (creation) {

        var _ = this;

        if (!$(_.$slider).hasClass('slick-initialized')) {

            $(_.$slider).addClass('slick-initialized');

            _.buildRows();
            _.buildOut();
            _.setProps();
            _.startLoad();
            _.loadSlider();
            _.initializeEvents();
            _.updateArrows();
            _.updateDots();
            _.checkResponsive(true);
            _.focusHandler();
        }

        if (creation) {
            _.$slider.trigger('init', [_]);
        }

        if (_.options.accessibility === true) {
            _.initADA();
        }

        if (_.options.autoplay) {

            _.paused = false;
            _.autoPlay();
        }
    };

    Slick.prototype.initADA = function () {
        var _ = this,
            numDotGroups = Math.ceil(_.slideCount / _.options.slidesToShow),
            tabControlIndexes = _.getNavigableIndexes().filter(function (val) {
            return val >= 0 && val < _.slideCount;
        });

        _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
            'aria-hidden': 'true',
            'tabindex': '-1'
        }).find('a, input, button, select').attr({
            'tabindex': '-1'
        });

        if (_.$dots !== null) {
            _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function (i) {
                var slideControlIndex = tabControlIndexes.indexOf(i);

                $(this).attr({
                    'role': 'tabpanel',
                    'id': 'slick-slide' + _.instanceUid + i,
                    'tabindex': -1
                });

                if (slideControlIndex !== -1) {
                    var ariaButtonControl = 'slick-slide-control' + _.instanceUid + slideControlIndex;
                    if ($('#' + ariaButtonControl).length) {
                        $(this).attr({
                            'aria-describedby': ariaButtonControl
                        });
                    }
                }
            });

            _.$dots.attr('role', 'tablist').find('li').each(function (i) {
                var mappedSlideIndex = tabControlIndexes[i];

                $(this).attr({
                    'role': 'presentation'
                });

                $(this).find('button').first().attr({
                    'role': 'tab',
                    'id': 'slick-slide-control' + _.instanceUid + i,
                    'aria-controls': 'slick-slide' + _.instanceUid + mappedSlideIndex,
                    'aria-label': i + 1 + ' of ' + numDotGroups,
                    'aria-selected': null,
                    'tabindex': '-1'
                });
            }).eq(_.currentSlide).find('button').attr({
                'aria-selected': 'true',
                'tabindex': '0'
            }).end();
        }

        for (var i = _.currentSlide, max = i + _.options.slidesToShow; i < max; i++) {
            if (_.options.focusOnChange) {
                _.$slides.eq(i).attr({ 'tabindex': '0' });
            } else {
                _.$slides.eq(i).removeAttr('tabindex');
            }
        }

        _.activateADA();
    };

    Slick.prototype.initArrowEvents = function () {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow.off('click.slick').on('click.slick', {
                message: 'previous'
            }, _.changeSlide);
            _.$nextArrow.off('click.slick').on('click.slick', {
                message: 'next'
            }, _.changeSlide);

            if (_.options.accessibility === true) {
                _.$prevArrow.on('keydown.slick', _.keyHandler);
                _.$nextArrow.on('keydown.slick', _.keyHandler);
            }
        }
    };

    Slick.prototype.initDotEvents = function () {

        var _ = this;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            $('li', _.$dots).on('click.slick', {
                message: 'index'
            }, _.changeSlide);

            if (_.options.accessibility === true) {
                _.$dots.on('keydown.slick', _.keyHandler);
            }
        }

        if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.slideCount > _.options.slidesToShow) {

            $('li', _.$dots).on('mouseenter.slick', $.proxy(_.interrupt, _, true)).on('mouseleave.slick', $.proxy(_.interrupt, _, false));
        }
    };

    Slick.prototype.initSlideEvents = function () {

        var _ = this;

        if (_.options.pauseOnHover) {

            _.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));
            _.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));
        }
    };

    Slick.prototype.initializeEvents = function () {

        var _ = this;

        _.initArrowEvents();

        _.initDotEvents();
        _.initSlideEvents();

        _.$list.on('touchstart.slick mousedown.slick', {
            action: 'start'
        }, _.swipeHandler);
        _.$list.on('touchmove.slick mousemove.slick', {
            action: 'move'
        }, _.swipeHandler);
        _.$list.on('touchend.slick mouseup.slick', {
            action: 'end'
        }, _.swipeHandler);
        _.$list.on('touchcancel.slick mouseleave.slick', {
            action: 'end'
        }, _.swipeHandler);

        _.$list.on('click.slick', _.clickHandler);

        $(document).on(_.visibilityChange, $.proxy(_.visibility, _));

        if (_.options.accessibility === true) {
            _.$list.on('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));

        $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));

        $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);

        $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
        $(_.setPosition);
    };

    Slick.prototype.initUI = function () {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.show();
            _.$nextArrow.show();
        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.show();
        }
    };

    Slick.prototype.keyHandler = function (event) {

        var _ = this;
        //Dont slide if the cursor is inside the form fields and arrow keys are pressed
        if (!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
            if (event.keyCode === 37 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'next' : 'previous'
                    }
                });
            } else if (event.keyCode === 39 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'previous' : 'next'
                    }
                });
            }
        }
    };

    Slick.prototype.lazyLoad = function () {

        var _ = this,
            loadRange,
            cloneRange,
            rangeStart,
            rangeEnd;

        function loadImages(imagesScope) {

            $('img[data-lazy]', imagesScope).each(function () {

                var image = $(this),
                    imageSource = $(this).attr('data-lazy'),
                    imageSrcSet = $(this).attr('data-srcset'),
                    imageSizes = $(this).attr('data-sizes') || _.$slider.attr('data-sizes'),
                    imageToLoad = document.createElement('img');

                imageToLoad.onload = function () {

                    image.animate({ opacity: 0 }, 100, function () {

                        if (imageSrcSet) {
                            image.attr('srcset', imageSrcSet);

                            if (imageSizes) {
                                image.attr('sizes', imageSizes);
                            }
                        }

                        image.attr('src', imageSource).animate({ opacity: 1 }, 200, function () {
                            image.removeAttr('data-lazy data-srcset data-sizes').removeClass('slick-loading');
                        });
                        _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
                    });
                };

                imageToLoad.onerror = function () {

                    image.removeAttr('data-lazy').removeClass('slick-loading').addClass('slick-lazyload-error');

                    _.$slider.trigger('lazyLoadError', [_, image, imageSource]);
                };

                imageToLoad.src = imageSource;
            });
        }

        if (_.options.centerMode === true) {
            if (_.options.infinite === true) {
                rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
                rangeEnd = rangeStart + _.options.slidesToShow + 2;
            } else {
                rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
                rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
            }
        } else {
            rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
            rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
            if (_.options.fade === true) {
                if (rangeStart > 0) rangeStart--;
                if (rangeEnd <= _.slideCount) rangeEnd++;
            }
        }

        loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);

        if (_.options.lazyLoad === 'anticipated') {
            var prevSlide = rangeStart - 1,
                nextSlide = rangeEnd,
                $slides = _.$slider.find('.slick-slide');

            for (var i = 0; i < _.options.slidesToScroll; i++) {
                if (prevSlide < 0) prevSlide = _.slideCount - 1;
                loadRange = loadRange.add($slides.eq(prevSlide));
                loadRange = loadRange.add($slides.eq(nextSlide));
                prevSlide--;
                nextSlide++;
            }
        }

        loadImages(loadRange);

        if (_.slideCount <= _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-slide');
            loadImages(cloneRange);
        } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
            loadImages(cloneRange);
        } else if (_.currentSlide === 0) {
            cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
            loadImages(cloneRange);
        }
    };

    Slick.prototype.loadSlider = function () {

        var _ = this;

        _.setPosition();

        _.$slideTrack.css({
            opacity: 1
        });

        _.$slider.removeClass('slick-loading');

        _.initUI();

        if (_.options.lazyLoad === 'progressive') {
            _.progressiveLazyLoad();
        }
    };

    Slick.prototype.next = Slick.prototype.slickNext = function () {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'next'
            }
        });
    };

    Slick.prototype.orientationChange = function () {

        var _ = this;

        _.checkResponsive();
        _.setPosition();
    };

    Slick.prototype.pause = Slick.prototype.slickPause = function () {

        var _ = this;

        _.autoPlayClear();
        _.paused = true;
    };

    Slick.prototype.play = Slick.prototype.slickPlay = function () {

        var _ = this;

        _.autoPlay();
        _.options.autoplay = true;
        _.paused = false;
        _.focussed = false;
        _.interrupted = false;
    };

    Slick.prototype.postSlide = function (index) {

        var _ = this;

        if (!_.unslicked) {

            _.$slider.trigger('afterChange', [_, index]);

            _.animating = false;

            if (_.slideCount > _.options.slidesToShow) {
                _.setPosition();
            }

            _.swipeLeft = null;

            if (_.options.autoplay) {
                _.autoPlay();
            }

            if (_.options.accessibility === true) {
                _.initADA();

                if (_.options.focusOnChange) {
                    var $currentSlide = $(_.$slides.get(_.currentSlide));
                    $currentSlide.attr('tabindex', 0).focus();
                }
            }
        }
    };

    Slick.prototype.prev = Slick.prototype.slickPrev = function () {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'previous'
            }
        });
    };

    Slick.prototype.preventDefault = function (event) {

        event.preventDefault();
    };

    Slick.prototype.progressiveLazyLoad = function (tryCount) {

        tryCount = tryCount || 1;

        var _ = this,
            $imgsToLoad = $('img[data-lazy]', _.$slider),
            image,
            imageSource,
            imageSrcSet,
            imageSizes,
            imageToLoad;

        if ($imgsToLoad.length) {

            image = $imgsToLoad.first();
            imageSource = image.attr('data-lazy');
            imageSrcSet = image.attr('data-srcset');
            imageSizes = image.attr('data-sizes') || _.$slider.attr('data-sizes');
            imageToLoad = document.createElement('img');

            imageToLoad.onload = function () {

                if (imageSrcSet) {
                    image.attr('srcset', imageSrcSet);

                    if (imageSizes) {
                        image.attr('sizes', imageSizes);
                    }
                }

                image.attr('src', imageSource).removeAttr('data-lazy data-srcset data-sizes').removeClass('slick-loading');

                if (_.options.adaptiveHeight === true) {
                    _.setPosition();
                }

                _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
                _.progressiveLazyLoad();
            };

            imageToLoad.onerror = function () {

                if (tryCount < 3) {

                    /**
                     * try to load the image 3 times,
                     * leave a slight delay so we don't get
                     * servers blocking the request.
                     */
                    setTimeout(function () {
                        _.progressiveLazyLoad(tryCount + 1);
                    }, 500);
                } else {

                    image.removeAttr('data-lazy').removeClass('slick-loading').addClass('slick-lazyload-error');

                    _.$slider.trigger('lazyLoadError', [_, image, imageSource]);

                    _.progressiveLazyLoad();
                }
            };

            imageToLoad.src = imageSource;
        } else {

            _.$slider.trigger('allImagesLoaded', [_]);
        }
    };

    Slick.prototype.refresh = function (initializing) {

        var _ = this,
            currentSlide,
            lastVisibleIndex;

        lastVisibleIndex = _.slideCount - _.options.slidesToShow;

        // in non-infinite sliders, we don't want to go past the
        // last visible index.
        if (!_.options.infinite && _.currentSlide > lastVisibleIndex) {
            _.currentSlide = lastVisibleIndex;
        }

        // if less slides than to show, go to start.
        if (_.slideCount <= _.options.slidesToShow) {
            _.currentSlide = 0;
        }

        currentSlide = _.currentSlide;

        _.destroy(true);

        $.extend(_, _.initials, { currentSlide: currentSlide });

        _.init();

        if (!initializing) {

            _.changeSlide({
                data: {
                    message: 'index',
                    index: currentSlide
                }
            }, false);
        }
    };

    Slick.prototype.registerBreakpoints = function () {

        var _ = this,
            breakpoint,
            currentBreakpoint,
            l,
            responsiveSettings = _.options.responsive || null;

        if ($.type(responsiveSettings) === 'array' && responsiveSettings.length) {

            _.respondTo = _.options.respondTo || 'window';

            for (breakpoint in responsiveSettings) {

                l = _.breakpoints.length - 1;

                if (responsiveSettings.hasOwnProperty(breakpoint)) {
                    currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

                    // loop through the breakpoints and cut out any existing
                    // ones with the same breakpoint number, we don't want dupes.
                    while (l >= 0) {
                        if (_.breakpoints[l] && _.breakpoints[l] === currentBreakpoint) {
                            _.breakpoints.splice(l, 1);
                        }
                        l--;
                    }

                    _.breakpoints.push(currentBreakpoint);
                    _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;
                }
            }

            _.breakpoints.sort(function (a, b) {
                return _.options.mobileFirst ? a - b : b - a;
            });
        }
    };

    Slick.prototype.reinit = function () {

        var _ = this;

        _.$slides = _.$slideTrack.children(_.options.slide).addClass('slick-slide');

        _.slideCount = _.$slides.length;

        if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
            _.currentSlide = _.currentSlide - _.options.slidesToScroll;
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.currentSlide = 0;
        }

        _.registerBreakpoints();

        _.setProps();
        _.setupInfinite();
        _.buildArrows();
        _.updateArrows();
        _.initArrowEvents();
        _.buildDots();
        _.updateDots();
        _.initDotEvents();
        _.cleanUpSlideEvents();
        _.initSlideEvents();

        _.checkResponsive(false, true);

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        _.setPosition();
        _.focusHandler();

        _.paused = !_.options.autoplay;
        _.autoPlay();

        _.$slider.trigger('reInit', [_]);
    };

    Slick.prototype.resize = function () {

        var _ = this;

        if ($(window).width() !== _.windowWidth) {
            clearTimeout(_.windowDelay);
            _.windowDelay = window.setTimeout(function () {
                _.windowWidth = $(window).width();
                _.checkResponsive();
                if (!_.unslicked) {
                    _.setPosition();
                }
            }, 50);
        }
    };

    Slick.prototype.removeSlide = Slick.prototype.slickRemove = function (index, removeBefore, removeAll) {

        var _ = this;

        if (typeof index === 'boolean') {
            removeBefore = index;
            index = removeBefore === true ? 0 : _.slideCount - 1;
        } else {
            index = removeBefore === true ? --index : index;
        }

        if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
            return false;
        }

        _.unload();

        if (removeAll === true) {
            _.$slideTrack.children().remove();
        } else {
            _.$slideTrack.children(this.options.slide).eq(index).remove();
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slidesCache = _.$slides;

        _.reinit();
    };

    Slick.prototype.setCSS = function (position) {

        var _ = this,
            positionProps = {},
            x,
            y;

        if (_.options.rtl === true) {
            position = -position;
        }
        x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
        y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';

        positionProps[_.positionProp] = position;

        if (_.transformsEnabled === false) {
            _.$slideTrack.css(positionProps);
        } else {
            positionProps = {};
            if (_.cssTransitions === false) {
                positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
                _.$slideTrack.css(positionProps);
            } else {
                positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
                _.$slideTrack.css(positionProps);
            }
        }
    };

    Slick.prototype.setDimensions = function () {

        var _ = this;

        if (_.options.vertical === false) {
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: '0px ' + _.options.centerPadding
                });
            }
        } else {
            _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: _.options.centerPadding + ' 0px'
                });
            }
        }

        _.listWidth = _.$list.width();
        _.listHeight = _.$list.height();

        if (_.options.vertical === false && _.options.variableWidth === false) {
            _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
            _.$slideTrack.width(Math.ceil(_.slideWidth * _.$slideTrack.children('.slick-slide').length));
        } else if (_.options.variableWidth === true) {
            _.$slideTrack.width(5000 * _.slideCount);
        } else {
            _.slideWidth = Math.ceil(_.listWidth);
            _.$slideTrack.height(Math.ceil(_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length));
        }

        var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
        if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);
    };

    Slick.prototype.setFade = function () {

        var _ = this,
            targetLeft;

        _.$slides.each(function (index, element) {
            targetLeft = _.slideWidth * index * -1;
            if (_.options.rtl === true) {
                $(element).css({
                    position: 'relative',
                    right: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            } else {
                $(element).css({
                    position: 'relative',
                    left: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            }
        });

        _.$slides.eq(_.currentSlide).css({
            zIndex: _.options.zIndex - 1,
            opacity: 1
        });
    };

    Slick.prototype.setHeight = function () {

        var _ = this;

        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.css('height', targetHeight);
        }
    };

    Slick.prototype.setOption = Slick.prototype.slickSetOption = function () {

        /**
         * accepts arguments in format of:
         *
         *  - for changing a single option's value:
         *     .slick("setOption", option, value, refresh )
         *
         *  - for changing a set of responsive options:
         *     .slick("setOption", 'responsive', [{}, ...], refresh )
         *
         *  - for updating multiple values at once (not responsive)
         *     .slick("setOption", { 'option': value, ... }, refresh )
         */

        var _ = this,
            l,
            item,
            option,
            value,
            refresh = false,
            type;

        if ($.type(arguments[0]) === 'object') {

            option = arguments[0];
            refresh = arguments[1];
            type = 'multiple';
        } else if ($.type(arguments[0]) === 'string') {

            option = arguments[0];
            value = arguments[1];
            refresh = arguments[2];

            if (arguments[0] === 'responsive' && $.type(arguments[1]) === 'array') {

                type = 'responsive';
            } else if (typeof arguments[1] !== 'undefined') {

                type = 'single';
            }
        }

        if (type === 'single') {

            _.options[option] = value;
        } else if (type === 'multiple') {

            $.each(option, function (opt, val) {

                _.options[opt] = val;
            });
        } else if (type === 'responsive') {

            for (item in value) {

                if ($.type(_.options.responsive) !== 'array') {

                    _.options.responsive = [value[item]];
                } else {

                    l = _.options.responsive.length - 1;

                    // loop through the responsive object and splice out duplicates.
                    while (l >= 0) {

                        if (_.options.responsive[l].breakpoint === value[item].breakpoint) {

                            _.options.responsive.splice(l, 1);
                        }

                        l--;
                    }

                    _.options.responsive.push(value[item]);
                }
            }
        }

        if (refresh) {

            _.unload();
            _.reinit();
        }
    };

    Slick.prototype.setPosition = function () {

        var _ = this;

        _.setDimensions();

        _.setHeight();

        if (_.options.fade === false) {
            _.setCSS(_.getLeft(_.currentSlide));
        } else {
            _.setFade();
        }

        _.$slider.trigger('setPosition', [_]);
    };

    Slick.prototype.setProps = function () {

        var _ = this,
            bodyStyle = document.body.style;

        _.positionProp = _.options.vertical === true ? 'top' : 'left';

        if (_.positionProp === 'top') {
            _.$slider.addClass('slick-vertical');
        } else {
            _.$slider.removeClass('slick-vertical');
        }

        if (bodyStyle.WebkitTransition !== undefined || bodyStyle.MozTransition !== undefined || bodyStyle.msTransition !== undefined) {
            if (_.options.useCSS === true) {
                _.cssTransitions = true;
            }
        }

        if (_.options.fade) {
            if (typeof _.options.zIndex === 'number') {
                if (_.options.zIndex < 3) {
                    _.options.zIndex = 3;
                }
            } else {
                _.options.zIndex = _.defaults.zIndex;
            }
        }

        if (bodyStyle.OTransform !== undefined) {
            _.animType = 'OTransform';
            _.transformType = '-o-transform';
            _.transitionType = 'OTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.MozTransform !== undefined) {
            _.animType = 'MozTransform';
            _.transformType = '-moz-transform';
            _.transitionType = 'MozTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.webkitTransform !== undefined) {
            _.animType = 'webkitTransform';
            _.transformType = '-webkit-transform';
            _.transitionType = 'webkitTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.msTransform !== undefined) {
            _.animType = 'msTransform';
            _.transformType = '-ms-transform';
            _.transitionType = 'msTransition';
            if (bodyStyle.msTransform === undefined) _.animType = false;
        }
        if (bodyStyle.transform !== undefined && _.animType !== false) {
            _.animType = 'transform';
            _.transformType = 'transform';
            _.transitionType = 'transition';
        }
        _.transformsEnabled = _.options.useTransform && _.animType !== null && _.animType !== false;
    };

    Slick.prototype.setSlideClasses = function (index) {

        var _ = this,
            centerOffset,
            allSlides,
            indexOffset,
            remainder;

        allSlides = _.$slider.find('.slick-slide').removeClass('slick-active slick-center slick-current').attr('aria-hidden', 'true');

        _.$slides.eq(index).addClass('slick-current');

        if (_.options.centerMode === true) {

            var evenCoef = _.options.slidesToShow % 2 === 0 ? 1 : 0;

            centerOffset = Math.floor(_.options.slidesToShow / 2);

            if (_.options.infinite === true) {

                if (index >= centerOffset && index <= _.slideCount - 1 - centerOffset) {
                    _.$slides.slice(index - centerOffset + evenCoef, index + centerOffset + 1).addClass('slick-active').attr('aria-hidden', 'false');
                } else {

                    indexOffset = _.options.slidesToShow + index;
                    allSlides.slice(indexOffset - centerOffset + 1 + evenCoef, indexOffset + centerOffset + 2).addClass('slick-active').attr('aria-hidden', 'false');
                }

                if (index === 0) {

                    allSlides.eq(allSlides.length - 1 - _.options.slidesToShow).addClass('slick-center');
                } else if (index === _.slideCount - 1) {

                    allSlides.eq(_.options.slidesToShow).addClass('slick-center');
                }
            }

            _.$slides.eq(index).addClass('slick-center');
        } else {

            if (index >= 0 && index <= _.slideCount - _.options.slidesToShow) {

                _.$slides.slice(index, index + _.options.slidesToShow).addClass('slick-active').attr('aria-hidden', 'false');
            } else if (allSlides.length <= _.options.slidesToShow) {

                allSlides.addClass('slick-active').attr('aria-hidden', 'false');
            } else {

                remainder = _.slideCount % _.options.slidesToShow;
                indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

                if (_.options.slidesToShow == _.options.slidesToScroll && _.slideCount - index < _.options.slidesToShow) {

                    allSlides.slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder).addClass('slick-active').attr('aria-hidden', 'false');
                } else {

                    allSlides.slice(indexOffset, indexOffset + _.options.slidesToShow).addClass('slick-active').attr('aria-hidden', 'false');
                }
            }
        }

        if (_.options.lazyLoad === 'ondemand' || _.options.lazyLoad === 'anticipated') {
            _.lazyLoad();
        }
    };

    Slick.prototype.setupInfinite = function () {

        var _ = this,
            i,
            slideIndex,
            infiniteCount;

        if (_.options.fade === true) {
            _.options.centerMode = false;
        }

        if (_.options.infinite === true && _.options.fade === false) {

            slideIndex = null;

            if (_.slideCount > _.options.slidesToShow) {

                if (_.options.centerMode === true) {
                    infiniteCount = _.options.slidesToShow + 1;
                } else {
                    infiniteCount = _.options.slidesToShow;
                }

                for (i = _.slideCount; i > _.slideCount - infiniteCount; i -= 1) {
                    slideIndex = i - 1;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '').attr('data-slick-index', slideIndex - _.slideCount).prependTo(_.$slideTrack).addClass('slick-cloned');
                }
                for (i = 0; i < infiniteCount + _.slideCount; i += 1) {
                    slideIndex = i;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '').attr('data-slick-index', slideIndex + _.slideCount).appendTo(_.$slideTrack).addClass('slick-cloned');
                }
                _.$slideTrack.find('.slick-cloned').find('[id]').each(function () {
                    $(this).attr('id', '');
                });
            }
        }
    };

    Slick.prototype.interrupt = function (toggle) {

        var _ = this;

        if (!toggle) {
            _.autoPlay();
        }
        _.interrupted = toggle;
    };

    Slick.prototype.selectHandler = function (event) {

        var _ = this;

        var targetElement = $(event.target).is('.slick-slide') ? $(event.target) : $(event.target).parents('.slick-slide');

        var index = parseInt(targetElement.attr('data-slick-index'));

        if (!index) index = 0;

        if (_.slideCount <= _.options.slidesToShow) {

            _.slideHandler(index, false, true);
            return;
        }

        _.slideHandler(index);
    };

    Slick.prototype.slideHandler = function (index, sync, dontAnimate) {

        var targetSlide,
            animSlide,
            oldSlide,
            slideLeft,
            targetLeft = null,
            _ = this,
            navTarget;

        sync = sync || false;

        if (_.animating === true && _.options.waitForAnimate === true) {
            return;
        }

        if (_.options.fade === true && _.currentSlide === index) {
            return;
        }

        if (sync === false) {
            _.asNavFor(index);
        }

        targetSlide = index;
        targetLeft = _.getLeft(targetSlide);
        slideLeft = _.getLeft(_.currentSlide);

        _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

        if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
                    _.animateSlide(slideLeft, function () {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > _.slideCount - _.options.slidesToScroll)) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
                    _.animateSlide(slideLeft, function () {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        }

        if (_.options.autoplay) {
            clearInterval(_.autoPlayTimer);
        }

        if (targetSlide < 0) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = _.slideCount - _.slideCount % _.options.slidesToScroll;
            } else {
                animSlide = _.slideCount + targetSlide;
            }
        } else if (targetSlide >= _.slideCount) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = 0;
            } else {
                animSlide = targetSlide - _.slideCount;
            }
        } else {
            animSlide = targetSlide;
        }

        _.animating = true;

        _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);

        oldSlide = _.currentSlide;
        _.currentSlide = animSlide;

        _.setSlideClasses(_.currentSlide);

        if (_.options.asNavFor) {

            navTarget = _.getNavTarget();
            navTarget = navTarget.slick('getSlick');

            if (navTarget.slideCount <= navTarget.options.slidesToShow) {
                navTarget.setSlideClasses(_.currentSlide);
            }
        }

        _.updateDots();
        _.updateArrows();

        if (_.options.fade === true) {
            if (dontAnimate !== true) {

                _.fadeSlideOut(oldSlide);

                _.fadeSlide(animSlide, function () {
                    _.postSlide(animSlide);
                });
            } else {
                _.postSlide(animSlide);
            }
            _.animateHeight();
            return;
        }

        if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
            _.animateSlide(targetLeft, function () {
                _.postSlide(animSlide);
            });
        } else {
            _.postSlide(animSlide);
        }
    };

    Slick.prototype.startLoad = function () {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.hide();
            _.$nextArrow.hide();
        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.hide();
        }

        _.$slider.addClass('slick-loading');
    };

    Slick.prototype.swipeDirection = function () {

        var xDist,
            yDist,
            r,
            swipeAngle,
            _ = this;

        xDist = _.touchObject.startX - _.touchObject.curX;
        yDist = _.touchObject.startY - _.touchObject.curY;
        r = Math.atan2(yDist, xDist);

        swipeAngle = Math.round(r * 180 / Math.PI);
        if (swipeAngle < 0) {
            swipeAngle = 360 - Math.abs(swipeAngle);
        }

        if (swipeAngle <= 45 && swipeAngle >= 0) {
            return _.options.rtl === false ? 'left' : 'right';
        }
        if (swipeAngle <= 360 && swipeAngle >= 315) {
            return _.options.rtl === false ? 'left' : 'right';
        }
        if (swipeAngle >= 135 && swipeAngle <= 225) {
            return _.options.rtl === false ? 'right' : 'left';
        }
        if (_.options.verticalSwiping === true) {
            if (swipeAngle >= 35 && swipeAngle <= 135) {
                return 'down';
            } else {
                return 'up';
            }
        }

        return 'vertical';
    };

    Slick.prototype.swipeEnd = function (event) {

        var _ = this,
            slideCount,
            direction;

        _.dragging = false;
        _.swiping = false;

        if (_.scrolling) {
            _.scrolling = false;
            return false;
        }

        _.interrupted = false;
        _.shouldClick = _.touchObject.swipeLength > 10 ? false : true;

        if (_.touchObject.curX === undefined) {
            return false;
        }

        if (_.touchObject.edgeHit === true) {
            _.$slider.trigger('edge', [_, _.swipeDirection()]);
        }

        if (_.touchObject.swipeLength >= _.touchObject.minSwipe) {

            direction = _.swipeDirection();

            switch (direction) {

                case 'left':
                case 'down':

                    slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide + _.getSlideCount()) : _.currentSlide + _.getSlideCount();

                    _.currentDirection = 0;

                    break;

                case 'right':
                case 'up':

                    slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide - _.getSlideCount()) : _.currentSlide - _.getSlideCount();

                    _.currentDirection = 1;

                    break;

                default:

            }

            if (direction != 'vertical') {

                _.slideHandler(slideCount);
                _.touchObject = {};
                _.$slider.trigger('swipe', [_, direction]);
            }
        } else {

            if (_.touchObject.startX !== _.touchObject.curX) {

                _.slideHandler(_.currentSlide);
                _.touchObject = {};
            }
        }
    };

    Slick.prototype.swipeHandler = function (event) {

        var _ = this;

        if (_.options.swipe === false || 'ontouchend' in document && _.options.swipe === false) {
            return;
        } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
            return;
        }

        _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ? event.originalEvent.touches.length : 1;

        _.touchObject.minSwipe = _.listWidth / _.options.touchThreshold;

        if (_.options.verticalSwiping === true) {
            _.touchObject.minSwipe = _.listHeight / _.options.touchThreshold;
        }

        switch (event.data.action) {

            case 'start':
                _.swipeStart(event);
                break;

            case 'move':
                _.swipeMove(event);
                break;

            case 'end':
                _.swipeEnd(event);
                break;

        }
    };

    Slick.prototype.swipeMove = function (event) {

        var _ = this,
            edgeWasHit = false,
            curLeft,
            swipeDirection,
            swipeLength,
            positionOffset,
            touches,
            verticalSwipeLength;

        touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

        if (!_.dragging || _.scrolling || touches && touches.length !== 1) {
            return false;
        }

        curLeft = _.getLeft(_.currentSlide);

        _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
        _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

        _.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));

        verticalSwipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));

        if (!_.options.verticalSwiping && !_.swiping && verticalSwipeLength > 4) {
            _.scrolling = true;
            return false;
        }

        if (_.options.verticalSwiping === true) {
            _.touchObject.swipeLength = verticalSwipeLength;
        }

        swipeDirection = _.swipeDirection();

        if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
            _.swiping = true;
            event.preventDefault();
        }

        positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
        if (_.options.verticalSwiping === true) {
            positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
        }

        swipeLength = _.touchObject.swipeLength;

        _.touchObject.edgeHit = false;

        if (_.options.infinite === false) {
            if (_.currentSlide === 0 && swipeDirection === 'right' || _.currentSlide >= _.getDotCount() && swipeDirection === 'left') {
                swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
                _.touchObject.edgeHit = true;
            }
        }

        if (_.options.vertical === false) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        } else {
            _.swipeLeft = curLeft + swipeLength * (_.$list.height() / _.listWidth) * positionOffset;
        }
        if (_.options.verticalSwiping === true) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        }

        if (_.options.fade === true || _.options.touchMove === false) {
            return false;
        }

        if (_.animating === true) {
            _.swipeLeft = null;
            return false;
        }

        _.setCSS(_.swipeLeft);
    };

    Slick.prototype.swipeStart = function (event) {

        var _ = this,
            touches;

        _.interrupted = true;

        if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
            _.touchObject = {};
            return false;
        }

        if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
            touches = event.originalEvent.touches[0];
        }

        _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
        _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

        _.dragging = true;
    };

    Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function () {

        var _ = this;

        if (_.$slidesCache !== null) {

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.appendTo(_.$slideTrack);

            _.reinit();
        }
    };

    Slick.prototype.unload = function () {

        var _ = this;

        $('.slick-cloned', _.$slider).remove();

        if (_.$dots) {
            _.$dots.remove();
        }

        if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
            _.$prevArrow.remove();
        }

        if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
            _.$nextArrow.remove();
        }

        _.$slides.removeClass('slick-slide slick-active slick-visible slick-current').attr('aria-hidden', 'true').css('width', '');
    };

    Slick.prototype.unslick = function (fromBreakpoint) {

        var _ = this;
        _.$slider.trigger('unslick', [_, fromBreakpoint]);
        _.destroy();
    };

    Slick.prototype.updateArrows = function () {

        var _ = this,
            centerOffset;

        centerOffset = Math.floor(_.options.slidesToShow / 2);

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow && !_.options.infinite) {

            _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            if (_.currentSlide === 0) {

                _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            }
        }
    };

    Slick.prototype.updateDots = function () {

        var _ = this;

        if (_.$dots !== null) {

            _.$dots.find('li').removeClass('slick-active').end();

            _.$dots.find('li').eq(Math.floor(_.currentSlide / _.options.slidesToScroll)).addClass('slick-active');
        }
    };

    Slick.prototype.visibility = function () {

        var _ = this;

        if (_.options.autoplay) {

            if (document[_.hidden]) {

                _.interrupted = true;
            } else {

                _.interrupted = false;
            }
        }
    };

    $.fn.slick = function () {
        var _ = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i,
            ret;
        for (i = 0; i < l; i++) {
            if ((typeof opt === 'undefined' ? 'undefined' : _typeof(opt)) == 'object' || typeof opt == 'undefined') _[i].slick = new Slick(_[i], opt);else ret = _[i].slick[opt].apply(_[i].slick, args);
            if (typeof ret != 'undefined') return ret;
        }
        return _;
    };
});
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * Select2 4.0.6-rc.1
 * https://select2.github.io
 *
 * Released under the MIT license
 * https://github.com/select2/select2/blob/master/LICENSE.md
 */
;(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
    // Node/CommonJS
    module.exports = function (root, jQuery) {
      if (jQuery === undefined) {
        // require('jQuery') returns a factory that requires window to
        // build a jQuery instance, we normalize how we use modules
        // that require this pattern but the window provided is a noop
        // if it's defined (how jquery works)
        if (typeof window !== 'undefined') {
          jQuery = require('jquery');
        } else {
          jQuery = require('jquery')(root);
        }
      }
      factory(jQuery);
      return jQuery;
    };
  } else {
    // Browser globals
    factory(jQuery);
  }
})(function (jQuery) {
  // This is needed so we can catch the AMD loader configuration and use it
  // The inner file should be wrapped (by `banner.start.js`) in a function that
  // returns the AMD loader references.
  var S2 = function () {
    // Restore the Select2 AMD loader so it can be used
    // Needed mostly in the language files, where the loader is not inserted
    if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) {
      var S2 = jQuery.fn.select2.amd;
    }
    var S2;(function () {
      if (!S2 || !S2.requirejs) {
        if (!S2) {
          S2 = {};
        } else {
          require = S2;
        }
        /**
         * @license almond 0.3.3 Copyright jQuery Foundation and other contributors.
         * Released under MIT license, http://github.com/requirejs/almond/LICENSE
         */
        //Going sloppy to avoid 'use strict' string cost, but strict practices should
        //be followed.
        /*global setTimeout: false */

        var requirejs, require, define;
        (function (undef) {
          var main,
              _req,
              makeMap,
              handlers,
              defined = {},
              waiting = {},
              config = {},
              defining = {},
              hasOwn = Object.prototype.hasOwnProperty,
              aps = [].slice,
              jsSuffixRegExp = /\.js$/;

          function hasProp(obj, prop) {
            return hasOwn.call(obj, prop);
          }

          /**
           * Given a relative module name, like ./something, normalize it to
           * a real name that can be mapped to a path.
           * @param {String} name the relative name
           * @param {String} baseName a real name that the name arg is relative
           * to.
           * @returns {String} normalized name
           */
          function normalize(name, baseName) {
            var nameParts,
                nameSegment,
                mapValue,
                foundMap,
                lastIndex,
                foundI,
                foundStarMap,
                starI,
                i,
                j,
                part,
                normalizedBaseParts,
                baseParts = baseName && baseName.split("/"),
                map = config.map,
                starMap = map && map['*'] || {};

            //Adjust any relative paths.
            if (name) {
              name = name.split('/');
              lastIndex = name.length - 1;

              // If wanting node ID compatibility, strip .js from end
              // of IDs. Have to do this here, and not in nameToUrl
              // because node allows either .js or non .js to map
              // to same file.
              if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
              }

              // Starts with a '.' so need the baseName
              if (name[0].charAt(0) === '.' && baseParts) {
                //Convert baseName to array, and lop off the last part,
                //so that . matches that 'directory' and not name of the baseName's
                //module. For instance, baseName of 'one/two/three', maps to
                //'one/two/three.js', but we want the directory, 'one/two' for
                //this normalization.
                normalizedBaseParts = baseParts.slice(0, baseParts.length - 1);
                name = normalizedBaseParts.concat(name);
              }

              //start trimDots
              for (i = 0; i < name.length; i++) {
                part = name[i];
                if (part === '.') {
                  name.splice(i, 1);
                  i -= 1;
                } else if (part === '..') {
                  // If at the start, or previous value is still ..,
                  // keep them so that when converted to a path it may
                  // still work when converted to a path, even though
                  // as an ID it is less than ideal. In larger point
                  // releases, may be better to just kick out an error.
                  if (i === 0 || i === 1 && name[2] === '..' || name[i - 1] === '..') {
                    continue;
                  } else if (i > 0) {
                    name.splice(i - 1, 2);
                    i -= 2;
                  }
                }
              }
              //end trimDots

              name = name.join('/');
            }

            //Apply map config if available.
            if ((baseParts || starMap) && map) {
              nameParts = name.split('/');

              for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) {
                  //Find the longest baseName segment match in the config.
                  //So, do joins on the biggest to smallest lengths of baseParts.
                  for (j = baseParts.length; j > 0; j -= 1) {
                    mapValue = map[baseParts.slice(0, j).join('/')];

                    //baseName segment has  config, find if it has one for
                    //this name.
                    if (mapValue) {
                      mapValue = mapValue[nameSegment];
                      if (mapValue) {
                        //Match, update name to the new value.
                        foundMap = mapValue;
                        foundI = i;
                        break;
                      }
                    }
                  }
                }

                if (foundMap) {
                  break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                  foundStarMap = starMap[nameSegment];
                  starI = i;
                }
              }

              if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
              }

              if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
              }
            }

            return name;
          }

          function makeRequire(relName, forceSync) {
            return function () {
              //A version of a require function that passes a moduleName
              //value for items that may need to
              //look up paths relative to the moduleName
              var args = aps.call(arguments, 0);

              //If first arg is not require('string'), and there is only
              //one arg, it is the array form without a callback. Insert
              //a null so that the following concat is correct.
              if (typeof args[0] !== 'string' && args.length === 1) {
                args.push(null);
              }
              return _req.apply(undef, args.concat([relName, forceSync]));
            };
          }

          function makeNormalize(relName) {
            return function (name) {
              return normalize(name, relName);
            };
          }

          function makeLoad(depName) {
            return function (value) {
              defined[depName] = value;
            };
          }

          function callDep(name) {
            if (hasProp(waiting, name)) {
              var args = waiting[name];
              delete waiting[name];
              defining[name] = true;
              main.apply(undef, args);
            }

            if (!hasProp(defined, name) && !hasProp(defining, name)) {
              throw new Error('No ' + name);
            }
            return defined[name];
          }

          //Turns a plugin!resource to [plugin, resource]
          //with the plugin being undefined if the name
          //did not have a plugin prefix.
          function splitPrefix(name) {
            var prefix,
                index = name ? name.indexOf('!') : -1;
            if (index > -1) {
              prefix = name.substring(0, index);
              name = name.substring(index + 1, name.length);
            }
            return [prefix, name];
          }

          //Creates a parts array for a relName where first part is plugin ID,
          //second part is resource ID. Assumes relName has already been normalized.
          function makeRelParts(relName) {
            return relName ? splitPrefix(relName) : [];
          }

          /**
           * Makes a name map, normalizing the name, and using a plugin
           * for normalization if necessary. Grabs a ref to plugin
           * too, as an optimization.
           */
          makeMap = function makeMap(name, relParts) {
            var plugin,
                parts = splitPrefix(name),
                prefix = parts[0],
                relResourceName = relParts[1];

            name = parts[1];

            if (prefix) {
              prefix = normalize(prefix, relResourceName);
              plugin = callDep(prefix);
            }

            //Normalize according
            if (prefix) {
              if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relResourceName));
              } else {
                name = normalize(name, relResourceName);
              }
            } else {
              name = normalize(name, relResourceName);
              parts = splitPrefix(name);
              prefix = parts[0];
              name = parts[1];
              if (prefix) {
                plugin = callDep(prefix);
              }
            }

            //Using ridiculous property names for space reasons
            return {
              f: prefix ? prefix + '!' + name : name, //fullName
              n: name,
              pr: prefix,
              p: plugin
            };
          };

          function makeConfig(name) {
            return function () {
              return config && config.config && config.config[name] || {};
            };
          }

          handlers = {
            require: function require(name) {
              return makeRequire(name);
            },
            exports: function exports(name) {
              var e = defined[name];
              if (typeof e !== 'undefined') {
                return e;
              } else {
                return defined[name] = {};
              }
            },
            module: function module(name) {
              return {
                id: name,
                uri: '',
                exports: defined[name],
                config: makeConfig(name)
              };
            }
          };

          main = function main(name, deps, callback, relName) {
            var cjsModule,
                depName,
                ret,
                map,
                i,
                relParts,
                args = [],
                callbackType = typeof callback === 'undefined' ? 'undefined' : _typeof(callback),
                usingExports;

            //Use name if no relName
            relName = relName || name;
            relParts = makeRelParts(relName);

            //Call the callback to define the module, if necessary.
            if (callbackType === 'undefined' || callbackType === 'function') {
              //Pull out the defined dependencies and pass the ordered
              //values to the callback.
              //Default to [require, exports, module] if no deps
              deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
              for (i = 0; i < deps.length; i += 1) {
                map = makeMap(deps[i], relParts);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                  args[i] = handlers.require(name);
                } else if (depName === "exports") {
                  //CommonJS module spec 1.1
                  args[i] = handlers.exports(name);
                  usingExports = true;
                } else if (depName === "module") {
                  //CommonJS module spec 1.1
                  cjsModule = args[i] = handlers.module(name);
                } else if (hasProp(defined, depName) || hasProp(waiting, depName) || hasProp(defining, depName)) {
                  args[i] = callDep(depName);
                } else if (map.p) {
                  map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                  args[i] = defined[depName];
                } else {
                  throw new Error(name + ' missing ' + depName);
                }
              }

              ret = callback ? callback.apply(defined[name], args) : undefined;

              if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef && cjsModule.exports !== defined[name]) {
                  defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                  //Use the return value from the function.
                  defined[name] = ret;
                }
              }
            } else if (name) {
              //May just be an object definition for the module. Only
              //worry about defining if have a module name.
              defined[name] = callback;
            }
          };

          requirejs = require = _req = function req(deps, callback, relName, forceSync, alt) {
            if (typeof deps === "string") {
              if (handlers[deps]) {
                //callback in this case is really relName
                return handlers[deps](callback);
              }
              //Just return the module wanted. In this scenario, the
              //deps arg is the module name, and second arg (if passed)
              //is just the relName.
              //Normalize module name, if it contains . or ..
              return callDep(makeMap(deps, makeRelParts(callback)).f);
            } else if (!deps.splice) {
              //deps is a config object, not an array.
              config = deps;
              if (config.deps) {
                _req(config.deps, config.callback);
              }
              if (!callback) {
                return;
              }

              if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
              } else {
                deps = undef;
              }
            }

            //Support require(['a'])
            callback = callback || function () {};

            //If relName is a function, it is an errback handler,
            //so remove it.
            if (typeof relName === 'function') {
              relName = forceSync;
              forceSync = alt;
            }

            //Simulate async callback;
            if (forceSync) {
              main(undef, deps, callback, relName);
            } else {
              //Using a non-zero value because of concern for what old browsers
              //do, and latest browsers "upgrade" to 4 if lower value is used:
              //http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
              //If want a value immediately, use require('id') instead -- something
              //that works in almond on the global level, but not guaranteed and
              //unlikely to work in other AMD implementations.
              setTimeout(function () {
                main(undef, deps, callback, relName);
              }, 4);
            }

            return _req;
          };

          /**
           * Just drops the config on the floor, but returns req in case
           * the config return value is used.
           */
          _req.config = function (cfg) {
            return _req(cfg);
          };

          /**
           * Expose module registry for debugging and tooling
           */
          requirejs._defined = defined;

          define = function define(name, deps, callback) {
            if (typeof name !== 'string') {
              throw new Error('See almond README: incorrect module build, no module name');
            }

            //This module may not have dependencies
            if (!deps.splice) {
              //deps is not an array, so probably means
              //an object literal or factory function for
              //the value. Adjust args.
              callback = deps;
              deps = [];
            }

            if (!hasProp(defined, name) && !hasProp(waiting, name)) {
              waiting[name] = [name, deps, callback];
            }
          };

          define.amd = {
            jQuery: true
          };
        })();

        S2.requirejs = requirejs;S2.require = require;S2.define = define;
      }
    })();
    S2.define("almond", function () {});

    /* global jQuery:false, $:false */
    S2.define('jquery', [], function () {
      var _$ = jQuery || $;

      if (_$ == null && console && console.error) {
        console.error('Select2: An instance of jQuery or a jQuery-compatible library was not ' + 'found. Make sure that you are including jQuery before Select2 on your ' + 'web page.');
      }

      return _$;
    });

    S2.define('select2/utils', ['jquery'], function ($) {
      var Utils = {};

      Utils.Extend = function (ChildClass, SuperClass) {
        var __hasProp = {}.hasOwnProperty;

        function BaseConstructor() {
          this.constructor = ChildClass;
        }

        for (var key in SuperClass) {
          if (__hasProp.call(SuperClass, key)) {
            ChildClass[key] = SuperClass[key];
          }
        }

        BaseConstructor.prototype = SuperClass.prototype;
        ChildClass.prototype = new BaseConstructor();
        ChildClass.__super__ = SuperClass.prototype;

        return ChildClass;
      };

      function getMethods(theClass) {
        var proto = theClass.prototype;

        var methods = [];

        for (var methodName in proto) {
          var m = proto[methodName];

          if (typeof m !== 'function') {
            continue;
          }

          if (methodName === 'constructor') {
            continue;
          }

          methods.push(methodName);
        }

        return methods;
      }

      Utils.Decorate = function (SuperClass, DecoratorClass) {
        var decoratedMethods = getMethods(DecoratorClass);
        var superMethods = getMethods(SuperClass);

        function DecoratedClass() {
          var unshift = Array.prototype.unshift;

          var argCount = DecoratorClass.prototype.constructor.length;

          var calledConstructor = SuperClass.prototype.constructor;

          if (argCount > 0) {
            unshift.call(arguments, SuperClass.prototype.constructor);

            calledConstructor = DecoratorClass.prototype.constructor;
          }

          calledConstructor.apply(this, arguments);
        }

        DecoratorClass.displayName = SuperClass.displayName;

        function ctr() {
          this.constructor = DecoratedClass;
        }

        DecoratedClass.prototype = new ctr();

        for (var m = 0; m < superMethods.length; m++) {
          var superMethod = superMethods[m];

          DecoratedClass.prototype[superMethod] = SuperClass.prototype[superMethod];
        }

        var calledMethod = function calledMethod(methodName) {
          // Stub out the original method if it's not decorating an actual method
          var originalMethod = function originalMethod() {};

          if (methodName in DecoratedClass.prototype) {
            originalMethod = DecoratedClass.prototype[methodName];
          }

          var decoratedMethod = DecoratorClass.prototype[methodName];

          return function () {
            var unshift = Array.prototype.unshift;

            unshift.call(arguments, originalMethod);

            return decoratedMethod.apply(this, arguments);
          };
        };

        for (var d = 0; d < decoratedMethods.length; d++) {
          var decoratedMethod = decoratedMethods[d];

          DecoratedClass.prototype[decoratedMethod] = calledMethod(decoratedMethod);
        }

        return DecoratedClass;
      };

      var Observable = function Observable() {
        this.listeners = {};
      };

      Observable.prototype.on = function (event, callback) {
        this.listeners = this.listeners || {};

        if (event in this.listeners) {
          this.listeners[event].push(callback);
        } else {
          this.listeners[event] = [callback];
        }
      };

      Observable.prototype.trigger = function (event) {
        var slice = Array.prototype.slice;
        var params = slice.call(arguments, 1);

        this.listeners = this.listeners || {};

        // Params should always come in as an array
        if (params == null) {
          params = [];
        }

        // If there are no arguments to the event, use a temporary object
        if (params.length === 0) {
          params.push({});
        }

        // Set the `_type` of the first object to the event
        params[0]._type = event;

        if (event in this.listeners) {
          this.invoke(this.listeners[event], slice.call(arguments, 1));
        }

        if ('*' in this.listeners) {
          this.invoke(this.listeners['*'], arguments);
        }
      };

      Observable.prototype.invoke = function (listeners, params) {
        for (var i = 0, len = listeners.length; i < len; i++) {
          listeners[i].apply(this, params);
        }
      };

      Utils.Observable = Observable;

      Utils.generateChars = function (length) {
        var chars = '';

        for (var i = 0; i < length; i++) {
          var randomChar = Math.floor(Math.random() * 36);
          chars += randomChar.toString(36);
        }

        return chars;
      };

      Utils.bind = function (func, context) {
        return function () {
          func.apply(context, arguments);
        };
      };

      Utils._convertData = function (data) {
        for (var originalKey in data) {
          var keys = originalKey.split('-');

          var dataLevel = data;

          if (keys.length === 1) {
            continue;
          }

          for (var k = 0; k < keys.length; k++) {
            var key = keys[k];

            // Lowercase the first letter
            // By default, dash-separated becomes camelCase
            key = key.substring(0, 1).toLowerCase() + key.substring(1);

            if (!(key in dataLevel)) {
              dataLevel[key] = {};
            }

            if (k == keys.length - 1) {
              dataLevel[key] = data[originalKey];
            }

            dataLevel = dataLevel[key];
          }

          delete data[originalKey];
        }

        return data;
      };

      Utils.hasScroll = function (index, el) {
        // Adapted from the function created by @ShadowScripter
        // and adapted by @BillBarry on the Stack Exchange Code Review website.
        // The original code can be found at
        // http://codereview.stackexchange.com/q/13338
        // and was designed to be used with the Sizzle selector engine.

        var $el = $(el);
        var overflowX = el.style.overflowX;
        var overflowY = el.style.overflowY;

        //Check both x and y declarations
        if (overflowX === overflowY && (overflowY === 'hidden' || overflowY === 'visible')) {
          return false;
        }

        if (overflowX === 'scroll' || overflowY === 'scroll') {
          return true;
        }

        return $el.innerHeight() < el.scrollHeight || $el.innerWidth() < el.scrollWidth;
      };

      Utils.escapeMarkup = function (markup) {
        var replaceMap = {
          '\\': '&#92;',
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          '\'': '&#39;',
          '/': '&#47;'
        };

        // Do not try to escape the markup if it's not a string
        if (typeof markup !== 'string') {
          return markup;
        }

        return String(markup).replace(/[&<>"'\/\\]/g, function (match) {
          return replaceMap[match];
        });
      };

      // Append an array of jQuery nodes to a given element.
      Utils.appendMany = function ($element, $nodes) {
        // jQuery 1.7.x does not support $.fn.append() with an array
        // Fall back to a jQuery object collection using $.fn.add()
        if ($.fn.jquery.substr(0, 3) === '1.7') {
          var $jqNodes = $();

          $.map($nodes, function (node) {
            $jqNodes = $jqNodes.add(node);
          });

          $nodes = $jqNodes;
        }

        $element.append($nodes);
      };

      // Cache objects in Utils.__cache instead of $.data (see #4346)
      Utils.__cache = {};

      var id = 0;
      Utils.GetUniqueElementId = function (element) {
        // Get a unique element Id. If element has no id, 
        // creates a new unique number, stores it in the id 
        // attribute and returns the new id. 
        // If an id already exists, it simply returns it.

        var select2Id = element.getAttribute('data-select2-id');
        if (select2Id == null) {
          // If element has id, use it.
          if (element.id) {
            select2Id = element.id;
            element.setAttribute('data-select2-id', select2Id);
          } else {
            element.setAttribute('data-select2-id', ++id);
            select2Id = id.toString();
          }
        }
        return select2Id;
      };

      Utils.StoreData = function (element, name, value) {
        // Stores an item in the cache for a specified element.
        // name is the cache key.    
        var id = Utils.GetUniqueElementId(element);
        if (!Utils.__cache[id]) {
          Utils.__cache[id] = {};
        }

        Utils.__cache[id][name] = value;
      };

      Utils.GetData = function (element, name) {
        // Retrieves a value from the cache by its key (name)
        // name is optional. If no name specified, return 
        // all cache items for the specified element.
        // and for a specified element.
        var id = Utils.GetUniqueElementId(element);
        if (name) {
          if (Utils.__cache[id]) {
            return Utils.__cache[id][name] != null ? Utils.__cache[id][name] : $(element).data(name); // Fallback to HTML5 data attribs.
          }
          return $(element).data(name); // Fallback to HTML5 data attribs.
        } else {
          return Utils.__cache[id];
        }
      };

      Utils.RemoveData = function (element) {
        // Removes all cached items for a specified element.
        var id = Utils.GetUniqueElementId(element);
        if (Utils.__cache[id] != null) {
          delete Utils.__cache[id];
        }
      };

      return Utils;
    });

    S2.define('select2/results', ['jquery', './utils'], function ($, Utils) {
      function Results($element, options, dataAdapter) {
        this.$element = $element;
        this.data = dataAdapter;
        this.options = options;

        Results.__super__.constructor.call(this);
      }

      Utils.Extend(Results, Utils.Observable);

      Results.prototype.render = function () {
        var $results = $('<ul class="select2-results__options" role="tree"></ul>');

        if (this.options.get('multiple')) {
          $results.attr('aria-multiselectable', 'true');
        }

        this.$results = $results;

        return $results;
      };

      Results.prototype.clear = function () {
        this.$results.empty();
      };

      Results.prototype.displayMessage = function (params) {
        var escapeMarkup = this.options.get('escapeMarkup');

        this.clear();
        this.hideLoading();

        var $message = $('<li role="treeitem" aria-live="assertive"' + ' class="select2-results__option"></li>');

        var message = this.options.get('translations').get(params.message);

        $message.append(escapeMarkup(message(params.args)));

        $message[0].className += ' select2-results__message';

        this.$results.append($message);
      };

      Results.prototype.hideMessages = function () {
        this.$results.find('.select2-results__message').remove();
      };

      Results.prototype.append = function (data) {
        this.hideLoading();

        var $options = [];

        if (data.results == null || data.results.length === 0) {
          if (this.$results.children().length === 0) {
            this.trigger('results:message', {
              message: 'noResults'
            });
          }

          return;
        }

        data.results = this.sort(data.results);

        for (var d = 0; d < data.results.length; d++) {
          var item = data.results[d];

          var $option = this.option(item);

          $options.push($option);
        }

        this.$results.append($options);
      };

      Results.prototype.position = function ($results, $dropdown) {
        var $resultsContainer = $dropdown.find('.select2-results');
        $resultsContainer.append($results);
      };

      Results.prototype.sort = function (data) {
        var sorter = this.options.get('sorter');

        return sorter(data);
      };

      Results.prototype.highlightFirstItem = function () {
        var $options = this.$results.find('.select2-results__option[aria-selected]');

        var $selected = $options.filter('[aria-selected=true]');

        // Check if there are any selected options
        if ($selected.length > 0) {
          // If there are selected options, highlight the first
          $selected.first().trigger('mouseenter');
        } else {
          // If there are no selected options, highlight the first option
          // in the dropdown
          $options.first().trigger('mouseenter');
        }

        this.ensureHighlightVisible();
      };

      Results.prototype.setClasses = function () {
        var self = this;

        this.data.current(function (selected) {
          var selectedIds = $.map(selected, function (s) {
            return s.id.toString();
          });

          var $options = self.$results.find('.select2-results__option[aria-selected]');

          $options.each(function () {
            var $option = $(this);

            var item = Utils.GetData(this, 'data');

            // id needs to be converted to a string when comparing
            var id = '' + item.id;

            if (item.element != null && item.element.selected || item.element == null && $.inArray(id, selectedIds) > -1) {
              $option.attr('aria-selected', 'true');
            } else {
              $option.attr('aria-selected', 'false');
            }
          });
        });
      };

      Results.prototype.showLoading = function (params) {
        this.hideLoading();

        var loadingMore = this.options.get('translations').get('searching');

        var loading = {
          disabled: true,
          loading: true,
          text: loadingMore(params)
        };
        var $loading = this.option(loading);
        $loading.className += ' loading-results';

        this.$results.prepend($loading);
      };

      Results.prototype.hideLoading = function () {
        this.$results.find('.loading-results').remove();
      };

      Results.prototype.option = function (data) {
        var option = document.createElement('li');
        option.className = 'select2-results__option';

        var attrs = {
          'role': 'treeitem',
          'aria-selected': 'false'
        };

        if (data.disabled) {
          delete attrs['aria-selected'];
          attrs['aria-disabled'] = 'true';
        }

        if (data.id == null) {
          delete attrs['aria-selected'];
        }

        if (data._resultId != null) {
          option.id = data._resultId;
        }

        if (data.title) {
          option.title = data.title;
        }

        if (data.children) {
          attrs.role = 'group';
          attrs['aria-label'] = data.text;
          delete attrs['aria-selected'];
        }

        for (var attr in attrs) {
          var val = attrs[attr];

          option.setAttribute(attr, val);
        }

        if (data.children) {
          var $option = $(option);

          var label = document.createElement('strong');
          label.className = 'select2-results__group';

          var $label = $(label);
          this.template(data, label);

          var $children = [];

          for (var c = 0; c < data.children.length; c++) {
            var child = data.children[c];

            var $child = this.option(child);

            $children.push($child);
          }

          var $childrenContainer = $('<ul></ul>', {
            'class': 'select2-results__options select2-results__options--nested'
          });

          $childrenContainer.append($children);

          $option.append(label);
          $option.append($childrenContainer);
        } else {
          this.template(data, option);
        }

        Utils.StoreData(option, 'data', data);

        return option;
      };

      Results.prototype.bind = function (container, $container) {
        var self = this;

        var id = container.id + '-results';

        this.$results.attr('id', id);

        container.on('results:all', function (params) {
          self.clear();
          self.append(params.data);

          if (container.isOpen()) {
            self.setClasses();
            self.highlightFirstItem();
          }
        });

        container.on('results:append', function (params) {
          self.append(params.data);

          if (container.isOpen()) {
            self.setClasses();
          }
        });

        container.on('query', function (params) {
          self.hideMessages();
          self.showLoading(params);
        });

        container.on('select', function () {
          if (!container.isOpen()) {
            return;
          }

          self.setClasses();
          self.highlightFirstItem();
        });

        container.on('unselect', function () {
          if (!container.isOpen()) {
            return;
          }

          self.setClasses();
          self.highlightFirstItem();
        });

        container.on('open', function () {
          // When the dropdown is open, aria-expended="true"
          self.$results.attr('aria-expanded', 'true');
          self.$results.attr('aria-hidden', 'false');

          self.setClasses();
          self.ensureHighlightVisible();
        });

        container.on('close', function () {
          // When the dropdown is closed, aria-expended="false"
          self.$results.attr('aria-expanded', 'false');
          self.$results.attr('aria-hidden', 'true');
          self.$results.removeAttr('aria-activedescendant');
        });

        container.on('results:toggle', function () {
          var $highlighted = self.getHighlightedResults();

          if ($highlighted.length === 0) {
            return;
          }

          $highlighted.trigger('mouseup');
        });

        container.on('results:select', function () {
          var $highlighted = self.getHighlightedResults();

          if ($highlighted.length === 0) {
            return;
          }

          var data = Utils.GetData($highlighted[0], 'data');

          if ($highlighted.attr('aria-selected') == 'true') {
            self.trigger('close', {});
          } else {
            self.trigger('select', {
              data: data
            });
          }
        });

        container.on('results:previous', function () {
          var $highlighted = self.getHighlightedResults();

          var $options = self.$results.find('[aria-selected]');

          var currentIndex = $options.index($highlighted);

          // If we are already at te top, don't move further
          // If no options, currentIndex will be -1
          if (currentIndex <= 0) {
            return;
          }

          var nextIndex = currentIndex - 1;

          // If none are highlighted, highlight the first
          if ($highlighted.length === 0) {
            nextIndex = 0;
          }

          var $next = $options.eq(nextIndex);

          $next.trigger('mouseenter');

          var currentOffset = self.$results.offset().top;
          var nextTop = $next.offset().top;
          var nextOffset = self.$results.scrollTop() + (nextTop - currentOffset);

          if (nextIndex === 0) {
            self.$results.scrollTop(0);
          } else if (nextTop - currentOffset < 0) {
            self.$results.scrollTop(nextOffset);
          }
        });

        container.on('results:next', function () {
          var $highlighted = self.getHighlightedResults();

          var $options = self.$results.find('[aria-selected]');

          var currentIndex = $options.index($highlighted);

          var nextIndex = currentIndex + 1;

          // If we are at the last option, stay there
          if (nextIndex >= $options.length) {
            return;
          }

          var $next = $options.eq(nextIndex);

          $next.trigger('mouseenter');

          var currentOffset = self.$results.offset().top + self.$results.outerHeight(false);
          var nextBottom = $next.offset().top + $next.outerHeight(false);
          var nextOffset = self.$results.scrollTop() + nextBottom - currentOffset;

          if (nextIndex === 0) {
            self.$results.scrollTop(0);
          } else if (nextBottom > currentOffset) {
            self.$results.scrollTop(nextOffset);
          }
        });

        container.on('results:focus', function (params) {
          params.element.addClass('select2-results__option--highlighted');
        });

        container.on('results:message', function (params) {
          self.displayMessage(params);
        });

        if ($.fn.mousewheel) {
          this.$results.on('mousewheel', function (e) {
            var top = self.$results.scrollTop();

            var bottom = self.$results.get(0).scrollHeight - top + e.deltaY;

            var isAtTop = e.deltaY > 0 && top - e.deltaY <= 0;
            var isAtBottom = e.deltaY < 0 && bottom <= self.$results.height();

            if (isAtTop) {
              self.$results.scrollTop(0);

              e.preventDefault();
              e.stopPropagation();
            } else if (isAtBottom) {
              self.$results.scrollTop(self.$results.get(0).scrollHeight - self.$results.height());

              e.preventDefault();
              e.stopPropagation();
            }
          });
        }

        this.$results.on('mouseup', '.select2-results__option[aria-selected]', function (evt) {
          var $this = $(this);

          var data = Utils.GetData(this, 'data');

          if ($this.attr('aria-selected') === 'true') {
            if (self.options.get('multiple')) {
              self.trigger('unselect', {
                originalEvent: evt,
                data: data
              });
            } else {
              self.trigger('close', {});
            }

            return;
          }

          self.trigger('select', {
            originalEvent: evt,
            data: data
          });
        });

        this.$results.on('mouseenter', '.select2-results__option[aria-selected]', function (evt) {
          var data = Utils.GetData(this, 'data');

          self.getHighlightedResults().removeClass('select2-results__option--highlighted');

          self.trigger('results:focus', {
            data: data,
            element: $(this)
          });
        });
      };

      Results.prototype.getHighlightedResults = function () {
        var $highlighted = this.$results.find('.select2-results__option--highlighted');

        return $highlighted;
      };

      Results.prototype.destroy = function () {
        this.$results.remove();
      };

      Results.prototype.ensureHighlightVisible = function () {
        var $highlighted = this.getHighlightedResults();

        if ($highlighted.length === 0) {
          return;
        }

        var $options = this.$results.find('[aria-selected]');

        var currentIndex = $options.index($highlighted);

        var currentOffset = this.$results.offset().top;
        var nextTop = $highlighted.offset().top;
        var nextOffset = this.$results.scrollTop() + (nextTop - currentOffset);

        var offsetDelta = nextTop - currentOffset;
        nextOffset -= $highlighted.outerHeight(false) * 2;

        if (currentIndex <= 2) {
          this.$results.scrollTop(0);
        } else if (offsetDelta > this.$results.outerHeight() || offsetDelta < 0) {
          this.$results.scrollTop(nextOffset);
        }
      };

      Results.prototype.template = function (result, container) {
        var template = this.options.get('templateResult');
        var escapeMarkup = this.options.get('escapeMarkup');

        var content = template(result, container);

        if (content == null) {
          container.style.display = 'none';
        } else if (typeof content === 'string') {
          container.innerHTML = escapeMarkup(content);
        } else {
          $(container).append(content);
        }
      };

      return Results;
    });

    S2.define('select2/keys', [], function () {
      var KEYS = {
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        ESC: 27,
        SPACE: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        DELETE: 46
      };

      return KEYS;
    });

    S2.define('select2/selection/base', ['jquery', '../utils', '../keys'], function ($, Utils, KEYS) {
      function BaseSelection($element, options) {
        this.$element = $element;
        this.options = options;

        BaseSelection.__super__.constructor.call(this);
      }

      Utils.Extend(BaseSelection, Utils.Observable);

      BaseSelection.prototype.render = function () {
        var $selection = $('<span class="select2-selection" role="combobox" ' + ' aria-haspopup="true" aria-expanded="false">' + '</span>');

        this._tabindex = 0;

        if (Utils.GetData(this.$element[0], 'old-tabindex') != null) {
          this._tabindex = Utils.GetData(this.$element[0], 'old-tabindex');
        } else if (this.$element.attr('tabindex') != null) {
          this._tabindex = this.$element.attr('tabindex');
        }

        $selection.attr('title', this.$element.attr('title'));
        $selection.attr('tabindex', this._tabindex);

        this.$selection = $selection;

        return $selection;
      };

      BaseSelection.prototype.bind = function (container, $container) {
        var self = this;

        var id = container.id + '-container';
        var resultsId = container.id + '-results';

        this.container = container;

        this.$selection.on('focus', function (evt) {
          self.trigger('focus', evt);
        });

        this.$selection.on('blur', function (evt) {
          self._handleBlur(evt);
        });

        this.$selection.on('keydown', function (evt) {
          self.trigger('keypress', evt);

          if (evt.which === KEYS.SPACE) {
            evt.preventDefault();
          }
        });

        container.on('results:focus', function (params) {
          self.$selection.attr('aria-activedescendant', params.data._resultId);
        });

        container.on('selection:update', function (params) {
          self.update(params.data);
        });

        container.on('open', function () {
          // When the dropdown is open, aria-expanded="true"
          self.$selection.attr('aria-expanded', 'true');
          self.$selection.attr('aria-owns', resultsId);

          self._attachCloseHandler(container);
        });

        container.on('close', function () {
          // When the dropdown is closed, aria-expanded="false"
          self.$selection.attr('aria-expanded', 'false');
          self.$selection.removeAttr('aria-activedescendant');
          self.$selection.removeAttr('aria-owns');

          self.$selection.focus();
          window.setTimeout(function () {
            self.$selection.focus();
          }, 0);

          self._detachCloseHandler(container);
        });

        container.on('enable', function () {
          self.$selection.attr('tabindex', self._tabindex);
        });

        container.on('disable', function () {
          self.$selection.attr('tabindex', '-1');
        });
      };

      BaseSelection.prototype._handleBlur = function (evt) {
        var self = this;

        // This needs to be delayed as the active element is the body when the tab
        // key is pressed, possibly along with others.
        window.setTimeout(function () {
          // Don't trigger `blur` if the focus is still in the selection
          if (document.activeElement == self.$selection[0] || $.contains(self.$selection[0], document.activeElement)) {
            return;
          }

          self.trigger('blur', evt);
        }, 1);
      };

      BaseSelection.prototype._attachCloseHandler = function (container) {
        var self = this;

        $(document.body).on('mousedown.select2.' + container.id, function (e) {
          var $target = $(e.target);

          var $select = $target.closest('.select2');

          var $all = $('.select2.select2-container--open');

          $all.each(function () {
            var $this = $(this);

            if (this == $select[0]) {
              return;
            }

            var $element = Utils.GetData(this, 'element');

            $element.select2('close');
          });
        });
      };

      BaseSelection.prototype._detachCloseHandler = function (container) {
        $(document.body).off('mousedown.select2.' + container.id);
      };

      BaseSelection.prototype.position = function ($selection, $container) {
        var $selectionContainer = $container.find('.selection');
        $selectionContainer.append($selection);
      };

      BaseSelection.prototype.destroy = function () {
        this._detachCloseHandler(this.container);
      };

      BaseSelection.prototype.update = function (data) {
        throw new Error('The `update` method must be defined in child classes.');
      };

      return BaseSelection;
    });

    S2.define('select2/selection/single', ['jquery', './base', '../utils', '../keys'], function ($, BaseSelection, Utils, KEYS) {
      function SingleSelection() {
        SingleSelection.__super__.constructor.apply(this, arguments);
      }

      Utils.Extend(SingleSelection, BaseSelection);

      SingleSelection.prototype.render = function () {
        var $selection = SingleSelection.__super__.render.call(this);

        $selection.addClass('select2-selection--single');

        $selection.html('<span class="select2-selection__rendered"></span>' + '<span class="select2-selection__arrow" role="presentation">' + '<b role="presentation"></b>' + '</span>');

        return $selection;
      };

      SingleSelection.prototype.bind = function (container, $container) {
        var self = this;

        SingleSelection.__super__.bind.apply(this, arguments);

        var id = container.id + '-container';

        this.$selection.find('.select2-selection__rendered').attr('id', id).attr('role', 'textbox').attr('aria-readonly', 'true');
        this.$selection.attr('aria-labelledby', id);

        this.$selection.on('mousedown', function (evt) {
          // Only respond to left clicks
          if (evt.which !== 1) {
            return;
          }

          self.trigger('toggle', {
            originalEvent: evt
          });
        });

        this.$selection.on('focus', function (evt) {
          // User focuses on the container
        });

        this.$selection.on('blur', function (evt) {
          // User exits the container
        });

        container.on('focus', function (evt) {
          if (!container.isOpen()) {
            self.$selection.focus();
          }
        });
      };

      SingleSelection.prototype.clear = function () {
        var $rendered = this.$selection.find('.select2-selection__rendered');
        $rendered.empty();
        $rendered.removeAttr('title'); // clear tooltip on empty
      };

      SingleSelection.prototype.display = function (data, container) {
        var template = this.options.get('templateSelection');
        var escapeMarkup = this.options.get('escapeMarkup');

        return escapeMarkup(template(data, container));
      };

      SingleSelection.prototype.selectionContainer = function () {
        return $('<span></span>');
      };

      SingleSelection.prototype.update = function (data) {
        if (data.length === 0) {
          this.clear();
          return;
        }

        var selection = data[0];

        var $rendered = this.$selection.find('.select2-selection__rendered');
        var formatted = this.display(selection, $rendered);

        $rendered.empty().append(formatted);
        $rendered.attr('title', selection.title || selection.text);
      };

      return SingleSelection;
    });

    S2.define('select2/selection/multiple', ['jquery', './base', '../utils'], function ($, BaseSelection, Utils) {
      function MultipleSelection($element, options) {
        MultipleSelection.__super__.constructor.apply(this, arguments);
      }

      Utils.Extend(MultipleSelection, BaseSelection);

      MultipleSelection.prototype.render = function () {
        var $selection = MultipleSelection.__super__.render.call(this);

        $selection.addClass('select2-selection--multiple');

        $selection.html('<ul class="select2-selection__rendered"></ul>');

        return $selection;
      };

      MultipleSelection.prototype.bind = function (container, $container) {
        var self = this;

        MultipleSelection.__super__.bind.apply(this, arguments);

        this.$selection.on('click', function (evt) {
          self.trigger('toggle', {
            originalEvent: evt
          });
        });

        this.$selection.on('click', '.select2-selection__choice__remove', function (evt) {
          // Ignore the event if it is disabled
          if (self.options.get('disabled')) {
            return;
          }

          var $remove = $(this);
          var $selection = $remove.parent();

          var data = Utils.GetData($selection[0], 'data');

          self.trigger('unselect', {
            originalEvent: evt,
            data: data
          });
        });
      };

      MultipleSelection.prototype.clear = function () {
        var $rendered = this.$selection.find('.select2-selection__rendered');
        $rendered.empty();
        $rendered.removeAttr('title');
      };

      MultipleSelection.prototype.display = function (data, container) {
        var template = this.options.get('templateSelection');
        var escapeMarkup = this.options.get('escapeMarkup');

        return escapeMarkup(template(data, container));
      };

      MultipleSelection.prototype.selectionContainer = function () {
        var $container = $('<li class="select2-selection__choice">' + '<span class="select2-selection__choice__remove" role="presentation">' + '&times;' + '</span>' + '</li>');

        return $container;
      };

      MultipleSelection.prototype.update = function (data) {
        this.clear();

        if (data.length === 0) {
          return;
        }

        var $selections = [];

        for (var d = 0; d < data.length; d++) {
          var selection = data[d];

          var $selection = this.selectionContainer();
          var formatted = this.display(selection, $selection);

          $selection.append(formatted);
          $selection.attr('title', selection.title || selection.text);

          Utils.StoreData($selection[0], 'data', selection);

          $selections.push($selection);
        }

        var $rendered = this.$selection.find('.select2-selection__rendered');

        Utils.appendMany($rendered, $selections);
      };

      return MultipleSelection;
    });

    S2.define('select2/selection/placeholder', ['../utils'], function (Utils) {
      function Placeholder(decorated, $element, options) {
        this.placeholder = this.normalizePlaceholder(options.get('placeholder'));

        decorated.call(this, $element, options);
      }

      Placeholder.prototype.normalizePlaceholder = function (_, placeholder) {
        if (typeof placeholder === 'string') {
          placeholder = {
            id: '',
            text: placeholder
          };
        }

        return placeholder;
      };

      Placeholder.prototype.createPlaceholder = function (decorated, placeholder) {
        var $placeholder = this.selectionContainer();

        $placeholder.html(this.display(placeholder));
        $placeholder.addClass('select2-selection__placeholder').removeClass('select2-selection__choice');

        return $placeholder;
      };

      Placeholder.prototype.update = function (decorated, data) {
        var singlePlaceholder = data.length == 1 && data[0].id != this.placeholder.id;
        var multipleSelections = data.length > 1;

        if (multipleSelections || singlePlaceholder) {
          return decorated.call(this, data);
        }

        this.clear();

        var $placeholder = this.createPlaceholder(this.placeholder);

        this.$selection.find('.select2-selection__rendered').append($placeholder);
      };

      return Placeholder;
    });

    S2.define('select2/selection/allowClear', ['jquery', '../keys', '../utils'], function ($, KEYS, Utils) {
      function AllowClear() {}

      AllowClear.prototype.bind = function (decorated, container, $container) {
        var self = this;

        decorated.call(this, container, $container);

        if (this.placeholder == null) {
          if (this.options.get('debug') && window.console && console.error) {
            console.error('Select2: The `allowClear` option should be used in combination ' + 'with the `placeholder` option.');
          }
        }

        this.$selection.on('mousedown', '.select2-selection__clear', function (evt) {
          self._handleClear(evt);
        });

        container.on('keypress', function (evt) {
          self._handleKeyboardClear(evt, container);
        });
      };

      AllowClear.prototype._handleClear = function (_, evt) {
        // Ignore the event if it is disabled
        if (this.options.get('disabled')) {
          return;
        }

        var $clear = this.$selection.find('.select2-selection__clear');

        // Ignore the event if nothing has been selected
        if ($clear.length === 0) {
          return;
        }

        evt.stopPropagation();

        var data = Utils.GetData($clear[0], 'data');

        var previousVal = this.$element.val();
        this.$element.val(this.placeholder.id);

        var unselectData = {
          data: data
        };
        this.trigger('clear', unselectData);
        if (unselectData.prevented) {
          this.$element.val(previousVal);
          return;
        }

        for (var d = 0; d < data.length; d++) {
          unselectData = {
            data: data[d]
          };

          // Trigger the `unselect` event, so people can prevent it from being
          // cleared.
          this.trigger('unselect', unselectData);

          // If the event was prevented, don't clear it out.
          if (unselectData.prevented) {
            this.$element.val(previousVal);
            return;
          }
        }

        this.$element.trigger('change');

        this.trigger('toggle', {});
      };

      AllowClear.prototype._handleKeyboardClear = function (_, evt, container) {
        if (container.isOpen()) {
          return;
        }

        if (evt.which == KEYS.DELETE || evt.which == KEYS.BACKSPACE) {
          this._handleClear(evt);
        }
      };

      AllowClear.prototype.update = function (decorated, data) {
        decorated.call(this, data);

        if (this.$selection.find('.select2-selection__placeholder').length > 0 || data.length === 0) {
          return;
        }

        var $remove = $('<span class="select2-selection__clear">' + '&times;' + '</span>');
        Utils.StoreData($remove[0], 'data', data);

        this.$selection.find('.select2-selection__rendered').prepend($remove);
      };

      return AllowClear;
    });

    S2.define('select2/selection/search', ['jquery', '../utils', '../keys'], function ($, Utils, KEYS) {
      function Search(decorated, $element, options) {
        decorated.call(this, $element, options);
      }

      Search.prototype.render = function (decorated) {
        var $search = $('<li class="select2-search select2-search--inline">' + '<input class="select2-search__field" type="search" tabindex="-1"' + ' autocomplete="off" autocorrect="off" autocapitalize="none"' + ' spellcheck="false" role="textbox" aria-autocomplete="list" />' + '</li>');

        this.$searchContainer = $search;
        this.$search = $search.find('input');

        var $rendered = decorated.call(this);

        this._transferTabIndex();

        return $rendered;
      };

      Search.prototype.bind = function (decorated, container, $container) {
        var self = this;

        decorated.call(this, container, $container);

        container.on('open', function () {
          self.$search.trigger('focus');
        });

        container.on('close', function () {
          self.$search.val('');
          self.$search.removeAttr('aria-activedescendant');
          self.$search.trigger('focus');
        });

        container.on('enable', function () {
          self.$search.prop('disabled', false);

          self._transferTabIndex();
        });

        container.on('disable', function () {
          self.$search.prop('disabled', true);
        });

        container.on('focus', function (evt) {
          self.$search.trigger('focus');
        });

        container.on('results:focus', function (params) {
          self.$search.attr('aria-activedescendant', params.id);
        });

        this.$selection.on('focusin', '.select2-search--inline', function (evt) {
          self.trigger('focus', evt);
        });

        this.$selection.on('focusout', '.select2-search--inline', function (evt) {
          self._handleBlur(evt);
        });

        this.$selection.on('keydown', '.select2-search--inline', function (evt) {
          evt.stopPropagation();

          self.trigger('keypress', evt);

          self._keyUpPrevented = evt.isDefaultPrevented();

          var key = evt.which;

          if (key === KEYS.BACKSPACE && self.$search.val() === '') {
            var $previousChoice = self.$searchContainer.prev('.select2-selection__choice');

            if ($previousChoice.length > 0) {
              var item = Utils.GetData($previousChoice[0], 'data');

              self.searchRemoveChoice(item);

              evt.preventDefault();
            }
          }
        });

        // Try to detect the IE version should the `documentMode` property that
        // is stored on the document. This is only implemented in IE and is
        // slightly cleaner than doing a user agent check.
        // This property is not available in Edge, but Edge also doesn't have
        // this bug.
        var msie = document.documentMode;
        var disableInputEvents = msie && msie <= 11;

        // Workaround for browsers which do not support the `input` event
        // This will prevent double-triggering of events for browsers which support
        // both the `keyup` and `input` events.
        this.$selection.on('input.searchcheck', '.select2-search--inline', function (evt) {
          // IE will trigger the `input` event when a placeholder is used on a
          // search box. To get around this issue, we are forced to ignore all
          // `input` events in IE and keep using `keyup`.
          if (disableInputEvents) {
            self.$selection.off('input.search input.searchcheck');
            return;
          }

          // Unbind the duplicated `keyup` event
          self.$selection.off('keyup.search');
        });

        this.$selection.on('keyup.search input.search', '.select2-search--inline', function (evt) {
          // IE will trigger the `input` event when a placeholder is used on a
          // search box. To get around this issue, we are forced to ignore all
          // `input` events in IE and keep using `keyup`.
          if (disableInputEvents && evt.type === 'input') {
            self.$selection.off('input.search input.searchcheck');
            return;
          }

          var key = evt.which;

          // We can freely ignore events from modifier keys
          if (key == KEYS.SHIFT || key == KEYS.CTRL || key == KEYS.ALT) {
            return;
          }

          // Tabbing will be handled during the `keydown` phase
          if (key == KEYS.TAB) {
            return;
          }

          self.handleSearch(evt);
        });
      };

      /**
       * This method will transfer the tabindex attribute from the rendered
       * selection to the search box. This allows for the search box to be used as
       * the primary focus instead of the selection container.
       *
       * @private
       */
      Search.prototype._transferTabIndex = function (decorated) {
        this.$search.attr('tabindex', this.$selection.attr('tabindex'));
        this.$selection.attr('tabindex', '-1');
      };

      Search.prototype.createPlaceholder = function (decorated, placeholder) {
        this.$search.attr('placeholder', placeholder.text);
      };

      Search.prototype.update = function (decorated, data) {
        var searchHadFocus = this.$search[0] == document.activeElement;

        this.$search.attr('placeholder', '');

        decorated.call(this, data);

        this.$selection.find('.select2-selection__rendered').append(this.$searchContainer);

        this.resizeSearch();
        if (searchHadFocus) {
          var isTagInput = this.$element.find('[data-select2-tag]').length;
          if (isTagInput) {
            // fix IE11 bug where tag input lost focus
            this.$element.focus();
          } else {
            this.$search.focus();
          }
        }
      };

      Search.prototype.handleSearch = function () {
        this.resizeSearch();

        if (!this._keyUpPrevented) {
          var input = this.$search.val();

          this.trigger('query', {
            term: input
          });
        }

        this._keyUpPrevented = false;
      };

      Search.prototype.searchRemoveChoice = function (decorated, item) {
        this.trigger('unselect', {
          data: item
        });

        this.$search.val(item.text);
        this.handleSearch();
      };

      Search.prototype.resizeSearch = function () {
        this.$search.css('width', '25px');

        var width = '';

        if (this.$search.attr('placeholder') !== '') {
          width = this.$selection.find('.select2-selection__rendered').innerWidth();
        } else {
          var minimumWidth = this.$search.val().length + 1;

          width = minimumWidth * 0.75 + 'em';
        }

        this.$search.css('width', width);
      };

      return Search;
    });

    S2.define('select2/selection/eventRelay', ['jquery'], function ($) {
      function EventRelay() {}

      EventRelay.prototype.bind = function (decorated, container, $container) {
        var self = this;
        var relayEvents = ['open', 'opening', 'close', 'closing', 'select', 'selecting', 'unselect', 'unselecting', 'clear', 'clearing'];

        var preventableEvents = ['opening', 'closing', 'selecting', 'unselecting', 'clearing'];

        decorated.call(this, container, $container);

        container.on('*', function (name, params) {
          // Ignore events that should not be relayed
          if ($.inArray(name, relayEvents) === -1) {
            return;
          }

          // The parameters should always be an object
          params = params || {};

          // Generate the jQuery event for the Select2 event
          var evt = $.Event('select2:' + name, {
            params: params
          });

          self.$element.trigger(evt);

          // Only handle preventable events if it was one
          if ($.inArray(name, preventableEvents) === -1) {
            return;
          }

          params.prevented = evt.isDefaultPrevented();
        });
      };

      return EventRelay;
    });

    S2.define('select2/translation', ['jquery', 'require'], function ($, require) {
      function Translation(dict) {
        this.dict = dict || {};
      }

      Translation.prototype.all = function () {
        return this.dict;
      };

      Translation.prototype.get = function (key) {
        return this.dict[key];
      };

      Translation.prototype.extend = function (translation) {
        this.dict = $.extend({}, translation.all(), this.dict);
      };

      // Static functions

      Translation._cache = {};

      Translation.loadPath = function (path) {
        if (!(path in Translation._cache)) {
          var translations = require(path);

          Translation._cache[path] = translations;
        }

        return new Translation(Translation._cache[path]);
      };

      return Translation;
    });

    S2.define('select2/diacritics', [], function () {
      var diacritics = {
        '\u24B6': 'A',
        '\uFF21': 'A',
        '\xC0': 'A',
        '\xC1': 'A',
        '\xC2': 'A',
        '\u1EA6': 'A',
        '\u1EA4': 'A',
        '\u1EAA': 'A',
        '\u1EA8': 'A',
        '\xC3': 'A',
        '\u0100': 'A',
        '\u0102': 'A',
        '\u1EB0': 'A',
        '\u1EAE': 'A',
        '\u1EB4': 'A',
        '\u1EB2': 'A',
        '\u0226': 'A',
        '\u01E0': 'A',
        '\xC4': 'A',
        '\u01DE': 'A',
        '\u1EA2': 'A',
        '\xC5': 'A',
        '\u01FA': 'A',
        '\u01CD': 'A',
        '\u0200': 'A',
        '\u0202': 'A',
        '\u1EA0': 'A',
        '\u1EAC': 'A',
        '\u1EB6': 'A',
        '\u1E00': 'A',
        '\u0104': 'A',
        '\u023A': 'A',
        '\u2C6F': 'A',
        '\uA732': 'AA',
        '\xC6': 'AE',
        '\u01FC': 'AE',
        '\u01E2': 'AE',
        '\uA734': 'AO',
        '\uA736': 'AU',
        '\uA738': 'AV',
        '\uA73A': 'AV',
        '\uA73C': 'AY',
        '\u24B7': 'B',
        '\uFF22': 'B',
        '\u1E02': 'B',
        '\u1E04': 'B',
        '\u1E06': 'B',
        '\u0243': 'B',
        '\u0182': 'B',
        '\u0181': 'B',
        '\u24B8': 'C',
        '\uFF23': 'C',
        '\u0106': 'C',
        '\u0108': 'C',
        '\u010A': 'C',
        '\u010C': 'C',
        '\xC7': 'C',
        '\u1E08': 'C',
        '\u0187': 'C',
        '\u023B': 'C',
        '\uA73E': 'C',
        '\u24B9': 'D',
        '\uFF24': 'D',
        '\u1E0A': 'D',
        '\u010E': 'D',
        '\u1E0C': 'D',
        '\u1E10': 'D',
        '\u1E12': 'D',
        '\u1E0E': 'D',
        '\u0110': 'D',
        '\u018B': 'D',
        '\u018A': 'D',
        '\u0189': 'D',
        '\uA779': 'D',
        '\u01F1': 'DZ',
        '\u01C4': 'DZ',
        '\u01F2': 'Dz',
        '\u01C5': 'Dz',
        '\u24BA': 'E',
        '\uFF25': 'E',
        '\xC8': 'E',
        '\xC9': 'E',
        '\xCA': 'E',
        '\u1EC0': 'E',
        '\u1EBE': 'E',
        '\u1EC4': 'E',
        '\u1EC2': 'E',
        '\u1EBC': 'E',
        '\u0112': 'E',
        '\u1E14': 'E',
        '\u1E16': 'E',
        '\u0114': 'E',
        '\u0116': 'E',
        '\xCB': 'E',
        '\u1EBA': 'E',
        '\u011A': 'E',
        '\u0204': 'E',
        '\u0206': 'E',
        '\u1EB8': 'E',
        '\u1EC6': 'E',
        '\u0228': 'E',
        '\u1E1C': 'E',
        '\u0118': 'E',
        '\u1E18': 'E',
        '\u1E1A': 'E',
        '\u0190': 'E',
        '\u018E': 'E',
        '\u24BB': 'F',
        '\uFF26': 'F',
        '\u1E1E': 'F',
        '\u0191': 'F',
        '\uA77B': 'F',
        '\u24BC': 'G',
        '\uFF27': 'G',
        '\u01F4': 'G',
        '\u011C': 'G',
        '\u1E20': 'G',
        '\u011E': 'G',
        '\u0120': 'G',
        '\u01E6': 'G',
        '\u0122': 'G',
        '\u01E4': 'G',
        '\u0193': 'G',
        '\uA7A0': 'G',
        '\uA77D': 'G',
        '\uA77E': 'G',
        '\u24BD': 'H',
        '\uFF28': 'H',
        '\u0124': 'H',
        '\u1E22': 'H',
        '\u1E26': 'H',
        '\u021E': 'H',
        '\u1E24': 'H',
        '\u1E28': 'H',
        '\u1E2A': 'H',
        '\u0126': 'H',
        '\u2C67': 'H',
        '\u2C75': 'H',
        '\uA78D': 'H',
        '\u24BE': 'I',
        '\uFF29': 'I',
        '\xCC': 'I',
        '\xCD': 'I',
        '\xCE': 'I',
        '\u0128': 'I',
        '\u012A': 'I',
        '\u012C': 'I',
        '\u0130': 'I',
        '\xCF': 'I',
        '\u1E2E': 'I',
        '\u1EC8': 'I',
        '\u01CF': 'I',
        '\u0208': 'I',
        '\u020A': 'I',
        '\u1ECA': 'I',
        '\u012E': 'I',
        '\u1E2C': 'I',
        '\u0197': 'I',
        '\u24BF': 'J',
        '\uFF2A': 'J',
        '\u0134': 'J',
        '\u0248': 'J',
        '\u24C0': 'K',
        '\uFF2B': 'K',
        '\u1E30': 'K',
        '\u01E8': 'K',
        '\u1E32': 'K',
        '\u0136': 'K',
        '\u1E34': 'K',
        '\u0198': 'K',
        '\u2C69': 'K',
        '\uA740': 'K',
        '\uA742': 'K',
        '\uA744': 'K',
        '\uA7A2': 'K',
        '\u24C1': 'L',
        '\uFF2C': 'L',
        '\u013F': 'L',
        '\u0139': 'L',
        '\u013D': 'L',
        '\u1E36': 'L',
        '\u1E38': 'L',
        '\u013B': 'L',
        '\u1E3C': 'L',
        '\u1E3A': 'L',
        '\u0141': 'L',
        '\u023D': 'L',
        '\u2C62': 'L',
        '\u2C60': 'L',
        '\uA748': 'L',
        '\uA746': 'L',
        '\uA780': 'L',
        '\u01C7': 'LJ',
        '\u01C8': 'Lj',
        '\u24C2': 'M',
        '\uFF2D': 'M',
        '\u1E3E': 'M',
        '\u1E40': 'M',
        '\u1E42': 'M',
        '\u2C6E': 'M',
        '\u019C': 'M',
        '\u24C3': 'N',
        '\uFF2E': 'N',
        '\u01F8': 'N',
        '\u0143': 'N',
        '\xD1': 'N',
        '\u1E44': 'N',
        '\u0147': 'N',
        '\u1E46': 'N',
        '\u0145': 'N',
        '\u1E4A': 'N',
        '\u1E48': 'N',
        '\u0220': 'N',
        '\u019D': 'N',
        '\uA790': 'N',
        '\uA7A4': 'N',
        '\u01CA': 'NJ',
        '\u01CB': 'Nj',
        '\u24C4': 'O',
        '\uFF2F': 'O',
        '\xD2': 'O',
        '\xD3': 'O',
        '\xD4': 'O',
        '\u1ED2': 'O',
        '\u1ED0': 'O',
        '\u1ED6': 'O',
        '\u1ED4': 'O',
        '\xD5': 'O',
        '\u1E4C': 'O',
        '\u022C': 'O',
        '\u1E4E': 'O',
        '\u014C': 'O',
        '\u1E50': 'O',
        '\u1E52': 'O',
        '\u014E': 'O',
        '\u022E': 'O',
        '\u0230': 'O',
        '\xD6': 'O',
        '\u022A': 'O',
        '\u1ECE': 'O',
        '\u0150': 'O',
        '\u01D1': 'O',
        '\u020C': 'O',
        '\u020E': 'O',
        '\u01A0': 'O',
        '\u1EDC': 'O',
        '\u1EDA': 'O',
        '\u1EE0': 'O',
        '\u1EDE': 'O',
        '\u1EE2': 'O',
        '\u1ECC': 'O',
        '\u1ED8': 'O',
        '\u01EA': 'O',
        '\u01EC': 'O',
        '\xD8': 'O',
        '\u01FE': 'O',
        '\u0186': 'O',
        '\u019F': 'O',
        '\uA74A': 'O',
        '\uA74C': 'O',
        '\u01A2': 'OI',
        '\uA74E': 'OO',
        '\u0222': 'OU',
        '\u24C5': 'P',
        '\uFF30': 'P',
        '\u1E54': 'P',
        '\u1E56': 'P',
        '\u01A4': 'P',
        '\u2C63': 'P',
        '\uA750': 'P',
        '\uA752': 'P',
        '\uA754': 'P',
        '\u24C6': 'Q',
        '\uFF31': 'Q',
        '\uA756': 'Q',
        '\uA758': 'Q',
        '\u024A': 'Q',
        '\u24C7': 'R',
        '\uFF32': 'R',
        '\u0154': 'R',
        '\u1E58': 'R',
        '\u0158': 'R',
        '\u0210': 'R',
        '\u0212': 'R',
        '\u1E5A': 'R',
        '\u1E5C': 'R',
        '\u0156': 'R',
        '\u1E5E': 'R',
        '\u024C': 'R',
        '\u2C64': 'R',
        '\uA75A': 'R',
        '\uA7A6': 'R',
        '\uA782': 'R',
        '\u24C8': 'S',
        '\uFF33': 'S',
        '\u1E9E': 'S',
        '\u015A': 'S',
        '\u1E64': 'S',
        '\u015C': 'S',
        '\u1E60': 'S',
        '\u0160': 'S',
        '\u1E66': 'S',
        '\u1E62': 'S',
        '\u1E68': 'S',
        '\u0218': 'S',
        '\u015E': 'S',
        '\u2C7E': 'S',
        '\uA7A8': 'S',
        '\uA784': 'S',
        '\u24C9': 'T',
        '\uFF34': 'T',
        '\u1E6A': 'T',
        '\u0164': 'T',
        '\u1E6C': 'T',
        '\u021A': 'T',
        '\u0162': 'T',
        '\u1E70': 'T',
        '\u1E6E': 'T',
        '\u0166': 'T',
        '\u01AC': 'T',
        '\u01AE': 'T',
        '\u023E': 'T',
        '\uA786': 'T',
        '\uA728': 'TZ',
        '\u24CA': 'U',
        '\uFF35': 'U',
        '\xD9': 'U',
        '\xDA': 'U',
        '\xDB': 'U',
        '\u0168': 'U',
        '\u1E78': 'U',
        '\u016A': 'U',
        '\u1E7A': 'U',
        '\u016C': 'U',
        '\xDC': 'U',
        '\u01DB': 'U',
        '\u01D7': 'U',
        '\u01D5': 'U',
        '\u01D9': 'U',
        '\u1EE6': 'U',
        '\u016E': 'U',
        '\u0170': 'U',
        '\u01D3': 'U',
        '\u0214': 'U',
        '\u0216': 'U',
        '\u01AF': 'U',
        '\u1EEA': 'U',
        '\u1EE8': 'U',
        '\u1EEE': 'U',
        '\u1EEC': 'U',
        '\u1EF0': 'U',
        '\u1EE4': 'U',
        '\u1E72': 'U',
        '\u0172': 'U',
        '\u1E76': 'U',
        '\u1E74': 'U',
        '\u0244': 'U',
        '\u24CB': 'V',
        '\uFF36': 'V',
        '\u1E7C': 'V',
        '\u1E7E': 'V',
        '\u01B2': 'V',
        '\uA75E': 'V',
        '\u0245': 'V',
        '\uA760': 'VY',
        '\u24CC': 'W',
        '\uFF37': 'W',
        '\u1E80': 'W',
        '\u1E82': 'W',
        '\u0174': 'W',
        '\u1E86': 'W',
        '\u1E84': 'W',
        '\u1E88': 'W',
        '\u2C72': 'W',
        '\u24CD': 'X',
        '\uFF38': 'X',
        '\u1E8A': 'X',
        '\u1E8C': 'X',
        '\u24CE': 'Y',
        '\uFF39': 'Y',
        '\u1EF2': 'Y',
        '\xDD': 'Y',
        '\u0176': 'Y',
        '\u1EF8': 'Y',
        '\u0232': 'Y',
        '\u1E8E': 'Y',
        '\u0178': 'Y',
        '\u1EF6': 'Y',
        '\u1EF4': 'Y',
        '\u01B3': 'Y',
        '\u024E': 'Y',
        '\u1EFE': 'Y',
        '\u24CF': 'Z',
        '\uFF3A': 'Z',
        '\u0179': 'Z',
        '\u1E90': 'Z',
        '\u017B': 'Z',
        '\u017D': 'Z',
        '\u1E92': 'Z',
        '\u1E94': 'Z',
        '\u01B5': 'Z',
        '\u0224': 'Z',
        '\u2C7F': 'Z',
        '\u2C6B': 'Z',
        '\uA762': 'Z',
        '\u24D0': 'a',
        '\uFF41': 'a',
        '\u1E9A': 'a',
        '\xE0': 'a',
        '\xE1': 'a',
        '\xE2': 'a',
        '\u1EA7': 'a',
        '\u1EA5': 'a',
        '\u1EAB': 'a',
        '\u1EA9': 'a',
        '\xE3': 'a',
        '\u0101': 'a',
        '\u0103': 'a',
        '\u1EB1': 'a',
        '\u1EAF': 'a',
        '\u1EB5': 'a',
        '\u1EB3': 'a',
        '\u0227': 'a',
        '\u01E1': 'a',
        '\xE4': 'a',
        '\u01DF': 'a',
        '\u1EA3': 'a',
        '\xE5': 'a',
        '\u01FB': 'a',
        '\u01CE': 'a',
        '\u0201': 'a',
        '\u0203': 'a',
        '\u1EA1': 'a',
        '\u1EAD': 'a',
        '\u1EB7': 'a',
        '\u1E01': 'a',
        '\u0105': 'a',
        '\u2C65': 'a',
        '\u0250': 'a',
        '\uA733': 'aa',
        '\xE6': 'ae',
        '\u01FD': 'ae',
        '\u01E3': 'ae',
        '\uA735': 'ao',
        '\uA737': 'au',
        '\uA739': 'av',
        '\uA73B': 'av',
        '\uA73D': 'ay',
        '\u24D1': 'b',
        '\uFF42': 'b',
        '\u1E03': 'b',
        '\u1E05': 'b',
        '\u1E07': 'b',
        '\u0180': 'b',
        '\u0183': 'b',
        '\u0253': 'b',
        '\u24D2': 'c',
        '\uFF43': 'c',
        '\u0107': 'c',
        '\u0109': 'c',
        '\u010B': 'c',
        '\u010D': 'c',
        '\xE7': 'c',
        '\u1E09': 'c',
        '\u0188': 'c',
        '\u023C': 'c',
        '\uA73F': 'c',
        '\u2184': 'c',
        '\u24D3': 'd',
        '\uFF44': 'd',
        '\u1E0B': 'd',
        '\u010F': 'd',
        '\u1E0D': 'd',
        '\u1E11': 'd',
        '\u1E13': 'd',
        '\u1E0F': 'd',
        '\u0111': 'd',
        '\u018C': 'd',
        '\u0256': 'd',
        '\u0257': 'd',
        '\uA77A': 'd',
        '\u01F3': 'dz',
        '\u01C6': 'dz',
        '\u24D4': 'e',
        '\uFF45': 'e',
        '\xE8': 'e',
        '\xE9': 'e',
        '\xEA': 'e',
        '\u1EC1': 'e',
        '\u1EBF': 'e',
        '\u1EC5': 'e',
        '\u1EC3': 'e',
        '\u1EBD': 'e',
        '\u0113': 'e',
        '\u1E15': 'e',
        '\u1E17': 'e',
        '\u0115': 'e',
        '\u0117': 'e',
        '\xEB': 'e',
        '\u1EBB': 'e',
        '\u011B': 'e',
        '\u0205': 'e',
        '\u0207': 'e',
        '\u1EB9': 'e',
        '\u1EC7': 'e',
        '\u0229': 'e',
        '\u1E1D': 'e',
        '\u0119': 'e',
        '\u1E19': 'e',
        '\u1E1B': 'e',
        '\u0247': 'e',
        '\u025B': 'e',
        '\u01DD': 'e',
        '\u24D5': 'f',
        '\uFF46': 'f',
        '\u1E1F': 'f',
        '\u0192': 'f',
        '\uA77C': 'f',
        '\u24D6': 'g',
        '\uFF47': 'g',
        '\u01F5': 'g',
        '\u011D': 'g',
        '\u1E21': 'g',
        '\u011F': 'g',
        '\u0121': 'g',
        '\u01E7': 'g',
        '\u0123': 'g',
        '\u01E5': 'g',
        '\u0260': 'g',
        '\uA7A1': 'g',
        '\u1D79': 'g',
        '\uA77F': 'g',
        '\u24D7': 'h',
        '\uFF48': 'h',
        '\u0125': 'h',
        '\u1E23': 'h',
        '\u1E27': 'h',
        '\u021F': 'h',
        '\u1E25': 'h',
        '\u1E29': 'h',
        '\u1E2B': 'h',
        '\u1E96': 'h',
        '\u0127': 'h',
        '\u2C68': 'h',
        '\u2C76': 'h',
        '\u0265': 'h',
        '\u0195': 'hv',
        '\u24D8': 'i',
        '\uFF49': 'i',
        '\xEC': 'i',
        '\xED': 'i',
        '\xEE': 'i',
        '\u0129': 'i',
        '\u012B': 'i',
        '\u012D': 'i',
        '\xEF': 'i',
        '\u1E2F': 'i',
        '\u1EC9': 'i',
        '\u01D0': 'i',
        '\u0209': 'i',
        '\u020B': 'i',
        '\u1ECB': 'i',
        '\u012F': 'i',
        '\u1E2D': 'i',
        '\u0268': 'i',
        '\u0131': 'i',
        '\u24D9': 'j',
        '\uFF4A': 'j',
        '\u0135': 'j',
        '\u01F0': 'j',
        '\u0249': 'j',
        '\u24DA': 'k',
        '\uFF4B': 'k',
        '\u1E31': 'k',
        '\u01E9': 'k',
        '\u1E33': 'k',
        '\u0137': 'k',
        '\u1E35': 'k',
        '\u0199': 'k',
        '\u2C6A': 'k',
        '\uA741': 'k',
        '\uA743': 'k',
        '\uA745': 'k',
        '\uA7A3': 'k',
        '\u24DB': 'l',
        '\uFF4C': 'l',
        '\u0140': 'l',
        '\u013A': 'l',
        '\u013E': 'l',
        '\u1E37': 'l',
        '\u1E39': 'l',
        '\u013C': 'l',
        '\u1E3D': 'l',
        '\u1E3B': 'l',
        '\u017F': 'l',
        '\u0142': 'l',
        '\u019A': 'l',
        '\u026B': 'l',
        '\u2C61': 'l',
        '\uA749': 'l',
        '\uA781': 'l',
        '\uA747': 'l',
        '\u01C9': 'lj',
        '\u24DC': 'm',
        '\uFF4D': 'm',
        '\u1E3F': 'm',
        '\u1E41': 'm',
        '\u1E43': 'm',
        '\u0271': 'm',
        '\u026F': 'm',
        '\u24DD': 'n',
        '\uFF4E': 'n',
        '\u01F9': 'n',
        '\u0144': 'n',
        '\xF1': 'n',
        '\u1E45': 'n',
        '\u0148': 'n',
        '\u1E47': 'n',
        '\u0146': 'n',
        '\u1E4B': 'n',
        '\u1E49': 'n',
        '\u019E': 'n',
        '\u0272': 'n',
        '\u0149': 'n',
        '\uA791': 'n',
        '\uA7A5': 'n',
        '\u01CC': 'nj',
        '\u24DE': 'o',
        '\uFF4F': 'o',
        '\xF2': 'o',
        '\xF3': 'o',
        '\xF4': 'o',
        '\u1ED3': 'o',
        '\u1ED1': 'o',
        '\u1ED7': 'o',
        '\u1ED5': 'o',
        '\xF5': 'o',
        '\u1E4D': 'o',
        '\u022D': 'o',
        '\u1E4F': 'o',
        '\u014D': 'o',
        '\u1E51': 'o',
        '\u1E53': 'o',
        '\u014F': 'o',
        '\u022F': 'o',
        '\u0231': 'o',
        '\xF6': 'o',
        '\u022B': 'o',
        '\u1ECF': 'o',
        '\u0151': 'o',
        '\u01D2': 'o',
        '\u020D': 'o',
        '\u020F': 'o',
        '\u01A1': 'o',
        '\u1EDD': 'o',
        '\u1EDB': 'o',
        '\u1EE1': 'o',
        '\u1EDF': 'o',
        '\u1EE3': 'o',
        '\u1ECD': 'o',
        '\u1ED9': 'o',
        '\u01EB': 'o',
        '\u01ED': 'o',
        '\xF8': 'o',
        '\u01FF': 'o',
        '\u0254': 'o',
        '\uA74B': 'o',
        '\uA74D': 'o',
        '\u0275': 'o',
        '\u01A3': 'oi',
        '\u0223': 'ou',
        '\uA74F': 'oo',
        '\u24DF': 'p',
        '\uFF50': 'p',
        '\u1E55': 'p',
        '\u1E57': 'p',
        '\u01A5': 'p',
        '\u1D7D': 'p',
        '\uA751': 'p',
        '\uA753': 'p',
        '\uA755': 'p',
        '\u24E0': 'q',
        '\uFF51': 'q',
        '\u024B': 'q',
        '\uA757': 'q',
        '\uA759': 'q',
        '\u24E1': 'r',
        '\uFF52': 'r',
        '\u0155': 'r',
        '\u1E59': 'r',
        '\u0159': 'r',
        '\u0211': 'r',
        '\u0213': 'r',
        '\u1E5B': 'r',
        '\u1E5D': 'r',
        '\u0157': 'r',
        '\u1E5F': 'r',
        '\u024D': 'r',
        '\u027D': 'r',
        '\uA75B': 'r',
        '\uA7A7': 'r',
        '\uA783': 'r',
        '\u24E2': 's',
        '\uFF53': 's',
        '\xDF': 's',
        '\u015B': 's',
        '\u1E65': 's',
        '\u015D': 's',
        '\u1E61': 's',
        '\u0161': 's',
        '\u1E67': 's',
        '\u1E63': 's',
        '\u1E69': 's',
        '\u0219': 's',
        '\u015F': 's',
        '\u023F': 's',
        '\uA7A9': 's',
        '\uA785': 's',
        '\u1E9B': 's',
        '\u24E3': 't',
        '\uFF54': 't',
        '\u1E6B': 't',
        '\u1E97': 't',
        '\u0165': 't',
        '\u1E6D': 't',
        '\u021B': 't',
        '\u0163': 't',
        '\u1E71': 't',
        '\u1E6F': 't',
        '\u0167': 't',
        '\u01AD': 't',
        '\u0288': 't',
        '\u2C66': 't',
        '\uA787': 't',
        '\uA729': 'tz',
        '\u24E4': 'u',
        '\uFF55': 'u',
        '\xF9': 'u',
        '\xFA': 'u',
        '\xFB': 'u',
        '\u0169': 'u',
        '\u1E79': 'u',
        '\u016B': 'u',
        '\u1E7B': 'u',
        '\u016D': 'u',
        '\xFC': 'u',
        '\u01DC': 'u',
        '\u01D8': 'u',
        '\u01D6': 'u',
        '\u01DA': 'u',
        '\u1EE7': 'u',
        '\u016F': 'u',
        '\u0171': 'u',
        '\u01D4': 'u',
        '\u0215': 'u',
        '\u0217': 'u',
        '\u01B0': 'u',
        '\u1EEB': 'u',
        '\u1EE9': 'u',
        '\u1EEF': 'u',
        '\u1EED': 'u',
        '\u1EF1': 'u',
        '\u1EE5': 'u',
        '\u1E73': 'u',
        '\u0173': 'u',
        '\u1E77': 'u',
        '\u1E75': 'u',
        '\u0289': 'u',
        '\u24E5': 'v',
        '\uFF56': 'v',
        '\u1E7D': 'v',
        '\u1E7F': 'v',
        '\u028B': 'v',
        '\uA75F': 'v',
        '\u028C': 'v',
        '\uA761': 'vy',
        '\u24E6': 'w',
        '\uFF57': 'w',
        '\u1E81': 'w',
        '\u1E83': 'w',
        '\u0175': 'w',
        '\u1E87': 'w',
        '\u1E85': 'w',
        '\u1E98': 'w',
        '\u1E89': 'w',
        '\u2C73': 'w',
        '\u24E7': 'x',
        '\uFF58': 'x',
        '\u1E8B': 'x',
        '\u1E8D': 'x',
        '\u24E8': 'y',
        '\uFF59': 'y',
        '\u1EF3': 'y',
        '\xFD': 'y',
        '\u0177': 'y',
        '\u1EF9': 'y',
        '\u0233': 'y',
        '\u1E8F': 'y',
        '\xFF': 'y',
        '\u1EF7': 'y',
        '\u1E99': 'y',
        '\u1EF5': 'y',
        '\u01B4': 'y',
        '\u024F': 'y',
        '\u1EFF': 'y',
        '\u24E9': 'z',
        '\uFF5A': 'z',
        '\u017A': 'z',
        '\u1E91': 'z',
        '\u017C': 'z',
        '\u017E': 'z',
        '\u1E93': 'z',
        '\u1E95': 'z',
        '\u01B6': 'z',
        '\u0225': 'z',
        '\u0240': 'z',
        '\u2C6C': 'z',
        '\uA763': 'z',
        '\u0386': '\u0391',
        '\u0388': '\u0395',
        '\u0389': '\u0397',
        '\u038A': '\u0399',
        '\u03AA': '\u0399',
        '\u038C': '\u039F',
        '\u038E': '\u03A5',
        '\u03AB': '\u03A5',
        '\u038F': '\u03A9',
        '\u03AC': '\u03B1',
        '\u03AD': '\u03B5',
        '\u03AE': '\u03B7',
        '\u03AF': '\u03B9',
        '\u03CA': '\u03B9',
        '\u0390': '\u03B9',
        '\u03CC': '\u03BF',
        '\u03CD': '\u03C5',
        '\u03CB': '\u03C5',
        '\u03B0': '\u03C5',
        '\u03C9': '\u03C9',
        '\u03C2': '\u03C3'
      };

      return diacritics;
    });

    S2.define('select2/data/base', ['../utils'], function (Utils) {
      function BaseAdapter($element, options) {
        BaseAdapter.__super__.constructor.call(this);
      }

      Utils.Extend(BaseAdapter, Utils.Observable);

      BaseAdapter.prototype.current = function (callback) {
        throw new Error('The `current` method must be defined in child classes.');
      };

      BaseAdapter.prototype.query = function (params, callback) {
        throw new Error('The `query` method must be defined in child classes.');
      };

      BaseAdapter.prototype.bind = function (container, $container) {
        // Can be implemented in subclasses
      };

      BaseAdapter.prototype.destroy = function () {
        // Can be implemented in subclasses
      };

      BaseAdapter.prototype.generateResultId = function (container, data) {
        var id = container.id + '-result-';

        id += Utils.generateChars(4);

        if (data.id != null) {
          id += '-' + data.id.toString();
        } else {
          id += '-' + Utils.generateChars(4);
        }
        return id;
      };

      return BaseAdapter;
    });

    S2.define('select2/data/select', ['./base', '../utils', 'jquery'], function (BaseAdapter, Utils, $) {
      function SelectAdapter($element, options) {
        this.$element = $element;
        this.options = options;

        SelectAdapter.__super__.constructor.call(this);
      }

      Utils.Extend(SelectAdapter, BaseAdapter);

      SelectAdapter.prototype.current = function (callback) {
        var data = [];
        var self = this;

        this.$element.find(':selected').each(function () {
          var $option = $(this);

          var option = self.item($option);

          data.push(option);
        });

        callback(data);
      };

      SelectAdapter.prototype.select = function (data) {
        var self = this;

        data.selected = true;

        // If data.element is a DOM node, use it instead
        if ($(data.element).is('option')) {
          data.element.selected = true;

          this.$element.trigger('change');

          return;
        }

        if (this.$element.prop('multiple')) {
          this.current(function (currentData) {
            var val = [];

            data = [data];
            data.push.apply(data, currentData);

            for (var d = 0; d < data.length; d++) {
              var id = data[d].id;

              if ($.inArray(id, val) === -1) {
                val.push(id);
              }
            }

            self.$element.val(val);
            self.$element.trigger('change');
          });
        } else {
          var val = data.id;

          this.$element.val(val);
          this.$element.trigger('change');
        }
      };

      SelectAdapter.prototype.unselect = function (data) {
        var self = this;

        if (!this.$element.prop('multiple')) {
          return;
        }

        data.selected = false;

        if ($(data.element).is('option')) {
          data.element.selected = false;

          this.$element.trigger('change');

          return;
        }

        this.current(function (currentData) {
          var val = [];

          for (var d = 0; d < currentData.length; d++) {
            var id = currentData[d].id;

            if (id !== data.id && $.inArray(id, val) === -1) {
              val.push(id);
            }
          }

          self.$element.val(val);

          self.$element.trigger('change');
        });
      };

      SelectAdapter.prototype.bind = function (container, $container) {
        var self = this;

        this.container = container;

        container.on('select', function (params) {
          self.select(params.data);
        });

        container.on('unselect', function (params) {
          self.unselect(params.data);
        });
      };

      SelectAdapter.prototype.destroy = function () {
        // Remove anything added to child elements
        this.$element.find('*').each(function () {
          // Remove any custom data set by Select2
          Utils.RemoveData(this);
        });
      };

      SelectAdapter.prototype.query = function (params, callback) {
        var data = [];
        var self = this;

        var $options = this.$element.children();

        $options.each(function () {
          var $option = $(this);

          if (!$option.is('option') && !$option.is('optgroup')) {
            return;
          }

          var option = self.item($option);

          var matches = self.matches(params, option);

          if (matches !== null) {
            data.push(matches);
          }
        });

        callback({
          results: data
        });
      };

      SelectAdapter.prototype.addOptions = function ($options) {
        Utils.appendMany(this.$element, $options);
      };

      SelectAdapter.prototype.option = function (data) {
        var option;

        if (data.children) {
          option = document.createElement('optgroup');
          option.label = data.text;
        } else {
          option = document.createElement('option');

          if (option.textContent !== undefined) {
            option.textContent = data.text;
          } else {
            option.innerText = data.text;
          }
        }

        if (data.id !== undefined) {
          option.value = data.id;
        }

        if (data.disabled) {
          option.disabled = true;
        }

        if (data.selected) {
          option.selected = true;
        }

        if (data.title) {
          option.title = data.title;
        }

        var $option = $(option);

        var normalizedData = this._normalizeItem(data);
        normalizedData.element = option;

        // Override the option's data with the combined data
        Utils.StoreData(option, 'data', normalizedData);

        return $option;
      };

      SelectAdapter.prototype.item = function ($option) {
        var data = {};

        data = Utils.GetData($option[0], 'data');

        if (data != null) {
          return data;
        }

        if ($option.is('option')) {
          data = {
            id: $option.val(),
            text: $option.text(),
            disabled: $option.prop('disabled'),
            selected: $option.prop('selected'),
            title: $option.prop('title')
          };
        } else if ($option.is('optgroup')) {
          data = {
            text: $option.prop('label'),
            children: [],
            title: $option.prop('title')
          };

          var $children = $option.children('option');
          var children = [];

          for (var c = 0; c < $children.length; c++) {
            var $child = $($children[c]);

            var child = this.item($child);

            children.push(child);
          }

          data.children = children;
        }

        data = this._normalizeItem(data);
        data.element = $option[0];

        Utils.StoreData($option[0], 'data', data);

        return data;
      };

      SelectAdapter.prototype._normalizeItem = function (item) {
        if (item !== Object(item)) {
          item = {
            id: item,
            text: item
          };
        }

        item = $.extend({}, {
          text: ''
        }, item);

        var defaults = {
          selected: false,
          disabled: false
        };

        if (item.id != null) {
          item.id = item.id.toString();
        }

        if (item.text != null) {
          item.text = item.text.toString();
        }

        if (item._resultId == null && item.id && this.container != null) {
          item._resultId = this.generateResultId(this.container, item);
        }

        return $.extend({}, defaults, item);
      };

      SelectAdapter.prototype.matches = function (params, data) {
        var matcher = this.options.get('matcher');

        return matcher(params, data);
      };

      return SelectAdapter;
    });

    S2.define('select2/data/array', ['./select', '../utils', 'jquery'], function (SelectAdapter, Utils, $) {
      function ArrayAdapter($element, options) {
        var data = options.get('data') || [];

        ArrayAdapter.__super__.constructor.call(this, $element, options);

        this.addOptions(this.convertToOptions(data));
      }

      Utils.Extend(ArrayAdapter, SelectAdapter);

      ArrayAdapter.prototype.select = function (data) {
        var $option = this.$element.find('option').filter(function (i, elm) {
          return elm.value == data.id.toString();
        });

        if ($option.length === 0) {
          $option = this.option(data);

          this.addOptions($option);
        }

        ArrayAdapter.__super__.select.call(this, data);
      };

      ArrayAdapter.prototype.convertToOptions = function (data) {
        var self = this;

        var $existing = this.$element.find('option');
        var existingIds = $existing.map(function () {
          return self.item($(this)).id;
        }).get();

        var $options = [];

        // Filter out all items except for the one passed in the argument
        function onlyItem(item) {
          return function () {
            return $(this).val() == item.id;
          };
        }

        for (var d = 0; d < data.length; d++) {
          var item = this._normalizeItem(data[d]);

          // Skip items which were pre-loaded, only merge the data
          if ($.inArray(item.id, existingIds) >= 0) {
            var $existingOption = $existing.filter(onlyItem(item));

            var existingData = this.item($existingOption);
            var newData = $.extend(true, {}, item, existingData);

            var $newOption = this.option(newData);

            $existingOption.replaceWith($newOption);

            continue;
          }

          var $option = this.option(item);

          if (item.children) {
            var $children = this.convertToOptions(item.children);

            Utils.appendMany($option, $children);
          }

          $options.push($option);
        }

        return $options;
      };

      return ArrayAdapter;
    });

    S2.define('select2/data/ajax', ['./array', '../utils', 'jquery'], function (ArrayAdapter, Utils, $) {
      function AjaxAdapter($element, options) {
        this.ajaxOptions = this._applyDefaults(options.get('ajax'));

        if (this.ajaxOptions.processResults != null) {
          this.processResults = this.ajaxOptions.processResults;
        }

        AjaxAdapter.__super__.constructor.call(this, $element, options);
      }

      Utils.Extend(AjaxAdapter, ArrayAdapter);

      AjaxAdapter.prototype._applyDefaults = function (options) {
        var defaults = {
          data: function data(params) {
            return $.extend({}, params, {
              q: params.term
            });
          },
          transport: function transport(params, success, failure) {
            var $request = $.ajax(params);

            $request.then(success);
            $request.fail(failure);

            return $request;
          }
        };

        return $.extend({}, defaults, options, true);
      };

      AjaxAdapter.prototype.processResults = function (results) {
        return results;
      };

      AjaxAdapter.prototype.query = function (params, callback) {
        var matches = [];
        var self = this;

        if (this._request != null) {
          // JSONP requests cannot always be aborted
          if ($.isFunction(this._request.abort)) {
            this._request.abort();
          }

          this._request = null;
        }

        var options = $.extend({
          type: 'GET'
        }, this.ajaxOptions);

        if (typeof options.url === 'function') {
          options.url = options.url.call(this.$element, params);
        }

        if (typeof options.data === 'function') {
          options.data = options.data.call(this.$element, params);
        }

        function request() {
          var $request = options.transport(options, function (data) {
            var results = self.processResults(data, params);

            if (self.options.get('debug') && window.console && console.error) {
              // Check to make sure that the response included a `results` key.
              if (!results || !results.results || !$.isArray(results.results)) {
                console.error('Select2: The AJAX results did not return an array in the ' + '`results` key of the response.');
              }
            }

            callback(results);
          }, function () {
            // Attempt to detect if a request was aborted
            // Only works if the transport exposes a status property
            if ('status' in $request && ($request.status === 0 || $request.status === '0')) {
              return;
            }

            self.trigger('results:message', {
              message: 'errorLoading'
            });
          });

          self._request = $request;
        }

        if (this.ajaxOptions.delay && params.term != null) {
          if (this._queryTimeout) {
            window.clearTimeout(this._queryTimeout);
          }

          this._queryTimeout = window.setTimeout(request, this.ajaxOptions.delay);
        } else {
          request();
        }
      };

      return AjaxAdapter;
    });

    S2.define('select2/data/tags', ['jquery'], function ($) {
      function Tags(decorated, $element, options) {
        var tags = options.get('tags');

        var createTag = options.get('createTag');

        if (createTag !== undefined) {
          this.createTag = createTag;
        }

        var insertTag = options.get('insertTag');

        if (insertTag !== undefined) {
          this.insertTag = insertTag;
        }

        decorated.call(this, $element, options);

        if ($.isArray(tags)) {
          for (var t = 0; t < tags.length; t++) {
            var tag = tags[t];
            var item = this._normalizeItem(tag);

            var $option = this.option(item);

            this.$element.append($option);
          }
        }
      }

      Tags.prototype.query = function (decorated, params, callback) {
        var self = this;

        this._removeOldTags();

        if (params.term == null || params.page != null) {
          decorated.call(this, params, callback);
          return;
        }

        function wrapper(obj, child) {
          var data = obj.results;

          for (var i = 0; i < data.length; i++) {
            var option = data[i];

            var checkChildren = option.children != null && !wrapper({
              results: option.children
            }, true);

            var optionText = (option.text || '').toUpperCase();
            var paramsTerm = (params.term || '').toUpperCase();

            var checkText = optionText === paramsTerm;

            if (checkText || checkChildren) {
              if (child) {
                return false;
              }

              obj.data = data;
              callback(obj);

              return;
            }
          }

          if (child) {
            return true;
          }

          var tag = self.createTag(params);

          if (tag != null) {
            var $option = self.option(tag);
            $option.attr('data-select2-tag', true);

            self.addOptions([$option]);

            self.insertTag(data, tag);
          }

          obj.results = data;

          callback(obj);
        }

        decorated.call(this, params, wrapper);
      };

      Tags.prototype.createTag = function (decorated, params) {
        var term = $.trim(params.term);

        if (term === '') {
          return null;
        }

        return {
          id: term,
          text: term
        };
      };

      Tags.prototype.insertTag = function (_, data, tag) {
        data.unshift(tag);
      };

      Tags.prototype._removeOldTags = function (_) {
        var tag = this._lastTag;

        var $options = this.$element.find('option[data-select2-tag]');

        $options.each(function () {
          if (this.selected) {
            return;
          }

          $(this).remove();
        });
      };

      return Tags;
    });

    S2.define('select2/data/tokenizer', ['jquery'], function ($) {
      function Tokenizer(decorated, $element, options) {
        var tokenizer = options.get('tokenizer');

        if (tokenizer !== undefined) {
          this.tokenizer = tokenizer;
        }

        decorated.call(this, $element, options);
      }

      Tokenizer.prototype.bind = function (decorated, container, $container) {
        decorated.call(this, container, $container);

        this.$search = container.dropdown.$search || container.selection.$search || $container.find('.select2-search__field');
      };

      Tokenizer.prototype.query = function (decorated, params, callback) {
        var self = this;

        function createAndSelect(data) {
          // Normalize the data object so we can use it for checks
          var item = self._normalizeItem(data);

          // Check if the data object already exists as a tag
          // Select it if it doesn't
          var $existingOptions = self.$element.find('option').filter(function () {
            return $(this).val() === item.id;
          });

          // If an existing option wasn't found for it, create the option
          if (!$existingOptions.length) {
            var $option = self.option(item);
            $option.attr('data-select2-tag', true);

            self._removeOldTags();
            self.addOptions([$option]);
          }

          // Select the item, now that we know there is an option for it
          select(item);
        }

        function select(data) {
          self.trigger('select', {
            data: data
          });
        }

        params.term = params.term || '';

        var tokenData = this.tokenizer(params, this.options, createAndSelect);

        if (tokenData.term !== params.term) {
          // Replace the search term if we have the search box
          if (this.$search.length) {
            this.$search.val(tokenData.term);
            this.$search.focus();
          }

          params.term = tokenData.term;
        }

        decorated.call(this, params, callback);
      };

      Tokenizer.prototype.tokenizer = function (_, params, options, callback) {
        var separators = options.get('tokenSeparators') || [];
        var term = params.term;
        var i = 0;

        var createTag = this.createTag || function (params) {
          return {
            id: params.term,
            text: params.term
          };
        };

        while (i < term.length) {
          var termChar = term[i];

          if ($.inArray(termChar, separators) === -1) {
            i++;

            continue;
          }

          var part = term.substr(0, i);
          var partParams = $.extend({}, params, {
            term: part
          });

          var data = createTag(partParams);

          if (data == null) {
            i++;
            continue;
          }

          callback(data);

          // Reset the term to not include the tokenized portion
          term = term.substr(i + 1) || '';
          i = 0;
        }

        return {
          term: term
        };
      };

      return Tokenizer;
    });

    S2.define('select2/data/minimumInputLength', [], function () {
      function MinimumInputLength(decorated, $e, options) {
        this.minimumInputLength = options.get('minimumInputLength');

        decorated.call(this, $e, options);
      }

      MinimumInputLength.prototype.query = function (decorated, params, callback) {
        params.term = params.term || '';

        if (params.term.length < this.minimumInputLength) {
          this.trigger('results:message', {
            message: 'inputTooShort',
            args: {
              minimum: this.minimumInputLength,
              input: params.term,
              params: params
            }
          });

          return;
        }

        decorated.call(this, params, callback);
      };

      return MinimumInputLength;
    });

    S2.define('select2/data/maximumInputLength', [], function () {
      function MaximumInputLength(decorated, $e, options) {
        this.maximumInputLength = options.get('maximumInputLength');

        decorated.call(this, $e, options);
      }

      MaximumInputLength.prototype.query = function (decorated, params, callback) {
        params.term = params.term || '';

        if (this.maximumInputLength > 0 && params.term.length > this.maximumInputLength) {
          this.trigger('results:message', {
            message: 'inputTooLong',
            args: {
              maximum: this.maximumInputLength,
              input: params.term,
              params: params
            }
          });

          return;
        }

        decorated.call(this, params, callback);
      };

      return MaximumInputLength;
    });

    S2.define('select2/data/maximumSelectionLength', [], function () {
      function MaximumSelectionLength(decorated, $e, options) {
        this.maximumSelectionLength = options.get('maximumSelectionLength');

        decorated.call(this, $e, options);
      }

      MaximumSelectionLength.prototype.query = function (decorated, params, callback) {
        var self = this;

        this.current(function (currentData) {
          var count = currentData != null ? currentData.length : 0;
          if (self.maximumSelectionLength > 0 && count >= self.maximumSelectionLength) {
            self.trigger('results:message', {
              message: 'maximumSelected',
              args: {
                maximum: self.maximumSelectionLength
              }
            });
            return;
          }
          decorated.call(self, params, callback);
        });
      };

      return MaximumSelectionLength;
    });

    S2.define('select2/dropdown', ['jquery', './utils'], function ($, Utils) {
      function Dropdown($element, options) {
        this.$element = $element;
        this.options = options;

        Dropdown.__super__.constructor.call(this);
      }

      Utils.Extend(Dropdown, Utils.Observable);

      Dropdown.prototype.render = function () {
        var $dropdown = $('<span class="select2-dropdown">' + '<span class="select2-results"></span>' + '</span>');

        $dropdown.attr('dir', this.options.get('dir'));

        this.$dropdown = $dropdown;

        return $dropdown;
      };

      Dropdown.prototype.bind = function () {
        // Should be implemented in subclasses
      };

      Dropdown.prototype.position = function ($dropdown, $container) {
        // Should be implmented in subclasses
      };

      Dropdown.prototype.destroy = function () {
        // Remove the dropdown from the DOM
        this.$dropdown.remove();
      };

      return Dropdown;
    });

    S2.define('select2/dropdown/search', ['jquery', '../utils'], function ($, Utils) {
      function Search() {}

      Search.prototype.render = function (decorated) {
        var $rendered = decorated.call(this);

        var $search = $('<span class="select2-search select2-search--dropdown">' + '<input class="select2-search__field" type="search" tabindex="-1"' + ' autocomplete="off" autocorrect="off" autocapitalize="none"' + ' spellcheck="false" role="textbox" />' + '</span>');

        this.$searchContainer = $search;
        this.$search = $search.find('input');

        $rendered.prepend($search);

        return $rendered;
      };

      Search.prototype.bind = function (decorated, container, $container) {
        var self = this;

        decorated.call(this, container, $container);

        this.$search.on('keydown', function (evt) {
          self.trigger('keypress', evt);

          self._keyUpPrevented = evt.isDefaultPrevented();
        });

        // Workaround for browsers which do not support the `input` event
        // This will prevent double-triggering of events for browsers which support
        // both the `keyup` and `input` events.
        this.$search.on('input', function (evt) {
          // Unbind the duplicated `keyup` event
          $(this).off('keyup');
        });

        this.$search.on('keyup input', function (evt) {
          self.handleSearch(evt);
        });

        container.on('open', function () {
          self.$search.attr('tabindex', 0);

          self.$search.focus();

          window.setTimeout(function () {
            self.$search.focus();
          }, 0);
        });

        container.on('close', function () {
          self.$search.attr('tabindex', -1);

          self.$search.val('');
          self.$search.blur();
        });

        container.on('focus', function () {
          if (!container.isOpen()) {
            self.$search.focus();
          }
        });

        container.on('results:all', function (params) {
          if (params.query.term == null || params.query.term === '') {
            var showSearch = self.showSearch(params);

            if (showSearch) {
              self.$searchContainer.removeClass('select2-search--hide');
            } else {
              self.$searchContainer.addClass('select2-search--hide');
            }
          }
        });
      };

      Search.prototype.handleSearch = function (evt) {
        if (!this._keyUpPrevented) {
          var input = this.$search.val();

          this.trigger('query', {
            term: input
          });
        }

        this._keyUpPrevented = false;
      };

      Search.prototype.showSearch = function (_, params) {
        return true;
      };

      return Search;
    });

    S2.define('select2/dropdown/hidePlaceholder', [], function () {
      function HidePlaceholder(decorated, $element, options, dataAdapter) {
        this.placeholder = this.normalizePlaceholder(options.get('placeholder'));

        decorated.call(this, $element, options, dataAdapter);
      }

      HidePlaceholder.prototype.append = function (decorated, data) {
        data.results = this.removePlaceholder(data.results);

        decorated.call(this, data);
      };

      HidePlaceholder.prototype.normalizePlaceholder = function (_, placeholder) {
        if (typeof placeholder === 'string') {
          placeholder = {
            id: '',
            text: placeholder
          };
        }

        return placeholder;
      };

      HidePlaceholder.prototype.removePlaceholder = function (_, data) {
        var modifiedData = data.slice(0);

        for (var d = data.length - 1; d >= 0; d--) {
          var item = data[d];

          if (this.placeholder.id === item.id) {
            modifiedData.splice(d, 1);
          }
        }

        return modifiedData;
      };

      return HidePlaceholder;
    });

    S2.define('select2/dropdown/infiniteScroll', ['jquery'], function ($) {
      function InfiniteScroll(decorated, $element, options, dataAdapter) {
        this.lastParams = {};

        decorated.call(this, $element, options, dataAdapter);

        this.$loadingMore = this.createLoadingMore();
        this.loading = false;
      }

      InfiniteScroll.prototype.append = function (decorated, data) {
        this.$loadingMore.remove();
        this.loading = false;

        decorated.call(this, data);

        if (this.showLoadingMore(data)) {
          this.$results.append(this.$loadingMore);
        }
      };

      InfiniteScroll.prototype.bind = function (decorated, container, $container) {
        var self = this;

        decorated.call(this, container, $container);

        container.on('query', function (params) {
          self.lastParams = params;
          self.loading = true;
        });

        container.on('query:append', function (params) {
          self.lastParams = params;
          self.loading = true;
        });

        this.$results.on('scroll', function () {
          var isLoadMoreVisible = $.contains(document.documentElement, self.$loadingMore[0]);

          if (self.loading || !isLoadMoreVisible) {
            return;
          }

          var currentOffset = self.$results.offset().top + self.$results.outerHeight(false);
          var loadingMoreOffset = self.$loadingMore.offset().top + self.$loadingMore.outerHeight(false);

          if (currentOffset + 50 >= loadingMoreOffset) {
            self.loadMore();
          }
        });
      };

      InfiniteScroll.prototype.loadMore = function () {
        this.loading = true;

        var params = $.extend({}, { page: 1 }, this.lastParams);

        params.page++;

        this.trigger('query:append', params);
      };

      InfiniteScroll.prototype.showLoadingMore = function (_, data) {
        return data.pagination && data.pagination.more;
      };

      InfiniteScroll.prototype.createLoadingMore = function () {
        var $option = $('<li ' + 'class="select2-results__option select2-results__option--load-more"' + 'role="treeitem" aria-disabled="true"></li>');

        var message = this.options.get('translations').get('loadingMore');

        $option.html(message(this.lastParams));

        return $option;
      };

      return InfiniteScroll;
    });

    S2.define('select2/dropdown/attachBody', ['jquery', '../utils'], function ($, Utils) {
      function AttachBody(decorated, $element, options) {
        this.$dropdownParent = options.get('dropdownParent') || $(document.body);

        decorated.call(this, $element, options);
      }

      AttachBody.prototype.bind = function (decorated, container, $container) {
        var self = this;

        var setupResultsEvents = false;

        decorated.call(this, container, $container);

        container.on('open', function () {
          self._showDropdown();
          self._attachPositioningHandler(container);

          if (!setupResultsEvents) {
            setupResultsEvents = true;

            container.on('results:all', function () {
              self._positionDropdown();
              self._resizeDropdown();
            });

            container.on('results:append', function () {
              self._positionDropdown();
              self._resizeDropdown();
            });
          }
        });

        container.on('close', function () {
          self._hideDropdown();
          self._detachPositioningHandler(container);
        });

        this.$dropdownContainer.on('mousedown', function (evt) {
          evt.stopPropagation();
        });
      };

      AttachBody.prototype.destroy = function (decorated) {
        decorated.call(this);

        this.$dropdownContainer.remove();
      };

      AttachBody.prototype.position = function (decorated, $dropdown, $container) {
        // Clone all of the container classes
        $dropdown.attr('class', $container.attr('class'));

        $dropdown.removeClass('select2');
        $dropdown.addClass('select2-container--open');

        $dropdown.css({
          position: 'absolute',
          top: -999999
        });

        this.$container = $container;
      };

      AttachBody.prototype.render = function (decorated) {
        var $container = $('<span></span>');

        var $dropdown = decorated.call(this);
        $container.append($dropdown);

        this.$dropdownContainer = $container;

        return $container;
      };

      AttachBody.prototype._hideDropdown = function (decorated) {
        this.$dropdownContainer.detach();
      };

      AttachBody.prototype._attachPositioningHandler = function (decorated, container) {
        var self = this;

        var scrollEvent = 'scroll.select2.' + container.id;
        var resizeEvent = 'resize.select2.' + container.id;
        var orientationEvent = 'orientationchange.select2.' + container.id;

        var $watchers = this.$container.parents().filter(Utils.hasScroll);
        $watchers.each(function () {
          Utils.StoreData(this, 'select2-scroll-position', {
            x: $(this).scrollLeft(),
            y: $(this).scrollTop()
          });
        });

        $watchers.on(scrollEvent, function (ev) {
          var position = Utils.GetData(this, 'select2-scroll-position');
          $(this).scrollTop(position.y);
        });

        $(window).on(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent, function (e) {
          self._positionDropdown();
          self._resizeDropdown();
        });
      };

      AttachBody.prototype._detachPositioningHandler = function (decorated, container) {
        var scrollEvent = 'scroll.select2.' + container.id;
        var resizeEvent = 'resize.select2.' + container.id;
        var orientationEvent = 'orientationchange.select2.' + container.id;

        var $watchers = this.$container.parents().filter(Utils.hasScroll);
        $watchers.off(scrollEvent);

        $(window).off(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent);
      };

      AttachBody.prototype._positionDropdown = function () {
        var $window = $(window);

        var isCurrentlyAbove = this.$dropdown.hasClass('select2-dropdown--above');
        var isCurrentlyBelow = this.$dropdown.hasClass('select2-dropdown--below');

        var newDirection = null;

        var offset = this.$container.offset();

        offset.bottom = offset.top + this.$container.outerHeight(false);

        var container = {
          height: this.$container.outerHeight(false)
        };

        container.top = offset.top;
        container.bottom = offset.top + container.height;

        var dropdown = {
          height: this.$dropdown.outerHeight(false)
        };

        var viewport = {
          top: $window.scrollTop(),
          bottom: $window.scrollTop() + $window.height()
        };

        var enoughRoomAbove = viewport.top < offset.top - dropdown.height;
        var enoughRoomBelow = viewport.bottom > offset.bottom + dropdown.height;

        var css = {
          left: offset.left,
          top: container.bottom
        };

        // Determine what the parent element is to use for calciulating the offset
        var $offsetParent = this.$dropdownParent;

        // For statically positoned elements, we need to get the element
        // that is determining the offset
        if ($offsetParent.css('position') === 'static') {
          $offsetParent = $offsetParent.offsetParent();
        }

        var parentOffset = $offsetParent.offset();

        css.top -= parentOffset.top;
        css.left -= parentOffset.left;

        if (!isCurrentlyAbove && !isCurrentlyBelow) {
          newDirection = 'below';
        }

        if (!enoughRoomBelow && enoughRoomAbove && !isCurrentlyAbove) {
          newDirection = 'above';
        } else if (!enoughRoomAbove && enoughRoomBelow && isCurrentlyAbove) {
          newDirection = 'below';
        }

        if (newDirection == 'above' || isCurrentlyAbove && newDirection !== 'below') {
          css.top = container.top - parentOffset.top - dropdown.height;
        }

        if (newDirection != null) {
          this.$dropdown.removeClass('select2-dropdown--below select2-dropdown--above').addClass('select2-dropdown--' + newDirection);
          this.$container.removeClass('select2-container--below select2-container--above').addClass('select2-container--' + newDirection);
        }

        this.$dropdownContainer.css(css);
      };

      AttachBody.prototype._resizeDropdown = function () {
        var css = {
          width: this.$container.outerWidth(false) + 'px'
        };

        if (this.options.get('dropdownAutoWidth')) {
          css.minWidth = css.width;
          css.position = 'relative';
          css.width = 'auto';
        }

        this.$dropdown.css(css);
      };

      AttachBody.prototype._showDropdown = function (decorated) {
        this.$dropdownContainer.appendTo(this.$dropdownParent);

        this._positionDropdown();
        this._resizeDropdown();
      };

      return AttachBody;
    });

    S2.define('select2/dropdown/minimumResultsForSearch', [], function () {
      function countResults(data) {
        var count = 0;

        for (var d = 0; d < data.length; d++) {
          var item = data[d];

          if (item.children) {
            count += countResults(item.children);
          } else {
            count++;
          }
        }

        return count;
      }

      function MinimumResultsForSearch(decorated, $element, options, dataAdapter) {
        this.minimumResultsForSearch = options.get('minimumResultsForSearch');

        if (this.minimumResultsForSearch < 0) {
          this.minimumResultsForSearch = Infinity;
        }

        decorated.call(this, $element, options, dataAdapter);
      }

      MinimumResultsForSearch.prototype.showSearch = function (decorated, params) {
        if (countResults(params.data.results) < this.minimumResultsForSearch) {
          return false;
        }

        return decorated.call(this, params);
      };

      return MinimumResultsForSearch;
    });

    S2.define('select2/dropdown/selectOnClose', ['../utils'], function (Utils) {
      function SelectOnClose() {}

      SelectOnClose.prototype.bind = function (decorated, container, $container) {
        var self = this;

        decorated.call(this, container, $container);

        container.on('close', function (params) {
          self._handleSelectOnClose(params);
        });
      };

      SelectOnClose.prototype._handleSelectOnClose = function (_, params) {
        if (params && params.originalSelect2Event != null) {
          var event = params.originalSelect2Event;

          // Don't select an item if the close event was triggered from a select or
          // unselect event
          if (event._type === 'select' || event._type === 'unselect') {
            return;
          }
        }

        var $highlightedResults = this.getHighlightedResults();

        // Only select highlighted results
        if ($highlightedResults.length < 1) {
          return;
        }

        var data = Utils.GetData($highlightedResults[0], 'data');

        // Don't re-select already selected resulte
        if (data.element != null && data.element.selected || data.element == null && data.selected) {
          return;
        }

        this.trigger('select', {
          data: data
        });
      };

      return SelectOnClose;
    });

    S2.define('select2/dropdown/closeOnSelect', [], function () {
      function CloseOnSelect() {}

      CloseOnSelect.prototype.bind = function (decorated, container, $container) {
        var self = this;

        decorated.call(this, container, $container);

        container.on('select', function (evt) {
          self._selectTriggered(evt);
        });

        container.on('unselect', function (evt) {
          self._selectTriggered(evt);
        });
      };

      CloseOnSelect.prototype._selectTriggered = function (_, evt) {
        var originalEvent = evt.originalEvent;

        // Don't close if the control key is being held
        if (originalEvent && originalEvent.ctrlKey) {
          return;
        }

        this.trigger('close', {
          originalEvent: originalEvent,
          originalSelect2Event: evt
        });
      };

      return CloseOnSelect;
    });

    S2.define('select2/i18n/en', [], function () {
      // English
      return {
        errorLoading: function errorLoading() {
          return 'The results could not be loaded.';
        },
        inputTooLong: function inputTooLong(args) {
          var overChars = args.input.length - args.maximum;

          var message = 'Please delete ' + overChars + ' character';

          if (overChars != 1) {
            message += 's';
          }

          return message;
        },
        inputTooShort: function inputTooShort(args) {
          var remainingChars = args.minimum - args.input.length;

          var message = 'Please enter ' + remainingChars + ' or more characters';

          return message;
        },
        loadingMore: function loadingMore() {
          return 'Loading more results…';
        },
        maximumSelected: function maximumSelected(args) {
          var message = 'You can only select ' + args.maximum + ' item';

          if (args.maximum != 1) {
            message += 's';
          }

          return message;
        },
        noResults: function noResults() {
          return 'No results found';
        },
        searching: function searching() {
          return 'Searching…';
        }
      };
    });

    S2.define('select2/defaults', ['jquery', 'require', './results', './selection/single', './selection/multiple', './selection/placeholder', './selection/allowClear', './selection/search', './selection/eventRelay', './utils', './translation', './diacritics', './data/select', './data/array', './data/ajax', './data/tags', './data/tokenizer', './data/minimumInputLength', './data/maximumInputLength', './data/maximumSelectionLength', './dropdown', './dropdown/search', './dropdown/hidePlaceholder', './dropdown/infiniteScroll', './dropdown/attachBody', './dropdown/minimumResultsForSearch', './dropdown/selectOnClose', './dropdown/closeOnSelect', './i18n/en'], function ($, require, ResultsList, SingleSelection, MultipleSelection, Placeholder, AllowClear, SelectionSearch, EventRelay, Utils, Translation, DIACRITICS, SelectData, ArrayData, AjaxData, Tags, Tokenizer, MinimumInputLength, MaximumInputLength, MaximumSelectionLength, Dropdown, DropdownSearch, HidePlaceholder, InfiniteScroll, AttachBody, MinimumResultsForSearch, SelectOnClose, CloseOnSelect, EnglishTranslation) {
      function Defaults() {
        this.reset();
      }

      Defaults.prototype.apply = function (options) {
        options = $.extend(true, {}, this.defaults, options);

        if (options.dataAdapter == null) {
          if (options.ajax != null) {
            options.dataAdapter = AjaxData;
          } else if (options.data != null) {
            options.dataAdapter = ArrayData;
          } else {
            options.dataAdapter = SelectData;
          }

          if (options.minimumInputLength > 0) {
            options.dataAdapter = Utils.Decorate(options.dataAdapter, MinimumInputLength);
          }

          if (options.maximumInputLength > 0) {
            options.dataAdapter = Utils.Decorate(options.dataAdapter, MaximumInputLength);
          }

          if (options.maximumSelectionLength > 0) {
            options.dataAdapter = Utils.Decorate(options.dataAdapter, MaximumSelectionLength);
          }

          if (options.tags) {
            options.dataAdapter = Utils.Decorate(options.dataAdapter, Tags);
          }

          if (options.tokenSeparators != null || options.tokenizer != null) {
            options.dataAdapter = Utils.Decorate(options.dataAdapter, Tokenizer);
          }

          if (options.query != null) {
            var Query = require(options.amdBase + 'compat/query');

            options.dataAdapter = Utils.Decorate(options.dataAdapter, Query);
          }

          if (options.initSelection != null) {
            var InitSelection = require(options.amdBase + 'compat/initSelection');

            options.dataAdapter = Utils.Decorate(options.dataAdapter, InitSelection);
          }
        }

        if (options.resultsAdapter == null) {
          options.resultsAdapter = ResultsList;

          if (options.ajax != null) {
            options.resultsAdapter = Utils.Decorate(options.resultsAdapter, InfiniteScroll);
          }

          if (options.placeholder != null) {
            options.resultsAdapter = Utils.Decorate(options.resultsAdapter, HidePlaceholder);
          }

          if (options.selectOnClose) {
            options.resultsAdapter = Utils.Decorate(options.resultsAdapter, SelectOnClose);
          }
        }

        if (options.dropdownAdapter == null) {
          if (options.multiple) {
            options.dropdownAdapter = Dropdown;
          } else {
            var SearchableDropdown = Utils.Decorate(Dropdown, DropdownSearch);

            options.dropdownAdapter = SearchableDropdown;
          }

          if (options.minimumResultsForSearch !== 0) {
            options.dropdownAdapter = Utils.Decorate(options.dropdownAdapter, MinimumResultsForSearch);
          }

          if (options.closeOnSelect) {
            options.dropdownAdapter = Utils.Decorate(options.dropdownAdapter, CloseOnSelect);
          }

          if (options.dropdownCssClass != null || options.dropdownCss != null || options.adaptDropdownCssClass != null) {
            var DropdownCSS = require(options.amdBase + 'compat/dropdownCss');

            options.dropdownAdapter = Utils.Decorate(options.dropdownAdapter, DropdownCSS);
          }

          options.dropdownAdapter = Utils.Decorate(options.dropdownAdapter, AttachBody);
        }

        if (options.selectionAdapter == null) {
          if (options.multiple) {
            options.selectionAdapter = MultipleSelection;
          } else {
            options.selectionAdapter = SingleSelection;
          }

          // Add the placeholder mixin if a placeholder was specified
          if (options.placeholder != null) {
            options.selectionAdapter = Utils.Decorate(options.selectionAdapter, Placeholder);
          }

          if (options.allowClear) {
            options.selectionAdapter = Utils.Decorate(options.selectionAdapter, AllowClear);
          }

          if (options.multiple) {
            options.selectionAdapter = Utils.Decorate(options.selectionAdapter, SelectionSearch);
          }

          if (options.containerCssClass != null || options.containerCss != null || options.adaptContainerCssClass != null) {
            var ContainerCSS = require(options.amdBase + 'compat/containerCss');

            options.selectionAdapter = Utils.Decorate(options.selectionAdapter, ContainerCSS);
          }

          options.selectionAdapter = Utils.Decorate(options.selectionAdapter, EventRelay);
        }

        if (typeof options.language === 'string') {
          // Check if the language is specified with a region
          if (options.language.indexOf('-') > 0) {
            // Extract the region information if it is included
            var languageParts = options.language.split('-');
            var baseLanguage = languageParts[0];

            options.language = [options.language, baseLanguage];
          } else {
            options.language = [options.language];
          }
        }

        if ($.isArray(options.language)) {
          var languages = new Translation();
          options.language.push('en');

          var languageNames = options.language;

          for (var l = 0; l < languageNames.length; l++) {
            var name = languageNames[l];
            var language = {};

            try {
              // Try to load it with the original name
              language = Translation.loadPath(name);
            } catch (e) {
              try {
                // If we couldn't load it, check if it wasn't the full path
                name = this.defaults.amdLanguageBase + name;
                language = Translation.loadPath(name);
              } catch (ex) {
                // The translation could not be loaded at all. Sometimes this is
                // because of a configuration problem, other times this can be
                // because of how Select2 helps load all possible translation files.
                if (options.debug && window.console && console.warn) {
                  console.warn('Select2: The language file for "' + name + '" could not be ' + 'automatically loaded. A fallback will be used instead.');
                }

                continue;
              }
            }

            languages.extend(language);
          }

          options.translations = languages;
        } else {
          var baseTranslation = Translation.loadPath(this.defaults.amdLanguageBase + 'en');
          var customTranslation = new Translation(options.language);

          customTranslation.extend(baseTranslation);

          options.translations = customTranslation;
        }

        return options;
      };

      Defaults.prototype.reset = function () {
        function stripDiacritics(text) {
          // Used 'uni range + named function' from http://jsperf.com/diacritics/18
          function match(a) {
            return DIACRITICS[a] || a;
          }

          return text.replace(/[^\u0000-\u007E]/g, match);
        }

        function matcher(params, data) {
          // Always return the object if there is nothing to compare
          if ($.trim(params.term) === '') {
            return data;
          }

          // Do a recursive check for options with children
          if (data.children && data.children.length > 0) {
            // Clone the data object if there are children
            // This is required as we modify the object to remove any non-matches
            var match = $.extend(true, {}, data);

            // Check each child of the option
            for (var c = data.children.length - 1; c >= 0; c--) {
              var child = data.children[c];

              var matches = matcher(params, child);

              // If there wasn't a match, remove the object in the array
              if (matches == null) {
                match.children.splice(c, 1);
              }
            }

            // If any children matched, return the new object
            if (match.children.length > 0) {
              return match;
            }

            // If there were no matching children, check just the plain object
            return matcher(params, match);
          }

          var original = stripDiacritics(data.text).toUpperCase();
          var term = stripDiacritics(params.term).toUpperCase();

          // Check if the text contains the term
          if (original.indexOf(term) > -1) {
            return data;
          }

          // If it doesn't contain the term, don't return anything
          return null;
        }

        this.defaults = {
          amdBase: './',
          amdLanguageBase: './i18n/',
          closeOnSelect: true,
          debug: false,
          dropdownAutoWidth: false,
          escapeMarkup: Utils.escapeMarkup,
          language: EnglishTranslation,
          matcher: matcher,
          minimumInputLength: 0,
          maximumInputLength: 0,
          maximumSelectionLength: 0,
          minimumResultsForSearch: 0,
          selectOnClose: false,
          sorter: function sorter(data) {
            return data;
          },
          templateResult: function templateResult(result) {
            return result.text;
          },
          templateSelection: function templateSelection(selection) {
            return selection.text;
          },
          theme: 'default',
          width: 'resolve'
        };
      };

      Defaults.prototype.set = function (key, value) {
        var camelKey = $.camelCase(key);

        var data = {};
        data[camelKey] = value;

        var convertedData = Utils._convertData(data);

        $.extend(true, this.defaults, convertedData);
      };

      var defaults = new Defaults();

      return defaults;
    });

    S2.define('select2/options', ['require', 'jquery', './defaults', './utils'], function (require, $, Defaults, Utils) {
      function Options(options, $element) {
        this.options = options;

        if ($element != null) {
          this.fromElement($element);
        }

        this.options = Defaults.apply(this.options);

        if ($element && $element.is('input')) {
          var InputCompat = require(this.get('amdBase') + 'compat/inputData');

          this.options.dataAdapter = Utils.Decorate(this.options.dataAdapter, InputCompat);
        }
      }

      Options.prototype.fromElement = function ($e) {
        var excludedData = ['select2'];

        if (this.options.multiple == null) {
          this.options.multiple = $e.prop('multiple');
        }

        if (this.options.disabled == null) {
          this.options.disabled = $e.prop('disabled');
        }

        if (this.options.language == null) {
          if ($e.prop('lang')) {
            this.options.language = $e.prop('lang').toLowerCase();
          } else if ($e.closest('[lang]').prop('lang')) {
            this.options.language = $e.closest('[lang]').prop('lang');
          }
        }

        if (this.options.dir == null) {
          if ($e.prop('dir')) {
            this.options.dir = $e.prop('dir');
          } else if ($e.closest('[dir]').prop('dir')) {
            this.options.dir = $e.closest('[dir]').prop('dir');
          } else {
            this.options.dir = 'ltr';
          }
        }

        $e.prop('disabled', this.options.disabled);
        $e.prop('multiple', this.options.multiple);

        if (Utils.GetData($e[0], 'select2Tags')) {
          if (this.options.debug && window.console && console.warn) {
            console.warn('Select2: The `data-select2-tags` attribute has been changed to ' + 'use the `data-data` and `data-tags="true"` attributes and will be ' + 'removed in future versions of Select2.');
          }

          Utils.StoreData($e[0], 'data', Utils.GetData($e[0], 'select2Tags'));
          Utils.StoreData($e[0], 'tags', true);
        }

        if (Utils.GetData($e[0], 'ajaxUrl')) {
          if (this.options.debug && window.console && console.warn) {
            console.warn('Select2: The `data-ajax-url` attribute has been changed to ' + '`data-ajax--url` and support for the old attribute will be removed' + ' in future versions of Select2.');
          }

          $e.attr('ajax--url', Utils.GetData($e[0], 'ajaxUrl'));
          Utils.StoreData($e[0], 'ajax-Url', Utils.GetData($e[0], 'ajaxUrl'));
        }

        var dataset = {};

        // Prefer the element's `dataset` attribute if it exists
        // jQuery 1.x does not correctly handle data attributes with multiple dashes
        if ($.fn.jquery && $.fn.jquery.substr(0, 2) == '1.' && $e[0].dataset) {
          dataset = $.extend(true, {}, $e[0].dataset, Utils.GetData($e[0]));
        } else {
          dataset = Utils.GetData($e[0]);
        }

        var data = $.extend(true, {}, dataset);

        data = Utils._convertData(data);

        for (var key in data) {
          if ($.inArray(key, excludedData) > -1) {
            continue;
          }

          if ($.isPlainObject(this.options[key])) {
            $.extend(this.options[key], data[key]);
          } else {
            this.options[key] = data[key];
          }
        }

        return this;
      };

      Options.prototype.get = function (key) {
        return this.options[key];
      };

      Options.prototype.set = function (key, val) {
        this.options[key] = val;
      };

      return Options;
    });

    S2.define('select2/core', ['jquery', './options', './utils', './keys'], function ($, Options, Utils, KEYS) {
      var Select2 = function Select2($element, options) {
        if (Utils.GetData($element[0], 'select2') != null) {
          Utils.GetData($element[0], 'select2').destroy();
        }

        this.$element = $element;

        this.id = this._generateId($element);

        options = options || {};

        this.options = new Options(options, $element);

        Select2.__super__.constructor.call(this);

        // Set up the tabindex

        var tabindex = $element.attr('tabindex') || 0;
        Utils.StoreData($element[0], 'old-tabindex', tabindex);
        $element.attr('tabindex', '-1');

        // Set up containers and adapters

        var DataAdapter = this.options.get('dataAdapter');
        this.dataAdapter = new DataAdapter($element, this.options);

        var $container = this.render();

        this._placeContainer($container);

        var SelectionAdapter = this.options.get('selectionAdapter');
        this.selection = new SelectionAdapter($element, this.options);
        this.$selection = this.selection.render();

        this.selection.position(this.$selection, $container);

        var DropdownAdapter = this.options.get('dropdownAdapter');
        this.dropdown = new DropdownAdapter($element, this.options);
        this.$dropdown = this.dropdown.render();

        this.dropdown.position(this.$dropdown, $container);

        var ResultsAdapter = this.options.get('resultsAdapter');
        this.results = new ResultsAdapter($element, this.options, this.dataAdapter);
        this.$results = this.results.render();

        this.results.position(this.$results, this.$dropdown);

        // Bind events

        var self = this;

        // Bind the container to all of the adapters
        this._bindAdapters();

        // Register any DOM event handlers
        this._registerDomEvents();

        // Register any internal event handlers
        this._registerDataEvents();
        this._registerSelectionEvents();
        this._registerDropdownEvents();
        this._registerResultsEvents();
        this._registerEvents();

        // Set the initial state
        this.dataAdapter.current(function (initialData) {
          self.trigger('selection:update', {
            data: initialData
          });
        });

        // Hide the original select
        $element.addClass('select2-hidden-accessible');
        $element.attr('aria-hidden', 'true');

        // Synchronize any monitored attributes
        this._syncAttributes();

        Utils.StoreData($element[0], 'select2', this);

        // Ensure backwards compatibility with $element.data('select2').
        $element.data('select2', this);
      };

      Utils.Extend(Select2, Utils.Observable);

      Select2.prototype._generateId = function ($element) {
        var id = '';

        if ($element.attr('id') != null) {
          id = $element.attr('id');
        } else if ($element.attr('name') != null) {
          id = $element.attr('name') + '-' + Utils.generateChars(2);
        } else {
          id = Utils.generateChars(4);
        }

        id = id.replace(/(:|\.|\[|\]|,)/g, '');
        id = 'select2-' + id;

        return id;
      };

      Select2.prototype._placeContainer = function ($container) {
        $container.insertAfter(this.$element);

        var width = this._resolveWidth(this.$element, this.options.get('width'));

        if (width != null) {
          $container.css('width', width);
        }
      };

      Select2.prototype._resolveWidth = function ($element, method) {
        var WIDTH = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;

        if (method == 'resolve') {
          var styleWidth = this._resolveWidth($element, 'style');

          if (styleWidth != null) {
            return styleWidth;
          }

          return this._resolveWidth($element, 'element');
        }

        if (method == 'element') {
          var elementWidth = $element.outerWidth(false);

          if (elementWidth <= 0) {
            return 'auto';
          }

          return elementWidth + 'px';
        }

        if (method == 'style') {
          var style = $element.attr('style');

          if (typeof style !== 'string') {
            return null;
          }

          var attrs = style.split(';');

          for (var i = 0, l = attrs.length; i < l; i = i + 1) {
            var attr = attrs[i].replace(/\s/g, '');
            var matches = attr.match(WIDTH);

            if (matches !== null && matches.length >= 1) {
              return matches[1];
            }
          }

          return null;
        }

        return method;
      };

      Select2.prototype._bindAdapters = function () {
        this.dataAdapter.bind(this, this.$container);
        this.selection.bind(this, this.$container);

        this.dropdown.bind(this, this.$container);
        this.results.bind(this, this.$container);
      };

      Select2.prototype._registerDomEvents = function () {
        var self = this;

        this.$element.on('change.select2', function () {
          self.dataAdapter.current(function (data) {
            self.trigger('selection:update', {
              data: data
            });
          });
        });

        this.$element.on('focus.select2', function (evt) {
          self.trigger('focus', evt);
        });

        this._syncA = Utils.bind(this._syncAttributes, this);
        this._syncS = Utils.bind(this._syncSubtree, this);

        if (this.$element[0].attachEvent) {
          this.$element[0].attachEvent('onpropertychange', this._syncA);
        }

        var observer = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

        if (observer != null) {
          this._observer = new observer(function (mutations) {
            $.each(mutations, self._syncA);
            $.each(mutations, self._syncS);
          });
          this._observer.observe(this.$element[0], {
            attributes: true,
            childList: true,
            subtree: false
          });
        } else if (this.$element[0].addEventListener) {
          this.$element[0].addEventListener('DOMAttrModified', self._syncA, false);
          this.$element[0].addEventListener('DOMNodeInserted', self._syncS, false);
          this.$element[0].addEventListener('DOMNodeRemoved', self._syncS, false);
        }
      };

      Select2.prototype._registerDataEvents = function () {
        var self = this;

        this.dataAdapter.on('*', function (name, params) {
          self.trigger(name, params);
        });
      };

      Select2.prototype._registerSelectionEvents = function () {
        var self = this;
        var nonRelayEvents = ['toggle', 'focus'];

        this.selection.on('toggle', function () {
          self.toggleDropdown();
        });

        this.selection.on('focus', function (params) {
          self.focus(params);
        });

        this.selection.on('*', function (name, params) {
          if ($.inArray(name, nonRelayEvents) !== -1) {
            return;
          }

          self.trigger(name, params);
        });
      };

      Select2.prototype._registerDropdownEvents = function () {
        var self = this;

        this.dropdown.on('*', function (name, params) {
          self.trigger(name, params);
        });
      };

      Select2.prototype._registerResultsEvents = function () {
        var self = this;

        this.results.on('*', function (name, params) {
          self.trigger(name, params);
        });
      };

      Select2.prototype._registerEvents = function () {
        var self = this;

        this.on('open', function () {
          self.$container.addClass('select2-container--open');
        });

        this.on('close', function () {
          self.$container.removeClass('select2-container--open');
        });

        this.on('enable', function () {
          self.$container.removeClass('select2-container--disabled');
        });

        this.on('disable', function () {
          self.$container.addClass('select2-container--disabled');
        });

        this.on('blur', function () {
          self.$container.removeClass('select2-container--focus');
        });

        this.on('query', function (params) {
          if (!self.isOpen()) {
            self.trigger('open', {});
          }

          this.dataAdapter.query(params, function (data) {
            self.trigger('results:all', {
              data: data,
              query: params
            });
          });
        });

        this.on('query:append', function (params) {
          this.dataAdapter.query(params, function (data) {
            self.trigger('results:append', {
              data: data,
              query: params
            });
          });
        });

        this.on('keypress', function (evt) {
          var key = evt.which;

          if (self.isOpen()) {
            if (key === KEYS.ESC || key === KEYS.TAB || key === KEYS.UP && evt.altKey) {
              self.close();

              evt.preventDefault();
            } else if (key === KEYS.ENTER) {
              self.trigger('results:select', {});

              evt.preventDefault();
            } else if (key === KEYS.SPACE && evt.ctrlKey) {
              self.trigger('results:toggle', {});

              evt.preventDefault();
            } else if (key === KEYS.UP) {
              self.trigger('results:previous', {});

              evt.preventDefault();
            } else if (key === KEYS.DOWN) {
              self.trigger('results:next', {});

              evt.preventDefault();
            }
          } else {
            if (key === KEYS.ENTER || key === KEYS.SPACE || key === KEYS.DOWN && evt.altKey) {
              self.open();

              evt.preventDefault();
            }
          }
        });
      };

      Select2.prototype._syncAttributes = function () {
        this.options.set('disabled', this.$element.prop('disabled'));

        if (this.options.get('disabled')) {
          if (this.isOpen()) {
            this.close();
          }

          this.trigger('disable', {});
        } else {
          this.trigger('enable', {});
        }
      };

      Select2.prototype._syncSubtree = function (evt, mutations) {
        var changed = false;
        var self = this;

        // Ignore any mutation events raised for elements that aren't options or
        // optgroups. This handles the case when the select element is destroyed
        if (evt && evt.target && evt.target.nodeName !== 'OPTION' && evt.target.nodeName !== 'OPTGROUP') {
          return;
        }

        if (!mutations) {
          // If mutation events aren't supported, then we can only assume that the
          // change affected the selections
          changed = true;
        } else if (mutations.addedNodes && mutations.addedNodes.length > 0) {
          for (var n = 0; n < mutations.addedNodes.length; n++) {
            var node = mutations.addedNodes[n];

            if (node.selected) {
              changed = true;
            }
          }
        } else if (mutations.removedNodes && mutations.removedNodes.length > 0) {
          changed = true;
        }

        // Only re-pull the data if we think there is a change
        if (changed) {
          this.dataAdapter.current(function (currentData) {
            self.trigger('selection:update', {
              data: currentData
            });
          });
        }
      };

      /**
       * Override the trigger method to automatically trigger pre-events when
       * there are events that can be prevented.
       */
      Select2.prototype.trigger = function (name, args) {
        var actualTrigger = Select2.__super__.trigger;
        var preTriggerMap = {
          'open': 'opening',
          'close': 'closing',
          'select': 'selecting',
          'unselect': 'unselecting',
          'clear': 'clearing'
        };

        if (args === undefined) {
          args = {};
        }

        if (name in preTriggerMap) {
          var preTriggerName = preTriggerMap[name];
          var preTriggerArgs = {
            prevented: false,
            name: name,
            args: args
          };

          actualTrigger.call(this, preTriggerName, preTriggerArgs);

          if (preTriggerArgs.prevented) {
            args.prevented = true;

            return;
          }
        }

        actualTrigger.call(this, name, args);
      };

      Select2.prototype.toggleDropdown = function () {
        if (this.options.get('disabled')) {
          return;
        }

        if (this.isOpen()) {
          this.close();
        } else {
          this.open();
        }
      };

      Select2.prototype.open = function () {
        if (this.isOpen()) {
          return;
        }

        this.trigger('query', {});
      };

      Select2.prototype.close = function () {
        if (!this.isOpen()) {
          return;
        }

        this.trigger('close', {});
      };

      Select2.prototype.isOpen = function () {
        return this.$container.hasClass('select2-container--open');
      };

      Select2.prototype.hasFocus = function () {
        return this.$container.hasClass('select2-container--focus');
      };

      Select2.prototype.focus = function (data) {
        // No need to re-trigger focus events if we are already focused
        if (this.hasFocus()) {
          return;
        }

        this.$container.addClass('select2-container--focus');
        this.trigger('focus', {});
      };

      Select2.prototype.enable = function (args) {
        if (this.options.get('debug') && window.console && console.warn) {
          console.warn('Select2: The `select2("enable")` method has been deprecated and will' + ' be removed in later Select2 versions. Use $element.prop("disabled")' + ' instead.');
        }

        if (args == null || args.length === 0) {
          args = [true];
        }

        var disabled = !args[0];

        this.$element.prop('disabled', disabled);
      };

      Select2.prototype.data = function () {
        if (this.options.get('debug') && arguments.length > 0 && window.console && console.warn) {
          console.warn('Select2: Data can no longer be set using `select2("data")`. You ' + 'should consider setting the value instead using `$element.val()`.');
        }

        var data = [];

        this.dataAdapter.current(function (currentData) {
          data = currentData;
        });

        return data;
      };

      Select2.prototype.val = function (args) {
        if (this.options.get('debug') && window.console && console.warn) {
          console.warn('Select2: The `select2("val")` method has been deprecated and will be' + ' removed in later Select2 versions. Use $element.val() instead.');
        }

        if (args == null || args.length === 0) {
          return this.$element.val();
        }

        var newVal = args[0];

        if ($.isArray(newVal)) {
          newVal = $.map(newVal, function (obj) {
            return obj.toString();
          });
        }

        this.$element.val(newVal).trigger('change');
      };

      Select2.prototype.destroy = function () {
        this.$container.remove();

        if (this.$element[0].detachEvent) {
          this.$element[0].detachEvent('onpropertychange', this._syncA);
        }

        if (this._observer != null) {
          this._observer.disconnect();
          this._observer = null;
        } else if (this.$element[0].removeEventListener) {
          this.$element[0].removeEventListener('DOMAttrModified', this._syncA, false);
          this.$element[0].removeEventListener('DOMNodeInserted', this._syncS, false);
          this.$element[0].removeEventListener('DOMNodeRemoved', this._syncS, false);
        }

        this._syncA = null;
        this._syncS = null;

        this.$element.off('.select2');
        this.$element.attr('tabindex', Utils.GetData(this.$element[0], 'old-tabindex'));

        this.$element.removeClass('select2-hidden-accessible');
        this.$element.attr('aria-hidden', 'false');
        Utils.RemoveData(this.$element[0]);
        this.$element.removeData('select2');

        this.dataAdapter.destroy();
        this.selection.destroy();
        this.dropdown.destroy();
        this.results.destroy();

        this.dataAdapter = null;
        this.selection = null;
        this.dropdown = null;
        this.results = null;
      };

      Select2.prototype.render = function () {
        var $container = $('<span class="select2 select2-container">' + '<span class="selection"></span>' + '<span class="dropdown-wrapper" aria-hidden="true"></span>' + '</span>');

        $container.attr('dir', this.options.get('dir'));

        this.$container = $container;

        this.$container.addClass('select2-container--' + this.options.get('theme'));

        Utils.StoreData($container[0], 'element', this.$element);

        return $container;
      };

      return Select2;
    });

    S2.define('select2/compat/utils', ['jquery'], function ($) {
      function syncCssClasses($dest, $src, adapter) {
        var classes,
            replacements = [],
            adapted;

        classes = $.trim($dest.attr('class'));

        if (classes) {
          classes = '' + classes; // for IE which returns object

          $(classes.split(/\s+/)).each(function () {
            // Save all Select2 classes
            if (this.indexOf('select2-') === 0) {
              replacements.push(this);
            }
          });
        }

        classes = $.trim($src.attr('class'));

        if (classes) {
          classes = '' + classes; // for IE which returns object

          $(classes.split(/\s+/)).each(function () {
            // Only adapt non-Select2 classes
            if (this.indexOf('select2-') !== 0) {
              adapted = adapter(this);

              if (adapted != null) {
                replacements.push(adapted);
              }
            }
          });
        }

        $dest.attr('class', replacements.join(' '));
      }

      return {
        syncCssClasses: syncCssClasses
      };
    });

    S2.define('select2/compat/containerCss', ['jquery', './utils'], function ($, CompatUtils) {
      // No-op CSS adapter that discards all classes by default
      function _containerAdapter(clazz) {
        return null;
      }

      function ContainerCSS() {}

      ContainerCSS.prototype.render = function (decorated) {
        var $container = decorated.call(this);

        var containerCssClass = this.options.get('containerCssClass') || '';

        if ($.isFunction(containerCssClass)) {
          containerCssClass = containerCssClass(this.$element);
        }

        var containerCssAdapter = this.options.get('adaptContainerCssClass');
        containerCssAdapter = containerCssAdapter || _containerAdapter;

        if (containerCssClass.indexOf(':all:') !== -1) {
          containerCssClass = containerCssClass.replace(':all:', '');

          var _cssAdapter = containerCssAdapter;

          containerCssAdapter = function containerCssAdapter(clazz) {
            var adapted = _cssAdapter(clazz);

            if (adapted != null) {
              // Append the old one along with the adapted one
              return adapted + ' ' + clazz;
            }

            return clazz;
          };
        }

        var containerCss = this.options.get('containerCss') || {};

        if ($.isFunction(containerCss)) {
          containerCss = containerCss(this.$element);
        }

        CompatUtils.syncCssClasses($container, this.$element, containerCssAdapter);

        $container.css(containerCss);
        $container.addClass(containerCssClass);

        return $container;
      };

      return ContainerCSS;
    });

    S2.define('select2/compat/dropdownCss', ['jquery', './utils'], function ($, CompatUtils) {
      // No-op CSS adapter that discards all classes by default
      function _dropdownAdapter(clazz) {
        return null;
      }

      function DropdownCSS() {}

      DropdownCSS.prototype.render = function (decorated) {
        var $dropdown = decorated.call(this);

        var dropdownCssClass = this.options.get('dropdownCssClass') || '';

        if ($.isFunction(dropdownCssClass)) {
          dropdownCssClass = dropdownCssClass(this.$element);
        }

        var dropdownCssAdapter = this.options.get('adaptDropdownCssClass');
        dropdownCssAdapter = dropdownCssAdapter || _dropdownAdapter;

        if (dropdownCssClass.indexOf(':all:') !== -1) {
          dropdownCssClass = dropdownCssClass.replace(':all:', '');

          var _cssAdapter = dropdownCssAdapter;

          dropdownCssAdapter = function dropdownCssAdapter(clazz) {
            var adapted = _cssAdapter(clazz);

            if (adapted != null) {
              // Append the old one along with the adapted one
              return adapted + ' ' + clazz;
            }

            return clazz;
          };
        }

        var dropdownCss = this.options.get('dropdownCss') || {};

        if ($.isFunction(dropdownCss)) {
          dropdownCss = dropdownCss(this.$element);
        }

        CompatUtils.syncCssClasses($dropdown, this.$element, dropdownCssAdapter);

        $dropdown.css(dropdownCss);
        $dropdown.addClass(dropdownCssClass);

        return $dropdown;
      };

      return DropdownCSS;
    });

    S2.define('select2/compat/initSelection', ['jquery'], function ($) {
      function InitSelection(decorated, $element, options) {
        if (options.get('debug') && window.console && console.warn) {
          console.warn('Select2: The `initSelection` option has been deprecated in favor' + ' of a custom data adapter that overrides the `current` method. ' + 'This method is now called multiple times instead of a single ' + 'time when the instance is initialized. Support will be removed ' + 'for the `initSelection` option in future versions of Select2');
        }

        this.initSelection = options.get('initSelection');
        this._isInitialized = false;

        decorated.call(this, $element, options);
      }

      InitSelection.prototype.current = function (decorated, callback) {
        var self = this;

        if (this._isInitialized) {
          decorated.call(this, callback);

          return;
        }

        this.initSelection.call(null, this.$element, function (data) {
          self._isInitialized = true;

          if (!$.isArray(data)) {
            data = [data];
          }

          callback(data);
        });
      };

      return InitSelection;
    });

    S2.define('select2/compat/inputData', ['jquery', '../utils'], function ($, Utils) {
      function InputData(decorated, $element, options) {
        this._currentData = [];
        this._valueSeparator = options.get('valueSeparator') || ',';

        if ($element.prop('type') === 'hidden') {
          if (options.get('debug') && console && console.warn) {
            console.warn('Select2: Using a hidden input with Select2 is no longer ' + 'supported and may stop working in the future. It is recommended ' + 'to use a `<select>` element instead.');
          }
        }

        decorated.call(this, $element, options);
      }

      InputData.prototype.current = function (_, callback) {
        function getSelected(data, selectedIds) {
          var selected = [];

          if (data.selected || $.inArray(data.id, selectedIds) !== -1) {
            data.selected = true;
            selected.push(data);
          } else {
            data.selected = false;
          }

          if (data.children) {
            selected.push.apply(selected, getSelected(data.children, selectedIds));
          }

          return selected;
        }

        var selected = [];

        for (var d = 0; d < this._currentData.length; d++) {
          var data = this._currentData[d];

          selected.push.apply(selected, getSelected(data, this.$element.val().split(this._valueSeparator)));
        }

        callback(selected);
      };

      InputData.prototype.select = function (_, data) {
        if (!this.options.get('multiple')) {
          this.current(function (allData) {
            $.map(allData, function (data) {
              data.selected = false;
            });
          });

          this.$element.val(data.id);
          this.$element.trigger('change');
        } else {
          var value = this.$element.val();
          value += this._valueSeparator + data.id;

          this.$element.val(value);
          this.$element.trigger('change');
        }
      };

      InputData.prototype.unselect = function (_, data) {
        var self = this;

        data.selected = false;

        this.current(function (allData) {
          var values = [];

          for (var d = 0; d < allData.length; d++) {
            var item = allData[d];

            if (data.id == item.id) {
              continue;
            }

            values.push(item.id);
          }

          self.$element.val(values.join(self._valueSeparator));
          self.$element.trigger('change');
        });
      };

      InputData.prototype.query = function (_, params, callback) {
        var results = [];

        for (var d = 0; d < this._currentData.length; d++) {
          var data = this._currentData[d];

          var matches = this.matches(params, data);

          if (matches !== null) {
            results.push(matches);
          }
        }

        callback({
          results: results
        });
      };

      InputData.prototype.addOptions = function (_, $options) {
        var options = $.map($options, function ($option) {
          return Utils.GetData($option[0], 'data');
        });

        this._currentData.push.apply(this._currentData, options);
      };

      return InputData;
    });

    S2.define('select2/compat/matcher', ['jquery'], function ($) {
      function oldMatcher(matcher) {
        function wrappedMatcher(params, data) {
          var match = $.extend(true, {}, data);

          if (params.term == null || $.trim(params.term) === '') {
            return match;
          }

          if (data.children) {
            for (var c = data.children.length - 1; c >= 0; c--) {
              var child = data.children[c];

              // Check if the child object matches
              // The old matcher returned a boolean true or false
              var doesMatch = matcher(params.term, child.text, child);

              // If the child didn't match, pop it off
              if (!doesMatch) {
                match.children.splice(c, 1);
              }
            }

            if (match.children.length > 0) {
              return match;
            }
          }

          if (matcher(params.term, data.text, data)) {
            return match;
          }

          return null;
        }

        return wrappedMatcher;
      }

      return oldMatcher;
    });

    S2.define('select2/compat/query', [], function () {
      function Query(decorated, $element, options) {
        if (options.get('debug') && window.console && console.warn) {
          console.warn('Select2: The `query` option has been deprecated in favor of a ' + 'custom data adapter that overrides the `query` method. Support ' + 'will be removed for the `query` option in future versions of ' + 'Select2.');
        }

        decorated.call(this, $element, options);
      }

      Query.prototype.query = function (_, params, callback) {
        params.callback = callback;

        var query = this.options.get('query');

        query.call(null, params);
      };

      return Query;
    });

    S2.define('select2/dropdown/attachContainer', [], function () {
      function AttachContainer(decorated, $element, options) {
        decorated.call(this, $element, options);
      }

      AttachContainer.prototype.position = function (decorated, $dropdown, $container) {
        var $dropdownContainer = $container.find('.dropdown-wrapper');
        $dropdownContainer.append($dropdown);

        $dropdown.addClass('select2-dropdown--below');
        $container.addClass('select2-container--below');
      };

      return AttachContainer;
    });

    S2.define('select2/dropdown/stopPropagation', [], function () {
      function StopPropagation() {}

      StopPropagation.prototype.bind = function (decorated, container, $container) {
        decorated.call(this, container, $container);

        var stoppedEvents = ['blur', 'change', 'click', 'dblclick', 'focus', 'focusin', 'focusout', 'input', 'keydown', 'keyup', 'keypress', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseover', 'mouseup', 'search', 'touchend', 'touchstart'];

        this.$dropdown.on(stoppedEvents.join(' '), function (evt) {
          evt.stopPropagation();
        });
      };

      return StopPropagation;
    });

    S2.define('select2/selection/stopPropagation', [], function () {
      function StopPropagation() {}

      StopPropagation.prototype.bind = function (decorated, container, $container) {
        decorated.call(this, container, $container);

        var stoppedEvents = ['blur', 'change', 'click', 'dblclick', 'focus', 'focusin', 'focusout', 'input', 'keydown', 'keyup', 'keypress', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseover', 'mouseup', 'search', 'touchend', 'touchstart'];

        this.$selection.on(stoppedEvents.join(' '), function (evt) {
          evt.stopPropagation();
        });
      };

      return StopPropagation;
    });

    /*!
     * jQuery Mousewheel 3.1.13
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license
     * http://jquery.org/license
     */

    (function (factory) {
      if (typeof S2.define === 'function' && S2.define.amd) {
        // AMD. Register as an anonymous module.
        S2.define('jquery-mousewheel', ['jquery'], factory);
      } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
      } else {
        // Browser globals
        factory(jQuery);
      }
    })(function ($) {

      var toFix = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
          toBind = 'onwheel' in document || document.documentMode >= 9 ? ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
          slice = Array.prototype.slice,
          nullLowestDeltaTimeout,
          lowestDelta;

      if ($.event.fixHooks) {
        for (var i = toFix.length; i;) {
          $.event.fixHooks[toFix[--i]] = $.event.mouseHooks;
        }
      }

      var special = $.event.special.mousewheel = {
        version: '3.1.12',

        setup: function setup() {
          if (this.addEventListener) {
            for (var i = toBind.length; i;) {
              this.addEventListener(toBind[--i], handler, false);
            }
          } else {
            this.onmousewheel = handler;
          }
          // Store the line height and page height for this particular element
          $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
          $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
        },

        teardown: function teardown() {
          if (this.removeEventListener) {
            for (var i = toBind.length; i;) {
              this.removeEventListener(toBind[--i], handler, false);
            }
          } else {
            this.onmousewheel = null;
          }
          // Clean up the data we added to the element
          $.removeData(this, 'mousewheel-line-height');
          $.removeData(this, 'mousewheel-page-height');
        },

        getLineHeight: function getLineHeight(elem) {
          var $elem = $(elem),
              $parent = $elem['offsetParent' in $.fn ? 'offsetParent' : 'parent']();
          if (!$parent.length) {
            $parent = $('body');
          }
          return parseInt($parent.css('fontSize'), 10) || parseInt($elem.css('fontSize'), 10) || 16;
        },

        getPageHeight: function getPageHeight(elem) {
          return $(elem).height();
        },

        settings: {
          adjustOldDeltas: true, // see shouldAdjustOldDeltas() below
          normalizeOffset: true // calls getBoundingClientRect for each event
        }
      };

      $.fn.extend({
        mousewheel: function mousewheel(fn) {
          return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
        },

        unmousewheel: function unmousewheel(fn) {
          return this.unbind('mousewheel', fn);
        }
      });

      function handler(event) {
        var orgEvent = event || window.event,
            args = slice.call(arguments, 1),
            delta = 0,
            deltaX = 0,
            deltaY = 0,
            absDelta = 0,
            offsetX = 0,
            offsetY = 0;
        event = $.event.fix(orgEvent);
        event.type = 'mousewheel';

        // Old school scrollwheel delta
        if ('detail' in orgEvent) {
          deltaY = orgEvent.detail * -1;
        }
        if ('wheelDelta' in orgEvent) {
          deltaY = orgEvent.wheelDelta;
        }
        if ('wheelDeltaY' in orgEvent) {
          deltaY = orgEvent.wheelDeltaY;
        }
        if ('wheelDeltaX' in orgEvent) {
          deltaX = orgEvent.wheelDeltaX * -1;
        }

        // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
        if ('axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
          deltaX = deltaY * -1;
          deltaY = 0;
        }

        // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
        delta = deltaY === 0 ? deltaX : deltaY;

        // New school wheel delta (wheel event)
        if ('deltaY' in orgEvent) {
          deltaY = orgEvent.deltaY * -1;
          delta = deltaY;
        }
        if ('deltaX' in orgEvent) {
          deltaX = orgEvent.deltaX;
          if (deltaY === 0) {
            delta = deltaX * -1;
          }
        }

        // No change actually happened, no reason to go any further
        if (deltaY === 0 && deltaX === 0) {
          return;
        }

        // Need to convert lines and pages to pixels if we aren't already in pixels
        // There are three delta modes:
        //   * deltaMode 0 is by pixels, nothing to do
        //   * deltaMode 1 is by lines
        //   * deltaMode 2 is by pages
        if (orgEvent.deltaMode === 1) {
          var lineHeight = $.data(this, 'mousewheel-line-height');
          delta *= lineHeight;
          deltaY *= lineHeight;
          deltaX *= lineHeight;
        } else if (orgEvent.deltaMode === 2) {
          var pageHeight = $.data(this, 'mousewheel-page-height');
          delta *= pageHeight;
          deltaY *= pageHeight;
          deltaX *= pageHeight;
        }

        // Store lowest absolute delta to normalize the delta values
        absDelta = Math.max(Math.abs(deltaY), Math.abs(deltaX));

        if (!lowestDelta || absDelta < lowestDelta) {
          lowestDelta = absDelta;

          // Adjust older deltas if necessary
          if (shouldAdjustOldDeltas(orgEvent, absDelta)) {
            lowestDelta /= 40;
          }
        }

        // Adjust older deltas if necessary
        if (shouldAdjustOldDeltas(orgEvent, absDelta)) {
          // Divide all the things by 40!
          delta /= 40;
          deltaX /= 40;
          deltaY /= 40;
        }

        // Get a whole, normalized value for the deltas
        delta = Math[delta >= 1 ? 'floor' : 'ceil'](delta / lowestDelta);
        deltaX = Math[deltaX >= 1 ? 'floor' : 'ceil'](deltaX / lowestDelta);
        deltaY = Math[deltaY >= 1 ? 'floor' : 'ceil'](deltaY / lowestDelta);

        // Normalise offsetX and offsetY properties
        if (special.settings.normalizeOffset && this.getBoundingClientRect) {
          var boundingRect = this.getBoundingClientRect();
          offsetX = event.clientX - boundingRect.left;
          offsetY = event.clientY - boundingRect.top;
        }

        // Add information to the event object
        event.deltaX = deltaX;
        event.deltaY = deltaY;
        event.deltaFactor = lowestDelta;
        event.offsetX = offsetX;
        event.offsetY = offsetY;
        // Go ahead and set deltaMode to 0 since we converted to pixels
        // Although this is a little odd since we overwrite the deltaX/Y
        // properties with normalized deltas.
        event.deltaMode = 0;

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        // Clearout lowestDelta after sometime to better
        // handle multiple device types that give different
        // a different lowestDelta
        // Ex: trackpad = 3 and mouse wheel = 120
        if (nullLowestDeltaTimeout) {
          clearTimeout(nullLowestDeltaTimeout);
        }
        nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

        return ($.event.dispatch || $.event.handle).apply(this, args);
      }

      function nullLowestDelta() {
        lowestDelta = null;
      }

      function shouldAdjustOldDeltas(orgEvent, absDelta) {
        // If this is an older event and the delta is divisable by 120,
        // then we are assuming that the browser is treating this as an
        // older mouse wheel event and that we should divide the deltas
        // by 40 to try and get a more usable deltaFactor.
        // Side note, this actually impacts the reported scroll distance
        // in older browsers and can cause scrolling to be slower than native.
        // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
        return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
      }
    });

    S2.define('jquery.select2', ['jquery', 'jquery-mousewheel', './select2/core', './select2/defaults', './select2/utils'], function ($, _, Select2, Defaults, Utils) {
      if ($.fn.select2 == null) {
        // All methods that should return the element
        var thisMethods = ['open', 'close', 'destroy'];

        $.fn.select2 = function (options) {
          options = options || {};

          if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
            this.each(function () {
              var instanceOptions = $.extend(true, {}, options);

              var instance = new Select2($(this), instanceOptions);
            });

            return this;
          } else if (typeof options === 'string') {
            var ret;
            var args = Array.prototype.slice.call(arguments, 1);

            this.each(function () {
              var instance = Utils.GetData(this, 'select2');

              if (instance == null && window.console && console.error) {
                console.error('The select2(\'' + options + '\') method was called on an ' + 'element that is not using Select2.');
              }

              ret = instance[options].apply(instance, args);
            });

            // Check if we should be returning `this`
            if ($.inArray(options, thisMethods) > -1) {
              return this;
            }

            return ret;
          } else {
            throw new Error('Invalid arguments for Select2: ' + options);
          }
        };
      }

      if ($.fn.select2.defaults == null) {
        $.fn.select2.defaults = Defaults;
      }

      return Select2;
    });

    // Return the AMD loader configuration so it can be used outside of this file
    return {
      define: S2.define,
      require: S2.require
    };
  }();

  // Autoload the jQuery bindings
  // We know that all of the modules exist above this, so we're safe
  var select2 = S2.require('jquery.select2');

  // Hold the AMD module references on the jQuery function that was just loaded
  // This allows Select2 to use the internal loader outside of this file, such
  // as in the language files.
  jQuery.fn.select2.amd = S2;

  // Return the Select2 instance for anyone who is importing it.
  return select2;
});
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (e, t) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports.AOS = t() : e.AOS = t();
}(this, function () {
  return function (e) {
    function t(o) {
      if (n[o]) return n[o].exports;var i = n[o] = { exports: {}, id: o, loaded: !1 };return e[o].call(i.exports, i, i.exports, t), i.loaded = !0, i.exports;
    }var n = {};return t.m = e, t.c = n, t.p = "dist/", t(0);
  }([function (e, t, n) {
    "use strict";
    function o(e) {
      return e && e.__esModule ? e : { default: e };
    }var i = Object.assign || function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];for (var o in n) {
          Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
        }
      }return e;
    },
        r = n(1),
        a = (o(r), n(6)),
        u = o(a),
        c = n(7),
        f = o(c),
        s = n(8),
        d = o(s),
        l = n(9),
        p = o(l),
        m = n(10),
        b = o(m),
        v = n(11),
        y = o(v),
        g = n(14),
        h = o(g),
        w = [],
        k = !1,
        x = document.all && !window.atob,
        j = { offset: 120, delay: 0, easing: "ease", duration: 400, disable: !1, once: !1, startEvent: "DOMContentLoaded", throttleDelay: 99, debounceDelay: 50, disableMutationObserver: !1 },
        O = function O() {
      var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];if (e && (k = !0), k) return w = (0, y.default)(w, j), (0, b.default)(w, j.once), w;
    },
        _ = function _() {
      w = (0, h.default)(), O();
    },
        S = function S() {
      w.forEach(function (e, t) {
        e.node.removeAttribute("data-aos"), e.node.removeAttribute("data-aos-easing"), e.node.removeAttribute("data-aos-duration"), e.node.removeAttribute("data-aos-delay");
      });
    },
        z = function z(e) {
      return e === !0 || "mobile" === e && p.default.mobile() || "phone" === e && p.default.phone() || "tablet" === e && p.default.tablet() || "function" == typeof e && e() === !0;
    },
        A = function A(e) {
      return j = i(j, e), w = (0, h.default)(), z(j.disable) || x ? S() : (document.querySelector("body").setAttribute("data-aos-easing", j.easing), document.querySelector("body").setAttribute("data-aos-duration", j.duration), document.querySelector("body").setAttribute("data-aos-delay", j.delay), "DOMContentLoaded" === j.startEvent && ["complete", "interactive"].indexOf(document.readyState) > -1 ? O(!0) : "load" === j.startEvent ? window.addEventListener(j.startEvent, function () {
        O(!0);
      }) : document.addEventListener(j.startEvent, function () {
        O(!0);
      }), window.addEventListener("resize", (0, f.default)(O, j.debounceDelay, !0)), window.addEventListener("orientationchange", (0, f.default)(O, j.debounceDelay, !0)), window.addEventListener("scroll", (0, u.default)(function () {
        (0, b.default)(w, j.once);
      }, j.throttleDelay)), j.disableMutationObserver || (0, d.default)("[data-aos]", _), w);
    };e.exports = { init: A, refresh: O, refreshHard: _ };
  }, function (e, t) {},,,,, function (e, t) {
    (function (t) {
      "use strict";
      function n(e, t, n) {
        function o(t) {
          var n = b,
              o = v;return b = v = void 0, k = t, g = e.apply(o, n);
        }function r(e) {
          return k = e, h = setTimeout(s, t), _ ? o(e) : g;
        }function a(e) {
          var n = e - w,
              o = e - k,
              i = t - n;return S ? j(i, y - o) : i;
        }function c(e) {
          var n = e - w,
              o = e - k;return void 0 === w || n >= t || n < 0 || S && o >= y;
        }function s() {
          var e = O();return c(e) ? d(e) : void (h = setTimeout(s, a(e)));
        }function d(e) {
          return h = void 0, z && b ? o(e) : (b = v = void 0, g);
        }function l() {
          void 0 !== h && clearTimeout(h), k = 0, b = w = v = h = void 0;
        }function p() {
          return void 0 === h ? g : d(O());
        }function m() {
          var e = O(),
              n = c(e);if (b = arguments, v = this, w = e, n) {
            if (void 0 === h) return r(w);if (S) return h = setTimeout(s, t), o(w);
          }return void 0 === h && (h = setTimeout(s, t)), g;
        }var b,
            v,
            y,
            g,
            h,
            w,
            k = 0,
            _ = !1,
            S = !1,
            z = !0;if ("function" != typeof e) throw new TypeError(f);return t = u(t) || 0, i(n) && (_ = !!n.leading, S = "maxWait" in n, y = S ? x(u(n.maxWait) || 0, t) : y, z = "trailing" in n ? !!n.trailing : z), m.cancel = l, m.flush = p, m;
      }function o(e, t, o) {
        var r = !0,
            a = !0;if ("function" != typeof e) throw new TypeError(f);return i(o) && (r = "leading" in o ? !!o.leading : r, a = "trailing" in o ? !!o.trailing : a), n(e, t, { leading: r, maxWait: t, trailing: a });
      }function i(e) {
        var t = "undefined" == typeof e ? "undefined" : c(e);return !!e && ("object" == t || "function" == t);
      }function r(e) {
        return !!e && "object" == ("undefined" == typeof e ? "undefined" : c(e));
      }function a(e) {
        return "symbol" == ("undefined" == typeof e ? "undefined" : c(e)) || r(e) && k.call(e) == d;
      }function u(e) {
        if ("number" == typeof e) return e;if (a(e)) return s;if (i(e)) {
          var t = "function" == typeof e.valueOf ? e.valueOf() : e;e = i(t) ? t + "" : t;
        }if ("string" != typeof e) return 0 === e ? e : +e;e = e.replace(l, "");var n = m.test(e);return n || b.test(e) ? v(e.slice(2), n ? 2 : 8) : p.test(e) ? s : +e;
      }var c = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
        return typeof e === "undefined" ? "undefined" : _typeof(e);
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
      },
          f = "Expected a function",
          s = NaN,
          d = "[object Symbol]",
          l = /^\s+|\s+$/g,
          p = /^[-+]0x[0-9a-f]+$/i,
          m = /^0b[01]+$/i,
          b = /^0o[0-7]+$/i,
          v = parseInt,
          y = "object" == ("undefined" == typeof t ? "undefined" : c(t)) && t && t.Object === Object && t,
          g = "object" == ("undefined" == typeof self ? "undefined" : c(self)) && self && self.Object === Object && self,
          h = y || g || Function("return this")(),
          w = Object.prototype,
          k = w.toString,
          x = Math.max,
          j = Math.min,
          O = function O() {
        return h.Date.now();
      };e.exports = o;
    }).call(t, function () {
      return this;
    }());
  }, function (e, t) {
    (function (t) {
      "use strict";
      function n(e, t, n) {
        function i(t) {
          var n = b,
              o = v;return b = v = void 0, O = t, g = e.apply(o, n);
        }function r(e) {
          return O = e, h = setTimeout(s, t), _ ? i(e) : g;
        }function u(e) {
          var n = e - w,
              o = e - O,
              i = t - n;return S ? x(i, y - o) : i;
        }function f(e) {
          var n = e - w,
              o = e - O;return void 0 === w || n >= t || n < 0 || S && o >= y;
        }function s() {
          var e = j();return f(e) ? d(e) : void (h = setTimeout(s, u(e)));
        }function d(e) {
          return h = void 0, z && b ? i(e) : (b = v = void 0, g);
        }function l() {
          void 0 !== h && clearTimeout(h), O = 0, b = w = v = h = void 0;
        }function p() {
          return void 0 === h ? g : d(j());
        }function m() {
          var e = j(),
              n = f(e);if (b = arguments, v = this, w = e, n) {
            if (void 0 === h) return r(w);if (S) return h = setTimeout(s, t), i(w);
          }return void 0 === h && (h = setTimeout(s, t)), g;
        }var b,
            v,
            y,
            g,
            h,
            w,
            O = 0,
            _ = !1,
            S = !1,
            z = !0;if ("function" != typeof e) throw new TypeError(c);return t = a(t) || 0, o(n) && (_ = !!n.leading, S = "maxWait" in n, y = S ? k(a(n.maxWait) || 0, t) : y, z = "trailing" in n ? !!n.trailing : z), m.cancel = l, m.flush = p, m;
      }function o(e) {
        var t = "undefined" == typeof e ? "undefined" : u(e);return !!e && ("object" == t || "function" == t);
      }function i(e) {
        return !!e && "object" == ("undefined" == typeof e ? "undefined" : u(e));
      }function r(e) {
        return "symbol" == ("undefined" == typeof e ? "undefined" : u(e)) || i(e) && w.call(e) == s;
      }function a(e) {
        if ("number" == typeof e) return e;if (r(e)) return f;if (o(e)) {
          var t = "function" == typeof e.valueOf ? e.valueOf() : e;e = o(t) ? t + "" : t;
        }if ("string" != typeof e) return 0 === e ? e : +e;e = e.replace(d, "");var n = p.test(e);return n || m.test(e) ? b(e.slice(2), n ? 2 : 8) : l.test(e) ? f : +e;
      }var u = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
        return typeof e === "undefined" ? "undefined" : _typeof(e);
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
      },
          c = "Expected a function",
          f = NaN,
          s = "[object Symbol]",
          d = /^\s+|\s+$/g,
          l = /^[-+]0x[0-9a-f]+$/i,
          p = /^0b[01]+$/i,
          m = /^0o[0-7]+$/i,
          b = parseInt,
          v = "object" == ("undefined" == typeof t ? "undefined" : u(t)) && t && t.Object === Object && t,
          y = "object" == ("undefined" == typeof self ? "undefined" : u(self)) && self && self.Object === Object && self,
          g = v || y || Function("return this")(),
          h = Object.prototype,
          w = h.toString,
          k = Math.max,
          x = Math.min,
          j = function j() {
        return g.Date.now();
      };e.exports = n;
    }).call(t, function () {
      return this;
    }());
  }, function (e, t) {
    "use strict";
    function n(e, t) {
      var n = new r(o);a = t, n.observe(i.documentElement, { childList: !0, subtree: !0, removedNodes: !0 });
    }function o(e) {
      e && e.forEach(function (e) {
        var t = Array.prototype.slice.call(e.addedNodes),
            n = Array.prototype.slice.call(e.removedNodes),
            o = t.concat(n).filter(function (e) {
          return e.hasAttribute && e.hasAttribute("data-aos");
        }).length;o && a();
      });
    }Object.defineProperty(t, "__esModule", { value: !0 });var i = window.document,
        r = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
        a = function a() {};t.default = n;
  }, function (e, t) {
    "use strict";
    function n(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }function o() {
      return navigator.userAgent || navigator.vendor || window.opera || "";
    }Object.defineProperty(t, "__esModule", { value: !0 });var i = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var o = t[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);
        }
      }return function (t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t;
      };
    }(),
        r = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
        a = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
        u = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,
        c = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
        f = function () {
      function e() {
        n(this, e);
      }return i(e, [{ key: "phone", value: function value() {
          var e = o();return !(!r.test(e) && !a.test(e.substr(0, 4)));
        } }, { key: "mobile", value: function value() {
          var e = o();return !(!u.test(e) && !c.test(e.substr(0, 4)));
        } }, { key: "tablet", value: function value() {
          return this.mobile() && !this.phone();
        } }]), e;
    }();t.default = new f();
  }, function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var n = function n(e, t, _n) {
      var o = e.node.getAttribute("data-aos-once");t > e.position ? e.node.classList.add("aos-animate") : "undefined" != typeof o && ("false" === o || !_n && "true" !== o) && e.node.classList.remove("aos-animate");
    },
        o = function o(e, t) {
      var o = window.pageYOffset,
          i = window.innerHeight;e.forEach(function (e, r) {
        n(e, i + o, t);
      });
    };t.default = o;
  }, function (e, t, n) {
    "use strict";
    function o(e) {
      return e && e.__esModule ? e : { default: e };
    }Object.defineProperty(t, "__esModule", { value: !0 });var i = n(12),
        r = o(i),
        a = function a(e, t) {
      return e.forEach(function (e, n) {
        e.node.classList.add("aos-init"), e.position = (0, r.default)(e.node, t.offset);
      }), e;
    };t.default = a;
  }, function (e, t, n) {
    "use strict";
    function o(e) {
      return e && e.__esModule ? e : { default: e };
    }Object.defineProperty(t, "__esModule", { value: !0 });var i = n(13),
        r = o(i),
        a = function a(e, t) {
      var n = 0,
          o = 0,
          i = window.innerHeight,
          a = { offset: e.getAttribute("data-aos-offset"), anchor: e.getAttribute("data-aos-anchor"), anchorPlacement: e.getAttribute("data-aos-anchor-placement") };switch (a.offset && !isNaN(a.offset) && (o = parseInt(a.offset)), a.anchor && document.querySelectorAll(a.anchor) && (e = document.querySelectorAll(a.anchor)[0]), n = (0, r.default)(e).top, a.anchorPlacement) {case "top-bottom":
          break;case "center-bottom":
          n += e.offsetHeight / 2;break;case "bottom-bottom":
          n += e.offsetHeight;break;case "top-center":
          n += i / 2;break;case "bottom-center":
          n += i / 2 + e.offsetHeight;break;case "center-center":
          n += i / 2 + e.offsetHeight / 2;break;case "top-top":
          n += i;break;case "bottom-top":
          n += e.offsetHeight + i;break;case "center-top":
          n += e.offsetHeight / 2 + i;}return a.anchorPlacement || a.offset || isNaN(t) || (o = t), n + o;
    };t.default = a;
  }, function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var n = function n(e) {
      for (var t = 0, n = 0; e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop);) {
        t += e.offsetLeft - ("BODY" != e.tagName ? e.scrollLeft : 0), n += e.offsetTop - ("BODY" != e.tagName ? e.scrollTop : 0), e = e.offsetParent;
      }return { top: n, left: t };
    };t.default = n;
  }, function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var n = function n(e) {
      return e = e || document.querySelectorAll("[data-aos]"), Array.prototype.map.call(e, function (e) {
        return { node: e };
      });
    };t.default = n;
  }]);
});
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(typeof navigator === 'undefined' ? 'undefined' : _typeof(navigator)) === "object" && function (global, factory) {
    (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define('Plyr', factory) : global.Plyr = factory();
}(this, function () {
    'use strict';

    // ==========================================================================
    // Type checking utils
    // ==========================================================================

    var getConstructor = function getConstructor(input) {
        return input !== null && typeof input !== 'undefined' ? input.constructor : null;
    };
    var instanceOf = function instanceOf(input, constructor) {
        return Boolean(input && constructor && input instanceof constructor);
    };
    var isNullOrUndefined = function isNullOrUndefined(input) {
        return input === null || typeof input === 'undefined';
    };
    var isObject = function isObject(input) {
        return getConstructor(input) === Object;
    };
    var isNumber = function isNumber(input) {
        return getConstructor(input) === Number && !Number.isNaN(input);
    };
    var isString = function isString(input) {
        return getConstructor(input) === String;
    };
    var isBoolean = function isBoolean(input) {
        return getConstructor(input) === Boolean;
    };
    var isFunction = function isFunction(input) {
        return getConstructor(input) === Function;
    };
    var isArray = function isArray(input) {
        return Array.isArray(input);
    };
    var isWeakMap = function isWeakMap(input) {
        return instanceOf(input, WeakMap);
    };
    var isNodeList = function isNodeList(input) {
        return instanceOf(input, NodeList);
    };
    var isElement = function isElement(input) {
        return instanceOf(input, Element);
    };
    var isTextNode = function isTextNode(input) {
        return getConstructor(input) === Text;
    };
    var isEvent = function isEvent(input) {
        return instanceOf(input, Event);
    };
    var isCue = function isCue(input) {
        return instanceOf(input, window.TextTrackCue) || instanceOf(input, window.VTTCue);
    };
    var isTrack = function isTrack(input) {
        return instanceOf(input, TextTrack) || !isNullOrUndefined(input) && isString(input.kind);
    };

    var isEmpty = function isEmpty(input) {
        return isNullOrUndefined(input) || (isString(input) || isArray(input) || isNodeList(input)) && !input.length || isObject(input) && !Object.keys(input).length;
    };

    var isUrl = function isUrl(input) {
        // Accept a URL object
        if (instanceOf(input, window.URL)) {
            return true;
        }

        // Add the protocol if required
        var string = input;
        if (!input.startsWith('http://') || !input.startsWith('https://')) {
            string = 'http://' + input;
        }

        try {
            return !isEmpty(new URL(string).hostname);
        } catch (e) {
            return false;
        }
    };

    var is = {
        nullOrUndefined: isNullOrUndefined,
        object: isObject,
        number: isNumber,
        string: isString,
        boolean: isBoolean,
        function: isFunction,
        array: isArray,
        weakMap: isWeakMap,
        nodeList: isNodeList,
        element: isElement,
        textNode: isTextNode,
        event: isEvent,
        cue: isCue,
        track: isTrack,
        url: isUrl,
        empty: isEmpty
    };

    // ==========================================================================

    // Check for passive event listener support
    // https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
    // https://www.youtube.com/watch?v=NPM6172J22g
    var supportsPassiveListeners = function () {
        // Test via a getter in the options object to see if the passive property is accessed
        var supported = false;
        try {
            var options = Object.defineProperty({}, 'passive', {
                get: function get() {
                    supported = true;
                    return null;
                }
            });
            window.addEventListener('test', null, options);
            window.removeEventListener('test', null, options);
        } catch (e) {
            // Do nothing
        }

        return supported;
    }();

    // Toggle event listener
    function toggleListener(element, event, callback) {
        var toggle = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        var _this = this;

        var passive = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
        var capture = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

        // Bail if no element, event, or callback
        if (!element || !('addEventListener' in element) || is.empty(event) || !is.function(callback)) {
            return;
        }

        // Allow multiple events
        var events = event.split(' ');

        // Build options
        // Default to just the capture boolean for browsers with no passive listener support
        var options = capture;

        // If passive events listeners are supported
        if (supportsPassiveListeners) {
            options = {
                // Whether the listener can be passive (i.e. default never prevented)
                passive: passive,
                // Whether the listener is a capturing listener or not
                capture: capture
            };
        }

        // If a single node is passed, bind the event listener
        events.forEach(function (type) {
            if (_this && _this.eventListeners && toggle) {
                // Cache event listener
                _this.eventListeners.push({ element: element, type: type, callback: callback, options: options });
            }

            element[toggle ? 'addEventListener' : 'removeEventListener'](type, callback, options);
        });
    }

    // Bind event handler
    function on(element) {
        var events = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var callback = arguments[2];
        var passive = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
        var capture = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

        toggleListener.call(this, element, events, callback, true, passive, capture);
    }

    // Unbind event handler
    function off(element) {
        var events = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var callback = arguments[2];
        var passive = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
        var capture = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

        toggleListener.call(this, element, events, callback, false, passive, capture);
    }

    // Bind once-only event handler
    function once(element) {
        var events = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var callback = arguments[2];
        var passive = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
        var capture = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

        function onceCallback() {
            off(element, events, onceCallback, passive, capture);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            callback.apply(this, args);
        }

        toggleListener.call(this, element, events, onceCallback, true, passive, capture);
    }

    // Trigger event
    function triggerEvent(element) {
        var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var bubbles = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var detail = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

        // Bail if no element
        if (!is.element(element) || is.empty(type)) {
            return;
        }

        // Create and dispatch the event
        var event = new CustomEvent(type, {
            bubbles: bubbles,
            detail: Object.assign({}, detail, {
                plyr: this
            })
        });

        // Dispatch the event
        element.dispatchEvent(event);
    }

    // Unbind all cached event listeners
    function unbindListeners() {
        if (this && this.eventListeners) {
            this.eventListeners.forEach(function (item) {
                var element = item.element,
                    type = item.type,
                    callback = item.callback,
                    options = item.options;

                element.removeEventListener(type, callback, options);
            });

            this.eventListeners = [];
        }
    }

    // Run method when / if player is ready
    function ready() {
        var _this2 = this;

        return new Promise(function (resolve) {
            return _this2.ready ? setTimeout(resolve, 0) : on.call(_this2, _this2.elements.container, 'ready', resolve);
        }).then(function () {});
    }

    var classCallCheck = function classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    };

    var createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var defineProperty = function defineProperty(obj, key, value) {
        if (key in obj) {
            Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            });
        } else {
            obj[key] = value;
        }

        return obj;
    };

    var slicedToArray = function () {
        function sliceIterator(arr, i) {
            var _arr = [];
            var _n = true;
            var _d = false;
            var _e = undefined;

            try {
                for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                    _arr.push(_s.value);

                    if (i && _arr.length === i) break;
                }
            } catch (err) {
                _d = true;
                _e = err;
            } finally {
                try {
                    if (!_n && _i["return"]) _i["return"]();
                } finally {
                    if (_d) throw _e;
                }
            }

            return _arr;
        }

        return function (arr, i) {
            if (Array.isArray(arr)) {
                return arr;
            } else if (Symbol.iterator in Object(arr)) {
                return sliceIterator(arr, i);
            } else {
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            }
        };
    }();

    var toConsumableArray = function toConsumableArray(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                arr2[i] = arr[i];
            }return arr2;
        } else {
            return Array.from(arr);
        }
    };

    // ==========================================================================

    // Wrap an element
    function wrap(elements, wrapper) {
        // Convert `elements` to an array, if necessary.
        var targets = elements.length ? elements : [elements];

        // Loops backwards to prevent having to clone the wrapper on the
        // first element (see `child` below).
        Array.from(targets).reverse().forEach(function (element, index) {
            var child = index > 0 ? wrapper.cloneNode(true) : wrapper;

            // Cache the current parent and sibling.
            var parent = element.parentNode;
            var sibling = element.nextSibling;

            // Wrap the element (is automatically removed from its current
            // parent).
            child.appendChild(element);

            // If the element had a sibling, insert the wrapper before
            // the sibling to maintain the HTML structure; otherwise, just
            // append it to the parent.
            if (sibling) {
                parent.insertBefore(child, sibling);
            } else {
                parent.appendChild(child);
            }
        });
    }

    // Set attributes
    function setAttributes(element, attributes) {
        if (!is.element(element) || is.empty(attributes)) {
            return;
        }

        // Assume null and undefined attributes should be left out,
        // Setting them would otherwise convert them to "null" and "undefined"
        Object.entries(attributes).filter(function (_ref) {
            var _ref2 = slicedToArray(_ref, 2),
                value = _ref2[1];

            return !is.nullOrUndefined(value);
        }).forEach(function (_ref3) {
            var _ref4 = slicedToArray(_ref3, 2),
                key = _ref4[0],
                value = _ref4[1];

            return element.setAttribute(key, value);
        });
    }

    // Create a DocumentFragment
    function createElement(type, attributes, text) {
        // Create a new <element>
        var element = document.createElement(type);

        // Set all passed attributes
        if (is.object(attributes)) {
            setAttributes(element, attributes);
        }

        // Add text node
        if (is.string(text)) {
            element.innerText = text;
        }

        // Return built element
        return element;
    }

    // Inaert an element after another
    function insertAfter(element, target) {
        target.parentNode.insertBefore(element, target.nextSibling);
    }

    // Insert a DocumentFragment
    function insertElement(type, parent, attributes, text) {
        // Inject the new <element>
        parent.appendChild(createElement(type, attributes, text));
    }

    // Remove element(s)
    function removeElement(element) {
        if (is.nodeList(element) || is.array(element)) {
            Array.from(element).forEach(removeElement);
            return;
        }

        if (!is.element(element) || !is.element(element.parentNode)) {
            return;
        }

        element.parentNode.removeChild(element);
    }

    // Remove all child elements
    function emptyElement(element) {
        var length = element.childNodes.length;

        while (length > 0) {
            element.removeChild(element.lastChild);
            length -= 1;
        }
    }

    // Replace element
    function replaceElement(newChild, oldChild) {
        if (!is.element(oldChild) || !is.element(oldChild.parentNode) || !is.element(newChild)) {
            return null;
        }

        oldChild.parentNode.replaceChild(newChild, oldChild);

        return newChild;
    }

    // Get an attribute object from a string selector
    function getAttributesFromSelector(sel, existingAttributes) {
        // For example:
        // '.test' to { class: 'test' }
        // '#test' to { id: 'test' }
        // '[data-test="test"]' to { 'data-test': 'test' }

        if (!is.string(sel) || is.empty(sel)) {
            return {};
        }

        var attributes = {};
        var existing = existingAttributes;

        sel.split(',').forEach(function (s) {
            // Remove whitespace
            var selector = s.trim();
            var className = selector.replace('.', '');
            var stripped = selector.replace(/[[\]]/g, '');

            // Get the parts and value
            var parts = stripped.split('=');
            var key = parts[0];
            var value = parts.length > 1 ? parts[1].replace(/["']/g, '') : '';

            // Get the first character
            var start = selector.charAt(0);

            switch (start) {
                case '.':
                    // Add to existing classname
                    if (is.object(existing) && is.string(existing.class)) {
                        existing.class += ' ' + className;
                    }

                    attributes.class = className;
                    break;

                case '#':
                    // ID selector
                    attributes.id = selector.replace('#', '');
                    break;

                case '[':
                    // Attribute selector
                    attributes[key] = value;

                    break;

                default:
                    break;
            }
        });

        return attributes;
    }

    // Toggle hidden
    function toggleHidden(element, hidden) {
        if (!is.element(element)) {
            return;
        }

        var hide = hidden;

        if (!is.boolean(hide)) {
            hide = !element.hasAttribute('hidden');
        }

        if (hide) {
            element.setAttribute('hidden', '');
        } else {
            element.removeAttribute('hidden');
        }
    }

    // Mirror Element.classList.toggle, with IE compatibility for "force" argument
    function toggleClass(element, className, force) {
        if (is.element(element)) {
            var method = 'toggle';
            if (typeof force !== 'undefined') {
                method = force ? 'add' : 'remove';
            }

            element.classList[method](className);
            return element.classList.contains(className);
        }

        return null;
    }

    // Has class name
    function hasClass(element, className) {
        return is.element(element) && element.classList.contains(className);
    }

    // Element matches selector
    function matches(element, selector) {
        var prototype = { Element: Element };

        function match() {
            return Array.from(document.querySelectorAll(selector)).includes(this);
        }

        var matches = prototype.matches || prototype.webkitMatchesSelector || prototype.mozMatchesSelector || prototype.msMatchesSelector || match;

        return matches.call(element, selector);
    }

    // Find all elements
    function getElements(selector) {
        return this.elements.container.querySelectorAll(selector);
    }

    // Find a single element
    function getElement(selector) {
        return this.elements.container.querySelector(selector);
    }

    // Get the focused element
    function getFocusElement() {
        var focused = document.activeElement;

        if (!focused || focused === document.body) {
            focused = null;
        } else {
            focused = document.querySelector(':focus');
        }

        return focused;
    }

    // Trap focus inside container
    function trapFocus() {
        var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var toggle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if (!is.element(element)) {
            return;
        }

        var focusable = getElements.call(this, 'button:not(:disabled), input:not(:disabled), [tabindex]');
        var first = focusable[0];
        var last = focusable[focusable.length - 1];

        var trap = function trap(event) {
            // Bail if not tab key or not fullscreen
            if (event.key !== 'Tab' || event.keyCode !== 9) {
                return;
            }

            // Get the current focused element
            var focused = getFocusElement();

            if (focused === last && !event.shiftKey) {
                // Move focus to first element that can be tabbed if Shift isn't used
                first.focus();
                event.preventDefault();
            } else if (focused === first && event.shiftKey) {
                // Move focus to last element that can be tabbed if Shift is used
                last.focus();
                event.preventDefault();
            }
        };

        toggleListener.call(this, this.elements.container, 'keydown', trap, toggle, false);
    }

    // ==========================================================================

    var transitionEndEvent = function () {
        var element = document.createElement('span');

        var events = {
            WebkitTransition: 'webkitTransitionEnd',
            MozTransition: 'transitionend',
            OTransition: 'oTransitionEnd otransitionend',
            transition: 'transitionend'
        };

        var type = Object.keys(events).find(function (event) {
            return element.style[event] !== undefined;
        });

        return is.string(type) ? events[type] : false;
    }();

    // Force repaint of element
    function repaint(element) {
        setTimeout(function () {
            toggleHidden(element, true);
            element.offsetHeight; // eslint-disable-line
            toggleHidden(element, false);
        }, 0);
    }

    // ==========================================================================
    // Browser sniffing
    // Unfortunately, due to mixed support, UA sniffing is required
    // ==========================================================================

    var browser = {
        isIE: /* @cc_on!@ */!!document.documentMode,
        isWebkit: 'WebkitAppearance' in document.documentElement.style && !/Edge/.test(navigator.userAgent),
        isIPhone: /(iPhone|iPod)/gi.test(navigator.platform),
        isIos: /(iPad|iPhone|iPod)/gi.test(navigator.platform)
    };

    // ==========================================================================

    // Default codecs for checking mimetype support
    var defaultCodecs = {
        'audio/ogg': 'vorbis',
        'audio/wav': '1',
        'video/webm': 'vp8, vorbis',
        'video/mp4': 'avc1.42E01E, mp4a.40.2',
        'video/ogg': 'theora'
    };

    // Check for feature support
    var support = {
        // Basic support
        audio: 'canPlayType' in document.createElement('audio'),
        video: 'canPlayType' in document.createElement('video'),

        // Check for support
        // Basic functionality vs full UI
        check: function check(type, provider, playsinline) {
            var canPlayInline = browser.isIPhone && playsinline && support.playsinline;
            var api = support[type] || provider !== 'html5';
            var ui = api && support.rangeInput && (type !== 'video' || !browser.isIPhone || canPlayInline);

            return {
                api: api,
                ui: ui
            };
        },

        // Picture-in-picture support
        // Safari only currently
        pip: function () {
            return !browser.isIPhone && is.function(createElement('video').webkitSetPresentationMode);
        }(),

        // Airplay support
        // Safari only currently
        airplay: is.function(window.WebKitPlaybackTargetAvailabilityEvent),

        // Inline playback support
        // https://webkit.org/blog/6784/new-video-policies-for-ios/
        playsinline: 'playsInline' in document.createElement('video'),

        // Check for mime type support against a player instance
        // Credits: http://diveintohtml5.info/everything.html
        // Related: http://www.leanbackplayer.com/test/h5mt.html
        mime: function mime(inputType) {
            var _inputType$split = inputType.split('/'),
                _inputType$split2 = slicedToArray(_inputType$split, 1),
                mediaType = _inputType$split2[0];

            if (!this.isHTML5 || mediaType !== this.type) {
                return false;
            }

            var type = void 0;
            if (inputType && inputType.includes('codecs=')) {
                // Use input directly
                type = inputType;
            } else if (inputType === 'audio/mpeg') {
                // Skip codec
                type = 'audio/mpeg;';
            } else if (inputType in defaultCodecs) {
                // Use codec
                type = inputType + '; codecs="' + defaultCodecs[inputType] + '"';
            }

            try {
                return Boolean(type && this.media.canPlayType(type).replace(/no/, ''));
            } catch (err) {
                return false;
            }
        },

        // Check for textTracks support
        textTracks: 'textTracks' in document.createElement('video'),

        // <input type="range"> Sliders
        rangeInput: function () {
            var range = document.createElement('input');
            range.type = 'range';
            return range.type === 'range';
        }(),

        // Touch
        // NOTE: Remember a device can be mouse + touch enabled so we check on first touch event
        touch: 'ontouchstart' in document.documentElement,

        // Detect transitions support
        transitions: transitionEndEvent !== false,

        // Reduced motion iOS & MacOS setting
        // https://webkit.org/blog/7551/responsive-design-for-motion/
        reducedMotion: 'matchMedia' in window && window.matchMedia('(prefers-reduced-motion)').matches
    };

    // ==========================================================================

    var html5 = {
        getSources: function getSources() {
            var _this = this;

            if (!this.isHTML5) {
                return [];
            }

            var sources = Array.from(this.media.querySelectorAll('source'));

            // Filter out unsupported sources
            return sources.filter(function (source) {
                return support.mime.call(_this, source.getAttribute('type'));
            });
        },

        // Get quality levels
        getQualityOptions: function getQualityOptions() {
            // Get sizes from <source> elements
            return html5.getSources.call(this).map(function (source) {
                return Number(source.getAttribute('size'));
            }).filter(Boolean);
        },
        extend: function extend() {
            if (!this.isHTML5) {
                return;
            }

            var player = this;

            // Quality
            Object.defineProperty(player.media, 'quality', {
                get: function get() {
                    // Get sources
                    var sources = html5.getSources.call(player);
                    var source = sources.find(function (source) {
                        return source.getAttribute('src') === player.source;
                    });

                    // Return size, if match is found
                    return source && Number(source.getAttribute('size'));
                },
                set: function set(input) {
                    // Get sources
                    var sources = html5.getSources.call(player);

                    // Get first match for requested size
                    var source = sources.find(function (source) {
                        return Number(source.getAttribute('size')) === input;
                    });

                    // No matching source found
                    if (!source) {
                        return;
                    }

                    // Get current state
                    var _player$media = player.media,
                        currentTime = _player$media.currentTime,
                        paused = _player$media.paused,
                        preload = _player$media.preload,
                        readyState = _player$media.readyState;

                    // Set new source

                    player.media.src = source.getAttribute('src');

                    // Prevent loading if preload="none" and the current source isn't loaded (#1044)
                    if (preload !== 'none' || readyState) {
                        // Restore time
                        player.once('loadedmetadata', function () {
                            player.currentTime = currentTime;

                            // Resume playing
                            if (!paused) {
                                player.play();
                            }
                        });

                        // Load new source
                        player.media.load();
                    }

                    // Trigger change event
                    triggerEvent.call(player, player.media, 'qualitychange', false, {
                        quality: input
                    });
                }
            });
        },

        // Cancel current network requests
        // See https://github.com/sampotts/plyr/issues/174
        cancelRequests: function cancelRequests() {
            if (!this.isHTML5) {
                return;
            }

            // Remove child sources
            removeElement(html5.getSources.call(this));

            // Set blank video src attribute
            // This is to prevent a MEDIA_ERR_SRC_NOT_SUPPORTED error
            // Info: http://stackoverflow.com/questions/32231579/how-to-properly-dispose-of-an-html5-video-and-close-socket-or-connection
            this.media.setAttribute('src', this.config.blankVideo);

            // Load the new empty source
            // This will cancel existing requests
            // See https://github.com/sampotts/plyr/issues/174
            this.media.load();

            // Debugging
            this.debug.log('Cancelled network requests');
        }
    };

    // ==========================================================================

    // Clone nested objects
    function cloneDeep(object) {
        return JSON.parse(JSON.stringify(object));
    }

    // Get a nested value in an object
    function getDeep(object, path) {
        return path.split('.').reduce(function (obj, key) {
            return obj && obj[key];
        }, object);
    }

    // Deep extend destination object with N more objects
    function extend() {
        var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            sources[_key - 1] = arguments[_key];
        }

        if (!sources.length) {
            return target;
        }

        var source = sources.shift();

        if (!is.object(source)) {
            return target;
        }

        Object.keys(source).forEach(function (key) {
            if (is.object(source[key])) {
                if (!Object.keys(target).includes(key)) {
                    Object.assign(target, defineProperty({}, key, {}));
                }

                extend(target[key], source[key]);
            } else {
                Object.assign(target, defineProperty({}, key, source[key]));
            }
        });

        return extend.apply(undefined, [target].concat(sources));
    }

    // ==========================================================================

    // Generate a random ID
    function generateId(prefix) {
        return prefix + '-' + Math.floor(Math.random() * 10000);
    }

    // Format string
    function format(input) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        if (is.empty(input)) {
            return input;
        }

        return input.toString().replace(/{(\d+)}/g, function (match, i) {
            return args[i].toString();
        });
    }

    // Get percentage
    function getPercentage(current, max) {
        if (current === 0 || max === 0 || Number.isNaN(current) || Number.isNaN(max)) {
            return 0;
        }

        return (current / max * 100).toFixed(2);
    }

    // Replace all occurances of a string in a string
    function replaceAll() {
        var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var find = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var replace = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

        return input.replace(new RegExp(find.toString().replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1'), 'g'), replace.toString());
    }

    // Convert to title case
    function toTitleCase() {
        var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        return input.toString().replace(/\w\S*/g, function (text) {
            return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
        });
    }

    // Convert string to pascalCase
    function toPascalCase() {
        var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        var string = input.toString();

        // Convert kebab case
        string = replaceAll(string, '-', ' ');

        // Convert snake case
        string = replaceAll(string, '_', ' ');

        // Convert to title case
        string = toTitleCase(string);

        // Convert to pascal case
        return replaceAll(string, ' ', '');
    }

    // Convert string to pascalCase
    function toCamelCase() {
        var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        var string = input.toString();

        // Convert to pascal case
        string = toPascalCase(string);

        // Convert first character to lowercase
        return string.charAt(0).toLowerCase() + string.slice(1);
    }

    // Remove HTML from a string
    function stripHTML(source) {
        var fragment = document.createDocumentFragment();
        var element = document.createElement('div');
        fragment.appendChild(element);
        element.innerHTML = source;
        return fragment.firstChild.innerText;
    }

    // Like outerHTML, but also works for DocumentFragment
    function getHTML(element) {
        var wrapper = document.createElement('div');
        wrapper.appendChild(element);
        return wrapper.innerHTML;
    }

    // ==========================================================================

    var i18n = {
        get: function get$$1() {
            var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
            var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            if (is.empty(key) || is.empty(config)) {
                return '';
            }

            var string = getDeep(config.i18n, key);

            if (is.empty(string)) {
                return '';
            }

            var replace = {
                '{seektime}': config.seekTime,
                '{title}': config.title
            };

            Object.entries(replace).forEach(function (_ref) {
                var _ref2 = slicedToArray(_ref, 2),
                    key = _ref2[0],
                    value = _ref2[1];

                string = replaceAll(string, key, value);
            });

            return string;
        }
    };

    // ==========================================================================

    // Remove duplicates in an array
    function dedupe(array) {
        if (!is.array(array)) {
            return array;
        }

        return array.filter(function (item, index) {
            return array.indexOf(item) === index;
        });
    }

    // Get the closest value in an array
    function closest(array, value) {
        if (!is.array(array) || !array.length) {
            return null;
        }

        return array.reduce(function (prev, curr) {
            return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
        });
    }

    // ==========================================================================

    var Storage = function () {
        function Storage(player) {
            classCallCheck(this, Storage);

            this.enabled = player.config.storage.enabled;
            this.key = player.config.storage.key;
        }

        // Check for actual support (see if we can use it)


        createClass(Storage, [{
            key: 'get',
            value: function get$$1(key) {
                if (!Storage.supported || !this.enabled) {
                    return null;
                }

                var store = window.localStorage.getItem(this.key);

                if (is.empty(store)) {
                    return null;
                }

                var json = JSON.parse(store);

                return is.string(key) && key.length ? json[key] : json;
            }
        }, {
            key: 'set',
            value: function set$$1(object) {
                // Bail if we don't have localStorage support or it's disabled
                if (!Storage.supported || !this.enabled) {
                    return;
                }

                // Can only store objectst
                if (!is.object(object)) {
                    return;
                }

                // Get current storage
                var storage = this.get();

                // Default to empty object
                if (is.empty(storage)) {
                    storage = {};
                }

                // Update the working copy of the values
                extend(storage, object);

                // Update storage
                window.localStorage.setItem(this.key, JSON.stringify(storage));
            }
        }], [{
            key: 'supported',
            get: function get$$1() {
                try {
                    if (!('localStorage' in window)) {
                        return false;
                    }

                    var test = '___test';

                    // Try to use it (it might be disabled, e.g. user is in private mode)
                    // see: https://github.com/sampotts/plyr/issues/131
                    window.localStorage.setItem(test, test);
                    window.localStorage.removeItem(test);

                    return true;
                } catch (e) {
                    return false;
                }
            }
        }]);
        return Storage;
    }();

    // ==========================================================================
    // Fetch wrapper
    // Using XHR to avoid issues with older browsers
    // ==========================================================================

    function fetch(url) {
        var responseType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'text';

        return new Promise(function (resolve, reject) {
            try {
                var request = new XMLHttpRequest();

                // Check for CORS support
                if (!('withCredentials' in request)) {
                    return;
                }

                request.addEventListener('load', function () {
                    if (responseType === 'text') {
                        try {
                            resolve(JSON.parse(request.responseText));
                        } catch (e) {
                            resolve(request.responseText);
                        }
                    } else {
                        resolve(request.response);
                    }
                });

                request.addEventListener('error', function () {
                    throw new Error(request.status);
                });

                request.open('GET', url, true);

                // Set the required response type
                request.responseType = responseType;

                request.send();
            } catch (e) {
                reject(e);
            }
        });
    }

    // ==========================================================================

    // Load an external SVG sprite
    function loadSprite(url, id) {
        if (!is.string(url)) {
            return;
        }

        var prefix = 'cache';
        var hasId = is.string(id);
        var isCached = false;

        var exists = function exists() {
            return document.getElementById(id) !== null;
        };

        var update = function update(container, data) {
            container.innerHTML = data;

            // Check again incase of race condition
            if (hasId && exists()) {
                return;
            }

            // Inject the SVG to the body
            document.body.insertAdjacentElement('afterbegin', container);
        };

        // Only load once if ID set
        if (!hasId || !exists()) {
            var useStorage = Storage.supported;

            // Create container
            var container = document.createElement('div');
            container.setAttribute('hidden', '');

            if (hasId) {
                container.setAttribute('id', id);
            }

            // Check in cache
            if (useStorage) {
                var cached = window.localStorage.getItem(prefix + '-' + id);
                isCached = cached !== null;

                if (isCached) {
                    var data = JSON.parse(cached);
                    update(container, data.content);
                }
            }

            // Get the sprite
            fetch(url).then(function (result) {
                if (is.empty(result)) {
                    return;
                }

                if (useStorage) {
                    window.localStorage.setItem(prefix + '-' + id, JSON.stringify({
                        content: result
                    }));
                }

                update(container, result);
            }).catch(function () {});
        }
    }

    // ==========================================================================

    // Time helpers
    var getHours = function getHours(value) {
        return parseInt(value / 60 / 60 % 60, 10);
    };
    var getMinutes = function getMinutes(value) {
        return parseInt(value / 60 % 60, 10);
    };
    var getSeconds = function getSeconds(value) {
        return parseInt(value % 60, 10);
    };

    // Format time to UI friendly string
    function formatTime() {
        var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var displayHours = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var inverted = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        // Bail if the value isn't a number
        if (!is.number(time)) {
            return formatTime(null, displayHours, inverted);
        }

        // Format time component to add leading zero
        var format = function format(value) {
            return ('0' + value).slice(-2);
        };

        // Breakdown to hours, mins, secs
        var hours = getHours(time);
        var mins = getMinutes(time);
        var secs = getSeconds(time);

        // Do we need to display hours?
        if (displayHours || hours > 0) {
            hours = hours + ':';
        } else {
            hours = '';
        }

        // Render
        return '' + (inverted && time > 0 ? '-' : '') + hours + format(mins) + ':' + format(secs);
    }

    // ==========================================================================

    // TODO: Don't export a massive object - break down and create class
    var controls = {
        // Get icon URL
        getIconUrl: function getIconUrl() {
            var url = new URL(this.config.iconUrl, window.location);
            var cors = url.host !== window.location.host || browser.isIE && !window.svg4everybody;

            return {
                url: this.config.iconUrl,
                cors: cors
            };
        },

        // Find the UI controls
        findElements: function findElements() {
            try {
                this.elements.controls = getElement.call(this, this.config.selectors.controls.wrapper);

                // Buttons
                this.elements.buttons = {
                    play: getElements.call(this, this.config.selectors.buttons.play),
                    pause: getElement.call(this, this.config.selectors.buttons.pause),
                    restart: getElement.call(this, this.config.selectors.buttons.restart),
                    rewind: getElement.call(this, this.config.selectors.buttons.rewind),
                    fastForward: getElement.call(this, this.config.selectors.buttons.fastForward),
                    mute: getElement.call(this, this.config.selectors.buttons.mute),
                    pip: getElement.call(this, this.config.selectors.buttons.pip),
                    airplay: getElement.call(this, this.config.selectors.buttons.airplay),
                    settings: getElement.call(this, this.config.selectors.buttons.settings),
                    captions: getElement.call(this, this.config.selectors.buttons.captions),
                    fullscreen: getElement.call(this, this.config.selectors.buttons.fullscreen)
                };

                // Progress
                this.elements.progress = getElement.call(this, this.config.selectors.progress);

                // Inputs
                this.elements.inputs = {
                    seek: getElement.call(this, this.config.selectors.inputs.seek),
                    volume: getElement.call(this, this.config.selectors.inputs.volume)
                };

                // Display
                this.elements.display = {
                    buffer: getElement.call(this, this.config.selectors.display.buffer),
                    currentTime: getElement.call(this, this.config.selectors.display.currentTime),
                    duration: getElement.call(this, this.config.selectors.display.duration)
                };

                // Seek tooltip
                if (is.element(this.elements.progress)) {
                    this.elements.display.seekTooltip = this.elements.progress.querySelector('.' + this.config.classNames.tooltip);
                }

                return true;
            } catch (error) {
                // Log it
                this.debug.warn('It looks like there is a problem with your custom controls HTML', error);

                // Restore native video controls
                this.toggleNativeControls(true);

                return false;
            }
        },

        // Create <svg> icon
        createIcon: function createIcon(type, attributes) {
            var namespace = 'http://www.w3.org/2000/svg';
            var iconUrl = controls.getIconUrl.call(this);
            var iconPath = (!iconUrl.cors ? iconUrl.url : '') + '#' + this.config.iconPrefix;

            // Create <svg>
            var icon = document.createElementNS(namespace, 'svg');
            setAttributes(icon, extend(attributes, {
                role: 'presentation',
                focusable: 'false'
            }));

            // Create the <use> to reference sprite
            var use = document.createElementNS(namespace, 'use');
            var path = iconPath + '-' + type;

            // Set `href` attributes
            // https://github.com/sampotts/plyr/issues/460
            // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/xlink:href
            if ('href' in use) {
                use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', path);
            } else {
                use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', path);
            }

            // Add <use> to <svg>
            icon.appendChild(use);

            return icon;
        },

        // Create hidden text label
        createLabel: function createLabel(type) {
            var attr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            // Skip i18n for abbreviations and brand names
            var universals = {
                pip: 'PIP',
                airplay: 'AirPlay'
            };
            var text = universals[type] || i18n.get(type, this.config);

            var attributes = Object.assign({}, attr, {
                class: [attr.class, this.config.classNames.hidden].filter(Boolean).join(' ')
            });
            return createElement('span', attributes, text);
        },

        // Create a badge
        createBadge: function createBadge(text) {
            if (is.empty(text)) {
                return null;
            }

            var badge = createElement('span', {
                class: this.config.classNames.menu.value
            });

            badge.appendChild(createElement('span', {
                class: this.config.classNames.menu.badge
            }, text));

            return badge;
        },

        // Create a <button>
        createButton: function createButton(buttonType, attr) {
            var button = createElement('button');
            var attributes = Object.assign({}, attr);
            var type = toCamelCase(buttonType);

            var toggle = false;
            var label = void 0;
            var icon = void 0;
            var labelPressed = void 0;
            var iconPressed = void 0;

            if (!('type' in attributes)) {
                attributes.type = 'button';
            }

            if ('class' in attributes) {
                if (!attributes.class.includes(this.config.classNames.control)) {
                    attributes.class += ' ' + this.config.classNames.control;
                }
            } else {
                attributes.class = this.config.classNames.control;
            }

            // Large play button
            switch (buttonType) {
                case 'play':
                    toggle = true;
                    label = 'play';
                    labelPressed = 'pause';
                    icon = 'play';
                    iconPressed = 'pause';
                    break;

                case 'mute':
                    toggle = true;
                    label = 'mute';
                    labelPressed = 'unmute';
                    icon = 'volume';
                    iconPressed = 'muted';
                    break;

                case 'captions':
                    toggle = true;
                    label = 'enableCaptions';
                    labelPressed = 'disableCaptions';
                    icon = 'captions-off';
                    iconPressed = 'captions-on';
                    break;

                case 'fullscreen':
                    toggle = true;
                    label = 'enterFullscreen';
                    labelPressed = 'exitFullscreen';
                    icon = 'enter-fullscreen';
                    iconPressed = 'exit-fullscreen';
                    break;

                case 'play-large':
                    attributes.class += ' ' + this.config.classNames.control + '--overlaid';
                    type = 'play';
                    label = 'play';
                    icon = 'play';
                    break;

                default:
                    label = type;
                    icon = buttonType;
            }

            // Setup toggle icon and labels
            if (toggle) {
                // Icon
                button.appendChild(controls.createIcon.call(this, iconPressed, { class: 'icon--pressed' }));
                button.appendChild(controls.createIcon.call(this, icon, { class: 'icon--not-pressed' }));

                // Label/Tooltip
                button.appendChild(controls.createLabel.call(this, labelPressed, { class: 'label--pressed' }));
                button.appendChild(controls.createLabel.call(this, label, { class: 'label--not-pressed' }));
            } else {
                button.appendChild(controls.createIcon.call(this, icon));
                button.appendChild(controls.createLabel.call(this, label));
            }

            // Merge attributes
            extend(attributes, getAttributesFromSelector(this.config.selectors.buttons[type], attributes));

            setAttributes(button, attributes);

            // We have multiple play buttons
            if (type === 'play') {
                if (!is.array(this.elements.buttons[type])) {
                    this.elements.buttons[type] = [];
                }

                this.elements.buttons[type].push(button);
            } else {
                this.elements.buttons[type] = button;
            }

            // Toggle classname when pressed property is set
            var className = this.config.classNames.controlPressed;
            Object.defineProperty(button, 'pressed', {
                enumerable: true,
                get: function get$$1() {
                    return hasClass(button, className);
                },
                set: function set$$1() {
                    var pressed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

                    toggleClass(button, className, pressed);
                }
            });

            return button;
        },

        // Create an <input type='range'>
        createRange: function createRange(type, attributes) {
            // Seek input
            var input = createElement('input', extend(getAttributesFromSelector(this.config.selectors.inputs[type]), {
                type: 'range',
                min: 0,
                max: 100,
                step: 0.01,
                value: 0,
                autocomplete: 'off',
                // A11y fixes for https://github.com/sampotts/plyr/issues/905
                role: 'slider',
                'aria-label': i18n.get(type, this.config),
                'aria-valuemin': 0,
                'aria-valuemax': 100,
                'aria-valuenow': 0
            }, attributes));

            this.elements.inputs[type] = input;

            // Set the fill for webkit now
            controls.updateRangeFill.call(this, input);

            return input;
        },

        // Create a <progress>
        createProgress: function createProgress(type, attributes) {
            var progress = createElement('progress', extend(getAttributesFromSelector(this.config.selectors.display[type]), {
                min: 0,
                max: 100,
                value: 0,
                role: 'presentation',
                'aria-hidden': true
            }, attributes));

            // Create the label inside
            if (type !== 'volume') {
                progress.appendChild(createElement('span', null, '0'));

                var suffixKey = {
                    played: 'played',
                    buffer: 'buffered'
                }[type];
                var suffix = suffixKey ? i18n.get(suffixKey, this.config) : '';

                progress.innerText = '% ' + suffix.toLowerCase();
            }

            this.elements.display[type] = progress;

            return progress;
        },

        // Create time display
        createTime: function createTime(type) {
            var attributes = getAttributesFromSelector(this.config.selectors.display[type]);

            var container = createElement('div', extend(attributes, {
                class: 'plyr__time ' + attributes.class,
                'aria-label': i18n.get(type, this.config)
            }), '00:00');

            // Reference for updates
            this.elements.display[type] = container;

            return container;
        },

        // Create a settings menu item
        createMenuItem: function createMenuItem(_ref) {
            var value = _ref.value,
                list = _ref.list,
                type = _ref.type,
                title = _ref.title,
                _ref$badge = _ref.badge,
                badge = _ref$badge === undefined ? null : _ref$badge,
                _ref$checked = _ref.checked,
                checked = _ref$checked === undefined ? false : _ref$checked;

            var item = createElement('li');

            var label = createElement('label', {
                class: this.config.classNames.control
            });

            var radio = createElement('input', extend(getAttributesFromSelector(this.config.selectors.inputs[type]), {
                type: 'radio',
                name: 'plyr-' + type,
                value: value,
                checked: checked,
                class: 'plyr__sr-only'
            }));

            var faux = createElement('span', { hidden: '' });

            label.appendChild(radio);
            label.appendChild(faux);
            label.insertAdjacentHTML('beforeend', title);

            if (is.element(badge)) {
                label.appendChild(badge);
            }

            item.appendChild(label);
            list.appendChild(item);
        },

        // Format a time for display
        formatTime: function formatTime$$1() {
            var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var inverted = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            // Bail if the value isn't a number
            if (!is.number(time)) {
                return time;
            }

            // Always display hours if duration is over an hour
            var forceHours = getHours(this.duration) > 0;

            return formatTime(time, forceHours, inverted);
        },

        // Update the displayed time
        updateTimeDisplay: function updateTimeDisplay() {
            var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
            var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var inverted = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            // Bail if there's no element to display or the value isn't a number
            if (!is.element(target) || !is.number(time)) {
                return;
            }

            // eslint-disable-next-line no-param-reassign
            target.innerText = controls.formatTime(time, inverted);
        },

        // Update volume UI and storage
        updateVolume: function updateVolume() {
            if (!this.supported.ui) {
                return;
            }

            // Update range
            if (is.element(this.elements.inputs.volume)) {
                controls.setRange.call(this, this.elements.inputs.volume, this.muted ? 0 : this.volume);
            }

            // Update mute state
            if (is.element(this.elements.buttons.mute)) {
                this.elements.buttons.mute.pressed = this.muted || this.volume === 0;
            }
        },

        // Update seek value and lower fill
        setRange: function setRange(target) {
            var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            if (!is.element(target)) {
                return;
            }

            // eslint-disable-next-line
            target.value = value;

            // Webkit range fill
            controls.updateRangeFill.call(this, target);
        },

        // Update <progress> elements
        updateProgress: function updateProgress(event) {
            var _this = this;

            if (!this.supported.ui || !is.event(event)) {
                return;
            }

            var value = 0;

            var setProgress = function setProgress(target, input) {
                var value = is.number(input) ? input : 0;
                var progress = is.element(target) ? target : _this.elements.display.buffer;

                // Update value and label
                if (is.element(progress)) {
                    progress.value = value;

                    // Update text label inside
                    var label = progress.getElementsByTagName('span')[0];
                    if (is.element(label)) {
                        label.childNodes[0].nodeValue = value;
                    }
                }
            };

            if (event) {
                switch (event.type) {
                    // Video playing
                    case 'timeupdate':
                    case 'seeking':
                    case 'seeked':
                        value = getPercentage(this.currentTime, this.duration);

                        // Set seek range value only if it's a 'natural' time event
                        if (event.type === 'timeupdate') {
                            controls.setRange.call(this, this.elements.inputs.seek, value);
                        }

                        break;

                    // Check buffer status
                    case 'playing':
                    case 'progress':
                        setProgress(this.elements.display.buffer, this.buffered * 100);

                        break;

                    default:
                        break;
                }
            }
        },

        // Webkit polyfill for lower fill range
        updateRangeFill: function updateRangeFill(target) {
            // Get range from event if event passed
            var range = is.event(target) ? target.target : target;

            // Needs to be a valid <input type='range'>
            if (!is.element(range) || range.getAttribute('type') !== 'range') {
                return;
            }

            // Set aria values for https://github.com/sampotts/plyr/issues/905
            if (matches(range, this.config.selectors.inputs.seek)) {
                range.setAttribute('aria-valuenow', this.currentTime);
                var currentTime = controls.formatTime(this.currentTime);
                var duration = controls.formatTime(this.duration);
                var format$$1 = i18n.get('seekLabel', this.config);
                range.setAttribute('aria-valuetext', format$$1.replace('{currentTime}', currentTime).replace('{duration}', duration));
            } else if (matches(range, this.config.selectors.inputs.volume)) {
                var percent = range.value * 100;
                range.setAttribute('aria-valuenow', percent);
                range.setAttribute('aria-valuetext', percent + '%');
            } else {
                range.setAttribute('aria-valuenow', range.value);
            }

            // WebKit only
            if (!browser.isWebkit) {
                return;
            }

            // Set CSS custom property
            range.style.setProperty('--value', range.value / range.max * 100 + '%');
        },

        // Update hover tooltip for seeking
        updateSeekTooltip: function updateSeekTooltip(event) {
            var _this2 = this;

            // Bail if setting not true
            if (!this.config.tooltips.seek || !is.element(this.elements.inputs.seek) || !is.element(this.elements.display.seekTooltip) || this.duration === 0) {
                return;
            }

            // Calculate percentage
            var percent = 0;
            var clientRect = this.elements.progress.getBoundingClientRect();
            var visible = this.config.classNames.tooltip + '--visible';

            var toggle = function toggle(_toggle) {
                toggleClass(_this2.elements.display.seekTooltip, visible, _toggle);
            };

            // Hide on touch
            if (this.touch) {
                toggle(false);
                return;
            }

            // Determine percentage, if already visible
            if (is.event(event)) {
                percent = 100 / clientRect.width * (event.pageX - clientRect.left);
            } else if (hasClass(this.elements.display.seekTooltip, visible)) {
                percent = parseFloat(this.elements.display.seekTooltip.style.left, 10);
            } else {
                return;
            }

            // Set bounds
            if (percent < 0) {
                percent = 0;
            } else if (percent > 100) {
                percent = 100;
            }

            // Display the time a click would seek to
            controls.updateTimeDisplay.call(this, this.elements.display.seekTooltip, this.duration / 100 * percent);

            // Set position
            this.elements.display.seekTooltip.style.left = percent + '%';

            // Show/hide the tooltip
            // If the event is a moues in/out and percentage is inside bounds
            if (is.event(event) && ['mouseenter', 'mouseleave'].includes(event.type)) {
                toggle(event.type === 'mouseenter');
            }
        },

        // Handle time change event
        timeUpdate: function timeUpdate(event) {
            // Only invert if only one time element is displayed and used for both duration and currentTime
            var invert = !is.element(this.elements.display.duration) && this.config.invertTime;

            // Duration
            controls.updateTimeDisplay.call(this, this.elements.display.currentTime, invert ? this.duration - this.currentTime : this.currentTime, invert);

            // Ignore updates while seeking
            if (event && event.type === 'timeupdate' && this.media.seeking) {
                return;
            }

            // Playing progress
            controls.updateProgress.call(this, event);
        },

        // Show the duration on metadataloaded or durationchange events
        durationUpdate: function durationUpdate() {
            // Bail if no UI or durationchange event triggered after playing/seek when invertTime is false
            if (!this.supported.ui || !this.config.invertTime && this.currentTime) {
                return;
            }

            // If duration is the 2**32 (shaka), Infinity (HLS), DASH-IF (Number.MAX_SAFE_INTEGER || Number.MAX_VALUE) indicating live we hide the currentTime and progressbar.
            // https://github.com/video-dev/hls.js/blob/5820d29d3c4c8a46e8b75f1e3afa3e68c1a9a2db/src/controller/buffer-controller.js#L415
            // https://github.com/google/shaka-player/blob/4d889054631f4e1cf0fbd80ddd2b71887c02e232/lib/media/streaming_engine.js#L1062
            // https://github.com/Dash-Industry-Forum/dash.js/blob/69859f51b969645b234666800d4cb596d89c602d/src/dash/models/DashManifestModel.js#L338
            if (this.duration >= Math.pow(2, 32)) {
                toggleHidden(this.elements.display.currentTime, true);
                toggleHidden(this.elements.progress, true);
                return;
            }

            // Update ARIA values
            if (is.element(this.elements.inputs.seek)) {
                this.elements.inputs.seek.setAttribute('aria-valuemax', this.duration);
            }

            // If there's a spot to display duration
            var hasDuration = is.element(this.elements.display.duration);

            // If there's only one time display, display duration there
            if (!hasDuration && this.config.displayDuration && this.paused) {
                controls.updateTimeDisplay.call(this, this.elements.display.currentTime, this.duration);
            }

            // If there's a duration element, update content
            if (hasDuration) {
                controls.updateTimeDisplay.call(this, this.elements.display.duration, this.duration);
            }

            // Update the tooltip (if visible)
            controls.updateSeekTooltip.call(this);
        },

        // Hide/show a tab
        toggleTab: function toggleTab(setting, toggle) {
            toggleHidden(this.elements.settings.tabs[setting], !toggle);
        },

        // Set the quality menu
        setQualityMenu: function setQualityMenu(options) {
            var _this3 = this;

            // Menu required
            if (!is.element(this.elements.settings.panes.quality)) {
                return;
            }

            var type = 'quality';
            var list = this.elements.settings.panes.quality.querySelector('ul');

            // Set options if passed and filter based on uniqueness and config
            if (is.array(options)) {
                this.options.quality = dedupe(options).filter(function (quality) {
                    return _this3.config.quality.options.includes(quality);
                });
            }

            // Toggle the pane and tab
            var toggle = !is.empty(this.options.quality) && this.options.quality.length > 1;
            controls.toggleTab.call(this, type, toggle);

            // Check if we need to toggle the parent
            controls.checkMenu.call(this);

            // If we're hiding, nothing more to do
            if (!toggle) {
                return;
            }

            // Empty the menu
            emptyElement(list);

            // Get the badge HTML for HD, 4K etc
            var getBadge = function getBadge(quality) {
                var label = i18n.get('qualityBadge.' + quality, _this3.config);

                if (!label.length) {
                    return null;
                }

                return controls.createBadge.call(_this3, label);
            };

            // Sort options by the config and then render options
            this.options.quality.sort(function (a, b) {
                var sorting = _this3.config.quality.options;
                return sorting.indexOf(a) > sorting.indexOf(b) ? 1 : -1;
            }).forEach(function (quality) {
                controls.createMenuItem.call(_this3, {
                    value: quality,
                    list: list,
                    type: type,
                    title: controls.getLabel.call(_this3, 'quality', quality),
                    badge: getBadge(quality)
                });
            });

            controls.updateSetting.call(this, type, list);
        },

        // Translate a value into a nice label
        getLabel: function getLabel(setting, value) {
            switch (setting) {
                case 'speed':
                    return value === 1 ? i18n.get('normal', this.config) : value + '&times;';

                case 'quality':
                    if (is.number(value)) {
                        var label = i18n.get('qualityLabel.' + value, this.config);

                        if (!label.length) {
                            return value + 'p';
                        }

                        return label;
                    }

                    return toTitleCase(value);

                case 'captions':
                    return captions.getLabel.call(this);

                default:
                    return null;
            }
        },

        // Update the selected setting
        updateSetting: function updateSetting(setting, container, input) {
            var pane = this.elements.settings.panes[setting];
            var value = null;
            var list = container;

            if (setting === 'captions') {
                value = this.currentTrack;
            } else {
                value = !is.empty(input) ? input : this[setting];

                // Get default
                if (is.empty(value)) {
                    value = this.config[setting].default;
                }

                // Unsupported value
                if (!is.empty(this.options[setting]) && !this.options[setting].includes(value)) {
                    this.debug.warn('Unsupported value of \'' + value + '\' for ' + setting);
                    return;
                }

                // Disabled value
                if (!this.config[setting].options.includes(value)) {
                    this.debug.warn('Disabled value of \'' + value + '\' for ' + setting);
                    return;
                }
            }

            // Get the list if we need to
            if (!is.element(list)) {
                list = pane && pane.querySelector('ul');
            }

            // If there's no list it means it's not been rendered...
            if (!is.element(list)) {
                return;
            }

            // Update the label
            var label = this.elements.settings.tabs[setting].querySelector('.' + this.config.classNames.menu.value);
            label.innerHTML = controls.getLabel.call(this, setting, value);

            // Find the radio option and check it
            var target = list && list.querySelector('input[value="' + value + '"]');

            if (is.element(target)) {
                target.checked = true;
            }
        },

        // Set the looping options
        /* setLoopMenu() {
            // Menu required
            if (!is.element(this.elements.settings.panes.loop)) {
                return;
            }
             const options = ['start', 'end', 'all', 'reset'];
            const list = this.elements.settings.panes.loop.querySelector('ul');
             // Show the pane and tab
            toggleHidden(this.elements.settings.tabs.loop, false);
            toggleHidden(this.elements.settings.panes.loop, false);
             // Toggle the pane and tab
            const toggle = !is.empty(this.loop.options);
            controls.toggleTab.call(this, 'loop', toggle);
             // Empty the menu
            emptyElement(list);
             options.forEach(option => {
                const item = createElement('li');
                 const button = createElement(
                    'button',
                    extend(getAttributesFromSelector(this.config.selectors.buttons.loop), {
                        type: 'button',
                        class: this.config.classNames.control,
                        'data-plyr-loop-action': option,
                    }),
                    i18n.get(option, this.config)
                );
                 if (['start', 'end'].includes(option)) {
                    const badge = controls.createBadge.call(this, '00:00');
                    button.appendChild(badge);
                }
                 item.appendChild(button);
                list.appendChild(item);
            });
        }, */

        // Get current selected caption language
        // TODO: rework this to user the getter in the API?

        // Set a list of available captions languages
        setCaptionsMenu: function setCaptionsMenu() {
            var _this4 = this;

            // TODO: Captions or language? Currently it's mixed
            var type = 'captions';
            var list = this.elements.settings.panes.captions.querySelector('ul');
            var tracks = captions.getTracks.call(this);

            // Toggle the pane and tab
            controls.toggleTab.call(this, type, tracks.length);

            // Empty the menu
            emptyElement(list);

            // Check if we need to toggle the parent
            controls.checkMenu.call(this);

            // If there's no captions, bail
            if (!tracks.length) {
                return;
            }

            // Generate options data
            var options = tracks.map(function (track, value) {
                return {
                    value: value,
                    checked: _this4.captions.toggled && _this4.currentTrack === value,
                    title: captions.getLabel.call(_this4, track),
                    badge: track.language && controls.createBadge.call(_this4, track.language.toUpperCase()),
                    list: list,
                    type: 'language'
                };
            });

            // Add the "Disabled" option to turn off captions
            options.unshift({
                value: -1,
                checked: !this.captions.toggled,
                title: i18n.get('disabled', this.config),
                list: list,
                type: 'language'
            });

            // Generate options
            options.forEach(controls.createMenuItem.bind(this));

            controls.updateSetting.call(this, type, list);
        },

        // Set a list of available captions languages
        setSpeedMenu: function setSpeedMenu(options) {
            var _this5 = this;

            // Do nothing if not selected
            if (!this.config.controls.includes('settings') || !this.config.settings.includes('speed')) {
                return;
            }

            // Menu required
            if (!is.element(this.elements.settings.panes.speed)) {
                return;
            }

            var type = 'speed';

            // Set the speed options
            if (is.array(options)) {
                this.options.speed = options;
            } else if (this.isHTML5 || this.isVimeo) {
                this.options.speed = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
            }

            // Set options if passed and filter based on config
            this.options.speed = this.options.speed.filter(function (speed) {
                return _this5.config.speed.options.includes(speed);
            });

            // Toggle the pane and tab
            var toggle = !is.empty(this.options.speed) && this.options.speed.length > 1;
            controls.toggleTab.call(this, type, toggle);

            // Check if we need to toggle the parent
            controls.checkMenu.call(this);

            // If we're hiding, nothing more to do
            if (!toggle) {
                return;
            }

            // Get the list to populate
            var list = this.elements.settings.panes.speed.querySelector('ul');

            // Empty the menu
            emptyElement(list);

            // Create items
            this.options.speed.forEach(function (speed) {
                controls.createMenuItem.call(_this5, {
                    value: speed,
                    list: list,
                    type: type,
                    title: controls.getLabel.call(_this5, 'speed', speed)
                });
            });

            controls.updateSetting.call(this, type, list);
        },

        // Check if we need to hide/show the settings menu
        checkMenu: function checkMenu() {
            var tabs = this.elements.settings.tabs;

            var visible = !is.empty(tabs) && Object.values(tabs).some(function (tab) {
                return !tab.hidden;
            });

            toggleHidden(this.elements.settings.menu, !visible);
        },

        // Show/hide menu
        toggleMenu: function toggleMenu(event) {
            var form = this.elements.settings.form;

            var button = this.elements.buttons.settings;

            // Menu and button are required
            if (!is.element(form) || !is.element(button)) {
                return;
            }

            var show = is.boolean(event) ? event : is.element(form) && form.hasAttribute('hidden');

            if (is.event(event)) {
                var isMenuItem = is.element(form) && form.contains(event.target);
                var isButton = event.target === this.elements.buttons.settings;

                // If the click was inside the form or if the click
                // wasn't the button or menu item and we're trying to
                // show the menu (a doc click shouldn't show the menu)
                if (isMenuItem || !isMenuItem && !isButton && show) {
                    return;
                }

                // Prevent the toggle being caught by the doc listener
                if (isButton) {
                    event.stopPropagation();
                }
            }

            // Set form and button attributes
            if (is.element(button)) {
                button.setAttribute('aria-expanded', show);
            }

            if (is.element(form)) {
                toggleHidden(form, !show);
                toggleClass(this.elements.container, this.config.classNames.menu.open, show);

                if (show) {
                    form.removeAttribute('tabindex');
                } else {
                    form.setAttribute('tabindex', -1);
                }
            }
        },

        // Get the natural size of a tab
        getTabSize: function getTabSize(tab) {
            var clone = tab.cloneNode(true);
            clone.style.position = 'absolute';
            clone.style.opacity = 0;
            clone.removeAttribute('hidden');

            // Prevent input's being unchecked due to the name being identical
            Array.from(clone.querySelectorAll('input[name]')).forEach(function (input) {
                var name = input.getAttribute('name');
                input.setAttribute('name', name + '-clone');
            });

            // Append to parent so we get the "real" size
            tab.parentNode.appendChild(clone);

            // Get the sizes before we remove
            var width = clone.scrollWidth;
            var height = clone.scrollHeight;

            // Remove from the DOM
            removeElement(clone);

            return {
                width: width,
                height: height
            };
        },

        // Toggle Menu
        showTab: function showTab() {
            var _this6 = this;

            var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
            var menu = this.elements.settings.menu;

            var pane = document.getElementById(target);

            // Nothing to show, bail
            if (!is.element(pane)) {
                return;
            }

            // Are we targeting a tab? If not, bail
            var isTab = pane.getAttribute('role') === 'tabpanel';
            if (!isTab) {
                return;
            }

            // Hide all other tabs
            // Get other tabs
            var current = menu.querySelector('[role="tabpanel"]:not([hidden])');
            var container = current.parentNode;

            // Set other toggles to be expanded false
            Array.from(menu.querySelectorAll('[aria-controls="' + current.getAttribute('id') + '"]')).forEach(function (toggle) {
                toggle.setAttribute('aria-expanded', false);
            });

            // If we can do fancy animations, we'll animate the height/width
            if (support.transitions && !support.reducedMotion) {
                // Set the current width as a base
                container.style.width = current.scrollWidth + 'px';
                container.style.height = current.scrollHeight + 'px';

                // Get potential sizes
                var size = controls.getTabSize.call(this, pane);

                // Restore auto height/width
                var restore = function restore(e) {
                    // We're only bothered about height and width on the container
                    if (e.target !== container || !['width', 'height'].includes(e.propertyName)) {
                        return;
                    }

                    // Revert back to auto
                    container.style.width = '';
                    container.style.height = '';

                    // Only listen once
                    off.call(_this6, container, transitionEndEvent, restore);
                };

                // Listen for the transition finishing and restore auto height/width
                on.call(this, container, transitionEndEvent, restore);

                // Set dimensions to target
                container.style.width = size.width + 'px';
                container.style.height = size.height + 'px';
            }

            // Set attributes on current tab
            toggleHidden(current, true);
            current.setAttribute('tabindex', -1);

            // Set attributes on target
            toggleHidden(pane, false);

            var tabs = getElements.call(this, '[aria-controls="' + target + '"]');
            Array.from(tabs).forEach(function (tab) {
                tab.setAttribute('aria-expanded', true);
            });
            pane.removeAttribute('tabindex');

            // Focus the first item
            pane.querySelectorAll('button:not(:disabled), input:not(:disabled), [tabindex]')[0].focus();
        },

        // Build the default HTML
        // TODO: Set order based on order in the config.controls array?
        create: function create(data) {
            var _this7 = this;

            // Do nothing if we want no controls
            if (is.empty(this.config.controls)) {
                return null;
            }

            // Create the container
            var container = createElement('div', getAttributesFromSelector(this.config.selectors.controls.wrapper));

            // Restart button
            if (this.config.controls.includes('restart')) {
                container.appendChild(controls.createButton.call(this, 'restart'));
            }

            // Rewind button
            if (this.config.controls.includes('rewind')) {
                container.appendChild(controls.createButton.call(this, 'rewind'));
            }

            // Play/Pause button
            if (this.config.controls.includes('play')) {
                container.appendChild(controls.createButton.call(this, 'play'));
            }

            // Fast forward button
            if (this.config.controls.includes('fast-forward')) {
                container.appendChild(controls.createButton.call(this, 'fast-forward'));
            }

            // Progress
            if (this.config.controls.includes('progress')) {
                var progress = createElement('div', getAttributesFromSelector(this.config.selectors.progress));

                // Seek range slider
                progress.appendChild(controls.createRange.call(this, 'seek', {
                    id: 'plyr-seek-' + data.id
                }));

                // Buffer progress
                progress.appendChild(controls.createProgress.call(this, 'buffer'));

                // TODO: Add loop display indicator

                // Seek tooltip
                if (this.config.tooltips.seek) {
                    var tooltip = createElement('span', {
                        class: this.config.classNames.tooltip
                    }, '00:00');

                    progress.appendChild(tooltip);
                    this.elements.display.seekTooltip = tooltip;
                }

                this.elements.progress = progress;
                container.appendChild(this.elements.progress);
            }

            // Media current time display
            if (this.config.controls.includes('current-time')) {
                container.appendChild(controls.createTime.call(this, 'currentTime'));
            }

            // Media duration display
            if (this.config.controls.includes('duration')) {
                container.appendChild(controls.createTime.call(this, 'duration'));
            }

            // Toggle mute button
            if (this.config.controls.includes('mute')) {
                container.appendChild(controls.createButton.call(this, 'mute'));
            }

            // Volume range control
            if (this.config.controls.includes('volume')) {
                var volume = createElement('div', {
                    class: 'plyr__volume'
                });

                // Set the attributes
                var attributes = {
                    max: 1,
                    step: 0.05,
                    value: this.config.volume
                };

                // Create the volume range slider
                volume.appendChild(controls.createRange.call(this, 'volume', extend(attributes, {
                    id: 'plyr-volume-' + data.id
                })));

                this.elements.volume = volume;

                container.appendChild(volume);
            }

            // Toggle captions button
            if (this.config.controls.includes('captions')) {
                container.appendChild(controls.createButton.call(this, 'captions'));
            }

            // Settings button / menu
            if (this.config.controls.includes('settings') && !is.empty(this.config.settings)) {
                var menu = createElement('div', {
                    class: 'plyr__menu',
                    hidden: ''
                });

                menu.appendChild(controls.createButton.call(this, 'settings', {
                    id: 'plyr-settings-toggle-' + data.id,
                    'aria-haspopup': true,
                    'aria-controls': 'plyr-settings-' + data.id,
                    'aria-expanded': false
                }));

                var form = createElement('form', {
                    class: 'plyr__menu__container',
                    id: 'plyr-settings-' + data.id,
                    hidden: '',
                    'aria-labelled-by': 'plyr-settings-toggle-' + data.id,
                    role: 'tablist',
                    tabindex: -1
                });

                var inner = createElement('div');

                var home = createElement('div', {
                    id: 'plyr-settings-' + data.id + '-home',
                    'aria-labelled-by': 'plyr-settings-toggle-' + data.id,
                    role: 'tabpanel'
                });

                // Create the tab list
                var tabs = createElement('ul', {
                    role: 'tablist'
                });

                // Build the tabs
                this.config.settings.forEach(function (type) {
                    var tab = createElement('li', {
                        role: 'tab',
                        hidden: ''
                    });

                    var button = createElement('button', extend(getAttributesFromSelector(_this7.config.selectors.buttons.settings), {
                        type: 'button',
                        class: _this7.config.classNames.control + ' ' + _this7.config.classNames.control + '--forward',
                        id: 'plyr-settings-' + data.id + '-' + type + '-tab',
                        'aria-haspopup': true,
                        'aria-controls': 'plyr-settings-' + data.id + '-' + type,
                        'aria-expanded': false
                    }), i18n.get(type, _this7.config));

                    var value = createElement('span', {
                        class: _this7.config.classNames.menu.value
                    });

                    // Speed contains HTML entities
                    value.innerHTML = data[type];

                    button.appendChild(value);
                    tab.appendChild(button);
                    tabs.appendChild(tab);

                    _this7.elements.settings.tabs[type] = tab;
                });

                home.appendChild(tabs);
                inner.appendChild(home);

                // Build the panes
                this.config.settings.forEach(function (type) {
                    var pane = createElement('div', {
                        id: 'plyr-settings-' + data.id + '-' + type,
                        hidden: '',
                        'aria-labelled-by': 'plyr-settings-' + data.id + '-' + type + '-tab',
                        role: 'tabpanel',
                        tabindex: -1
                    });

                    var back = createElement('button', {
                        type: 'button',
                        class: _this7.config.classNames.control + ' ' + _this7.config.classNames.control + '--back',
                        'aria-haspopup': true,
                        'aria-controls': 'plyr-settings-' + data.id + '-home',
                        'aria-expanded': false
                    }, i18n.get(type, _this7.config));

                    pane.appendChild(back);

                    var options = createElement('ul');

                    pane.appendChild(options);
                    inner.appendChild(pane);

                    _this7.elements.settings.panes[type] = pane;
                });

                form.appendChild(inner);
                menu.appendChild(form);
                container.appendChild(menu);

                this.elements.settings.form = form;
                this.elements.settings.menu = menu;
            }

            // Picture in picture button
            if (this.config.controls.includes('pip') && support.pip) {
                container.appendChild(controls.createButton.call(this, 'pip'));
            }

            // Airplay button
            if (this.config.controls.includes('airplay') && support.airplay) {
                container.appendChild(controls.createButton.call(this, 'airplay'));
            }

            // Toggle fullscreen button
            if (this.config.controls.includes('fullscreen')) {
                container.appendChild(controls.createButton.call(this, 'fullscreen'));
            }

            // Larger overlaid play button
            if (this.config.controls.includes('play-large')) {
                this.elements.container.appendChild(controls.createButton.call(this, 'play-large'));
            }

            this.elements.controls = container;

            if (this.isHTML5) {
                controls.setQualityMenu.call(this, html5.getQualityOptions.call(this));
            }

            controls.setSpeedMenu.call(this);

            return container;
        },

        // Insert controls
        inject: function inject() {
            var _this8 = this;

            // Sprite
            if (this.config.loadSprite) {
                var icon = controls.getIconUrl.call(this);

                // Only load external sprite using AJAX
                if (icon.cors) {
                    loadSprite(icon.url, 'sprite-plyr');
                }
            }

            // Create a unique ID
            this.id = Math.floor(Math.random() * 10000);

            // Null by default
            var container = null;
            this.elements.controls = null;

            // Set template properties
            var props = {
                id: this.id,
                seektime: this.config.seekTime,
                title: this.config.title
            };
            var update = true;

            if (is.string(this.config.controls) || is.element(this.config.controls)) {
                // String or HTMLElement passed as the option
                container = this.config.controls;
            } else if (is.function(this.config.controls)) {
                // A custom function to build controls
                // The function can return a HTMLElement or String
                container = this.config.controls.call(this, props);
            } else {
                // Create controls
                container = controls.create.call(this, {
                    id: this.id,
                    seektime: this.config.seekTime,
                    speed: this.speed,
                    quality: this.quality,
                    captions: captions.getLabel.call(this)
                    // TODO: Looping
                    // loop: 'None',
                });
                update = false;
            }

            // Replace props with their value
            var replace = function replace(input) {
                var result = input;

                Object.entries(props).forEach(function (_ref2) {
                    var _ref3 = slicedToArray(_ref2, 2),
                        key = _ref3[0],
                        value = _ref3[1];

                    result = replaceAll(result, '{' + key + '}', value);
                });

                return result;
            };

            // Update markup
            if (update) {
                if (is.string(this.config.controls)) {
                    container = replace(container);
                } else if (is.element(container)) {
                    container.innerHTML = replace(container.innerHTML);
                }
            }

            // Controls container
            var target = void 0;

            // Inject to custom location
            if (is.string(this.config.selectors.controls.container)) {
                target = document.querySelector(this.config.selectors.controls.container);
            }

            // Inject into the container by default
            if (!is.element(target)) {
                target = this.elements.container;
            }

            // Inject controls HTML
            if (is.element(container)) {
                target.appendChild(container);
            } else if (container) {
                target.insertAdjacentHTML('beforeend', container);
            }

            // Find the elements if need be
            if (!is.element(this.elements.controls)) {
                controls.findElements.call(this);
            }

            // Edge sometimes doesn't finish the paint so force a redraw
            if (window.navigator.userAgent.includes('Edge')) {
                repaint(target);
            }

            // Setup tooltips
            if (this.config.tooltips.controls) {
                var _config = this.config,
                    classNames = _config.classNames,
                    selectors = _config.selectors;

                var selector = selectors.controls.wrapper + ' ' + selectors.labels + ' .' + classNames.hidden;
                var labels = getElements.call(this, selector);

                Array.from(labels).forEach(function (label) {
                    toggleClass(label, _this8.config.classNames.hidden, false);
                    toggleClass(label, _this8.config.classNames.tooltip, true);
                });
            }
        }
    };

    // ==========================================================================

    /**
     * Parse a string to a URL object
     * @param {string} input - the URL to be parsed
     * @param {boolean} safe - failsafe parsing
     */
    function parseUrl(input) {
        var safe = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        var url = input;

        if (safe) {
            var parser = document.createElement('a');
            parser.href = url;
            url = parser.href;
        }

        try {
            return new URL(url);
        } catch (e) {
            return null;
        }
    }

    // Convert object to URLSearchParams
    function buildUrlParams(input) {
        var params = new URLSearchParams();

        if (is.object(input)) {
            Object.entries(input).forEach(function (_ref) {
                var _ref2 = slicedToArray(_ref, 2),
                    key = _ref2[0],
                    value = _ref2[1];

                params.set(key, value);
            });
        }

        return params;
    }

    // ==========================================================================

    var captions = {
        // Setup captions
        setup: function setup() {
            // Requires UI support
            if (!this.supported.ui) {
                return;
            }

            // Only Vimeo and HTML5 video supported at this point
            if (!this.isVideo || this.isYouTube || this.isHTML5 && !support.textTracks) {
                // Clear menu and hide
                if (is.array(this.config.controls) && this.config.controls.includes('settings') && this.config.settings.includes('captions')) {
                    controls.setCaptionsMenu.call(this);
                }

                return;
            }

            // Inject the container
            if (!is.element(this.elements.captions)) {
                this.elements.captions = createElement('div', getAttributesFromSelector(this.config.selectors.captions));

                insertAfter(this.elements.captions, this.elements.wrapper);
            }

            // Fix IE captions if CORS is used
            // Fetch captions and inject as blobs instead (data URIs not supported!)
            if (browser.isIE && window.URL) {
                var elements = this.media.querySelectorAll('track');

                Array.from(elements).forEach(function (track) {
                    var src = track.getAttribute('src');
                    var url = parseUrl(src);

                    if (url !== null && url.hostname !== window.location.href.hostname && ['http:', 'https:'].includes(url.protocol)) {
                        fetch(src, 'blob').then(function (blob) {
                            track.setAttribute('src', window.URL.createObjectURL(blob));
                        }).catch(function () {
                            removeElement(track);
                        });
                    }
                });
            }

            // Get and set initial data
            // The "preferred" options are not realized unless / until the wanted language has a match
            // * languages: Array of user's browser languages.
            // * language:  The language preferred by user settings or config
            // * active:    The state preferred by user settings or config
            // * toggled:   The real captions state

            var languages = dedupe(Array.from(navigator.languages || navigator.language || navigator.userLanguage).map(function (language) {
                return language.split('-')[0];
            }));

            var language = (this.storage.get('language') || this.config.captions.language || 'auto').toLowerCase();

            // Use first browser language when language is 'auto'
            if (language === 'auto') {
                var _languages = slicedToArray(languages, 1);

                language = _languages[0];
            }

            var active = this.storage.get('captions');
            if (!is.boolean(active)) {
                active = this.config.captions.active;
            }

            Object.assign(this.captions, {
                toggled: false,
                active: active,
                language: language,
                languages: languages
            });

            // Watch changes to textTracks and update captions menu
            if (this.isHTML5) {
                var trackEvents = this.config.captions.update ? 'addtrack removetrack' : 'removetrack';
                on.call(this, this.media.textTracks, trackEvents, captions.update.bind(this));
            }

            // Update available languages in list next tick (the event must not be triggered before the listeners)
            setTimeout(captions.update.bind(this), 0);
        },

        // Update available language options in settings based on tracks
        update: function update() {
            var _this = this;

            var tracks = captions.getTracks.call(this, true);
            // Get the wanted language
            var _captions = this.captions,
                active = _captions.active,
                language = _captions.language,
                meta = _captions.meta,
                currentTrackNode = _captions.currentTrackNode;

            var languageExists = Boolean(tracks.find(function (track) {
                return track.language === language;
            }));

            // Handle tracks (add event listener and "pseudo"-default)
            if (this.isHTML5 && this.isVideo) {
                tracks.filter(function (track) {
                    return !meta.get(track);
                }).forEach(function (track) {
                    _this.debug.log('Track added', track);
                    // Attempt to store if the original dom element was "default"
                    meta.set(track, {
                        default: track.mode === 'showing'
                    });

                    // Turn off native caption rendering to avoid double captions
                    track.mode = 'hidden';

                    // Add event listener for cue changes
                    on.call(_this, track, 'cuechange', function () {
                        return captions.updateCues.call(_this);
                    });
                });
            }

            // Update language first time it matches, or if the previous matching track was removed
            if (languageExists && this.language !== language || !tracks.includes(currentTrackNode)) {
                captions.setLanguage.call(this, language);
                captions.toggle.call(this, active && languageExists);
            }

            // Enable or disable captions based on track length
            toggleClass(this.elements.container, this.config.classNames.captions.enabled, !is.empty(tracks));

            // Update available languages in list
            if ((this.config.controls || []).includes('settings') && this.config.settings.includes('captions')) {
                controls.setCaptionsMenu.call(this);
            }
        },

        // Toggle captions display
        // Used internally for the toggleCaptions method, with the passive option forced to false
        toggle: function toggle(input) {
            var passive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            // If there's no full support
            if (!this.supported.ui) {
                return;
            }

            var toggled = this.captions.toggled; // Current state

            var activeClass = this.config.classNames.captions.active;

            // Get the next state
            // If the method is called without parameter, toggle based on current value
            var active = is.nullOrUndefined(input) ? !toggled : input;

            // Update state and trigger event
            if (active !== toggled) {
                // When passive, don't override user preferences
                if (!passive) {
                    this.captions.active = active;
                    this.storage.set({ captions: active });
                }

                // Force language if the call isn't passive and there is no matching language to toggle to
                if (!this.language && active && !passive) {
                    var tracks = captions.getTracks.call(this);
                    var track = captions.findTrack.call(this, [this.captions.language].concat(toConsumableArray(this.captions.languages)), true);

                    // Override user preferences to avoid switching languages if a matching track is added
                    this.captions.language = track.language;

                    // Set caption, but don't store in localStorage as user preference
                    captions.set.call(this, tracks.indexOf(track));
                    return;
                }

                // Toggle button if it's enabled
                if (this.elements.buttons.captions) {
                    this.elements.buttons.captions.pressed = active;
                }

                // Add class hook
                toggleClass(this.elements.container, activeClass, active);

                this.captions.toggled = active;

                // Update settings menu
                controls.updateSetting.call(this, 'captions');

                // Trigger event (not used internally)
                triggerEvent.call(this, this.media, active ? 'captionsenabled' : 'captionsdisabled');
            }
        },

        // Set captions by track index
        // Used internally for the currentTrack setter with the passive option forced to false
        set: function set$$1(index) {
            var passive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            var tracks = captions.getTracks.call(this);

            // Disable captions if setting to -1
            if (index === -1) {
                captions.toggle.call(this, false, passive);
                return;
            }

            if (!is.number(index)) {
                this.debug.warn('Invalid caption argument', index);
                return;
            }

            if (!(index in tracks)) {
                this.debug.warn('Track not found', index);
                return;
            }

            if (this.captions.currentTrack !== index) {
                this.captions.currentTrack = index;
                var track = tracks[index];

                var _ref = track || {},
                    language = _ref.language;

                // Store reference to node for invalidation on remove


                this.captions.currentTrackNode = track;

                // Update settings menu
                controls.updateSetting.call(this, 'captions');

                // When passive, don't override user preferences
                if (!passive) {
                    this.captions.language = language;
                    this.storage.set({ language: language });
                }

                // Handle Vimeo captions
                if (this.isVimeo) {
                    this.embed.enableTextTrack(language);
                }

                // Trigger event
                triggerEvent.call(this, this.media, 'languagechange');
            }

            // Show captions
            captions.toggle.call(this, true, passive);

            if (this.isHTML5 && this.isVideo) {
                // If we change the active track while a cue is already displayed we need to update it
                captions.updateCues.call(this);
            }
        },

        // Set captions by language
        // Used internally for the language setter with the passive option forced to false
        setLanguage: function setLanguage(input) {
            var passive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            if (!is.string(input)) {
                this.debug.warn('Invalid language argument', input);
                return;
            }
            // Normalize
            var language = input.toLowerCase();
            this.captions.language = language;

            // Set currentTrack
            var tracks = captions.getTracks.call(this);
            var track = captions.findTrack.call(this, [language]);
            captions.set.call(this, tracks.indexOf(track), passive);
        },

        // Get current valid caption tracks
        // If update is false it will also ignore tracks without metadata
        // This is used to "freeze" the language options when captions.update is false
        getTracks: function getTracks() {
            var _this2 = this;

            var update = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            // Handle media or textTracks missing or null
            var tracks = Array.from((this.media || {}).textTracks || []);
            // For HTML5, use cache instead of current tracks when it exists (if captions.update is false)
            // Filter out removed tracks and tracks that aren't captions/subtitles (for example metadata)
            return tracks.filter(function (track) {
                return !_this2.isHTML5 || update || _this2.captions.meta.has(track);
            }).filter(function (track) {
                return ['captions', 'subtitles'].includes(track.kind);
            });
        },

        // Match tracks based on languages and get the first
        findTrack: function findTrack(languages) {
            var _this3 = this;

            var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var tracks = captions.getTracks.call(this);
            var sortIsDefault = function sortIsDefault(track) {
                return Number((_this3.captions.meta.get(track) || {}).default);
            };
            var sorted = Array.from(tracks).sort(function (a, b) {
                return sortIsDefault(b) - sortIsDefault(a);
            });
            var track = void 0;
            languages.every(function (language) {
                track = sorted.find(function (track) {
                    return track.language === language;
                });
                return !track; // Break iteration if there is a match
            });
            // If no match is found but is required, get first
            return track || (force ? sorted[0] : undefined);
        },

        // Get the current track
        getCurrentTrack: function getCurrentTrack() {
            return captions.getTracks.call(this)[this.currentTrack];
        },

        // Get UI label for track
        getLabel: function getLabel(track) {
            var currentTrack = track;

            if (!is.track(currentTrack) && support.textTracks && this.captions.toggled) {
                currentTrack = captions.getCurrentTrack.call(this);
            }

            if (is.track(currentTrack)) {
                if (!is.empty(currentTrack.label)) {
                    return currentTrack.label;
                }

                if (!is.empty(currentTrack.language)) {
                    return track.language.toUpperCase();
                }

                return i18n.get('enabled', this.config);
            }

            return i18n.get('disabled', this.config);
        },

        // Update captions using current track's active cues
        // Also optional array argument in case there isn't any track (ex: vimeo)
        updateCues: function updateCues(input) {
            // Requires UI
            if (!this.supported.ui) {
                return;
            }

            if (!is.element(this.elements.captions)) {
                this.debug.warn('No captions element to render to');
                return;
            }

            // Only accept array or empty input
            if (!is.nullOrUndefined(input) && !Array.isArray(input)) {
                this.debug.warn('updateCues: Invalid input', input);
                return;
            }

            var cues = input;

            // Get cues from track
            if (!cues) {
                var track = captions.getCurrentTrack.call(this);
                cues = Array.from((track || {}).activeCues || []).map(function (cue) {
                    return cue.getCueAsHTML();
                }).map(getHTML);
            }

            // Set new caption text
            var content = cues.map(function (cueText) {
                return cueText.trim();
            }).join('\n');
            var changed = content !== this.elements.captions.innerHTML;

            if (changed) {
                // Empty the container and create a new child element
                emptyElement(this.elements.captions);
                var caption = createElement('span', getAttributesFromSelector(this.config.selectors.caption));
                caption.innerHTML = content;
                this.elements.captions.appendChild(caption);

                // Trigger event
                triggerEvent.call(this, this.media, 'cuechange');
            }
        }
    };

    // ==========================================================================
    // Plyr default config
    // ==========================================================================

    var defaults$1 = {
        // Disable
        enabled: true,

        // Custom media title
        title: '',

        // Logging to console
        debug: false,

        // Auto play (if supported)
        autoplay: false,

        // Only allow one media playing at once (vimeo only)
        autopause: true,

        // Allow inline playback on iOS (this effects YouTube/Vimeo - HTML5 requires the attribute present)
        // TODO: Remove iosNative fullscreen option in favour of this (logic needs work)
        playsinline: true,

        // Default time to skip when rewind/fast forward
        seekTime: 10,

        // Default volume
        volume: 1,
        muted: false,

        // Pass a custom duration
        duration: null,

        // Display the media duration on load in the current time position
        // If you have opted to display both duration and currentTime, this is ignored
        displayDuration: true,

        // Invert the current time to be a countdown
        invertTime: true,

        // Clicking the currentTime inverts it's value to show time left rather than elapsed
        toggleInvert: true,

        // Aspect ratio (for embeds)
        ratio: '16:9',

        // Click video container to play/pause
        clickToPlay: true,

        // Auto hide the controls
        hideControls: true,

        // Reset to start when playback ended
        resetOnEnd: false,

        // Disable the standard context menu
        disableContextMenu: true,

        // Sprite (for icons)
        loadSprite: true,
        iconPrefix: 'plyr',
        iconUrl: 'https://cdn.plyr.io/3.3.12/plyr.svg',

        // Blank video (used to prevent errors on source change)
        blankVideo: 'https://cdn.plyr.io/static/blank.mp4',

        // Quality default
        quality: {
            default: 576,
            options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240, 'default']
        },

        // Set loops
        loop: {
            active: false
            // start: null,
            // end: null,
        },

        // Speed default and options to display
        speed: {
            selected: 1,
            options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]
        },

        // Keyboard shortcut settings
        keyboard: {
            focused: true,
            global: false
        },

        // Display tooltips
        tooltips: {
            controls: false,
            seek: true
        },

        // Captions settings
        captions: {
            active: false,
            language: 'auto',
            // Listen to new tracks added after Plyr is initialized.
            // This is needed for streaming captions, but may result in unselectable options
            update: false
        },

        // Fullscreen settings
        fullscreen: {
            enabled: true, // Allow fullscreen?
            fallback: true, // Fallback for vintage browsers
            iosNative: false // Use the native fullscreen in iOS (disables custom controls)
        },

        // Local storage
        storage: {
            enabled: true,
            key: 'plyr'
        },

        // Default controls
        controls: ['play-large',
        // 'restart',
        // 'rewind',
        'play',
        // 'fast-forward',
        'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],
        settings: ['captions', 'quality', 'speed'],

        // Localisation
        i18n: {
            restart: 'Restart',
            rewind: 'Rewind {seektime}s',
            play: 'Play',
            pause: 'Pause',
            fastForward: 'Forward {seektime}s',
            seek: 'Seek',
            seekLabel: '{currentTime} of {duration}',
            played: 'Played',
            buffered: 'Buffered',
            currentTime: 'Current time',
            duration: 'Duration',
            volume: 'Volume',
            mute: 'Mute',
            unmute: 'Unmute',
            enableCaptions: 'Enable captions',
            disableCaptions: 'Disable captions',
            enterFullscreen: 'Enter fullscreen',
            exitFullscreen: 'Exit fullscreen',
            frameTitle: 'Player for {title}',
            captions: 'Captions',
            settings: 'Settings',
            menuBack: 'Go back to previous menu',
            speed: 'Speed',
            normal: 'Normal',
            quality: 'Quality',
            loop: 'Loop',
            start: 'Start',
            end: 'End',
            all: 'All',
            reset: 'Reset',
            disabled: 'Disabled',
            enabled: 'Enabled',
            advertisement: 'Ad',
            qualityBadge: {
                2160: '4K',
                1440: 'HD',
                1080: 'HD',
                720: 'HD',
                576: 'SD',
                480: 'SD'
            }
        },

        // URLs
        urls: {
            vimeo: {
                sdk: 'https://player.vimeo.com/api/player.js',
                iframe: 'https://player.vimeo.com/video/{0}?{1}',
                api: 'https://vimeo.com/api/v2/video/{0}.json'
            },
            youtube: {
                sdk: 'https://www.youtube.com/iframe_api',
                api: 'https://www.googleapis.com/youtube/v3/videos?id={0}&key={1}&fields=items(snippet(title))&part=snippet'
            },
            googleIMA: {
                sdk: 'https://imasdk.googleapis.com/js/sdkloader/ima3.js'
            }
        },

        // Custom control listeners
        listeners: {
            seek: null,
            play: null,
            pause: null,
            restart: null,
            rewind: null,
            fastForward: null,
            mute: null,
            volume: null,
            captions: null,
            fullscreen: null,
            pip: null,
            airplay: null,
            speed: null,
            quality: null,
            loop: null,
            language: null
        },

        // Events to watch and bubble
        events: [
        // Events to watch on HTML5 media elements and bubble
        // https://developer.mozilla.org/en/docs/Web/Guide/Events/Media_events
        'ended', 'progress', 'stalled', 'playing', 'waiting', 'canplay', 'canplaythrough', 'loadstart', 'loadeddata', 'loadedmetadata', 'timeupdate', 'volumechange', 'play', 'pause', 'error', 'seeking', 'seeked', 'emptied', 'ratechange', 'cuechange',

        // Custom events
        'enterfullscreen', 'exitfullscreen', 'captionsenabled', 'captionsdisabled', 'languagechange', 'controlshidden', 'controlsshown', 'ready',

        // YouTube
        'statechange', 'qualitychange', 'qualityrequested',

        // Ads
        'adsloaded', 'adscontentpause', 'adscontentresume', 'adstarted', 'adsmidpoint', 'adscomplete', 'adsallcomplete', 'adsimpression', 'adsclick'],

        // Selectors
        // Change these to match your template if using custom HTML
        selectors: {
            editable: 'input, textarea, select, [contenteditable]',
            container: '.plyr',
            controls: {
                container: null,
                wrapper: '.plyr__controls'
            },
            labels: '[data-plyr]',
            buttons: {
                play: '[data-plyr="play"]',
                pause: '[data-plyr="pause"]',
                restart: '[data-plyr="restart"]',
                rewind: '[data-plyr="rewind"]',
                fastForward: '[data-plyr="fast-forward"]',
                mute: '[data-plyr="mute"]',
                captions: '[data-plyr="captions"]',
                fullscreen: '[data-plyr="fullscreen"]',
                pip: '[data-plyr="pip"]',
                airplay: '[data-plyr="airplay"]',
                settings: '[data-plyr="settings"]',
                loop: '[data-plyr="loop"]'
            },
            inputs: {
                seek: '[data-plyr="seek"]',
                volume: '[data-plyr="volume"]',
                speed: '[data-plyr="speed"]',
                language: '[data-plyr="language"]',
                quality: '[data-plyr="quality"]'
            },
            display: {
                currentTime: '.plyr__time--current',
                duration: '.plyr__time--duration',
                buffer: '.plyr__progress__buffer',
                loop: '.plyr__progress__loop', // Used later
                volume: '.plyr__volume--display'
            },
            progress: '.plyr__progress',
            captions: '.plyr__captions',
            caption: '.plyr__caption',
            menu: {
                quality: '.js-plyr__menu__list--quality'
            }
        },

        // Class hooks added to the player in different states
        classNames: {
            type: 'plyr--{0}',
            provider: 'plyr--{0}',
            video: 'plyr__video-wrapper',
            embed: 'plyr__video-embed',
            embedContainer: 'plyr__video-embed__container',
            poster: 'plyr__poster',
            posterEnabled: 'plyr__poster-enabled',
            ads: 'plyr__ads',
            control: 'plyr__control',
            controlPressed: 'plyr__control--pressed',
            playing: 'plyr--playing',
            paused: 'plyr--paused',
            stopped: 'plyr--stopped',
            loading: 'plyr--loading',
            hover: 'plyr--hover',
            tooltip: 'plyr__tooltip',
            cues: 'plyr__cues',
            hidden: 'plyr__sr-only',
            hideControls: 'plyr--hide-controls',
            isIos: 'plyr--is-ios',
            isTouch: 'plyr--is-touch',
            uiSupported: 'plyr--full-ui',
            noTransition: 'plyr--no-transition',
            menu: {
                value: 'plyr__menu__value',
                badge: 'plyr__badge',
                open: 'plyr--menu-open'
            },
            captions: {
                enabled: 'plyr--captions-enabled',
                active: 'plyr--captions-active'
            },
            fullscreen: {
                enabled: 'plyr--fullscreen-enabled',
                fallback: 'plyr--fullscreen-fallback'
            },
            pip: {
                supported: 'plyr--pip-supported',
                active: 'plyr--pip-active'
            },
            airplay: {
                supported: 'plyr--airplay-supported',
                active: 'plyr--airplay-active'
            },
            tabFocus: 'plyr__tab-focus'
        },

        // Embed attributes
        attributes: {
            embed: {
                provider: 'data-plyr-provider',
                id: 'data-plyr-embed-id'
            }
        },

        // API keys
        keys: {
            google: null
        },

        // Advertisements plugin
        // Register for an account here: http://vi.ai/publisher-video-monetization/?aid=plyrio
        ads: {
            enabled: false,
            publisherId: ''
        }
    };

    // ==========================================================================
    // Plyr supported types and providers
    // ==========================================================================

    var providers = {
        html5: 'html5',
        youtube: 'youtube',
        vimeo: 'vimeo'
    };

    var types = {
        audio: 'audio',
        video: 'video'
    };

    /**
     * Get provider by URL
     * @param {string} url
     */
    function getProviderByUrl(url) {
        // YouTube
        if (/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/.test(url)) {
            return providers.youtube;
        }

        // Vimeo
        if (/^https?:\/\/player.vimeo.com\/video\/\d{0,9}(?=\b|\/)/.test(url)) {
            return providers.vimeo;
        }

        return null;
    }

    // ==========================================================================
    // Console wrapper
    // ==========================================================================

    var noop = function noop() {};

    var Console = function () {
        function Console() {
            var enabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
            classCallCheck(this, Console);

            this.enabled = window.console && enabled;

            if (this.enabled) {
                this.log('Debugging enabled');
            }
        }

        createClass(Console, [{
            key: 'log',
            get: function get$$1() {
                // eslint-disable-next-line no-console
                return this.enabled ? Function.prototype.bind.call(console.log, console) : noop;
            }
        }, {
            key: 'warn',
            get: function get$$1() {
                // eslint-disable-next-line no-console
                return this.enabled ? Function.prototype.bind.call(console.warn, console) : noop;
            }
        }, {
            key: 'error',
            get: function get$$1() {
                // eslint-disable-next-line no-console
                return this.enabled ? Function.prototype.bind.call(console.error, console) : noop;
            }
        }]);
        return Console;
    }();

    // ==========================================================================

    function onChange() {
        if (!this.enabled) {
            return;
        }

        // Update toggle button
        var button = this.player.elements.buttons.fullscreen;
        if (is.element(button)) {
            button.pressed = this.active;
        }

        // Trigger an event
        triggerEvent.call(this.player, this.target, this.active ? 'enterfullscreen' : 'exitfullscreen', true);

        // Trap focus in container
        if (!browser.isIos) {
            trapFocus.call(this.player, this.target, this.active);
        }
    }

    function toggleFallback() {
        var toggle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        // Store or restore scroll position
        if (toggle) {
            this.scrollPosition = {
                x: window.scrollX || 0,
                y: window.scrollY || 0
            };
        } else {
            window.scrollTo(this.scrollPosition.x, this.scrollPosition.y);
        }

        // Toggle scroll
        document.body.style.overflow = toggle ? 'hidden' : '';

        // Toggle class hook
        toggleClass(this.target, this.player.config.classNames.fullscreen.fallback, toggle);

        // Toggle button and fire events
        onChange.call(this);
    }

    var Fullscreen = function () {
        function Fullscreen(player) {
            var _this = this;

            classCallCheck(this, Fullscreen);

            // Keep reference to parent
            this.player = player;

            // Get prefix
            this.prefix = Fullscreen.prefix;
            this.property = Fullscreen.property;

            // Scroll position
            this.scrollPosition = { x: 0, y: 0 };

            // Register event listeners
            // Handle event (incase user presses escape etc)
            on.call(this.player, document, this.prefix === 'ms' ? 'MSFullscreenChange' : this.prefix + 'fullscreenchange', function () {
                // TODO: Filter for target??
                onChange.call(_this);
            });

            // Fullscreen toggle on double click
            on.call(this.player, this.player.elements.container, 'dblclick', function (event) {
                // Ignore double click in controls
                if (is.element(_this.player.elements.controls) && _this.player.elements.controls.contains(event.target)) {
                    return;
                }

                _this.toggle();
            });

            // Update the UI
            this.update();
        }

        // Determine if native supported


        createClass(Fullscreen, [{
            key: 'update',

            // Update UI
            value: function update() {
                if (this.enabled) {
                    this.player.debug.log((Fullscreen.native ? 'Native' : 'Fallback') + ' fullscreen enabled');
                } else {
                    this.player.debug.log('Fullscreen not supported and fallback disabled');
                }

                // Add styling hook to show button
                toggleClass(this.player.elements.container, this.player.config.classNames.fullscreen.enabled, this.enabled);
            }

            // Make an element fullscreen

        }, {
            key: 'enter',
            value: function enter() {
                if (!this.enabled) {
                    return;
                }

                // iOS native fullscreen doesn't need the request step
                if (browser.isIos && this.player.config.fullscreen.iosNative) {
                    if (this.player.playing) {
                        this.target.webkitEnterFullscreen();
                    }
                } else if (!Fullscreen.native) {
                    toggleFallback.call(this, true);
                } else if (!this.prefix) {
                    this.target.requestFullscreen();
                } else if (!is.empty(this.prefix)) {
                    this.target[this.prefix + 'Request' + this.property]();
                }
            }

            // Bail from fullscreen

        }, {
            key: 'exit',
            value: function exit() {
                if (!this.enabled) {
                    return;
                }

                // iOS native fullscreen
                if (browser.isIos && this.player.config.fullscreen.iosNative) {
                    this.target.webkitExitFullscreen();
                    this.player.play();
                } else if (!Fullscreen.native) {
                    toggleFallback.call(this, false);
                } else if (!this.prefix) {
                    (document.cancelFullScreen || document.exitFullscreen).call(document);
                } else if (!is.empty(this.prefix)) {
                    var action = this.prefix === 'moz' ? 'Cancel' : 'Exit';
                    document['' + this.prefix + action + this.property]();
                }
            }

            // Toggle state

        }, {
            key: 'toggle',
            value: function toggle() {
                if (!this.active) {
                    this.enter();
                } else {
                    this.exit();
                }
            }
        }, {
            key: 'enabled',

            // Determine if fullscreen is enabled
            get: function get$$1() {
                return (Fullscreen.native || this.player.config.fullscreen.fallback) && this.player.config.fullscreen.enabled && this.player.supported.ui && this.player.isVideo;
            }

            // Get active state

        }, {
            key: 'active',
            get: function get$$1() {
                if (!this.enabled) {
                    return false;
                }

                // Fallback using classname
                if (!Fullscreen.native) {
                    return hasClass(this.target, this.player.config.classNames.fullscreen.fallback);
                }

                var element = !this.prefix ? document.fullscreenElement : document['' + this.prefix + this.property + 'Element'];

                return element === this.target;
            }

            // Get target element

        }, {
            key: 'target',
            get: function get$$1() {
                return browser.isIos && this.player.config.fullscreen.iosNative ? this.player.media : this.player.elements.container;
            }
        }], [{
            key: 'native',
            get: function get$$1() {
                return !!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled);
            }

            // Get the prefix for handlers

        }, {
            key: 'prefix',
            get: function get$$1() {
                // No prefix
                if (is.function(document.exitFullscreen)) {
                    return '';
                }

                // Check for fullscreen support by vendor prefix
                var value = '';
                var prefixes = ['webkit', 'moz', 'ms'];

                prefixes.some(function (pre) {
                    if (is.function(document[pre + 'ExitFullscreen']) || is.function(document[pre + 'CancelFullScreen'])) {
                        value = pre;
                        return true;
                    }

                    return false;
                });

                return value;
            }
        }, {
            key: 'property',
            get: function get$$1() {
                return this.prefix === 'moz' ? 'FullScreen' : 'Fullscreen';
            }
        }]);
        return Fullscreen;
    }();

    // ==========================================================================
    // Load image avoiding xhr/fetch CORS issues
    // Server status can't be obtained this way unfortunately, so this uses "naturalWidth" to determine if the image has loaded
    // By default it checks if it is at least 1px, but you can add a second argument to change this
    // ==========================================================================

    function loadImage(src) {
        var minWidth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

        return new Promise(function (resolve, reject) {
            var image = new Image();

            var handler = function handler() {
                delete image.onload;
                delete image.onerror;
                (image.naturalWidth >= minWidth ? resolve : reject)(image);
            };

            Object.assign(image, { onload: handler, onerror: handler, src: src });
        });
    }

    // ==========================================================================

    var ui = {
        addStyleHook: function addStyleHook() {
            toggleClass(this.elements.container, this.config.selectors.container.replace('.', ''), true);
            toggleClass(this.elements.container, this.config.classNames.uiSupported, this.supported.ui);
        },

        // Toggle native HTML5 media controls
        toggleNativeControls: function toggleNativeControls() {
            var toggle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            if (toggle && this.isHTML5) {
                this.media.setAttribute('controls', '');
            } else {
                this.media.removeAttribute('controls');
            }
        },

        // Setup the UI
        build: function build() {
            var _this = this;

            // Re-attach media element listeners
            // TODO: Use event bubbling?
            this.listeners.media();

            // Don't setup interface if no support
            if (!this.supported.ui) {
                this.debug.warn('Basic support only for ' + this.provider + ' ' + this.type);

                // Restore native controls
                ui.toggleNativeControls.call(this, true);

                // Bail
                return;
            }

            // Inject custom controls if not present
            if (!is.element(this.elements.controls)) {
                // Inject custom controls
                controls.inject.call(this);

                // Re-attach control listeners
                this.listeners.controls();
            }

            // Remove native controls
            ui.toggleNativeControls.call(this);

            // Setup captions for HTML5
            if (this.isHTML5) {
                captions.setup.call(this);
            }

            // Reset volume
            this.volume = null;

            // Reset mute state
            this.muted = null;

            // Reset speed
            this.speed = null;

            // Reset loop state
            this.loop = null;

            // Reset quality setting
            this.quality = null;

            // Reset volume display
            controls.updateVolume.call(this);

            // Reset time display
            controls.timeUpdate.call(this);

            // Update the UI
            ui.checkPlaying.call(this);

            // Check for picture-in-picture support
            toggleClass(this.elements.container, this.config.classNames.pip.supported, support.pip && this.isHTML5 && this.isVideo);

            // Check for airplay support
            toggleClass(this.elements.container, this.config.classNames.airplay.supported, support.airplay && this.isHTML5);

            // Add iOS class
            toggleClass(this.elements.container, this.config.classNames.isIos, browser.isIos);

            // Add touch class
            toggleClass(this.elements.container, this.config.classNames.isTouch, this.touch);

            // Ready for API calls
            this.ready = true;

            // Ready event at end of execution stack
            setTimeout(function () {
                triggerEvent.call(_this, _this.media, 'ready');
            }, 0);

            // Set the title
            ui.setTitle.call(this);

            // Assure the poster image is set, if the property was added before the element was created
            if (this.poster) {
                ui.setPoster.call(this, this.poster, false).catch(function () {});
            }

            // Manually set the duration if user has overridden it.
            // The event listeners for it doesn't get called if preload is disabled (#701)
            if (this.config.duration) {
                controls.durationUpdate.call(this);
            }
        },

        // Setup aria attribute for play and iframe title
        setTitle: function setTitle() {
            // Find the current text
            var label = i18n.get('play', this.config);

            // If there's a media title set, use that for the label
            if (is.string(this.config.title) && !is.empty(this.config.title)) {
                label += ', ' + this.config.title;
            }

            // If there's a play button, set label
            Array.from(this.elements.buttons.play || []).forEach(function (button) {
                button.setAttribute('aria-label', label);
            });

            // Set iframe title
            // https://github.com/sampotts/plyr/issues/124
            if (this.isEmbed) {
                var iframe = getElement.call(this, 'iframe');

                if (!is.element(iframe)) {
                    return;
                }

                // Default to media type
                var title = !is.empty(this.config.title) ? this.config.title : 'video';
                var format = i18n.get('frameTitle', this.config);

                iframe.setAttribute('title', format.replace('{title}', title));
            }
        },

        // Toggle poster
        togglePoster: function togglePoster(enable) {
            toggleClass(this.elements.container, this.config.classNames.posterEnabled, enable);
        },

        // Set the poster image (async)
        // Used internally for the poster setter, with the passive option forced to false
        setPoster: function setPoster(poster) {
            var _this2 = this;

            var passive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            // Don't override if call is passive
            if (passive && this.poster) {
                return Promise.reject(new Error('Poster already set'));
            }

            // Set property synchronously to respect the call order
            this.media.setAttribute('poster', poster);

            // Wait until ui is ready
            return ready.call(this)
            // Load image
            .then(function () {
                return loadImage(poster);
            }).catch(function (err) {
                // Hide poster on error unless it's been set by another call
                if (poster === _this2.poster) {
                    ui.togglePoster.call(_this2, false);
                }
                // Rethrow
                throw err;
            }).then(function () {
                // Prevent race conditions
                if (poster !== _this2.poster) {
                    throw new Error('setPoster cancelled by later call to setPoster');
                }
            }).then(function () {
                Object.assign(_this2.elements.poster.style, {
                    backgroundImage: 'url(\'' + poster + '\')',
                    // Reset backgroundSize as well (since it can be set to "cover" for padded thumbnails for youtube)
                    backgroundSize: ''
                });
                ui.togglePoster.call(_this2, true);
                return poster;
            });
        },

        // Check playing state
        checkPlaying: function checkPlaying(event) {
            var _this3 = this;

            // Class hooks
            toggleClass(this.elements.container, this.config.classNames.playing, this.playing);
            toggleClass(this.elements.container, this.config.classNames.paused, this.paused);
            toggleClass(this.elements.container, this.config.classNames.stopped, this.stopped);

            // Set state
            Array.from(this.elements.buttons.play || []).forEach(function (target) {
                target.pressed = _this3.playing;
            });

            // Only update controls on non timeupdate events
            if (is.event(event) && event.type === 'timeupdate') {
                return;
            }

            // Toggle controls
            ui.toggleControls.call(this);
        },

        // Check if media is loading
        checkLoading: function checkLoading(event) {
            var _this4 = this;

            this.loading = ['stalled', 'waiting'].includes(event.type);

            // Clear timer
            clearTimeout(this.timers.loading);

            // Timer to prevent flicker when seeking
            this.timers.loading = setTimeout(function () {
                // Update progress bar loading class state
                toggleClass(_this4.elements.container, _this4.config.classNames.loading, _this4.loading);

                // Update controls visibility
                ui.toggleControls.call(_this4);
            }, this.loading ? 250 : 0);
        },

        // Toggle controls based on state and `force` argument
        toggleControls: function toggleControls(force) {
            var controls$$1 = this.elements.controls;

            if (controls$$1 && this.config.hideControls) {
                // Show controls if force, loading, paused, or button interaction, otherwise hide
                this.toggleControls(Boolean(force || this.loading || this.paused || controls$$1.pressed || controls$$1.hover));
            }
        }
    };

    // ==========================================================================

    var Listeners = function () {
        function Listeners(player) {
            classCallCheck(this, Listeners);

            this.player = player;
            this.lastKey = null;

            this.handleKey = this.handleKey.bind(this);
            this.toggleMenu = this.toggleMenu.bind(this);
            this.firstTouch = this.firstTouch.bind(this);
        }

        // Handle key presses


        createClass(Listeners, [{
            key: 'handleKey',
            value: function handleKey(event) {
                var _this = this;

                var code = event.keyCode ? event.keyCode : event.which;
                var pressed = event.type === 'keydown';
                var repeat = pressed && code === this.lastKey;

                // Bail if a modifier key is set
                if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
                    return;
                }

                // If the event is bubbled from the media element
                // Firefox doesn't get the keycode for whatever reason
                if (!is.number(code)) {
                    return;
                }

                // Seek by the number keys
                var seekByKey = function seekByKey() {
                    // Divide the max duration into 10th's and times by the number value
                    _this.player.currentTime = _this.player.duration / 10 * (code - 48);
                };

                // Handle the key on keydown
                // Reset on keyup
                if (pressed) {
                    // Which keycodes should we prevent default
                    var preventDefault = [32, 37, 38, 39, 40, 48, 49, 50, 51, 52, 53, 54, 56, 57, 67, 70, 73, 75, 76, 77, 79];

                    // Check focused element
                    // and if the focused element is not editable (e.g. text input)
                    // and any that accept key input http://webaim.org/techniques/keyboard/
                    var focused = getFocusElement();
                    if (is.element(focused) && focused !== this.player.elements.inputs.seek && matches(focused, this.player.config.selectors.editable)) {
                        return;
                    }

                    // If the code is found prevent default (e.g. prevent scrolling for arrows)
                    if (preventDefault.includes(code)) {
                        event.preventDefault();
                        event.stopPropagation();
                    }

                    switch (code) {
                        case 48:
                        case 49:
                        case 50:
                        case 51:
                        case 52:
                        case 53:
                        case 54:
                        case 55:
                        case 56:
                        case 57:
                            // 0-9
                            if (!repeat) {
                                seekByKey();
                            }
                            break;

                        case 32:
                        case 75:
                            // Space and K key
                            if (!repeat) {
                                this.player.togglePlay();
                            }
                            break;

                        case 38:
                            // Arrow up
                            this.player.increaseVolume(0.1);
                            break;

                        case 40:
                            // Arrow down
                            this.player.decreaseVolume(0.1);
                            break;

                        case 77:
                            // M key
                            if (!repeat) {
                                this.player.muted = !this.player.muted;
                            }
                            break;

                        case 39:
                            // Arrow forward
                            this.player.forward();
                            break;

                        case 37:
                            // Arrow back
                            this.player.rewind();
                            break;

                        case 70:
                            // F key
                            this.player.fullscreen.toggle();
                            break;

                        case 67:
                            // C key
                            if (!repeat) {
                                this.player.toggleCaptions();
                            }
                            break;

                        case 76:
                            // L key
                            this.player.loop = !this.player.loop;
                            break;

                        /* case 73:
                            this.setLoop('start');
                            break;
                         case 76:
                            this.setLoop();
                            break;
                         case 79:
                            this.setLoop('end');
                            break; */

                        default:
                            break;
                    }

                    // Escape is handle natively when in full screen
                    // So we only need to worry about non native
                    if (!this.player.fullscreen.enabled && this.player.fullscreen.active && code === 27) {
                        this.player.fullscreen.toggle();
                    }

                    // Store last code for next cycle
                    this.lastKey = code;
                } else {
                    this.lastKey = null;
                }
            }

            // Toggle menu

        }, {
            key: 'toggleMenu',
            value: function toggleMenu(event) {
                controls.toggleMenu.call(this.player, event);
            }

            // Device is touch enabled

        }, {
            key: 'firstTouch',
            value: function firstTouch() {
                this.player.touch = true;

                // Add touch class
                toggleClass(this.player.elements.container, this.player.config.classNames.isTouch, true);
            }

            // Global window & document listeners

        }, {
            key: 'global',
            value: function global() {
                var toggle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

                // Keyboard shortcuts
                if (this.player.config.keyboard.global) {
                    toggleListener.call(this.player, window, 'keydown keyup', this.handleKey, toggle, false);
                }

                // Click anywhere closes menu
                toggleListener.call(this.player, document.body, 'click', this.toggleMenu, toggle);

                // Detect touch by events
                once.call(this.player, document.body, 'touchstart', this.firstTouch);
            }

            // Container listeners

        }, {
            key: 'container',
            value: function container() {
                var _this2 = this;

                // Keyboard shortcuts
                if (!this.player.config.keyboard.global && this.player.config.keyboard.focused) {
                    on.call(this.player, this.player.elements.container, 'keydown keyup', this.handleKey, false);
                }

                // Detect tab focus
                // Remove class on blur/focusout
                on.call(this.player, this.player.elements.container, 'focusout', function (event) {
                    toggleClass(event.target, _this2.player.config.classNames.tabFocus, false);
                });
                // Add classname to tabbed elements
                on.call(this.player, this.player.elements.container, 'keydown', function (event) {
                    if (event.keyCode !== 9) {
                        return;
                    }

                    // Delay the adding of classname until the focus has changed
                    // This event fires before the focusin event
                    setTimeout(function () {
                        toggleClass(getFocusElement(), _this2.player.config.classNames.tabFocus, true);
                    }, 0);
                });

                // Toggle controls on mouse events and entering fullscreen
                on.call(this.player, this.player.elements.container, 'mousemove mouseleave touchstart touchmove enterfullscreen exitfullscreen', function (event) {
                    var controls$$1 = _this2.player.elements.controls;

                    // Remove button states for fullscreen

                    if (event.type === 'enterfullscreen') {
                        controls$$1.pressed = false;
                        controls$$1.hover = false;
                    }

                    // Show, then hide after a timeout unless another control event occurs
                    var show = ['touchstart', 'touchmove', 'mousemove'].includes(event.type);

                    var delay = 0;

                    if (show) {
                        ui.toggleControls.call(_this2.player, true);
                        // Use longer timeout for touch devices
                        delay = _this2.player.touch ? 3000 : 2000;
                    }

                    // Clear timer
                    clearTimeout(_this2.player.timers.controls);
                    // Timer to prevent flicker when seeking
                    _this2.player.timers.controls = setTimeout(function () {
                        return ui.toggleControls.call(_this2.player, false);
                    }, delay);
                });
            }

            // Listen for media events

        }, {
            key: 'media',
            value: function media() {
                var _this3 = this;

                // Time change on media
                on.call(this.player, this.player.media, 'timeupdate seeking seeked', function (event) {
                    return controls.timeUpdate.call(_this3.player, event);
                });

                // Display duration
                on.call(this.player, this.player.media, 'durationchange loadeddata loadedmetadata', function (event) {
                    return controls.durationUpdate.call(_this3.player, event);
                });

                // Check for audio tracks on load
                // We can't use `loadedmetadata` as it doesn't seem to have audio tracks at that point
                on.call(this.player, this.player.media, 'canplay', function () {
                    toggleHidden(_this3.player.elements.volume, !_this3.player.hasAudio);
                    toggleHidden(_this3.player.elements.buttons.mute, !_this3.player.hasAudio);
                });

                // Handle the media finishing
                on.call(this.player, this.player.media, 'ended', function () {
                    // Show poster on end
                    if (_this3.player.isHTML5 && _this3.player.isVideo && _this3.player.config.resetOnEnd) {
                        // Restart
                        _this3.player.restart();
                    }
                });

                // Check for buffer progress
                on.call(this.player, this.player.media, 'progress playing seeking seeked', function (event) {
                    return controls.updateProgress.call(_this3.player, event);
                });

                // Handle volume changes
                on.call(this.player, this.player.media, 'volumechange', function (event) {
                    return controls.updateVolume.call(_this3.player, event);
                });

                // Handle play/pause
                on.call(this.player, this.player.media, 'playing play pause ended emptied timeupdate', function (event) {
                    return ui.checkPlaying.call(_this3.player, event);
                });

                // Loading state
                on.call(this.player, this.player.media, 'waiting canplay seeked playing', function (event) {
                    return ui.checkLoading.call(_this3.player, event);
                });

                // If autoplay, then load advertisement if required
                // TODO: Show some sort of loading state while the ad manager loads else there's a delay before ad shows
                on.call(this.player, this.player.media, 'playing', function () {
                    if (!_this3.player.ads) {
                        return;
                    }

                    // If ads are enabled, wait for them first
                    if (_this3.player.ads.enabled && !_this3.player.ads.initialized) {
                        // Wait for manager response
                        _this3.player.ads.managerPromise.then(function () {
                            return _this3.player.ads.play();
                        }).catch(function () {
                            return _this3.player.play();
                        });
                    }
                });

                // Click video
                if (this.player.supported.ui && this.player.config.clickToPlay && !this.player.isAudio) {
                    // Re-fetch the wrapper
                    var wrapper = getElement.call(this.player, '.' + this.player.config.classNames.video);

                    // Bail if there's no wrapper (this should never happen)
                    if (!is.element(wrapper)) {
                        return;
                    }

                    // On click play, pause ore restart
                    on.call(this.player, wrapper, 'click', function () {
                        // Touch devices will just show controls (if we're hiding controls)
                        if (_this3.player.config.hideControls && _this3.player.touch && !_this3.player.paused) {
                            return;
                        }

                        if (_this3.player.paused) {
                            _this3.player.play();
                        } else if (_this3.player.ended) {
                            _this3.player.restart();
                            _this3.player.play();
                        } else {
                            _this3.player.pause();
                        }
                    });
                }

                // Disable right click
                if (this.player.supported.ui && this.player.config.disableContextMenu) {
                    on.call(this.player, this.player.elements.wrapper, 'contextmenu', function (event) {
                        event.preventDefault();
                    }, false);
                }

                // Volume change
                on.call(this.player, this.player.media, 'volumechange', function () {
                    // Save to storage
                    _this3.player.storage.set({ volume: _this3.player.volume, muted: _this3.player.muted });
                });

                // Speed change
                on.call(this.player, this.player.media, 'ratechange', function () {
                    // Update UI
                    controls.updateSetting.call(_this3.player, 'speed');

                    // Save to storage
                    _this3.player.storage.set({ speed: _this3.player.speed });
                });

                // Quality request
                on.call(this.player, this.player.media, 'qualityrequested', function (event) {
                    // Save to storage
                    _this3.player.storage.set({ quality: event.detail.quality });
                });

                // Quality change
                on.call(this.player, this.player.media, 'qualitychange', function (event) {
                    // Update UI
                    controls.updateSetting.call(_this3.player, 'quality', null, event.detail.quality);
                });

                // Proxy events to container
                // Bubble up key events for Edge
                var proxyEvents = this.player.config.events.concat(['keyup', 'keydown']).join(' ');
                on.call(this.player, this.player.media, proxyEvents, function (event) {
                    var _event$detail = event.detail,
                        detail = _event$detail === undefined ? {} : _event$detail;

                    // Get error details from media

                    if (event.type === 'error') {
                        detail = _this3.player.media.error;
                    }

                    triggerEvent.call(_this3.player, _this3.player.elements.container, event.type, true, detail);
                });
            }

            // Listen for control events

        }, {
            key: 'controls',
            value: function controls$$1() {
                var _this4 = this;

                // IE doesn't support input event, so we fallback to change
                var inputEvent = browser.isIE ? 'change' : 'input';

                // Run default and custom handlers
                var proxy = function proxy(event, defaultHandler, customHandlerKey) {
                    var customHandler = _this4.player.config.listeners[customHandlerKey];
                    var hasCustomHandler = is.function(customHandler);
                    var returned = true;

                    // Execute custom handler
                    if (hasCustomHandler) {
                        returned = customHandler.call(_this4.player, event);
                    }

                    // Only call default handler if not prevented in custom handler
                    if (returned && is.function(defaultHandler)) {
                        defaultHandler.call(_this4.player, event);
                    }
                };

                // Trigger custom and default handlers
                var bind = function bind(element, type, defaultHandler, customHandlerKey) {
                    var passive = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

                    var customHandler = _this4.player.config.listeners[customHandlerKey];
                    var hasCustomHandler = is.function(customHandler);

                    on.call(_this4.player, element, type, function (event) {
                        return proxy(event, defaultHandler, customHandlerKey);
                    }, passive && !hasCustomHandler);
                };

                // Play/pause toggle
                if (this.player.elements.buttons.play) {
                    Array.from(this.player.elements.buttons.play).forEach(function (button) {
                        bind(button, 'click', _this4.player.togglePlay, 'play');
                    });
                }

                // Pause
                bind(this.player.elements.buttons.restart, 'click', this.player.restart, 'restart');

                // Rewind
                bind(this.player.elements.buttons.rewind, 'click', this.player.rewind, 'rewind');

                // Rewind
                bind(this.player.elements.buttons.fastForward, 'click', this.player.forward, 'fastForward');

                // Mute toggle
                bind(this.player.elements.buttons.mute, 'click', function () {
                    _this4.player.muted = !_this4.player.muted;
                }, 'mute');

                // Captions toggle
                bind(this.player.elements.buttons.captions, 'click', function () {
                    return _this4.player.toggleCaptions();
                });

                // Fullscreen toggle
                bind(this.player.elements.buttons.fullscreen, 'click', function () {
                    _this4.player.fullscreen.toggle();
                }, 'fullscreen');

                // Picture-in-Picture
                bind(this.player.elements.buttons.pip, 'click', function () {
                    _this4.player.pip = 'toggle';
                }, 'pip');

                // Airplay
                bind(this.player.elements.buttons.airplay, 'click', this.player.airplay, 'airplay');

                // Settings menu
                bind(this.player.elements.buttons.settings, 'click', function (event) {
                    controls.toggleMenu.call(_this4.player, event);
                });

                // Settings menu
                bind(this.player.elements.settings.form, 'click', function (event) {
                    event.stopPropagation();

                    // Go back to home tab on click
                    var showHomeTab = function showHomeTab() {
                        var id = 'plyr-settings-' + _this4.player.id + '-home';
                        controls.showTab.call(_this4.player, id);
                    };

                    // Settings menu items - use event delegation as items are added/removed
                    if (matches(event.target, _this4.player.config.selectors.inputs.language)) {
                        proxy(event, function () {
                            _this4.player.currentTrack = Number(event.target.value);
                            showHomeTab();
                        }, 'language');
                    } else if (matches(event.target, _this4.player.config.selectors.inputs.quality)) {
                        proxy(event, function () {
                            _this4.player.quality = event.target.value;
                            showHomeTab();
                        }, 'quality');
                    } else if (matches(event.target, _this4.player.config.selectors.inputs.speed)) {
                        proxy(event, function () {
                            _this4.player.speed = parseFloat(event.target.value);
                            showHomeTab();
                        }, 'speed');
                    } else {
                        var tab = event.target;
                        controls.showTab.call(_this4.player, tab.getAttribute('aria-controls'));
                    }
                });

                // Set range input alternative "value", which matches the tooltip time (#954)
                bind(this.player.elements.inputs.seek, 'mousedown mousemove', function (event) {
                    var clientRect = _this4.player.elements.progress.getBoundingClientRect();
                    var percent = 100 / clientRect.width * (event.pageX - clientRect.left);
                    event.currentTarget.setAttribute('seek-value', percent);
                });

                // Pause while seeking
                bind(this.player.elements.inputs.seek, 'mousedown mouseup keydown keyup touchstart touchend', function (event) {
                    var seek = event.currentTarget;

                    var code = event.keyCode ? event.keyCode : event.which;
                    var eventType = event.type;

                    if ((eventType === 'keydown' || eventType === 'keyup') && code !== 39 && code !== 37) {
                        return;
                    }
                    // Was playing before?
                    var play = seek.hasAttribute('play-on-seeked');

                    // Done seeking
                    var done = ['mouseup', 'touchend', 'keyup'].includes(event.type);

                    // If we're done seeking and it was playing, resume playback
                    if (play && done) {
                        seek.removeAttribute('play-on-seeked');
                        _this4.player.play();
                    } else if (!done && _this4.player.playing) {
                        seek.setAttribute('play-on-seeked', '');
                        _this4.player.pause();
                    }
                });

                // Seek
                bind(this.player.elements.inputs.seek, inputEvent, function (event) {
                    var seek = event.currentTarget;

                    // If it exists, use seek-value instead of "value" for consistency with tooltip time (#954)
                    var seekTo = seek.getAttribute('seek-value');

                    if (is.empty(seekTo)) {
                        seekTo = seek.value;
                    }

                    seek.removeAttribute('seek-value');

                    _this4.player.currentTime = seekTo / seek.max * _this4.player.duration;
                }, 'seek');

                // Current time invert
                // Only if one time element is used for both currentTime and duration
                if (this.player.config.toggleInvert && !is.element(this.player.elements.display.duration)) {
                    bind(this.player.elements.display.currentTime, 'click', function () {
                        // Do nothing if we're at the start
                        if (_this4.player.currentTime === 0) {
                            return;
                        }

                        _this4.player.config.invertTime = !_this4.player.config.invertTime;

                        controls.timeUpdate.call(_this4.player);
                    });
                }

                // Volume
                bind(this.player.elements.inputs.volume, inputEvent, function (event) {
                    _this4.player.volume = event.target.value;
                }, 'volume');

                // Polyfill for lower fill in <input type="range"> for webkit
                if (browser.isWebkit) {
                    Array.from(getElements.call(this.player, 'input[type="range"]')).forEach(function (element) {
                        bind(element, 'input', function (event) {
                            return controls.updateRangeFill.call(_this4.player, event.target);
                        });
                    });
                }

                // Seek tooltip
                bind(this.player.elements.progress, 'mouseenter mouseleave mousemove', function (event) {
                    return controls.updateSeekTooltip.call(_this4.player, event);
                });

                // Update controls.hover state (used for ui.toggleControls to avoid hiding when interacting)
                bind(this.player.elements.controls, 'mouseenter mouseleave', function (event) {
                    _this4.player.elements.controls.hover = !_this4.player.touch && event.type === 'mouseenter';
                });

                // Update controls.pressed state (used for ui.toggleControls to avoid hiding when interacting)
                bind(this.player.elements.controls, 'mousedown mouseup touchstart touchend touchcancel', function (event) {
                    _this4.player.elements.controls.pressed = ['mousedown', 'touchstart'].includes(event.type);
                });

                // Focus in/out on controls
                bind(this.player.elements.controls, 'focusin focusout', function (event) {
                    var _player = _this4.player,
                        config = _player.config,
                        elements = _player.elements,
                        timers = _player.timers;

                    // Skip transition to prevent focus from scrolling the parent element

                    toggleClass(elements.controls, config.classNames.noTransition, event.type === 'focusin');

                    // Toggle
                    ui.toggleControls.call(_this4.player, event.type === 'focusin');

                    // If focusin, hide again after delay
                    if (event.type === 'focusin') {
                        // Restore transition
                        setTimeout(function () {
                            toggleClass(elements.controls, config.classNames.noTransition, false);
                        }, 0);

                        // Delay a little more for keyboard users
                        var delay = _this4.touch ? 3000 : 4000;

                        // Clear timer
                        clearTimeout(timers.controls);
                        // Hide
                        timers.controls = setTimeout(function () {
                            return ui.toggleControls.call(_this4.player, false);
                        }, delay);
                    }
                });

                // Mouse wheel for volume
                bind(this.player.elements.inputs.volume, 'wheel', function (event) {
                    // Detect "natural" scroll - suppored on OS X Safari only
                    // Other browsers on OS X will be inverted until support improves
                    var inverted = event.webkitDirectionInvertedFromDevice;

                    // Get delta from event. Invert if `inverted` is true

                    var _map = [event.deltaX, -event.deltaY].map(function (value) {
                        return inverted ? -value : value;
                    }),
                        _map2 = slicedToArray(_map, 2),
                        x = _map2[0],
                        y = _map2[1];

                    // Using the biggest delta, normalize to 1 or -1 (or 0 if no delta)


                    var direction = Math.sign(Math.abs(x) > Math.abs(y) ? x : y);

                    // Change the volume by 2%
                    _this4.player.increaseVolume(direction / 50);

                    // Don't break page scrolling at max and min
                    var volume = _this4.player.media.volume;

                    if (direction === 1 && volume < 1 || direction === -1 && volume > 0) {
                        event.preventDefault();
                    }
                }, 'volume', false);
            }
        }]);
        return Listeners;
    }();

    var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule(fn, module) {
        return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var loadjs_umd = createCommonjsModule(function (module, exports) {
        (function (root, factory) {
            if (typeof undefined === 'function' && undefined.amd) {
                undefined([], factory);
            } else {
                module.exports = factory();
            }
        })(commonjsGlobal, function () {
            /**
             * Global dependencies.
             * @global {Object} document - DOM
             */

            var devnull = function devnull() {},
                bundleIdCache = {},
                bundleResultCache = {},
                bundleCallbackQueue = {};

            /**
             * Subscribe to bundle load event.
             * @param {string[]} bundleIds - Bundle ids
             * @param {Function} callbackFn - The callback function
             */
            function subscribe(bundleIds, callbackFn) {
                // listify
                bundleIds = bundleIds.push ? bundleIds : [bundleIds];

                var depsNotFound = [],
                    i = bundleIds.length,
                    numWaiting = i,
                    fn,
                    bundleId,
                    r,
                    q;

                // define callback function
                fn = function fn(bundleId, pathsNotFound) {
                    if (pathsNotFound.length) depsNotFound.push(bundleId);

                    numWaiting--;
                    if (!numWaiting) callbackFn(depsNotFound);
                };

                // register callback
                while (i--) {
                    bundleId = bundleIds[i];

                    // execute callback if in result cache
                    r = bundleResultCache[bundleId];
                    if (r) {
                        fn(bundleId, r);
                        continue;
                    }

                    // add to callback queue
                    q = bundleCallbackQueue[bundleId] = bundleCallbackQueue[bundleId] || [];
                    q.push(fn);
                }
            }

            /**
             * Publish bundle load event.
             * @param {string} bundleId - Bundle id
             * @param {string[]} pathsNotFound - List of files not found
             */
            function publish(bundleId, pathsNotFound) {
                // exit if id isn't defined
                if (!bundleId) return;

                var q = bundleCallbackQueue[bundleId];

                // cache result
                bundleResultCache[bundleId] = pathsNotFound;

                // exit if queue is empty
                if (!q) return;

                // empty callback queue
                while (q.length) {
                    q[0](bundleId, pathsNotFound);
                    q.splice(0, 1);
                }
            }

            /**
             * Execute callbacks.
             * @param {Object or Function} args - The callback args
             * @param {string[]} depsNotFound - List of dependencies not found
             */
            function executeCallbacks(args, depsNotFound) {
                // accept function as argument
                if (args.call) args = { success: args };

                // success and error callbacks
                if (depsNotFound.length) (args.error || devnull)(depsNotFound);else (args.success || devnull)(args);
            }

            /**
             * Load individual file.
             * @param {string} path - The file path
             * @param {Function} callbackFn - The callback function
             */
            function loadFile(path, callbackFn, args, numTries) {
                var doc = document,
                    async = args.async,
                    maxTries = (args.numRetries || 0) + 1,
                    beforeCallbackFn = args.before || devnull,
                    pathStripped = path.replace(/^(css|img)!/, ''),
                    isCss,
                    e;

                numTries = numTries || 0;

                if (/(^css!|\.css$)/.test(path)) {
                    isCss = true;

                    // css
                    e = doc.createElement('link');
                    e.rel = 'stylesheet';
                    e.href = pathStripped; //.replace(/^css!/, '');  // remove "css!" prefix
                } else if (/(^img!|\.(png|gif|jpg|svg)$)/.test(path)) {
                    // image
                    e = doc.createElement('img');
                    e.src = pathStripped;
                } else {
                    // javascript
                    e = doc.createElement('script');
                    e.src = path;
                    e.async = async === undefined ? true : async;
                }

                e.onload = e.onerror = e.onbeforeload = function (ev) {
                    var result = ev.type[0];

                    // Note: The following code isolates IE using `hideFocus` and treats empty
                    // stylesheets as failures to get around lack of onerror support
                    if (isCss && 'hideFocus' in e) {
                        try {
                            if (!e.sheet.cssText.length) result = 'e';
                        } catch (x) {
                            // sheets objects created from load errors don't allow access to
                            // `cssText`
                            result = 'e';
                        }
                    }

                    // handle retries in case of load failure
                    if (result == 'e') {
                        // increment counter
                        numTries += 1;

                        // exit function and try again
                        if (numTries < maxTries) {
                            return loadFile(path, callbackFn, args, numTries);
                        }
                    }

                    // execute callback
                    callbackFn(path, result, ev.defaultPrevented);
                };

                // add to document (unless callback returns `false`)
                if (beforeCallbackFn(path, e) !== false) doc.head.appendChild(e);
            }

            /**
             * Load multiple files.
             * @param {string[]} paths - The file paths
             * @param {Function} callbackFn - The callback function
             */
            function loadFiles(paths, callbackFn, args) {
                // listify paths
                paths = paths.push ? paths : [paths];

                var numWaiting = paths.length,
                    x = numWaiting,
                    pathsNotFound = [],
                    fn,
                    i;

                // define callback function
                fn = function fn(path, result, defaultPrevented) {
                    // handle error
                    if (result == 'e') pathsNotFound.push(path);

                    // handle beforeload event. If defaultPrevented then that means the load
                    // will be blocked (ex. Ghostery/ABP on Safari)
                    if (result == 'b') {
                        if (defaultPrevented) pathsNotFound.push(path);else return;
                    }

                    numWaiting--;
                    if (!numWaiting) callbackFn(pathsNotFound);
                };

                // load scripts
                for (i = 0; i < x; i++) {
                    loadFile(paths[i], fn, args);
                }
            }

            /**
             * Initiate script load and register bundle.
             * @param {(string|string[])} paths - The file paths
             * @param {(string|Function)} [arg1] - The bundleId or success callback
             * @param {Function} [arg2] - The success or error callback
             * @param {Function} [arg3] - The error callback
             */
            function loadjs(paths, arg1, arg2) {
                var bundleId, args;

                // bundleId (if string)
                if (arg1 && arg1.trim) bundleId = arg1;

                // args (default is {})
                args = (bundleId ? arg2 : arg1) || {};

                // throw error if bundle is already defined
                if (bundleId) {
                    if (bundleId in bundleIdCache) {
                        throw "LoadJS";
                    } else {
                        bundleIdCache[bundleId] = true;
                    }
                }

                // load scripts
                loadFiles(paths, function (pathsNotFound) {
                    // execute callbacks
                    executeCallbacks(args, pathsNotFound);

                    // publish bundle load event
                    publish(bundleId, pathsNotFound);
                }, args);
            }

            /**
             * Execute callbacks when dependencies have been satisfied.
             * @param {(string|string[])} deps - List of bundle ids
             * @param {Object} args - success/error arguments
             */
            loadjs.ready = function ready(deps, args) {
                // subscribe to bundle load event
                subscribe(deps, function (depsNotFound) {
                    // execute callbacks
                    executeCallbacks(args, depsNotFound);
                });

                return loadjs;
            };

            /**
             * Manually satisfy bundle dependencies.
             * @param {string} bundleId - The bundle id
             */
            loadjs.done = function done(bundleId) {
                publish(bundleId, []);
            };

            /**
             * Reset loadjs dependencies statuses
             */
            loadjs.reset = function reset() {
                bundleIdCache = {};
                bundleResultCache = {};
                bundleCallbackQueue = {};
            };

            /**
             * Determine if bundle has already been defined
             * @param String} bundleId - The bundle id
             */
            loadjs.isDefined = function isDefined(bundleId) {
                return bundleId in bundleIdCache;
            };

            // export
            return loadjs;
        });
    });

    // ==========================================================================

    function loadScript(url) {
        return new Promise(function (resolve, reject) {
            loadjs_umd(url, {
                success: resolve,
                error: reject
            });
        });
    }

    // ==========================================================================

    // Parse Vimeo ID from URL
    function parseId(url) {
        if (is.empty(url)) {
            return null;
        }

        if (is.number(Number(url))) {
            return url;
        }

        var regex = /^.*(vimeo.com\/|video\/)(\d+).*/;
        return url.match(regex) ? RegExp.$2 : url;
    }

    // Get aspect ratio for dimensions
    function getAspectRatio(width, height) {
        var getRatio = function getRatio(w, h) {
            return h === 0 ? w : getRatio(h, w % h);
        };
        var ratio = getRatio(width, height);
        return width / ratio + ':' + height / ratio;
    }

    // Set playback state and trigger change (only on actual change)
    function assurePlaybackState(play) {
        if (play && !this.embed.hasPlayed) {
            this.embed.hasPlayed = true;
        }
        if (this.media.paused === play) {
            this.media.paused = !play;
            triggerEvent.call(this, this.media, play ? 'play' : 'pause');
        }
    }

    var vimeo = {
        setup: function setup() {
            var _this = this;

            // Add embed class for responsive
            toggleClass(this.elements.wrapper, this.config.classNames.embed, true);

            // Set intial ratio
            vimeo.setAspectRatio.call(this);

            // Load the API if not already
            if (!is.object(window.Vimeo)) {
                loadScript(this.config.urls.vimeo.sdk).then(function () {
                    vimeo.ready.call(_this);
                }).catch(function (error) {
                    _this.debug.warn('Vimeo API failed to load', error);
                });
            } else {
                vimeo.ready.call(this);
            }
        },

        // Set aspect ratio
        // For Vimeo we have an extra 300% height <div> to hide the standard controls and UI
        setAspectRatio: function setAspectRatio(input) {
            var _split = (is.string(input) ? input : this.config.ratio).split(':'),
                _split2 = slicedToArray(_split, 2),
                x = _split2[0],
                y = _split2[1];

            var padding = 100 / x * y;
            this.elements.wrapper.style.paddingBottom = padding + '%';

            if (this.supported.ui) {
                var height = 240;
                var offset = (height - padding) / (height / 50);

                this.media.style.transform = 'translateY(-' + offset + '%)';
            }
        },

        // API Ready
        ready: function ready$$1() {
            var _this2 = this;

            var player = this;

            // Get Vimeo params for the iframe
            var options = {
                loop: player.config.loop.active,
                autoplay: player.autoplay,
                // muted: player.muted,
                byline: false,
                portrait: false,
                title: false,
                speed: true,
                transparent: 0,
                gesture: 'media',
                playsinline: !this.config.fullscreen.iosNative
            };
            var params = buildUrlParams(options);

            // Get the source URL or ID
            var source = player.media.getAttribute('src');

            // Get from <div> if needed
            if (is.empty(source)) {
                source = player.media.getAttribute(player.config.attributes.embed.id);
            }

            var id = parseId(source);

            // Build an iframe
            var iframe = createElement('iframe');
            var src = format(player.config.urls.vimeo.iframe, id, params);
            iframe.setAttribute('src', src);
            iframe.setAttribute('allowfullscreen', '');
            iframe.setAttribute('allowtransparency', '');
            iframe.setAttribute('allow', 'autoplay');

            // Get poster, if already set
            var poster = player.poster;

            // Inject the package

            var wrapper = createElement('div', { poster: poster, class: player.config.classNames.embedContainer });
            wrapper.appendChild(iframe);
            player.media = replaceElement(wrapper, player.media);

            // Get poster image
            fetch(format(player.config.urls.vimeo.api, id), 'json').then(function (response) {
                if (is.empty(response)) {
                    return;
                }

                // Get the URL for thumbnail
                var url = new URL(response[0].thumbnail_large);

                // Get original image
                url.pathname = url.pathname.split('_')[0] + '.jpg';

                // Set and show poster
                ui.setPoster.call(player, url.href).catch(function () {});
            });

            // Setup instance
            // https://github.com/vimeo/player.js
            player.embed = new window.Vimeo.Player(iframe, {
                autopause: player.config.autopause,
                muted: player.muted
            });

            player.media.paused = true;
            player.media.currentTime = 0;

            // Disable native text track rendering
            if (player.supported.ui) {
                player.embed.disableTextTrack();
            }

            // Create a faux HTML5 API using the Vimeo API
            player.media.play = function () {
                assurePlaybackState.call(player, true);
                return player.embed.play();
            };

            player.media.pause = function () {
                assurePlaybackState.call(player, false);
                return player.embed.pause();
            };

            player.media.stop = function () {
                player.pause();
                player.currentTime = 0;
            };

            // Seeking
            var currentTime = player.media.currentTime;

            Object.defineProperty(player.media, 'currentTime', {
                get: function get$$1() {
                    return currentTime;
                },
                set: function set$$1(time) {
                    // Vimeo will automatically play on seek if the video hasn't been played before

                    // Get current paused state and volume etc
                    var embed = player.embed,
                        media = player.media,
                        paused = player.paused,
                        volume = player.volume;

                    var restorePause = paused && !embed.hasPlayed;

                    // Set seeking state and trigger event
                    media.seeking = true;
                    triggerEvent.call(player, media, 'seeking');

                    // If paused, mute until seek is complete
                    Promise.resolve(restorePause && embed.setVolume(0))
                    // Seek
                    .then(function () {
                        return embed.setCurrentTime(time);
                    })
                    // Restore paused
                    .then(function () {
                        return restorePause && embed.pause();
                    })
                    // Restore volume
                    .then(function () {
                        return restorePause && embed.setVolume(volume);
                    }).catch(function () {
                        // Do nothing
                    });
                }
            });

            // Playback speed
            var speed = player.config.speed.selected;
            Object.defineProperty(player.media, 'playbackRate', {
                get: function get$$1() {
                    return speed;
                },
                set: function set$$1(input) {
                    player.embed.setPlaybackRate(input).then(function () {
                        speed = input;
                        triggerEvent.call(player, player.media, 'ratechange');
                    }).catch(function (error) {
                        // Hide menu item (and menu if empty)
                        if (error.name === 'Error') {
                            controls.setSpeedMenu.call(player, []);
                        }
                    });
                }
            });

            // Volume
            var volume = player.config.volume;

            Object.defineProperty(player.media, 'volume', {
                get: function get$$1() {
                    return volume;
                },
                set: function set$$1(input) {
                    player.embed.setVolume(input).then(function () {
                        volume = input;
                        triggerEvent.call(player, player.media, 'volumechange');
                    });
                }
            });

            // Muted
            var muted = player.config.muted;

            Object.defineProperty(player.media, 'muted', {
                get: function get$$1() {
                    return muted;
                },
                set: function set$$1(input) {
                    var toggle = is.boolean(input) ? input : false;

                    player.embed.setVolume(toggle ? 0 : player.config.volume).then(function () {
                        muted = toggle;
                        triggerEvent.call(player, player.media, 'volumechange');
                    });
                }
            });

            // Loop
            var loop = player.config.loop;

            Object.defineProperty(player.media, 'loop', {
                get: function get$$1() {
                    return loop;
                },
                set: function set$$1(input) {
                    var toggle = is.boolean(input) ? input : player.config.loop.active;

                    player.embed.setLoop(toggle).then(function () {
                        loop = toggle;
                    });
                }
            });

            // Source
            var currentSrc = void 0;
            player.embed.getVideoUrl().then(function (value) {
                currentSrc = value;
            }).catch(function (error) {
                _this2.debug.warn(error);
            });

            Object.defineProperty(player.media, 'currentSrc', {
                get: function get$$1() {
                    return currentSrc;
                }
            });

            // Ended
            Object.defineProperty(player.media, 'ended', {
                get: function get$$1() {
                    return player.currentTime === player.duration;
                }
            });

            // Set aspect ratio based on video size
            Promise.all([player.embed.getVideoWidth(), player.embed.getVideoHeight()]).then(function (dimensions) {
                var ratio = getAspectRatio(dimensions[0], dimensions[1]);
                vimeo.setAspectRatio.call(_this2, ratio);
            });

            // Set autopause
            player.embed.setAutopause(player.config.autopause).then(function (state) {
                player.config.autopause = state;
            });

            // Get title
            player.embed.getVideoTitle().then(function (title) {
                player.config.title = title;
                ui.setTitle.call(_this2);
            });

            // Get current time
            player.embed.getCurrentTime().then(function (value) {
                currentTime = value;
                triggerEvent.call(player, player.media, 'timeupdate');
            });

            // Get duration
            player.embed.getDuration().then(function (value) {
                player.media.duration = value;
                triggerEvent.call(player, player.media, 'durationchange');
            });

            // Get captions
            player.embed.getTextTracks().then(function (tracks) {
                player.media.textTracks = tracks;
                captions.setup.call(player);
            });

            player.embed.on('cuechange', function (_ref) {
                var _ref$cues = _ref.cues,
                    cues = _ref$cues === undefined ? [] : _ref$cues;

                var strippedCues = cues.map(function (cue) {
                    return stripHTML(cue.text);
                });
                captions.updateCues.call(player, strippedCues);
            });

            player.embed.on('loaded', function () {
                // Assure state and events are updated on autoplay
                player.embed.getPaused().then(function (paused) {
                    assurePlaybackState.call(player, !paused);
                    if (!paused) {
                        triggerEvent.call(player, player.media, 'playing');
                    }
                });

                if (is.element(player.embed.element) && player.supported.ui) {
                    var frame = player.embed.element;

                    // Fix keyboard focus issues
                    // https://github.com/sampotts/plyr/issues/317
                    frame.setAttribute('tabindex', -1);
                }
            });

            player.embed.on('play', function () {
                assurePlaybackState.call(player, true);
                triggerEvent.call(player, player.media, 'playing');
            });

            player.embed.on('pause', function () {
                assurePlaybackState.call(player, false);
            });

            player.embed.on('timeupdate', function (data) {
                player.media.seeking = false;
                currentTime = data.seconds;
                triggerEvent.call(player, player.media, 'timeupdate');
            });

            player.embed.on('progress', function (data) {
                player.media.buffered = data.percent;
                triggerEvent.call(player, player.media, 'progress');

                // Check all loaded
                if (parseInt(data.percent, 10) === 1) {
                    triggerEvent.call(player, player.media, 'canplaythrough');
                }

                // Get duration as if we do it before load, it gives an incorrect value
                // https://github.com/sampotts/plyr/issues/891
                player.embed.getDuration().then(function (value) {
                    if (value !== player.media.duration) {
                        player.media.duration = value;
                        triggerEvent.call(player, player.media, 'durationchange');
                    }
                });
            });

            player.embed.on('seeked', function () {
                player.media.seeking = false;
                triggerEvent.call(player, player.media, 'seeked');
            });

            player.embed.on('ended', function () {
                player.media.paused = true;
                triggerEvent.call(player, player.media, 'ended');
            });

            player.embed.on('error', function (detail) {
                player.media.error = detail;
                triggerEvent.call(player, player.media, 'error');
            });

            // Rebuild UI
            setTimeout(function () {
                return ui.build.call(player);
            }, 0);
        }
    };

    // ==========================================================================

    // Parse YouTube ID from URL
    function parseId$1(url) {
        if (is.empty(url)) {
            return null;
        }

        var regex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        return url.match(regex) ? RegExp.$2 : url;
    }

    // Standardise YouTube quality unit
    function mapQualityUnit(input) {
        var qualities = {
            hd2160: 2160,
            hd1440: 1440,
            hd1080: 1080,
            hd720: 720,
            large: 480,
            medium: 360,
            small: 240,
            tiny: 144
        };

        var entry = Object.entries(qualities).find(function (entry) {
            return entry.includes(input);
        });

        if (entry) {
            // Get the match corresponding to the input
            return entry.find(function (value) {
                return value !== input;
            });
        }

        return 'default';
    }

    function mapQualityUnits(levels) {
        if (is.empty(levels)) {
            return levels;
        }

        return dedupe(levels.map(function (level) {
            return mapQualityUnit(level);
        }));
    }

    // Set playback state and trigger change (only on actual change)
    function assurePlaybackState$1(play) {
        if (play && !this.embed.hasPlayed) {
            this.embed.hasPlayed = true;
        }
        if (this.media.paused === play) {
            this.media.paused = !play;
            triggerEvent.call(this, this.media, play ? 'play' : 'pause');
        }
    }

    var youtube = {
        setup: function setup() {
            var _this = this;

            // Add embed class for responsive
            toggleClass(this.elements.wrapper, this.config.classNames.embed, true);

            // Set aspect ratio
            youtube.setAspectRatio.call(this);

            // Setup API
            if (is.object(window.YT) && is.function(window.YT.Player)) {
                youtube.ready.call(this);
            } else {
                // Load the API
                loadScript(this.config.urls.youtube.sdk).catch(function (error) {
                    _this.debug.warn('YouTube API failed to load', error);
                });

                // Setup callback for the API
                // YouTube has it's own system of course...
                window.onYouTubeReadyCallbacks = window.onYouTubeReadyCallbacks || [];

                // Add to queue
                window.onYouTubeReadyCallbacks.push(function () {
                    youtube.ready.call(_this);
                });

                // Set callback to process queue
                window.onYouTubeIframeAPIReady = function () {
                    window.onYouTubeReadyCallbacks.forEach(function (callback) {
                        callback();
                    });
                };
            }
        },

        // Get the media title
        getTitle: function getTitle(videoId) {
            var _this2 = this;

            // Try via undocumented API method first
            // This method disappears now and then though...
            // https://github.com/sampotts/plyr/issues/709
            if (is.function(this.embed.getVideoData)) {
                var _embed$getVideoData = this.embed.getVideoData(),
                    title = _embed$getVideoData.title;

                if (is.empty(title)) {
                    this.config.title = title;
                    ui.setTitle.call(this);
                    return;
                }
            }

            // Or via Google API
            var key = this.config.keys.google;
            if (is.string(key) && !is.empty(key)) {
                var url = format(this.config.urls.youtube.api, videoId, key);

                fetch(url).then(function (result) {
                    if (is.object(result)) {
                        _this2.config.title = result.items[0].snippet.title;
                        ui.setTitle.call(_this2);
                    }
                }).catch(function () {});
            }
        },

        // Set aspect ratio
        setAspectRatio: function setAspectRatio() {
            var ratio = this.config.ratio.split(':');
            this.elements.wrapper.style.paddingBottom = 100 / ratio[0] * ratio[1] + '%';
        },

        // API ready
        ready: function ready$$1() {
            var player = this;

            // Ignore already setup (race condition)
            var currentId = player.media.getAttribute('id');
            if (!is.empty(currentId) && currentId.startsWith('youtube-')) {
                return;
            }

            // Get the source URL or ID
            var source = player.media.getAttribute('src');

            // Get from <div> if needed
            if (is.empty(source)) {
                source = player.media.getAttribute(this.config.attributes.embed.id);
            }

            // Replace the <iframe> with a <div> due to YouTube API issues
            var videoId = parseId$1(source);
            var id = generateId(player.provider);

            // Get poster, if already set
            var poster = player.poster;

            // Replace media element

            var container = createElement('div', { id: id, poster: poster });
            player.media = replaceElement(container, player.media);

            // Id to poster wrapper
            var posterSrc = function posterSrc(format$$1) {
                return 'https://img.youtube.com/vi/' + videoId + '/' + format$$1 + 'default.jpg';
            };

            // Check thumbnail images in order of quality, but reject fallback thumbnails (120px wide)
            loadImage(posterSrc('maxres'), 121) // Higest quality and unpadded
            .catch(function () {
                return loadImage(posterSrc('sd'), 121);
            }) // 480p padded 4:3
            .catch(function () {
                return loadImage(posterSrc('hq'));
            }) // 360p padded 4:3. Always exists
            .then(function (image) {
                return ui.setPoster.call(player, image.src);
            }).then(function (posterSrc) {
                // If the image is padded, use background-size "cover" instead (like youtube does too with their posters)
                if (!posterSrc.includes('maxres')) {
                    player.elements.poster.style.backgroundSize = 'cover';
                }
            }).catch(function () {});

            // Setup instance
            // https://developers.google.com/youtube/iframe_api_reference
            player.embed = new window.YT.Player(id, {
                videoId: videoId,
                playerVars: {
                    autoplay: player.config.autoplay ? 1 : 0, // Autoplay
                    controls: player.supported.ui ? 0 : 1, // Only show controls if not fully supported
                    rel: 0, // No related vids
                    showinfo: 0, // Hide info
                    iv_load_policy: 3, // Hide annotations
                    modestbranding: 1, // Hide logos as much as possible (they still show one in the corner when paused)
                    disablekb: 1, // Disable keyboard as we handle it
                    playsinline: 1, // Allow iOS inline playback

                    // Tracking for stats
                    // origin: window ? `${window.location.protocol}//${window.location.host}` : null,
                    widget_referrer: window ? window.location.href : null,

                    // Captions are flaky on YouTube
                    cc_load_policy: player.captions.active ? 1 : 0,
                    cc_lang_pref: player.config.captions.language
                },
                events: {
                    onError: function onError(event) {
                        // YouTube may fire onError twice, so only handle it once
                        if (!player.media.error) {
                            var code = event.data;
                            // Messages copied from https://developers.google.com/youtube/iframe_api_reference#onError
                            var message = {
                                2: 'The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.',
                                5: 'The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.',
                                100: 'The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.',
                                101: 'The owner of the requested video does not allow it to be played in embedded players.',
                                150: 'The owner of the requested video does not allow it to be played in embedded players.'
                            }[code] || 'An unknown error occured';

                            player.media.error = { code: code, message: message };

                            triggerEvent.call(player, player.media, 'error');
                        }
                    },
                    onPlaybackQualityChange: function onPlaybackQualityChange() {
                        triggerEvent.call(player, player.media, 'qualitychange', false, {
                            quality: player.media.quality
                        });
                    },
                    onPlaybackRateChange: function onPlaybackRateChange(event) {
                        // Get the instance
                        var instance = event.target;

                        // Get current speed
                        player.media.playbackRate = instance.getPlaybackRate();

                        triggerEvent.call(player, player.media, 'ratechange');
                    },
                    onReady: function onReady(event) {
                        // Get the instance
                        var instance = event.target;

                        // Get the title
                        youtube.getTitle.call(player, videoId);

                        // Create a faux HTML5 API using the YouTube API
                        player.media.play = function () {
                            assurePlaybackState$1.call(player, true);
                            instance.playVideo();
                        };

                        player.media.pause = function () {
                            assurePlaybackState$1.call(player, false);
                            instance.pauseVideo();
                        };

                        player.media.stop = function () {
                            instance.stopVideo();
                        };

                        player.media.duration = instance.getDuration();
                        player.media.paused = true;

                        // Seeking
                        player.media.currentTime = 0;
                        Object.defineProperty(player.media, 'currentTime', {
                            get: function get() {
                                return Number(instance.getCurrentTime());
                            },
                            set: function set(time) {
                                // If paused and never played, mute audio preventively (YouTube starts playing on seek if the video hasn't been played yet).
                                if (player.paused && !player.embed.hasPlayed) {
                                    player.embed.mute();
                                }

                                // Set seeking state and trigger event
                                player.media.seeking = true;
                                triggerEvent.call(player, player.media, 'seeking');

                                // Seek after events sent
                                instance.seekTo(time);
                            }
                        });

                        // Playback speed
                        Object.defineProperty(player.media, 'playbackRate', {
                            get: function get() {
                                return instance.getPlaybackRate();
                            },
                            set: function set(input) {
                                instance.setPlaybackRate(input);
                            }
                        });

                        // Quality
                        Object.defineProperty(player.media, 'quality', {
                            get: function get() {
                                return mapQualityUnit(instance.getPlaybackQuality());
                            },
                            set: function set(input) {
                                instance.setPlaybackQuality(mapQualityUnit(input));
                            }
                        });

                        // Volume
                        var volume = player.config.volume;

                        Object.defineProperty(player.media, 'volume', {
                            get: function get() {
                                return volume;
                            },
                            set: function set(input) {
                                volume = input;
                                instance.setVolume(volume * 100);
                                triggerEvent.call(player, player.media, 'volumechange');
                            }
                        });

                        // Muted
                        var muted = player.config.muted;

                        Object.defineProperty(player.media, 'muted', {
                            get: function get() {
                                return muted;
                            },
                            set: function set(input) {
                                var toggle = is.boolean(input) ? input : muted;
                                muted = toggle;
                                instance[toggle ? 'mute' : 'unMute']();
                                triggerEvent.call(player, player.media, 'volumechange');
                            }
                        });

                        // Source
                        Object.defineProperty(player.media, 'currentSrc', {
                            get: function get() {
                                return instance.getVideoUrl();
                            }
                        });

                        // Ended
                        Object.defineProperty(player.media, 'ended', {
                            get: function get() {
                                return player.currentTime === player.duration;
                            }
                        });

                        // Get available speeds
                        player.options.speed = instance.getAvailablePlaybackRates();

                        // Set the tabindex to avoid focus entering iframe
                        if (player.supported.ui) {
                            player.media.setAttribute('tabindex', -1);
                        }

                        triggerEvent.call(player, player.media, 'timeupdate');
                        triggerEvent.call(player, player.media, 'durationchange');

                        // Reset timer
                        clearInterval(player.timers.buffering);

                        // Setup buffering
                        player.timers.buffering = setInterval(function () {
                            // Get loaded % from YouTube
                            player.media.buffered = instance.getVideoLoadedFraction();

                            // Trigger progress only when we actually buffer something
                            if (player.media.lastBuffered === null || player.media.lastBuffered < player.media.buffered) {
                                triggerEvent.call(player, player.media, 'progress');
                            }

                            // Set last buffer point
                            player.media.lastBuffered = player.media.buffered;

                            // Bail if we're at 100%
                            if (player.media.buffered === 1) {
                                clearInterval(player.timers.buffering);

                                // Trigger event
                                triggerEvent.call(player, player.media, 'canplaythrough');
                            }
                        }, 200);

                        // Rebuild UI
                        setTimeout(function () {
                            return ui.build.call(player);
                        }, 50);
                    },
                    onStateChange: function onStateChange(event) {
                        // Get the instance
                        var instance = event.target;

                        // Reset timer
                        clearInterval(player.timers.playing);

                        var seeked = player.media.seeking && [1, 2].includes(event.data);

                        if (seeked) {
                            // Unset seeking and fire seeked event
                            player.media.seeking = false;
                            triggerEvent.call(player, player.media, 'seeked');
                        }

                        // Handle events
                        // -1   Unstarted
                        // 0    Ended
                        // 1    Playing
                        // 2    Paused
                        // 3    Buffering
                        // 5    Video cued
                        switch (event.data) {
                            case -1:
                                // Update scrubber
                                triggerEvent.call(player, player.media, 'timeupdate');

                                // Get loaded % from YouTube
                                player.media.buffered = instance.getVideoLoadedFraction();
                                triggerEvent.call(player, player.media, 'progress');

                                break;

                            case 0:
                                assurePlaybackState$1.call(player, false);

                                // YouTube doesn't support loop for a single video, so mimick it.
                                if (player.media.loop) {
                                    // YouTube needs a call to `stopVideo` before playing again
                                    instance.stopVideo();
                                    instance.playVideo();
                                } else {
                                    triggerEvent.call(player, player.media, 'ended');
                                }

                                break;

                            case 1:
                                // Restore paused state (YouTube starts playing on seek if the video hasn't been played yet)
                                if (player.media.paused && !player.embed.hasPlayed) {
                                    player.media.pause();
                                } else {
                                    assurePlaybackState$1.call(player, true);

                                    triggerEvent.call(player, player.media, 'playing');

                                    // Poll to get playback progress
                                    player.timers.playing = setInterval(function () {
                                        triggerEvent.call(player, player.media, 'timeupdate');
                                    }, 50);

                                    // Check duration again due to YouTube bug
                                    // https://github.com/sampotts/plyr/issues/374
                                    // https://code.google.com/p/gdata-issues/issues/detail?id=8690
                                    if (player.media.duration !== instance.getDuration()) {
                                        player.media.duration = instance.getDuration();
                                        triggerEvent.call(player, player.media, 'durationchange');
                                    }

                                    // Get quality
                                    controls.setQualityMenu.call(player, mapQualityUnits(instance.getAvailableQualityLevels()));
                                }

                                break;

                            case 2:
                                // Restore audio (YouTube starts playing on seek if the video hasn't been played yet)
                                if (!player.muted) {
                                    player.embed.unMute();
                                }
                                assurePlaybackState$1.call(player, false);

                                break;

                            default:
                                break;
                        }

                        triggerEvent.call(player, player.elements.container, 'statechange', false, {
                            code: event.data
                        });
                    }
                }
            });
        }
    };

    // ==========================================================================

    var media = {
        // Setup media
        setup: function setup() {
            // If there's no media, bail
            if (!this.media) {
                this.debug.warn('No media element found!');
                return;
            }

            // Add type class
            toggleClass(this.elements.container, this.config.classNames.type.replace('{0}', this.type), true);

            // Add provider class
            toggleClass(this.elements.container, this.config.classNames.provider.replace('{0}', this.provider), true);

            // Add video class for embeds
            // This will require changes if audio embeds are added
            if (this.isEmbed) {
                toggleClass(this.elements.container, this.config.classNames.type.replace('{0}', 'video'), true);
            }

            // Inject the player wrapper
            if (this.isVideo) {
                // Create the wrapper div
                this.elements.wrapper = createElement('div', {
                    class: this.config.classNames.video
                });

                // Wrap the video in a container
                wrap(this.media, this.elements.wrapper);

                // Faux poster container
                this.elements.poster = createElement('div', {
                    class: this.config.classNames.poster
                });

                this.elements.wrapper.appendChild(this.elements.poster);
            }

            if (this.isHTML5) {
                html5.extend.call(this);
            } else if (this.isYouTube) {
                youtube.setup.call(this);
            } else if (this.isVimeo) {
                vimeo.setup.call(this);
            }
        }
    };

    // ==========================================================================

    var Ads = function () {
        /**
         * Ads constructor.
         * @param {object} player
         * @return {Ads}
         */
        function Ads(player) {
            var _this = this;

            classCallCheck(this, Ads);

            this.player = player;
            this.publisherId = player.config.ads.publisherId;
            this.playing = false;
            this.initialized = false;
            this.elements = {
                container: null,
                displayContainer: null
            };
            this.manager = null;
            this.loader = null;
            this.cuePoints = null;
            this.events = {};
            this.safetyTimer = null;
            this.countdownTimer = null;

            // Setup a promise to resolve when the IMA manager is ready
            this.managerPromise = new Promise(function (resolve, reject) {
                // The ad is loaded and ready
                _this.on('loaded', resolve);

                // Ads failed
                _this.on('error', reject);
            });

            this.load();
        }

        createClass(Ads, [{
            key: 'load',

            /**
             * Load the IMA SDK
             */
            value: function load() {
                var _this2 = this;

                if (this.enabled) {
                    // Check if the Google IMA3 SDK is loaded or load it ourselves
                    if (!is.object(window.google) || !is.object(window.google.ima)) {
                        loadScript(this.player.config.urls.googleIMA.sdk).then(function () {
                            _this2.ready();
                        }).catch(function () {
                            // Script failed to load or is blocked
                            _this2.trigger('error', new Error('Google IMA SDK failed to load'));
                        });
                    } else {
                        this.ready();
                    }
                }
            }

            /**
             * Get the ads instance ready
             */

        }, {
            key: 'ready',
            value: function ready$$1() {
                var _this3 = this;

                // Start ticking our safety timer. If the whole advertisement
                // thing doesn't resolve within our set time; we bail
                this.startSafetyTimer(12000, 'ready()');

                // Clear the safety timer
                this.managerPromise.then(function () {
                    _this3.clearSafetyTimer('onAdsManagerLoaded()');
                });

                // Set listeners on the Plyr instance
                this.listeners();

                // Setup the IMA SDK
                this.setupIMA();
            }

            // Build the default tag URL

        }, {
            key: 'setupIMA',

            /**
             * In order for the SDK to display ads for our video, we need to tell it where to put them,
             * so here we define our ad container. This div is set up to render on top of the video player.
             * Using the code below, we tell the SDK to render ads within that div. We also provide a
             * handle to the content video player - the SDK will poll the current time of our player to
             * properly place mid-rolls. After we create the ad display container, we initialize it. On
             * mobile devices, this initialization is done as the result of a user action.
             */
            value: function setupIMA() {
                // Create the container for our advertisements
                this.elements.container = createElement('div', {
                    class: this.player.config.classNames.ads
                });
                this.player.elements.container.appendChild(this.elements.container);

                // So we can run VPAID2
                google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED);

                // Set language
                google.ima.settings.setLocale(this.player.config.ads.language);

                // We assume the adContainer is the video container of the plyr element
                // that will house the ads
                this.elements.displayContainer = new google.ima.AdDisplayContainer(this.elements.container);

                // Request video ads to be pre-loaded
                this.requestAds();
            }

            /**
             * Request advertisements
             */

        }, {
            key: 'requestAds',
            value: function requestAds() {
                var _this4 = this;

                var container = this.player.elements.container;

                try {
                    // Create ads loader
                    this.loader = new google.ima.AdsLoader(this.elements.displayContainer);

                    // Listen and respond to ads loaded and error events
                    this.loader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, function (event) {
                        return _this4.onAdsManagerLoaded(event);
                    }, false);
                    this.loader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, function (error) {
                        return _this4.onAdError(error);
                    }, false);

                    // Request video ads
                    var request = new google.ima.AdsRequest();
                    request.adTagUrl = this.tagUrl;

                    // Specify the linear and nonlinear slot sizes. This helps the SDK
                    // to select the correct creative if multiple are returned
                    request.linearAdSlotWidth = container.offsetWidth;
                    request.linearAdSlotHeight = container.offsetHeight;
                    request.nonLinearAdSlotWidth = container.offsetWidth;
                    request.nonLinearAdSlotHeight = container.offsetHeight;

                    // We only overlay ads as we only support video.
                    request.forceNonLinearFullSlot = false;

                    // Mute based on current state
                    request.setAdWillPlayMuted(!this.player.muted);

                    this.loader.requestAds(request);
                } catch (e) {
                    this.onAdError(e);
                }
            }

            /**
             * Update the ad countdown
             * @param {boolean} start
             */

        }, {
            key: 'pollCountdown',
            value: function pollCountdown() {
                var _this5 = this;

                var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

                if (!start) {
                    clearInterval(this.countdownTimer);
                    this.elements.container.removeAttribute('data-badge-text');
                    return;
                }

                var update = function update() {
                    var time = formatTime(Math.max(_this5.manager.getRemainingTime(), 0));
                    var label = i18n.get('advertisement', _this5.player.config) + ' - ' + time;
                    _this5.elements.container.setAttribute('data-badge-text', label);
                };

                this.countdownTimer = setInterval(update, 100);
            }

            /**
             * This method is called whenever the ads are ready inside the AdDisplayContainer
             * @param {Event} adsManagerLoadedEvent
             */

        }, {
            key: 'onAdsManagerLoaded',
            value: function onAdsManagerLoaded(event) {
                var _this6 = this;

                // Get the ads manager
                var settings = new google.ima.AdsRenderingSettings();

                // Tell the SDK to save and restore content video state on our behalf
                settings.restoreCustomPlaybackStateOnAdBreakComplete = true;
                settings.enablePreloading = true;

                // The SDK is polling currentTime on the contentPlayback. And needs a duration
                // so it can determine when to start the mid- and post-roll
                this.manager = event.getAdsManager(this.player, settings);

                // Get the cue points for any mid-rolls by filtering out the pre- and post-roll
                this.cuePoints = this.manager.getCuePoints();

                // Add advertisement cue's within the time line if available
                if (!is.empty(this.cuePoints)) {
                    this.cuePoints.forEach(function (cuePoint) {
                        if (cuePoint !== 0 && cuePoint !== -1 && cuePoint < _this6.player.duration) {
                            var seekElement = _this6.player.elements.progress;

                            if (is.element(seekElement)) {
                                var cuePercentage = 100 / _this6.player.duration * cuePoint;
                                var cue = createElement('span', {
                                    class: _this6.player.config.classNames.cues
                                });

                                cue.style.left = cuePercentage.toString() + '%';
                                seekElement.appendChild(cue);
                            }
                        }
                    });
                }

                // Get skippable state
                // TODO: Skip button
                // this.player.debug.warn(this.manager.getAdSkippableState());

                // Set volume to match player
                this.manager.setVolume(this.player.volume);

                // Add listeners to the required events
                // Advertisement error events
                this.manager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, function (error) {
                    return _this6.onAdError(error);
                });

                // Advertisement regular events
                Object.keys(google.ima.AdEvent.Type).forEach(function (type) {
                    _this6.manager.addEventListener(google.ima.AdEvent.Type[type], function (event) {
                        return _this6.onAdEvent(event);
                    });
                });

                // Resolve our adsManager
                this.trigger('loaded');
            }

            /**
             * This is where all the event handling takes place. Retrieve the ad from the event. Some
             * events (e.g. ALL_ADS_COMPLETED) don't have the ad object associated
             * https://developers.google.com/interactive-media-ads/docs/sdks/html5/v3/apis#ima.AdEvent.Type
             * @param {Event} event
             */

        }, {
            key: 'onAdEvent',
            value: function onAdEvent(event) {
                var _this7 = this;

                var container = this.player.elements.container;

                // Retrieve the ad from the event. Some events (e.g. ALL_ADS_COMPLETED)
                // don't have ad object associated

                var ad = event.getAd();

                // Proxy event
                var dispatchEvent = function dispatchEvent(type) {
                    var event = 'ads' + type.replace(/_/g, '').toLowerCase();
                    triggerEvent.call(_this7.player, _this7.player.media, event);
                };

                switch (event.type) {
                    case google.ima.AdEvent.Type.LOADED:
                        // This is the first event sent for an ad - it is possible to determine whether the
                        // ad is a video ad or an overlay
                        this.trigger('loaded');

                        // Bubble event
                        dispatchEvent(event.type);

                        // Start countdown
                        this.pollCountdown(true);

                        if (!ad.isLinear()) {
                            // Position AdDisplayContainer correctly for overlay
                            ad.width = container.offsetWidth;
                            ad.height = container.offsetHeight;
                        }

                        // console.info('Ad type: ' + event.getAd().getAdPodInfo().getPodIndex());
                        // console.info('Ad time: ' + event.getAd().getAdPodInfo().getTimeOffset());
                        break;

                    case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
                        // All ads for the current videos are done. We can now request new advertisements
                        // in case the video is re-played

                        // Fire event
                        dispatchEvent(event.type);

                        // TODO: Example for what happens when a next video in a playlist would be loaded.
                        // So here we load a new video when all ads are done.
                        // Then we load new ads within a new adsManager. When the video
                        // Is started - after - the ads are loaded, then we get ads.
                        // You can also easily test cancelling and reloading by running
                        // player.ads.cancel() and player.ads.play from the console I guess.
                        // this.player.source = {
                        //     type: 'video',
                        //     title: 'View From A Blue Moon',
                        //     sources: [{
                        //         src:
                        // 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.mp4', type:
                        // 'video/mp4', }], poster:
                        // 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg', tracks:
                        // [ { kind: 'captions', label: 'English', srclang: 'en', src:
                        // 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt',
                        // default: true, }, { kind: 'captions', label: 'French', srclang: 'fr', src:
                        // 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt', }, ],
                        // };

                        // TODO: So there is still this thing where a video should only be allowed to start
                        // playing when the IMA SDK is ready or has failed

                        this.loadAds();
                        break;

                    case google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED:
                        // This event indicates the ad has started - the video player can adjust the UI,
                        // for example display a pause button and remaining time. Fired when content should
                        // be paused. This usually happens right before an ad is about to cover the content

                        dispatchEvent(event.type);

                        this.pauseContent();

                        break;

                    case google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED:
                        // This event indicates the ad has finished - the video player can perform
                        // appropriate UI actions, such as removing the timer for remaining time detection.
                        // Fired when content should be resumed. This usually happens when an ad finishes
                        // or collapses

                        dispatchEvent(event.type);

                        this.pollCountdown();

                        this.resumeContent();

                        break;

                    case google.ima.AdEvent.Type.STARTED:
                    case google.ima.AdEvent.Type.MIDPOINT:
                    case google.ima.AdEvent.Type.COMPLETE:
                    case google.ima.AdEvent.Type.IMPRESSION:
                    case google.ima.AdEvent.Type.CLICK:
                        dispatchEvent(event.type);
                        break;

                    default:
                        break;
                }
            }

            /**
             * Any ad error handling comes through here
             * @param {Event} event
             */

        }, {
            key: 'onAdError',
            value: function onAdError(event) {
                this.cancel();
                this.player.debug.warn('Ads error', event);
            }

            /**
             * Setup hooks for Plyr and window events. This ensures
             * the mid- and post-roll launch at the correct time. And
             * resize the advertisement when the player resizes
             */

        }, {
            key: 'listeners',
            value: function listeners() {
                var _this8 = this;

                var container = this.player.elements.container;

                var time = void 0;

                // Add listeners to the required events
                this.player.on('ended', function () {
                    _this8.loader.contentComplete();
                });

                this.player.on('seeking', function () {
                    time = _this8.player.currentTime;
                    return time;
                });

                this.player.on('seeked', function () {
                    var seekedTime = _this8.player.currentTime;

                    if (is.empty(_this8.cuePoints)) {
                        return;
                    }

                    _this8.cuePoints.forEach(function (cuePoint, index) {
                        if (time < cuePoint && cuePoint < seekedTime) {
                            _this8.manager.discardAdBreak();
                            _this8.cuePoints.splice(index, 1);
                        }
                    });
                });

                // Listen to the resizing of the window. And resize ad accordingly
                // TODO: eventually implement ResizeObserver
                window.addEventListener('resize', function () {
                    if (_this8.manager) {
                        _this8.manager.resize(container.offsetWidth, container.offsetHeight, google.ima.ViewMode.NORMAL);
                    }
                });
            }

            /**
             * Initialize the adsManager and start playing advertisements
             */

        }, {
            key: 'play',
            value: function play() {
                var _this9 = this;

                var container = this.player.elements.container;

                if (!this.managerPromise) {
                    this.resumeContent();
                }

                // Play the requested advertisement whenever the adsManager is ready
                this.managerPromise.then(function () {
                    // Initialize the container. Must be done via a user action on mobile devices
                    _this9.elements.displayContainer.initialize();

                    try {
                        if (!_this9.initialized) {
                            // Initialize the ads manager. Ad rules playlist will start at this time
                            _this9.manager.init(container.offsetWidth, container.offsetHeight, google.ima.ViewMode.NORMAL);

                            // Call play to start showing the ad. Single video and overlay ads will
                            // start at this time; the call will be ignored for ad rules
                            _this9.manager.start();
                        }

                        _this9.initialized = true;
                    } catch (adError) {
                        // An error may be thrown if there was a problem with the
                        // VAST response
                        _this9.onAdError(adError);
                    }
                }).catch(function () {});
            }

            /**
             * Resume our video
             */

        }, {
            key: 'resumeContent',
            value: function resumeContent() {
                // Hide the advertisement container
                this.elements.container.style.zIndex = '';

                // Ad is stopped
                this.playing = false;

                // Play our video
                if (this.player.currentTime < this.player.duration) {
                    this.player.play();
                }
            }

            /**
             * Pause our video
             */

        }, {
            key: 'pauseContent',
            value: function pauseContent() {
                // Show the advertisement container
                this.elements.container.style.zIndex = 3;

                // Ad is playing.
                this.playing = true;

                // Pause our video.
                this.player.pause();
            }

            /**
             * Destroy the adsManager so we can grab new ads after this. If we don't then we're not
             * allowed to call new ads based on google policies, as they interpret this as an accidental
             * video requests. https://developers.google.com/interactive-
             * media-ads/docs/sdks/android/faq#8
             */

        }, {
            key: 'cancel',
            value: function cancel() {
                // Pause our video
                if (this.initialized) {
                    this.resumeContent();
                }

                // Tell our instance that we're done for now
                this.trigger('error');

                // Re-create our adsManager
                this.loadAds();
            }

            /**
             * Re-create our adsManager
             */

        }, {
            key: 'loadAds',
            value: function loadAds() {
                var _this10 = this;

                // Tell our adsManager to go bye bye
                this.managerPromise.then(function () {
                    // Destroy our adsManager
                    if (_this10.manager) {
                        _this10.manager.destroy();
                    }

                    // Re-set our adsManager promises
                    _this10.managerPromise = new Promise(function (resolve) {
                        _this10.on('loaded', resolve);
                        _this10.player.debug.log(_this10.manager);
                    });

                    // Now request some new advertisements
                    _this10.requestAds();
                }).catch(function () {});
            }

            /**
             * Handles callbacks after an ad event was invoked
             * @param {string} event - Event type
             */

        }, {
            key: 'trigger',
            value: function trigger(event) {
                var _this11 = this;

                for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    args[_key - 1] = arguments[_key];
                }

                var handlers = this.events[event];

                if (is.array(handlers)) {
                    handlers.forEach(function (handler) {
                        if (is.function(handler)) {
                            handler.apply(_this11, args);
                        }
                    });
                }
            }

            /**
             * Add event listeners
             * @param {string} event - Event type
             * @param {function} callback - Callback for when event occurs
             * @return {Ads}
             */

        }, {
            key: 'on',
            value: function on$$1(event, callback) {
                if (!is.array(this.events[event])) {
                    this.events[event] = [];
                }

                this.events[event].push(callback);

                return this;
            }

            /**
             * Setup a safety timer for when the ad network doesn't respond for whatever reason.
             * The advertisement has 12 seconds to get its things together. We stop this timer when the
             * advertisement is playing, or when a user action is required to start, then we clear the
             * timer on ad ready
             * @param {number} time
             * @param {string} from
             */

        }, {
            key: 'startSafetyTimer',
            value: function startSafetyTimer(time, from) {
                var _this12 = this;

                this.player.debug.log('Safety timer invoked from: ' + from);

                this.safetyTimer = setTimeout(function () {
                    _this12.cancel();
                    _this12.clearSafetyTimer('startSafetyTimer()');
                }, time);
            }

            /**
             * Clear our safety timer(s)
             * @param {string} from
             */

        }, {
            key: 'clearSafetyTimer',
            value: function clearSafetyTimer(from) {
                if (!is.nullOrUndefined(this.safetyTimer)) {
                    this.player.debug.log('Safety timer cleared from: ' + from);

                    clearTimeout(this.safetyTimer);
                    this.safetyTimer = null;
                }
            }
        }, {
            key: 'enabled',
            get: function get$$1() {
                return this.player.isHTML5 && this.player.isVideo && this.player.config.ads.enabled && !is.empty(this.publisherId);
            }
        }, {
            key: 'tagUrl',
            get: function get$$1() {
                var params = {
                    AV_PUBLISHERID: '58c25bb0073ef448b1087ad6',
                    AV_CHANNELID: '5a0458dc28a06145e4519d21',
                    AV_URL: window.location.hostname,
                    cb: Date.now(),
                    AV_WIDTH: 640,
                    AV_HEIGHT: 480,
                    AV_CDIM2: this.publisherId
                };

                var base = 'https://go.aniview.com/api/adserver6/vast/';

                return base + '?' + buildUrlParams(params);
            }
        }]);
        return Ads;
    }();

    // ==========================================================================

    var source = {
        // Add elements to HTML5 media (source, tracks, etc)
        insertElements: function insertElements(type, attributes) {
            var _this = this;

            if (is.string(attributes)) {
                insertElement(type, this.media, {
                    src: attributes
                });
            } else if (is.array(attributes)) {
                attributes.forEach(function (attribute) {
                    insertElement(type, _this.media, attribute);
                });
            }
        },

        // Update source
        // Sources are not checked for support so be careful
        change: function change(input) {
            var _this2 = this;

            if (!getDeep(input, 'sources.length')) {
                this.debug.warn('Invalid source format');
                return;
            }

            // Cancel current network requests
            html5.cancelRequests.call(this);

            // Destroy instance and re-setup
            this.destroy.call(this, function () {
                // Reset quality options
                _this2.options.quality = [];

                // Remove elements
                removeElement(_this2.media);
                _this2.media = null;

                // Reset class name
                if (is.element(_this2.elements.container)) {
                    _this2.elements.container.removeAttribute('class');
                }

                // Set the type and provider
                var sources = input.sources,
                    type = input.type;

                var _sources = slicedToArray(sources, 1),
                    _sources$ = _sources[0],
                    _sources$$provider = _sources$.provider,
                    provider = _sources$$provider === undefined ? providers.html5 : _sources$$provider,
                    src = _sources$.src;

                var tagName = provider === 'html5' ? type : 'div';
                var attributes = provider === 'html5' ? {} : { src: src };

                Object.assign(_this2, {
                    provider: provider,
                    type: type,
                    // Check for support
                    supported: support.check(type, provider, _this2.config.playsinline),
                    // Create new element
                    media: createElement(tagName, attributes)
                });

                // Inject the new element
                _this2.elements.container.appendChild(_this2.media);

                // Autoplay the new source?
                if (is.boolean(input.autoplay)) {
                    _this2.config.autoplay = input.autoplay;
                }

                // Set attributes for audio and video
                if (_this2.isHTML5) {
                    if (_this2.config.crossorigin) {
                        _this2.media.setAttribute('crossorigin', '');
                    }
                    if (_this2.config.autoplay) {
                        _this2.media.setAttribute('autoplay', '');
                    }
                    if (!is.empty(input.poster)) {
                        _this2.poster = input.poster;
                    }
                    if (_this2.config.loop.active) {
                        _this2.media.setAttribute('loop', '');
                    }
                    if (_this2.config.muted) {
                        _this2.media.setAttribute('muted', '');
                    }
                    if (_this2.config.playsinline) {
                        _this2.media.setAttribute('playsinline', '');
                    }
                }

                // Restore class hook
                ui.addStyleHook.call(_this2);

                // Set new sources for html5
                if (_this2.isHTML5) {
                    source.insertElements.call(_this2, 'source', sources);
                }

                // Set video title
                _this2.config.title = input.title;

                // Set up from scratch
                media.setup.call(_this2);

                // HTML5 stuff
                if (_this2.isHTML5) {
                    // Setup captions
                    if ('tracks' in input) {
                        source.insertElements.call(_this2, 'track', input.tracks);
                    }

                    // Load HTML5 sources
                    _this2.media.load();
                }

                // If HTML5 or embed but not fully supported, setupInterface and call ready now
                if (_this2.isHTML5 || _this2.isEmbed && !_this2.supported.ui) {
                    // Setup interface
                    ui.build.call(_this2);
                }

                // Update the fullscreen support
                _this2.fullscreen.update();
            }, true);
        }
    };

    // ==========================================================================

    // Private properties
    // TODO: Use a WeakMap for private globals
    // const globals = new WeakMap();

    // Plyr instance

    var Plyr = function () {
        function Plyr(target, options) {
            var _this = this;

            classCallCheck(this, Plyr);

            this.timers = {};

            // State
            this.ready = false;
            this.loading = false;
            this.failed = false;

            // Touch device
            this.touch = support.touch;

            // Set the media element
            this.media = target;

            // String selector passed
            if (is.string(this.media)) {
                this.media = document.querySelectorAll(this.media);
            }

            // jQuery, NodeList or Array passed, use first element
            if (window.jQuery && this.media instanceof jQuery || is.nodeList(this.media) || is.array(this.media)) {
                // eslint-disable-next-line
                this.media = this.media[0];
            }

            // Set config
            this.config = extend({}, defaults$1, Plyr.defaults, options || {}, function () {
                try {
                    return JSON.parse(_this.media.getAttribute('data-plyr-config'));
                } catch (e) {
                    return {};
                }
            }());

            // Elements cache
            this.elements = {
                container: null,
                buttons: {},
                display: {},
                progress: {},
                inputs: {},
                settings: {
                    menu: null,
                    panes: {},
                    tabs: {}
                },
                captions: null
            };

            // Captions
            this.captions = {
                active: null,
                currentTrack: -1,
                meta: new WeakMap()
            };

            // Fullscreen
            this.fullscreen = {
                active: false
            };

            // Options
            this.options = {
                speed: [],
                quality: []
            };

            // Debugging
            // TODO: move to globals
            this.debug = new Console(this.config.debug);

            // Log config options and support
            this.debug.log('Config', this.config);
            this.debug.log('Support', support);

            // We need an element to setup
            if (is.nullOrUndefined(this.media) || !is.element(this.media)) {
                this.debug.error('Setup failed: no suitable element passed');
                return;
            }

            // Bail if the element is initialized
            if (this.media.plyr) {
                this.debug.warn('Target already setup');
                return;
            }

            // Bail if not enabled
            if (!this.config.enabled) {
                this.debug.error('Setup failed: disabled by config');
                return;
            }

            // Bail if disabled or no basic support
            // You may want to disable certain UAs etc
            if (!support.check().api) {
                this.debug.error('Setup failed: no support');
                return;
            }

            // Cache original element state for .destroy()
            var clone = this.media.cloneNode(true);
            clone.autoplay = false;
            this.elements.original = clone;

            // Set media type based on tag or data attribute
            // Supported: video, audio, vimeo, youtube
            var type = this.media.tagName.toLowerCase();

            // Embed properties
            var iframe = null;
            var url = null;

            // Different setup based on type
            switch (type) {
                case 'div':
                    // Find the frame
                    iframe = this.media.querySelector('iframe');

                    // <iframe> type
                    if (is.element(iframe)) {
                        // Detect provider
                        url = parseUrl(iframe.getAttribute('src'));
                        this.provider = getProviderByUrl(url.toString());

                        // Rework elements
                        this.elements.container = this.media;
                        this.media = iframe;

                        // Reset classname
                        this.elements.container.className = '';

                        // Get attributes from URL and set config
                        if (url.searchParams.length) {
                            var truthy = ['1', 'true'];

                            if (truthy.includes(url.searchParams.get('autoplay'))) {
                                this.config.autoplay = true;
                            }
                            if (truthy.includes(url.searchParams.get('loop'))) {
                                this.config.loop.active = true;
                            }

                            // TODO: replace fullscreen.iosNative with this playsinline config option
                            // YouTube requires the playsinline in the URL
                            if (this.isYouTube) {
                                this.config.playsinline = truthy.includes(url.searchParams.get('playsinline'));
                            } else {
                                this.config.playsinline = true;
                            }
                        }
                    } else {
                        // <div> with attributes
                        this.provider = this.media.getAttribute(this.config.attributes.embed.provider);

                        // Remove attribute
                        this.media.removeAttribute(this.config.attributes.embed.provider);
                    }

                    // Unsupported or missing provider
                    if (is.empty(this.provider) || !Object.keys(providers).includes(this.provider)) {
                        this.debug.error('Setup failed: Invalid provider');
                        return;
                    }

                    // Audio will come later for external providers
                    this.type = types.video;

                    break;

                case 'video':
                case 'audio':
                    this.type = type;
                    this.provider = providers.html5;

                    // Get config from attributes
                    if (this.media.hasAttribute('crossorigin')) {
                        this.config.crossorigin = true;
                    }
                    if (this.media.hasAttribute('autoplay')) {
                        this.config.autoplay = true;
                    }
                    if (this.media.hasAttribute('playsinline')) {
                        this.config.playsinline = true;
                    }
                    if (this.media.hasAttribute('muted')) {
                        this.config.muted = true;
                    }
                    if (this.media.hasAttribute('loop')) {
                        this.config.loop.active = true;
                    }

                    break;

                default:
                    this.debug.error('Setup failed: unsupported type');
                    return;
            }

            // Check for support again but with type
            this.supported = support.check(this.type, this.provider, this.config.playsinline);

            // If no support for even API, bail
            if (!this.supported.api) {
                this.debug.error('Setup failed: no support');
                return;
            }

            this.eventListeners = [];

            // Create listeners
            this.listeners = new Listeners(this);

            // Setup local storage for user settings
            this.storage = new Storage(this);

            // Store reference
            this.media.plyr = this;

            // Wrap media
            if (!is.element(this.elements.container)) {
                this.elements.container = createElement('div');
                wrap(this.media, this.elements.container);
            }

            // Add style hook
            ui.addStyleHook.call(this);

            // Setup media
            media.setup.call(this);

            // Listen for events if debugging
            if (this.config.debug) {
                on.call(this, this.elements.container, this.config.events.join(' '), function (event) {
                    _this.debug.log('event: ' + event.type);
                });
            }

            // Setup interface
            // If embed but not fully supported, build interface now to avoid flash of controls
            if (this.isHTML5 || this.isEmbed && !this.supported.ui) {
                ui.build.call(this);
            }

            // Container listeners
            this.listeners.container();

            // Global listeners
            this.listeners.global();

            // Setup fullscreen
            this.fullscreen = new Fullscreen(this);

            // Setup ads if provided
            this.ads = new Ads(this);

            // Autoplay if required
            if (this.config.autoplay) {
                this.play();
            }
        }

        // ---------------------------------------
        // API
        // ---------------------------------------

        /**
         * Types and provider helpers
         */

        createClass(Plyr, [{
            key: 'play',

            /**
             * Play the media, or play the advertisement (if they are not blocked)
             */
            value: function play() {
                if (!is.function(this.media.play)) {
                    return null;
                }

                // Return the promise (for HTML5)
                return this.media.play();
            }

            /**
             * Pause the media
             */

        }, {
            key: 'pause',
            value: function pause() {
                if (!this.playing || !is.function(this.media.pause)) {
                    return;
                }

                this.media.pause();
            }

            /**
             * Get playing state
             */

        }, {
            key: 'togglePlay',

            /**
             * Toggle playback based on current status
             * @param {boolean} input
             */
            value: function togglePlay(input) {
                // Toggle based on current state if nothing passed
                var toggle = is.boolean(input) ? input : !this.playing;

                if (toggle) {
                    this.play();
                } else {
                    this.pause();
                }
            }

            /**
             * Stop playback
             */

        }, {
            key: 'stop',
            value: function stop() {
                if (this.isHTML5) {
                    this.pause();
                    this.restart();
                } else if (is.function(this.media.stop)) {
                    this.media.stop();
                }
            }

            /**
             * Restart playback
             */

        }, {
            key: 'restart',
            value: function restart() {
                this.currentTime = 0;
            }

            /**
             * Rewind
             * @param {number} seekTime - how far to rewind in seconds. Defaults to the config.seekTime
             */

        }, {
            key: 'rewind',
            value: function rewind(seekTime) {
                this.currentTime = this.currentTime - (is.number(seekTime) ? seekTime : this.config.seekTime);
            }

            /**
             * Fast forward
             * @param {number} seekTime - how far to fast forward in seconds. Defaults to the config.seekTime
             */

        }, {
            key: 'forward',
            value: function forward(seekTime) {
                this.currentTime = this.currentTime + (is.number(seekTime) ? seekTime : this.config.seekTime);
            }

            /**
             * Seek to a time
             * @param {number} input - where to seek to in seconds. Defaults to 0 (the start)
             */

        }, {
            key: 'increaseVolume',

            /**
             * Increase volume
             * @param {boolean} step - How much to decrease by (between 0 and 1)
             */
            value: function increaseVolume(step) {
                var volume = this.media.muted ? 0 : this.volume;
                this.volume = volume + (is.number(step) ? step : 0);
            }

            /**
             * Decrease volume
             * @param {boolean} step - How much to decrease by (between 0 and 1)
             */

        }, {
            key: 'decreaseVolume',
            value: function decreaseVolume(step) {
                this.increaseVolume(-step);
            }

            /**
             * Set muted state
             * @param {boolean} mute
             */

        }, {
            key: 'toggleCaptions',

            /**
             * Toggle captions
             * @param {boolean} input - Whether to enable captions
             */
            value: function toggleCaptions(input) {
                captions.toggle.call(this, input, false);
            }

            /**
             * Set the caption track by index
             * @param {number} - Caption index
             */

        }, {
            key: 'airplay',

            /**
             * Trigger the airplay dialog
             * TODO: update player with state, support, enabled
             */
            value: function airplay() {
                // Show dialog if supported
                if (support.airplay) {
                    this.media.webkitShowPlaybackTargetPicker();
                }
            }

            /**
             * Toggle the player controls
             * @param {boolean} [toggle] - Whether to show the controls
             */

        }, {
            key: 'toggleControls',
            value: function toggleControls(toggle) {
                // Don't toggle if missing UI support or if it's audio
                if (this.supported.ui && !this.isAudio) {
                    // Get state before change
                    var isHidden = hasClass(this.elements.container, this.config.classNames.hideControls);

                    // Negate the argument if not undefined since adding the class to hides the controls
                    var force = typeof toggle === 'undefined' ? undefined : !toggle;

                    // Apply and get updated state
                    var hiding = toggleClass(this.elements.container, this.config.classNames.hideControls, force);

                    // Close menu
                    if (hiding && this.config.controls.includes('settings') && !is.empty(this.config.settings)) {
                        controls.toggleMenu.call(this, false);
                    }
                    // Trigger event on change
                    if (hiding !== isHidden) {
                        var eventName = hiding ? 'controlshidden' : 'controlsshown';
                        triggerEvent.call(this, this.media, eventName);
                    }
                    return !hiding;
                }
                return false;
            }

            /**
             * Add event listeners
             * @param {string} event - Event type
             * @param {function} callback - Callback for when event occurs
             */

        }, {
            key: 'on',
            value: function on$$1(event, callback) {
                on.call(this, this.elements.container, event, callback);
            }

            /**
             * Add event listeners once
             * @param {string} event - Event type
             * @param {function} callback - Callback for when event occurs
             */

        }, {
            key: 'once',
            value: function once$$1(event, callback) {
                once.call(this, this.elements.container, event, callback);
            }

            /**
             * Remove event listeners
             * @param {string} event - Event type
             * @param {function} callback - Callback for when event occurs
             */

        }, {
            key: 'off',
            value: function off$$1(event, callback) {
                off(this.elements.container, event, callback);
            }

            /**
             * Destroy an instance
             * Event listeners are removed when elements are removed
             * http://stackoverflow.com/questions/12528049/if-a-dom-element-is-removed-are-its-listeners-also-removed-from-memory
             * @param {function} callback - Callback for when destroy is complete
             * @param {boolean} soft - Whether it's a soft destroy (for source changes etc)
             */

        }, {
            key: 'destroy',
            value: function destroy(callback) {
                var _this2 = this;

                var soft = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

                if (!this.ready) {
                    return;
                }

                var done = function done() {
                    // Reset overflow (incase destroyed while in fullscreen)
                    document.body.style.overflow = '';

                    // GC for embed
                    _this2.embed = null;

                    // If it's a soft destroy, make minimal changes
                    if (soft) {
                        if (Object.keys(_this2.elements).length) {
                            // Remove elements
                            removeElement(_this2.elements.buttons.play);
                            removeElement(_this2.elements.captions);
                            removeElement(_this2.elements.controls);
                            removeElement(_this2.elements.wrapper);

                            // Clear for GC
                            _this2.elements.buttons.play = null;
                            _this2.elements.captions = null;
                            _this2.elements.controls = null;
                            _this2.elements.wrapper = null;
                        }

                        // Callback
                        if (is.function(callback)) {
                            callback();
                        }
                    } else {
                        // Unbind listeners
                        unbindListeners.call(_this2);

                        // Replace the container with the original element provided
                        replaceElement(_this2.elements.original, _this2.elements.container);

                        // Event
                        triggerEvent.call(_this2, _this2.elements.original, 'destroyed', true);

                        // Callback
                        if (is.function(callback)) {
                            callback.call(_this2.elements.original);
                        }

                        // Reset state
                        _this2.ready = false;

                        // Clear for garbage collection
                        setTimeout(function () {
                            _this2.elements = null;
                            _this2.media = null;
                        }, 200);
                    }
                };

                // Stop playback
                this.stop();

                // Provider specific stuff
                if (this.isHTML5) {
                    // Clear timeout
                    clearTimeout(this.timers.loading);

                    // Restore native video controls
                    ui.toggleNativeControls.call(this, true);

                    // Clean up
                    done();
                } else if (this.isYouTube) {
                    // Clear timers
                    clearInterval(this.timers.buffering);
                    clearInterval(this.timers.playing);

                    // Destroy YouTube API
                    if (this.embed !== null && is.function(this.embed.destroy)) {
                        this.embed.destroy();
                    }

                    // Clean up
                    done();
                } else if (this.isVimeo) {
                    // Destroy Vimeo API
                    // then clean up (wait, to prevent postmessage errors)
                    if (this.embed !== null) {
                        this.embed.unload().then(done);
                    }

                    // Vimeo does not always return
                    setTimeout(done, 200);
                }
            }

            /**
             * Check for support for a mime type (HTML5 only)
             * @param {string} type - Mime type
             */

        }, {
            key: 'supports',
            value: function supports(type) {
                return support.mime.call(this, type);
            }

            /**
             * Check for support
             * @param {string} type - Player type (audio/video)
             * @param {string} provider - Provider (html5/youtube/vimeo)
             * @param {bool} inline - Where player has `playsinline` sttribute
             */

        }, {
            key: 'isHTML5',
            get: function get$$1() {
                return Boolean(this.provider === providers.html5);
            }
        }, {
            key: 'isEmbed',
            get: function get$$1() {
                return Boolean(this.isYouTube || this.isVimeo);
            }
        }, {
            key: 'isYouTube',
            get: function get$$1() {
                return Boolean(this.provider === providers.youtube);
            }
        }, {
            key: 'isVimeo',
            get: function get$$1() {
                return Boolean(this.provider === providers.vimeo);
            }
        }, {
            key: 'isVideo',
            get: function get$$1() {
                return Boolean(this.type === types.video);
            }
        }, {
            key: 'isAudio',
            get: function get$$1() {
                return Boolean(this.type === types.audio);
            }
        }, {
            key: 'playing',
            get: function get$$1() {
                return Boolean(this.ready && !this.paused && !this.ended);
            }

            /**
             * Get paused state
             */

        }, {
            key: 'paused',
            get: function get$$1() {
                return Boolean(this.media.paused);
            }

            /**
             * Get stopped state
             */

        }, {
            key: 'stopped',
            get: function get$$1() {
                return Boolean(this.paused && this.currentTime === 0);
            }

            /**
             * Get ended state
             */

        }, {
            key: 'ended',
            get: function get$$1() {
                return Boolean(this.media.ended);
            }
        }, {
            key: 'currentTime',
            set: function set$$1(input) {
                // Bail if media duration isn't available yet
                if (!this.duration) {
                    return;
                }

                // Validate input
                var inputIsValid = is.number(input) && input > 0;

                // Set
                this.media.currentTime = inputIsValid ? Math.min(input, this.duration) : 0;

                // Logging
                this.debug.log('Seeking to ' + this.currentTime + ' seconds');
            }

            /**
             * Get current time
             */

            , get: function get$$1() {
                return Number(this.media.currentTime);
            }

            /**
             * Get buffered
             */

        }, {
            key: 'buffered',
            get: function get$$1() {
                var buffered = this.media.buffered;

                // YouTube / Vimeo return a float between 0-1

                if (is.number(buffered)) {
                    return buffered;
                }

                // HTML5
                // TODO: Handle buffered chunks of the media
                // (i.e. seek to another section buffers only that section)
                if (buffered && buffered.length && this.duration > 0) {
                    return buffered.end(0) / this.duration;
                }

                return 0;
            }

            /**
             * Get seeking status
             */

        }, {
            key: 'seeking',
            get: function get$$1() {
                return Boolean(this.media.seeking);
            }

            /**
             * Get the duration of the current media
             */

        }, {
            key: 'duration',
            get: function get$$1() {
                // Faux duration set via config
                var fauxDuration = parseFloat(this.config.duration);

                // Media duration can be NaN or Infinity before the media has loaded
                var realDuration = (this.media || {}).duration;
                var duration = !is.number(realDuration) || realDuration === Infinity ? 0 : realDuration;

                // If config duration is funky, use regular duration
                return fauxDuration || duration;
            }

            /**
             * Set the player volume
             * @param {number} value - must be between 0 and 1. Defaults to the value from local storage and config.volume if not set in storage
             */

        }, {
            key: 'volume',
            set: function set$$1(value) {
                var volume = value;
                var max = 1;
                var min = 0;

                if (is.string(volume)) {
                    volume = Number(volume);
                }

                // Load volume from storage if no value specified
                if (!is.number(volume)) {
                    volume = this.storage.get('volume');
                }

                // Use config if all else fails
                if (!is.number(volume)) {
                    volume = this.config.volume;
                }

                // Maximum is volumeMax
                if (volume > max) {
                    volume = max;
                }
                // Minimum is volumeMin
                if (volume < min) {
                    volume = min;
                }

                // Update config
                this.config.volume = volume;

                // Set the player volume
                this.media.volume = volume;

                // If muted, and we're increasing volume manually, reset muted state
                if (!is.empty(value) && this.muted && volume > 0) {
                    this.muted = false;
                }
            }

            /**
             * Get the current player volume
             */

            , get: function get$$1() {
                return Number(this.media.volume);
            }
        }, {
            key: 'muted',
            set: function set$$1(mute) {
                var toggle = mute;

                // Load muted state from storage
                if (!is.boolean(toggle)) {
                    toggle = this.storage.get('muted');
                }

                // Use config if all else fails
                if (!is.boolean(toggle)) {
                    toggle = this.config.muted;
                }

                // Update config
                this.config.muted = toggle;

                // Set mute on the player
                this.media.muted = toggle;
            }

            /**
             * Get current muted state
             */

            , get: function get$$1() {
                return Boolean(this.media.muted);
            }

            /**
             * Check if the media has audio
             */

        }, {
            key: 'hasAudio',
            get: function get$$1() {
                // Assume yes for all non HTML5 (as we can't tell...)
                if (!this.isHTML5) {
                    return true;
                }

                if (this.isAudio) {
                    return true;
                }

                // Get audio tracks
                return Boolean(this.media.mozHasAudio) || Boolean(this.media.webkitAudioDecodedByteCount) || Boolean(this.media.audioTracks && this.media.audioTracks.length);
            }

            /**
             * Set playback speed
             * @param {number} speed - the speed of playback (0.5-2.0)
             */

        }, {
            key: 'speed',
            set: function set$$1(input) {
                var speed = null;

                if (is.number(input)) {
                    speed = input;
                }

                if (!is.number(speed)) {
                    speed = this.storage.get('speed');
                }

                if (!is.number(speed)) {
                    speed = this.config.speed.selected;
                }

                // Set min/max
                if (speed < 0.1) {
                    speed = 0.1;
                }
                if (speed > 2.0) {
                    speed = 2.0;
                }

                if (!this.config.speed.options.includes(speed)) {
                    this.debug.warn('Unsupported speed (' + speed + ')');
                    return;
                }

                // Update config
                this.config.speed.selected = speed;

                // Set media speed
                this.media.playbackRate = speed;
            }

            /**
             * Get current playback speed
             */

            , get: function get$$1() {
                return Number(this.media.playbackRate);
            }

            /**
             * Set playback quality
             * Currently HTML5 & YouTube only
             * @param {number} input - Quality level
             */

        }, {
            key: 'quality',
            set: function set$$1(input) {
                var config = this.config.quality;
                var options = this.options.quality;

                if (!options.length) {
                    return;
                }

                var quality = [!is.empty(input) && Number(input), this.storage.get('quality'), config.selected, config.default].find(is.number);

                if (!options.includes(quality)) {
                    var value = closest(options, quality);
                    this.debug.warn('Unsupported quality option: ' + quality + ', using ' + value + ' instead');
                    quality = value;
                }

                // Trigger request event
                triggerEvent.call(this, this.media, 'qualityrequested', false, { quality: quality });

                // Update config
                config.selected = quality;

                // Set quality
                this.media.quality = quality;
            }

            /**
             * Get current quality level
             */

            , get: function get$$1() {
                return this.media.quality;
            }

            /**
             * Toggle loop
             * TODO: Finish fancy new logic. Set the indicator on load as user may pass loop as config
             * @param {boolean} input - Whether to loop or not
             */

        }, {
            key: 'loop',
            set: function set$$1(input) {
                var toggle = is.boolean(input) ? input : this.config.loop.active;
                this.config.loop.active = toggle;
                this.media.loop = toggle;

                // Set default to be a true toggle
                /* const type = ['start', 'end', 'all', 'none', 'toggle'].includes(input) ? input : 'toggle';
                 switch (type) {
                    case 'start':
                        if (this.config.loop.end && this.config.loop.end <= this.currentTime) {
                            this.config.loop.end = null;
                        }
                        this.config.loop.start = this.currentTime;
                        // this.config.loop.indicator.start = this.elements.display.played.value;
                        break;
                     case 'end':
                        if (this.config.loop.start >= this.currentTime) {
                            return this;
                        }
                        this.config.loop.end = this.currentTime;
                        // this.config.loop.indicator.end = this.elements.display.played.value;
                        break;
                     case 'all':
                        this.config.loop.start = 0;
                        this.config.loop.end = this.duration - 2;
                        this.config.loop.indicator.start = 0;
                        this.config.loop.indicator.end = 100;
                        break;
                     case 'toggle':
                        if (this.config.loop.active) {
                            this.config.loop.start = 0;
                            this.config.loop.end = null;
                        } else {
                            this.config.loop.start = 0;
                            this.config.loop.end = this.duration - 2;
                        }
                        break;
                     default:
                        this.config.loop.start = 0;
                        this.config.loop.end = null;
                        break;
                } */
            }

            /**
             * Get current loop state
             */

            , get: function get$$1() {
                return Boolean(this.media.loop);
            }

            /**
             * Set new media source
             * @param {object} input - The new source object (see docs)
             */

        }, {
            key: 'source',
            set: function set$$1(input) {
                source.change.call(this, input);
            }

            /**
             * Get current source
             */

            , get: function get$$1() {
                return this.media.currentSrc;
            }

            /**
             * Set the poster image for a video
             * @param {input} - the URL for the new poster image
             */

        }, {
            key: 'poster',
            set: function set$$1(input) {
                if (!this.isVideo) {
                    this.debug.warn('Poster can only be set for video');
                    return;
                }

                ui.setPoster.call(this, input, false).catch(function () {});
            }

            /**
             * Get the current poster image
             */

            , get: function get$$1() {
                if (!this.isVideo) {
                    return null;
                }

                return this.media.getAttribute('poster');
            }

            /**
             * Set the autoplay state
             * @param {boolean} input - Whether to autoplay or not
             */

        }, {
            key: 'autoplay',
            set: function set$$1(input) {
                var toggle = is.boolean(input) ? input : this.config.autoplay;
                this.config.autoplay = toggle;
            }

            /**
             * Get the current autoplay state
             */

            , get: function get$$1() {
                return Boolean(this.config.autoplay);
            }
        }, {
            key: 'currentTrack',
            set: function set$$1(input) {
                captions.set.call(this, input, false);
            }

            /**
             * Get the current caption track index (-1 if disabled)
             */

            , get: function get$$1() {
                var _captions = this.captions,
                    toggled = _captions.toggled,
                    currentTrack = _captions.currentTrack;

                return toggled ? currentTrack : -1;
            }

            /**
             * Set the wanted language for captions
             * Since tracks can be added later it won't update the actual caption track until there is a matching track
             * @param {string} - Two character ISO language code (e.g. EN, FR, PT, etc)
             */

        }, {
            key: 'language',
            set: function set$$1(input) {
                captions.setLanguage.call(this, input, false);
            }

            /**
             * Get the current track's language
             */

            , get: function get$$1() {
                return (captions.getCurrentTrack.call(this) || {}).language;
            }

            /**
             * Toggle picture-in-picture playback on WebKit/MacOS
             * TODO: update player with state, support, enabled
             * TODO: detect outside changes
             */

        }, {
            key: 'pip',
            set: function set$$1(input) {
                var states = {
                    pip: 'picture-in-picture',
                    inline: 'inline'
                };

                // Bail if no support
                if (!support.pip) {
                    return;
                }

                // Toggle based on current state if not passed
                var toggle = is.boolean(input) ? input : this.pip === states.inline;

                // Toggle based on current state
                this.media.webkitSetPresentationMode(toggle ? states.pip : states.inline);
            }

            /**
             * Get the current picture-in-picture state
             */

            , get: function get$$1() {
                if (!support.pip) {
                    return null;
                }

                return this.media.webkitPresentationMode;
            }
        }], [{
            key: 'supported',
            value: function supported(type, provider, inline) {
                return support.check(type, provider, inline);
            }

            /**
             * Load an SVG sprite into the page
             * @param {string} url - URL for the SVG sprite
             * @param {string} [id] - Unique ID
             */

        }, {
            key: 'loadSprite',
            value: function loadSprite$$1(url, id) {
                return loadSprite(url, id);
            }

            /**
             * Setup multiple instances
             * @param {*} selector
             * @param {object} options
             */

        }, {
            key: 'setup',
            value: function setup(selector) {
                var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                var targets = null;

                if (is.string(selector)) {
                    targets = Array.from(document.querySelectorAll(selector));
                } else if (is.nodeList(selector)) {
                    targets = Array.from(selector);
                } else if (is.array(selector)) {
                    targets = selector.filter(is.element);
                }

                if (is.empty(targets)) {
                    return null;
                }

                return targets.map(function (t) {
                    return new Plyr(t, options);
                });
            }
        }]);
        return Plyr;
    }();

    Plyr.defaults = cloneDeep(defaults$1);

    return Plyr;
});

//# sourceMappingURL=plyr.js.map
var isRTL = $('html').attr('dir') == "rtl" ? true : false,
    winWidth = $(window).width(),
    winHeight = $(window).height(),
    headerHeight = $('.c-main-header').outerHeight(),
    footerHeight = $('.c-main-footer').outerHeight(),
    bodyHeight,
    bodyTopPos;

loadPlayMovies();
ChangeToSvg();
setOnTopClass();
initSlick();
headerSpace();

if (winWidth < 768) {
	$('.js-movie-list .u-loader').remove();
}
if (winWidth > 1024) {
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
		$(this).attr('data-aos-delay', 50 * i);
	});
	$('.popular-heading').attr('data-aos-delay', 300);
	$('.movieheader .txt .movie-poster-detail, .movieheader .txt .movie-poster, .popular-heading').attr('data-aos-delay', 300);
}
$('.c-loader').fadeOut('slow', function () {
	// setTimeout(function () {
	if (winWidth > 1024) {
		AOS.init({
			once: true
		});
	}
	// }, 1000);
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
	animWrapHeight();
	bindPopupEve();
	setOnTopClass();
	customSelectBox();
});

//On Window Load
$(window).on('load', function () {
	// calcBodyarea();
	setTimeout(function () {
		addVideoPlugin();
	}, 200);
});

//On Window Resize
var resizeTimer;
$(window).on('resize orientationchange', function () {
	if (winWidth != $(window).width()) {
		winDimensions();
		setOnTopClass();
		// calcBodyarea();
		headerSpace();
		animWrapHeight();

		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function () {
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
$(document).keyup(function (e) {
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
	if ($(window).scrollTop() === 0) {
		$('html').removeClass('not-at-top');
	} else {
		$('html').addClass('not-at-top');
	}
}

function winDimensions() {
	winWidth = $(window).width(), winHeight = $(window).height(), headerHeight = $('.c-main-header').outerHeight(), footerHeight = $('.c-main-footer').outerHeight();
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
				$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
			}
			$img.replaceWith($svg);
		}, 'xml');
	});
}
function loadPath() {
	var currentLoc = window.location.pathname.split('/')[1];
	$('.secondary-nav a[href="' + currentLoc + '"]').addClass('active');
}
function actionsOnClick() {
	$('.js-langSelector').on('click', function (e) {
		e.preventDefault();
		$(this).find('ul').toggleClass('active');
	});
}
function calcBodyarea() {
	bodyHeight = winHeight - headerHeight - footerHeight;
	$('.js-page-body').css('min-height', bodyHeight);
}

function initSlick() {
	// Main Carousel
	$('.js-main-carousel').slick({
		arrows: false,
		infinite: false,
		fade: true,
		speed: 600,
		asNavFor: '.js-main-carousel-thumb'
	});
	$('.js-main-carousel-thumb').slick({
		arrows: false,
		slidesToShow: 6,
		slidesToScroll: 6,
		infinite: false,
		asNavFor: '.js-main-carousel'
	});
	$('.js-main-carousel-thumb .item').click(function (e) {
		e.preventDefault();
		var thisIndex = $(this).closest('.slick-slide').attr('data-slick-index');
		$('.js-main-carousel').slick('slickGoTo', thisIndex);
	});

	$('.js-nav-carousel').slick({
		dots: true,
		arrows: false
	});

	// EXP Carousel
	$('.js-exp-carousel').slick({
		arrows: false,
		fade: true,
		asNavFor: '.js-exp-carousel-thumb',
		infinite: false,
		responsive: [{
			breakpoint: 768,
			settings: {
				fade: false
			}
		}]
	});
	$('.js-exp-carousel-thumb').slick({
		arrows: false,
		slidesToShow: 5,
		slidesToScroll: 5,
		infinite: false,
		asNavFor: '.js-exp-carousel',
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				focusOnSelect: true,
				swipeToSlide: true
			}
		}]
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
		if (!$(this).closest('.js-movie-list').hasClass('js-movie-list--not-open')) {

			// Check if some other movie is already open and if its on another row
			// then make sure we keep scroll jerk off the bay
			if (!$(this).closest('.list-wrap').next().find('.item-details').get(0) && $(this).closest('.js-movie-list').find('.movie-details .item-details').get(0)) {
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
			} else {
				slideDownMovieDetails(_self);
			}
		}
	});
}

function slideDownMovieDetails(thisSelf) {
	$(thisSelf).closest('.js-movie-list').find('.movie-item').removeClass('is--active');
	$(thisSelf).closest('.js-movie-list').find('.movie-details .item-details').remove();

	var detailsHTML = $(thisSelf).parent().find('.item-details')[0].outerHTML;
	$(thisSelf).closest('.movie-item').addClass('is--active');
	$(thisSelf).closest('.list-wrap').next().append(detailsHTML);
	$(thisSelf).closest('.list-wrap').next().slideDown();

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
function setInView(el) {

	var top = el.offsetTop;
	var height = el.offsetHeight + 20;

	while (el.offsetParent) {
		el = el.offsetParent;
		top += el.offsetTop;
	}

	var a = top;
	var b = height;
	var d = a + b;
	var e = window.innerHeight + window.pageYOffset;
	var c = d - e;
	var scroll = window.pageYOffset - c;

	if (e < d) {
		$('html, body').stop().animate({
			scrollTop: a + b - window.innerHeight
		}, 500);
	}
}

function movieListSetHTML() {
	if (winWidth < 1024) {
		var itemsPerRow = 4;
	} else {
		var itemsPerRow = 6;
	}

	if ($('.js-movie-list').hasClass('slick-initialized')) {
		$('.js-movie-list').slick('unslick');
		movieList();
	}

	// Normalize First
	$('.js-movie-list .movie-item.is--active').removeClass('is--active');
	if ($('.js-movie-list .list-wrap').get(0)) {
		$('.js-movie-list').each(function () {
			$('.list-wrap .movie-item .is--active', this).removeClass('is--active');
			$('.list-wrap .movie-item', this).appendTo($(this));
			$('.list-wrap', this).remove();
			$('.movie-details', this).remove();
		});
	}

	$('.js-movie-list .is--last-item').removeClass('is--last-item');
	$('.js-movie-list .is--first-item').removeClass('is--first-item');

	if (winWidth >= 768) {
		// Set HTML
		$('.js-movie-list').each(function () {
			var i = 1;
			while ($('> .movie-item', this).length) {
				$('> .movie-item:lt(' + itemsPerRow + ')', this).wrapAll('<div class="list-wrap list-wrap-page list-wrap-page--' + i + '" />');
				i++;
			}
			$('.list-wrap', this).after('<div class="movie-details"></div>');

			if (!$('.u-loader', this).get(0)) {
				$(this).append('<div class="u-loader"></div>');
			}
		});
		$('.js-movie-list .movie-item:last-child .item-details').addClass('is--last-item');
		$('.js-movie-list .movie-item:first-child .item-details').addClass('is--first-item');
	} else {
		$('.js-movie-list').slick({
			arrows: false,
			// asNavFor: '.js-main-carousel-thumb',
			focusOnSelect: true,
			swipeToSlide: true,
			infinite: false
		});
	}
}

function tabs() {
	$('.js-tab-link').click(function (e) {
		e.preventDefault();
		var tabName = $(this).attr('data-tab-name');
		$('.tab-link[data-tab-name="' + tabName + '"]').removeClass('is--active');
		$(this).addClass('is--active');
		$('.is-tab[data-tab-name="' + tabName + '"]').removeClass('is--active');
		var target = $(this).attr('href');
		$(target).addClass('is--active');
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
	$('.js-custom-select .js-field').on('focus', function () {
		$(this).closest('.js-custom-select').addClass('is--active');
		$(this).closest('.js-custom-select').addClass('is--active-now');
		$('.js-custom-select:not(.is--active-now)').removeClass('is--active');
		$('.js-custom-select.is--active-now').removeClass('is--active-now');

		if (winWidth > 1024) {
			$(this).closest('.js-custom-select').find('.field-dropdown .js-field').val('').focus();
		}
		$('html').addClass('filter-open');
	});
	$('.js-custom-select .js-field').on('blur', function () {
		// $(this).closest('.js-custom-select').removeClass('is--active');
	});

	$('.js-custom-select').each(function (i) {
		hideOnClickOutside($(this));
	});

	$('.js-select-all').click(function () {
		if ($(this).find('input').is(":checked")) {
			$(this).closest('.js-custom-select').find('input[type="checkbox"]').prop("checked", false);
		} else {
			$(this).closest('.js-custom-select').find('input[type="checkbox"]').prop("checked", true);
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
		/*setTimeout(function () {
  	$(self).closest('.js-custom-select').find('.field-dropdown')[0].scrollTo(0, 0);
  	setTimeout(function () {
  		$(self).closest('.js-custom-select').find('.field-dropdown').css('opacity', 1);
  	}, 10);
  }, 10);*/
		// $(this).closest('.js-custom-select').find('.field-dropdown').animate({scrollTop:0},0);

		if (winWidth > 1024) {
			$(this).closest('.js-custom-select').find('.field-dropdown .js-field').val('').focus();
		}

		setBodyTopOffset();
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
}
function setBodyTopOffset() {
	if (winWidth < 768) {
		bodyTopPos = $(window).scrollTop();
		$('body').css('top', -bodyTopPos);
	}
}
function setBodyToNormal() {
	window.scrollTo(0, bodyTopPos);
}

function hideOnClickOutside(selector) {
	if (selector.hasClass('js-custom-select')) {
		$('.js-custom-select input[type="text"]').blur();
	}
	var outsideClickListener = function outsideClickListener(event) {
		if (winWidth >= 768) {
			if (!$(event.target).closest(selector).length) {
				if ($(selector).hasClass('is--active')) {
					$(selector).removeClass('is--active');
					$(selector).find('.field-dropdown .scroll').slideUp();
					// removeClickListener();
				}
			}
		}
	};

	var removeClickListener = function removeClickListener() {
		document.removeEventListener('click', outsideClickListener);
	};

	document.addEventListener('click', outsideClickListener);
}

$(document).ready(function (e) {
	$('img.svg').each(function () {
		var $img = jQuery(this);
		var imgID = $img.attr('id');
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');

		jQuery.get(imgURL, function (data) {
			// Get the SVG tag, ignore the rest
			var $svg = jQuery(data).find('svg');

			// Add replaced image's ID to the new SVG
			if (typeof imgID !== 'undefined') {
				$svg = $svg.attr('id', imgID);
			}
			// Add replaced image's classes to the new SVG
			if (typeof imgClass !== 'undefined') {
				$svg = $svg.attr('class', imgClass + ' replaced-svg');
			}

			// Remove any invalid XML tags as per http://validator.w3.org
			$svg = $svg.removeAttr('xmlns:a');

			// Check if the viewport is set, if the viewport is not set the SVG wont't scale.
			if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
				$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
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
	responsive: [{
		breakpoint: 1024,
		settings: {
			slidesToShow: 5,
			dots: false
		}
	}, {
		breakpoint: 767,
		settings: {
			arrows: false,
			slidesToShow: 5
		}
	}]
});

$('.time-itemss').slick({
	dots: false,
	infinite: false,
	speed: 300,
	slidesToShow: 3,
	slidesToScroll: 1,
	responsive: [{
		breakpoint: 1024,
		settings: {
			slidesToShow: 3,
			slidesToScroll: 3,
			infinite: true,
			dots: true
		}
	}, {
		breakpoint: 600,
		settings: {
			slidesToShow: 2,
			slidesToScroll: 2
		}
	}, {
		breakpoint: 480,
		settings: {
			slidesToShow: 4,
			slidesToScroll: 1,
			arrows: false
		}
	}]
});

function footerLogosCarousel() {
	if ($('.js-footer-logos-carousel').hasClass('slick-initialized')) {
		$('.js-footer-logos-carousel').slick('unslick');
	}
	if (winWidth < 768) {
		$('.js-footer-logos-carousel').slick({
			arrows: false,
			dots: false,
			items: 1,
			infinite: false
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
if (isIE) {
	$('html').addClass('is--ie');
	$('html').addClass('is--ie-' + isIE);

	$('[src*=reel-logo]').attr('src', 'assets/img/brand/logo.png');
}

function headerSpace() {
	var filterSpace = 0;
	if (winWidth < 768) {
		filterSpace = 66;
		if (winHeight <= 650) {
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
				$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
			}
			$img.replaceWith($svg);
		}, 'xml');
	});
}

function openPopup(target) {
	$('html').addClass('popup-is-active');
	$(target).show();
	$(target).closest('.c-popup').show();
	setTimeout(function () {
		$(target).addClass('active');
		$(target).closest('.c-popup').addClass('popup--open');
		console.log($(target).find('.plyr'));
		if ($(target).find('.plyr').length) {
			var videoInstance = $(target).find('.plyr').attr('data-video-instance');
			console.log(videoInstance);
			players[videoInstance].play();
		}
	}, 10);

	$('html').addClass('popup-is-active');
	$(target).show();
	$(target).closest('.c-popup').show();
	setTimeout(function () {
		$(target).addClass('active');
		$(target).closest('.c-popup').addClass('popup--open');

		// Play Video
		if (winWidth > 1024 && $(target).find('.plyr').length) {
			var videoInstance = $(target).find('.js-video').attr('data-video-instance');
			if (players[videoInstance]) {
				players[videoInstance].play();
			}
		} else if ($(target).find('.js-video').length) {
			$('.popup.active iframe')[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
		}
	}, 10);
}

function closePopup() {
	if ($('.c-popup .active').length) {
		// Pause Video In Popup
		if (winWidth > 1024 && $('.c-popup .active .plyr').length) {
			var videoInstance = $('.c-popup .active .plyr').attr('data-video-instance');
			if (players[videoInstance]) {
				players[videoInstance].pause();
			}
		} else if ($('.c-popup .active .js-video').length) {
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
	if (winWidth > 1024 && $('.js-video').get(0)) {
		var plyrScriptElement = document.createElement("script");
		plyrScriptElement.setAttribute('src', 'assets/js/plyr.min.js');

		plyrScriptElement.setAttribute('async', 'true');
		document.body.appendChild(plyrScriptElement);
	} else {
		jsVideoDirect();
	}
}

var players = [];
function jsVideo() {
	// Custom player
	if ($('.js-video').length) {
		$('.js-video').each(function (i) {
			var thisParent = $(this).parent();
			players[i] = new Plyr(this, {
				playsinline: true
			});
			thisParent.find('.plyr').attr('data-video-instance', i);
		});
	}
}

function jsVideoDirect() {
	if ($('.js-video').length) {
		$('.js-video').each(function (i) {
			$(this).attr('data-video-instance', i);
			var videoId = $(this).attr('data-plyr-embed-id');
			$(this).html('<iframe width="100%" height="100%" src="https://www.youtube.com/embed/' + videoId + '?rel=0&playsinline=1&enablejsapi=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
		});
	}
}

function bindPopupEve() {
	// Popup Open
	$('.js-popup-link').click(function (e) {
		e.preventDefault();
		var target = $(this).attr('href');
		openPopup(target);
	});

	// Popup Close
	$('.js-close-popup').click(function (e) {
		e.preventDefault();
		closePopup();
	});
}

function animWrapHeight() {
	$('.anim-wrap').css('height', 'auto');
	$('.anim-wrap').removeClass('anim-wrap--ready');

	$('.anim-wrap').each(function () {
		$(this).css('height', $(this).height()).addClass('anim-wrap--ready');
	});
}