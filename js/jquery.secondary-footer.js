jQuery(function($) {

	$.fn.secondaryFooter = function(text, id) {
		var self = this
		var $footer = $('<div>', { id: id || 'secondary-footer' })
		$footer.text(text)
		self.before($footer)
	}
})
