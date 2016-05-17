require('../../js/jquery.divi.privacy-check')
jQuery(function($) {
	$('form.et_pb_contact_form').privacyCheck()
	$('.breadcrumb')
		.addClass('et_pb_row')
		.appendTo(
			$('<div>', { class: 'breadcrumb-container' })
			.insertAfter('.et_pb_section_0')
		)
})
