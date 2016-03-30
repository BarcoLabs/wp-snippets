jQuery(function($) {

	$.fn.filterTable = function(tableSelector) {
		var self = this;
		var $table = $(tableSelector)

		self
		.on('change keyup keydown', function() {
			$table
			.find('tbody > tr')
			.filter(function(row) {
				return $(row)
				.find('> td')
				.filter(function(td) {
					var $td = $(td)
					return $td
							.text()
							.trim()
							.indexOf(self.val()) >= 0
				})
				.length > 0
			})
			.hide()
		})
	}

})