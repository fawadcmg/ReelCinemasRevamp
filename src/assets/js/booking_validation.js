$(function () {
	
	$('.js-submit-form').click(function() {
		var thisForm = $(this).closest('.js-form');
		if(thisForm.valid()){
			thisForm.submit();
		}
	});

	$('.js-form').each(function () {
		$(this).validate({
			rules: {
				phone: {
					required: true,
					number: true
				},
			},
			messages: {
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
	

	jQuery.extend(jQuery.validator.messages, {
    	required: "You must complete this field",
    	email: "Please enter a valid email address",
	});

});
	