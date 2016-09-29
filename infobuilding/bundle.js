/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1)
	jQuery(function($) {
	  $('form.et_pb_contact_form').privacyCheck()
	})


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var template = __webpack_require__(2)

	jQuery(function($) {

		$.fn.privacyCheck = function() {
	    if (this.length <= 0)
	      return

			if (!this.is('form'))
				throw new Error('Element is not a form')

			if (this.find('.privacy-check').length <= 0)
				this.append($(template))
		}

	})


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = "<div class=\"et_pb_contact_field privacy-check\">\n\t<input name=\"accept-privacy\" type=\"checkbox\" required />\n\t<label for=\"accept-privacy\">He leido y acepto la <a href=\"/politica-de-privacidad\">politica de privacidad</a></label>\n</div>";

/***/ }
/******/ ]);