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
	__webpack_require__(5)
	__webpack_require__(7)
	__webpack_require__(8)
	__webpack_require__(9)
	jQuery(function($) {
		var cursor = 'url(http://barcolabs.com:8081/wp-content/uploads/2016/03/moskito@125x.png),auto'
		$('body, a').css('cursor', cursor)
		$('.parallax').parallax()
		$('a[href^="#modal"]').leanModal()
	})

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./jquery.modal.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./jquery.modal.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "#lean_overlay {\r\n    position: fixed;\r\n    z-index:100;\r\n    top: 0px;\r\n    left: 0px;\r\n    height:100%;\r\n    width:100%;\r\n    background: #000;\r\n    display: none;\r\n}", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./style.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./style.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".et_search_outer {\r\n\tpointer-events: none;\r\n}\r\n\r\n.et-search-form {\r\n\tpointer-events: all;\r\n}", ""]);

	// exports


/***/ },
/* 7 */
/***/ function(module, exports) {

	// leanModal v1.1 by Ray Stone - http://finelysliced.com.au
	// Dual licensed under the MIT and GPL

	(function($){$.fn.extend({leanModal:function(options){var defaults={top:100,overlay:0.5,closeButton:null};var overlay=$("<div id='lean_overlay'></div>");$("body").append(overlay);options=$.extend(defaults,options);return this.each(function(){var o=options;$(this).click(function(e){var modal_id=$(this).attr("href");$("#lean_overlay").click(function(){close_modal(modal_id)});$(o.closeButton).click(function(){close_modal(modal_id)});var modal_height=$(modal_id).outerHeight();var modal_width=$(modal_id).outerWidth();
	$("#lean_overlay").css({"display":"block",opacity:0});$("#lean_overlay").fadeTo(200,o.overlay);$(modal_id).css({"display":"block","position":"fixed","opacity":0,"z-index":11000,"left":50+"%","margin-left":-(modal_width/2)+"px","top":o.top+"px"});$(modal_id).fadeTo(200,1);e.preventDefault()})});function close_modal(modal_id){$("#lean_overlay").fadeOut(200);$(modal_id).css({"display":"none"})}}})})(jQuery);

/***/ },
/* 8 */
/***/ function(module, exports) {

	//============================================================
	//
	// The MIT License
	//
	// Copyright (C) 2014 Matthew Wagerfield - @wagerfield
	//
	// Permission is hereby granted, free of charge, to any
	// person obtaining a copy of this software and associated
	// documentation files (the "Software"), to deal in the
	// Software without restriction, including without limitation
	// the rights to use, copy, modify, merge, publish, distribute,
	// sublicense, and/or sell copies of the Software, and to
	// permit persons to whom the Software is furnished to do
	// so, subject to the following conditions:
	//
	// The above copyright notice and this permission notice
	// shall be included in all copies or substantial portions
	// of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY
	// OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
	// LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
	// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO
	// EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
	// FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
	// AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
	// OR OTHER DEALINGS IN THE SOFTWARE.
	//
	//============================================================

	/**
	 * jQuery || Zepto Parallax Plugin
	 * @author Matthew Wagerfield - @wagerfield
	 * @description Creates a parallax effect between an array of layers,
	 *              driving the motion from the gyroscope output of a smartdevice.
	 *              If no gyroscope is available, the cursor position is used.
	 */
	;(function($, window, document, undefined) {

	  // Strict Mode
	  'use strict';

	  // Constants
	  var NAME = 'parallax';
	  var MAGIC_NUMBER = 30;
	  var DEFAULTS = {
	    relativeInput: false,
	    clipRelativeInput: false,
	    calibrationThreshold: 100,
	    calibrationDelay: 500,
	    supportDelay: 500,
	    calibrateX: false,
	    calibrateY: true,
	    invertX: true,
	    invertY: true,
	    limitX: false,
	    limitY: false,
	    scalarX: 10.0,
	    scalarY: 10.0,
	    frictionX: 0.1,
	    frictionY: 0.1,
	    originX: 0.5,
	    originY: 0.5
	  };

	  function Plugin(element, options) {

	    // DOM Context
	    this.element = element;

	    // Selections
	    this.$context = $(element).data('api', this);
	    this.$layers = this.$context.find('.layer');

	    // Data Extraction
	    var data = {
	      calibrateX: this.$context.data('calibrate-x') || null,
	      calibrateY: this.$context.data('calibrate-y') || null,
	      invertX: this.$context.data('invert-x') || null,
	      invertY: this.$context.data('invert-y') || null,
	      limitX: parseFloat(this.$context.data('limit-x')) || null,
	      limitY: parseFloat(this.$context.data('limit-y')) || null,
	      scalarX: parseFloat(this.$context.data('scalar-x')) || null,
	      scalarY: parseFloat(this.$context.data('scalar-y')) || null,
	      frictionX: parseFloat(this.$context.data('friction-x')) || null,
	      frictionY: parseFloat(this.$context.data('friction-y')) || null,
	      originX: parseFloat(this.$context.data('origin-x')) || null,
	      originY: parseFloat(this.$context.data('origin-y')) || null
	    };

	    // Delete Null Data Values
	    for (var key in data) {
	      if (data[key] === null) delete data[key];
	    }

	    // Compose Settings Object
	    $.extend(this, DEFAULTS, options, data);

	    // States
	    this.calibrationTimer = null;
	    this.calibrationFlag = true;
	    this.enabled = false;
	    this.depths = [];
	    this.raf = null;

	    // Element Bounds
	    this.bounds = null;
	    this.ex = 0;
	    this.ey = 0;
	    this.ew = 0;
	    this.eh = 0;

	    // Element Center
	    this.ecx = 0;
	    this.ecy = 0;

	    // Element Range
	    this.erx = 0;
	    this.ery = 0;

	    // Calibration
	    this.cx = 0;
	    this.cy = 0;

	    // Input
	    this.ix = 0;
	    this.iy = 0;

	    // Motion
	    this.mx = 0;
	    this.my = 0;

	    // Velocity
	    this.vx = 0;
	    this.vy = 0;

	    // Callbacks
	    this.onMouseMove = this.onMouseMove.bind(this);
	    this.onDeviceOrientation = this.onDeviceOrientation.bind(this);
	    this.onOrientationTimer = this.onOrientationTimer.bind(this);
	    this.onCalibrationTimer = this.onCalibrationTimer.bind(this);
	    this.onAnimationFrame = this.onAnimationFrame.bind(this);
	    this.onWindowResize = this.onWindowResize.bind(this);

	    // Initialise
	    this.initialise();
	  }

	  Plugin.prototype.transformSupport = function(value) {
	    var element = document.createElement('div');
	    var propertySupport = false;
	    var propertyValue = null;
	    var featureSupport = false;
	    var cssProperty = null;
	    var jsProperty = null;
	    for (var i = 0, l = this.vendors.length; i < l; i++) {
	      if (this.vendors[i] !== null) {
	        cssProperty = this.vendors[i][0] + 'transform';
	        jsProperty = this.vendors[i][1] + 'Transform';
	      } else {
	        cssProperty = 'transform';
	        jsProperty = 'transform';
	      }
	      if (element.style[jsProperty] !== undefined) {
	        propertySupport = true;
	        break;
	      }
	    }
	    switch(value) {
	      case '2D':
	        featureSupport = propertySupport;
	        break;
	      case '3D':
	        if (propertySupport) {
	          var body = document.body || document.createElement('body');
	          var documentElement = document.documentElement;
	          var documentOverflow = documentElement.style.overflow;
	          if (!document.body) {
	            documentElement.style.overflow = 'hidden';
	            documentElement.appendChild(body);
	            body.style.overflow = 'hidden';
	            body.style.background = '';
	          }
	          body.appendChild(element);
	          element.style[jsProperty] = 'translate3d(1px,1px,1px)';
	          propertyValue = window.getComputedStyle(element).getPropertyValue(cssProperty);
	          featureSupport = propertyValue !== undefined && propertyValue.length > 0 && propertyValue !== "none";
	          documentElement.style.overflow = documentOverflow;
	          body.removeChild(element);
	        }
	        break;
	    }
	    return featureSupport;
	  };

	  Plugin.prototype.ww = null;
	  Plugin.prototype.wh = null;
	  Plugin.prototype.wcx = null;
	  Plugin.prototype.wcy = null;
	  Plugin.prototype.wrx = null;
	  Plugin.prototype.wry = null;
	  Plugin.prototype.portrait = null;
	  Plugin.prototype.desktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i);
	  Plugin.prototype.vendors = [null,['-webkit-','webkit'],['-moz-','Moz'],['-o-','O'],['-ms-','ms']];
	  Plugin.prototype.motionSupport = !!window.DeviceMotionEvent;
	  Plugin.prototype.orientationSupport = !!window.DeviceOrientationEvent;
	  Plugin.prototype.orientationStatus = 0;
	  Plugin.prototype.transform2DSupport = Plugin.prototype.transformSupport('2D');
	  Plugin.prototype.transform3DSupport = Plugin.prototype.transformSupport('3D');
	  Plugin.prototype.propertyCache = {};

	  Plugin.prototype.initialise = function() {

	    // Configure Styles
	    if (this.$context.css('position') === 'static') {
	      this.$context.css({
	        position:'relative'
	      });
	    }

	    // Hardware Accelerate Context
	    this.accelerate(this.$context);

	    // Setup
	    this.updateLayers();
	    this.updateDimensions();
	    this.enable();
	    this.queueCalibration(this.calibrationDelay);
	  };

	  Plugin.prototype.updateLayers = function() {

	    // Cache Layer Elements
	    this.$layers = this.$context.find('.layer');
	    this.depths = [];

	    // Configure Layer Styles
	    this.$layers.css({
	      position:'absolute',
	      display:'block',
	      left: 0,
	      top: 0
	    });
	    this.$layers.first().css({
	      position:'relative'
	    });

	    // Hardware Accelerate Layers
	    this.accelerate(this.$layers);

	    // Cache Depths
	    this.$layers.each($.proxy(function(index, element) {
	      this.depths.push($(element).data('depth') || 0);
	    }, this));
	  };

	  Plugin.prototype.updateDimensions = function() {
	    this.ww = window.innerWidth;
	    this.wh = window.innerHeight;
	    this.wcx = this.ww * this.originX;
	    this.wcy = this.wh * this.originY;
	    this.wrx = Math.max(this.wcx, this.ww - this.wcx);
	    this.wry = Math.max(this.wcy, this.wh - this.wcy);
	  };

	  Plugin.prototype.updateBounds = function() {
	    this.bounds = this.element.getBoundingClientRect();
	    this.ex = this.bounds.left;
	    this.ey = this.bounds.top;
	    this.ew = this.bounds.width;
	    this.eh = this.bounds.height;
	    this.ecx = this.ew * this.originX;
	    this.ecy = this.eh * this.originY;
	    this.erx = Math.max(this.ecx, this.ew - this.ecx);
	    this.ery = Math.max(this.ecy, this.eh - this.ecy);
	  };

	  Plugin.prototype.queueCalibration = function(delay) {
	    clearTimeout(this.calibrationTimer);
	    this.calibrationTimer = setTimeout(this.onCalibrationTimer, delay);
	  };

	  Plugin.prototype.enable = function() {
	    if (!this.enabled) {
	      this.enabled = true;
	      if (this.orientationSupport) {
	        this.portrait = null;
	        window.addEventListener('deviceorientation', this.onDeviceOrientation);
	        setTimeout(this.onOrientationTimer, this.supportDelay);
	      } else {
	        this.cx = 0;
	        this.cy = 0;
	        this.portrait = false;
	        window.addEventListener('mousemove', this.onMouseMove);
	      }
	      window.addEventListener('resize', this.onWindowResize);
	      this.raf = requestAnimationFrame(this.onAnimationFrame);
	    }
	  };

	  Plugin.prototype.disable = function() {
	    if (this.enabled) {
	      this.enabled = false;
	      if (this.orientationSupport) {
	        window.removeEventListener('deviceorientation', this.onDeviceOrientation);
	      } else {
	        window.removeEventListener('mousemove', this.onMouseMove);
	      }
	      window.removeEventListener('resize', this.onWindowResize);
	      cancelAnimationFrame(this.raf);
	    }
	  };

	  Plugin.prototype.calibrate = function(x, y) {
	    this.calibrateX = x === undefined ? this.calibrateX : x;
	    this.calibrateY = y === undefined ? this.calibrateY : y;
	  };

	  Plugin.prototype.invert = function(x, y) {
	    this.invertX = x === undefined ? this.invertX : x;
	    this.invertY = y === undefined ? this.invertY : y;
	  };

	  Plugin.prototype.friction = function(x, y) {
	    this.frictionX = x === undefined ? this.frictionX : x;
	    this.frictionY = y === undefined ? this.frictionY : y;
	  };

	  Plugin.prototype.scalar = function(x, y) {
	    this.scalarX = x === undefined ? this.scalarX : x;
	    this.scalarY = y === undefined ? this.scalarY : y;
	  };

	  Plugin.prototype.limit = function(x, y) {
	    this.limitX = x === undefined ? this.limitX : x;
	    this.limitY = y === undefined ? this.limitY : y;
	  };

	  Plugin.prototype.origin = function(x, y) {
	    this.originX = x === undefined ? this.originX : x;
	    this.originY = y === undefined ? this.originY : y;
	  };

	  Plugin.prototype.clamp = function(value, min, max) {
	    value = Math.max(value, min);
	    value = Math.min(value, max);
	    return value;
	  };

	  Plugin.prototype.css = function(element, property, value) {
	    var jsProperty = this.propertyCache[property];
	    if (!jsProperty) {
	      for (var i = 0, l = this.vendors.length; i < l; i++) {
	        if (this.vendors[i] !== null) {
	          jsProperty = $.camelCase(this.vendors[i][1] + '-' + property);
	        } else {
	          jsProperty = property;
	        }
	        if (element.style[jsProperty] !== undefined) {
	          this.propertyCache[property] = jsProperty;
	          break;
	        }
	      }
	    }
	    element.style[jsProperty] = value;
	  };

	  Plugin.prototype.accelerate = function($element) {
	    for (var i = 0, l = $element.length; i < l; i++) {
	      var element = $element[i];
	      this.css(element, 'transform', 'translate3d(0,0,0)');
	      this.css(element, 'transform-style', 'preserve-3d');
	      this.css(element, 'backface-visibility', 'hidden');
	    }
	  };

	  Plugin.prototype.setPosition = function(element, x, y) {
	    x += 'px';
	    y += 'px';
	    if (this.transform3DSupport) {
	      this.css(element, 'transform', 'translate3d('+x+','+y+',0)');
	    } else if (this.transform2DSupport) {
	      this.css(element, 'transform', 'translate('+x+','+y+')');
	    } else {
	      element.style.left = x;
	      element.style.top = y;
	    }
	  };

	  Plugin.prototype.onOrientationTimer = function(event) {
	    if (this.orientationSupport && this.orientationStatus === 0) {
	      this.disable();
	      this.orientationSupport = false;
	      this.enable();
	    }
	  };

	  Plugin.prototype.onCalibrationTimer = function(event) {
	    this.calibrationFlag = true;
	  };

	  Plugin.prototype.onWindowResize = function(event) {
	    this.updateDimensions();
	  };

	  Plugin.prototype.onAnimationFrame = function() {
	    this.updateBounds();
	    var dx = this.ix - this.cx;
	    var dy = this.iy - this.cy;
	    if ((Math.abs(dx) > this.calibrationThreshold) || (Math.abs(dy) > this.calibrationThreshold)) {
	      this.queueCalibration(0);
	    }
	    if (this.portrait) {
	      this.mx = this.calibrateX ? dy : this.iy;
	      this.my = this.calibrateY ? dx : this.ix;
	    } else {
	      this.mx = this.calibrateX ? dx : this.ix;
	      this.my = this.calibrateY ? dy : this.iy;
	    }
	    this.mx *= this.ew * (this.scalarX / 100);
	    this.my *= this.eh * (this.scalarY / 100);
	    if (!isNaN(parseFloat(this.limitX))) {
	      this.mx = this.clamp(this.mx, -this.limitX, this.limitX);
	    }
	    if (!isNaN(parseFloat(this.limitY))) {
	      this.my = this.clamp(this.my, -this.limitY, this.limitY);
	    }
	    this.vx += (this.mx - this.vx) * this.frictionX;
	    this.vy += (this.my - this.vy) * this.frictionY;
	    for (var i = 0, l = this.$layers.length; i < l; i++) {
	      var depth = this.depths[i];
	      var layer = this.$layers[i];
	      var xOffset = this.vx * depth * (this.invertX ? -1 : 1);
	      var yOffset = this.vy * depth * (this.invertY ? -1 : 1);
	      this.setPosition(layer, xOffset, yOffset);
	    }
	    this.raf = requestAnimationFrame(this.onAnimationFrame);
	  };

	  Plugin.prototype.onDeviceOrientation = function(event) {

	    // Validate environment and event properties.
	    if (!this.desktop && event.beta !== null && event.gamma !== null) {

	      // Set orientation status.
	      this.orientationStatus = 1;

	      // Extract Rotation
	      var x = (event.beta  || 0) / MAGIC_NUMBER; //  -90 :: 90
	      var y = (event.gamma || 0) / MAGIC_NUMBER; // -180 :: 180

	      // Detect Orientation Change
	      var portrait = window.innerHeight > window.innerWidth;
	      if (this.portrait !== portrait) {
	        this.portrait = portrait;
	        this.calibrationFlag = true;
	      }

	      // Set Calibration
	      if (this.calibrationFlag) {
	        this.calibrationFlag = false;
	        this.cx = x;
	        this.cy = y;
	      }

	      // Set Input
	      this.ix = x;
	      this.iy = y;
	    }
	  };

	  Plugin.prototype.onMouseMove = function(event) {

	    // Cache mouse coordinates.
	    var clientX = event.clientX;
	    var clientY = event.clientY;

	    // Calculate Mouse Input
	    if (!this.orientationSupport && this.relativeInput) {

	      // Clip mouse coordinates inside element bounds.
	      if (this.clipRelativeInput) {
	        clientX = Math.max(clientX, this.ex);
	        clientX = Math.min(clientX, this.ex + this.ew);
	        clientY = Math.max(clientY, this.ey);
	        clientY = Math.min(clientY, this.ey + this.eh);
	      }

	      // Calculate input relative to the element.
	      this.ix = (clientX - this.ex - this.ecx) / this.erx;
	      this.iy = (clientY - this.ey - this.ecy) / this.ery;

	    } else {

	      // Calculate input relative to the window.
	      this.ix = (clientX - this.wcx) / this.wrx;
	      this.iy = (clientY - this.wcy) / this.wry;
	    }
	  };

	  var API = {
	    enable: Plugin.prototype.enable,
	    disable: Plugin.prototype.disable,
	    updateLayers: Plugin.prototype.updateLayers,
	    calibrate: Plugin.prototype.calibrate,
	    friction: Plugin.prototype.friction,
	    invert: Plugin.prototype.invert,
	    scalar: Plugin.prototype.scalar,
	    limit: Plugin.prototype.limit,
	    origin: Plugin.prototype.origin
	  };

	  $.fn[NAME] = function (value) {
	    var args = arguments;
	    return this.each(function () {
	      var $this = $(this);
	      var plugin = $this.data(NAME);
	      if (!plugin) {
	        plugin = new Plugin(this, value);
	        $this.data(NAME, plugin);
	      }
	      if (API[value]) {
	        plugin[value].apply(plugin, Array.prototype.slice.call(args, 1));
	      }
	    });
	  };

	})(window.jQuery || window.Zepto, window, document);

	/**
	 * Request Animation Frame Polyfill.
	 * @author Tino Zijdel
	 * @author Paul Irish
	 * @see https://gist.github.com/paulirish/1579671
	 */
	;(function() {

	  var lastTime = 0;
	  var vendors = ['ms', 'moz', 'webkit', 'o'];

	  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
	    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
	  }

	  if (!window.requestAnimationFrame) {
	    window.requestAnimationFrame = function(callback, element) {
	      var currTime = new Date().getTime();
	      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	      var id = window.setTimeout(function() { callback(currTime + timeToCall); },
	        timeToCall);
	      lastTime = currTime + timeToCall;
	      return id;
	    };
	  }

	  if (!window.cancelAnimationFrame) {
	    window.cancelAnimationFrame = function(id) {
	      clearTimeout(id);
	    };
	  }

	}());


