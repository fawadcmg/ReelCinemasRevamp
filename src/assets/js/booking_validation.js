$(function () {
	
	$('.js-submit-form').click(function() {
		var thisForm = $(this).closest('.js-form');
		if(thisForm.valid()){
			thisForm.submit();
		}
	});

	$('.js-credit-card').click(function(e){
		e.preventDefault();
		var thisForm = $(this).closest('.c-seats-selection').find('.js-form');
		console.log($(this).closest('.c-seats-selection').find('.js-form'));
		if(thisForm.valid()){
			thisForm.submit();
		}
	});

	$('.js-form').each(function () {
		$(this).validate({
			ignore: [],
			rules: {
				'card-exp-month': {
					required: true,
					valueNotEquals: "Month"
				},
				cardnumber: {
					required: true,
					creditcard: true
				},
				phone: {
					required: true,
					number: true
				},
			},
			messages: {
				'card-exp-month': {
					valueNotEquals: "You must select expiray date"
				},
				password:{
					minlength: jQuery.validator.format("Please enter at least {0} characters")
				},
				'card1': {
					required: "You must complete both fields",
					minlength: jQuery.validator.format("Please enter 6 numbers in first & 7 in next field")
				},
				'card2': {
					required: "You must complete both fields",
					minlength: jQuery.validator.format("Please enter 6 numbers in first & 7 in next field")
				},
				'cvv': {
					required: "please enter CVV code",
					minlength: jQuery.validator.format("CVV code should be atleast 3 digits")
				}
			},
			errorPlacement: function(error, element) {
				if(element.closest('.form-item').find('.form-item-error-msg').get(0)){
	        		element.closest('.form-item').find('.form-item-error-msg').append(error);
				}else if(element.closest('.combo-field').find('.form-item-error-msg').get(0)){
					console.log('here');
					element.closest('.combo-field').find('.form-item-error-msg').html('');
					element.closest('.combo-field').find('.form-item-error-msg').append(error);
				}
	        },
			highlight: function (element, errorClass, validClass) {
	            $(element).closest('.form-item').addClass(errorClass).removeClass(validClass);
	        },
	        unhighlight: function (element, errorClass, validClass) {
	            $(element).closest('.form-item').removeClass(errorClass).addClass(validClass);
	        },
			submitHandler: function() {
				console.log("submitted!");
			},
		});
	});

	$.validator.addMethod("valueNotEquals", function(value, element, arg){
	  return arg !== value;
	 }, "You must select this field");
	

	jQuery.extend(jQuery.validator.messages, {
    	required: "You must complete this field",
    	email: "Please enter a valid email address",
    	creditcard: "Please enter a valid credit card number",
	});

	// ==========================================
	// Seat selection validatiion.

	$('.js-seats-validation').click(function(e){
		e.preventDefault();
		
		var parentWrapper = $(this).closest('.c-seats-selection');

		if(!parentWrapper.find('.c-seat-selection .seat-section .seat:not(.seat--booked) input:checked').get(0)){
			// Seat not selected.
			if(winWidth >767 ){
				$('html').addClass('validation-overlay');
				$('.c-seat-selection .below-heading').css({
					'z-index': 1000,
				}).addClass('is-validated');
				if(winWidth <=1200 ){
					$("html, body").animate({ scrollTop: $('.c-seat-selection').offset().top });
				}
			}
		}else{
			$('.c-seats-selection .c-panel-2 .body-casual .calculation-list .list-selection select').each(function () {
				if($(this).val() == ''){
					if(winWidth >767 ){
						$('.js-close-whats-this').trigger('click');
						$('html').addClass('validation-overlay');
						$('.c-seats-selection .c-panel-2 .body-casual .calculation-list .list-selection').mCustomScrollbar("scrollTo",$(this).closest('li'), { scrollInertia: 500});
						$(this).closest('li').css({
							'z-index': 1000,
						}).addClass('is-validated');
						if(winWidth <=1200 ){
							$("html, body").animate({ scrollTop: $('.c-seats-selection .c-panel-2 .body-casual').offset().top });
						}
						return false;
					}else{
						if($('.c-panel-2 .panel-body .mobile-body-wrap').css('display') == 'none'){
							$('.c-panel-2 .panel-header h1.js-mobile-summary-toggle').trigger('click');
						}
						$(this).closest('li').addClass('has-error');
					}
				}
			});
		}
	});

	$('.c-seat-selection .seat-section .seat:not(.seat--booked) input').change(function () {
		if(winWidth >767 ){
			if($('.c-seat-selection .seat-section .seat:not(.seat--booked) input:checked').get(0)){
				$('html').removeClass('validation-overlay');
				$('.c-seat-selection .below-heading').css({
					'z-index': '',
				}).removeClass('is-validated');
			}
		}
	});

	seatValidateBind();

});

function seatValidateBind() {
	$('.c-seats-selection .c-panel-2 .body-casual .calculation-list .list-selection li:not(.validate-binded) select').on('change', function (e) {
	    var data = $(e.currentTarget).val();
	    
	    if(data !== ''){
	    	$(e.currentTarget).closest('li').removeClass('has-error');
	    	$('html').removeClass('validation-overlay');
	    	$('.c-seats-selection .c-panel-2 .body-casual .calculation-list .list-selection li').css({
	    		'z-index': ''
	    	}).removeClass('is-validated');
	    }
	});
	$('.c-seats-selection .c-panel-2 .body-casual .calculation-list .list-selection li').addClass('validate-binded');
}
	