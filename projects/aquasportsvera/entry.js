require('./style.css')
jQuery(function($) {
  $('#aqvera-full-info-section > div > div').addClass('col-12')
  $('#aqvera-full-info-section > div > div').removeClass('col-6')
  $('#faq > div > div').addClass('col-12')
  $('#faq > div > div').removeClass('col-6')
  // Subscription popup stuff
  var $popupSub = $('#popup-subscription.home-custom')
  $popupSub.click(function() { $popupSub.hide() })
  $popupSub.find('> * ').click(function(e) { e.stopPropagation() })
  $('.slider-slide-actions a').click(function() { $popupSub.toggle() })
  // -- Subscription popup stuff
  $('.slider-slide-actions a').addClass('secondary cta-button')
  $('.slider-slide-actions a').removeClass('transparent')
  $('#actividades-dirigidas > div > div.col.col-6.col-last.home-info-section-1-content.in-viewport > a').attr('target', '_BLANK')
  $("h4:contains('img-cta')").html('<img src="http://aquasportsvera-es.alcandora.com/wp-content/uploads/2016/09/piscinagym.png"/>')
})