/***/ },
/* 9 */
/***/ function(module, exports) {

	(function() {

		var CONFIG = {
			// Title to appear on the left of the nav items
			title: 'Title',
			selectors: {
				// Where the nav menu will be inserted
				menu: '.menu',
				// Macthes each section that needs to be added to the nav menu
				sections: '.et_pb_section:not(.et_pb_section_0)',
				// Matches the title that will be given to a section INSIDE A SECTION
				title: '.title'
			}
		}

		jQuery(function($) {
			var $sections = $(CONFIG.selectors.sections)

			$sections.hide()
			$sections = $sections.filter(function(idx) {
				var $section = $(this);
				var $title = $section.find(CONFIG.selectors.title)

				if ($title.length <= 0) {
					console.error('Section ' + idx + ' has not a title section. Ignoring and WILL BE ALWAYS SHOWN')
					$section.show()
					return false
				}

				var title = $title
							.text()
							.trim()

				var hash = title
							.toLowerCase()
							.replace(/[^a-z0-9]/g, '-')
							.replace(/\-+/g, '-')
							.replace(/^-/g, '')
							.replace(/-$/g, '')

				$section.data('hash', '#' + hash)
						.data('title', title)
				return true;
			})
			
			var $menuContainer = $(CONFIG.selectors.menu)
			$sections.each(function() {
				var $section = $(this)
				$('<a>')
				.html($section.data('title'))
				.attr('href', $section.data('hash'))
				.appendTo($menuContainer)
			})

			$(window).on('hashchange', function() {
				var hash = window.location.hash
				var $section = $sections.filter(function() {
					return $(this).data('hash') == hash
				})

				if ($section.length > 0) {
					$sections.hide()
					$section.show()
					$menuContainer.find('a').removeClass('active')
					$menuContainer.find('a[href="' + hash + '"]').addClass('active')
				}
			})

			if (window.location.hash && window.location.hash.length > 0)
				$(window).trigger('hashchange')
			else
				$sections.first().show();
		})
	})()

/***/ }
/******/ ]);