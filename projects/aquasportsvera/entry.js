require('./style.css')
jQuery(function($) {
  $('#aqvera-full-info-section > div > div').addClass('col-12')
  $('#aqvera-full-info-section > div > div').removeClass('col-6')
  $('#faq > div > div').addClass('col-12')
  $('#faq > div > div').removeClass('col-6')
  // Subscription popup stuff
  var $popupSub = $('#popup-subscription.home-custom')
  var hidePopupSub = function() {
      $popupSub.fadeOut(function() {
        $popupSub.find('.success').hide()
        $popupSub.find('.signup').show()
      })
  }
  $popupSub.click(function() { $popupSub.fadeOut() })
  $popupSub.find('.close').click(function(e) { $popupSub.fadeOut() })
  $popupSub.find('> * ').click(function(e) { e.stopPropagation() })
  $('.slider-slide-actions a').click(function() { $popupSub.fadeToggle() })
  // -- Subscription popup stuff
  $('.slider-slide-actions a').addClass('secondary cta-button')
  $('.slider-slide-actions a').removeClass('transparent')
  $('#actividades-dirigidas a').attr('target', '_BLANK')
  $("h4:contains('img-cta')").html('<img src="http://aquasportsvera.es/wp-content/uploads/2016/09/piscinagym.png"/>')
})

