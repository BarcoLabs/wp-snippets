require('../../js/jquery.popup-contactform.js')
require('./style.css')
jQuery(function($) {
  $('#aqvera-full-info-section > div > div').addClass('col-12')
  $('#aqvera-full-info-section > div > div').removeClass('col-6')
  $('#faq > div > div').addClass('col-12')
  $('#faq > div > div').removeClass('col-6')
  $('.slider-slide-actions a').popupContactform()
  $('#actividades-dirigidas > div > div.col.col-6.col-last.home-info-section-1-content.in-viewport > a').attr('target', '_blank');
})