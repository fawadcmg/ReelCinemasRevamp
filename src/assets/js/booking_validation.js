$(function () {
	
	$('.js-submit-form').click(function() {
		var thisForm = $(this).closest('.js-form');
		if(thisForm.valid()){
			thisForm.submit();
		}
	});

	$('.js-form').validate({
		rules: {
			phone: {
				required: true,
				number: true
			}
		},
		messages: {
			password:{
				minlength: jQuery.validator.format("Please enter at least {0} characters")
			},
		},
		errorPlacement: function(error, element) {
			if(element.closest('.form-item').find('.form-item-error-msg').get(0)){
        		element.closest('.form-item').find('.form-item-error-msg').append(error);
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
	jQuery.extend(jQuery.validator.messages, {
    	required: "You must complete this field",
    	email: "Please enter a valid email address",
	});

});
	