jQuery(function($) {

	$.fn.filterTable = function(tableSelector, noResultsSelector) {
		var self = this;
		var $table = $(tableSelector)
		var $empty = $(noResultsSelector)

		self
		.on('input', function() {
			var val = self.val().toLowerCase()
			var $rows = $table.find('tbody > tr')
			var anyRowMatched = false;

			$rows.each(function(idx, row) {
				var $row = $(row)
				var containsVal = $row.text().toLowerCase()
									.indexOf(val) >= 0
				$row.toggle(containsVal)
				anyRowMatched = anyRowMatched || containsVal
			})

			$table.toggle(anyRowMatched)
			$empty.toggle(!anyRowMatched)

		})
	}

})