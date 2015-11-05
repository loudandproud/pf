$(function(){

var form = $('#contact-form'),
	caution = $('#caution');

$(form).submit(function(event){
	event.preventDefault();
	
	formData = $(form).serialize();
	$.ajax({
		type: 'POST',
		url: $(form).attr('action'),
		data:formData
	})
	.done(function(data){
		$(caution).removeClass('error');
		$(caution).addClass('success');

		$(caution).text(data);

		$('#name').val('');
		$('#eamil').val('');
		$('#message').val('');
	})
	.fail(function(data){
		$(caution).removeClass('success');
		$(caution).addClass('error');

		if(data.responseText !== ''){
			$(caution).text(data.responseText);
		}else{
			$(caution).text('Ooops! An error occured and your message could not be sent.');
		}

	});
});
});