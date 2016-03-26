(function() {

	var CONFIG = {
		// Title to appear on the left of the nav items
		title: 'Title',
		selectors: {
			// Where the nav menu will be inserted
			menu: '.menu',
			// Macthes each section that needs to be added to the nav menu
			sections: '.et_pb_section:not(.et_pb_section_0)',
			// Matches the title that will be given to a section INSIDE A SECTION
			title: '.title'
		}
	}

	jQuery(function($) {
		var $sections = $(CONFIG.selectors.sections)

		$sections.hide()
		$sections = $sections.filter(function(idx) {
			var $section = $(this);
			var $title = $section.find(CONFIG.selectors.title)

			if ($title.length <= 0) {
				console.error('Section ' + idx + ' has not a title section. Ignoring and WILL BE ALWAYS SHOWN')
				$section.show()
				return false
			}

			var title = $title
						.text()
						.trim()

			var hash = title
						.toLowerCase()
						.replace(/[^a-z0-9]/, '-')
						.replace(/\-+/, '-')
						.replace(/^-/, '')
						.replace(/-$/, '')

			$section.data('hash', '#' + hash)
					.data('title', title)
			return true;
		})
		
		var $menuContainer = $(CONFIG.selectors.menu)
		$sections.each(function() {
			var $section = $(this)
			$('<a>')
			.html($section.data('title'))
			.attr('href', $section.data('hash'))
			.appendTo($menuContainer)
		})

		$(window).on('hashchange', function() {
			var hash = window.location.hash
			var $section = $sections.filter(function() {
				return $(this).data('hash') == hash
			})

			if ($section.length > 0) {
				$sections.hide()
				$section.show()
				$menuContainer.find('a').removeClass('active')
				$menuContainer.find('a[href="' + hash + '"]').addClass('active')
			}
		})
		$(window).trigger('hashchange')
	})
})()