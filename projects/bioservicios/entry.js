require('../../js/jquery.clickable-row')
require('../../js/jquery.rgx-replacer')
require('./style.css')
jQuery(function($) {
    $('.piko-top-menu .piko-address:nth(1)').rgxReplacer({
		matchers: {
			title: /Horario/,
			hours: /L\-V 9h\.\-13h\. \| 17h\. \- 20h\./
		},
		replaces: [
			{
				title: 'Horario Oficina',
				hours: 'L-V 9h.-13h. | 17h.-20h.'
			},
			{
				title: 'Horario Laboratorio',
				hours: 'L-V 8h.-14h. | 15h.-18h.'
			}
		]
	})
})