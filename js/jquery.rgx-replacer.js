jQuery(function($) {

	var replace = function(originalHtml, matchers, replaces) {
		var html = originalHtml + ""
		Object.keys(matchers)
		.forEach(function(key) {
			var rgx = matchers[key]
			var rep = replaces[key]
			html = html.replace(rgx, rep)
		})
		return html
	}

	$.fn.rgxReplacer = function(config) {

		if (this.length <= 0)
			return

		var self = this
		var idx = 0
		var originalHtml = this.html()

		var _replace = function(argument) {
			return replace(originalHtml, config.matchers, config.replaces[idx++])
		}

		var triggerReplace = function(instant) {
			if (instant === true)
				return self.html(_replace())

			self.fadeOut(function() {
				self
				.html(_replace())
				.fadeIn()
			})
		}

		setTimeout(triggerReplace, 5000)
		triggerReplace(true)
	}

})
