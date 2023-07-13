/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "@wordpress/dom-ready":
/*!**********************************!*\
  !*** external ["wp","domReady"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["domReady"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!****************************!*\
  !*** ./src/slider-init.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__);

_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default()(function () {
  const sliderBlocks = Array.from(document.querySelectorAll(".wp-block-create-block-wds-slider"));
  sliderBlocks.map(sliderBlock => {
    const slider = sliderBlock.querySelector(".swiper-main");
    const sliderID = `#${slider.id}`;
    const slidesPerViewMobile = slider.dataset.slidesPerView;
    const slidesPerViewTablet = slider.dataset.slidesPerViewTablet;
    const loop = slider.dataset.loop;
    const autoPlay = slider.dataset.swiperAutoplay;
    const transitionSpeed = slider.dataset.transitionSpeed;
    const navNext = slider.dataset.navNext;
    const navPrev = slider.dataset.navPrev;
    const paginationEl = slider.dataset.paginationEl;
    const effect = slider.dataset.effect;
    // const paginationStyle = slider.dataset.paginationStyle;

    const swiper = new Swiper(sliderID, {
      // Optional parameters
      slidesPerView: slidesPerViewMobile,
      breakpoints: {
        1024: {
          slidesPerView: slidesPerViewTablet
        }
      },
      effect: effect,
      loop: loop,
      autoplay: {
        delay: autoPlay
      },
      speed: transitionSpeed,
      // Navigation arrows
      navigation: {
        nextEl: navNext,
        prevEl: navPrev
      },
      // If we need pagination
      pagination: {
        el: paginationEl,
        clickable: true
      },
      freeMode: true,
      watchSlidesProgress: true
    });
    const thumbs = sliderBlock.querySelector(".thumbs-nav");
    const thumbSlider = new Swiper(thumbs, {
      slidesPerView: "10",
      thumbs: {
        swiper: swiper
      }
    });
  });
});
})();

/******/ })()
;
//# sourceMappingURL=slider-init.js.map