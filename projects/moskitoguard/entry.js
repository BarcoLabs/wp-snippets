require('../../css/jquery.modal.css')
require('./style.css')
require('../../js/jquery.modal.js')
require('../../js/jquery.parallax.js')
require('../../js/jquery.divi-nav-section.js')
jQuery(function($) {
	var cursor = 'url(http://barcolabs.com:8081/wp-content/uploads/2016/03/moskito@125x.png),auto'
	$('body, a').css('cursor', cursor)
	$('.parallax').parallax()
	$('a[href^="#modal"]').leanModal()
})