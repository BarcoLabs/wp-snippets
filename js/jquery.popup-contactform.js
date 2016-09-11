require('../css/jquery.popup-contactform.css')
var template = require('../templates/jquery.popup-contactform.html')

jQuery(function($) {

	$.fn.popupContactform = function() {
		var self = this
		var $popup = $('.popup-contact-form')

		if ($popup.length == 0) {
			var $body = $('body')
			$body.append($(template))
			$popup = $('.popup-contact-form')
		}

		var $dim = $popup.find('.dim')
		var $form = $popup.find('.form')
		var $submit = $form.find('button')

		$dim.click(function() { $popup.hide() })
		$submit.click(function() { $popup.hide() })
		this.click(function(e) {
			e.preventDefault()
			$popup.show()
		})
	}
})
