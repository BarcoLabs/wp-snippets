require('./style.css')
var logo_mess = require('./logo-mess.html')
require('../../js/jquery.divi.anti-fixed-header')
jQuery(function($) {
  $('.logo_container').append(logo_mess)
})
