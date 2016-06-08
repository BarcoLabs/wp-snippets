require('../../js/jquery.clickable-row')
require('../../js/jquery.rgx-replacer')
require('./style.css')
jQuery(function($) {
    $('.clickable-row').clickableRow()
    $('.piko-top-menu .piko-address:nth(1)').rgxReplacer({
		matchers: {
			title: /(Horario)/,
			hours: /<span>(.*?)<\/span>/
		},
		replaces: [
			{
				title: 'Horaio Oficina',
				hours: 'L-V 9h.-13h. | 17h. - 20h.'
			},
			{
				title: 'Horaio Laboratorio',
				hours: '8h.-14h. / 15h.-18h.'
			}
		]
	})
})