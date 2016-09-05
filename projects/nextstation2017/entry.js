require('./style.css')
jQuery(function($) {
  $('#venues > div.col-md-3.col-sm-12.column').addClass('col-md-7')
  $('#venues > div.col-md-3.col-md-7.col-sm-12.column').removeClass('col-md-3')
  $('#directionsPanel').text("Placeholder for directions.")

  // Switch Sponsors & Faq's position.
  var faqDiv = $('#faq').detach();
  $('#partners').append(faqDiv);

})