(function() {
	var $ = window.jQuery

	var CONFIG = {
		// Title to appear on the left of the nav items
		title: 'Title',
		selectors: {
			// Where the nav menu will be inserted
			menu: '.et_pb_section.menu',
			// Macthes each section that needs to be added to the nav menu
			sections: '.et_pb_section:not(.menu)',
			// Matches the title that will be given to a section INSIDE A SECTION
			title: '.title'
		}
	}

	$(function() {
		var $sections = $(CONFIG.selectors.sections)

		$sections.hide()
		$sections.each(function() {
			var $section = $(this);
			var $title = $section.find(CONFIG.selectors.title)

			var title = ''

			if ($title.length > 0)
				title = $title.text().trim()
			else
				title = $section.text()

			var hash = title.replace(/[^a-z0-9]/, '-')

			$section.data('hash', '#' + hash)
					.data('title', title)
		})
		
		var $menuContainer = $(CONFIG.selectors.menu)
		$sections.each(function() {
			var $section = $(this)
			$('<a>')
			.text($section.data('text'))
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
				$menuContainer.find('a[href=' + hash + ']').addClass('active')
			}
		})
		$(window).trigger('hashchange')
	})
})()