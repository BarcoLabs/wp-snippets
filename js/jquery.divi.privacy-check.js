var template = require('../templates/jquery.divi.privacy-check.html')

jQuery(function($) {

	$.fn.privacyCheck = function() {
    if (this.length <= 0)
      return

		if (!this.is('form'))
			throw new Error('Element is not a form')

		if (this.find('.privacy-check').length <= 0)
			this.append($(template))
	}

})
