var ECL = (function (exports) {
  'use strict';

  // Query helper
  var queryAll = function queryAll(selector) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    return [].slice.call(context.querySelectorAll(selector));
  };

  // Heavily inspired by the accordion component from https://github.com/frend/frend.co

  /**
   * @param {object} options Object containing configuration overrides
   */
  var accordions = function accordions() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$selector = _ref.selector,
        selector = _ref$selector === undefined ? '.ecl-accordion' : _ref$selector,
        _ref$headerSelector = _ref.headerSelector,
        headerSelector = _ref$headerSelector === undefined ? '.ecl-accordion__header' : _ref$headerSelector;

    // SUPPORTS
    if (!('querySelector' in document) || !('addEventListener' in window) || !document.documentElement.classList) return null;

    // SETUP
    // set accordion element NodeLists
    var accordionContainers = queryAll(selector);

    // ACTIONS
    function hidePanel(target) {
      // get panel
      var activePanel = document.getElementById(target.getAttribute('aria-controls'));

      target.setAttribute('aria-expanded', 'false');

      // toggle aria-hidden
      activePanel.setAttribute('aria-hidden', 'true');
    }

    function showPanel(target) {
      // get panel
      var activePanel = document.getElementById(target.getAttribute('aria-controls'));

      // set attributes on header
      target.setAttribute('tabindex', 0);
      target.setAttribute('aria-expanded', 'true');

      // toggle aria-hidden and set height on panel
      activePanel.setAttribute('aria-hidden', 'false');
    }

    function togglePanel(target) {
      // close target panel if already active
      if (target.getAttribute('aria-expanded') === 'true') {
        hidePanel(target);
        return;
      }

      showPanel(target);
    }

    function giveHeaderFocus(headerSet, i) {
      // set active focus
      headerSet[i].focus();
    }

    // EVENTS
    function eventHeaderClick(e) {
      togglePanel(e.currentTarget);
    }

    function eventHeaderKeydown(e) {
      // collect header targets, and their prev/next
      var currentHeader = e.currentTarget;
      var isModifierKey = e.metaKey || e.altKey;
      // get context of accordion container and its children
      var thisContainer = currentHeader.parentNode.parentNode;
      var theseHeaders = queryAll(headerSelector, thisContainer);
      var currentHeaderIndex = [].indexOf.call(theseHeaders, currentHeader);

      // don't catch key events when ⌘ or Alt modifier is present
      if (isModifierKey) return;

      // catch enter/space, left/right and up/down arrow key events
      // if new panel show it, if next/prev move focus
      switch (e.keyCode) {
        case 13:
        case 32:
          togglePanel(currentHeader);
          e.preventDefault();
          break;
        case 37:
        case 38:
          {
            var previousHeaderIndex = currentHeaderIndex === 0 ? theseHeaders.length - 1 : currentHeaderIndex - 1;
            giveHeaderFocus(theseHeaders, previousHeaderIndex);
            e.preventDefault();
            break;
          }
        case 39:
        case 40:
          {
            var nextHeaderIndex = currentHeaderIndex < theseHeaders.length - 1 ? currentHeaderIndex + 1 : 0;
            giveHeaderFocus(theseHeaders, nextHeaderIndex);
            e.preventDefault();
            break;
          }
        default:
          break;
      }
    }

    // BIND EVENTS
    function bindAccordionEvents(accordionContainer) {
      var accordionHeaders = queryAll(headerSelector, accordionContainer);
      // bind all accordion header click and keydown events
      accordionHeaders.forEach(function (accordionHeader) {
        accordionHeader.addEventListener('click', eventHeaderClick);
        accordionHeader.addEventListener('keydown', eventHeaderKeydown);
      });
    }

    // UNBIND EVENTS
    function unbindAccordionEvents(accordionContainer) {
      var accordionHeaders = queryAll(headerSelector, accordionContainer);
      // unbind all accordion header click and keydown events
      accordionHeaders.forEach(function (accordionHeader) {
        accordionHeader.removeEventListener('click', eventHeaderClick);
        accordionHeader.removeEventListener('keydown', eventHeaderKeydown);
      });
    }

    // DESTROY
    function destroy() {
      accordionContainers.forEach(function (accordionContainer) {
        unbindAccordionEvents(accordionContainer);
      });
    }

    // INIT
    function init() {
      if (accordionContainers.length) {
        accordionContainers.forEach(function (accordionContainer) {
          bindAccordionEvents(accordionContainer);
        });
      }
    }

    init();

    // REVEAL API
    return {
      init: init,
      destroy: destroy
    };
  };

  var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  /**
   * lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="npm" -o ./`
   * Copyright jQuery Foundation and other contributors <https://jquery.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   */

  /** Used as the `TypeError` message for "Functions" methods. */
  var FUNC_ERROR_TEXT = 'Expected a function';

  /** Used as references for various `Number` constants. */
  var NAN = 0 / 0;

  /** `Object#toString` result references. */
  var symbolTag = '[object Symbol]';

  /** Used to match leading and trailing whitespace. */
  var reTrim = /^\s+|\s+$/g;

  /** Used to detect bad signed hexadecimal string values. */
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

  /** Used to detect binary string values. */
  var reIsBinary = /^0b[01]+$/i;

  /** Used to detect octal string values. */
  var reIsOctal = /^0o[0-7]+$/i;

  /** Built-in method references without a dependency on `root`. */
  var freeParseInt = parseInt;

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = _typeof(commonjsGlobal) == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

  /** Detect free variable `self`. */
  var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = freeGlobal || freeSelf || Function('return this')();

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var objectToString = objectProto.toString;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax = Math.max,
      nativeMin = Math.min;

  /**
   * Gets the timestamp of the number of milliseconds that have elapsed since
   * the Unix epoch (1 January 1970 00:00:00 UTC).
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Date
   * @returns {number} Returns the timestamp.
   * @example
   *
   * _.defer(function(stamp) {
   *   console.log(_.now() - stamp);
   * }, _.now());
   * // => Logs the number of milliseconds it took for the deferred invocation.
   */
  var now = function now() {
    return root.Date.now();
  };

  /**
   * Creates a debounced function that delays invoking `func` until after `wait`
   * milliseconds have elapsed since the last time the debounced function was
   * invoked. The debounced function comes with a `cancel` method to cancel
   * delayed `func` invocations and a `flush` method to immediately invoke them.
   * Provide `options` to indicate whether `func` should be invoked on the
   * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
   * with the last arguments provided to the debounced function. Subsequent
   * calls to the debounced function return the result of the last `func`
   * invocation.
   *
   * **Note:** If `leading` and `trailing` options are `true`, `func` is
   * invoked on the trailing edge of the timeout only if the debounced function
   * is invoked more than once during the `wait` timeout.
   *
   * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
   * until to the next tick, similar to `setTimeout` with a timeout of `0`.
   *
   * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
   * for details over the differences between `_.debounce` and `_.throttle`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to debounce.
   * @param {number} [wait=0] The number of milliseconds to delay.
   * @param {Object} [options={}] The options object.
   * @param {boolean} [options.leading=false]
   *  Specify invoking on the leading edge of the timeout.
   * @param {number} [options.maxWait]
   *  The maximum time `func` is allowed to be delayed before it's invoked.
   * @param {boolean} [options.trailing=true]
   *  Specify invoking on the trailing edge of the timeout.
   * @returns {Function} Returns the new debounced function.
   * @example
   *
   * // Avoid costly calculations while the window size is in flux.
   * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
   *
   * // Invoke `sendMail` when clicked, debouncing subsequent calls.
   * jQuery(element).on('click', _.debounce(sendMail, 300, {
   *   'leading': true,
   *   'trailing': false
   * }));
   *
   * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
   * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
   * var source = new EventSource('/stream');
   * jQuery(source).on('message', debounced);
   *
   * // Cancel the trailing debounced invocation.
   * jQuery(window).on('popstate', debounced.cancel);
   */
  function debounce(func, wait, options) {
    var lastArgs,
        lastThis,
        maxWait,
        result,
        timerId,
        lastCallTime,
        lastInvokeTime = 0,
        leading = false,
        maxing = false,
        trailing = true;

    if (typeof func != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    wait = toNumber(wait) || 0;
    if (isObject(options)) {
      leading = !!options.leading;
      maxing = 'maxWait' in options;
      maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
      trailing = 'trailing' in options ? !!options.trailing : trailing;
    }

    function invokeFunc(time) {
      var args = lastArgs,
          thisArg = lastThis;

      lastArgs = lastThis = undefined;
      lastInvokeTime = time;
      result = func.apply(thisArg, args);
      return result;
    }

    function leadingEdge(time) {
      // Reset any `maxWait` timer.
      lastInvokeTime = time;
      // Start the timer for the trailing edge.
      timerId = setTimeout(timerExpired, wait);
      // Invoke the leading edge.
      return leading ? invokeFunc(time) : result;
    }

    function remainingWait(time) {
      var timeSinceLastCall = time - lastCallTime,
          timeSinceLastInvoke = time - lastInvokeTime,
          result = wait - timeSinceLastCall;

      return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
    }

    function shouldInvoke(time) {
      var timeSinceLastCall = time - lastCallTime,
          timeSinceLastInvoke = time - lastInvokeTime;

      // Either this is the first call, activity has stopped and we're at the
      // trailing edge, the system time has gone backwards and we're treating
      // it as the trailing edge, or we've hit the `maxWait` limit.
      return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
    }

    function timerExpired() {
      var time = now();
      if (shouldInvoke(time)) {
        return trailingEdge(time);
      }
      // Restart the timer.
      timerId = setTimeout(timerExpired, remainingWait(time));
    }

    function trailingEdge(time) {
      timerId = undefined;

      // Only invoke if we have `lastArgs` which means `func` has been
      // debounced at least once.
      if (trailing && lastArgs) {
        return invokeFunc(time);
      }
      lastArgs = lastThis = undefined;
      return result;
    }

    function cancel() {
      if (timerId !== undefined) {
        clearTimeout(timerId);
      }
      lastInvokeTime = 0;
      lastArgs = lastCallTime = lastThis = timerId = undefined;
    }

    function flush() {
      return timerId === undefined ? result : trailingEdge(now());
    }

    function debounced() {
      var time = now(),
          isInvoking = shouldInvoke(time);

      lastArgs = arguments;
      lastThis = this;
      lastCallTime = time;

      if (isInvoking) {
        if (timerId === undefined) {
          return leadingEdge(lastCallTime);
        }
        if (maxing) {
          // Handle invocations in a tight loop.
          timerId = setTimeout(timerExpired, wait);
          return invokeFunc(lastCallTime);
        }
      }
      if (timerId === undefined) {
        timerId = setTimeout(timerExpired, wait);
      }
      return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
  }

  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */
  function isObject(value) {
    var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
    return !!value && (type == 'object' || type == 'function');
  }

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike(value) {
    return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
  }

  /**
   * Checks if `value` is classified as a `Symbol` primitive or object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
   * @example
   *
   * _.isSymbol(Symbol.iterator);
   * // => true
   *
   * _.isSymbol('abc');
   * // => false
   */
  function isSymbol(value) {
    return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
  }

  /**
   * Converts `value` to a number.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to process.
   * @returns {number} Returns the number.
   * @example
   *
   * _.toNumber(3.2);
   * // => 3.2
   *
   * _.toNumber(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toNumber(Infinity);
   * // => Infinity
   *
   * _.toNumber('3.2');
   * // => 3.2
   */
  function toNumber(value) {
    if (typeof value == 'number') {
      return value;
    }
    if (isSymbol(value)) {
      return NAN;
    }
    if (isObject(value)) {
      var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
      value = isObject(other) ? other + '' : other;
    }
    if (typeof value != 'string') {
      return value === 0 ? value : +value;
    }
    value = value.replace(reTrim, '');
    var isBinary = reIsBinary.test(value);
    return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
  }

  var lodash_debounce = debounce;

  /**
   * @param {object} options Object containing configuration overrides
   */
  var initBreadcrumb = function initBreadcrumb() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$breadcrumbSelect = _ref.breadcrumbSelector,
        breadcrumbSelector = _ref$breadcrumbSelect === undefined ? '.ecl-breadcrumb' : _ref$breadcrumbSelect,
        _ref$expandButtonSele = _ref.expandButtonSelector,
        expandButtonSelector = _ref$expandButtonSele === undefined ? '.ecl-breadcrumb__expand-btn' : _ref$expandButtonSele,
        _ref$segmentSelector = _ref.segmentSelector,
        segmentSelector = _ref$segmentSelector === undefined ? '.ecl-breadcrumb__segment' : _ref$segmentSelector,
        _ref$segmentFirstSele = _ref.segmentFirstSelector,
        segmentFirstSelector = _ref$segmentFirstSele === undefined ? '.ecl-breadcrumb__segment--first' : _ref$segmentFirstSele,
        _ref$segmentVisibleSe = _ref.segmentVisibleSelector,
        segmentVisibleSelector = _ref$segmentVisibleSe === undefined ? '.ecl-breadcrumb__segment:not(.ecl-breadcrumb__segment--first):not(.ecl-breadcrumb__segment--ellipsis):not(.ecl-breadcrumb__segment--last):not([aria-hidden="true"])' : _ref$segmentVisibleSe,
        _ref$segmentHiddenSel = _ref.segmentHiddenSelector,
        segmentHiddenSelector = _ref$segmentHiddenSel === undefined ? '.ecl-breadcrumb__segment[aria-hidden="true"]:not(.ecl-breadcrumb__segment--ellipsis)' : _ref$segmentHiddenSel,
        _ref$ellipsisSelector = _ref.ellipsisSelector,
        ellipsisSelector = _ref$ellipsisSelector === undefined ? '.ecl-breadcrumb__segment--ellipsis' : _ref$ellipsisSelector;

    if (!('querySelector' in document) || !('addEventListener' in window) || !document.documentElement.classList) return null;

    // ACTIONS
    function initEllipsis(breadcrumbContainer) {
      // add ellipsis to DOM
      var breadcrumbFirst = queryAll(segmentFirstSelector, breadcrumbContainer);
      breadcrumbFirst.forEach(function (segment) {
        var ellipsis = document.createElement('a');
        // we can't add multipls classes at once, because... IE
        ellipsis.classList.add('ecl-link');
        ellipsis.classList.add('ecl-link--inverted');
        ellipsis.classList.add('ecl-link--standalone');
        ellipsis.classList.add('ecl-breadcrumb__link');
        ellipsis.classList.add('ecl-breadcrumb__expand-btn');
        ellipsis.setAttribute('href', '#');
        ellipsis.innerHTML = '…';

        var listItem = document.createElement('li');
        listItem.classList.add('ecl-breadcrumb__segment');
        listItem.classList.add('ecl-breadcrumb__segment--ellipsis');
        listItem.classList.add('ecl-u-aria');
        listItem.setAttribute('aria-hidden', 'true');

        listItem.appendChild(ellipsis);
        segment.parentNode.insertBefore(listItem, segment.nextSibling);
      });
    }

    function toggleEllipsis(breadcrumbContainer) {
      // get hidden segments
      var breadcrumbHiddenSegments = queryAll(segmentHiddenSelector, breadcrumbContainer);
      var hidden = breadcrumbHiddenSegments.length > 0 ? 'false' : 'true';

      // display ellipsis when needed
      var breadcrumbEllipsis = queryAll(ellipsisSelector, breadcrumbContainer);
      breadcrumbEllipsis.forEach(function (ellipsis) {
        ellipsis.setAttribute('aria-hidden', hidden);
      });
    }

    function breadcrumbIsTooLarge(breadcrumbContainer) {
      // get wrapper width
      var wrapperWidth = Math.floor(breadcrumbContainer.getBoundingClientRect().width);

      // get displayed segments
      var breadcrumbSegments = queryAll(segmentSelector, breadcrumbContainer);

      // get segments width
      var segmentWidth = 0;
      breadcrumbSegments.forEach(function (breadcrumbSegment) {
        segmentWidth += Math.ceil(breadcrumbSegment.getBoundingClientRect().width);
      });

      return segmentWidth >= wrapperWidth;
    }

    function hideSegment(breadcrumbContainer) {
      // get visible segments
      var breadcrumbVisibleSegments = queryAll(segmentVisibleSelector, breadcrumbContainer);

      // hide segments if needed
      // we do not hide the last two segments
      if (breadcrumbVisibleSegments.length > 1) {
        breadcrumbVisibleSegments[0].setAttribute('aria-hidden', 'true');

        // check if there is another segment to be hidden
        if (breadcrumbIsTooLarge(breadcrumbContainer)) {
          hideSegment(breadcrumbContainer);
        }
      }
    }

    function showSegment(breadcrumbContainer) {
      // get hidden segments
      var breadcrumbHiddenSegments = queryAll(segmentHiddenSelector, breadcrumbContainer);

      // show segments if there is enough space
      if (breadcrumbHiddenSegments.length > 0) {
        breadcrumbHiddenSegments[breadcrumbHiddenSegments.length - 1].setAttribute('aria-hidden', 'false');

        if (breadcrumbIsTooLarge(breadcrumbContainer)) {
          // breadcrumb is too large, we hide the last segment
          hideSegment(breadcrumbContainer);
        } else {
          // check if there is another segment to be displayed
          showSegment(breadcrumbContainer);
        }
      }
    }

    // EVENTS
    function eventExpandClick(e, breadcrumbContainer) {
      e.preventDefault();
      // display all segments
      var breadcrumbSegments = queryAll(segmentSelector, breadcrumbContainer);
      breadcrumbSegments.forEach(function (breadcrumbSegment) {
        breadcrumbSegment.setAttribute('aria-hidden', 'false');
      });

      // hide ellipsis once expanded
      var target = e.currentTarget;
      target.parentElement.setAttribute('aria-hidden', 'true');
    }

    function eventResize(breadcrumbContainer) {
      // check if there are segments to be hidden or shown
      if (breadcrumbIsTooLarge(breadcrumbContainer)) {
        hideSegment(breadcrumbContainer);
      } else {
        showSegment(breadcrumbContainer);
      }
      toggleEllipsis(breadcrumbContainer);
    }

    // SETUP
    var breadcrumbContainers = queryAll(breadcrumbSelector);

    // BIND EVENTS
    function bindBreadcrumbEvents(breadcrumbContainer) {
      var expands = queryAll(expandButtonSelector, breadcrumbContainer);

      // bind click event for expand
      expands.forEach(function (expand) {
        expand.addEventListener('click', function (e) {
          return eventExpandClick(e, breadcrumbContainer);
        });
      });

      // bind resize event to check breadcrumb width
      window.addEventListener('resize', lodash_debounce(function () {
        breadcrumbContainers.forEach(eventResize);
      }, 100, { maxWait: 300 }));
    }

    // UNBIND EVENTS
    function unbindBreadcrumbEvents(breadcrumbContainer) {
      var expands = queryAll(expandButtonSelector, breadcrumbContainer);
      // unbind click event for expand
      expands.forEach(function (expand) {
        expand.removeEventListener('click', function (e) {
          return eventExpandClick(e, breadcrumbContainer);
        });
      });

      // unbind resize event to check breadcrumb width
      window.removeEventListener('resize', lodash_debounce(function () {
        breadcrumbContainers.forEach(eventResize);
      }, 100, { maxWait: 300 }));
    }

    // DESTROY
    function destroy() {
      if (breadcrumbContainers.length) {
        breadcrumbContainers.forEach(function (breadcrumbContainer) {
          unbindBreadcrumbEvents(breadcrumbContainer);
        });
      }
    }

    // INIT
    function init() {
      if (breadcrumbContainers.length) {
        breadcrumbContainers.forEach(function (breadcrumbContainer) {
          initEllipsis(breadcrumbContainer);
          bindBreadcrumbEvents(breadcrumbContainer);

          // trigger resize event once
          eventResize(breadcrumbContainer);
        });
      }
    }

    init();

    // REVEAL API
    return {
      init: init,
      destroy: destroy
    };
  };

  /**
   * @param {object} options Object containing configuration overrides
   */
  var carousels = function carousels() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$selectorId = _ref.selectorId,
        selectorId = _ref$selectorId === undefined ? 'ecl-carousel' : _ref$selectorId;

    // SUPPORTS
    if (!('querySelector' in document) || !('addEventListener' in window)) {
      return null;
    }

    // SETUP
    var currentSlide = 0;
    var carousel = document.getElementById(selectorId);
    var slides = queryAll('.ecl-carousel__item', carousel);
    var list = carousel.querySelector('.ecl-carousel__list');

    function getListItemWidth() {
      return carousel.querySelector('.ecl-carousel__item').offsetWidth;
    }

    function goToSlide(n) {
      slides[currentSlide].classList.remove('ecl-carousel__item--showing');
      currentSlide = (n + slides.length) % slides.length;
      slides[currentSlide].classList.add('ecl-carousel__item--showing');
    }

    function setOffset() {
      var itemWidth = getListItemWidth();
      var tr = 'translate3d(' + -currentSlide * itemWidth + 'px, 0, 0)';

      list.style.MozTransform = tr; /* FF */
      list.style.msTransform = tr; /* IE (9+) */
      list.style.OTransform = tr; /* Opera */
      list.style.WebkitTransform = tr; /* Safari + Chrome */
      list.style.transform = tr;
    }

    function announceCurrentSlide() {
      carousel.querySelector('.ecl-carousel__meta-slide').textContent = currentSlide + 1 + ' / ' + slides.length;
    }

    function showImageInformation() {
      // Reset/Hide all.
      var infoAreas = queryAll('[data-image]');
      // If anything is visible.
      if (infoAreas) {
        // eslint-disable-next-line
        infoAreas.forEach(function (area) {
          return area.style.display = 'none';
        });
      }

      carousel.querySelector('[data-image="' + currentSlide + '"]').style.display = 'block';
    }

    function previousSlide() {
      goToSlide(currentSlide - 1);
      setOffset();
      announceCurrentSlide();
      showImageInformation();
    }

    function nextSlide() {
      goToSlide(currentSlide + 1);
      setOffset();
      announceCurrentSlide();
      showImageInformation();
    }

    // Attach controls to a carousel.
    function addCarouselControls() {
      var navControls = document.createElement('ul');

      navControls.className = 'ecl-carousel__controls ecl-list--unstyled';

      navControls.innerHTML = '\n      <li>\n        <button type="button" class="ecl-icon ecl-icon--left ecl-carousel__button ecl-carousel__button--previous">\n          <span class="ecl-u-sr-only">Previous</span></button>\n      </li>\n      <li>\n        <button type="button" class="ecl-icon ecl-icon--right ecl-carousel__button ecl-carousel__button--next">\n          <span class="ecl-u-sr-only">Next</span>\n        </button>\n      </li>\n    ';

      navControls.querySelector('.ecl-carousel__button--previous', '.ecl-carousel__controls').addEventListener('click', previousSlide);

      navControls.querySelector('.ecl-carousel__button--next', '.ecl-carousel__controls').addEventListener('click', nextSlide);

      carousel.querySelector('.ecl-carousel__list-wrapper').appendChild(navControls);
    }

    function removeCarouselControls() {
      var controls = carousel.querySelector('.ecl-carousel__controls');
      carousel.querySelector('.ecl-carousel__list-wrapper').removeChild(controls);
    }

    function addLiveRegion() {
      var liveRegion = document.createElement('div');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.classList.add('ecl-carousel__meta-slide');
      carousel.querySelector('.ecl-carousel__live-region').appendChild(liveRegion);
    }

    function removeLiveRegion() {
      var liveRegion = carousel.querySelector('.ecl-carousel__meta-slide');
      carousel.querySelector('.ecl-carousel__live-region').removeChild(liveRegion);
    }

    var debounceCb = function debounceCb() {
      return lodash_debounce(function () {
        setOffset();
      }, 100, { maxWait: 300 })();
    };

    // INIT
    function init() {
      addCarouselControls();
      addLiveRegion();
      goToSlide(0);
      announceCurrentSlide();
      showImageInformation();

      // Re-align on resize.
      window.addEventListener('resize', debounceCb);
    }

    // DESTROY
    function destroy() {
      removeCarouselControls();
      removeLiveRegion();
      window.removeEventListener('resize', debounceCb);
    }

    init();

    // REVEAL API
    return {
      init: init,
      destroy: destroy
    };
  };

  /**
   * Contextual navigation scripts
   */

  var expandContextualNav = function expandContextualNav(contextualNav, button) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref$classToRemove = _ref.classToRemove,
        classToRemove = _ref$classToRemove === undefined ? 'ecl-context-nav__item--over-limit' : _ref$classToRemove,
        _ref$hiddenElementsSe = _ref.hiddenElementsSelector,
        hiddenElementsSelector = _ref$hiddenElementsSe === undefined ? '.ecl-context-nav__item--over-limit' : _ref$hiddenElementsSe,
        _ref$context = _ref.context,
        context = _ref$context === undefined ? document : _ref$context;

    if (!contextualNav) {
      return;
    }

    var hiddenElements = queryAll(hiddenElementsSelector, context);

    // Remove extra class
    hiddenElements.forEach(function (element) {
      element.classList.remove(classToRemove);
    });

    // Remove buttton
    button.parentNode.removeChild(button);
  };

  // Helper method to automatically attach the event listener to all the expandables on page load
  var contextualNavs = function contextualNavs() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$selector = _ref2.selector,
        selector = _ref2$selector === undefined ? '.ecl-context-nav' : _ref2$selector,
        _ref2$buttonSelector = _ref2.buttonSelector,
        buttonSelector = _ref2$buttonSelector === undefined ? '.ecl-context-nav__more' : _ref2$buttonSelector,
        _ref2$hiddenElementsS = _ref2.hiddenElementsSelector,
        hiddenElementsSelector = _ref2$hiddenElementsS === undefined ? '.ecl-context-nav__item--over-limit' : _ref2$hiddenElementsS,
        _ref2$classToRemove = _ref2.classToRemove,
        classToRemove = _ref2$classToRemove === undefined ? 'ecl-context-nav__item--over-limit' : _ref2$classToRemove,
        _ref2$context = _ref2.context,
        context = _ref2$context === undefined ? document : _ref2$context;

    var nodesArray = queryAll(selector, context);

    nodesArray.forEach(function (node) {
      var button = context.querySelector(buttonSelector);

      if (button) {
        button.addEventListener('click', function () {
          return expandContextualNav(node, button, {
            classToRemove: classToRemove,
            hiddenElementsSelector: hiddenElementsSelector
          });
        });
      }
    });
  };

  /**
   * `Node#contains()` polyfill.
   *
   * See: http://compatibility.shwups-cms.ch/en/polyfills/?&id=1
   *
   * @param {Node} node
   * @param {Node} other
   * @return {Boolean}
   * @public
   */

  function contains(node, other) {
    // eslint-disable-next-line no-bitwise
    return node === other || !!(node.compareDocumentPosition(other) & 16);
  }

  var dropdown = function dropdown(selector) {
    var dropdownsArray = Array.prototype.slice.call(document.querySelectorAll(selector));

    document.addEventListener('click', function (event) {
      dropdownsArray.forEach(function (dropdownSelection) {
        var isInside = contains(dropdownSelection, event.target);

        if (!isInside) {
          var dropdownButton = document.querySelector(selector + ' > [aria-expanded=true]');
          var dropdownBody = document.querySelector(selector + ' > [aria-hidden=false]');
          // If the body of the dropdown is visible, then toggle.
          if (dropdownBody) {
            dropdownButton.setAttribute('aria-expanded', false);
            dropdownBody.setAttribute('aria-hidden', true);
          }
        }
      });
    });
  };

  /**
   * @param {object} options Object containing configuration overrides
   *
   * Available options:
   * - options.triggerElementsSelector - any selector to which event listeners
   * are attached. When clicked on any element with such a selector, a dialog opens.
   *
   * - options.dialogWindowId - id of target dialog window. Defaults to `ecl-dialog`.
   *
   * - options.dialogOverlayId - id of target dialog window. Defaults to `ecl-overlay`.
   * Overlay element is created in the document if not provided by the user.
   */
  var dialogs = function dialogs() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$triggerElementsS = _ref.triggerElementsSelector,
        triggerElementsSelector = _ref$triggerElementsS === undefined ? '[data-ecl-dialog]' : _ref$triggerElementsS,
        _ref$dialogWindowId = _ref.dialogWindowId,
        dialogWindowId = _ref$dialogWindowId === undefined ? 'ecl-dialog' : _ref$dialogWindowId,
        _ref$dialogOverlayId = _ref.dialogOverlayId,
        dialogOverlayId = _ref$dialogOverlayId === undefined ? 'ecl-overlay' : _ref$dialogOverlayId;

    // SUPPORTS
    if (!('querySelector' in document) || !('addEventListener' in window)) {
      return null;
    }

    // SETUP
    var triggerElements = queryAll(triggerElementsSelector);
    var dialogWindow = document.getElementById(dialogWindowId);
    var dialogOverlay = document.getElementById(dialogOverlayId);

    // Create an overlay element if the user does not supply one.
    if (!dialogOverlay) {
      var element = document.createElement('div');
      element.setAttribute('id', 'ecl-overlay');
      element.setAttribute('class', 'ecl-dialog__overlay');
      element.setAttribute('aria-hidden', 'true');
      document.body.appendChild(element);
      dialogOverlay = element;
    }

    // What we can focus on in the modal.
    var focusableElements = [].slice.call(queryAll('\n        a[href],\n        area[href],\n        input:not([disabled]),\n        select:not([disabled]),\n        textarea:not([disabled]),\n        button:not([disabled]),\n        [tabindex="0"]\n      ', dialogWindow));

    // Use this variable to return focus on element after dialog being closed.
    var focusedElBeforeOpen = null;

    // Specific elements to take care when openning and closing the dialog.
    var firstFocusableElement = focusableElements[0];
    var lastFocusableElement = focusableElements[focusableElements.length - 1];

    // EVENTS
    // Hide dialog and overlay elements.
    function close(event) {
      event.preventDefault();
      dialogWindow.setAttribute('aria-hidden', true);
      dialogOverlay.setAttribute('aria-hidden', true);

      if (focusedElBeforeOpen) {
        focusedElBeforeOpen.focus();
      }

      document.querySelector('body').classList.remove('ecl-u-disablescroll');
    }

    // Keyboard behaviors.
    function handleKeyDown(e) {
      var KEY_TAB = 9;
      var KEY_ESC = 27;

      function handleBackwardTab() {
        if (document.activeElement === firstFocusableElement) {
          e.preventDefault();
          lastFocusableElement.focus();
        }
      }

      function handleForwardTab() {
        if (document.activeElement === lastFocusableElement) {
          e.preventDefault();
          firstFocusableElement.focus();
        }
      }

      switch (e.keyCode) {
        // Keep tabbing in the scope of the dialog.
        case KEY_TAB:
          if (focusableElements.length === 1) {
            e.preventDefault();
            break;
          }
          if (e.shiftKey) {
            handleBackwardTab();
          } else {
            handleForwardTab();
          }
          break;
        case KEY_ESC:
          close();
          break;
        default:
          break;
      }
    }

    // Show dialog and overlay elements.
    function open(event) {
      event.preventDefault();
      dialogWindow.setAttribute('aria-hidden', false);
      dialogOverlay.setAttribute('aria-hidden', false);

      // This is the element to have the focus after closing the dialog.
      // Usually the element which triggered the dialog.
      focusedElBeforeOpen = document.activeElement;

      // Focus on the first element in the dialog.
      firstFocusableElement.focus();

      // Close dialog when clicked out of the dialog window.
      dialogOverlay.addEventListener('click', close);

      // Handle tabbing, esc and keyboard in the dialog window.
      dialogWindow.addEventListener('keydown', handleKeyDown);

      document.querySelector('body').classList.add('ecl-u-disablescroll');
    }

    // BIND EVENTS
    function bindDialogEvents(elements) {
      elements.forEach(function (element) {
        return element.addEventListener('click', open);
      });

      // const closeButtons = document.querySelectorAll('.ecl-dialog__dismiss');
      queryAll('.ecl-dialog__dismiss').forEach(function (button) {
        button.addEventListener('click', close);
      });
    }

    // UNBIND EVENTS
    function unbindDialogEvents(elements) {
      elements.forEach(function (element) {
        return element.removeEventListener('click', open);
      });

      // const closeButtons = document.querySelectorAll('.ecl-dialog__dismiss');
      queryAll('.ecl-dialog__dismiss').forEach(function (button) {
        button.removeEventListener('click', close);
      });
    }

    // DESTROY
    function destroy() {
      unbindDialogEvents(triggerElements);
    }

    // INIT
    function init() {
      if (triggerElements.length) {
        bindDialogEvents(triggerElements);
      }
    }

    init();

    // REVEAL API
    return {
      init: init,
      destroy: destroy
    };
  };

  /* eslint-disable no-param-reassign */

  var toggleExpandable = function toggleExpandable(toggleElement) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$context = _ref.context,
        context = _ref$context === undefined ? document : _ref$context,
        _ref$forceClose = _ref.forceClose,
        forceClose = _ref$forceClose === undefined ? false : _ref$forceClose,
        _ref$closeSiblings = _ref.closeSiblings,
        closeSiblings = _ref$closeSiblings === undefined ? false : _ref$closeSiblings,
        _ref$siblingsSelector = _ref.siblingsSelector,
        siblingsSelector = _ref$siblingsSelector === undefined ? '[aria-controls][aria-expanded]' : _ref$siblingsSelector;

    if (!toggleElement) {
      return;
    }

    // Get target element
    var target = document.getElementById(toggleElement.getAttribute('aria-controls'));

    // Exit if no target found
    if (!target) {
      return;
    }

    // Get current status
    var isExpanded = forceClose === true || toggleElement.getAttribute('aria-expanded') === 'true';

    // Toggle the expandable/collapsible
    toggleElement.setAttribute('aria-expanded', !isExpanded);
    target.setAttribute('aria-hidden', isExpanded);

    // Toggle label if possible
    if (!isExpanded && toggleElement.hasAttribute('data-label-expanded')) {
      toggleElement.innerHTML = toggleElement.getAttribute('data-label-expanded');
    } else if (isExpanded && toggleElement.hasAttribute('data-label-collapsed')) {
      toggleElement.innerHTML = toggleElement.getAttribute('data-label-collapsed');
    }

    // Close siblings if requested
    if (closeSiblings === true) {
      var siblingsArray = Array.prototype.slice.call(context.querySelectorAll(siblingsSelector)).filter(function (sibling) {
        return sibling !== toggleElement;
      });

      siblingsArray.forEach(function (sibling) {
        toggleExpandable(sibling, {
          context: context,
          forceClose: true
        });
      });
    }
  };

  // Helper method to automatically attach the event listener to all the expandables on page load
  var initExpandables = function initExpandables(selector) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

    // Exit if no selector was provided
    if (!selector) return;

    var nodesArray = Array.prototype.slice.call(context.querySelectorAll(selector));

    nodesArray.forEach(function (node) {
      return node.addEventListener('click', function (e) {
        toggleExpandable(node, { context: context });
        e.preventDefault();
      });
    });
  };

  /**
   * File uploads related behaviors.
   */

  /**
   * @param {object} options Object containing configuration overrides
   */
  var fileUploads = function fileUploads() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$selector = _ref.selector,
        selector = _ref$selector === undefined ? '.ecl-file-upload' : _ref$selector,
        _ref$inputSelector = _ref.inputSelector,
        inputSelector = _ref$inputSelector === undefined ? '.ecl-file-upload__input' : _ref$inputSelector,
        _ref$valueSelector = _ref.valueSelector,
        valueSelector = _ref$valueSelector === undefined ? '.ecl-file-upload__value' : _ref$valueSelector,
        _ref$browseSelector = _ref.browseSelector,
        browseSelector = _ref$browseSelector === undefined ? '.ecl-file-upload__browse' : _ref$browseSelector;

    // SUPPORTS
    if (!('querySelector' in document) || !('addEventListener' in window) || !document.documentElement.classList) return null;

    // SETUP
    // set file upload element NodeLists
    var fileUploadContainers = queryAll(selector);

    // ACTIONS
    function updateFileName(element, files) {
      if (files.length === 0) return;

      var filename = '';

      for (var i = 0; i < files.length; i += 1) {
        var file = files[i];
        if ('name' in file) {
          if (i > 0) {
            filename += ', ';
          }
          filename += file.name;
        }
      }

      // Show the selected filename in the field.
      var messageElement = element;
      messageElement.innerHTML = filename;
    }

    // EVENTS
    function eventValueChange(e) {
      if ('files' in e.target) {
        var fileUploadElements = queryAll(valueSelector, e.target.parentNode);

        fileUploadElements.forEach(function (fileUploadElement) {
          updateFileName(fileUploadElement, e.target.files);
        });
      }
    }

    function eventBrowseKeydown(e) {
      // collect header targets, and their prev/next
      var isModifierKey = e.metaKey || e.altKey;

      var inputElements = queryAll(inputSelector, e.target.parentNode);

      inputElements.forEach(function (inputElement) {
        // don't catch key events when ⌘ or Alt modifier is present
        if (isModifierKey) return;

        // catch enter/space, left/right and up/down arrow key events
        // if new panel show it, if next/prev move focus
        switch (e.keyCode) {
          case 13:
          case 32:
            e.preventDefault();
            inputElement.click();
            break;
          default:
            break;
        }
      });
    }

    // BIND EVENTS
    function bindFileUploadEvents(fileUploadContainer) {
      // bind all file upload change events
      var fileUploadInputs = queryAll(inputSelector, fileUploadContainer);
      fileUploadInputs.forEach(function (fileUploadInput) {
        fileUploadInput.addEventListener('change', eventValueChange);
      });

      // bind all file upload keydown events
      var fileUploadBrowses = queryAll(browseSelector, fileUploadContainer);
      fileUploadBrowses.forEach(function (fileUploadBrowse) {
        fileUploadBrowse.addEventListener('keydown', eventBrowseKeydown);
      });
    }

    // UNBIND EVENTS
    function unbindFileUploadEvents(fileUploadContainer) {
      var fileUploadInputs = queryAll(inputSelector, fileUploadContainer);
      // unbind all file upload change events
      fileUploadInputs.forEach(function (fileUploadInput) {
        fileUploadInput.removeEventListener('change', eventValueChange);
      });

      var fileUploadBrowses = queryAll(browseSelector, fileUploadContainer);
      // bind all file upload keydown events
      fileUploadBrowses.forEach(function (fileUploadBrowse) {
        fileUploadBrowse.removeEventListener('keydown', eventBrowseKeydown);
      });
    }

    // DESTROY
    function destroy() {
      fileUploadContainers.forEach(function (fileUploadContainer) {
        unbindFileUploadEvents(fileUploadContainer);
      });
    }

    // INIT
    function init() {
      if (fileUploadContainers.length) {
        fileUploadContainers.forEach(function (fileUploadContainer) {
          bindFileUploadEvents(fileUploadContainer);
        });
      }
    }

    init();

    // REVEAL API
    return {
      init: init,
      destroy: destroy
    };
  };

  var eclLangSelectPages = function eclLangSelectPages() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$selector = _ref.selector,
        selector = _ref$selector === undefined ? '.ecl-lang-select-page' : _ref$selector,
        _ref$toggleClass = _ref.toggleClass,
        toggleClass = _ref$toggleClass === undefined ? 'ecl-lang-select-page--dropdown' : _ref$toggleClass,
        _ref$listSelector = _ref.listSelector,
        listSelector = _ref$listSelector === undefined ? '.ecl-lang-select-page__list' : _ref$listSelector,
        _ref$dropdownSelector = _ref.dropdownSelector,
        dropdownSelector = _ref$dropdownSelector === undefined ? '.ecl-lang-select-page__dropdown' : _ref$dropdownSelector,
        _ref$dropdownOnChange = _ref.dropdownOnChange,
        dropdownOnChange = _ref$dropdownOnChange === undefined ? undefined : _ref$dropdownOnChange;

    // SUPPORTS
    if (!('querySelector' in document) || !('addEventListener' in window) || !document.documentElement.classList) return null;

    var langSelectPagesContainers = queryAll(selector);

    function toggle(lsp) {
      if (!lsp) return null;

      var list = queryAll(listSelector, lsp)[0];

      if (!lsp.classList.contains(toggleClass)) {
        if (list && list.offsetLeft + list.offsetWidth > lsp.offsetWidth) {
          lsp.classList.add(toggleClass);
        }
      } else {
        var dropdown = queryAll(dropdownSelector, lsp)[0];
        if (dropdown.offsetLeft + list.offsetWidth < lsp.offsetWidth) {
          lsp.classList.remove(toggleClass);
        }
      }

      return true;
    }

    function init() {
      // On load
      langSelectPagesContainers.forEach(function (lsp) {
        toggle(lsp);

        if (dropdownOnChange) {
          var dropdown = queryAll(dropdownSelector, lsp)[0];

          if (dropdown) {
            dropdown.addEventListener('change', dropdownOnChange);
          }
        }
      });

      window.addEventListener('resize', lodash_debounce(function () {
        langSelectPagesContainers.forEach(toggle);
      }, 100, { maxWait: 300 }));
    }

    return init();
  };

  /*
   * Messages behavior
   */

  // Dismiss a selected message.
  function dismissMessage(message) {
    if (message && message.parentNode !== null) {
      message.parentNode.removeChild(message);
    }
  }

  // Helper method to automatically attach the event listener to all the messages on page load
  function initMessages() {
    var selectorClass = 'ecl-message__dismiss';

    var messages = Array.prototype.slice.call(document.getElementsByClassName(selectorClass));

    messages.forEach(function (message) {
      return message.addEventListener('click', function () {
        return dismissMessage(message.parentElement);
      });
    });
  }

  /*
   * Messages behavior
   */

  var stickyfill = createCommonjsModule(function (module) {
  (function (window, document) {

          /*
           * 1. Check if the browser supports `position: sticky` natively or is too old to run the polyfill.
           *    If either of these is the case set `seppuku` flag. It will be checked later to disable key features
           *    of the polyfill, but the API will remain functional to avoid breaking things.
           */

          var _createClass = function () {
              function defineProperties(target, props) {
                  for (var i = 0; i < props.length; i++) {
                      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
                  }
              }return function (Constructor, protoProps, staticProps) {
                  if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
              };
          }();

          function _classCallCheck(instance, Constructor) {
              if (!(instance instanceof Constructor)) {
                  throw new TypeError("Cannot call a class as a function");
              }
          }

          var seppuku = false;

          // The polyfill cant’t function properly without `getComputedStyle`.
          if (!window.getComputedStyle) seppuku = true;
          // Dont’t get in a way if the browser supports `position: sticky` natively.
          else {
                  var testNode = document.createElement('div');

                  if (['', '-webkit-', '-moz-', '-ms-'].some(function (prefix) {
                      try {
                          testNode.style.position = prefix + 'sticky';
                      } catch (e) {}

                      return testNode.style.position != '';
                  })) seppuku = true;
              }

          /*
           * 2. “Global” vars used across the polyfill
           */

          // Check if Shadow Root constructor exists to make further checks simpler
          var shadowRootExists = typeof ShadowRoot !== 'undefined';

          // Last saved scroll position
          var scroll = {
              top: null,
              left: null
          };

          // Array of created Sticky instances
          var stickies = [];

          /*
           * 3. Utility functions
           */
          function extend(targetObj, sourceObject) {
              for (var key in sourceObject) {
                  if (sourceObject.hasOwnProperty(key)) {
                      targetObj[key] = sourceObject[key];
                  }
              }
          }

          function parseNumeric(val) {
              return parseFloat(val) || 0;
          }

          function getDocOffsetTop(node) {
              var docOffsetTop = 0;

              while (node) {
                  docOffsetTop += node.offsetTop;
                  node = node.offsetParent;
              }

              return docOffsetTop;
          }

          /*
           * 4. Sticky class
           */

          var Sticky = function () {
              function Sticky(node) {
                  _classCallCheck(this, Sticky);

                  if (!(node instanceof HTMLElement)) throw new Error('First argument must be HTMLElement');
                  if (stickies.some(function (sticky) {
                      return sticky._node === node;
                  })) throw new Error('Stickyfill is already applied to this node');

                  this._node = node;
                  this._stickyMode = null;
                  this._active = false;

                  stickies.push(this);

                  this.refresh();
              }

              _createClass(Sticky, [{
                  key: 'refresh',
                  value: function refresh() {
                      if (seppuku || this._removed) return;
                      if (this._active) this._deactivate();

                      var node = this._node;

                      /*
                       * 1. Save node computed props
                       */
                      var nodeComputedStyle = getComputedStyle(node);
                      var nodeComputedProps = {
                          top: nodeComputedStyle.top,
                          display: nodeComputedStyle.display,
                          marginTop: nodeComputedStyle.marginTop,
                          marginBottom: nodeComputedStyle.marginBottom,
                          marginLeft: nodeComputedStyle.marginLeft,
                          marginRight: nodeComputedStyle.marginRight,
                          cssFloat: nodeComputedStyle.cssFloat
                      };

                      /*
                       * 2. Check if the node can be activated
                       */
                      if (isNaN(parseFloat(nodeComputedProps.top)) || nodeComputedProps.display == 'table-cell' || nodeComputedProps.display == 'none') return;

                      this._active = true;

                      /*
                       * 3. Get necessary node parameters
                       */
                      var referenceNode = node.parentNode;
                      var parentNode = shadowRootExists && referenceNode instanceof ShadowRoot ? referenceNode.host : referenceNode;
                      var nodeWinOffset = node.getBoundingClientRect();
                      var parentWinOffset = parentNode.getBoundingClientRect();
                      var parentComputedStyle = getComputedStyle(parentNode);

                      this._parent = {
                          node: parentNode,
                          styles: {
                              position: parentNode.style.position
                          },
                          offsetHeight: parentNode.offsetHeight
                      };
                      this._offsetToWindow = {
                          left: nodeWinOffset.left,
                          right: document.documentElement.clientWidth - nodeWinOffset.right
                      };
                      this._offsetToParent = {
                          top: nodeWinOffset.top - parentWinOffset.top - parseNumeric(parentComputedStyle.borderTopWidth),
                          left: nodeWinOffset.left - parentWinOffset.left - parseNumeric(parentComputedStyle.borderLeftWidth),
                          right: -nodeWinOffset.right + parentWinOffset.right - parseNumeric(parentComputedStyle.borderRightWidth)
                      };
                      this._styles = {
                          position: node.style.position,
                          top: node.style.top,
                          bottom: node.style.bottom,
                          left: node.style.left,
                          right: node.style.right,
                          width: node.style.width,
                          marginTop: node.style.marginTop,
                          marginLeft: node.style.marginLeft,
                          marginRight: node.style.marginRight
                      };

                      var nodeTopValue = parseNumeric(nodeComputedProps.top);
                      this._limits = {
                          start: nodeWinOffset.top + window.pageYOffset - nodeTopValue,
                          end: parentWinOffset.top + window.pageYOffset + parentNode.offsetHeight - parseNumeric(parentComputedStyle.borderBottomWidth) - node.offsetHeight - nodeTopValue - parseNumeric(nodeComputedProps.marginBottom)
                      };

                      /*
                       * 4. Ensure that the node will be positioned relatively to the parent node
                       */
                      var parentPosition = parentComputedStyle.position;

                      if (parentPosition != 'absolute' && parentPosition != 'relative') {
                          parentNode.style.position = 'relative';
                      }

                      /*
                       * 5. Recalc node position.
                       *    It’s important to do this before clone injection to avoid scrolling bug in Chrome.
                       */
                      this._recalcPosition();

                      /*
                       * 6. Create a clone
                       */
                      var clone = this._clone = {};
                      clone.node = document.createElement('div');

                      // Apply styles to the clone
                      extend(clone.node.style, {
                          width: nodeWinOffset.right - nodeWinOffset.left + 'px',
                          height: nodeWinOffset.bottom - nodeWinOffset.top + 'px',
                          marginTop: nodeComputedProps.marginTop,
                          marginBottom: nodeComputedProps.marginBottom,
                          marginLeft: nodeComputedProps.marginLeft,
                          marginRight: nodeComputedProps.marginRight,
                          cssFloat: nodeComputedProps.cssFloat,
                          padding: 0,
                          border: 0,
                          borderSpacing: 0,
                          fontSize: '1em',
                          position: 'static'
                      });

                      referenceNode.insertBefore(clone.node, node);
                      clone.docOffsetTop = getDocOffsetTop(clone.node);
                  }
              }, {
                  key: '_recalcPosition',
                  value: function _recalcPosition() {
                      if (!this._active || this._removed) return;

                      var stickyMode = scroll.top <= this._limits.start ? 'start' : scroll.top >= this._limits.end ? 'end' : 'middle';

                      if (this._stickyMode == stickyMode) return;

                      switch (stickyMode) {
                          case 'start':
                              extend(this._node.style, {
                                  position: 'absolute',
                                  left: this._offsetToParent.left + 'px',
                                  right: this._offsetToParent.right + 'px',
                                  top: this._offsetToParent.top + 'px',
                                  bottom: 'auto',
                                  width: 'auto',
                                  marginLeft: 0,
                                  marginRight: 0,
                                  marginTop: 0
                              });
                              break;

                          case 'middle':
                              extend(this._node.style, {
                                  position: 'fixed',
                                  left: this._offsetToWindow.left + 'px',
                                  right: this._offsetToWindow.right + 'px',
                                  top: this._styles.top,
                                  bottom: 'auto',
                                  width: 'auto',
                                  marginLeft: 0,
                                  marginRight: 0,
                                  marginTop: 0
                              });
                              break;

                          case 'end':
                              extend(this._node.style, {
                                  position: 'absolute',
                                  left: this._offsetToParent.left + 'px',
                                  right: this._offsetToParent.right + 'px',
                                  top: 'auto',
                                  bottom: 0,
                                  width: 'auto',
                                  marginLeft: 0,
                                  marginRight: 0
                              });
                              break;
                      }

                      this._stickyMode = stickyMode;
                  }
              }, {
                  key: '_fastCheck',
                  value: function _fastCheck() {
                      if (!this._active || this._removed) return;

                      if (Math.abs(getDocOffsetTop(this._clone.node) - this._clone.docOffsetTop) > 1 || Math.abs(this._parent.node.offsetHeight - this._parent.offsetHeight) > 1) this.refresh();
                  }
              }, {
                  key: '_deactivate',
                  value: function _deactivate() {
                      var _this = this;

                      if (!this._active || this._removed) return;

                      this._clone.node.parentNode.removeChild(this._clone.node);
                      delete this._clone;

                      extend(this._node.style, this._styles);
                      delete this._styles;

                      // Check whether element’s parent node is used by other stickies.
                      // If not, restore parent node’s styles.
                      if (!stickies.some(function (sticky) {
                          return sticky !== _this && sticky._parent && sticky._parent.node === _this._parent.node;
                      })) {
                          extend(this._parent.node.style, this._parent.styles);
                      }
                      delete this._parent;

                      this._stickyMode = null;
                      this._active = false;

                      delete this._offsetToWindow;
                      delete this._offsetToParent;
                      delete this._limits;
                  }
              }, {
                  key: 'remove',
                  value: function remove() {
                      var _this2 = this;

                      this._deactivate();

                      stickies.some(function (sticky, index) {
                          if (sticky._node === _this2._node) {
                              stickies.splice(index, 1);
                              return true;
                          }
                      });

                      this._removed = true;
                  }
              }]);

              return Sticky;
          }();

          /*
           * 5. Stickyfill API
           */

          var Stickyfill = {
              stickies: stickies,
              Sticky: Sticky,

              addOne: function addOne(node) {
                  // Check whether it’s a node
                  if (!(node instanceof HTMLElement)) {
                      // Maybe it’s a node list of some sort?
                      // Take first node from the list then
                      if (node.length && node[0]) node = node[0];else return;
                  }

                  // Check if Stickyfill is already applied to the node
                  // and return existing sticky
                  for (var i = 0; i < stickies.length; i++) {
                      if (stickies[i]._node === node) return stickies[i];
                  }

                  // Create and return new sticky
                  return new Sticky(node);
              },
              add: function add(nodeList) {
                  // If it’s a node make an array of one node
                  if (nodeList instanceof HTMLElement) nodeList = [nodeList];
                  // Check if the argument is an iterable of some sort
                  if (!nodeList.length) return;

                  // Add every element as a sticky and return an array of created Sticky instances
                  var addedStickies = [];

                  var _loop = function _loop(i) {
                      var node = nodeList[i];

                      // If it’s not an HTMLElement – create an empty element to preserve 1-to-1
                      // correlation with input list
                      if (!(node instanceof HTMLElement)) {
                          addedStickies.push(void 0);
                          return 'continue';
                      }

                      // If Stickyfill is already applied to the node
                      // add existing sticky
                      if (stickies.some(function (sticky) {
                          if (sticky._node === node) {
                              addedStickies.push(sticky);
                              return true;
                          }
                      })) return 'continue';

                      // Create and add new sticky
                      addedStickies.push(new Sticky(node));
                  };

                  for (var i = 0; i < nodeList.length; i++) {
                      var _ret = _loop(i);

                      if (_ret === 'continue') continue;
                  }

                  return addedStickies;
              },
              refreshAll: function refreshAll() {
                  stickies.forEach(function (sticky) {
                      return sticky.refresh();
                  });
              },
              removeOne: function removeOne(node) {
                  // Check whether it’s a node
                  if (!(node instanceof HTMLElement)) {
                      // Maybe it’s a node list of some sort?
                      // Take first node from the list then
                      if (node.length && node[0]) node = node[0];else return;
                  }

                  // Remove the stickies bound to the nodes in the list
                  stickies.some(function (sticky) {
                      if (sticky._node === node) {
                          sticky.remove();
                          return true;
                      }
                  });
              },
              remove: function remove(nodeList) {
                  // If it’s a node make an array of one node
                  if (nodeList instanceof HTMLElement) nodeList = [nodeList];
                  // Check if the argument is an iterable of some sort
                  if (!nodeList.length) return;

                  // Remove the stickies bound to the nodes in the list

                  var _loop2 = function _loop2(i) {
                      var node = nodeList[i];

                      stickies.some(function (sticky) {
                          if (sticky._node === node) {
                              sticky.remove();
                              return true;
                          }
                      });
                  };

                  for (var i = 0; i < nodeList.length; i++) {
                      _loop2(i);
                  }
              },
              removeAll: function removeAll() {
                  while (stickies.length) {
                      stickies[0].remove();
                  }
              }
          };

          /*
           * 6. Setup events (unless the polyfill was disabled)
           */
          function init() {
              // Watch for scroll position changes and trigger recalc/refresh if needed
              function checkScroll() {
                  if (window.pageXOffset != scroll.left) {
                      scroll.top = window.pageYOffset;
                      scroll.left = window.pageXOffset;

                      Stickyfill.refreshAll();
                  } else if (window.pageYOffset != scroll.top) {
                      scroll.top = window.pageYOffset;
                      scroll.left = window.pageXOffset;

                      // recalc position for all stickies
                      stickies.forEach(function (sticky) {
                          return sticky._recalcPosition();
                      });
                  }
              }

              checkScroll();
              window.addEventListener('scroll', checkScroll);

              // Watch for window resizes and device orientation changes and trigger refresh
              window.addEventListener('resize', Stickyfill.refreshAll);
              window.addEventListener('orientationchange', Stickyfill.refreshAll);

              //Fast dirty check for layout changes every 500ms
              var fastCheckTimer = void 0;

              function startFastCheckTimer() {
                  fastCheckTimer = setInterval(function () {
                      stickies.forEach(function (sticky) {
                          return sticky._fastCheck();
                      });
                  }, 500);
              }

              function stopFastCheckTimer() {
                  clearInterval(fastCheckTimer);
              }

              var docHiddenKey = void 0;
              var visibilityChangeEventName = void 0;

              if ('hidden' in document) {
                  docHiddenKey = 'hidden';
                  visibilityChangeEventName = 'visibilitychange';
              } else if ('webkitHidden' in document) {
                  docHiddenKey = 'webkitHidden';
                  visibilityChangeEventName = 'webkitvisibilitychange';
              }

              if (visibilityChangeEventName) {
                  if (!document[docHiddenKey]) startFastCheckTimer();

                  document.addEventListener(visibilityChangeEventName, function () {
                      if (document[docHiddenKey]) {
                          stopFastCheckTimer();
                      } else {
                          startFastCheckTimer();
                      }
                  });
              } else startFastCheckTimer();
          }

          if (!seppuku) init();

          /*
           * 7. Expose Stickyfill
           */
          if ('object' != 'undefined' && module.exports) {
              module.exports = Stickyfill;
          } else {
              window.Stickyfill = Stickyfill;
          }
      })(window, document);
  });

  var gumshoe_min = createCommonjsModule(function (module, exports) {
    /*! gumshoejs v3.5.0 | (c) 2017 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/gumshoe */
    !function (e, t) {
      "function" == typeof undefined && undefined.amd ? undefined([], t(e)) : module.exports = t(e);
    }("undefined" != typeof commonjsGlobal ? commonjsGlobal : commonjsGlobal.window || commonjsGlobal.global, function (e) {
      var t,
          n,
          o,
          r,
          a,
          c,
          i,
          l = {},
          s = "querySelector" in document && "addEventListener" in e && "classList" in document.createElement("_"),
          u = [],
          f = { selector: "[data-gumshoe] a", selectorHeader: "[data-gumshoe-header]", container: e, offset: 0, activeClass: "active", scrollDelay: !1, callback: function callback() {} },
          d = function d(e, t, n) {
        if ("[object Object]" === Object.prototype.toString.call(e)) for (var o in e) {
          Object.prototype.hasOwnProperty.call(e, o) && t.call(n, e[o], o, e);
        } else for (var r = 0, a = e.length; r < a; r++) {
          t.call(n, e[r], r, e);
        }
      },
          v = function v() {
        var e = {},
            t = !1,
            n = 0,
            o = arguments.length;"[object Boolean]" === Object.prototype.toString.call(arguments[0]) && (t = arguments[0], n++);for (; n < o; n++) {
          var r = arguments[n];!function (n) {
            for (var o in n) {
              Object.prototype.hasOwnProperty.call(n, o) && (t && "[object Object]" === Object.prototype.toString.call(n[o]) ? e[o] = v(!0, e[o], n[o]) : e[o] = n[o]);
            }
          }(r);
        }return e;
      },
          m = function m(e) {
        return Math.max(e.scrollHeight, e.offsetHeight, e.clientHeight);
      },
          g = function g() {
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
      },
          h = function h(e) {
        var n = 0;if (e.offsetParent) do {
          n += e.offsetTop, e = e.offsetParent;
        } while (e);else n = e.offsetTop;return n = n - a - t.offset, n >= 0 ? n : 0;
      },
          p = function p(t) {
        var n = t.getBoundingClientRect();return n.top >= 0 && n.left >= 0 && n.bottom <= (e.innerHeight || document.documentElement.clientHeight) && n.right <= (e.innerWidth || document.documentElement.clientWidth);
      },
          y = function y() {
        u.sort(function (e, t) {
          return e.distance > t.distance ? -1 : e.distance < t.distance ? 1 : 0;
        });
      };l.setDistances = function () {
        o = g(), a = r ? m(r) + h(r) : 0, d(u, function (e) {
          e.distance = h(e.target);
        }), y();
      };var b = function b() {
        var e = document.querySelectorAll(t.selector);d(e, function (e) {
          if (e.hash) {
            var t = document.querySelector(e.hash);t && u.push({ nav: e, target: t, parent: "li" === e.parentNode.tagName.toLowerCase() ? e.parentNode : null, distance: 0 });
          }
        });
      },
          H = function H() {
        c && (c.nav.classList.remove(t.activeClass), c.parent && c.parent.classList.remove(t.activeClass));
      },
          C = function C(e) {
        H(), e.nav.classList.add(t.activeClass), e.parent && e.parent.classList.add(t.activeClass), t.callback(e), c = { nav: e.nav, parent: e.parent };
      };l.getCurrentNav = function () {
        var n = e.pageYOffset;if (e.innerHeight + n >= o && p(u[0].target)) return C(u[0]), u[0];for (var r = 0, a = u.length; r < a; r++) {
          var c = u[r];if (c.distance <= n) return C(c), c;
        }H(), t.callback();
      };var L = function L() {
        d(u, function (e) {
          e.nav.classList.contains(t.activeClass) && (c = { nav: e.nav, parent: e.parent });
        });
      };l.destroy = function () {
        t && (t.container.removeEventListener("resize", j, !1), t.container.removeEventListener("scroll", j, !1), u = [], t = null, n = null, o = null, r = null, a = null, c = null, i = null);
      };var E = function E(e) {
        window.clearTimeout(n), n = setTimeout(function () {
          l.setDistances(), l.getCurrentNav();
        }, 66);
      },
          j = function j(e) {
        n || (n = setTimeout(function () {
          n = null, "scroll" === e.type && l.getCurrentNav(), "resize" === e.type && (l.setDistances(), l.getCurrentNav());
        }, 66));
      };return l.init = function (e) {
        s && (l.destroy(), t = v(f, e || {}), r = document.querySelector(t.selectorHeader), b(), 0 !== u.length && (L(), l.setDistances(), l.getCurrentNav(), t.container.addEventListener("resize", j, !1), t.scrollDelay ? t.container.addEventListener("scroll", E, !1) : t.container.addEventListener("scroll", j, !1)));
      }, l;
    });
  });

  /* eslint-disable no-param-reassign */

  var toggleExpandable$1 = function toggleExpandable(toggleElement) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$context = _ref.context,
        context = _ref$context === undefined ? document : _ref$context,
        _ref$forceClose = _ref.forceClose,
        forceClose = _ref$forceClose === undefined ? false : _ref$forceClose,
        _ref$closeSiblings = _ref.closeSiblings,
        closeSiblings = _ref$closeSiblings === undefined ? false : _ref$closeSiblings,
        _ref$siblingsSelector = _ref.siblingsSelector,
        siblingsSelector = _ref$siblingsSelector === undefined ? '[aria-controls][aria-expanded]' : _ref$siblingsSelector;

    if (!toggleElement) {
      return;
    }

    // Get target element
    var target = document.getElementById(toggleElement.getAttribute('aria-controls'));

    // Exit if no target found
    if (!target) {
      return;
    }

    // Get current status
    var isExpanded = forceClose === true || toggleElement.getAttribute('aria-expanded') === 'true';

    // Toggle the expandable/collapsible
    toggleElement.setAttribute('aria-expanded', !isExpanded);
    target.setAttribute('aria-hidden', isExpanded);

    // Toggle label if possible
    if (!isExpanded && toggleElement.hasAttribute('data-label-expanded')) {
      toggleElement.innerHTML = toggleElement.getAttribute('data-label-expanded');
    } else if (isExpanded && toggleElement.hasAttribute('data-label-collapsed')) {
      toggleElement.innerHTML = toggleElement.getAttribute('data-label-collapsed');
    }

    // Close siblings if requested
    if (closeSiblings === true) {
      var siblingsArray = Array.prototype.slice.call(context.querySelectorAll(siblingsSelector)).filter(function (sibling) {
        return sibling !== toggleElement;
      });

      siblingsArray.forEach(function (sibling) {
        toggleExpandable(sibling, {
          context: context,
          forceClose: true
        });
      });
    }
  };

  /**
   * Navigation inpage related behaviors.
   */

  /**
   * @param {object} options Object containing configuration overrides
   */
  var navigationInpages = function navigationInpages() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$stickySelector = _ref.stickySelector,
        stickySelector = _ref$stickySelector === undefined ? '.ecl-inpage-navigation' : _ref$stickySelector,
        _ref$spySelector = _ref.spySelector,
        spySelector = _ref$spySelector === undefined ? '.ecl-inpage-navigation__link' : _ref$spySelector,
        _ref$spyClass = _ref.spyClass,
        spyClass = _ref$spyClass === undefined ? 'ecl-inpage-navigation__link--is-active' : _ref$spyClass,
        _ref$spyActiveContain = _ref.spyActiveContainer,
        spyActiveContainer = _ref$spyActiveContain === undefined ? 'ecl-inpage-navigation--visible' : _ref$spyActiveContain,
        _ref$spyTrigger = _ref.spyTrigger,
        spyTrigger = _ref$spyTrigger === undefined ? '.ecl-inpage-navigation__trigger' : _ref$spyTrigger,
        _ref$spyOffset = _ref.spyOffset,
        spyOffset = _ref$spyOffset === undefined ? 20 : _ref$spyOffset,
        _ref$toggleSelector = _ref.toggleSelector,
        toggleSelector = _ref$toggleSelector === undefined ? '.ecl-inpage-navigation__trigger' : _ref$toggleSelector,
        _ref$linksSelector = _ref.linksSelector,
        linksSelector = _ref$linksSelector === undefined ? '.ecl-inpage-navigation__link' : _ref$linksSelector;

    // SUPPORTS
    if (!('querySelector' in document) || !('addEventListener' in window) || !document.documentElement.classList) return null;

    var stickyInstance = void 0;

    // ACTIONS
    function initSticky(element) {
      stickyInstance = new stickyfill.Sticky(element);
    }

    function destroySticky() {
      if (stickyInstance) {
        stickyInstance.remove();
      }
    }

    function initScrollSpy(inpageNavElement) {
      gumshoe_min.init({
        selector: spySelector,
        activeClass: spyClass,
        offset: spyOffset,
        callback: function callback(nav) {
          var navigationTitle = document.querySelector(spyTrigger);

          if (!nav) {
            inpageNavElement.classList.remove(spyActiveContainer);
            navigationTitle.innerHTML = '';
          } else {
            inpageNavElement.classList.add(spyActiveContainer);
            navigationTitle.innerHTML = nav.nav.innerHTML;
          }
        }
      });
    }

    function destroyScrollSpy() {
      gumshoe_min.destroy();
    }

    // Init
    function init() {
      var inpageNavElement = document.querySelector(stickySelector);
      var toggleElement = inpageNavElement.querySelector(toggleSelector);
      var navLinks = queryAll(linksSelector, inpageNavElement);

      initSticky(inpageNavElement);
      initScrollSpy(inpageNavElement);

      toggleElement.addEventListener('click', function (e) {
        toggleExpandable$1(toggleElement, { context: inpageNavElement });
        e.preventDefault();
      });

      navLinks.forEach(function (link) {
        return link.addEventListener('click', function () {
          toggleExpandable$1(toggleElement, {
            context: inpageNavElement,
            forceClose: true
          });
        });
      });
    }

    // Destroy
    function destroy() {
      destroyScrollSpy();
      destroySticky();
    }

    init();

    // REVEAL API
    return {
      init: init,
      destroy: destroy
    };
  };

  var onClick = function onClick(node, menu) {
    return function (e) {
      if (node && node.hasAttribute('aria-haspopup')) {
        var hasPopup = node.getAttribute('aria-haspopup');
        if (hasPopup === '' || hasPopup === 'true') {
          e.preventDefault();

          toggleExpandable$1(node, {
            context: menu,
            closeSiblings: true
          });
        }
      }
    };
  };

  var onKeydown = function onKeydown(node, menu) {
    return function (e) {
      var currentTab = node.parentElement;
      var previousTabItem = currentTab.previousElementSibling || currentTab.parentElement.lastElementChild;
      var nextTabItem = currentTab.nextElementSibling || currentTab.parentElement.firstElementChild;

      // don't catch key events when ⌘ or Alt modifier is present
      if (e.metaKey || e.altKey) return;

      // catch left/right and up/down arrow key events
      // if new next/prev tab available, show it by passing tab anchor to showTab method
      switch (e.keyCode) {
        // ENTER or SPACE
        case 13:
        case 32:
          onClick(e.currentTarget, menu)(e);
          break;
        // ARROWS LEFT and UP
        case 37:
        case 38:
          e.preventDefault();
          previousTabItem.querySelector('a').focus();
          break;
        // ARROWS RIGHT and DOWN
        case 39:
        case 40:
          e.preventDefault();
          nextTabItem.querySelector('a').focus();
          break;
        default:
          break;
      }
    };
  };

  var megamenu = function megamenu() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$selector = _ref.selector,
        selector = _ref$selector === undefined ? '.ecl-navigation-menu' : _ref$selector,
        _ref$toggleSelector = _ref.toggleSelector,
        toggleSelector = _ref$toggleSelector === undefined ? '.ecl-navigation-menu__toggle' : _ref$toggleSelector,
        _ref$listSelector = _ref.listSelector,
        listSelector = _ref$listSelector === undefined ? '.ecl-navigation-menu__root' : _ref$listSelector,
        _ref$linkSelector = _ref.linkSelector,
        linkSelector = _ref$linkSelector === undefined ? '.ecl-navigation-menu__link' : _ref$linkSelector;

    var megamenusArray = queryAll(selector);

    megamenusArray.forEach(function (menu) {
      // Make the toggle expandable
      var toggle = menu.querySelector(toggleSelector);
      if (toggle) {
        toggle.addEventListener('click', function () {
          return toggleExpandable$1(toggle, { context: menu });
        });
      }

      // Get the list of links
      var list = menu.querySelector(listSelector);

      // Get expandables within the list
      var nodesArray = queryAll(linkSelector, list);

      nodesArray.forEach(function (node) {
        node.addEventListener('click', onClick(node, list));
        node.addEventListener('keydown', onKeydown(node, list));
      });
    });
  };

  /**
    stickybits - Stickybits is a lightweight alternative to `position: sticky` polyfills
    @version v3.3.2
    @link https://github.com/dollarshaveclub/stickybits#readme
    @author Jeff Wainwright <yowainwright@gmail.com> (https://jeffry.in)
    @license MIT
  **/
  /*
    STICKYBITS 💉
    --------
    > a lightweight alternative to `position: sticky` polyfills 🍬
    --------
    - each method is documented above it our view the readme
    - Stickybits does not manage polymorphic functionality (position like properties)
    * polymorphic functionality: (in the context of describing Stickybits)
      means making things like `position: sticky` be loosely supported with position fixed.
      It also means that features like `useStickyClasses` takes on styles like `position: fixed`.
    --------
    defaults 🔌
    --------
    - version = `package.json` version
    - userAgent = viewer browser agent
    - target = DOM element selector
    - noStyles = boolean
    - offset = number
    - parentClass = 'string'
    - scrollEl = window || DOM element selector
    - stickyClass = 'string'
    - stuckClass = 'string'
    - useStickyClasses = boolean
    - verticalPosition = 'string'
    --------
    props🔌
    --------
    - p = props {object}
    --------
    instance note
    --------
    - stickybits parent methods return this
    - stickybits instance methods return an instance item
    --------
    nomenclature
    --------
    - target => el => e
    - props => o || p
    - instance => item => it
    --------
    methods
    --------
    - .definePosition = defines sticky or fixed
    - .addInstance = an array of objects for each Stickybits Target
    - .getClosestParent = gets the parent for non-window scroll
    - .getOffsetTop = gets the element offsetTop from the top level of the DOM
    - .computeScrollOffsets = computes scroll position
    - .toggleClasses = older browser toggler
    - .manageState = manages sticky state
    - .removeClass = older browser support class remover
    - .removeInstance = removes an instance
    - .cleanup = removes all Stickybits instances and cleans up dom from stickybits
  */
  var Stickybits =
  /*#__PURE__*/
  function () {
    function Stickybits(target, obj) {
      var o = typeof obj !== 'undefined' ? obj : {};
      this.version = '3.3.2';
      this.userAgent = window.navigator.userAgent || 'no `userAgent` provided by the browser';
      this.props = {
        customStickyChangeNumber: o.customStickyChangeNumber || null,
        noStyles: o.noStyles || false,
        stickyBitStickyOffset: o.stickyBitStickyOffset || 0,
        parentClass: o.parentClass || 'js-stickybit-parent',
        scrollEl: document.querySelector(o.scrollEl) || window,
        stickyClass: o.stickyClass || 'js-is-sticky',
        stuckClass: o.stuckClass || 'js-is-stuck',
        stickyChangeClass: o.stickyChangeClass || 'js-is-sticky--change',
        useStickyClasses: o.useStickyClasses || false,
        verticalPosition: o.verticalPosition || 'top'
      };
      var p = this.props;
      /*
        define positionVal
        ----
        -  uses a computed (`.definePosition()`)
        -  defined the position
      */

      p.positionVal = this.definePosition() || 'fixed';
      var vp = p.verticalPosition;
      var ns = p.noStyles;
      var pv = p.positionVal;
      this.els = typeof target === 'string' ? document.querySelectorAll(target) : target;
      if (!('length' in this.els)) this.els = [this.els];
      this.instances = [];

      for (var i = 0; i < this.els.length; i += 1) {
        var el = this.els[i];
        var styles = el.style; // set vertical position

        styles[vp] = vp === 'top' && !ns ? p.stickyBitStickyOffset + "px" : '';
        styles.position = pv !== 'fixed' ? pv : '';

        if (pv === 'fixed' || p.useStickyClasses) {
          var instance = this.addInstance(el, p); // instances are an array of objects

          this.instances.push(instance);
        }
      }

      return this;
    }
    /*
      setStickyPosition ✔️
      --------
      —  most basic thing stickybits does
      => checks to see if position sticky is supported
      => defined the position to be used
      => stickybits works accordingly
    */

    var _proto = Stickybits.prototype;

    _proto.definePosition = function definePosition() {
      var prefix = ['', '-o-', '-webkit-', '-moz-', '-ms-'];
      var test = document.head.style;

      for (var i = 0; i < prefix.length; i += 1) {
        test.position = prefix[i] + "sticky";
      }

      var stickyProp = test.position ? test.position : 'fixed';
      test.position = '';
      return stickyProp;
    };
    /*
      addInstance ✔️
      --------
      — manages instances of items
      - takes in an el and props
      - returns an item object
      ---
      - target = el
      - o = {object} = props
        - scrollEl = 'string'
        - verticalPosition = number
        - off = boolean
        - parentClass = 'string'
        - stickyClass = 'string'
        - stuckClass = 'string'
      ---
      - defined later
        - parent = dom element
        - state = 'string'
        - offset = number
        - stickyStart = number
        - stickyStop = number
      - returns an instance object
    */

    _proto.addInstance = function addInstance(el, props) {
      var _this = this;

      var item = {
        el: el,
        parent: el.parentNode,
        props: props
      };
      this.isWin = this.props.scrollEl === window;
      var se = this.isWin ? window : this.getClosestParent(item.el, item.props.scrollEl);
      this.computeScrollOffsets(item);
      item.parent.className += " " + props.parentClass;
      item.state = 'default';

      item.stateContainer = function () {
        return _this.manageState(item);
      };

      se.addEventListener('scroll', item.stateContainer);
      return item;
    };
    /*
      --------
      getParent 👨‍
      --------
      - a helper function that gets the target element's parent selected el
      - only used for non `window` scroll elements
      - supports older browsers
    */

    _proto.getClosestParent = function getClosestParent(el, match) {
      // p = parent element
      var p = match;
      var e = el;
      if (e.parentElement === p) return p; // traverse up the dom tree until we get to the parent

      while (e.parentElement !== p) {
        e = e.parentElement;
      } // return parent element


      return p;
    };
    /*
      --------
      getOffsetTop
      --------
      - a helper function that gets the offsetTop of the element
      - from the top level of the DOM
    */

    _proto.getOffsetTop = function getOffsetTop(el) {
      var offsetTop = 0;

      do {
        offsetTop = el.offsetTop + offsetTop;
      } while (el = el.offsetParent);

      return offsetTop;
    };
    /*
      computeScrollOffsets 📊
      ---
      computeScrollOffsets for Stickybits
      - defines
        - offset
        - start
        - stop
    */

    _proto.computeScrollOffsets = function computeScrollOffsets(item) {
      var it = item;
      var p = it.props;
      var el = it.el;
      var parent = it.parent;
      var isCustom = !this.isWin && p.positionVal === 'fixed';
      var isBottom = p.verticalPosition !== 'bottom';
      var scrollElOffset = isCustom ? this.getOffsetTop(p.scrollEl) : 0;
      var stickyStart = isCustom ? this.getOffsetTop(parent) - scrollElOffset : this.getOffsetTop(parent);
      var stickyChangeOffset = p.customStickyChangeNumber !== null ? p.customStickyChangeNumber : el.offsetHeight;
      it.offset = scrollElOffset + p.stickyBitStickyOffset;
      it.stickyStart = isBottom ? stickyStart - it.offset : 0;
      it.stickyChange = it.stickyStart + stickyChangeOffset;
      it.stickyStop = isBottom ? stickyStart + parent.offsetHeight - (it.el.offsetHeight + it.offset) : stickyStart + parent.offsetHeight;
      return it;
    };
    /*
      toggleClasses ⚖️
      ---
      toggles classes (for older browser support)
      r = removed class
      a = added class
    */

    _proto.toggleClasses = function toggleClasses(el, r, a) {
      var e = el;
      var cArray = e.className.split(' ');
      if (a && cArray.indexOf(a) === -1) cArray.push(a);
      var rItem = cArray.indexOf(r);
      if (rItem !== -1) cArray.splice(rItem, 1);
      e.className = cArray.join(' ');
    };
    /*
      manageState 📝
      ---
      - defines the state
        - normal
        - sticky
        - stuck
    */

    _proto.manageState = function manageState(item) {
      // cache object
      var it = item;
      var e = it.el;
      var p = it.props;
      var state = it.state;
      var start = it.stickyStart;
      var change = it.stickyChange;
      var stop = it.stickyStop;
      var stl = e.style; // cache props

      var ns = p.noStyles;
      var pv = p.positionVal;
      var se = p.scrollEl;
      var sticky = p.stickyClass;
      var stickyChange = p.stickyChangeClass;
      var stuck = p.stuckClass;
      var vp = p.verticalPosition;
      /*
        requestAnimationFrame
        ---
        - use rAF
        - or stub rAF
      */

      var rAFStub = function rAFDummy(f) {
        f();
      };

      var rAF = !this.isWin ? rAFStub : window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || rAFStub;
      /*
        define scroll vars
        ---
        - scroll
        - notSticky
        - isSticky
        - isStuck
      */

      var tC = this.toggleClasses;
      var scroll = this.isWin ? window.scrollY || window.pageYOffset : se.scrollTop;
      var notSticky = scroll > start && scroll < stop && (state === 'default' || state === 'stuck');
      var isSticky = scroll <= start && state === 'sticky';
      var isStuck = scroll >= stop && state === 'sticky';
      /*
        Unnamed arrow functions within this block
        ---
        - help wanted or discussion
        - view test.stickybits.js
          - `stickybits .manageState  `position: fixed` interface` for more awareness 👀
      */

      if (notSticky) {
        it.state = 'sticky';
        rAF(function () {
          tC(e, stuck, sticky);
          stl.position = pv;
          if (ns) return;
          stl.bottom = '';
          stl[vp] = p.stickyBitStickyOffset + "px";
        });
      } else if (isSticky) {
        it.state = 'default';
        rAF(function () {
          tC(e, sticky);
          if (pv === 'fixed') stl.position = '';
        });
      } else if (isStuck) {
        it.state = 'stuck';
        rAF(function () {
          tC(e, sticky, stuck);
          if (pv !== 'fixed' || ns) return;
          stl.top = '';
          stl.bottom = '0';
          stl.position = 'absolute';
        });
      }

      var isStickyChange = scroll >= change && scroll <= stop;
      var isNotStickyChange = scroll < change || scroll > stop;
      var stub = 'stub'; // a stub css class to remove

      if (isNotStickyChange) {
        rAF(function () {
          tC(e, stickyChange);
        });
      } else if (isStickyChange) {
        rAF(function () {
          tC(e, stub, stickyChange);
        });
      }

      return it;
    };

    _proto.update = function update() {
      for (var i = 0; i < this.instances.length; i += 1) {
        var instance = this.instances[i];
        this.computeScrollOffsets(instance);
      }

      return this;
    };
    /*
      removes an instance 👋
      --------
      - cleanup instance
    */

    _proto.removeInstance = function removeInstance(instance) {
      var e = instance.el;
      var p = instance.props;
      var tC = this.toggleClasses;
      e.style.position = '';
      e.style[p.verticalPosition] = '';
      tC(e, p.stickyClass);
      tC(e, p.stuckClass);
      tC(e.parentNode, p.parentClass);
    };
    /*
      cleanup 🛁
      --------
      - cleans up each instance
      - clears instance
    */

    _proto.cleanup = function cleanup() {
      for (var i = 0; i < this.instances.length; i += 1) {
        var instance = this.instances[i];
        instance.props.scrollEl.removeEventListener('scroll', instance.stateContainer);
        this.removeInstance(instance);
      }

      this.manageState = false;
      this.instances = [];
    };

    return Stickybits;
  }();
  /*
    export
    --------
    exports StickBits to be used 🏁
  */

  function stickybits(target, o) {
    return new Stickybits(target, o);
  }

  /**
   * Side navigation related behaviors.
   */

  /**
   * @param {object} options Object containing configuration overrides
   */
  var navigationSide = function navigationSide() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$stickySelector = _ref.stickySelector,
        stickySelector = _ref$stickySelector === undefined ? '.ecl-side-navigation__toggle' : _ref$stickySelector,
        _ref$activeSelector = _ref.activeSelector,
        activeSelector = _ref$activeSelector === undefined ? '.ecl-side-navigation__link--active' : _ref$activeSelector;

    // SUPPORTS
    if (!('querySelector' in document) || !('addEventListener' in window) || !document.documentElement.classList) return null;

    // ACTIONS
    function initSticky() {
      // init sticky menu
      // eslint-disable-next-line no-undef
      stickybits(stickySelector, { useStickyClasses: true });
    }

    function scrollToTop() {
      var toggle = document.getElementsByClassName(stickySelector.substring(1))[0];

      if (toggle) {
        toggle.addEventListener('click', function (e) {
          if (e.target.getAttribute('aria-expanded') === 'false') {
            e.target.scrollIntoView();
          }
        });
      }
    }

    function unfoldToActive() {
      var active = document.getElementsByClassName(activeSelector.substring(1))[0];

      // Browse parents
      if (active) {
        var node = active;
        while (node) {
          node = node.parentNode;

          // Check if parent is an expandable menu item
          if (node.matches('.ecl-side-navigation__group')) {
            var link = node.previousElementSibling;
            if (link.matches('.ecl-side-navigation__link')) {
              link.setAttribute('aria-expanded', 'true');
            }
          }

          // No need to check outside of menu
          if (node.matches('.ecl-side-navigation')) {
            break;
          }
        }
      }
    }

    // INIT
    function init() {
      initSticky();
      scrollToTop();
      unfoldToActive();
    }

    init();

    // REVEAL API
    return {
      init: init
    };
  };

  /**
   * Tables related behaviors.
   */

  /* eslint-disable no-unexpected-multiline */

  function eclTables() {
    var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var tables = elements || document.getElementsByClassName('ecl-table--responsive');
    [].forEach.call(tables, function (table) {
      var headerText = [];
      var textColspan = '';
      var ci = 0;
      var cn = [];

      // The rows in a table body.
      var tableRows = table.querySelectorAll('tbody tr');

      // The headers in a table.
      var headers = table.querySelectorAll('thead tr th');

      // The number of main headers.
      var headFirst = table.querySelectorAll('thead tr')[0].querySelectorAll('th').length - 1;

      // Number of cells per row.
      var cellPerRow = table.querySelectorAll('tbody tr')[0].querySelectorAll('td').length;

      // Position of the eventual colspan element.
      var colspanIndex = -1;

      // Build the array with all the "labels"
      // Also get position of the eventual colspan element
      for (var i = 0; i < headers.length; i += 1) {
        if (headers[i].getAttribute('colspan')) {
          colspanIndex = i;
        }

        headerText[i] = [];
        headerText[i] = headers[i].textContent;
      }

      // If we have a colspan, we have to prepare the data for it.
      if (colspanIndex !== -1) {
        textColspan = headerText.splice(colspanIndex, 1);
        ci = colspanIndex;
        cn = table.querySelectorAll('th[colspan]')[0].getAttribute('colspan');

        for (var c = 0; c < cn; c += 1) {
          headerText.splice(ci + c, 0, headerText[headFirst + c]);
          headerText.splice(headFirst + 1 + c, 1);
        }
      }

      // For every row, set the attributes we use to make this happen.
      [].forEach.call(tableRows, function (row) {
        for (var j = 0; j < cellPerRow; j += 1) {
          if (headerText[j] === '' || headerText[j] === '\xA0') {
            row.querySelectorAll('td')[j].setAttribute('class', 'ecl-table__heading');
          } else {
            row.querySelectorAll('td')[j].setAttribute('data-th', headerText[j]);
          }

          if (colspanIndex !== -1) {
            var cell = row.querySelectorAll('td')[colspanIndex];
            cell.setAttribute('class', 'ecl-table__group-label');
            cell.setAttribute('data-th-group', textColspan);

            for (var _c = 1; _c < cn; _c += 1) {
              row.querySelectorAll('td')[colspanIndex + _c].setAttribute('class', 'ecl-table__group_element');
            }
          }
        }
      });
    });
  }

  // Heavily inspired by the tab component from https://github.com/frend/frend.co

  /**
   * @param {object} options Object containing configuration overrides
   */
  var tabs = function tabs() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$selector = _ref.selector,
        selector = _ref$selector === undefined ? '.ecl-tabs' : _ref$selector,
        _ref$tablistSelector = _ref.tablistSelector,
        tablistSelector = _ref$tablistSelector === undefined ? '.ecl-tabs__tablist' : _ref$tablistSelector,
        _ref$tabpanelSelector = _ref.tabpanelSelector,
        tabpanelSelector = _ref$tabpanelSelector === undefined ? '.ecl-tabs__tabpanel' : _ref$tabpanelSelector,
        _ref$tabelementsSelec = _ref.tabelementsSelector,
        tabelementsSelector = _ref$tabelementsSelec === undefined ? tablistSelector + ' li' : _ref$tabelementsSelec;

    // SUPPORTS
    if (!('querySelector' in document) || !('addEventListener' in window) || !document.documentElement.classList) return null;

    // SETUP
    // set tab element NodeList
    var tabContainers = queryAll(selector);

    // ACTIONS
    function showTab(target) {
      var giveFocus = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var siblingTabs = queryAll(tablistSelector + ' li', target.parentElement.parentElement);
      var siblingTabpanels = queryAll(tabpanelSelector, target.parentElement.parentElement);

      // set inactives
      siblingTabs.forEach(function (tab) {
        tab.setAttribute('tabindex', -1);
        tab.removeAttribute('aria-selected');
      });

      siblingTabpanels.forEach(function (tabpanel) {
        tabpanel.setAttribute('aria-hidden', 'true');
      });

      // set actives and focus
      target.setAttribute('tabindex', 0);
      target.setAttribute('aria-selected', 'true');
      if (giveFocus) target.focus();
      document.getElementById(target.getAttribute('aria-controls')).removeAttribute('aria-hidden');
    }

    // EVENTS
    function eventTabClick(e) {
      showTab(e.currentTarget);
      e.preventDefault(); // look into remove id/settimeout/reinstate id as an alternative to preventDefault
    }

    function eventTabKeydown(e) {
      // collect tab targets, and their parents' prev/next (or first/last)
      var currentTab = e.currentTarget;
      var previousTabItem = currentTab.previousElementSibling || currentTab.parentElement.lastElementChild;
      var nextTabItem = currentTab.nextElementSibling || currentTab.parentElement.firstElementChild;

      // don't catch key events when ⌘ or Alt modifier is present
      if (e.metaKey || e.altKey) return;

      // catch left/right and up/down arrow key events
      // if new next/prev tab available, show it by passing tab anchor to showTab method
      switch (e.keyCode) {
        case 37:
        case 38:
          showTab(previousTabItem);
          e.preventDefault();
          break;
        case 39:
        case 40:
          showTab(nextTabItem);
          e.preventDefault();
          break;
        default:
          break;
      }
    }

    // BINDINGS
    function bindTabsEvents(tabContainer) {
      var tabsElements = queryAll(tabelementsSelector, tabContainer);
      // bind all tab click and keydown events
      tabsElements.forEach(function (tab) {
        tab.addEventListener('click', eventTabClick);
        tab.addEventListener('keydown', eventTabKeydown);
      });
    }

    function unbindTabsEvents(tabContainer) {
      var tabsElements = queryAll(tabelementsSelector, tabContainer);
      // unbind all tab click and keydown events
      tabsElements.forEach(function (tab) {
        tab.removeEventListener('click', eventTabClick);
        tab.removeEventListener('keydown', eventTabKeydown);
      });
    }

    // DESTROY
    function destroy() {
      tabContainers.forEach(unbindTabsEvents);
    }

    // INIT
    function init() {
      tabContainers.forEach(bindTabsEvents);
    }

    // Automatically init
    init();

    // REVEAL API
    return {
      init: init,
      destroy: destroy
    };
  };

  /**
   * Timeline
   */

  var expandTimeline = function expandTimeline(timeline, button) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref$classToRemove = _ref.classToRemove,
        classToRemove = _ref$classToRemove === undefined ? 'ecl-timeline__item--over-limit' : _ref$classToRemove,
        _ref$hiddenElementsSe = _ref.hiddenElementsSelector,
        hiddenElementsSelector = _ref$hiddenElementsSe === undefined ? '.ecl-timeline__item--over-limit' : _ref$hiddenElementsSe;

    if (!timeline) {
      return;
    }

    var hiddenElements = Array.prototype.slice.call(timeline.querySelectorAll(hiddenElementsSelector));

    // Remove extra class
    hiddenElements.forEach(function (element) {
      element.classList.remove(classToRemove);
    });

    // Remove buttton
    button.parentNode.removeChild(button);
  };

  // Helper method to automatically attach the event listener to all the expandables on page load
  var timelines = function timelines() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$selector = _ref2.selector,
        selector = _ref2$selector === undefined ? '.ecl-timeline' : _ref2$selector,
        _ref2$buttonSelector = _ref2.buttonSelector,
        buttonSelector = _ref2$buttonSelector === undefined ? '.ecl-timeline__button' : _ref2$buttonSelector,
        _ref2$hiddenElementsS = _ref2.hiddenElementsSelector,
        hiddenElementsSelector = _ref2$hiddenElementsS === undefined ? '.ecl-timeline__item--over-limit' : _ref2$hiddenElementsS,
        _ref2$classToRemove = _ref2.classToRemove,
        classToRemove = _ref2$classToRemove === undefined ? 'ecl-timeline__item--over-limit' : _ref2$classToRemove,
        _ref2$context = _ref2.context,
        context = _ref2$context === undefined ? document : _ref2$context;

    var nodesArray = Array.prototype.slice.call(context.querySelectorAll(selector));

    nodesArray.forEach(function (node) {
      var button = context.querySelector(buttonSelector);

      if (button) {
        button.addEventListener('click', function () {
          return expandTimeline(node, button, { classToRemove: classToRemove, hiddenElementsSelector: hiddenElementsSelector });
        });
      }
    });
  };

  /**
   * Timeline
   */

  // Export components

  // Export components

  exports.accordions = accordions;
  exports.initBreadcrumb = initBreadcrumb;
  exports.carousels = carousels;
  exports.contextualNavs = contextualNavs;
  exports.dropdown = dropdown;
  exports.dialogs = dialogs;
  exports.toggleExpandable = toggleExpandable;
  exports.initExpandables = initExpandables;
  exports.fileUploads = fileUploads;
  exports.eclLangSelectPages = eclLangSelectPages;
  exports.initMessages = initMessages;
  exports.navigationInpages = navigationInpages;
  exports.megamenu = megamenu;
  exports.navigationSide = navigationSide;
  exports.eclTables = eclTables;
  exports.tabs = tabs;
  exports.timelines = timelines;

  return exports;

}({}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL0BlY2wvZ2VuZXJpYy1iYXNlL2hlbHBlcnMvZG9tLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BlY2wvZWMtY29tcG9uZW50LWFjY29yZGlvbi9lYy1jb21wb25lbnQtYWNjb3JkaW9uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC5kZWJvdW5jZS9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AZWNsL2dlbmVyaWMtY29tcG9uZW50LWJyZWFkY3J1bWIvZ2VuZXJpYy1jb21wb25lbnQtYnJlYWRjcnVtYi5qcyIsIi4uL25vZGVfbW9kdWxlcy9AZWNsL2dlbmVyaWMtY29tcG9uZW50LWNhcm91c2VsL2dlbmVyaWMtY29tcG9uZW50LWNhcm91c2VsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BlY2wvZWMtY29tcG9uZW50LWNvbnRleHQtbmF2L2VjLWNvbXBvbmVudC1jb250ZXh0LW5hdi5qcyIsIi4uL25vZGVfbW9kdWxlcy9AZWNsL2VjLWNvbXBvbmVudC1kcm9wZG93bi9lYy1jb21wb25lbnQtZHJvcGRvd24uanMiLCIuLi9ub2RlX21vZHVsZXMvQGVjbC9nZW5lcmljLWNvbXBvbmVudC1kaWFsb2cvZ2VuZXJpYy1jb21wb25lbnQtZGlhbG9nLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BlY2wvZWMtY29tcG9uZW50LWV4cGFuZGFibGUvZWMtY29tcG9uZW50LWV4cGFuZGFibGUuanMiLCIuLi9ub2RlX21vZHVsZXMvQGVjbC9lYy1jb21wb25lbnQtZm9ybS1maWxlLXVwbG9hZC9lYy1jb21wb25lbnQtZm9ybS1maWxlLXVwbG9hZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AZWNsL2VjLWNvbXBvbmVudC1sYW5nLXNlbGVjdC1wYWdlL2VjLWNvbXBvbmVudC1sYW5nLXNlbGVjdC1wYWdlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BlY2wvZ2VuZXJpYy1jb21wb25lbnQtbWVzc2FnZS9nZW5lcmljLWNvbXBvbmVudC1tZXNzYWdlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BlY2wvZWMtY29tcG9uZW50LW1lc3NhZ2UvZWMtY29tcG9uZW50LW1lc3NhZ2UuanMiLCIuLi9ub2RlX21vZHVsZXMvc3RpY2t5ZmlsbGpzL2Rpc3Qvc3RpY2t5ZmlsbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9ndW1zaG9lanMvZGlzdC9qcy9ndW1zaG9lLm1pbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9AZWNsL2dlbmVyaWMtY29tcG9uZW50LWV4cGFuZGFibGUvZ2VuZXJpYy1jb21wb25lbnQtZXhwYW5kYWJsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9AZWNsL2dlbmVyaWMtY29tcG9uZW50LWlucGFnZS1uYXZpZ2F0aW9uL2dlbmVyaWMtY29tcG9uZW50LWlucGFnZS1uYXZpZ2F0aW9uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BlY2wvZ2VuZXJpYy1jb21wb25lbnQtbmF2aWdhdGlvbi1tZW51L2dlbmVyaWMtY29tcG9uZW50LW5hdmlnYXRpb24tbWVudS5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdGlja3liaXRzL2Rpc3Qvc3RpY2t5Yml0cy5lcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9AZWNsL2dlbmVyaWMtY29tcG9uZW50LXNpZGUtbmF2aWdhdGlvbi9nZW5lcmljLWNvbXBvbmVudC1zaWRlLW5hdmlnYXRpb24uanMiLCIuLi9ub2RlX21vZHVsZXMvQGVjbC9lYy1jb21wb25lbnQtdGFibGUvZWMtY29tcG9uZW50LXRhYmxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BlY2wvZWMtY29tcG9uZW50LXRhYi9lYy1jb21wb25lbnQtdGFiLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BlY2wvZ2VuZXJpYy1jb21wb25lbnQtdGltZWxpbmUvZ2VuZXJpYy1jb21wb25lbnQtdGltZWxpbmUuanMiLCIuLi9ub2RlX21vZHVsZXMvQGVjbC9lYy1jb21wb25lbnQtdGltZWxpbmUvZWMtY29tcG9uZW50LXRpbWVsaW5lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BlY2wvZWMtcHJlc2V0LWZ1bGwvZWMtcHJlc2V0LWZ1bGwuanMiLCIuLi9ub2RlX21vZHVsZXMvQGVjbC9lYy1wcmVzZXQtd2Vic2l0ZS9lYy1wcmVzZXQtd2Vic2l0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBRdWVyeSBoZWxwZXJcbmV4cG9ydCBjb25zdCBxdWVyeUFsbCA9IChzZWxlY3RvciwgY29udGV4dCA9IGRvY3VtZW50KSA9PlxuICBbXS5zbGljZS5jYWxsKGNvbnRleHQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xuXG5leHBvcnQgZGVmYXVsdCBxdWVyeUFsbDtcbiIsIi8vIEhlYXZpbHkgaW5zcGlyZWQgYnkgdGhlIGFjY29yZGlvbiBjb21wb25lbnQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZnJlbmQvZnJlbmQuY29cblxuaW1wb3J0IHsgcXVlcnlBbGwgfSBmcm9tICdAZWNsL2VjLWJhc2UvaGVscGVycy9kb20nO1xuXG4vKipcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIE9iamVjdCBjb250YWluaW5nIGNvbmZpZ3VyYXRpb24gb3ZlcnJpZGVzXG4gKi9cbmV4cG9ydCBjb25zdCBhY2NvcmRpb25zID0gKHtcbiAgc2VsZWN0b3I6IHNlbGVjdG9yID0gJy5lY2wtYWNjb3JkaW9uJyxcbiAgaGVhZGVyU2VsZWN0b3I6IGhlYWRlclNlbGVjdG9yID0gJy5lY2wtYWNjb3JkaW9uX19oZWFkZXInLFxufSA9IHt9KSA9PiB7XG4gIC8vIFNVUFBPUlRTXG4gIGlmIChcbiAgICAhKCdxdWVyeVNlbGVjdG9yJyBpbiBkb2N1bWVudCkgfHxcbiAgICAhKCdhZGRFdmVudExpc3RlbmVyJyBpbiB3aW5kb3cpIHx8XG4gICAgIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3RcbiAgKVxuICAgIHJldHVybiBudWxsO1xuXG4gIC8vIFNFVFVQXG4gIC8vIHNldCBhY2NvcmRpb24gZWxlbWVudCBOb2RlTGlzdHNcbiAgY29uc3QgYWNjb3JkaW9uQ29udGFpbmVycyA9IHF1ZXJ5QWxsKHNlbGVjdG9yKTtcblxuICAvLyBBQ1RJT05TXG4gIGZ1bmN0aW9uIGhpZGVQYW5lbCh0YXJnZXQpIHtcbiAgICAvLyBnZXQgcGFuZWxcbiAgICBjb25zdCBhY3RpdmVQYW5lbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgdGFyZ2V0LmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpXG4gICAgKTtcblxuICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcblxuICAgIC8vIHRvZ2dsZSBhcmlhLWhpZGRlblxuICAgIGFjdGl2ZVBhbmVsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICB9XG5cbiAgZnVuY3Rpb24gc2hvd1BhbmVsKHRhcmdldCkge1xuICAgIC8vIGdldCBwYW5lbFxuICAgIGNvbnN0IGFjdGl2ZVBhbmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICB0YXJnZXQuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJylcbiAgICApO1xuXG4gICAgLy8gc2V0IGF0dHJpYnV0ZXMgb24gaGVhZGVyXG4gICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAwKTtcbiAgICB0YXJnZXQuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ3RydWUnKTtcblxuICAgIC8vIHRvZ2dsZSBhcmlhLWhpZGRlbiBhbmQgc2V0IGhlaWdodCBvbiBwYW5lbFxuICAgIGFjdGl2ZVBhbmVsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZVBhbmVsKHRhcmdldCkge1xuICAgIC8vIGNsb3NlIHRhcmdldCBwYW5lbCBpZiBhbHJlYWR5IGFjdGl2ZVxuICAgIGlmICh0YXJnZXQuZ2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJykgPT09ICd0cnVlJykge1xuICAgICAgaGlkZVBhbmVsKHRhcmdldCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2hvd1BhbmVsKHRhcmdldCk7XG4gIH1cblxuICBmdW5jdGlvbiBnaXZlSGVhZGVyRm9jdXMoaGVhZGVyU2V0LCBpKSB7XG4gICAgLy8gc2V0IGFjdGl2ZSBmb2N1c1xuICAgIGhlYWRlclNldFtpXS5mb2N1cygpO1xuICB9XG5cbiAgLy8gRVZFTlRTXG4gIGZ1bmN0aW9uIGV2ZW50SGVhZGVyQ2xpY2soZSkge1xuICAgIHRvZ2dsZVBhbmVsKGUuY3VycmVudFRhcmdldCk7XG4gIH1cblxuICBmdW5jdGlvbiBldmVudEhlYWRlcktleWRvd24oZSkge1xuICAgIC8vIGNvbGxlY3QgaGVhZGVyIHRhcmdldHMsIGFuZCB0aGVpciBwcmV2L25leHRcbiAgICBjb25zdCBjdXJyZW50SGVhZGVyID0gZS5jdXJyZW50VGFyZ2V0O1xuICAgIGNvbnN0IGlzTW9kaWZpZXJLZXkgPSBlLm1ldGFLZXkgfHwgZS5hbHRLZXk7XG4gICAgLy8gZ2V0IGNvbnRleHQgb2YgYWNjb3JkaW9uIGNvbnRhaW5lciBhbmQgaXRzIGNoaWxkcmVuXG4gICAgY29uc3QgdGhpc0NvbnRhaW5lciA9IGN1cnJlbnRIZWFkZXIucGFyZW50Tm9kZS5wYXJlbnROb2RlO1xuICAgIGNvbnN0IHRoZXNlSGVhZGVycyA9IHF1ZXJ5QWxsKGhlYWRlclNlbGVjdG9yLCB0aGlzQ29udGFpbmVyKTtcbiAgICBjb25zdCBjdXJyZW50SGVhZGVySW5kZXggPSBbXS5pbmRleE9mLmNhbGwodGhlc2VIZWFkZXJzLCBjdXJyZW50SGVhZGVyKTtcblxuICAgIC8vIGRvbid0IGNhdGNoIGtleSBldmVudHMgd2hlbiDijJggb3IgQWx0IG1vZGlmaWVyIGlzIHByZXNlbnRcbiAgICBpZiAoaXNNb2RpZmllcktleSkgcmV0dXJuO1xuXG4gICAgLy8gY2F0Y2ggZW50ZXIvc3BhY2UsIGxlZnQvcmlnaHQgYW5kIHVwL2Rvd24gYXJyb3cga2V5IGV2ZW50c1xuICAgIC8vIGlmIG5ldyBwYW5lbCBzaG93IGl0LCBpZiBuZXh0L3ByZXYgbW92ZSBmb2N1c1xuICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICBjYXNlIDEzOlxuICAgICAgY2FzZSAzMjpcbiAgICAgICAgdG9nZ2xlUGFuZWwoY3VycmVudEhlYWRlcik7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM3OlxuICAgICAgY2FzZSAzODoge1xuICAgICAgICBjb25zdCBwcmV2aW91c0hlYWRlckluZGV4ID1cbiAgICAgICAgICBjdXJyZW50SGVhZGVySW5kZXggPT09IDBcbiAgICAgICAgICAgID8gdGhlc2VIZWFkZXJzLmxlbmd0aCAtIDFcbiAgICAgICAgICAgIDogY3VycmVudEhlYWRlckluZGV4IC0gMTtcbiAgICAgICAgZ2l2ZUhlYWRlckZvY3VzKHRoZXNlSGVhZGVycywgcHJldmlvdXNIZWFkZXJJbmRleCk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIDM5OlxuICAgICAgY2FzZSA0MDoge1xuICAgICAgICBjb25zdCBuZXh0SGVhZGVySW5kZXggPVxuICAgICAgICAgIGN1cnJlbnRIZWFkZXJJbmRleCA8IHRoZXNlSGVhZGVycy5sZW5ndGggLSAxXG4gICAgICAgICAgICA/IGN1cnJlbnRIZWFkZXJJbmRleCArIDFcbiAgICAgICAgICAgIDogMDtcbiAgICAgICAgZ2l2ZUhlYWRlckZvY3VzKHRoZXNlSGVhZGVycywgbmV4dEhlYWRlckluZGV4KTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8vIEJJTkQgRVZFTlRTXG4gIGZ1bmN0aW9uIGJpbmRBY2NvcmRpb25FdmVudHMoYWNjb3JkaW9uQ29udGFpbmVyKSB7XG4gICAgY29uc3QgYWNjb3JkaW9uSGVhZGVycyA9IHF1ZXJ5QWxsKGhlYWRlclNlbGVjdG9yLCBhY2NvcmRpb25Db250YWluZXIpO1xuICAgIC8vIGJpbmQgYWxsIGFjY29yZGlvbiBoZWFkZXIgY2xpY2sgYW5kIGtleWRvd24gZXZlbnRzXG4gICAgYWNjb3JkaW9uSGVhZGVycy5mb3JFYWNoKGFjY29yZGlvbkhlYWRlciA9PiB7XG4gICAgICBhY2NvcmRpb25IZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudEhlYWRlckNsaWNrKTtcbiAgICAgIGFjY29yZGlvbkhlYWRlci5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZXZlbnRIZWFkZXJLZXlkb3duKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFVOQklORCBFVkVOVFNcbiAgZnVuY3Rpb24gdW5iaW5kQWNjb3JkaW9uRXZlbnRzKGFjY29yZGlvbkNvbnRhaW5lcikge1xuICAgIGNvbnN0IGFjY29yZGlvbkhlYWRlcnMgPSBxdWVyeUFsbChoZWFkZXJTZWxlY3RvciwgYWNjb3JkaW9uQ29udGFpbmVyKTtcbiAgICAvLyB1bmJpbmQgYWxsIGFjY29yZGlvbiBoZWFkZXIgY2xpY2sgYW5kIGtleWRvd24gZXZlbnRzXG4gICAgYWNjb3JkaW9uSGVhZGVycy5mb3JFYWNoKGFjY29yZGlvbkhlYWRlciA9PiB7XG4gICAgICBhY2NvcmRpb25IZWFkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudEhlYWRlckNsaWNrKTtcbiAgICAgIGFjY29yZGlvbkhlYWRlci5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZXZlbnRIZWFkZXJLZXlkb3duKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIERFU1RST1lcbiAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICBhY2NvcmRpb25Db250YWluZXJzLmZvckVhY2goYWNjb3JkaW9uQ29udGFpbmVyID0+IHtcbiAgICAgIHVuYmluZEFjY29yZGlvbkV2ZW50cyhhY2NvcmRpb25Db250YWluZXIpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gSU5JVFxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIGlmIChhY2NvcmRpb25Db250YWluZXJzLmxlbmd0aCkge1xuICAgICAgYWNjb3JkaW9uQ29udGFpbmVycy5mb3JFYWNoKGFjY29yZGlvbkNvbnRhaW5lciA9PiB7XG4gICAgICAgIGJpbmRBY2NvcmRpb25FdmVudHMoYWNjb3JkaW9uQ29udGFpbmVyKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGluaXQoKTtcblxuICAvLyBSRVZFQUwgQVBJXG4gIHJldHVybiB7XG4gICAgaW5pdCxcbiAgICBkZXN0cm95LFxuICB9O1xufTtcblxuLy8gbW9kdWxlIGV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IGFjY29yZGlvbnM7XG4iLCIvKipcbiAqIGxvZGFzaCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMgPGh0dHBzOi8vanF1ZXJ5Lm9yZy8+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKi9cblxuLyoqIFVzZWQgYXMgdGhlIGBUeXBlRXJyb3JgIG1lc3NhZ2UgZm9yIFwiRnVuY3Rpb25zXCIgbWV0aG9kcy4gKi9cbnZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE5BTiA9IDAgLyAwO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2UuICovXG52YXIgcmVUcmltID0gL15cXHMrfFxccyskL2c7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiYWQgc2lnbmVkIGhleGFkZWNpbWFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JhZEhleCA9IC9eWy0rXTB4WzAtOWEtZl0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmluYXJ5IHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JpbmFyeSA9IC9eMGJbMDFdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG9jdGFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc09jdGFsID0gL14wb1swLTddKyQvaTtcblxuLyoqIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHdpdGhvdXQgYSBkZXBlbmRlbmN5IG9uIGByb290YC4gKi9cbnZhciBmcmVlUGFyc2VJbnQgPSBwYXJzZUludDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZU1heCA9IE1hdGgubWF4LFxuICAgIG5hdGl2ZU1pbiA9IE1hdGgubWluO1xuXG4vKipcbiAqIEdldHMgdGhlIHRpbWVzdGFtcCBvZiB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0aGF0IGhhdmUgZWxhcHNlZCBzaW5jZVxuICogdGhlIFVuaXggZXBvY2ggKDEgSmFudWFyeSAxOTcwIDAwOjAwOjAwIFVUQykuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAyLjQuMFxuICogQGNhdGVnb3J5IERhdGVcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIHRpbWVzdGFtcC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5kZWZlcihmdW5jdGlvbihzdGFtcCkge1xuICogICBjb25zb2xlLmxvZyhfLm5vdygpIC0gc3RhbXApO1xuICogfSwgXy5ub3coKSk7XG4gKiAvLyA9PiBMb2dzIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGl0IHRvb2sgZm9yIHRoZSBkZWZlcnJlZCBpbnZvY2F0aW9uLlxuICovXG52YXIgbm93ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiByb290LkRhdGUubm93KCk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBkZWJvdW5jZWQgZnVuY3Rpb24gdGhhdCBkZWxheXMgaW52b2tpbmcgYGZ1bmNgIHVudGlsIGFmdGVyIGB3YWl0YFxuICogbWlsbGlzZWNvbmRzIGhhdmUgZWxhcHNlZCBzaW5jZSB0aGUgbGFzdCB0aW1lIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gd2FzXG4gKiBpbnZva2VkLiBUaGUgZGVib3VuY2VkIGZ1bmN0aW9uIGNvbWVzIHdpdGggYSBgY2FuY2VsYCBtZXRob2QgdG8gY2FuY2VsXG4gKiBkZWxheWVkIGBmdW5jYCBpbnZvY2F0aW9ucyBhbmQgYSBgZmx1c2hgIG1ldGhvZCB0byBpbW1lZGlhdGVseSBpbnZva2UgdGhlbS5cbiAqIFByb3ZpZGUgYG9wdGlvbnNgIHRvIGluZGljYXRlIHdoZXRoZXIgYGZ1bmNgIHNob3VsZCBiZSBpbnZva2VkIG9uIHRoZVxuICogbGVhZGluZyBhbmQvb3IgdHJhaWxpbmcgZWRnZSBvZiB0aGUgYHdhaXRgIHRpbWVvdXQuIFRoZSBgZnVuY2AgaXMgaW52b2tlZFxuICogd2l0aCB0aGUgbGFzdCBhcmd1bWVudHMgcHJvdmlkZWQgdG8gdGhlIGRlYm91bmNlZCBmdW5jdGlvbi4gU3Vic2VxdWVudFxuICogY2FsbHMgdG8gdGhlIGRlYm91bmNlZCBmdW5jdGlvbiByZXR1cm4gdGhlIHJlc3VsdCBvZiB0aGUgbGFzdCBgZnVuY2BcbiAqIGludm9jYXRpb24uXG4gKlxuICogKipOb3RlOioqIElmIGBsZWFkaW5nYCBhbmQgYHRyYWlsaW5nYCBvcHRpb25zIGFyZSBgdHJ1ZWAsIGBmdW5jYCBpc1xuICogaW52b2tlZCBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dCBvbmx5IGlmIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb25cbiAqIGlzIGludm9rZWQgbW9yZSB0aGFuIG9uY2UgZHVyaW5nIHRoZSBgd2FpdGAgdGltZW91dC5cbiAqXG4gKiBJZiBgd2FpdGAgaXMgYDBgIGFuZCBgbGVhZGluZ2AgaXMgYGZhbHNlYCwgYGZ1bmNgIGludm9jYXRpb24gaXMgZGVmZXJyZWRcbiAqIHVudGlsIHRvIHRoZSBuZXh0IHRpY2ssIHNpbWlsYXIgdG8gYHNldFRpbWVvdXRgIHdpdGggYSB0aW1lb3V0IG9mIGAwYC5cbiAqXG4gKiBTZWUgW0RhdmlkIENvcmJhY2hvJ3MgYXJ0aWNsZV0oaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9kZWJvdW5jaW5nLXRocm90dGxpbmctZXhwbGFpbmVkLWV4YW1wbGVzLylcbiAqIGZvciBkZXRhaWxzIG92ZXIgdGhlIGRpZmZlcmVuY2VzIGJldHdlZW4gYF8uZGVib3VuY2VgIGFuZCBgXy50aHJvdHRsZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBkZWJvdW5jZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbd2FpdD0wXSBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byBkZWxheS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gVGhlIG9wdGlvbnMgb2JqZWN0LlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWFkaW5nPWZhbHNlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIGxlYWRpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tYXhXYWl0XVxuICogIFRoZSBtYXhpbXVtIHRpbWUgYGZ1bmNgIGlzIGFsbG93ZWQgdG8gYmUgZGVsYXllZCBiZWZvcmUgaXQncyBpbnZva2VkLlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy50cmFpbGluZz10cnVlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBkZWJvdW5jZWQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIC8vIEF2b2lkIGNvc3RseSBjYWxjdWxhdGlvbnMgd2hpbGUgdGhlIHdpbmRvdyBzaXplIGlzIGluIGZsdXguXG4gKiBqUXVlcnkod2luZG93KS5vbigncmVzaXplJywgXy5kZWJvdW5jZShjYWxjdWxhdGVMYXlvdXQsIDE1MCkpO1xuICpcbiAqIC8vIEludm9rZSBgc2VuZE1haWxgIHdoZW4gY2xpY2tlZCwgZGVib3VuY2luZyBzdWJzZXF1ZW50IGNhbGxzLlxuICogalF1ZXJ5KGVsZW1lbnQpLm9uKCdjbGljaycsIF8uZGVib3VuY2Uoc2VuZE1haWwsIDMwMCwge1xuICogICAnbGVhZGluZyc6IHRydWUsXG4gKiAgICd0cmFpbGluZyc6IGZhbHNlXG4gKiB9KSk7XG4gKlxuICogLy8gRW5zdXJlIGBiYXRjaExvZ2AgaXMgaW52b2tlZCBvbmNlIGFmdGVyIDEgc2Vjb25kIG9mIGRlYm91bmNlZCBjYWxscy5cbiAqIHZhciBkZWJvdW5jZWQgPSBfLmRlYm91bmNlKGJhdGNoTG9nLCAyNTAsIHsgJ21heFdhaXQnOiAxMDAwIH0pO1xuICogdmFyIHNvdXJjZSA9IG5ldyBFdmVudFNvdXJjZSgnL3N0cmVhbScpO1xuICogalF1ZXJ5KHNvdXJjZSkub24oJ21lc3NhZ2UnLCBkZWJvdW5jZWQpO1xuICpcbiAqIC8vIENhbmNlbCB0aGUgdHJhaWxpbmcgZGVib3VuY2VkIGludm9jYXRpb24uXG4gKiBqUXVlcnkod2luZG93KS5vbigncG9wc3RhdGUnLCBkZWJvdW5jZWQuY2FuY2VsKTtcbiAqL1xuZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCwgb3B0aW9ucykge1xuICB2YXIgbGFzdEFyZ3MsXG4gICAgICBsYXN0VGhpcyxcbiAgICAgIG1heFdhaXQsXG4gICAgICByZXN1bHQsXG4gICAgICB0aW1lcklkLFxuICAgICAgbGFzdENhbGxUaW1lLFxuICAgICAgbGFzdEludm9rZVRpbWUgPSAwLFxuICAgICAgbGVhZGluZyA9IGZhbHNlLFxuICAgICAgbWF4aW5nID0gZmFsc2UsXG4gICAgICB0cmFpbGluZyA9IHRydWU7XG5cbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgd2FpdCA9IHRvTnVtYmVyKHdhaXQpIHx8IDA7XG4gIGlmIChpc09iamVjdChvcHRpb25zKSkge1xuICAgIGxlYWRpbmcgPSAhIW9wdGlvbnMubGVhZGluZztcbiAgICBtYXhpbmcgPSAnbWF4V2FpdCcgaW4gb3B0aW9ucztcbiAgICBtYXhXYWl0ID0gbWF4aW5nID8gbmF0aXZlTWF4KHRvTnVtYmVyKG9wdGlvbnMubWF4V2FpdCkgfHwgMCwgd2FpdCkgOiBtYXhXYWl0O1xuICAgIHRyYWlsaW5nID0gJ3RyYWlsaW5nJyBpbiBvcHRpb25zID8gISFvcHRpb25zLnRyYWlsaW5nIDogdHJhaWxpbmc7XG4gIH1cblxuICBmdW5jdGlvbiBpbnZva2VGdW5jKHRpbWUpIHtcbiAgICB2YXIgYXJncyA9IGxhc3RBcmdzLFxuICAgICAgICB0aGlzQXJnID0gbGFzdFRoaXM7XG5cbiAgICBsYXN0QXJncyA9IGxhc3RUaGlzID0gdW5kZWZpbmVkO1xuICAgIGxhc3RJbnZva2VUaW1lID0gdGltZTtcbiAgICByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBsZWFkaW5nRWRnZSh0aW1lKSB7XG4gICAgLy8gUmVzZXQgYW55IGBtYXhXYWl0YCB0aW1lci5cbiAgICBsYXN0SW52b2tlVGltZSA9IHRpbWU7XG4gICAgLy8gU3RhcnQgdGhlIHRpbWVyIGZvciB0aGUgdHJhaWxpbmcgZWRnZS5cbiAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgIC8vIEludm9rZSB0aGUgbGVhZGluZyBlZGdlLlxuICAgIHJldHVybiBsZWFkaW5nID8gaW52b2tlRnVuYyh0aW1lKSA6IHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbWFpbmluZ1dhaXQodGltZSkge1xuICAgIHZhciB0aW1lU2luY2VMYXN0Q2FsbCA9IHRpbWUgLSBsYXN0Q2FsbFRpbWUsXG4gICAgICAgIHRpbWVTaW5jZUxhc3RJbnZva2UgPSB0aW1lIC0gbGFzdEludm9rZVRpbWUsXG4gICAgICAgIHJlc3VsdCA9IHdhaXQgLSB0aW1lU2luY2VMYXN0Q2FsbDtcblxuICAgIHJldHVybiBtYXhpbmcgPyBuYXRpdmVNaW4ocmVzdWx0LCBtYXhXYWl0IC0gdGltZVNpbmNlTGFzdEludm9rZSkgOiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBzaG91bGRJbnZva2UodGltZSkge1xuICAgIHZhciB0aW1lU2luY2VMYXN0Q2FsbCA9IHRpbWUgLSBsYXN0Q2FsbFRpbWUsXG4gICAgICAgIHRpbWVTaW5jZUxhc3RJbnZva2UgPSB0aW1lIC0gbGFzdEludm9rZVRpbWU7XG5cbiAgICAvLyBFaXRoZXIgdGhpcyBpcyB0aGUgZmlyc3QgY2FsbCwgYWN0aXZpdHkgaGFzIHN0b3BwZWQgYW5kIHdlJ3JlIGF0IHRoZVxuICAgIC8vIHRyYWlsaW5nIGVkZ2UsIHRoZSBzeXN0ZW0gdGltZSBoYXMgZ29uZSBiYWNrd2FyZHMgYW5kIHdlJ3JlIHRyZWF0aW5nXG4gICAgLy8gaXQgYXMgdGhlIHRyYWlsaW5nIGVkZ2UsIG9yIHdlJ3ZlIGhpdCB0aGUgYG1heFdhaXRgIGxpbWl0LlxuICAgIHJldHVybiAobGFzdENhbGxUaW1lID09PSB1bmRlZmluZWQgfHwgKHRpbWVTaW5jZUxhc3RDYWxsID49IHdhaXQpIHx8XG4gICAgICAodGltZVNpbmNlTGFzdENhbGwgPCAwKSB8fCAobWF4aW5nICYmIHRpbWVTaW5jZUxhc3RJbnZva2UgPj0gbWF4V2FpdCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gdGltZXJFeHBpcmVkKCkge1xuICAgIHZhciB0aW1lID0gbm93KCk7XG4gICAgaWYgKHNob3VsZEludm9rZSh0aW1lKSkge1xuICAgICAgcmV0dXJuIHRyYWlsaW5nRWRnZSh0aW1lKTtcbiAgICB9XG4gICAgLy8gUmVzdGFydCB0aGUgdGltZXIuXG4gICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCByZW1haW5pbmdXYWl0KHRpbWUpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyYWlsaW5nRWRnZSh0aW1lKSB7XG4gICAgdGltZXJJZCA9IHVuZGVmaW5lZDtcblxuICAgIC8vIE9ubHkgaW52b2tlIGlmIHdlIGhhdmUgYGxhc3RBcmdzYCB3aGljaCBtZWFucyBgZnVuY2AgaGFzIGJlZW5cbiAgICAvLyBkZWJvdW5jZWQgYXQgbGVhc3Qgb25jZS5cbiAgICBpZiAodHJhaWxpbmcgJiYgbGFzdEFyZ3MpIHtcbiAgICAgIHJldHVybiBpbnZva2VGdW5jKHRpbWUpO1xuICAgIH1cbiAgICBsYXN0QXJncyA9IGxhc3RUaGlzID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgaWYgKHRpbWVySWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVySWQpO1xuICAgIH1cbiAgICBsYXN0SW52b2tlVGltZSA9IDA7XG4gICAgbGFzdEFyZ3MgPSBsYXN0Q2FsbFRpbWUgPSBsYXN0VGhpcyA9IHRpbWVySWQgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBmdW5jdGlvbiBmbHVzaCgpIHtcbiAgICByZXR1cm4gdGltZXJJZCA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogdHJhaWxpbmdFZGdlKG5vdygpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlYm91bmNlZCgpIHtcbiAgICB2YXIgdGltZSA9IG5vdygpLFxuICAgICAgICBpc0ludm9raW5nID0gc2hvdWxkSW52b2tlKHRpbWUpO1xuXG4gICAgbGFzdEFyZ3MgPSBhcmd1bWVudHM7XG4gICAgbGFzdFRoaXMgPSB0aGlzO1xuICAgIGxhc3RDYWxsVGltZSA9IHRpbWU7XG5cbiAgICBpZiAoaXNJbnZva2luZykge1xuICAgICAgaWYgKHRpbWVySWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gbGVhZGluZ0VkZ2UobGFzdENhbGxUaW1lKTtcbiAgICAgIH1cbiAgICAgIGlmIChtYXhpbmcpIHtcbiAgICAgICAgLy8gSGFuZGxlIGludm9jYXRpb25zIGluIGEgdGlnaHQgbG9vcC5cbiAgICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICAgICAgcmV0dXJuIGludm9rZUZ1bmMobGFzdENhbGxUaW1lKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRpbWVySWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBkZWJvdW5jZWQuY2FuY2VsID0gY2FuY2VsO1xuICBkZWJvdW5jZWQuZmx1c2ggPSBmbHVzaDtcbiAgcmV0dXJuIGRlYm91bmNlZDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3ltYm9sYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3ltYm9sLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N5bWJvbCcgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBzeW1ib2xUYWcpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBudW1iZXIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBudW1iZXIuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9OdW1iZXIoMy4yKTtcbiAqIC8vID0+IDMuMlxuICpcbiAqIF8udG9OdW1iZXIoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiA1ZS0zMjRcbiAqXG4gKiBfLnRvTnVtYmVyKEluZmluaXR5KTtcbiAqIC8vID0+IEluZmluaXR5XG4gKlxuICogXy50b051bWJlcignMy4yJyk7XG4gKiAvLyA9PiAzLjJcbiAqL1xuZnVuY3Rpb24gdG9OdW1iZXIodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAoaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIE5BTjtcbiAgfVxuICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgdmFyIG90aGVyID0gdHlwZW9mIHZhbHVlLnZhbHVlT2YgPT0gJ2Z1bmN0aW9uJyA/IHZhbHVlLnZhbHVlT2YoKSA6IHZhbHVlO1xuICAgIHZhbHVlID0gaXNPYmplY3Qob3RoZXIpID8gKG90aGVyICsgJycpIDogb3RoZXI7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gMCA/IHZhbHVlIDogK3ZhbHVlO1xuICB9XG4gIHZhbHVlID0gdmFsdWUucmVwbGFjZShyZVRyaW0sICcnKTtcbiAgdmFyIGlzQmluYXJ5ID0gcmVJc0JpbmFyeS50ZXN0KHZhbHVlKTtcbiAgcmV0dXJuIChpc0JpbmFyeSB8fCByZUlzT2N0YWwudGVzdCh2YWx1ZSkpXG4gICAgPyBmcmVlUGFyc2VJbnQodmFsdWUuc2xpY2UoMiksIGlzQmluYXJ5ID8gMiA6IDgpXG4gICAgOiAocmVJc0JhZEhleC50ZXN0KHZhbHVlKSA/IE5BTiA6ICt2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGVib3VuY2U7XG4iLCJpbXBvcnQgZGVib3VuY2UgZnJvbSAnbG9kYXNoLmRlYm91bmNlJztcbmltcG9ydCB7IHF1ZXJ5QWxsIH0gZnJvbSAnQGVjbC9nZW5lcmljLWJhc2UvaGVscGVycy9kb20nO1xuXG4vKipcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIE9iamVjdCBjb250YWluaW5nIGNvbmZpZ3VyYXRpb24gb3ZlcnJpZGVzXG4gKi9cbmV4cG9ydCBjb25zdCBpbml0QnJlYWRjcnVtYiA9ICh7XG4gIGJyZWFkY3J1bWJTZWxlY3RvcjogYnJlYWRjcnVtYlNlbGVjdG9yID0gJy5lY2wtYnJlYWRjcnVtYicsXG4gIGV4cGFuZEJ1dHRvblNlbGVjdG9yOiBleHBhbmRCdXR0b25TZWxlY3RvciA9ICcuZWNsLWJyZWFkY3J1bWJfX2V4cGFuZC1idG4nLFxuICBzZWdtZW50U2VsZWN0b3I6IHNlZ21lbnRTZWxlY3RvciA9ICcuZWNsLWJyZWFkY3J1bWJfX3NlZ21lbnQnLFxuICBzZWdtZW50Rmlyc3RTZWxlY3Rvcjogc2VnbWVudEZpcnN0U2VsZWN0b3IgPSAnLmVjbC1icmVhZGNydW1iX19zZWdtZW50LS1maXJzdCcsXG4gIHNlZ21lbnRWaXNpYmxlU2VsZWN0b3I6IHNlZ21lbnRWaXNpYmxlU2VsZWN0b3IgPSAnLmVjbC1icmVhZGNydW1iX19zZWdtZW50Om5vdCguZWNsLWJyZWFkY3J1bWJfX3NlZ21lbnQtLWZpcnN0KTpub3QoLmVjbC1icmVhZGNydW1iX19zZWdtZW50LS1lbGxpcHNpcyk6bm90KC5lY2wtYnJlYWRjcnVtYl9fc2VnbWVudC0tbGFzdCk6bm90KFthcmlhLWhpZGRlbj1cInRydWVcIl0pJyxcbiAgc2VnbWVudEhpZGRlblNlbGVjdG9yOiBzZWdtZW50SGlkZGVuU2VsZWN0b3IgPSAnLmVjbC1icmVhZGNydW1iX19zZWdtZW50W2FyaWEtaGlkZGVuPVwidHJ1ZVwiXTpub3QoLmVjbC1icmVhZGNydW1iX19zZWdtZW50LS1lbGxpcHNpcyknLFxuICBlbGxpcHNpc1NlbGVjdG9yOiBlbGxpcHNpc1NlbGVjdG9yID0gJy5lY2wtYnJlYWRjcnVtYl9fc2VnbWVudC0tZWxsaXBzaXMnLFxufSA9IHt9KSA9PiB7XG4gIGlmIChcbiAgICAhKCdxdWVyeVNlbGVjdG9yJyBpbiBkb2N1bWVudCkgfHxcbiAgICAhKCdhZGRFdmVudExpc3RlbmVyJyBpbiB3aW5kb3cpIHx8XG4gICAgIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3RcbiAgKVxuICAgIHJldHVybiBudWxsO1xuXG4gIC8vIEFDVElPTlNcbiAgZnVuY3Rpb24gaW5pdEVsbGlwc2lzKGJyZWFkY3J1bWJDb250YWluZXIpIHtcbiAgICAvLyBhZGQgZWxsaXBzaXMgdG8gRE9NXG4gICAgY29uc3QgYnJlYWRjcnVtYkZpcnN0ID0gcXVlcnlBbGwoc2VnbWVudEZpcnN0U2VsZWN0b3IsIGJyZWFkY3J1bWJDb250YWluZXIpO1xuICAgIGJyZWFkY3J1bWJGaXJzdC5mb3JFYWNoKHNlZ21lbnQgPT4ge1xuICAgICAgY29uc3QgZWxsaXBzaXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAvLyB3ZSBjYW4ndCBhZGQgbXVsdGlwbHMgY2xhc3NlcyBhdCBvbmNlLCBiZWNhdXNlLi4uIElFXG4gICAgICBlbGxpcHNpcy5jbGFzc0xpc3QuYWRkKCdlY2wtbGluaycpO1xuICAgICAgZWxsaXBzaXMuY2xhc3NMaXN0LmFkZCgnZWNsLWxpbmstLWludmVydGVkJyk7XG4gICAgICBlbGxpcHNpcy5jbGFzc0xpc3QuYWRkKCdlY2wtbGluay0tc3RhbmRhbG9uZScpO1xuICAgICAgZWxsaXBzaXMuY2xhc3NMaXN0LmFkZCgnZWNsLWJyZWFkY3J1bWJfX2xpbmsnKTtcbiAgICAgIGVsbGlwc2lzLmNsYXNzTGlzdC5hZGQoJ2VjbC1icmVhZGNydW1iX19leHBhbmQtYnRuJyk7XG4gICAgICBlbGxpcHNpcy5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnIycpO1xuICAgICAgZWxsaXBzaXMuaW5uZXJIVE1MID0gJ+KApic7XG5cbiAgICAgIGNvbnN0IGxpc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoJ2VjbC1icmVhZGNydW1iX19zZWdtZW50Jyk7XG4gICAgICBsaXN0SXRlbS5jbGFzc0xpc3QuYWRkKCdlY2wtYnJlYWRjcnVtYl9fc2VnbWVudC0tZWxsaXBzaXMnKTtcbiAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoJ2VjbC11LWFyaWEnKTtcbiAgICAgIGxpc3RJdGVtLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXG4gICAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZChlbGxpcHNpcyk7XG4gICAgICBzZWdtZW50LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGxpc3RJdGVtLCBzZWdtZW50Lm5leHRTaWJsaW5nKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZUVsbGlwc2lzKGJyZWFkY3J1bWJDb250YWluZXIpIHtcbiAgICAvLyBnZXQgaGlkZGVuIHNlZ21lbnRzXG4gICAgY29uc3QgYnJlYWRjcnVtYkhpZGRlblNlZ21lbnRzID0gcXVlcnlBbGwoXG4gICAgICBzZWdtZW50SGlkZGVuU2VsZWN0b3IsXG4gICAgICBicmVhZGNydW1iQ29udGFpbmVyXG4gICAgKTtcbiAgICBjb25zdCBoaWRkZW4gPSBicmVhZGNydW1iSGlkZGVuU2VnbWVudHMubGVuZ3RoID4gMCA/ICdmYWxzZScgOiAndHJ1ZSc7XG5cbiAgICAvLyBkaXNwbGF5IGVsbGlwc2lzIHdoZW4gbmVlZGVkXG4gICAgY29uc3QgYnJlYWRjcnVtYkVsbGlwc2lzID0gcXVlcnlBbGwoZWxsaXBzaXNTZWxlY3RvciwgYnJlYWRjcnVtYkNvbnRhaW5lcik7XG4gICAgYnJlYWRjcnVtYkVsbGlwc2lzLmZvckVhY2goZWxsaXBzaXMgPT4ge1xuICAgICAgZWxsaXBzaXMuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIGhpZGRlbik7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBicmVhZGNydW1iSXNUb29MYXJnZShicmVhZGNydW1iQ29udGFpbmVyKSB7XG4gICAgLy8gZ2V0IHdyYXBwZXIgd2lkdGhcbiAgICBjb25zdCB3cmFwcGVyV2lkdGggPSBNYXRoLmZsb29yKFxuICAgICAgYnJlYWRjcnVtYkNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aFxuICAgICk7XG5cbiAgICAvLyBnZXQgZGlzcGxheWVkIHNlZ21lbnRzXG4gICAgY29uc3QgYnJlYWRjcnVtYlNlZ21lbnRzID0gcXVlcnlBbGwoc2VnbWVudFNlbGVjdG9yLCBicmVhZGNydW1iQ29udGFpbmVyKTtcblxuICAgIC8vIGdldCBzZWdtZW50cyB3aWR0aFxuICAgIGxldCBzZWdtZW50V2lkdGggPSAwO1xuICAgIGJyZWFkY3J1bWJTZWdtZW50cy5mb3JFYWNoKGJyZWFkY3J1bWJTZWdtZW50ID0+IHtcbiAgICAgIHNlZ21lbnRXaWR0aCArPSBNYXRoLmNlaWwoXG4gICAgICAgIGJyZWFkY3J1bWJTZWdtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHNlZ21lbnRXaWR0aCA+PSB3cmFwcGVyV2lkdGg7XG4gIH1cblxuICBmdW5jdGlvbiBoaWRlU2VnbWVudChicmVhZGNydW1iQ29udGFpbmVyKSB7XG4gICAgLy8gZ2V0IHZpc2libGUgc2VnbWVudHNcbiAgICBjb25zdCBicmVhZGNydW1iVmlzaWJsZVNlZ21lbnRzID0gcXVlcnlBbGwoXG4gICAgICBzZWdtZW50VmlzaWJsZVNlbGVjdG9yLFxuICAgICAgYnJlYWRjcnVtYkNvbnRhaW5lclxuICAgICk7XG5cbiAgICAvLyBoaWRlIHNlZ21lbnRzIGlmIG5lZWRlZFxuICAgIC8vIHdlIGRvIG5vdCBoaWRlIHRoZSBsYXN0IHR3byBzZWdtZW50c1xuICAgIGlmIChicmVhZGNydW1iVmlzaWJsZVNlZ21lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgIGJyZWFkY3J1bWJWaXNpYmxlU2VnbWVudHNbMF0uc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cbiAgICAgIC8vIGNoZWNrIGlmIHRoZXJlIGlzIGFub3RoZXIgc2VnbWVudCB0byBiZSBoaWRkZW5cbiAgICAgIGlmIChicmVhZGNydW1iSXNUb29MYXJnZShicmVhZGNydW1iQ29udGFpbmVyKSkge1xuICAgICAgICBoaWRlU2VnbWVudChicmVhZGNydW1iQ29udGFpbmVyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzaG93U2VnbWVudChicmVhZGNydW1iQ29udGFpbmVyKSB7XG4gICAgLy8gZ2V0IGhpZGRlbiBzZWdtZW50c1xuICAgIGNvbnN0IGJyZWFkY3J1bWJIaWRkZW5TZWdtZW50cyA9IHF1ZXJ5QWxsKFxuICAgICAgc2VnbWVudEhpZGRlblNlbGVjdG9yLFxuICAgICAgYnJlYWRjcnVtYkNvbnRhaW5lclxuICAgICk7XG5cbiAgICAvLyBzaG93IHNlZ21lbnRzIGlmIHRoZXJlIGlzIGVub3VnaCBzcGFjZVxuICAgIGlmIChicmVhZGNydW1iSGlkZGVuU2VnbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgYnJlYWRjcnVtYkhpZGRlblNlZ21lbnRzW1xuICAgICAgICBicmVhZGNydW1iSGlkZGVuU2VnbWVudHMubGVuZ3RoIC0gMVxuICAgICAgXS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbiAgICAgIGlmIChicmVhZGNydW1iSXNUb29MYXJnZShicmVhZGNydW1iQ29udGFpbmVyKSkge1xuICAgICAgICAvLyBicmVhZGNydW1iIGlzIHRvbyBsYXJnZSwgd2UgaGlkZSB0aGUgbGFzdCBzZWdtZW50XG4gICAgICAgIGhpZGVTZWdtZW50KGJyZWFkY3J1bWJDb250YWluZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlcmUgaXMgYW5vdGhlciBzZWdtZW50IHRvIGJlIGRpc3BsYXllZFxuICAgICAgICBzaG93U2VnbWVudChicmVhZGNydW1iQ29udGFpbmVyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBFVkVOVFNcbiAgZnVuY3Rpb24gZXZlbnRFeHBhbmRDbGljayhlLCBicmVhZGNydW1iQ29udGFpbmVyKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vIGRpc3BsYXkgYWxsIHNlZ21lbnRzXG4gICAgY29uc3QgYnJlYWRjcnVtYlNlZ21lbnRzID0gcXVlcnlBbGwoc2VnbWVudFNlbGVjdG9yLCBicmVhZGNydW1iQ29udGFpbmVyKTtcbiAgICBicmVhZGNydW1iU2VnbWVudHMuZm9yRWFjaChicmVhZGNydW1iU2VnbWVudCA9PiB7XG4gICAgICBicmVhZGNydW1iU2VnbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG4gICAgfSk7XG5cbiAgICAvLyBoaWRlIGVsbGlwc2lzIG9uY2UgZXhwYW5kZWRcbiAgICBjb25zdCB0YXJnZXQgPSBlLmN1cnJlbnRUYXJnZXQ7XG4gICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gIH1cblxuICBmdW5jdGlvbiBldmVudFJlc2l6ZShicmVhZGNydW1iQ29udGFpbmVyKSB7XG4gICAgLy8gY2hlY2sgaWYgdGhlcmUgYXJlIHNlZ21lbnRzIHRvIGJlIGhpZGRlbiBvciBzaG93blxuICAgIGlmIChicmVhZGNydW1iSXNUb29MYXJnZShicmVhZGNydW1iQ29udGFpbmVyKSkge1xuICAgICAgaGlkZVNlZ21lbnQoYnJlYWRjcnVtYkNvbnRhaW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNob3dTZWdtZW50KGJyZWFkY3J1bWJDb250YWluZXIpO1xuICAgIH1cbiAgICB0b2dnbGVFbGxpcHNpcyhicmVhZGNydW1iQ29udGFpbmVyKTtcbiAgfVxuXG4gIC8vIFNFVFVQXG4gIGNvbnN0IGJyZWFkY3J1bWJDb250YWluZXJzID0gcXVlcnlBbGwoYnJlYWRjcnVtYlNlbGVjdG9yKTtcblxuICAvLyBCSU5EIEVWRU5UU1xuICBmdW5jdGlvbiBiaW5kQnJlYWRjcnVtYkV2ZW50cyhicmVhZGNydW1iQ29udGFpbmVyKSB7XG4gICAgY29uc3QgZXhwYW5kcyA9IHF1ZXJ5QWxsKGV4cGFuZEJ1dHRvblNlbGVjdG9yLCBicmVhZGNydW1iQ29udGFpbmVyKTtcblxuICAgIC8vIGJpbmQgY2xpY2sgZXZlbnQgZm9yIGV4cGFuZFxuICAgIGV4cGFuZHMuZm9yRWFjaChleHBhbmQgPT4ge1xuICAgICAgZXhwYW5kLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PlxuICAgICAgICBldmVudEV4cGFuZENsaWNrKGUsIGJyZWFkY3J1bWJDb250YWluZXIpXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgLy8gYmluZCByZXNpemUgZXZlbnQgdG8gY2hlY2sgYnJlYWRjcnVtYiB3aWR0aFxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgJ3Jlc2l6ZScsXG4gICAgICBkZWJvdW5jZShcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIGJyZWFkY3J1bWJDb250YWluZXJzLmZvckVhY2goZXZlbnRSZXNpemUpO1xuICAgICAgICB9LFxuICAgICAgICAxMDAsXG4gICAgICAgIHsgbWF4V2FpdDogMzAwIH1cbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLy8gVU5CSU5EIEVWRU5UU1xuICBmdW5jdGlvbiB1bmJpbmRCcmVhZGNydW1iRXZlbnRzKGJyZWFkY3J1bWJDb250YWluZXIpIHtcbiAgICBjb25zdCBleHBhbmRzID0gcXVlcnlBbGwoZXhwYW5kQnV0dG9uU2VsZWN0b3IsIGJyZWFkY3J1bWJDb250YWluZXIpO1xuICAgIC8vIHVuYmluZCBjbGljayBldmVudCBmb3IgZXhwYW5kXG4gICAgZXhwYW5kcy5mb3JFYWNoKGV4cGFuZCA9PiB7XG4gICAgICBleHBhbmQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+XG4gICAgICAgIGV2ZW50RXhwYW5kQ2xpY2soZSwgYnJlYWRjcnVtYkNvbnRhaW5lcilcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICAvLyB1bmJpbmQgcmVzaXplIGV2ZW50IHRvIGNoZWNrIGJyZWFkY3J1bWIgd2lkdGhcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcbiAgICAgICdyZXNpemUnLFxuICAgICAgZGVib3VuY2UoXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBicmVhZGNydW1iQ29udGFpbmVycy5mb3JFYWNoKGV2ZW50UmVzaXplKTtcbiAgICAgICAgfSxcbiAgICAgICAgMTAwLFxuICAgICAgICB7IG1heFdhaXQ6IDMwMCB9XG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8vIERFU1RST1lcbiAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICBpZiAoYnJlYWRjcnVtYkNvbnRhaW5lcnMubGVuZ3RoKSB7XG4gICAgICBicmVhZGNydW1iQ29udGFpbmVycy5mb3JFYWNoKGJyZWFkY3J1bWJDb250YWluZXIgPT4ge1xuICAgICAgICB1bmJpbmRCcmVhZGNydW1iRXZlbnRzKGJyZWFkY3J1bWJDb250YWluZXIpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gSU5JVFxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIGlmIChicmVhZGNydW1iQ29udGFpbmVycy5sZW5ndGgpIHtcbiAgICAgIGJyZWFkY3J1bWJDb250YWluZXJzLmZvckVhY2goYnJlYWRjcnVtYkNvbnRhaW5lciA9PiB7XG4gICAgICAgIGluaXRFbGxpcHNpcyhicmVhZGNydW1iQ29udGFpbmVyKTtcbiAgICAgICAgYmluZEJyZWFkY3J1bWJFdmVudHMoYnJlYWRjcnVtYkNvbnRhaW5lcik7XG5cbiAgICAgICAgLy8gdHJpZ2dlciByZXNpemUgZXZlbnQgb25jZVxuICAgICAgICBldmVudFJlc2l6ZShicmVhZGNydW1iQ29udGFpbmVyKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGluaXQoKTtcblxuICAvLyBSRVZFQUwgQVBJXG4gIHJldHVybiB7XG4gICAgaW5pdCxcbiAgICBkZXN0cm95LFxuICB9O1xufTtcblxuLy8gbW9kdWxlIGV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IGluaXRCcmVhZGNydW1iO1xuIiwiaW1wb3J0IHsgcXVlcnlBbGwgfSBmcm9tICdAZWNsL2dlbmVyaWMtYmFzZS9oZWxwZXJzL2RvbSc7XG5pbXBvcnQgZGVib3VuY2UgZnJvbSAnbG9kYXNoLmRlYm91bmNlJztcblxuLyoqXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyBPYmplY3QgY29udGFpbmluZyBjb25maWd1cmF0aW9uIG92ZXJyaWRlc1xuICovXG5leHBvcnQgY29uc3QgY2Fyb3VzZWxzID0gKHsgc2VsZWN0b3JJZDogc2VsZWN0b3JJZCA9ICdlY2wtY2Fyb3VzZWwnIH0gPSB7fSkgPT4ge1xuICAvLyBTVVBQT1JUU1xuICBpZiAoISgncXVlcnlTZWxlY3RvcicgaW4gZG9jdW1lbnQpIHx8ICEoJ2FkZEV2ZW50TGlzdGVuZXInIGluIHdpbmRvdykpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIFNFVFVQXG4gIGxldCBjdXJyZW50U2xpZGUgPSAwO1xuICBjb25zdCBjYXJvdXNlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlbGVjdG9ySWQpO1xuICBjb25zdCBzbGlkZXMgPSBxdWVyeUFsbCgnLmVjbC1jYXJvdXNlbF9faXRlbScsIGNhcm91c2VsKTtcbiAgY29uc3QgbGlzdCA9IGNhcm91c2VsLnF1ZXJ5U2VsZWN0b3IoJy5lY2wtY2Fyb3VzZWxfX2xpc3QnKTtcblxuICBmdW5jdGlvbiBnZXRMaXN0SXRlbVdpZHRoKCkge1xuICAgIHJldHVybiBjYXJvdXNlbC5xdWVyeVNlbGVjdG9yKCcuZWNsLWNhcm91c2VsX19pdGVtJykub2Zmc2V0V2lkdGg7XG4gIH1cblxuICBmdW5jdGlvbiBnb1RvU2xpZGUobikge1xuICAgIHNsaWRlc1tjdXJyZW50U2xpZGVdLmNsYXNzTGlzdC5yZW1vdmUoJ2VjbC1jYXJvdXNlbF9faXRlbS0tc2hvd2luZycpO1xuICAgIGN1cnJlbnRTbGlkZSA9IChuICsgc2xpZGVzLmxlbmd0aCkgJSBzbGlkZXMubGVuZ3RoO1xuICAgIHNsaWRlc1tjdXJyZW50U2xpZGVdLmNsYXNzTGlzdC5hZGQoJ2VjbC1jYXJvdXNlbF9faXRlbS0tc2hvd2luZycpO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0T2Zmc2V0KCkge1xuICAgIGNvbnN0IGl0ZW1XaWR0aCA9IGdldExpc3RJdGVtV2lkdGgoKTtcbiAgICBjb25zdCB0ciA9IGB0cmFuc2xhdGUzZCgkey1jdXJyZW50U2xpZGUgKiBpdGVtV2lkdGh9cHgsIDAsIDApYDtcblxuICAgIGxpc3Quc3R5bGUuTW96VHJhbnNmb3JtID0gdHI7IC8qIEZGICovXG4gICAgbGlzdC5zdHlsZS5tc1RyYW5zZm9ybSA9IHRyOyAvKiBJRSAoOSspICovXG4gICAgbGlzdC5zdHlsZS5PVHJhbnNmb3JtID0gdHI7IC8qIE9wZXJhICovXG4gICAgbGlzdC5zdHlsZS5XZWJraXRUcmFuc2Zvcm0gPSB0cjsgLyogU2FmYXJpICsgQ2hyb21lICovXG4gICAgbGlzdC5zdHlsZS50cmFuc2Zvcm0gPSB0cjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFubm91bmNlQ3VycmVudFNsaWRlKCkge1xuICAgIGNhcm91c2VsLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAnLmVjbC1jYXJvdXNlbF9fbWV0YS1zbGlkZSdcbiAgICApLnRleHRDb250ZW50ID0gYCR7Y3VycmVudFNsaWRlICsgMX0gLyAke3NsaWRlcy5sZW5ndGh9YDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3dJbWFnZUluZm9ybWF0aW9uKCkge1xuICAgIC8vIFJlc2V0L0hpZGUgYWxsLlxuICAgIGNvbnN0IGluZm9BcmVhcyA9IHF1ZXJ5QWxsKCdbZGF0YS1pbWFnZV0nKTtcbiAgICAvLyBJZiBhbnl0aGluZyBpcyB2aXNpYmxlLlxuICAgIGlmIChpbmZvQXJlYXMpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgaW5mb0FyZWFzLmZvckVhY2goYXJlYSA9PiAoYXJlYS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnKSk7XG4gICAgfVxuXG4gICAgY2Fyb3VzZWwucXVlcnlTZWxlY3RvcihgW2RhdGEtaW1hZ2U9XCIke2N1cnJlbnRTbGlkZX1cIl1gKS5zdHlsZS5kaXNwbGF5ID1cbiAgICAgICdibG9jayc7XG4gIH1cblxuICBmdW5jdGlvbiBwcmV2aW91c1NsaWRlKCkge1xuICAgIGdvVG9TbGlkZShjdXJyZW50U2xpZGUgLSAxKTtcbiAgICBzZXRPZmZzZXQoKTtcbiAgICBhbm5vdW5jZUN1cnJlbnRTbGlkZSgpO1xuICAgIHNob3dJbWFnZUluZm9ybWF0aW9uKCk7XG4gIH1cblxuICBmdW5jdGlvbiBuZXh0U2xpZGUoKSB7XG4gICAgZ29Ub1NsaWRlKGN1cnJlbnRTbGlkZSArIDEpO1xuICAgIHNldE9mZnNldCgpO1xuICAgIGFubm91bmNlQ3VycmVudFNsaWRlKCk7XG4gICAgc2hvd0ltYWdlSW5mb3JtYXRpb24oKTtcbiAgfVxuXG4gIC8vIEF0dGFjaCBjb250cm9scyB0byBhIGNhcm91c2VsLlxuICBmdW5jdGlvbiBhZGRDYXJvdXNlbENvbnRyb2xzKCkge1xuICAgIGNvbnN0IG5hdkNvbnRyb2xzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcblxuICAgIG5hdkNvbnRyb2xzLmNsYXNzTmFtZSA9ICdlY2wtY2Fyb3VzZWxfX2NvbnRyb2xzIGVjbC1saXN0LS11bnN0eWxlZCc7XG5cbiAgICBuYXZDb250cm9scy5pbm5lckhUTUwgPSBgXG4gICAgICA8bGk+XG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiZWNsLWljb24gZWNsLWljb24tLWxlZnQgZWNsLWNhcm91c2VsX19idXR0b24gZWNsLWNhcm91c2VsX19idXR0b24tLXByZXZpb3VzXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJlY2wtdS1zci1vbmx5XCI+UHJldmlvdXM8L3NwYW4+PC9idXR0b24+XG4gICAgICA8L2xpPlxuICAgICAgPGxpPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImVjbC1pY29uIGVjbC1pY29uLS1yaWdodCBlY2wtY2Fyb3VzZWxfX2J1dHRvbiBlY2wtY2Fyb3VzZWxfX2J1dHRvbi0tbmV4dFwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZWNsLXUtc3Itb25seVwiPk5leHQ8L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9saT5cbiAgICBgO1xuXG4gICAgbmF2Q29udHJvbHNcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAnLmVjbC1jYXJvdXNlbF9fYnV0dG9uLS1wcmV2aW91cycsXG4gICAgICAgICcuZWNsLWNhcm91c2VsX19jb250cm9scydcbiAgICAgIClcbiAgICAgIC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHByZXZpb3VzU2xpZGUpO1xuXG4gICAgbmF2Q29udHJvbHNcbiAgICAgIC5xdWVyeVNlbGVjdG9yKCcuZWNsLWNhcm91c2VsX19idXR0b24tLW5leHQnLCAnLmVjbC1jYXJvdXNlbF9fY29udHJvbHMnKVxuICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbmV4dFNsaWRlKTtcblxuICAgIGNhcm91c2VsXG4gICAgICAucXVlcnlTZWxlY3RvcignLmVjbC1jYXJvdXNlbF9fbGlzdC13cmFwcGVyJylcbiAgICAgIC5hcHBlbmRDaGlsZChuYXZDb250cm9scyk7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVDYXJvdXNlbENvbnRyb2xzKCkge1xuICAgIGNvbnN0IGNvbnRyb2xzID0gY2Fyb3VzZWwucXVlcnlTZWxlY3RvcignLmVjbC1jYXJvdXNlbF9fY29udHJvbHMnKTtcbiAgICBjYXJvdXNlbC5xdWVyeVNlbGVjdG9yKCcuZWNsLWNhcm91c2VsX19saXN0LXdyYXBwZXInKS5yZW1vdmVDaGlsZChjb250cm9scyk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRMaXZlUmVnaW9uKCkge1xuICAgIGNvbnN0IGxpdmVSZWdpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsaXZlUmVnaW9uLnNldEF0dHJpYnV0ZSgnYXJpYS1saXZlJywgJ3BvbGl0ZScpO1xuICAgIGxpdmVSZWdpb24uc2V0QXR0cmlidXRlKCdhcmlhLWF0b21pYycsICd0cnVlJyk7XG4gICAgbGl2ZVJlZ2lvbi5jbGFzc0xpc3QuYWRkKCdlY2wtY2Fyb3VzZWxfX21ldGEtc2xpZGUnKTtcbiAgICBjYXJvdXNlbFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoJy5lY2wtY2Fyb3VzZWxfX2xpdmUtcmVnaW9uJylcbiAgICAgIC5hcHBlbmRDaGlsZChsaXZlUmVnaW9uKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZUxpdmVSZWdpb24oKSB7XG4gICAgY29uc3QgbGl2ZVJlZ2lvbiA9IGNhcm91c2VsLnF1ZXJ5U2VsZWN0b3IoJy5lY2wtY2Fyb3VzZWxfX21ldGEtc2xpZGUnKTtcbiAgICBjYXJvdXNlbFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoJy5lY2wtY2Fyb3VzZWxfX2xpdmUtcmVnaW9uJylcbiAgICAgIC5yZW1vdmVDaGlsZChsaXZlUmVnaW9uKTtcbiAgfVxuXG4gIGNvbnN0IGRlYm91bmNlQ2IgPSAoKSA9PlxuICAgIGRlYm91bmNlKFxuICAgICAgKCkgPT4ge1xuICAgICAgICBzZXRPZmZzZXQoKTtcbiAgICAgIH0sXG4gICAgICAxMDAsXG4gICAgICB7IG1heFdhaXQ6IDMwMCB9XG4gICAgKSgpO1xuXG4gIC8vIElOSVRcbiAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBhZGRDYXJvdXNlbENvbnRyb2xzKCk7XG4gICAgYWRkTGl2ZVJlZ2lvbigpO1xuICAgIGdvVG9TbGlkZSgwKTtcbiAgICBhbm5vdW5jZUN1cnJlbnRTbGlkZSgpO1xuICAgIHNob3dJbWFnZUluZm9ybWF0aW9uKCk7XG5cbiAgICAvLyBSZS1hbGlnbiBvbiByZXNpemUuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGRlYm91bmNlQ2IpO1xuICB9XG5cbiAgLy8gREVTVFJPWVxuICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIHJlbW92ZUNhcm91c2VsQ29udHJvbHMoKTtcbiAgICByZW1vdmVMaXZlUmVnaW9uKCk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGRlYm91bmNlQ2IpO1xuICB9XG5cbiAgaW5pdCgpO1xuXG4gIC8vIFJFVkVBTCBBUElcbiAgcmV0dXJuIHtcbiAgICBpbml0LFxuICAgIGRlc3Ryb3ksXG4gIH07XG59O1xuXG4vLyBtb2R1bGUgZXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgY2Fyb3VzZWxzO1xuIiwiLyoqXG4gKiBDb250ZXh0dWFsIG5hdmlnYXRpb24gc2NyaXB0c1xuICovXG5cbmltcG9ydCB7IHF1ZXJ5QWxsIH0gZnJvbSAnQGVjbC9lYy1iYXNlL2hlbHBlcnMvZG9tJztcblxuY29uc3QgZXhwYW5kQ29udGV4dHVhbE5hdiA9IChcbiAgY29udGV4dHVhbE5hdixcbiAgYnV0dG9uLFxuICB7XG4gICAgY2xhc3NUb1JlbW92ZSA9ICdlY2wtY29udGV4dC1uYXZfX2l0ZW0tLW92ZXItbGltaXQnLFxuICAgIGhpZGRlbkVsZW1lbnRzU2VsZWN0b3IgPSAnLmVjbC1jb250ZXh0LW5hdl9faXRlbS0tb3Zlci1saW1pdCcsXG4gICAgY29udGV4dCA9IGRvY3VtZW50LFxuICB9ID0ge31cbikgPT4ge1xuICBpZiAoIWNvbnRleHR1YWxOYXYpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBoaWRkZW5FbGVtZW50cyA9IHF1ZXJ5QWxsKGhpZGRlbkVsZW1lbnRzU2VsZWN0b3IsIGNvbnRleHQpO1xuXG4gIC8vIFJlbW92ZSBleHRyYSBjbGFzc1xuICBoaWRkZW5FbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc1RvUmVtb3ZlKTtcbiAgfSk7XG5cbiAgLy8gUmVtb3ZlIGJ1dHR0b25cbiAgYnV0dG9uLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYnV0dG9uKTtcbn07XG5cbi8vIEhlbHBlciBtZXRob2QgdG8gYXV0b21hdGljYWxseSBhdHRhY2ggdGhlIGV2ZW50IGxpc3RlbmVyIHRvIGFsbCB0aGUgZXhwYW5kYWJsZXMgb24gcGFnZSBsb2FkXG5leHBvcnQgY29uc3QgY29udGV4dHVhbE5hdnMgPSAoe1xuICBzZWxlY3RvciA9ICcuZWNsLWNvbnRleHQtbmF2JyxcbiAgYnV0dG9uU2VsZWN0b3IgPSAnLmVjbC1jb250ZXh0LW5hdl9fbW9yZScsXG4gIGhpZGRlbkVsZW1lbnRzU2VsZWN0b3IgPSAnLmVjbC1jb250ZXh0LW5hdl9faXRlbS0tb3Zlci1saW1pdCcsXG4gIGNsYXNzVG9SZW1vdmUgPSAnZWNsLWNvbnRleHQtbmF2X19pdGVtLS1vdmVyLWxpbWl0JyxcbiAgY29udGV4dCA9IGRvY3VtZW50LFxufSA9IHt9KSA9PiB7XG4gIGNvbnN0IG5vZGVzQXJyYXkgPSBxdWVyeUFsbChzZWxlY3RvciwgY29udGV4dCk7XG5cbiAgbm9kZXNBcnJheS5mb3JFYWNoKG5vZGUgPT4ge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGNvbnRleHQucXVlcnlTZWxlY3RvcihidXR0b25TZWxlY3Rvcik7XG5cbiAgICBpZiAoYnV0dG9uKSB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PlxuICAgICAgICBleHBhbmRDb250ZXh0dWFsTmF2KG5vZGUsIGJ1dHRvbiwge1xuICAgICAgICAgIGNsYXNzVG9SZW1vdmUsXG4gICAgICAgICAgaGlkZGVuRWxlbWVudHNTZWxlY3RvcixcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbnRleHR1YWxOYXZzO1xuIiwiLyoqXG4gKiBgTm9kZSNjb250YWlucygpYCBwb2x5ZmlsbC5cbiAqXG4gKiBTZWU6IGh0dHA6Ly9jb21wYXRpYmlsaXR5LnNod3Vwcy1jbXMuY2gvZW4vcG9seWZpbGxzLz8maWQ9MVxuICpcbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxuICogQHBhcmFtIHtOb2RlfSBvdGhlclxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBjb250YWlucyhub2RlLCBvdGhlcikge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuICByZXR1cm4gbm9kZSA9PT0gb3RoZXIgfHwgISEobm9kZS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbihvdGhlcikgJiAxNik7XG59XG5cbmV4cG9ydCBjb25zdCBkcm9wZG93biA9IHNlbGVjdG9yID0+IHtcbiAgY29uc3QgZHJvcGRvd25zQXJyYXkgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKVxuICApO1xuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgIGRyb3Bkb3duc0FycmF5LmZvckVhY2goZHJvcGRvd25TZWxlY3Rpb24gPT4ge1xuICAgICAgY29uc3QgaXNJbnNpZGUgPSBjb250YWlucyhkcm9wZG93blNlbGVjdGlvbiwgZXZlbnQudGFyZ2V0KTtcblxuICAgICAgaWYgKCFpc0luc2lkZSkge1xuICAgICAgICBjb25zdCBkcm9wZG93bkJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgYCR7c2VsZWN0b3J9ID4gW2FyaWEtZXhwYW5kZWQ9dHJ1ZV1gXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGRyb3Bkb3duQm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgYCR7c2VsZWN0b3J9ID4gW2FyaWEtaGlkZGVuPWZhbHNlXWBcbiAgICAgICAgKTtcbiAgICAgICAgLy8gSWYgdGhlIGJvZHkgb2YgdGhlIGRyb3Bkb3duIGlzIHZpc2libGUsIHRoZW4gdG9nZ2xlLlxuICAgICAgICBpZiAoZHJvcGRvd25Cb2R5KSB7XG4gICAgICAgICAgZHJvcGRvd25CdXR0b24uc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgZmFsc2UpO1xuICAgICAgICAgIGRyb3Bkb3duQm9keS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBkcm9wZG93bjtcbiIsImltcG9ydCB7IHF1ZXJ5QWxsIH0gZnJvbSAnQGVjbC9nZW5lcmljLWJhc2UvaGVscGVycy9kb20nO1xuXG4vKipcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIE9iamVjdCBjb250YWluaW5nIGNvbmZpZ3VyYXRpb24gb3ZlcnJpZGVzXG4gKlxuICogQXZhaWxhYmxlIG9wdGlvbnM6XG4gKiAtIG9wdGlvbnMudHJpZ2dlckVsZW1lbnRzU2VsZWN0b3IgLSBhbnkgc2VsZWN0b3IgdG8gd2hpY2ggZXZlbnQgbGlzdGVuZXJzXG4gKiBhcmUgYXR0YWNoZWQuIFdoZW4gY2xpY2tlZCBvbiBhbnkgZWxlbWVudCB3aXRoIHN1Y2ggYSBzZWxlY3RvciwgYSBkaWFsb2cgb3BlbnMuXG4gKlxuICogLSBvcHRpb25zLmRpYWxvZ1dpbmRvd0lkIC0gaWQgb2YgdGFyZ2V0IGRpYWxvZyB3aW5kb3cuIERlZmF1bHRzIHRvIGBlY2wtZGlhbG9nYC5cbiAqXG4gKiAtIG9wdGlvbnMuZGlhbG9nT3ZlcmxheUlkIC0gaWQgb2YgdGFyZ2V0IGRpYWxvZyB3aW5kb3cuIERlZmF1bHRzIHRvIGBlY2wtb3ZlcmxheWAuXG4gKiBPdmVybGF5IGVsZW1lbnQgaXMgY3JlYXRlZCBpbiB0aGUgZG9jdW1lbnQgaWYgbm90IHByb3ZpZGVkIGJ5IHRoZSB1c2VyLlxuICovXG5leHBvcnQgY29uc3QgZGlhbG9ncyA9ICh7XG4gIHRyaWdnZXJFbGVtZW50c1NlbGVjdG9yOiB0cmlnZ2VyRWxlbWVudHNTZWxlY3RvciA9ICdbZGF0YS1lY2wtZGlhbG9nXScsXG4gIGRpYWxvZ1dpbmRvd0lkOiBkaWFsb2dXaW5kb3dJZCA9ICdlY2wtZGlhbG9nJyxcbiAgZGlhbG9nT3ZlcmxheUlkOiBkaWFsb2dPdmVybGF5SWQgPSAnZWNsLW92ZXJsYXknLFxufSA9IHt9KSA9PiB7XG4gIC8vIFNVUFBPUlRTXG4gIGlmICghKCdxdWVyeVNlbGVjdG9yJyBpbiBkb2N1bWVudCkgfHwgISgnYWRkRXZlbnRMaXN0ZW5lcicgaW4gd2luZG93KSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gU0VUVVBcbiAgY29uc3QgdHJpZ2dlckVsZW1lbnRzID0gcXVlcnlBbGwodHJpZ2dlckVsZW1lbnRzU2VsZWN0b3IpO1xuICBjb25zdCBkaWFsb2dXaW5kb3cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkaWFsb2dXaW5kb3dJZCk7XG4gIGxldCBkaWFsb2dPdmVybGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZGlhbG9nT3ZlcmxheUlkKTtcblxuICAvLyBDcmVhdGUgYW4gb3ZlcmxheSBlbGVtZW50IGlmIHRoZSB1c2VyIGRvZXMgbm90IHN1cHBseSBvbmUuXG4gIGlmICghZGlhbG9nT3ZlcmxheSkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCAnZWNsLW92ZXJsYXknKTtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZWNsLWRpYWxvZ19fb3ZlcmxheScpO1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICBkaWFsb2dPdmVybGF5ID0gZWxlbWVudDtcbiAgfVxuXG4gIC8vIFdoYXQgd2UgY2FuIGZvY3VzIG9uIGluIHRoZSBtb2RhbC5cbiAgY29uc3QgZm9jdXNhYmxlRWxlbWVudHMgPSBbXS5zbGljZS5jYWxsKFxuICAgIHF1ZXJ5QWxsKFxuICAgICAgYFxuICAgICAgICBhW2hyZWZdLFxuICAgICAgICBhcmVhW2hyZWZdLFxuICAgICAgICBpbnB1dDpub3QoW2Rpc2FibGVkXSksXG4gICAgICAgIHNlbGVjdDpub3QoW2Rpc2FibGVkXSksXG4gICAgICAgIHRleHRhcmVhOm5vdChbZGlzYWJsZWRdKSxcbiAgICAgICAgYnV0dG9uOm5vdChbZGlzYWJsZWRdKSxcbiAgICAgICAgW3RhYmluZGV4PVwiMFwiXVxuICAgICAgYCxcbiAgICAgIGRpYWxvZ1dpbmRvd1xuICAgIClcbiAgKTtcblxuICAvLyBVc2UgdGhpcyB2YXJpYWJsZSB0byByZXR1cm4gZm9jdXMgb24gZWxlbWVudCBhZnRlciBkaWFsb2cgYmVpbmcgY2xvc2VkLlxuICBsZXQgZm9jdXNlZEVsQmVmb3JlT3BlbiA9IG51bGw7XG5cbiAgLy8gU3BlY2lmaWMgZWxlbWVudHMgdG8gdGFrZSBjYXJlIHdoZW4gb3Blbm5pbmcgYW5kIGNsb3NpbmcgdGhlIGRpYWxvZy5cbiAgY29uc3QgZmlyc3RGb2N1c2FibGVFbGVtZW50ID0gZm9jdXNhYmxlRWxlbWVudHNbMF07XG4gIGNvbnN0IGxhc3RGb2N1c2FibGVFbGVtZW50ID0gZm9jdXNhYmxlRWxlbWVudHNbZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoIC0gMV07XG5cbiAgLy8gRVZFTlRTXG4gIC8vIEhpZGUgZGlhbG9nIGFuZCBvdmVybGF5IGVsZW1lbnRzLlxuICBmdW5jdGlvbiBjbG9zZShldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZGlhbG9nV2luZG93LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCB0cnVlKTtcbiAgICBkaWFsb2dPdmVybGF5LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCB0cnVlKTtcblxuICAgIGlmIChmb2N1c2VkRWxCZWZvcmVPcGVuKSB7XG4gICAgICBmb2N1c2VkRWxCZWZvcmVPcGVuLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmNsYXNzTGlzdC5yZW1vdmUoJ2VjbC11LWRpc2FibGVzY3JvbGwnKTtcbiAgfVxuXG4gIC8vIEtleWJvYXJkIGJlaGF2aW9ycy5cbiAgZnVuY3Rpb24gaGFuZGxlS2V5RG93bihlKSB7XG4gICAgY29uc3QgS0VZX1RBQiA9IDk7XG4gICAgY29uc3QgS0VZX0VTQyA9IDI3O1xuXG4gICAgZnVuY3Rpb24gaGFuZGxlQmFja3dhcmRUYWIoKSB7XG4gICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gZmlyc3RGb2N1c2FibGVFbGVtZW50KSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGFzdEZvY3VzYWJsZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVGb3J3YXJkVGFiKCkge1xuICAgICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGxhc3RGb2N1c2FibGVFbGVtZW50KSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZmlyc3RGb2N1c2FibGVFbGVtZW50LmZvY3VzKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgIC8vIEtlZXAgdGFiYmluZyBpbiB0aGUgc2NvcGUgb2YgdGhlIGRpYWxvZy5cbiAgICAgIGNhc2UgS0VZX1RBQjpcbiAgICAgICAgaWYgKGZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAoZS5zaGlmdEtleSkge1xuICAgICAgICAgIGhhbmRsZUJhY2t3YXJkVGFiKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaGFuZGxlRm9yd2FyZFRhYigpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBLRVlfRVNDOlxuICAgICAgICBjbG9zZSgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8vIFNob3cgZGlhbG9nIGFuZCBvdmVybGF5IGVsZW1lbnRzLlxuICBmdW5jdGlvbiBvcGVuKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBkaWFsb2dXaW5kb3cuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIGZhbHNlKTtcbiAgICBkaWFsb2dPdmVybGF5LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCBmYWxzZSk7XG5cbiAgICAvLyBUaGlzIGlzIHRoZSBlbGVtZW50IHRvIGhhdmUgdGhlIGZvY3VzIGFmdGVyIGNsb3NpbmcgdGhlIGRpYWxvZy5cbiAgICAvLyBVc3VhbGx5IHRoZSBlbGVtZW50IHdoaWNoIHRyaWdnZXJlZCB0aGUgZGlhbG9nLlxuICAgIGZvY3VzZWRFbEJlZm9yZU9wZW4gPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuXG4gICAgLy8gRm9jdXMgb24gdGhlIGZpcnN0IGVsZW1lbnQgaW4gdGhlIGRpYWxvZy5cbiAgICBmaXJzdEZvY3VzYWJsZUVsZW1lbnQuZm9jdXMoKTtcblxuICAgIC8vIENsb3NlIGRpYWxvZyB3aGVuIGNsaWNrZWQgb3V0IG9mIHRoZSBkaWFsb2cgd2luZG93LlxuICAgIGRpYWxvZ092ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZSk7XG5cbiAgICAvLyBIYW5kbGUgdGFiYmluZywgZXNjIGFuZCBrZXlib2FyZCBpbiB0aGUgZGlhbG9nIHdpbmRvdy5cbiAgICBkaWFsb2dXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGhhbmRsZUtleURvd24pO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmNsYXNzTGlzdC5hZGQoJ2VjbC11LWRpc2FibGVzY3JvbGwnKTtcbiAgfVxuXG4gIC8vIEJJTkQgRVZFTlRTXG4gIGZ1bmN0aW9uIGJpbmREaWFsb2dFdmVudHMoZWxlbWVudHMpIHtcbiAgICBlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4gZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW4pKTtcblxuICAgIC8vIGNvbnN0IGNsb3NlQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5lY2wtZGlhbG9nX19kaXNtaXNzJyk7XG4gICAgcXVlcnlBbGwoJy5lY2wtZGlhbG9nX19kaXNtaXNzJykuZm9yRWFjaChidXR0b24gPT4ge1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2UpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gVU5CSU5EIEVWRU5UU1xuICBmdW5jdGlvbiB1bmJpbmREaWFsb2dFdmVudHMoZWxlbWVudHMpIHtcbiAgICBlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4gZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW4pKTtcblxuICAgIC8vIGNvbnN0IGNsb3NlQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5lY2wtZGlhbG9nX19kaXNtaXNzJyk7XG4gICAgcXVlcnlBbGwoJy5lY2wtZGlhbG9nX19kaXNtaXNzJykuZm9yRWFjaChidXR0b24gPT4ge1xuICAgICAgYnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2UpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gREVTVFJPWVxuICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIHVuYmluZERpYWxvZ0V2ZW50cyh0cmlnZ2VyRWxlbWVudHMpO1xuICB9XG5cbiAgLy8gSU5JVFxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIGlmICh0cmlnZ2VyRWxlbWVudHMubGVuZ3RoKSB7XG4gICAgICBiaW5kRGlhbG9nRXZlbnRzKHRyaWdnZXJFbGVtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgaW5pdCgpO1xuXG4gIC8vIFJFVkVBTCBBUElcbiAgcmV0dXJuIHtcbiAgICBpbml0LFxuICAgIGRlc3Ryb3ksXG4gIH07XG59O1xuXG4vLyBtb2R1bGUgZXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgZGlhbG9ncztcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG5cbmV4cG9ydCBjb25zdCB0b2dnbGVFeHBhbmRhYmxlID0gKFxuICB0b2dnbGVFbGVtZW50LFxuICB7XG4gICAgY29udGV4dCA9IGRvY3VtZW50LFxuICAgIGZvcmNlQ2xvc2UgPSBmYWxzZSxcbiAgICBjbG9zZVNpYmxpbmdzID0gZmFsc2UsXG4gICAgc2libGluZ3NTZWxlY3RvciA9ICdbYXJpYS1jb250cm9sc11bYXJpYS1leHBhbmRlZF0nLFxuICB9ID0ge31cbikgPT4ge1xuICBpZiAoIXRvZ2dsZUVsZW1lbnQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBHZXQgdGFyZ2V0IGVsZW1lbnRcbiAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgdG9nZ2xlRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKVxuICApO1xuXG4gIC8vIEV4aXQgaWYgbm8gdGFyZ2V0IGZvdW5kXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gR2V0IGN1cnJlbnQgc3RhdHVzXG4gIGNvbnN0IGlzRXhwYW5kZWQgPVxuICAgIGZvcmNlQ2xvc2UgPT09IHRydWUgfHxcbiAgICB0b2dnbGVFbGVtZW50LmdldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcpID09PSAndHJ1ZSc7XG5cbiAgLy8gVG9nZ2xlIHRoZSBleHBhbmRhYmxlL2NvbGxhcHNpYmxlXG4gIHRvZ2dsZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgIWlzRXhwYW5kZWQpO1xuICB0YXJnZXQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIGlzRXhwYW5kZWQpO1xuXG4gIC8vIFRvZ2dsZSBsYWJlbCBpZiBwb3NzaWJsZVxuICBpZiAoIWlzRXhwYW5kZWQgJiYgdG9nZ2xlRWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2RhdGEtbGFiZWwtZXhwYW5kZWQnKSkge1xuICAgIHRvZ2dsZUVsZW1lbnQuaW5uZXJIVE1MID0gdG9nZ2xlRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGFiZWwtZXhwYW5kZWQnKTtcbiAgfSBlbHNlIGlmIChpc0V4cGFuZGVkICYmIHRvZ2dsZUVsZW1lbnQuaGFzQXR0cmlidXRlKCdkYXRhLWxhYmVsLWNvbGxhcHNlZCcpKSB7XG4gICAgdG9nZ2xlRWxlbWVudC5pbm5lckhUTUwgPSB0b2dnbGVFbGVtZW50LmdldEF0dHJpYnV0ZShcbiAgICAgICdkYXRhLWxhYmVsLWNvbGxhcHNlZCdcbiAgICApO1xuICB9XG5cbiAgLy8gQ2xvc2Ugc2libGluZ3MgaWYgcmVxdWVzdGVkXG4gIGlmIChjbG9zZVNpYmxpbmdzID09PSB0cnVlKSB7XG4gICAgY29uc3Qgc2libGluZ3NBcnJheSA9IEFycmF5LnByb3RvdHlwZS5zbGljZVxuICAgICAgLmNhbGwoY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKHNpYmxpbmdzU2VsZWN0b3IpKVxuICAgICAgLmZpbHRlcihzaWJsaW5nID0+IHNpYmxpbmcgIT09IHRvZ2dsZUVsZW1lbnQpO1xuXG4gICAgc2libGluZ3NBcnJheS5mb3JFYWNoKHNpYmxpbmcgPT4ge1xuICAgICAgdG9nZ2xlRXhwYW5kYWJsZShzaWJsaW5nLCB7XG4gICAgICAgIGNvbnRleHQsXG4gICAgICAgIGZvcmNlQ2xvc2U6IHRydWUsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufTtcblxuLy8gSGVscGVyIG1ldGhvZCB0byBhdXRvbWF0aWNhbGx5IGF0dGFjaCB0aGUgZXZlbnQgbGlzdGVuZXIgdG8gYWxsIHRoZSBleHBhbmRhYmxlcyBvbiBwYWdlIGxvYWRcbmV4cG9ydCBjb25zdCBpbml0RXhwYW5kYWJsZXMgPSAoc2VsZWN0b3IsIGNvbnRleHQgPSBkb2N1bWVudCkgPT4ge1xuICAvLyBFeGl0IGlmIG5vIHNlbGVjdG9yIHdhcyBwcm92aWRlZFxuICBpZiAoIXNlbGVjdG9yKSByZXR1cm47XG5cbiAgY29uc3Qgbm9kZXNBcnJheSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKFxuICAgIGNvbnRleHQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcilcbiAgKTtcblxuICBub2Rlc0FycmF5LmZvckVhY2gobm9kZSA9PlxuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgIHRvZ2dsZUV4cGFuZGFibGUobm9kZSwgeyBjb250ZXh0IH0pO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pXG4gICk7XG59O1xuIiwiLyoqXG4gKiBGaWxlIHVwbG9hZHMgcmVsYXRlZCBiZWhhdmlvcnMuXG4gKi9cblxuaW1wb3J0IHsgcXVlcnlBbGwgfSBmcm9tICdAZWNsL2VjLWJhc2UvaGVscGVycy9kb20nO1xuXG4vKipcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIE9iamVjdCBjb250YWluaW5nIGNvbmZpZ3VyYXRpb24gb3ZlcnJpZGVzXG4gKi9cbmV4cG9ydCBjb25zdCBmaWxlVXBsb2FkcyA9ICh7XG4gIHNlbGVjdG9yOiBzZWxlY3RvciA9ICcuZWNsLWZpbGUtdXBsb2FkJyxcbiAgaW5wdXRTZWxlY3RvcjogaW5wdXRTZWxlY3RvciA9ICcuZWNsLWZpbGUtdXBsb2FkX19pbnB1dCcsXG4gIHZhbHVlU2VsZWN0b3I6IHZhbHVlU2VsZWN0b3IgPSAnLmVjbC1maWxlLXVwbG9hZF9fdmFsdWUnLFxuICBicm93c2VTZWxlY3RvcjogYnJvd3NlU2VsZWN0b3IgPSAnLmVjbC1maWxlLXVwbG9hZF9fYnJvd3NlJyxcbn0gPSB7fSkgPT4ge1xuICAvLyBTVVBQT1JUU1xuICBpZiAoXG4gICAgISgncXVlcnlTZWxlY3RvcicgaW4gZG9jdW1lbnQpIHx8XG4gICAgISgnYWRkRXZlbnRMaXN0ZW5lcicgaW4gd2luZG93KSB8fFxuICAgICFkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0XG4gIClcbiAgICByZXR1cm4gbnVsbDtcblxuICAvLyBTRVRVUFxuICAvLyBzZXQgZmlsZSB1cGxvYWQgZWxlbWVudCBOb2RlTGlzdHNcbiAgY29uc3QgZmlsZVVwbG9hZENvbnRhaW5lcnMgPSBxdWVyeUFsbChzZWxlY3Rvcik7XG5cbiAgLy8gQUNUSU9OU1xuICBmdW5jdGlvbiB1cGRhdGVGaWxlTmFtZShlbGVtZW50LCBmaWxlcykge1xuICAgIGlmIChmaWxlcy5sZW5ndGggPT09IDApIHJldHVybjtcblxuICAgIGxldCBmaWxlbmFtZSA9ICcnO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgZmlsZSA9IGZpbGVzW2ldO1xuICAgICAgaWYgKCduYW1lJyBpbiBmaWxlKSB7XG4gICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgIGZpbGVuYW1lICs9ICcsICc7XG4gICAgICAgIH1cbiAgICAgICAgZmlsZW5hbWUgKz0gZmlsZS5uYW1lO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNob3cgdGhlIHNlbGVjdGVkIGZpbGVuYW1lIGluIHRoZSBmaWVsZC5cbiAgICBjb25zdCBtZXNzYWdlRWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgbWVzc2FnZUVsZW1lbnQuaW5uZXJIVE1MID0gZmlsZW5hbWU7XG4gIH1cblxuICAvLyBFVkVOVFNcbiAgZnVuY3Rpb24gZXZlbnRWYWx1ZUNoYW5nZShlKSB7XG4gICAgaWYgKCdmaWxlcycgaW4gZS50YXJnZXQpIHtcbiAgICAgIGNvbnN0IGZpbGVVcGxvYWRFbGVtZW50cyA9IHF1ZXJ5QWxsKHZhbHVlU2VsZWN0b3IsIGUudGFyZ2V0LnBhcmVudE5vZGUpO1xuXG4gICAgICBmaWxlVXBsb2FkRWxlbWVudHMuZm9yRWFjaChmaWxlVXBsb2FkRWxlbWVudCA9PiB7XG4gICAgICAgIHVwZGF0ZUZpbGVOYW1lKGZpbGVVcGxvYWRFbGVtZW50LCBlLnRhcmdldC5maWxlcyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBldmVudEJyb3dzZUtleWRvd24oZSkge1xuICAgIC8vIGNvbGxlY3QgaGVhZGVyIHRhcmdldHMsIGFuZCB0aGVpciBwcmV2L25leHRcbiAgICBjb25zdCBpc01vZGlmaWVyS2V5ID0gZS5tZXRhS2V5IHx8IGUuYWx0S2V5O1xuXG4gICAgY29uc3QgaW5wdXRFbGVtZW50cyA9IHF1ZXJ5QWxsKGlucHV0U2VsZWN0b3IsIGUudGFyZ2V0LnBhcmVudE5vZGUpO1xuXG4gICAgaW5wdXRFbGVtZW50cy5mb3JFYWNoKGlucHV0RWxlbWVudCA9PiB7XG4gICAgICAvLyBkb24ndCBjYXRjaCBrZXkgZXZlbnRzIHdoZW4g4oyYIG9yIEFsdCBtb2RpZmllciBpcyBwcmVzZW50XG4gICAgICBpZiAoaXNNb2RpZmllcktleSkgcmV0dXJuO1xuXG4gICAgICAvLyBjYXRjaCBlbnRlci9zcGFjZSwgbGVmdC9yaWdodCBhbmQgdXAvZG93biBhcnJvdyBrZXkgZXZlbnRzXG4gICAgICAvLyBpZiBuZXcgcGFuZWwgc2hvdyBpdCwgaWYgbmV4dC9wcmV2IG1vdmUgZm9jdXNcbiAgICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgMTM6XG4gICAgICAgIGNhc2UgMzI6XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGlucHV0RWxlbWVudC5jbGljaygpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gQklORCBFVkVOVFNcbiAgZnVuY3Rpb24gYmluZEZpbGVVcGxvYWRFdmVudHMoZmlsZVVwbG9hZENvbnRhaW5lcikge1xuICAgIC8vIGJpbmQgYWxsIGZpbGUgdXBsb2FkIGNoYW5nZSBldmVudHNcbiAgICBjb25zdCBmaWxlVXBsb2FkSW5wdXRzID0gcXVlcnlBbGwoaW5wdXRTZWxlY3RvciwgZmlsZVVwbG9hZENvbnRhaW5lcik7XG4gICAgZmlsZVVwbG9hZElucHV0cy5mb3JFYWNoKGZpbGVVcGxvYWRJbnB1dCA9PiB7XG4gICAgICBmaWxlVXBsb2FkSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZXZlbnRWYWx1ZUNoYW5nZSk7XG4gICAgfSk7XG5cbiAgICAvLyBiaW5kIGFsbCBmaWxlIHVwbG9hZCBrZXlkb3duIGV2ZW50c1xuICAgIGNvbnN0IGZpbGVVcGxvYWRCcm93c2VzID0gcXVlcnlBbGwoYnJvd3NlU2VsZWN0b3IsIGZpbGVVcGxvYWRDb250YWluZXIpO1xuICAgIGZpbGVVcGxvYWRCcm93c2VzLmZvckVhY2goZmlsZVVwbG9hZEJyb3dzZSA9PiB7XG4gICAgICBmaWxlVXBsb2FkQnJvd3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBldmVudEJyb3dzZUtleWRvd24pO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gVU5CSU5EIEVWRU5UU1xuICBmdW5jdGlvbiB1bmJpbmRGaWxlVXBsb2FkRXZlbnRzKGZpbGVVcGxvYWRDb250YWluZXIpIHtcbiAgICBjb25zdCBmaWxlVXBsb2FkSW5wdXRzID0gcXVlcnlBbGwoaW5wdXRTZWxlY3RvciwgZmlsZVVwbG9hZENvbnRhaW5lcik7XG4gICAgLy8gdW5iaW5kIGFsbCBmaWxlIHVwbG9hZCBjaGFuZ2UgZXZlbnRzXG4gICAgZmlsZVVwbG9hZElucHV0cy5mb3JFYWNoKGZpbGVVcGxvYWRJbnB1dCA9PiB7XG4gICAgICBmaWxlVXBsb2FkSW5wdXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZXZlbnRWYWx1ZUNoYW5nZSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBmaWxlVXBsb2FkQnJvd3NlcyA9IHF1ZXJ5QWxsKGJyb3dzZVNlbGVjdG9yLCBmaWxlVXBsb2FkQ29udGFpbmVyKTtcbiAgICAvLyBiaW5kIGFsbCBmaWxlIHVwbG9hZCBrZXlkb3duIGV2ZW50c1xuICAgIGZpbGVVcGxvYWRCcm93c2VzLmZvckVhY2goZmlsZVVwbG9hZEJyb3dzZSA9PiB7XG4gICAgICBmaWxlVXBsb2FkQnJvd3NlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBldmVudEJyb3dzZUtleWRvd24pO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gREVTVFJPWVxuICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIGZpbGVVcGxvYWRDb250YWluZXJzLmZvckVhY2goZmlsZVVwbG9hZENvbnRhaW5lciA9PiB7XG4gICAgICB1bmJpbmRGaWxlVXBsb2FkRXZlbnRzKGZpbGVVcGxvYWRDb250YWluZXIpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gSU5JVFxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIGlmIChmaWxlVXBsb2FkQ29udGFpbmVycy5sZW5ndGgpIHtcbiAgICAgIGZpbGVVcGxvYWRDb250YWluZXJzLmZvckVhY2goZmlsZVVwbG9hZENvbnRhaW5lciA9PiB7XG4gICAgICAgIGJpbmRGaWxlVXBsb2FkRXZlbnRzKGZpbGVVcGxvYWRDb250YWluZXIpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaW5pdCgpO1xuXG4gIC8vIFJFVkVBTCBBUElcbiAgcmV0dXJuIHtcbiAgICBpbml0LFxuICAgIGRlc3Ryb3ksXG4gIH07XG59O1xuXG4vLyBtb2R1bGUgZXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgZmlsZVVwbG9hZHM7XG4iLCJpbXBvcnQgZGVib3VuY2UgZnJvbSAnbG9kYXNoLmRlYm91bmNlJztcbmltcG9ydCB7IHF1ZXJ5QWxsIH0gZnJvbSAnQGVjbC9lYy1iYXNlL2hlbHBlcnMvZG9tJztcblxuZXhwb3J0IGNvbnN0IGVjbExhbmdTZWxlY3RQYWdlcyA9ICh7XG4gIHNlbGVjdG9yOiBzZWxlY3RvciA9ICcuZWNsLWxhbmctc2VsZWN0LXBhZ2UnLFxuICB0b2dnbGVDbGFzczogdG9nZ2xlQ2xhc3MgPSAnZWNsLWxhbmctc2VsZWN0LXBhZ2UtLWRyb3Bkb3duJyxcbiAgbGlzdFNlbGVjdG9yOiBsaXN0U2VsZWN0b3IgPSAnLmVjbC1sYW5nLXNlbGVjdC1wYWdlX19saXN0JyxcbiAgZHJvcGRvd25TZWxlY3RvcjogZHJvcGRvd25TZWxlY3RvciA9ICcuZWNsLWxhbmctc2VsZWN0LXBhZ2VfX2Ryb3Bkb3duJyxcbiAgZHJvcGRvd25PbkNoYW5nZTogZHJvcGRvd25PbkNoYW5nZSA9IHVuZGVmaW5lZCxcbn0gPSB7fSkgPT4ge1xuICAvLyBTVVBQT1JUU1xuICBpZiAoXG4gICAgISgncXVlcnlTZWxlY3RvcicgaW4gZG9jdW1lbnQpIHx8XG4gICAgISgnYWRkRXZlbnRMaXN0ZW5lcicgaW4gd2luZG93KSB8fFxuICAgICFkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0XG4gIClcbiAgICByZXR1cm4gbnVsbDtcblxuICBjb25zdCBsYW5nU2VsZWN0UGFnZXNDb250YWluZXJzID0gcXVlcnlBbGwoc2VsZWN0b3IpO1xuXG4gIGZ1bmN0aW9uIHRvZ2dsZShsc3ApIHtcbiAgICBpZiAoIWxzcCkgcmV0dXJuIG51bGw7XG5cbiAgICBjb25zdCBsaXN0ID0gcXVlcnlBbGwobGlzdFNlbGVjdG9yLCBsc3ApWzBdO1xuXG4gICAgaWYgKCFsc3AuY2xhc3NMaXN0LmNvbnRhaW5zKHRvZ2dsZUNsYXNzKSkge1xuICAgICAgaWYgKGxpc3QgJiYgbGlzdC5vZmZzZXRMZWZ0ICsgbGlzdC5vZmZzZXRXaWR0aCA+IGxzcC5vZmZzZXRXaWR0aCkge1xuICAgICAgICBsc3AuY2xhc3NMaXN0LmFkZCh0b2dnbGVDbGFzcyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRyb3Bkb3duID0gcXVlcnlBbGwoZHJvcGRvd25TZWxlY3RvciwgbHNwKVswXTtcbiAgICAgIGlmIChkcm9wZG93bi5vZmZzZXRMZWZ0ICsgbGlzdC5vZmZzZXRXaWR0aCA8IGxzcC5vZmZzZXRXaWR0aCkge1xuICAgICAgICBsc3AuY2xhc3NMaXN0LnJlbW92ZSh0b2dnbGVDbGFzcyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIC8vIE9uIGxvYWRcbiAgICBsYW5nU2VsZWN0UGFnZXNDb250YWluZXJzLmZvckVhY2gobHNwID0+IHtcbiAgICAgIHRvZ2dsZShsc3ApO1xuXG4gICAgICBpZiAoZHJvcGRvd25PbkNoYW5nZSkge1xuICAgICAgICBjb25zdCBkcm9wZG93biA9IHF1ZXJ5QWxsKGRyb3Bkb3duU2VsZWN0b3IsIGxzcClbMF07XG5cbiAgICAgICAgaWYgKGRyb3Bkb3duKSB7XG4gICAgICAgICAgZHJvcGRvd24uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZHJvcGRvd25PbkNoYW5nZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgJ3Jlc2l6ZScsXG4gICAgICBkZWJvdW5jZShcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIGxhbmdTZWxlY3RQYWdlc0NvbnRhaW5lcnMuZm9yRWFjaCh0b2dnbGUpO1xuICAgICAgICB9LFxuICAgICAgICAxMDAsXG4gICAgICAgIHsgbWF4V2FpdDogMzAwIH1cbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIGluaXQoKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGVjbExhbmdTZWxlY3RQYWdlcztcbiIsIi8qXG4gKiBNZXNzYWdlcyBiZWhhdmlvclxuICovXG5cbi8vIERpc21pc3MgYSBzZWxlY3RlZCBtZXNzYWdlLlxuZnVuY3Rpb24gZGlzbWlzc01lc3NhZ2UobWVzc2FnZSkge1xuICBpZiAobWVzc2FnZSAmJiBtZXNzYWdlLnBhcmVudE5vZGUgIT09IG51bGwpIHtcbiAgICBtZXNzYWdlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobWVzc2FnZSk7XG4gIH1cbn1cblxuLy8gSGVscGVyIG1ldGhvZCB0byBhdXRvbWF0aWNhbGx5IGF0dGFjaCB0aGUgZXZlbnQgbGlzdGVuZXIgdG8gYWxsIHRoZSBtZXNzYWdlcyBvbiBwYWdlIGxvYWRcbmV4cG9ydCBmdW5jdGlvbiBpbml0TWVzc2FnZXMoKSB7XG4gIGNvbnN0IHNlbGVjdG9yQ2xhc3MgPSAnZWNsLW1lc3NhZ2VfX2Rpc21pc3MnO1xuXG4gIGNvbnN0IG1lc3NhZ2VzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShzZWxlY3RvckNsYXNzKVxuICApO1xuXG4gIG1lc3NhZ2VzLmZvckVhY2gobWVzc2FnZSA9PlxuICAgIG1lc3NhZ2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PlxuICAgICAgZGlzbWlzc01lc3NhZ2UobWVzc2FnZS5wYXJlbnRFbGVtZW50KVxuICAgIClcbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdE1lc3NhZ2VzO1xuIiwiLypcbiAqIE1lc3NhZ2VzIGJlaGF2aW9yXG4gKi9cblxuZXhwb3J0ICogZnJvbSAnQGVjbC9nZW5lcmljLWNvbXBvbmVudC1tZXNzYWdlJztcbiIsIi8qIVxyXG4gICogU3RpY2t5ZmlsbCDigJMgYHBvc2l0aW9uOiBzdGlja3lgIHBvbHlmaWxsXHJcbiAgKiB2LiAyLjAuNSB8IGh0dHBzOi8vZ2l0aHViLmNvbS93aWxkZGVlci9zdGlja3lmaWxsXHJcbiAgKiBNSVQgTGljZW5zZVxyXG4gICovXHJcblxyXG47KGZ1bmN0aW9uKHdpbmRvdywgZG9jdW1lbnQpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIFxyXG4gICAgLypcclxuICAgICAqIDEuIENoZWNrIGlmIHRoZSBicm93c2VyIHN1cHBvcnRzIGBwb3NpdGlvbjogc3RpY2t5YCBuYXRpdmVseSBvciBpcyB0b28gb2xkIHRvIHJ1biB0aGUgcG9seWZpbGwuXHJcbiAgICAgKiAgICBJZiBlaXRoZXIgb2YgdGhlc2UgaXMgdGhlIGNhc2Ugc2V0IGBzZXBwdWt1YCBmbGFnLiBJdCB3aWxsIGJlIGNoZWNrZWQgbGF0ZXIgdG8gZGlzYWJsZSBrZXkgZmVhdHVyZXNcclxuICAgICAqICAgIG9mIHRoZSBwb2x5ZmlsbCwgYnV0IHRoZSBBUEkgd2lsbCByZW1haW4gZnVuY3Rpb25hbCB0byBhdm9pZCBicmVha2luZyB0aGluZ3MuXHJcbiAgICAgKi9cclxuICAgIFxyXG4gICAgdmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcclxuICAgIFxyXG4gICAgZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cclxuICAgIFxyXG4gICAgdmFyIHNlcHB1a3UgPSBmYWxzZTtcclxuICAgIFxyXG4gICAgLy8gVGhlIHBvbHlmaWxsIGNhbnTigJl0IGZ1bmN0aW9uIHByb3Blcmx5IHdpdGhvdXQgYGdldENvbXB1dGVkU3R5bGVgLlxyXG4gICAgaWYgKCF3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSkgc2VwcHVrdSA9IHRydWU7XHJcbiAgICAvLyBEb2504oCZdCBnZXQgaW4gYSB3YXkgaWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgYHBvc2l0aW9uOiBzdGlja3lgIG5hdGl2ZWx5LlxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciB0ZXN0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGlmIChbJycsICctd2Via2l0LScsICctbW96LScsICctbXMtJ10uc29tZShmdW5jdGlvbiAocHJlZml4KSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlc3ROb2RlLnN0eWxlLnBvc2l0aW9uID0gcHJlZml4ICsgJ3N0aWNreSc7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7fVxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGVzdE5vZGUuc3R5bGUucG9zaXRpb24gIT0gJyc7XHJcbiAgICAgICAgICAgIH0pKSBzZXBwdWt1ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgIC8qXHJcbiAgICAgKiAyLiDigJxHbG9iYWzigJ0gdmFycyB1c2VkIGFjcm9zcyB0aGUgcG9seWZpbGxcclxuICAgICAqL1xyXG4gICAgXHJcbiAgICAvLyBDaGVjayBpZiBTaGFkb3cgUm9vdCBjb25zdHJ1Y3RvciBleGlzdHMgdG8gbWFrZSBmdXJ0aGVyIGNoZWNrcyBzaW1wbGVyXHJcbiAgICB2YXIgc2hhZG93Um9vdEV4aXN0cyA9IHR5cGVvZiBTaGFkb3dSb290ICE9PSAndW5kZWZpbmVkJztcclxuICAgIFxyXG4gICAgLy8gTGFzdCBzYXZlZCBzY3JvbGwgcG9zaXRpb25cclxuICAgIHZhciBzY3JvbGwgPSB7XHJcbiAgICAgICAgdG9wOiBudWxsLFxyXG4gICAgICAgIGxlZnQ6IG51bGxcclxuICAgIH07XHJcbiAgICBcclxuICAgIC8vIEFycmF5IG9mIGNyZWF0ZWQgU3RpY2t5IGluc3RhbmNlc1xyXG4gICAgdmFyIHN0aWNraWVzID0gW107XHJcbiAgICBcclxuICAgIC8qXHJcbiAgICAgKiAzLiBVdGlsaXR5IGZ1bmN0aW9uc1xyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBleHRlbmQodGFyZ2V0T2JqLCBzb3VyY2VPYmplY3QpIHtcclxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlT2JqZWN0KSB7XHJcbiAgICAgICAgICAgIGlmIChzb3VyY2VPYmplY3QuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0T2JqW2tleV0gPSBzb3VyY2VPYmplY3Rba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgZnVuY3Rpb24gcGFyc2VOdW1lcmljKHZhbCkge1xyXG4gICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHZhbCkgfHwgMDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZnVuY3Rpb24gZ2V0RG9jT2Zmc2V0VG9wKG5vZGUpIHtcclxuICAgICAgICB2YXIgZG9jT2Zmc2V0VG9wID0gMDtcclxuICAgIFxyXG4gICAgICAgIHdoaWxlIChub2RlKSB7XHJcbiAgICAgICAgICAgIGRvY09mZnNldFRvcCArPSBub2RlLm9mZnNldFRvcDtcclxuICAgICAgICAgICAgbm9kZSA9IG5vZGUub2Zmc2V0UGFyZW50O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIHJldHVybiBkb2NPZmZzZXRUb3A7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qXHJcbiAgICAgKiA0LiBTdGlja3kgY2xhc3NcclxuICAgICAqL1xyXG4gICAgXHJcbiAgICB2YXIgU3RpY2t5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIFN0aWNreShub2RlKSB7XHJcbiAgICAgICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTdGlja3kpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGlmICghKG5vZGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHRocm93IG5ldyBFcnJvcignRmlyc3QgYXJndW1lbnQgbXVzdCBiZSBIVE1MRWxlbWVudCcpO1xyXG4gICAgICAgICAgICBpZiAoc3RpY2tpZXMuc29tZShmdW5jdGlvbiAoc3RpY2t5KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RpY2t5Ll9ub2RlID09PSBub2RlO1xyXG4gICAgICAgICAgICB9KSkgdGhyb3cgbmV3IEVycm9yKCdTdGlja3lmaWxsIGlzIGFscmVhZHkgYXBwbGllZCB0byB0aGlzIG5vZGUnKTtcclxuICAgIFxyXG4gICAgICAgICAgICB0aGlzLl9ub2RlID0gbm9kZTtcclxuICAgICAgICAgICAgdGhpcy5fc3RpY2t5TW9kZSA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgXHJcbiAgICAgICAgICAgIHN0aWNraWVzLnB1c2godGhpcyk7XHJcbiAgICBcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgX2NyZWF0ZUNsYXNzKFN0aWNreSwgW3tcclxuICAgICAgICAgICAga2V5OiAncmVmcmVzaCcsXHJcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZWZyZXNoKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlcHB1a3UgfHwgdGhpcy5fcmVtb3ZlZCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2FjdGl2ZSkgdGhpcy5fZGVhY3RpdmF0ZSgpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IHRoaXMuX25vZGU7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAgICAgKiAxLiBTYXZlIG5vZGUgY29tcHV0ZWQgcHJvcHNcclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgdmFyIG5vZGVDb21wdXRlZFN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcclxuICAgICAgICAgICAgICAgIHZhciBub2RlQ29tcHV0ZWRQcm9wcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICB0b3A6IG5vZGVDb21wdXRlZFN0eWxlLnRvcCxcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBub2RlQ29tcHV0ZWRTdHlsZS5kaXNwbGF5LFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpblRvcDogbm9kZUNvbXB1dGVkU3R5bGUubWFyZ2luVG9wLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogbm9kZUNvbXB1dGVkU3R5bGUubWFyZ2luQm90dG9tLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbkxlZnQ6IG5vZGVDb21wdXRlZFN0eWxlLm1hcmdpbkxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luUmlnaHQ6IG5vZGVDb21wdXRlZFN0eWxlLm1hcmdpblJpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgIGNzc0Zsb2F0OiBub2RlQ29tcHV0ZWRTdHlsZS5jc3NGbG9hdFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgICAqIDIuIENoZWNrIGlmIHRoZSBub2RlIGNhbiBiZSBhY3RpdmF0ZWRcclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzTmFOKHBhcnNlRmxvYXQobm9kZUNvbXB1dGVkUHJvcHMudG9wKSkgfHwgbm9kZUNvbXB1dGVkUHJvcHMuZGlzcGxheSA9PSAndGFibGUtY2VsbCcgfHwgbm9kZUNvbXB1dGVkUHJvcHMuZGlzcGxheSA9PSAnbm9uZScpIHJldHVybjtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fYWN0aXZlID0gdHJ1ZTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgICAqIDMuIEdldCBuZWNlc3Nhcnkgbm9kZSBwYXJhbWV0ZXJzXHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIHZhciByZWZlcmVuY2VOb2RlID0gbm9kZS5wYXJlbnROb2RlO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBhcmVudE5vZGUgPSBzaGFkb3dSb290RXhpc3RzICYmIHJlZmVyZW5jZU5vZGUgaW5zdGFuY2VvZiBTaGFkb3dSb290ID8gcmVmZXJlbmNlTm9kZS5ob3N0IDogcmVmZXJlbmNlTm9kZTtcclxuICAgICAgICAgICAgICAgIHZhciBub2RlV2luT2Zmc2V0ID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgICAgIHZhciBwYXJlbnRXaW5PZmZzZXQgPSBwYXJlbnROb2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBhcmVudENvbXB1dGVkU3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKHBhcmVudE5vZGUpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wYXJlbnQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZTogcGFyZW50Tm9kZSxcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IHBhcmVudE5vZGUuc3R5bGUucG9zaXRpb25cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldEhlaWdodDogcGFyZW50Tm9kZS5vZmZzZXRIZWlnaHRcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vZmZzZXRUb1dpbmRvdyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBub2RlV2luT2Zmc2V0LmxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCAtIG5vZGVXaW5PZmZzZXQucmlnaHRcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vZmZzZXRUb1BhcmVudCA9IHtcclxuICAgICAgICAgICAgICAgICAgICB0b3A6IG5vZGVXaW5PZmZzZXQudG9wIC0gcGFyZW50V2luT2Zmc2V0LnRvcCAtIHBhcnNlTnVtZXJpYyhwYXJlbnRDb21wdXRlZFN0eWxlLmJvcmRlclRvcFdpZHRoKSxcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBub2RlV2luT2Zmc2V0LmxlZnQgLSBwYXJlbnRXaW5PZmZzZXQubGVmdCAtIHBhcnNlTnVtZXJpYyhwYXJlbnRDb21wdXRlZFN0eWxlLmJvcmRlckxlZnRXaWR0aCksXHJcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IC1ub2RlV2luT2Zmc2V0LnJpZ2h0ICsgcGFyZW50V2luT2Zmc2V0LnJpZ2h0IC0gcGFyc2VOdW1lcmljKHBhcmVudENvbXB1dGVkU3R5bGUuYm9yZGVyUmlnaHRXaWR0aClcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdHlsZXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IG5vZGUuc3R5bGUucG9zaXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBub2RlLnN0eWxlLnRvcCxcclxuICAgICAgICAgICAgICAgICAgICBib3R0b206IG5vZGUuc3R5bGUuYm90dG9tLFxyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IG5vZGUuc3R5bGUubGVmdCxcclxuICAgICAgICAgICAgICAgICAgICByaWdodDogbm9kZS5zdHlsZS5yaWdodCxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogbm9kZS5zdHlsZS53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICBtYXJnaW5Ub3A6IG5vZGUuc3R5bGUubWFyZ2luVG9wLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbkxlZnQ6IG5vZGUuc3R5bGUubWFyZ2luTGVmdCxcclxuICAgICAgICAgICAgICAgICAgICBtYXJnaW5SaWdodDogbm9kZS5zdHlsZS5tYXJnaW5SaWdodFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgdmFyIG5vZGVUb3BWYWx1ZSA9IHBhcnNlTnVtZXJpYyhub2RlQ29tcHV0ZWRQcm9wcy50b3ApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGltaXRzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBub2RlV2luT2Zmc2V0LnRvcCArIHdpbmRvdy5wYWdlWU9mZnNldCAtIG5vZGVUb3BWYWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICBlbmQ6IHBhcmVudFdpbk9mZnNldC50b3AgKyB3aW5kb3cucGFnZVlPZmZzZXQgKyBwYXJlbnROb2RlLm9mZnNldEhlaWdodCAtIHBhcnNlTnVtZXJpYyhwYXJlbnRDb21wdXRlZFN0eWxlLmJvcmRlckJvdHRvbVdpZHRoKSAtIG5vZGUub2Zmc2V0SGVpZ2h0IC0gbm9kZVRvcFZhbHVlIC0gcGFyc2VOdW1lcmljKG5vZGVDb21wdXRlZFByb3BzLm1hcmdpbkJvdHRvbSlcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAgICAgKiA0LiBFbnN1cmUgdGhhdCB0aGUgbm9kZSB3aWxsIGJlIHBvc2l0aW9uZWQgcmVsYXRpdmVseSB0byB0aGUgcGFyZW50IG5vZGVcclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgdmFyIHBhcmVudFBvc2l0aW9uID0gcGFyZW50Q29tcHV0ZWRTdHlsZS5wb3NpdGlvbjtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudFBvc2l0aW9uICE9ICdhYnNvbHV0ZScgJiYgcGFyZW50UG9zaXRpb24gIT0gJ3JlbGF0aXZlJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudE5vZGUuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgICAgICogNS4gUmVjYWxjIG5vZGUgcG9zaXRpb24uXHJcbiAgICAgICAgICAgICAgICAgKiAgICBJdOKAmXMgaW1wb3J0YW50IHRvIGRvIHRoaXMgYmVmb3JlIGNsb25lIGluamVjdGlvbiB0byBhdm9pZCBzY3JvbGxpbmcgYnVnIGluIENocm9tZS5cclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVjYWxjUG9zaXRpb24oKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgICAqIDYuIENyZWF0ZSBhIGNsb25lXHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIHZhciBjbG9uZSA9IHRoaXMuX2Nsb25lID0ge307XHJcbiAgICAgICAgICAgICAgICBjbG9uZS5ub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIC8vIEFwcGx5IHN0eWxlcyB0byB0aGUgY2xvbmVcclxuICAgICAgICAgICAgICAgIGV4dGVuZChjbG9uZS5ub2RlLnN0eWxlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IG5vZGVXaW5PZmZzZXQucmlnaHQgLSBub2RlV2luT2Zmc2V0LmxlZnQgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogbm9kZVdpbk9mZnNldC5ib3R0b20gLSBub2RlV2luT2Zmc2V0LnRvcCArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luVG9wOiBub2RlQ29tcHV0ZWRQcm9wcy5tYXJnaW5Ub3AsXHJcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiBub2RlQ29tcHV0ZWRQcm9wcy5tYXJnaW5Cb3R0b20sXHJcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luTGVmdDogbm9kZUNvbXB1dGVkUHJvcHMubWFyZ2luTGVmdCxcclxuICAgICAgICAgICAgICAgICAgICBtYXJnaW5SaWdodDogbm9kZUNvbXB1dGVkUHJvcHMubWFyZ2luUmlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgY3NzRmxvYXQ6IG5vZGVDb21wdXRlZFByb3BzLmNzc0Zsb2F0LFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlclNwYWNpbmc6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6ICcxZW0nLFxyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnc3RhdGljJ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIHJlZmVyZW5jZU5vZGUuaW5zZXJ0QmVmb3JlKGNsb25lLm5vZGUsIG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgY2xvbmUuZG9jT2Zmc2V0VG9wID0gZ2V0RG9jT2Zmc2V0VG9wKGNsb25lLm5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBrZXk6ICdfcmVjYWxjUG9zaXRpb24nLFxyXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX3JlY2FsY1Bvc2l0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9hY3RpdmUgfHwgdGhpcy5fcmVtb3ZlZCkgcmV0dXJuO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICB2YXIgc3RpY2t5TW9kZSA9IHNjcm9sbC50b3AgPD0gdGhpcy5fbGltaXRzLnN0YXJ0ID8gJ3N0YXJ0JyA6IHNjcm9sbC50b3AgPj0gdGhpcy5fbGltaXRzLmVuZCA/ICdlbmQnIDogJ21pZGRsZSc7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zdGlja3lNb2RlID09IHN0aWNreU1vZGUpIHJldHVybjtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChzdGlja3lNb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnc3RhcnQnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBleHRlbmQodGhpcy5fbm9kZS5zdHlsZSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiB0aGlzLl9vZmZzZXRUb1BhcmVudC5sZWZ0ICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiB0aGlzLl9vZmZzZXRUb1BhcmVudC5yaWdodCArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRoaXMuX29mZnNldFRvUGFyZW50LnRvcCArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnYXV0bycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5MZWZ0OiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luUmlnaHQ6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5Ub3A6IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbWlkZGxlJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXh0ZW5kKHRoaXMuX25vZGUuc3R5bGUsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogdGhpcy5fb2Zmc2V0VG9XaW5kb3cubGVmdCArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByaWdodDogdGhpcy5fb2Zmc2V0VG9XaW5kb3cucmlnaHQgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB0aGlzLl9zdHlsZXMudG9wLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJ2F1dG8nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luTGVmdDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpblJpZ2h0OiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luVG9wOiAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2VuZCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4dGVuZCh0aGlzLl9ub2RlLnN0eWxlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IHRoaXMuX29mZnNldFRvUGFyZW50LmxlZnQgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IHRoaXMuX29mZnNldFRvUGFyZW50LnJpZ2h0ICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogJ2F1dG8nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICdhdXRvJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbkxlZnQ6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5SaWdodDogMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N0aWNreU1vZGUgPSBzdGlja3lNb2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBrZXk6ICdfZmFzdENoZWNrJyxcclxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9mYXN0Q2hlY2soKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2FjdGl2ZSB8fCB0aGlzLl9yZW1vdmVkKSByZXR1cm47XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhnZXREb2NPZmZzZXRUb3AodGhpcy5fY2xvbmUubm9kZSkgLSB0aGlzLl9jbG9uZS5kb2NPZmZzZXRUb3ApID4gMSB8fCBNYXRoLmFicyh0aGlzLl9wYXJlbnQubm9kZS5vZmZzZXRIZWlnaHQgLSB0aGlzLl9wYXJlbnQub2Zmc2V0SGVpZ2h0KSA+IDEpIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBrZXk6ICdfZGVhY3RpdmF0ZScsXHJcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfZGVhY3RpdmF0ZSgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fYWN0aXZlIHx8IHRoaXMuX3JlbW92ZWQpIHJldHVybjtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2xvbmUubm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuX2Nsb25lLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2Nsb25lO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBleHRlbmQodGhpcy5fbm9kZS5zdHlsZSwgdGhpcy5fc3R5bGVzKTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9zdHlsZXM7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIC8vIENoZWNrIHdoZXRoZXIgZWxlbWVudOKAmXMgcGFyZW50IG5vZGUgaXMgdXNlZCBieSBvdGhlciBzdGlja2llcy5cclxuICAgICAgICAgICAgICAgIC8vIElmIG5vdCwgcmVzdG9yZSBwYXJlbnQgbm9kZeKAmXMgc3R5bGVzLlxyXG4gICAgICAgICAgICAgICAgaWYgKCFzdGlja2llcy5zb21lKGZ1bmN0aW9uIChzdGlja3kpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RpY2t5ICE9PSBfdGhpcyAmJiBzdGlja3kuX3BhcmVudCAmJiBzdGlja3kuX3BhcmVudC5ub2RlID09PSBfdGhpcy5fcGFyZW50Lm5vZGU7XHJcbiAgICAgICAgICAgICAgICB9KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGV4dGVuZCh0aGlzLl9wYXJlbnQubm9kZS5zdHlsZSwgdGhpcy5fcGFyZW50LnN0eWxlcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fcGFyZW50O1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGlja3lNb2RlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fb2Zmc2V0VG9XaW5kb3c7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fb2Zmc2V0VG9QYXJlbnQ7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fbGltaXRzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBrZXk6ICdyZW1vdmUnLFxyXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RlYWN0aXZhdGUoKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgc3RpY2tpZXMuc29tZShmdW5jdGlvbiAoc3RpY2t5LCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGlja3kuX25vZGUgPT09IF90aGlzMi5fbm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGlja2llcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVtb3ZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XSk7XHJcbiAgICBcclxuICAgICAgICByZXR1cm4gU3RpY2t5O1xyXG4gICAgfSgpO1xyXG4gICAgXHJcbiAgICAvKlxyXG4gICAgICogNS4gU3RpY2t5ZmlsbCBBUElcclxuICAgICAqL1xyXG4gICAgXHJcbiAgICBcclxuICAgIHZhciBTdGlja3lmaWxsID0ge1xyXG4gICAgICAgIHN0aWNraWVzOiBzdGlja2llcyxcclxuICAgICAgICBTdGlja3k6IFN0aWNreSxcclxuICAgIFxyXG4gICAgICAgIGFkZE9uZTogZnVuY3Rpb24gYWRkT25lKG5vZGUpIHtcclxuICAgICAgICAgICAgLy8gQ2hlY2sgd2hldGhlciBpdOKAmXMgYSBub2RlXHJcbiAgICAgICAgICAgIGlmICghKG5vZGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcclxuICAgICAgICAgICAgICAgIC8vIE1heWJlIGl04oCZcyBhIG5vZGUgbGlzdCBvZiBzb21lIHNvcnQ/XHJcbiAgICAgICAgICAgICAgICAvLyBUYWtlIGZpcnN0IG5vZGUgZnJvbSB0aGUgbGlzdCB0aGVuXHJcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5sZW5ndGggJiYgbm9kZVswXSkgbm9kZSA9IG5vZGVbMF07ZWxzZSByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICAvLyBDaGVjayBpZiBTdGlja3lmaWxsIGlzIGFscmVhZHkgYXBwbGllZCB0byB0aGUgbm9kZVxyXG4gICAgICAgICAgICAvLyBhbmQgcmV0dXJuIGV4aXN0aW5nIHN0aWNreVxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0aWNraWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RpY2tpZXNbaV0uX25vZGUgPT09IG5vZGUpIHJldHVybiBzdGlja2llc1tpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhbmQgcmV0dXJuIG5ldyBzdGlja3lcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBTdGlja3kobm9kZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhZGQ6IGZ1bmN0aW9uIGFkZChub2RlTGlzdCkge1xyXG4gICAgICAgICAgICAvLyBJZiBpdOKAmXMgYSBub2RlIG1ha2UgYW4gYXJyYXkgb2Ygb25lIG5vZGVcclxuICAgICAgICAgICAgaWYgKG5vZGVMaXN0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIG5vZGVMaXN0ID0gW25vZGVMaXN0XTtcclxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIGFyZ3VtZW50IGlzIGFuIGl0ZXJhYmxlIG9mIHNvbWUgc29ydFxyXG4gICAgICAgICAgICBpZiAoIW5vZGVMaXN0Lmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgXHJcbiAgICAgICAgICAgIC8vIEFkZCBldmVyeSBlbGVtZW50IGFzIGEgc3RpY2t5IGFuZCByZXR1cm4gYW4gYXJyYXkgb2YgY3JlYXRlZCBTdGlja3kgaW5zdGFuY2VzXHJcbiAgICAgICAgICAgIHZhciBhZGRlZFN0aWNraWVzID0gW107XHJcbiAgICBcclxuICAgICAgICAgICAgdmFyIF9sb29wID0gZnVuY3Rpb24gX2xvb3AoaSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5vZGUgPSBub2RlTGlzdFtpXTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gSWYgaXTigJlzIG5vdCBhbiBIVE1MRWxlbWVudCDigJMgY3JlYXRlIGFuIGVtcHR5IGVsZW1lbnQgdG8gcHJlc2VydmUgMS10by0xXHJcbiAgICAgICAgICAgICAgICAvLyBjb3JyZWxhdGlvbiB3aXRoIGlucHV0IGxpc3RcclxuICAgICAgICAgICAgICAgIGlmICghKG5vZGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBhZGRlZFN0aWNraWVzLnB1c2godm9pZCAwKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2NvbnRpbnVlJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gSWYgU3RpY2t5ZmlsbCBpcyBhbHJlYWR5IGFwcGxpZWQgdG8gdGhlIG5vZGVcclxuICAgICAgICAgICAgICAgIC8vIGFkZCBleGlzdGluZyBzdGlja3lcclxuICAgICAgICAgICAgICAgIGlmIChzdGlja2llcy5zb21lKGZ1bmN0aW9uIChzdGlja3kpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RpY2t5Ll9ub2RlID09PSBub2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZGVkU3RpY2tpZXMucHVzaChzdGlja3kpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSkgcmV0dXJuICdjb250aW51ZSc7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBhbmQgYWRkIG5ldyBzdGlja3lcclxuICAgICAgICAgICAgICAgIGFkZGVkU3RpY2tpZXMucHVzaChuZXcgU3RpY2t5KG5vZGUpKTtcclxuICAgICAgICAgICAgfTtcclxuICAgIFxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3JldCA9IF9sb29wKGkpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoX3JldCA9PT0gJ2NvbnRpbnVlJykgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gYWRkZWRTdGlja2llcztcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlZnJlc2hBbGw6IGZ1bmN0aW9uIHJlZnJlc2hBbGwoKSB7XHJcbiAgICAgICAgICAgIHN0aWNraWVzLmZvckVhY2goZnVuY3Rpb24gKHN0aWNreSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0aWNreS5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVtb3ZlT25lOiBmdW5jdGlvbiByZW1vdmVPbmUobm9kZSkge1xyXG4gICAgICAgICAgICAvLyBDaGVjayB3aGV0aGVyIGl04oCZcyBhIG5vZGVcclxuICAgICAgICAgICAgaWYgKCEobm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgLy8gTWF5YmUgaXTigJlzIGEgbm9kZSBsaXN0IG9mIHNvbWUgc29ydD9cclxuICAgICAgICAgICAgICAgIC8vIFRha2UgZmlyc3Qgbm9kZSBmcm9tIHRoZSBsaXN0IHRoZW5cclxuICAgICAgICAgICAgICAgIGlmIChub2RlLmxlbmd0aCAmJiBub2RlWzBdKSBub2RlID0gbm9kZVswXTtlbHNlIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgc3RpY2tpZXMgYm91bmQgdG8gdGhlIG5vZGVzIGluIHRoZSBsaXN0XHJcbiAgICAgICAgICAgIHN0aWNraWVzLnNvbWUoZnVuY3Rpb24gKHN0aWNreSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0aWNreS5fbm9kZSA9PT0gbm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0aWNreS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZShub2RlTGlzdCkge1xyXG4gICAgICAgICAgICAvLyBJZiBpdOKAmXMgYSBub2RlIG1ha2UgYW4gYXJyYXkgb2Ygb25lIG5vZGVcclxuICAgICAgICAgICAgaWYgKG5vZGVMaXN0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIG5vZGVMaXN0ID0gW25vZGVMaXN0XTtcclxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIGFyZ3VtZW50IGlzIGFuIGl0ZXJhYmxlIG9mIHNvbWUgc29ydFxyXG4gICAgICAgICAgICBpZiAoIW5vZGVMaXN0Lmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgXHJcbiAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgc3RpY2tpZXMgYm91bmQgdG8gdGhlIG5vZGVzIGluIHRoZSBsaXN0XHJcbiAgICBcclxuICAgICAgICAgICAgdmFyIF9sb29wMiA9IGZ1bmN0aW9uIF9sb29wMihpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IG5vZGVMaXN0W2ldO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBzdGlja2llcy5zb21lKGZ1bmN0aW9uIChzdGlja3kpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RpY2t5Ll9ub2RlID09PSBub2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0aWNreS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICBcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgX2xvb3AyKGkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZW1vdmVBbGw6IGZ1bmN0aW9uIHJlbW92ZUFsbCgpIHtcclxuICAgICAgICAgICAgd2hpbGUgKHN0aWNraWVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgc3RpY2tpZXNbMF0ucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICAvKlxyXG4gICAgICogNi4gU2V0dXAgZXZlbnRzICh1bmxlc3MgdGhlIHBvbHlmaWxsIHdhcyBkaXNhYmxlZClcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICAvLyBXYXRjaCBmb3Igc2Nyb2xsIHBvc2l0aW9uIGNoYW5nZXMgYW5kIHRyaWdnZXIgcmVjYWxjL3JlZnJlc2ggaWYgbmVlZGVkXHJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tTY3JvbGwoKSB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cucGFnZVhPZmZzZXQgIT0gc2Nyb2xsLmxlZnQpIHtcclxuICAgICAgICAgICAgICAgIHNjcm9sbC50b3AgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICBzY3JvbGwubGVmdCA9IHdpbmRvdy5wYWdlWE9mZnNldDtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgU3RpY2t5ZmlsbC5yZWZyZXNoQWxsKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAod2luZG93LnBhZ2VZT2Zmc2V0ICE9IHNjcm9sbC50b3ApIHtcclxuICAgICAgICAgICAgICAgIHNjcm9sbC50b3AgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICBzY3JvbGwubGVmdCA9IHdpbmRvdy5wYWdlWE9mZnNldDtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gcmVjYWxjIHBvc2l0aW9uIGZvciBhbGwgc3RpY2tpZXNcclxuICAgICAgICAgICAgICAgIHN0aWNraWVzLmZvckVhY2goZnVuY3Rpb24gKHN0aWNreSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGlja3kuX3JlY2FsY1Bvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGNoZWNrU2Nyb2xsKCk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGNoZWNrU2Nyb2xsKTtcclxuICAgIFxyXG4gICAgICAgIC8vIFdhdGNoIGZvciB3aW5kb3cgcmVzaXplcyBhbmQgZGV2aWNlIG9yaWVudGF0aW9uIGNoYW5nZXMgYW5kIHRyaWdnZXIgcmVmcmVzaFxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBTdGlja3lmaWxsLnJlZnJlc2hBbGwpO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIFN0aWNreWZpbGwucmVmcmVzaEFsbCk7XHJcbiAgICBcclxuICAgICAgICAvL0Zhc3QgZGlydHkgY2hlY2sgZm9yIGxheW91dCBjaGFuZ2VzIGV2ZXJ5IDUwMG1zXHJcbiAgICAgICAgdmFyIGZhc3RDaGVja1RpbWVyID0gdm9pZCAwO1xyXG4gICAgXHJcbiAgICAgICAgZnVuY3Rpb24gc3RhcnRGYXN0Q2hlY2tUaW1lcigpIHtcclxuICAgICAgICAgICAgZmFzdENoZWNrVGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzdGlja2llcy5mb3JFYWNoKGZ1bmN0aW9uIChzdGlja3kpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RpY2t5Ll9mYXN0Q2hlY2soKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIHN0b3BGYXN0Q2hlY2tUaW1lcigpIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChmYXN0Q2hlY2tUaW1lcik7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgdmFyIGRvY0hpZGRlbktleSA9IHZvaWQgMDtcclxuICAgICAgICB2YXIgdmlzaWJpbGl0eUNoYW5nZUV2ZW50TmFtZSA9IHZvaWQgMDtcclxuICAgIFxyXG4gICAgICAgIGlmICgnaGlkZGVuJyBpbiBkb2N1bWVudCkge1xyXG4gICAgICAgICAgICBkb2NIaWRkZW5LZXkgPSAnaGlkZGVuJztcclxuICAgICAgICAgICAgdmlzaWJpbGl0eUNoYW5nZUV2ZW50TmFtZSA9ICd2aXNpYmlsaXR5Y2hhbmdlJztcclxuICAgICAgICB9IGVsc2UgaWYgKCd3ZWJraXRIaWRkZW4nIGluIGRvY3VtZW50KSB7XHJcbiAgICAgICAgICAgIGRvY0hpZGRlbktleSA9ICd3ZWJraXRIaWRkZW4nO1xyXG4gICAgICAgICAgICB2aXNpYmlsaXR5Q2hhbmdlRXZlbnROYW1lID0gJ3dlYmtpdHZpc2liaWxpdHljaGFuZ2UnO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGlmICh2aXNpYmlsaXR5Q2hhbmdlRXZlbnROYW1lKSB7XHJcbiAgICAgICAgICAgIGlmICghZG9jdW1lbnRbZG9jSGlkZGVuS2V5XSkgc3RhcnRGYXN0Q2hlY2tUaW1lcigpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIodmlzaWJpbGl0eUNoYW5nZUV2ZW50TmFtZSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRvY3VtZW50W2RvY0hpZGRlbktleV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBzdG9wRmFzdENoZWNrVGltZXIoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRGYXN0Q2hlY2tUaW1lcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Ugc3RhcnRGYXN0Q2hlY2tUaW1lcigpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpZiAoIXNlcHB1a3UpIGluaXQoKTtcclxuICAgIFxyXG4gICAgLypcclxuICAgICAqIDcuIEV4cG9zZSBTdGlja3lmaWxsXHJcbiAgICAgKi9cclxuICAgIGlmICh0eXBlb2YgbW9kdWxlICE9ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XHJcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBTdGlja3lmaWxsO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB3aW5kb3cuU3RpY2t5ZmlsbCA9IFN0aWNreWZpbGw7XHJcbiAgICB9XHJcbiAgICBcclxufSkod2luZG93LCBkb2N1bWVudCk7IiwiLyohIGd1bXNob2VqcyB2My41LjAgfCAoYykgMjAxNyBDaHJpcyBGZXJkaW5hbmRpIHwgTUlUIExpY2Vuc2UgfCBodHRwOi8vZ2l0aHViLmNvbS9jZmVyZGluYW5kaS9ndW1zaG9lICovXG4hKGZ1bmN0aW9uKGUsdCl7XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShbXSx0KGUpKTpcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cz9tb2R1bGUuZXhwb3J0cz10KGUpOmUuZ3Vtc2hvZT10KGUpfSkoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbD9nbG9iYWw6dGhpcy53aW5kb3d8fHRoaXMuZ2xvYmFsLChmdW5jdGlvbihlKXtcInVzZSBzdHJpY3RcIjt2YXIgdCxuLG8scixhLGMsaSxsPXt9LHM9XCJxdWVyeVNlbGVjdG9yXCJpbiBkb2N1bWVudCYmXCJhZGRFdmVudExpc3RlbmVyXCJpbiBlJiZcImNsYXNzTGlzdFwiaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIl9cIiksdT1bXSxmPXtzZWxlY3RvcjpcIltkYXRhLWd1bXNob2VdIGFcIixzZWxlY3RvckhlYWRlcjpcIltkYXRhLWd1bXNob2UtaGVhZGVyXVwiLGNvbnRhaW5lcjplLG9mZnNldDowLGFjdGl2ZUNsYXNzOlwiYWN0aXZlXCIsc2Nyb2xsRGVsYXk6ITEsY2FsbGJhY2s6ZnVuY3Rpb24oKXt9fSxkPWZ1bmN0aW9uKGUsdCxuKXtpZihcIltvYmplY3QgT2JqZWN0XVwiPT09T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGUpKWZvcih2YXIgbyBpbiBlKU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlLG8pJiZ0LmNhbGwobixlW29dLG8sZSk7ZWxzZSBmb3IodmFyIHI9MCxhPWUubGVuZ3RoO3I8YTtyKyspdC5jYWxsKG4sZVtyXSxyLGUpfSx2PWZ1bmN0aW9uKCl7dmFyIGU9e30sdD0hMSxuPTAsbz1hcmd1bWVudHMubGVuZ3RoO1wiW29iamVjdCBCb29sZWFuXVwiPT09T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZ3VtZW50c1swXSkmJih0PWFyZ3VtZW50c1swXSxuKyspO2Zvcig7bjxvO24rKyl7dmFyIHI9YXJndW1lbnRzW25dOyEoZnVuY3Rpb24obil7Zm9yKHZhciBvIGluIG4pT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG4sbykmJih0JiZcIltvYmplY3QgT2JqZWN0XVwiPT09T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG5bb10pP2Vbb109dighMCxlW29dLG5bb10pOmVbb109bltvXSl9KShyKX1yZXR1cm4gZX0sbT1mdW5jdGlvbihlKXtyZXR1cm4gTWF0aC5tYXgoZS5zY3JvbGxIZWlnaHQsZS5vZmZzZXRIZWlnaHQsZS5jbGllbnRIZWlnaHQpfSxnPWZ1bmN0aW9uKCl7cmV0dXJuIE1hdGgubWF4KGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0LGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQsZG9jdW1lbnQuYm9keS5vZmZzZXRIZWlnaHQsZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm9mZnNldEhlaWdodCxkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodCxkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KX0saD1mdW5jdGlvbihlKXt2YXIgbj0wO2lmKGUub2Zmc2V0UGFyZW50KWRve24rPWUub2Zmc2V0VG9wLGU9ZS5vZmZzZXRQYXJlbnR9d2hpbGUoZSk7ZWxzZSBuPWUub2Zmc2V0VG9wO3JldHVybiBuPW4tYS10Lm9mZnNldCxuPj0wP246MH0scD1mdW5jdGlvbih0KXt2YXIgbj10LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO3JldHVybiBuLnRvcD49MCYmbi5sZWZ0Pj0wJiZuLmJvdHRvbTw9KGUuaW5uZXJIZWlnaHR8fGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQpJiZuLnJpZ2h0PD0oZS5pbm5lcldpZHRofHxkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgpfSx5PWZ1bmN0aW9uKCl7dS5zb3J0KChmdW5jdGlvbihlLHQpe3JldHVybiBlLmRpc3RhbmNlPnQuZGlzdGFuY2U/LTE6ZS5kaXN0YW5jZTx0LmRpc3RhbmNlPzE6MH0pKX07bC5zZXREaXN0YW5jZXM9ZnVuY3Rpb24oKXtvPWcoKSxhPXI/bShyKStoKHIpOjAsZCh1LChmdW5jdGlvbihlKXtlLmRpc3RhbmNlPWgoZS50YXJnZXQpfSkpLHkoKX07dmFyIGI9ZnVuY3Rpb24oKXt2YXIgZT1kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHQuc2VsZWN0b3IpO2QoZSwoZnVuY3Rpb24oZSl7aWYoZS5oYXNoKXt2YXIgdD1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKGUuaGFzaCk7dCYmdS5wdXNoKHtuYXY6ZSx0YXJnZXQ6dCxwYXJlbnQ6XCJsaVwiPT09ZS5wYXJlbnROb2RlLnRhZ05hbWUudG9Mb3dlckNhc2UoKT9lLnBhcmVudE5vZGU6bnVsbCxkaXN0YW5jZTowfSl9fSkpfSxIPWZ1bmN0aW9uKCl7YyYmKGMubmF2LmNsYXNzTGlzdC5yZW1vdmUodC5hY3RpdmVDbGFzcyksYy5wYXJlbnQmJmMucGFyZW50LmNsYXNzTGlzdC5yZW1vdmUodC5hY3RpdmVDbGFzcykpfSxDPWZ1bmN0aW9uKGUpe0goKSxlLm5hdi5jbGFzc0xpc3QuYWRkKHQuYWN0aXZlQ2xhc3MpLGUucGFyZW50JiZlLnBhcmVudC5jbGFzc0xpc3QuYWRkKHQuYWN0aXZlQ2xhc3MpLHQuY2FsbGJhY2soZSksYz17bmF2OmUubmF2LHBhcmVudDplLnBhcmVudH19O2wuZ2V0Q3VycmVudE5hdj1mdW5jdGlvbigpe3ZhciBuPWUucGFnZVlPZmZzZXQ7aWYoZS5pbm5lckhlaWdodCtuPj1vJiZwKHVbMF0udGFyZ2V0KSlyZXR1cm4gQyh1WzBdKSx1WzBdO2Zvcih2YXIgcj0wLGE9dS5sZW5ndGg7cjxhO3IrKyl7dmFyIGM9dVtyXTtpZihjLmRpc3RhbmNlPD1uKXJldHVybiBDKGMpLGN9SCgpLHQuY2FsbGJhY2soKX07dmFyIEw9ZnVuY3Rpb24oKXtkKHUsKGZ1bmN0aW9uKGUpe2UubmF2LmNsYXNzTGlzdC5jb250YWlucyh0LmFjdGl2ZUNsYXNzKSYmKGM9e25hdjplLm5hdixwYXJlbnQ6ZS5wYXJlbnR9KX0pKX07bC5kZXN0cm95PWZ1bmN0aW9uKCl7dCYmKHQuY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIixqLCExKSx0LmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsaiwhMSksdT1bXSx0PW51bGwsbj1udWxsLG89bnVsbCxyPW51bGwsYT1udWxsLGM9bnVsbCxpPW51bGwpfTt2YXIgRT1mdW5jdGlvbihlKXt3aW5kb3cuY2xlYXJUaW1lb3V0KG4pLG49c2V0VGltZW91dCgoZnVuY3Rpb24oKXtsLnNldERpc3RhbmNlcygpLGwuZ2V0Q3VycmVudE5hdigpfSksNjYpfSxqPWZ1bmN0aW9uKGUpe258fChuPXNldFRpbWVvdXQoKGZ1bmN0aW9uKCl7bj1udWxsLFwic2Nyb2xsXCI9PT1lLnR5cGUmJmwuZ2V0Q3VycmVudE5hdigpLFwicmVzaXplXCI9PT1lLnR5cGUmJihsLnNldERpc3RhbmNlcygpLGwuZ2V0Q3VycmVudE5hdigpKX0pLDY2KSl9O3JldHVybiBsLmluaXQ9ZnVuY3Rpb24oZSl7cyYmKGwuZGVzdHJveSgpLHQ9dihmLGV8fHt9KSxyPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodC5zZWxlY3RvckhlYWRlciksYigpLDAhPT11Lmxlbmd0aCYmKEwoKSxsLnNldERpc3RhbmNlcygpLGwuZ2V0Q3VycmVudE5hdigpLHQuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIixqLCExKSx0LnNjcm9sbERlbGF5P3QuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIixFLCExKTp0LmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsaiwhMSkpKX0sbH0pKTsiLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuXG5leHBvcnQgY29uc3QgdG9nZ2xlRXhwYW5kYWJsZSA9IChcbiAgdG9nZ2xlRWxlbWVudCxcbiAge1xuICAgIGNvbnRleHQgPSBkb2N1bWVudCxcbiAgICBmb3JjZUNsb3NlID0gZmFsc2UsXG4gICAgY2xvc2VTaWJsaW5ncyA9IGZhbHNlLFxuICAgIHNpYmxpbmdzU2VsZWN0b3IgPSAnW2FyaWEtY29udHJvbHNdW2FyaWEtZXhwYW5kZWRdJyxcbiAgfSA9IHt9XG4pID0+IHtcbiAgaWYgKCF0b2dnbGVFbGVtZW50KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gR2V0IHRhcmdldCBlbGVtZW50XG4gIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgIHRvZ2dsZUVsZW1lbnQuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJylcbiAgKTtcblxuICAvLyBFeGl0IGlmIG5vIHRhcmdldCBmb3VuZFxuICBpZiAoIXRhcmdldCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEdldCBjdXJyZW50IHN0YXR1c1xuICBjb25zdCBpc0V4cGFuZGVkID1cbiAgICBmb3JjZUNsb3NlID09PSB0cnVlIHx8XG4gICAgdG9nZ2xlRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnKSA9PT0gJ3RydWUnO1xuXG4gIC8vIFRvZ2dsZSB0aGUgZXhwYW5kYWJsZS9jb2xsYXBzaWJsZVxuICB0b2dnbGVFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICFpc0V4cGFuZGVkKTtcbiAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCBpc0V4cGFuZGVkKTtcblxuICAvLyBUb2dnbGUgbGFiZWwgaWYgcG9zc2libGVcbiAgaWYgKCFpc0V4cGFuZGVkICYmIHRvZ2dsZUVsZW1lbnQuaGFzQXR0cmlidXRlKCdkYXRhLWxhYmVsLWV4cGFuZGVkJykpIHtcbiAgICB0b2dnbGVFbGVtZW50LmlubmVySFRNTCA9IHRvZ2dsZUVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWxhYmVsLWV4cGFuZGVkJyk7XG4gIH0gZWxzZSBpZiAoaXNFeHBhbmRlZCAmJiB0b2dnbGVFbGVtZW50Lmhhc0F0dHJpYnV0ZSgnZGF0YS1sYWJlbC1jb2xsYXBzZWQnKSkge1xuICAgIHRvZ2dsZUVsZW1lbnQuaW5uZXJIVE1MID0gdG9nZ2xlRWxlbWVudC5nZXRBdHRyaWJ1dGUoXG4gICAgICAnZGF0YS1sYWJlbC1jb2xsYXBzZWQnXG4gICAgKTtcbiAgfVxuXG4gIC8vIENsb3NlIHNpYmxpbmdzIGlmIHJlcXVlc3RlZFxuICBpZiAoY2xvc2VTaWJsaW5ncyA9PT0gdHJ1ZSkge1xuICAgIGNvbnN0IHNpYmxpbmdzQXJyYXkgPSBBcnJheS5wcm90b3R5cGUuc2xpY2VcbiAgICAgIC5jYWxsKGNvbnRleHQucXVlcnlTZWxlY3RvckFsbChzaWJsaW5nc1NlbGVjdG9yKSlcbiAgICAgIC5maWx0ZXIoc2libGluZyA9PiBzaWJsaW5nICE9PSB0b2dnbGVFbGVtZW50KTtcblxuICAgIHNpYmxpbmdzQXJyYXkuZm9yRWFjaChzaWJsaW5nID0+IHtcbiAgICAgIHRvZ2dsZUV4cGFuZGFibGUoc2libGluZywge1xuICAgICAgICBjb250ZXh0LFxuICAgICAgICBmb3JjZUNsb3NlOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn07XG5cbi8vIEhlbHBlciBtZXRob2QgdG8gYXV0b21hdGljYWxseSBhdHRhY2ggdGhlIGV2ZW50IGxpc3RlbmVyIHRvIGFsbCB0aGUgZXhwYW5kYWJsZXMgb24gcGFnZSBsb2FkXG5leHBvcnQgY29uc3QgaW5pdEV4cGFuZGFibGVzID0gKHNlbGVjdG9yLCBjb250ZXh0ID0gZG9jdW1lbnQpID0+IHtcbiAgLy8gRXhpdCBpZiBubyBzZWxlY3RvciB3YXMgcHJvdmlkZWRcbiAgaWYgKCFzZWxlY3RvcikgcmV0dXJuO1xuXG4gIGNvbnN0IG5vZGVzQXJyYXkgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChcbiAgICBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpXG4gICk7XG5cbiAgbm9kZXNBcnJheS5mb3JFYWNoKG5vZGUgPT5cbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICB0b2dnbGVFeHBhbmRhYmxlKG5vZGUsIHsgY29udGV4dCB9KTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KVxuICApO1xufTtcbiIsIi8qKlxuICogTmF2aWdhdGlvbiBpbnBhZ2UgcmVsYXRlZCBiZWhhdmlvcnMuXG4gKi9cblxuaW1wb3J0IFN0aWNreWZpbGwgZnJvbSAnc3RpY2t5ZmlsbGpzJztcbmltcG9ydCBndW1zaG9lIGZyb20gJ2d1bXNob2Vqcyc7XG5pbXBvcnQgeyBxdWVyeUFsbCB9IGZyb20gJ0BlY2wvZ2VuZXJpYy1iYXNlL2hlbHBlcnMvZG9tJztcbmltcG9ydCB7IHRvZ2dsZUV4cGFuZGFibGUgfSBmcm9tICdAZWNsL2dlbmVyaWMtY29tcG9uZW50LWV4cGFuZGFibGUnO1xuXG4vKipcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIE9iamVjdCBjb250YWluaW5nIGNvbmZpZ3VyYXRpb24gb3ZlcnJpZGVzXG4gKi9cbmV4cG9ydCBjb25zdCBuYXZpZ2F0aW9uSW5wYWdlcyA9ICh7XG4gIHN0aWNreVNlbGVjdG9yOiBzdGlja3lTZWxlY3RvciA9ICcuZWNsLWlucGFnZS1uYXZpZ2F0aW9uJyxcbiAgc3B5U2VsZWN0b3I6IHNweVNlbGVjdG9yID0gJy5lY2wtaW5wYWdlLW5hdmlnYXRpb25fX2xpbmsnLFxuICBzcHlDbGFzczogc3B5Q2xhc3MgPSAnZWNsLWlucGFnZS1uYXZpZ2F0aW9uX19saW5rLS1pcy1hY3RpdmUnLFxuICBzcHlBY3RpdmVDb250YWluZXI6IHNweUFjdGl2ZUNvbnRhaW5lciA9ICdlY2wtaW5wYWdlLW5hdmlnYXRpb24tLXZpc2libGUnLFxuICBzcHlUcmlnZ2VyOiBzcHlUcmlnZ2VyID0gJy5lY2wtaW5wYWdlLW5hdmlnYXRpb25fX3RyaWdnZXInLFxuICBzcHlPZmZzZXQ6IHNweU9mZnNldCA9IDIwLFxuICB0b2dnbGVTZWxlY3RvcjogdG9nZ2xlU2VsZWN0b3IgPSAnLmVjbC1pbnBhZ2UtbmF2aWdhdGlvbl9fdHJpZ2dlcicsXG4gIGxpbmtzU2VsZWN0b3I6IGxpbmtzU2VsZWN0b3IgPSAnLmVjbC1pbnBhZ2UtbmF2aWdhdGlvbl9fbGluaycsXG59ID0ge30pID0+IHtcbiAgLy8gU1VQUE9SVFNcbiAgaWYgKFxuICAgICEoJ3F1ZXJ5U2VsZWN0b3InIGluIGRvY3VtZW50KSB8fFxuICAgICEoJ2FkZEV2ZW50TGlzdGVuZXInIGluIHdpbmRvdykgfHxcbiAgICAhZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdFxuICApXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgbGV0IHN0aWNreUluc3RhbmNlO1xuXG4gIC8vIEFDVElPTlNcbiAgZnVuY3Rpb24gaW5pdFN0aWNreShlbGVtZW50KSB7XG4gICAgc3RpY2t5SW5zdGFuY2UgPSBuZXcgU3RpY2t5ZmlsbC5TdGlja3koZWxlbWVudCk7XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95U3RpY2t5KCkge1xuICAgIGlmIChzdGlja3lJbnN0YW5jZSkge1xuICAgICAgc3RpY2t5SW5zdGFuY2UucmVtb3ZlKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaW5pdFNjcm9sbFNweShpbnBhZ2VOYXZFbGVtZW50KSB7XG4gICAgZ3Vtc2hvZS5pbml0KHtcbiAgICAgIHNlbGVjdG9yOiBzcHlTZWxlY3RvcixcbiAgICAgIGFjdGl2ZUNsYXNzOiBzcHlDbGFzcyxcbiAgICAgIG9mZnNldDogc3B5T2Zmc2V0LFxuICAgICAgY2FsbGJhY2sobmF2KSB7XG4gICAgICAgIGNvbnN0IG5hdmlnYXRpb25UaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc3B5VHJpZ2dlcik7XG5cbiAgICAgICAgaWYgKCFuYXYpIHtcbiAgICAgICAgICBpbnBhZ2VOYXZFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoc3B5QWN0aXZlQ29udGFpbmVyKTtcbiAgICAgICAgICBuYXZpZ2F0aW9uVGl0bGUuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaW5wYWdlTmF2RWxlbWVudC5jbGFzc0xpc3QuYWRkKHNweUFjdGl2ZUNvbnRhaW5lcik7XG4gICAgICAgICAgbmF2aWdhdGlvblRpdGxlLmlubmVySFRNTCA9IG5hdi5uYXYuaW5uZXJIVE1MO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveVNjcm9sbFNweSgpIHtcbiAgICBndW1zaG9lLmRlc3Ryb3koKTtcbiAgfVxuXG4gIC8vIEluaXRcbiAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBjb25zdCBpbnBhZ2VOYXZFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzdGlja3lTZWxlY3Rvcik7XG4gICAgY29uc3QgdG9nZ2xlRWxlbWVudCA9IGlucGFnZU5hdkVsZW1lbnQucXVlcnlTZWxlY3Rvcih0b2dnbGVTZWxlY3Rvcik7XG4gICAgY29uc3QgbmF2TGlua3MgPSBxdWVyeUFsbChsaW5rc1NlbGVjdG9yLCBpbnBhZ2VOYXZFbGVtZW50KTtcblxuICAgIGluaXRTdGlja3koaW5wYWdlTmF2RWxlbWVudCk7XG4gICAgaW5pdFNjcm9sbFNweShpbnBhZ2VOYXZFbGVtZW50KTtcblxuICAgIHRvZ2dsZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgIHRvZ2dsZUV4cGFuZGFibGUodG9nZ2xlRWxlbWVudCwgeyBjb250ZXh0OiBpbnBhZ2VOYXZFbGVtZW50IH0pO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuXG4gICAgbmF2TGlua3MuZm9yRWFjaChsaW5rID0+XG4gICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICB0b2dnbGVFeHBhbmRhYmxlKHRvZ2dsZUVsZW1lbnQsIHtcbiAgICAgICAgICBjb250ZXh0OiBpbnBhZ2VOYXZFbGVtZW50LFxuICAgICAgICAgIGZvcmNlQ2xvc2U6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLy8gRGVzdHJveVxuICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIGRlc3Ryb3lTY3JvbGxTcHkoKTtcbiAgICBkZXN0cm95U3RpY2t5KCk7XG4gIH1cblxuICBpbml0KCk7XG5cbiAgLy8gUkVWRUFMIEFQSVxuICByZXR1cm4ge1xuICAgIGluaXQsXG4gICAgZGVzdHJveSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG5hdmlnYXRpb25JbnBhZ2VzO1xuIiwiaW1wb3J0IHsgcXVlcnlBbGwgfSBmcm9tICdAZWNsL2dlbmVyaWMtYmFzZS9oZWxwZXJzL2RvbSc7XG5pbXBvcnQgeyB0b2dnbGVFeHBhbmRhYmxlIH0gZnJvbSAnQGVjbC9nZW5lcmljLWNvbXBvbmVudC1leHBhbmRhYmxlJztcblxuY29uc3Qgb25DbGljayA9IChub2RlLCBtZW51KSA9PiBlID0+IHtcbiAgaWYgKG5vZGUgJiYgbm9kZS5oYXNBdHRyaWJ1dGUoJ2FyaWEtaGFzcG9wdXAnKSkge1xuICAgIGNvbnN0IGhhc1BvcHVwID0gbm9kZS5nZXRBdHRyaWJ1dGUoJ2FyaWEtaGFzcG9wdXAnKTtcbiAgICBpZiAoaGFzUG9wdXAgPT09ICcnIHx8IGhhc1BvcHVwID09PSAndHJ1ZScpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgdG9nZ2xlRXhwYW5kYWJsZShub2RlLCB7XG4gICAgICAgIGNvbnRleHQ6IG1lbnUsXG4gICAgICAgIGNsb3NlU2libGluZ3M6IHRydWUsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IG9uS2V5ZG93biA9IChub2RlLCBtZW51KSA9PiBlID0+IHtcbiAgY29uc3QgY3VycmVudFRhYiA9IG5vZGUucGFyZW50RWxlbWVudDtcbiAgY29uc3QgcHJldmlvdXNUYWJJdGVtID1cbiAgICBjdXJyZW50VGFiLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgfHxcbiAgICBjdXJyZW50VGFiLnBhcmVudEVsZW1lbnQubGFzdEVsZW1lbnRDaGlsZDtcbiAgY29uc3QgbmV4dFRhYkl0ZW0gPVxuICAgIGN1cnJlbnRUYWIubmV4dEVsZW1lbnRTaWJsaW5nIHx8IGN1cnJlbnRUYWIucGFyZW50RWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZDtcblxuICAvLyBkb24ndCBjYXRjaCBrZXkgZXZlbnRzIHdoZW4g4oyYIG9yIEFsdCBtb2RpZmllciBpcyBwcmVzZW50XG4gIGlmIChlLm1ldGFLZXkgfHwgZS5hbHRLZXkpIHJldHVybjtcblxuICAvLyBjYXRjaCBsZWZ0L3JpZ2h0IGFuZCB1cC9kb3duIGFycm93IGtleSBldmVudHNcbiAgLy8gaWYgbmV3IG5leHQvcHJldiB0YWIgYXZhaWxhYmxlLCBzaG93IGl0IGJ5IHBhc3NpbmcgdGFiIGFuY2hvciB0byBzaG93VGFiIG1ldGhvZFxuICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuICAgIC8vIEVOVEVSIG9yIFNQQUNFXG4gICAgY2FzZSAxMzpcbiAgICBjYXNlIDMyOlxuICAgICAgb25DbGljayhlLmN1cnJlbnRUYXJnZXQsIG1lbnUpKGUpO1xuICAgICAgYnJlYWs7XG4gICAgLy8gQVJST1dTIExFRlQgYW5kIFVQXG4gICAgY2FzZSAzNzpcbiAgICBjYXNlIDM4OlxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcHJldmlvdXNUYWJJdGVtLnF1ZXJ5U2VsZWN0b3IoJ2EnKS5mb2N1cygpO1xuICAgICAgYnJlYWs7XG4gICAgLy8gQVJST1dTIFJJR0hUIGFuZCBET1dOXG4gICAgY2FzZSAzOTpcbiAgICBjYXNlIDQwOlxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbmV4dFRhYkl0ZW0ucXVlcnlTZWxlY3RvcignYScpLmZvY3VzKCk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgYnJlYWs7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBtZWdhbWVudSA9ICh7XG4gIHNlbGVjdG9yOiBzZWxlY3RvciA9ICcuZWNsLW5hdmlnYXRpb24tbWVudScsXG4gIHRvZ2dsZVNlbGVjdG9yOiB0b2dnbGVTZWxlY3RvciA9ICcuZWNsLW5hdmlnYXRpb24tbWVudV9fdG9nZ2xlJyxcbiAgbGlzdFNlbGVjdG9yOiBsaXN0U2VsZWN0b3IgPSAnLmVjbC1uYXZpZ2F0aW9uLW1lbnVfX3Jvb3QnLFxuICBsaW5rU2VsZWN0b3I6IGxpbmtTZWxlY3RvciA9ICcuZWNsLW5hdmlnYXRpb24tbWVudV9fbGluaycsXG59ID0ge30pID0+IHtcbiAgY29uc3QgbWVnYW1lbnVzQXJyYXkgPSBxdWVyeUFsbChzZWxlY3Rvcik7XG5cbiAgbWVnYW1lbnVzQXJyYXkuZm9yRWFjaChtZW51ID0+IHtcbiAgICAvLyBNYWtlIHRoZSB0b2dnbGUgZXhwYW5kYWJsZVxuICAgIGNvbnN0IHRvZ2dsZSA9IG1lbnUucXVlcnlTZWxlY3Rvcih0b2dnbGVTZWxlY3Rvcik7XG4gICAgaWYgKHRvZ2dsZSkge1xuICAgICAgdG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT5cbiAgICAgICAgdG9nZ2xlRXhwYW5kYWJsZSh0b2dnbGUsIHsgY29udGV4dDogbWVudSB9KVxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBHZXQgdGhlIGxpc3Qgb2YgbGlua3NcbiAgICBjb25zdCBsaXN0ID0gbWVudS5xdWVyeVNlbGVjdG9yKGxpc3RTZWxlY3Rvcik7XG5cbiAgICAvLyBHZXQgZXhwYW5kYWJsZXMgd2l0aGluIHRoZSBsaXN0XG4gICAgY29uc3Qgbm9kZXNBcnJheSA9IHF1ZXJ5QWxsKGxpbmtTZWxlY3RvciwgbGlzdCk7XG5cbiAgICBub2Rlc0FycmF5LmZvckVhY2gobm9kZSA9PiB7XG4gICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25DbGljayhub2RlLCBsaXN0KSk7XG4gICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleWRvd24obm9kZSwgbGlzdCkpO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG1lZ2FtZW51O1xuIiwiLyoqXG4gIHN0aWNreWJpdHMgLSBTdGlja3liaXRzIGlzIGEgbGlnaHR3ZWlnaHQgYWx0ZXJuYXRpdmUgdG8gYHBvc2l0aW9uOiBzdGlja3lgIHBvbHlmaWxsc1xuICBAdmVyc2lvbiB2My4zLjJcbiAgQGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL2RvbGxhcnNoYXZlY2x1Yi9zdGlja3liaXRzI3JlYWRtZVxuICBAYXV0aG9yIEplZmYgV2FpbndyaWdodCA8eW93YWlud3JpZ2h0QGdtYWlsLmNvbT4gKGh0dHBzOi8vamVmZnJ5LmluKVxuICBAbGljZW5zZSBNSVRcbioqL1xuLypcbiAgU1RJQ0tZQklUUyDwn5KJXG4gIC0tLS0tLS0tXG4gID4gYSBsaWdodHdlaWdodCBhbHRlcm5hdGl2ZSB0byBgcG9zaXRpb246IHN0aWNreWAgcG9seWZpbGxzIPCfjaxcbiAgLS0tLS0tLS1cbiAgLSBlYWNoIG1ldGhvZCBpcyBkb2N1bWVudGVkIGFib3ZlIGl0IG91ciB2aWV3IHRoZSByZWFkbWVcbiAgLSBTdGlja3liaXRzIGRvZXMgbm90IG1hbmFnZSBwb2x5bW9ycGhpYyBmdW5jdGlvbmFsaXR5IChwb3NpdGlvbiBsaWtlIHByb3BlcnRpZXMpXG4gICogcG9seW1vcnBoaWMgZnVuY3Rpb25hbGl0eTogKGluIHRoZSBjb250ZXh0IG9mIGRlc2NyaWJpbmcgU3RpY2t5Yml0cylcbiAgICBtZWFucyBtYWtpbmcgdGhpbmdzIGxpa2UgYHBvc2l0aW9uOiBzdGlja3lgIGJlIGxvb3NlbHkgc3VwcG9ydGVkIHdpdGggcG9zaXRpb24gZml4ZWQuXG4gICAgSXQgYWxzbyBtZWFucyB0aGF0IGZlYXR1cmVzIGxpa2UgYHVzZVN0aWNreUNsYXNzZXNgIHRha2VzIG9uIHN0eWxlcyBsaWtlIGBwb3NpdGlvbjogZml4ZWRgLlxuICAtLS0tLS0tLVxuICBkZWZhdWx0cyDwn5SMXG4gIC0tLS0tLS0tXG4gIC0gdmVyc2lvbiA9IGBwYWNrYWdlLmpzb25gIHZlcnNpb25cbiAgLSB1c2VyQWdlbnQgPSB2aWV3ZXIgYnJvd3NlciBhZ2VudFxuICAtIHRhcmdldCA9IERPTSBlbGVtZW50IHNlbGVjdG9yXG4gIC0gbm9TdHlsZXMgPSBib29sZWFuXG4gIC0gb2Zmc2V0ID0gbnVtYmVyXG4gIC0gcGFyZW50Q2xhc3MgPSAnc3RyaW5nJ1xuICAtIHNjcm9sbEVsID0gd2luZG93IHx8IERPTSBlbGVtZW50IHNlbGVjdG9yXG4gIC0gc3RpY2t5Q2xhc3MgPSAnc3RyaW5nJ1xuICAtIHN0dWNrQ2xhc3MgPSAnc3RyaW5nJ1xuICAtIHVzZVN0aWNreUNsYXNzZXMgPSBib29sZWFuXG4gIC0gdmVydGljYWxQb3NpdGlvbiA9ICdzdHJpbmcnXG4gIC0tLS0tLS0tXG4gIHByb3Bz8J+UjFxuICAtLS0tLS0tLVxuICAtIHAgPSBwcm9wcyB7b2JqZWN0fVxuICAtLS0tLS0tLVxuICBpbnN0YW5jZSBub3RlXG4gIC0tLS0tLS0tXG4gIC0gc3RpY2t5Yml0cyBwYXJlbnQgbWV0aG9kcyByZXR1cm4gdGhpc1xuICAtIHN0aWNreWJpdHMgaW5zdGFuY2UgbWV0aG9kcyByZXR1cm4gYW4gaW5zdGFuY2UgaXRlbVxuICAtLS0tLS0tLVxuICBub21lbmNsYXR1cmVcbiAgLS0tLS0tLS1cbiAgLSB0YXJnZXQgPT4gZWwgPT4gZVxuICAtIHByb3BzID0+IG8gfHwgcFxuICAtIGluc3RhbmNlID0+IGl0ZW0gPT4gaXRcbiAgLS0tLS0tLS1cbiAgbWV0aG9kc1xuICAtLS0tLS0tLVxuICAtIC5kZWZpbmVQb3NpdGlvbiA9IGRlZmluZXMgc3RpY2t5IG9yIGZpeGVkXG4gIC0gLmFkZEluc3RhbmNlID0gYW4gYXJyYXkgb2Ygb2JqZWN0cyBmb3IgZWFjaCBTdGlja3liaXRzIFRhcmdldFxuICAtIC5nZXRDbG9zZXN0UGFyZW50ID0gZ2V0cyB0aGUgcGFyZW50IGZvciBub24td2luZG93IHNjcm9sbFxuICAtIC5nZXRPZmZzZXRUb3AgPSBnZXRzIHRoZSBlbGVtZW50IG9mZnNldFRvcCBmcm9tIHRoZSB0b3AgbGV2ZWwgb2YgdGhlIERPTVxuICAtIC5jb21wdXRlU2Nyb2xsT2Zmc2V0cyA9IGNvbXB1dGVzIHNjcm9sbCBwb3NpdGlvblxuICAtIC50b2dnbGVDbGFzc2VzID0gb2xkZXIgYnJvd3NlciB0b2dnbGVyXG4gIC0gLm1hbmFnZVN0YXRlID0gbWFuYWdlcyBzdGlja3kgc3RhdGVcbiAgLSAucmVtb3ZlQ2xhc3MgPSBvbGRlciBicm93c2VyIHN1cHBvcnQgY2xhc3MgcmVtb3ZlclxuICAtIC5yZW1vdmVJbnN0YW5jZSA9IHJlbW92ZXMgYW4gaW5zdGFuY2VcbiAgLSAuY2xlYW51cCA9IHJlbW92ZXMgYWxsIFN0aWNreWJpdHMgaW5zdGFuY2VzIGFuZCBjbGVhbnMgdXAgZG9tIGZyb20gc3RpY2t5Yml0c1xuKi9cbnZhciBTdGlja3liaXRzID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gU3RpY2t5Yml0cyh0YXJnZXQsIG9iaikge1xuICAgIHZhciBvID0gdHlwZW9mIG9iaiAhPT0gJ3VuZGVmaW5lZCcgPyBvYmogOiB7fTtcbiAgICB0aGlzLnZlcnNpb24gPSAnMy4zLjInO1xuICAgIHRoaXMudXNlckFnZW50ID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQgfHwgJ25vIGB1c2VyQWdlbnRgIHByb3ZpZGVkIGJ5IHRoZSBicm93c2VyJztcbiAgICB0aGlzLnByb3BzID0ge1xuICAgICAgY3VzdG9tU3RpY2t5Q2hhbmdlTnVtYmVyOiBvLmN1c3RvbVN0aWNreUNoYW5nZU51bWJlciB8fCBudWxsLFxuICAgICAgbm9TdHlsZXM6IG8ubm9TdHlsZXMgfHwgZmFsc2UsXG4gICAgICBzdGlja3lCaXRTdGlja3lPZmZzZXQ6IG8uc3RpY2t5Qml0U3RpY2t5T2Zmc2V0IHx8IDAsXG4gICAgICBwYXJlbnRDbGFzczogby5wYXJlbnRDbGFzcyB8fCAnanMtc3RpY2t5Yml0LXBhcmVudCcsXG4gICAgICBzY3JvbGxFbDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihvLnNjcm9sbEVsKSB8fCB3aW5kb3csXG4gICAgICBzdGlja3lDbGFzczogby5zdGlja3lDbGFzcyB8fCAnanMtaXMtc3RpY2t5JyxcbiAgICAgIHN0dWNrQ2xhc3M6IG8uc3R1Y2tDbGFzcyB8fCAnanMtaXMtc3R1Y2snLFxuICAgICAgc3RpY2t5Q2hhbmdlQ2xhc3M6IG8uc3RpY2t5Q2hhbmdlQ2xhc3MgfHwgJ2pzLWlzLXN0aWNreS0tY2hhbmdlJyxcbiAgICAgIHVzZVN0aWNreUNsYXNzZXM6IG8udXNlU3RpY2t5Q2xhc3NlcyB8fCBmYWxzZSxcbiAgICAgIHZlcnRpY2FsUG9zaXRpb246IG8udmVydGljYWxQb3NpdGlvbiB8fCAndG9wJ1xuICAgIH07XG4gICAgdmFyIHAgPSB0aGlzLnByb3BzO1xuICAgIC8qXG4gICAgICBkZWZpbmUgcG9zaXRpb25WYWxcbiAgICAgIC0tLS1cbiAgICAgIC0gIHVzZXMgYSBjb21wdXRlZCAoYC5kZWZpbmVQb3NpdGlvbigpYClcbiAgICAgIC0gIGRlZmluZWQgdGhlIHBvc2l0aW9uXG4gICAgKi9cblxuICAgIHAucG9zaXRpb25WYWwgPSB0aGlzLmRlZmluZVBvc2l0aW9uKCkgfHwgJ2ZpeGVkJztcbiAgICB2YXIgdnAgPSBwLnZlcnRpY2FsUG9zaXRpb247XG4gICAgdmFyIG5zID0gcC5ub1N0eWxlcztcbiAgICB2YXIgcHYgPSBwLnBvc2l0aW9uVmFsO1xuICAgIHRoaXMuZWxzID0gdHlwZW9mIHRhcmdldCA9PT0gJ3N0cmluZycgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRhcmdldCkgOiB0YXJnZXQ7XG4gICAgaWYgKCEoJ2xlbmd0aCcgaW4gdGhpcy5lbHMpKSB0aGlzLmVscyA9IFt0aGlzLmVsc107XG4gICAgdGhpcy5pbnN0YW5jZXMgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5lbHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHZhciBlbCA9IHRoaXMuZWxzW2ldO1xuICAgICAgdmFyIHN0eWxlcyA9IGVsLnN0eWxlOyAvLyBzZXQgdmVydGljYWwgcG9zaXRpb25cblxuICAgICAgc3R5bGVzW3ZwXSA9IHZwID09PSAndG9wJyAmJiAhbnMgPyBwLnN0aWNreUJpdFN0aWNreU9mZnNldCArIFwicHhcIiA6ICcnO1xuICAgICAgc3R5bGVzLnBvc2l0aW9uID0gcHYgIT09ICdmaXhlZCcgPyBwdiA6ICcnO1xuXG4gICAgICBpZiAocHYgPT09ICdmaXhlZCcgfHwgcC51c2VTdGlja3lDbGFzc2VzKSB7XG4gICAgICAgIHZhciBpbnN0YW5jZSA9IHRoaXMuYWRkSW5zdGFuY2UoZWwsIHApOyAvLyBpbnN0YW5jZXMgYXJlIGFuIGFycmF5IG9mIG9iamVjdHNcblxuICAgICAgICB0aGlzLmluc3RhbmNlcy5wdXNoKGluc3RhbmNlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvKlxuICAgIHNldFN0aWNreVBvc2l0aW9uIOKclO+4j1xuICAgIC0tLS0tLS0tXG4gICAg4oCUICBtb3N0IGJhc2ljIHRoaW5nIHN0aWNreWJpdHMgZG9lc1xuICAgID0+IGNoZWNrcyB0byBzZWUgaWYgcG9zaXRpb24gc3RpY2t5IGlzIHN1cHBvcnRlZFxuICAgID0+IGRlZmluZWQgdGhlIHBvc2l0aW9uIHRvIGJlIHVzZWRcbiAgICA9PiBzdGlja3liaXRzIHdvcmtzIGFjY29yZGluZ2x5XG4gICovXG5cblxuICB2YXIgX3Byb3RvID0gU3RpY2t5Yml0cy5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLmRlZmluZVBvc2l0aW9uID0gZnVuY3Rpb24gZGVmaW5lUG9zaXRpb24oKSB7XG4gICAgdmFyIHByZWZpeCA9IFsnJywgJy1vLScsICctd2Via2l0LScsICctbW96LScsICctbXMtJ107XG4gICAgdmFyIHRlc3QgPSBkb2N1bWVudC5oZWFkLnN0eWxlO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcmVmaXgubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHRlc3QucG9zaXRpb24gPSBwcmVmaXhbaV0gKyBcInN0aWNreVwiO1xuICAgIH1cblxuICAgIHZhciBzdGlja3lQcm9wID0gdGVzdC5wb3NpdGlvbiA/IHRlc3QucG9zaXRpb24gOiAnZml4ZWQnO1xuICAgIHRlc3QucG9zaXRpb24gPSAnJztcbiAgICByZXR1cm4gc3RpY2t5UHJvcDtcbiAgfTtcbiAgLypcbiAgICBhZGRJbnN0YW5jZSDinJTvuI9cbiAgICAtLS0tLS0tLVxuICAgIOKAlCBtYW5hZ2VzIGluc3RhbmNlcyBvZiBpdGVtc1xuICAgIC0gdGFrZXMgaW4gYW4gZWwgYW5kIHByb3BzXG4gICAgLSByZXR1cm5zIGFuIGl0ZW0gb2JqZWN0XG4gICAgLS0tXG4gICAgLSB0YXJnZXQgPSBlbFxuICAgIC0gbyA9IHtvYmplY3R9ID0gcHJvcHNcbiAgICAgIC0gc2Nyb2xsRWwgPSAnc3RyaW5nJ1xuICAgICAgLSB2ZXJ0aWNhbFBvc2l0aW9uID0gbnVtYmVyXG4gICAgICAtIG9mZiA9IGJvb2xlYW5cbiAgICAgIC0gcGFyZW50Q2xhc3MgPSAnc3RyaW5nJ1xuICAgICAgLSBzdGlja3lDbGFzcyA9ICdzdHJpbmcnXG4gICAgICAtIHN0dWNrQ2xhc3MgPSAnc3RyaW5nJ1xuICAgIC0tLVxuICAgIC0gZGVmaW5lZCBsYXRlclxuICAgICAgLSBwYXJlbnQgPSBkb20gZWxlbWVudFxuICAgICAgLSBzdGF0ZSA9ICdzdHJpbmcnXG4gICAgICAtIG9mZnNldCA9IG51bWJlclxuICAgICAgLSBzdGlja3lTdGFydCA9IG51bWJlclxuICAgICAgLSBzdGlja3lTdG9wID0gbnVtYmVyXG4gICAgLSByZXR1cm5zIGFuIGluc3RhbmNlIG9iamVjdFxuICAqL1xuXG5cbiAgX3Byb3RvLmFkZEluc3RhbmNlID0gZnVuY3Rpb24gYWRkSW5zdGFuY2UoZWwsIHByb3BzKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHZhciBpdGVtID0ge1xuICAgICAgZWw6IGVsLFxuICAgICAgcGFyZW50OiBlbC5wYXJlbnROb2RlLFxuICAgICAgcHJvcHM6IHByb3BzXG4gICAgfTtcbiAgICB0aGlzLmlzV2luID0gdGhpcy5wcm9wcy5zY3JvbGxFbCA9PT0gd2luZG93O1xuICAgIHZhciBzZSA9IHRoaXMuaXNXaW4gPyB3aW5kb3cgOiB0aGlzLmdldENsb3Nlc3RQYXJlbnQoaXRlbS5lbCwgaXRlbS5wcm9wcy5zY3JvbGxFbCk7XG4gICAgdGhpcy5jb21wdXRlU2Nyb2xsT2Zmc2V0cyhpdGVtKTtcbiAgICBpdGVtLnBhcmVudC5jbGFzc05hbWUgKz0gXCIgXCIgKyBwcm9wcy5wYXJlbnRDbGFzcztcbiAgICBpdGVtLnN0YXRlID0gJ2RlZmF1bHQnO1xuXG4gICAgaXRlbS5zdGF0ZUNvbnRhaW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5tYW5hZ2VTdGF0ZShpdGVtKTtcbiAgICB9O1xuXG4gICAgc2UuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgaXRlbS5zdGF0ZUNvbnRhaW5lcik7XG4gICAgcmV0dXJuIGl0ZW07XG4gIH07XG4gIC8qXG4gICAgLS0tLS0tLS1cbiAgICBnZXRQYXJlbnQg8J+RqOKAjVxuICAgIC0tLS0tLS0tXG4gICAgLSBhIGhlbHBlciBmdW5jdGlvbiB0aGF0IGdldHMgdGhlIHRhcmdldCBlbGVtZW50J3MgcGFyZW50IHNlbGVjdGVkIGVsXG4gICAgLSBvbmx5IHVzZWQgZm9yIG5vbiBgd2luZG93YCBzY3JvbGwgZWxlbWVudHNcbiAgICAtIHN1cHBvcnRzIG9sZGVyIGJyb3dzZXJzXG4gICovXG5cblxuICBfcHJvdG8uZ2V0Q2xvc2VzdFBhcmVudCA9IGZ1bmN0aW9uIGdldENsb3Nlc3RQYXJlbnQoZWwsIG1hdGNoKSB7XG4gICAgLy8gcCA9IHBhcmVudCBlbGVtZW50XG4gICAgdmFyIHAgPSBtYXRjaDtcbiAgICB2YXIgZSA9IGVsO1xuICAgIGlmIChlLnBhcmVudEVsZW1lbnQgPT09IHApIHJldHVybiBwOyAvLyB0cmF2ZXJzZSB1cCB0aGUgZG9tIHRyZWUgdW50aWwgd2UgZ2V0IHRvIHRoZSBwYXJlbnRcblxuICAgIHdoaWxlIChlLnBhcmVudEVsZW1lbnQgIT09IHApIHtcbiAgICAgIGUgPSBlLnBhcmVudEVsZW1lbnQ7XG4gICAgfSAvLyByZXR1cm4gcGFyZW50IGVsZW1lbnRcblxuXG4gICAgcmV0dXJuIHA7XG4gIH07XG4gIC8qXG4gICAgLS0tLS0tLS1cbiAgICBnZXRPZmZzZXRUb3BcbiAgICAtLS0tLS0tLVxuICAgIC0gYSBoZWxwZXIgZnVuY3Rpb24gdGhhdCBnZXRzIHRoZSBvZmZzZXRUb3Agb2YgdGhlIGVsZW1lbnRcbiAgICAtIGZyb20gdGhlIHRvcCBsZXZlbCBvZiB0aGUgRE9NXG4gICovXG5cblxuICBfcHJvdG8uZ2V0T2Zmc2V0VG9wID0gZnVuY3Rpb24gZ2V0T2Zmc2V0VG9wKGVsKSB7XG4gICAgdmFyIG9mZnNldFRvcCA9IDA7XG5cbiAgICBkbyB7XG4gICAgICBvZmZzZXRUb3AgPSBlbC5vZmZzZXRUb3AgKyBvZmZzZXRUb3A7XG4gICAgfSB3aGlsZSAoZWwgPSBlbC5vZmZzZXRQYXJlbnQpO1xuXG4gICAgcmV0dXJuIG9mZnNldFRvcDtcbiAgfTtcbiAgLypcbiAgICBjb21wdXRlU2Nyb2xsT2Zmc2V0cyDwn5OKXG4gICAgLS0tXG4gICAgY29tcHV0ZVNjcm9sbE9mZnNldHMgZm9yIFN0aWNreWJpdHNcbiAgICAtIGRlZmluZXNcbiAgICAgIC0gb2Zmc2V0XG4gICAgICAtIHN0YXJ0XG4gICAgICAtIHN0b3BcbiAgKi9cblxuXG4gIF9wcm90by5jb21wdXRlU2Nyb2xsT2Zmc2V0cyA9IGZ1bmN0aW9uIGNvbXB1dGVTY3JvbGxPZmZzZXRzKGl0ZW0pIHtcbiAgICB2YXIgaXQgPSBpdGVtO1xuICAgIHZhciBwID0gaXQucHJvcHM7XG4gICAgdmFyIGVsID0gaXQuZWw7XG4gICAgdmFyIHBhcmVudCA9IGl0LnBhcmVudDtcbiAgICB2YXIgaXNDdXN0b20gPSAhdGhpcy5pc1dpbiAmJiBwLnBvc2l0aW9uVmFsID09PSAnZml4ZWQnO1xuICAgIHZhciBpc0JvdHRvbSA9IHAudmVydGljYWxQb3NpdGlvbiAhPT0gJ2JvdHRvbSc7XG4gICAgdmFyIHNjcm9sbEVsT2Zmc2V0ID0gaXNDdXN0b20gPyB0aGlzLmdldE9mZnNldFRvcChwLnNjcm9sbEVsKSA6IDA7XG4gICAgdmFyIHN0aWNreVN0YXJ0ID0gaXNDdXN0b20gPyB0aGlzLmdldE9mZnNldFRvcChwYXJlbnQpIC0gc2Nyb2xsRWxPZmZzZXQgOiB0aGlzLmdldE9mZnNldFRvcChwYXJlbnQpO1xuICAgIHZhciBzdGlja3lDaGFuZ2VPZmZzZXQgPSBwLmN1c3RvbVN0aWNreUNoYW5nZU51bWJlciAhPT0gbnVsbCA/IHAuY3VzdG9tU3RpY2t5Q2hhbmdlTnVtYmVyIDogZWwub2Zmc2V0SGVpZ2h0O1xuICAgIGl0Lm9mZnNldCA9IHNjcm9sbEVsT2Zmc2V0ICsgcC5zdGlja3lCaXRTdGlja3lPZmZzZXQ7XG4gICAgaXQuc3RpY2t5U3RhcnQgPSBpc0JvdHRvbSA/IHN0aWNreVN0YXJ0IC0gaXQub2Zmc2V0IDogMDtcbiAgICBpdC5zdGlja3lDaGFuZ2UgPSBpdC5zdGlja3lTdGFydCArIHN0aWNreUNoYW5nZU9mZnNldDtcbiAgICBpdC5zdGlja3lTdG9wID0gaXNCb3R0b20gPyBzdGlja3lTdGFydCArIHBhcmVudC5vZmZzZXRIZWlnaHQgLSAoaXQuZWwub2Zmc2V0SGVpZ2h0ICsgaXQub2Zmc2V0KSA6IHN0aWNreVN0YXJ0ICsgcGFyZW50Lm9mZnNldEhlaWdodDtcbiAgICByZXR1cm4gaXQ7XG4gIH07XG4gIC8qXG4gICAgdG9nZ2xlQ2xhc3NlcyDimpbvuI9cbiAgICAtLS1cbiAgICB0b2dnbGVzIGNsYXNzZXMgKGZvciBvbGRlciBicm93c2VyIHN1cHBvcnQpXG4gICAgciA9IHJlbW92ZWQgY2xhc3NcbiAgICBhID0gYWRkZWQgY2xhc3NcbiAgKi9cblxuXG4gIF9wcm90by50b2dnbGVDbGFzc2VzID0gZnVuY3Rpb24gdG9nZ2xlQ2xhc3NlcyhlbCwgciwgYSkge1xuICAgIHZhciBlID0gZWw7XG4gICAgdmFyIGNBcnJheSA9IGUuY2xhc3NOYW1lLnNwbGl0KCcgJyk7XG4gICAgaWYgKGEgJiYgY0FycmF5LmluZGV4T2YoYSkgPT09IC0xKSBjQXJyYXkucHVzaChhKTtcbiAgICB2YXIgckl0ZW0gPSBjQXJyYXkuaW5kZXhPZihyKTtcbiAgICBpZiAockl0ZW0gIT09IC0xKSBjQXJyYXkuc3BsaWNlKHJJdGVtLCAxKTtcbiAgICBlLmNsYXNzTmFtZSA9IGNBcnJheS5qb2luKCcgJyk7XG4gIH07XG4gIC8qXG4gICAgbWFuYWdlU3RhdGUg8J+TnVxuICAgIC0tLVxuICAgIC0gZGVmaW5lcyB0aGUgc3RhdGVcbiAgICAgIC0gbm9ybWFsXG4gICAgICAtIHN0aWNreVxuICAgICAgLSBzdHVja1xuICAqL1xuXG5cbiAgX3Byb3RvLm1hbmFnZVN0YXRlID0gZnVuY3Rpb24gbWFuYWdlU3RhdGUoaXRlbSkge1xuICAgIC8vIGNhY2hlIG9iamVjdFxuICAgIHZhciBpdCA9IGl0ZW07XG4gICAgdmFyIGUgPSBpdC5lbDtcbiAgICB2YXIgcCA9IGl0LnByb3BzO1xuICAgIHZhciBzdGF0ZSA9IGl0LnN0YXRlO1xuICAgIHZhciBzdGFydCA9IGl0LnN0aWNreVN0YXJ0O1xuICAgIHZhciBjaGFuZ2UgPSBpdC5zdGlja3lDaGFuZ2U7XG4gICAgdmFyIHN0b3AgPSBpdC5zdGlja3lTdG9wO1xuICAgIHZhciBzdGwgPSBlLnN0eWxlOyAvLyBjYWNoZSBwcm9wc1xuXG4gICAgdmFyIG5zID0gcC5ub1N0eWxlcztcbiAgICB2YXIgcHYgPSBwLnBvc2l0aW9uVmFsO1xuICAgIHZhciBzZSA9IHAuc2Nyb2xsRWw7XG4gICAgdmFyIHN0aWNreSA9IHAuc3RpY2t5Q2xhc3M7XG4gICAgdmFyIHN0aWNreUNoYW5nZSA9IHAuc3RpY2t5Q2hhbmdlQ2xhc3M7XG4gICAgdmFyIHN0dWNrID0gcC5zdHVja0NsYXNzO1xuICAgIHZhciB2cCA9IHAudmVydGljYWxQb3NpdGlvbjtcbiAgICAvKlxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICAtLS1cbiAgICAgIC0gdXNlIHJBRlxuICAgICAgLSBvciBzdHViIHJBRlxuICAgICovXG5cbiAgICB2YXIgckFGU3R1YiA9IGZ1bmN0aW9uIHJBRkR1bW15KGYpIHtcbiAgICAgIGYoKTtcbiAgICB9O1xuXG4gICAgdmFyIHJBRiA9ICF0aGlzLmlzV2luID8gckFGU3R1YiA6IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fCByQUZTdHViO1xuICAgIC8qXG4gICAgICBkZWZpbmUgc2Nyb2xsIHZhcnNcbiAgICAgIC0tLVxuICAgICAgLSBzY3JvbGxcbiAgICAgIC0gbm90U3RpY2t5XG4gICAgICAtIGlzU3RpY2t5XG4gICAgICAtIGlzU3R1Y2tcbiAgICAqL1xuXG4gICAgdmFyIHRDID0gdGhpcy50b2dnbGVDbGFzc2VzO1xuICAgIHZhciBzY3JvbGwgPSB0aGlzLmlzV2luID8gd2luZG93LnNjcm9sbFkgfHwgd2luZG93LnBhZ2VZT2Zmc2V0IDogc2Uuc2Nyb2xsVG9wO1xuICAgIHZhciBub3RTdGlja3kgPSBzY3JvbGwgPiBzdGFydCAmJiBzY3JvbGwgPCBzdG9wICYmIChzdGF0ZSA9PT0gJ2RlZmF1bHQnIHx8IHN0YXRlID09PSAnc3R1Y2snKTtcbiAgICB2YXIgaXNTdGlja3kgPSBzY3JvbGwgPD0gc3RhcnQgJiYgc3RhdGUgPT09ICdzdGlja3knO1xuICAgIHZhciBpc1N0dWNrID0gc2Nyb2xsID49IHN0b3AgJiYgc3RhdGUgPT09ICdzdGlja3knO1xuICAgIC8qXG4gICAgICBVbm5hbWVkIGFycm93IGZ1bmN0aW9ucyB3aXRoaW4gdGhpcyBibG9ja1xuICAgICAgLS0tXG4gICAgICAtIGhlbHAgd2FudGVkIG9yIGRpc2N1c3Npb25cbiAgICAgIC0gdmlldyB0ZXN0LnN0aWNreWJpdHMuanNcbiAgICAgICAgLSBgc3RpY2t5Yml0cyAubWFuYWdlU3RhdGUgIGBwb3NpdGlvbjogZml4ZWRgIGludGVyZmFjZWAgZm9yIG1vcmUgYXdhcmVuZXNzIPCfkYBcbiAgICAqL1xuXG4gICAgaWYgKG5vdFN0aWNreSkge1xuICAgICAgaXQuc3RhdGUgPSAnc3RpY2t5JztcbiAgICAgIHJBRihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRDKGUsIHN0dWNrLCBzdGlja3kpO1xuICAgICAgICBzdGwucG9zaXRpb24gPSBwdjtcbiAgICAgICAgaWYgKG5zKSByZXR1cm47XG4gICAgICAgIHN0bC5ib3R0b20gPSAnJztcbiAgICAgICAgc3RsW3ZwXSA9IHAuc3RpY2t5Qml0U3RpY2t5T2Zmc2V0ICsgXCJweFwiO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChpc1N0aWNreSkge1xuICAgICAgaXQuc3RhdGUgPSAnZGVmYXVsdCc7XG4gICAgICByQUYoZnVuY3Rpb24gKCkge1xuICAgICAgICB0QyhlLCBzdGlja3kpO1xuICAgICAgICBpZiAocHYgPT09ICdmaXhlZCcpIHN0bC5wb3NpdGlvbiA9ICcnO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChpc1N0dWNrKSB7XG4gICAgICBpdC5zdGF0ZSA9ICdzdHVjayc7XG4gICAgICByQUYoZnVuY3Rpb24gKCkge1xuICAgICAgICB0QyhlLCBzdGlja3ksIHN0dWNrKTtcbiAgICAgICAgaWYgKHB2ICE9PSAnZml4ZWQnIHx8IG5zKSByZXR1cm47XG4gICAgICAgIHN0bC50b3AgPSAnJztcbiAgICAgICAgc3RsLmJvdHRvbSA9ICcwJztcbiAgICAgICAgc3RsLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhciBpc1N0aWNreUNoYW5nZSA9IHNjcm9sbCA+PSBjaGFuZ2UgJiYgc2Nyb2xsIDw9IHN0b3A7XG4gICAgdmFyIGlzTm90U3RpY2t5Q2hhbmdlID0gc2Nyb2xsIDwgY2hhbmdlIHx8IHNjcm9sbCA+IHN0b3A7XG4gICAgdmFyIHN0dWIgPSAnc3R1Yic7IC8vIGEgc3R1YiBjc3MgY2xhc3MgdG8gcmVtb3ZlXG5cbiAgICBpZiAoaXNOb3RTdGlja3lDaGFuZ2UpIHtcbiAgICAgIHJBRihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRDKGUsIHN0aWNreUNoYW5nZSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGlzU3RpY2t5Q2hhbmdlKSB7XG4gICAgICByQUYoZnVuY3Rpb24gKCkge1xuICAgICAgICB0QyhlLCBzdHViLCBzdGlja3lDaGFuZ2UpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGl0O1xuICB9O1xuXG4gIF9wcm90by51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmluc3RhbmNlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgdmFyIGluc3RhbmNlID0gdGhpcy5pbnN0YW5jZXNbaV07XG4gICAgICB0aGlzLmNvbXB1dGVTY3JvbGxPZmZzZXRzKGluc3RhbmNlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgLypcbiAgICByZW1vdmVzIGFuIGluc3RhbmNlIPCfkYtcbiAgICAtLS0tLS0tLVxuICAgIC0gY2xlYW51cCBpbnN0YW5jZVxuICAqL1xuXG5cbiAgX3Byb3RvLnJlbW92ZUluc3RhbmNlID0gZnVuY3Rpb24gcmVtb3ZlSW5zdGFuY2UoaW5zdGFuY2UpIHtcbiAgICB2YXIgZSA9IGluc3RhbmNlLmVsO1xuICAgIHZhciBwID0gaW5zdGFuY2UucHJvcHM7XG4gICAgdmFyIHRDID0gdGhpcy50b2dnbGVDbGFzc2VzO1xuICAgIGUuc3R5bGUucG9zaXRpb24gPSAnJztcbiAgICBlLnN0eWxlW3AudmVydGljYWxQb3NpdGlvbl0gPSAnJztcbiAgICB0QyhlLCBwLnN0aWNreUNsYXNzKTtcbiAgICB0QyhlLCBwLnN0dWNrQ2xhc3MpO1xuICAgIHRDKGUucGFyZW50Tm9kZSwgcC5wYXJlbnRDbGFzcyk7XG4gIH07XG4gIC8qXG4gICAgY2xlYW51cCDwn5uBXG4gICAgLS0tLS0tLS1cbiAgICAtIGNsZWFucyB1cCBlYWNoIGluc3RhbmNlXG4gICAgLSBjbGVhcnMgaW5zdGFuY2VcbiAgKi9cblxuXG4gIF9wcm90by5jbGVhbnVwID0gZnVuY3Rpb24gY2xlYW51cCgpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaW5zdGFuY2VzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICB2YXIgaW5zdGFuY2UgPSB0aGlzLmluc3RhbmNlc1tpXTtcbiAgICAgIGluc3RhbmNlLnByb3BzLnNjcm9sbEVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGluc3RhbmNlLnN0YXRlQ29udGFpbmVyKTtcbiAgICAgIHRoaXMucmVtb3ZlSW5zdGFuY2UoaW5zdGFuY2UpO1xuICAgIH1cblxuICAgIHRoaXMubWFuYWdlU3RhdGUgPSBmYWxzZTtcbiAgICB0aGlzLmluc3RhbmNlcyA9IFtdO1xuICB9O1xuXG4gIHJldHVybiBTdGlja3liaXRzO1xufSgpO1xuLypcbiAgZXhwb3J0XG4gIC0tLS0tLS0tXG4gIGV4cG9ydHMgU3RpY2tCaXRzIHRvIGJlIHVzZWQg8J+PgVxuKi9cblxuXG5mdW5jdGlvbiBzdGlja3liaXRzKHRhcmdldCwgbykge1xuICByZXR1cm4gbmV3IFN0aWNreWJpdHModGFyZ2V0LCBvKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3RpY2t5Yml0cztcbiIsIi8qKlxuICogU2lkZSBuYXZpZ2F0aW9uIHJlbGF0ZWQgYmVoYXZpb3JzLlxuICovXG5cbmltcG9ydCBzdGlja3liaXRzIGZyb20gJ3N0aWNreWJpdHMnO1xuXG4vKipcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIE9iamVjdCBjb250YWluaW5nIGNvbmZpZ3VyYXRpb24gb3ZlcnJpZGVzXG4gKi9cbmV4cG9ydCBjb25zdCBuYXZpZ2F0aW9uU2lkZSA9ICh7XG4gIHN0aWNreVNlbGVjdG9yOiBzdGlja3lTZWxlY3RvciA9ICcuZWNsLXNpZGUtbmF2aWdhdGlvbl9fdG9nZ2xlJyxcbiAgYWN0aXZlU2VsZWN0b3I6IGFjdGl2ZVNlbGVjdG9yID0gJy5lY2wtc2lkZS1uYXZpZ2F0aW9uX19saW5rLS1hY3RpdmUnLFxufSA9IHt9KSA9PiB7XG4gIC8vIFNVUFBPUlRTXG4gIGlmIChcbiAgICAhKCdxdWVyeVNlbGVjdG9yJyBpbiBkb2N1bWVudCkgfHxcbiAgICAhKCdhZGRFdmVudExpc3RlbmVyJyBpbiB3aW5kb3cpIHx8XG4gICAgIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3RcbiAgKVxuICAgIHJldHVybiBudWxsO1xuXG4gIC8vIEFDVElPTlNcbiAgZnVuY3Rpb24gaW5pdFN0aWNreSgpIHtcbiAgICAvLyBpbml0IHN0aWNreSBtZW51XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gICAgc3RpY2t5Yml0cyhzdGlja3lTZWxlY3RvciwgeyB1c2VTdGlja3lDbGFzc2VzOiB0cnVlIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gc2Nyb2xsVG9Ub3AoKSB7XG4gICAgY29uc3QgdG9nZ2xlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcbiAgICAgIHN0aWNreVNlbGVjdG9yLnN1YnN0cmluZygxKVxuICAgIClbMF07XG5cbiAgICBpZiAodG9nZ2xlKSB7XG4gICAgICB0b2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgICAgaWYgKGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcpID09PSAnZmFsc2UnKSB7XG4gICAgICAgICAgZS50YXJnZXQuc2Nyb2xsSW50b1ZpZXcoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdW5mb2xkVG9BY3RpdmUoKSB7XG4gICAgY29uc3QgYWN0aXZlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcbiAgICAgIGFjdGl2ZVNlbGVjdG9yLnN1YnN0cmluZygxKVxuICAgIClbMF07XG5cbiAgICAvLyBCcm93c2UgcGFyZW50c1xuICAgIGlmIChhY3RpdmUpIHtcbiAgICAgIGxldCBub2RlID0gYWN0aXZlO1xuICAgICAgY29uc3QgZWxzID0gW107XG4gICAgICB3aGlsZSAobm9kZSkge1xuICAgICAgICBlbHMudW5zaGlmdChub2RlKTtcbiAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcblxuICAgICAgICAvLyBDaGVjayBpZiBwYXJlbnQgaXMgYW4gZXhwYW5kYWJsZSBtZW51IGl0ZW1cbiAgICAgICAgaWYgKG5vZGUubWF0Y2hlcygnLmVjbC1zaWRlLW5hdmlnYXRpb25fX2dyb3VwJykpIHtcbiAgICAgICAgICBjb25zdCBsaW5rID0gbm9kZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgIGlmIChsaW5rLm1hdGNoZXMoJy5lY2wtc2lkZS1uYXZpZ2F0aW9uX19saW5rJykpIHtcbiAgICAgICAgICAgIGxpbmsuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ3RydWUnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBObyBuZWVkIHRvIGNoZWNrIG91dHNpZGUgb2YgbWVudVxuICAgICAgICBpZiAobm9kZS5tYXRjaGVzKCcuZWNsLXNpZGUtbmF2aWdhdGlvbicpKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBJTklUXG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgaW5pdFN0aWNreSgpO1xuICAgIHNjcm9sbFRvVG9wKCk7XG4gICAgdW5mb2xkVG9BY3RpdmUoKTtcbiAgfVxuXG4gIGluaXQoKTtcblxuICAvLyBSRVZFQUwgQVBJXG4gIHJldHVybiB7XG4gICAgaW5pdCxcbiAgfTtcbn07XG5cbi8vIG1vZHVsZSBleHBvcnRzXG5leHBvcnQgZGVmYXVsdCBuYXZpZ2F0aW9uU2lkZTtcbiIsIi8qKlxuICogVGFibGVzIHJlbGF0ZWQgYmVoYXZpb3JzLlxuICovXG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZXhwZWN0ZWQtbXVsdGlsaW5lICovXG5cbmV4cG9ydCBmdW5jdGlvbiBlY2xUYWJsZXMoZWxlbWVudHMgPSBudWxsKSB7XG4gIGNvbnN0IHRhYmxlcyA9XG4gICAgZWxlbWVudHMgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZWNsLXRhYmxlLS1yZXNwb25zaXZlJyk7XG4gIFtdLmZvckVhY2guY2FsbCh0YWJsZXMsIHRhYmxlID0+IHtcbiAgICBjb25zdCBoZWFkZXJUZXh0ID0gW107XG4gICAgbGV0IHRleHRDb2xzcGFuID0gJyc7XG4gICAgbGV0IGNpID0gMDtcbiAgICBsZXQgY24gPSBbXTtcblxuICAgIC8vIFRoZSByb3dzIGluIGEgdGFibGUgYm9keS5cbiAgICBjb25zdCB0YWJsZVJvd3MgPSB0YWJsZS5xdWVyeVNlbGVjdG9yQWxsKCd0Ym9keSB0cicpO1xuXG4gICAgLy8gVGhlIGhlYWRlcnMgaW4gYSB0YWJsZS5cbiAgICBjb25zdCBoZWFkZXJzID0gdGFibGUucXVlcnlTZWxlY3RvckFsbCgndGhlYWQgdHIgdGgnKTtcblxuICAgIC8vIFRoZSBudW1iZXIgb2YgbWFpbiBoZWFkZXJzLlxuICAgIGNvbnN0IGhlYWRGaXJzdCA9XG4gICAgICB0YWJsZS5xdWVyeVNlbGVjdG9yQWxsKCd0aGVhZCB0cicpWzBdLnF1ZXJ5U2VsZWN0b3JBbGwoJ3RoJykubGVuZ3RoIC0gMTtcblxuICAgIC8vIE51bWJlciBvZiBjZWxscyBwZXIgcm93LlxuICAgIGNvbnN0IGNlbGxQZXJSb3cgPSB0YWJsZVxuICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJ3Rib2R5IHRyJylbMF1cbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKCd0ZCcpLmxlbmd0aDtcblxuICAgIC8vIFBvc2l0aW9uIG9mIHRoZSBldmVudHVhbCBjb2xzcGFuIGVsZW1lbnQuXG4gICAgbGV0IGNvbHNwYW5JbmRleCA9IC0xO1xuXG4gICAgLy8gQnVpbGQgdGhlIGFycmF5IHdpdGggYWxsIHRoZSBcImxhYmVsc1wiXG4gICAgLy8gQWxzbyBnZXQgcG9zaXRpb24gb2YgdGhlIGV2ZW50dWFsIGNvbHNwYW4gZWxlbWVudFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGVhZGVycy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKGhlYWRlcnNbaV0uZ2V0QXR0cmlidXRlKCdjb2xzcGFuJykpIHtcbiAgICAgICAgY29sc3BhbkluZGV4ID0gaTtcbiAgICAgIH1cblxuICAgICAgaGVhZGVyVGV4dFtpXSA9IFtdO1xuICAgICAgaGVhZGVyVGV4dFtpXSA9IGhlYWRlcnNbaV0udGV4dENvbnRlbnQ7XG4gICAgfVxuXG4gICAgLy8gSWYgd2UgaGF2ZSBhIGNvbHNwYW4sIHdlIGhhdmUgdG8gcHJlcGFyZSB0aGUgZGF0YSBmb3IgaXQuXG4gICAgaWYgKGNvbHNwYW5JbmRleCAhPT0gLTEpIHtcbiAgICAgIHRleHRDb2xzcGFuID0gaGVhZGVyVGV4dC5zcGxpY2UoY29sc3BhbkluZGV4LCAxKTtcbiAgICAgIGNpID0gY29sc3BhbkluZGV4O1xuICAgICAgY24gPSB0YWJsZS5xdWVyeVNlbGVjdG9yQWxsKCd0aFtjb2xzcGFuXScpWzBdLmdldEF0dHJpYnV0ZSgnY29sc3BhbicpO1xuXG4gICAgICBmb3IgKGxldCBjID0gMDsgYyA8IGNuOyBjICs9IDEpIHtcbiAgICAgICAgaGVhZGVyVGV4dC5zcGxpY2UoY2kgKyBjLCAwLCBoZWFkZXJUZXh0W2hlYWRGaXJzdCArIGNdKTtcbiAgICAgICAgaGVhZGVyVGV4dC5zcGxpY2UoaGVhZEZpcnN0ICsgMSArIGMsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEZvciBldmVyeSByb3csIHNldCB0aGUgYXR0cmlidXRlcyB3ZSB1c2UgdG8gbWFrZSB0aGlzIGhhcHBlbi5cbiAgICBbXS5mb3JFYWNoLmNhbGwodGFibGVSb3dzLCByb3cgPT4ge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjZWxsUGVyUm93OyBqICs9IDEpIHtcbiAgICAgICAgaWYgKGhlYWRlclRleHRbal0gPT09ICcnIHx8IGhlYWRlclRleHRbal0gPT09ICdcXHUwMGEwJykge1xuICAgICAgICAgIHJvd1xuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJ3RkJylcbiAgICAgICAgICAgIFtqXS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2VjbC10YWJsZV9faGVhZGluZycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJvdy5xdWVyeVNlbGVjdG9yQWxsKCd0ZCcpW2pdLnNldEF0dHJpYnV0ZSgnZGF0YS10aCcsIGhlYWRlclRleHRbal0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbHNwYW5JbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICBjb25zdCBjZWxsID0gcm93LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RkJylbY29sc3BhbkluZGV4XTtcbiAgICAgICAgICBjZWxsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZWNsLXRhYmxlX19ncm91cC1sYWJlbCcpO1xuICAgICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKCdkYXRhLXRoLWdyb3VwJywgdGV4dENvbHNwYW4pO1xuXG4gICAgICAgICAgZm9yIChsZXQgYyA9IDE7IGMgPCBjbjsgYyArPSAxKSB7XG4gICAgICAgICAgICByb3dcbiAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJ3RkJylcbiAgICAgICAgICAgICAgW2NvbHNwYW5JbmRleCArIGNdLnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgICAgICAnY2xhc3MnLFxuICAgICAgICAgICAgICAgICdlY2wtdGFibGVfX2dyb3VwX2VsZW1lbnQnXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBlY2xUYWJsZXM7XG4iLCIvLyBIZWF2aWx5IGluc3BpcmVkIGJ5IHRoZSB0YWIgY29tcG9uZW50IGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2ZyZW5kL2ZyZW5kLmNvXG5cbmltcG9ydCB7IHF1ZXJ5QWxsIH0gZnJvbSAnQGVjbC9lYy1iYXNlL2hlbHBlcnMvZG9tJztcblxuLyoqXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyBPYmplY3QgY29udGFpbmluZyBjb25maWd1cmF0aW9uIG92ZXJyaWRlc1xuICovXG5leHBvcnQgY29uc3QgdGFicyA9ICh7XG4gIHNlbGVjdG9yOiBzZWxlY3RvciA9ICcuZWNsLXRhYnMnLFxuICB0YWJsaXN0U2VsZWN0b3I6IHRhYmxpc3RTZWxlY3RvciA9ICcuZWNsLXRhYnNfX3RhYmxpc3QnLFxuICB0YWJwYW5lbFNlbGVjdG9yOiB0YWJwYW5lbFNlbGVjdG9yID0gJy5lY2wtdGFic19fdGFicGFuZWwnLFxuICB0YWJlbGVtZW50c1NlbGVjdG9yOiB0YWJlbGVtZW50c1NlbGVjdG9yID0gYCR7dGFibGlzdFNlbGVjdG9yfSBsaWAsXG59ID0ge30pID0+IHtcbiAgLy8gU1VQUE9SVFNcbiAgaWYgKFxuICAgICEoJ3F1ZXJ5U2VsZWN0b3InIGluIGRvY3VtZW50KSB8fFxuICAgICEoJ2FkZEV2ZW50TGlzdGVuZXInIGluIHdpbmRvdykgfHxcbiAgICAhZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdFxuICApXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgLy8gU0VUVVBcbiAgLy8gc2V0IHRhYiBlbGVtZW50IE5vZGVMaXN0XG4gIGNvbnN0IHRhYkNvbnRhaW5lcnMgPSBxdWVyeUFsbChzZWxlY3Rvcik7XG5cbiAgLy8gQUNUSU9OU1xuICBmdW5jdGlvbiBzaG93VGFiKHRhcmdldCwgZ2l2ZUZvY3VzID0gdHJ1ZSkge1xuICAgIGNvbnN0IHNpYmxpbmdUYWJzID0gcXVlcnlBbGwoXG4gICAgICBgJHt0YWJsaXN0U2VsZWN0b3J9IGxpYCxcbiAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnRcbiAgICApO1xuICAgIGNvbnN0IHNpYmxpbmdUYWJwYW5lbHMgPSBxdWVyeUFsbChcbiAgICAgIHRhYnBhbmVsU2VsZWN0b3IsXG4gICAgICB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50XG4gICAgKTtcblxuICAgIC8vIHNldCBpbmFjdGl2ZXNcbiAgICBzaWJsaW5nVGFicy5mb3JFYWNoKHRhYiA9PiB7XG4gICAgICB0YWIuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIC0xKTtcbiAgICAgIHRhYi5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnKTtcbiAgICB9KTtcblxuICAgIHNpYmxpbmdUYWJwYW5lbHMuZm9yRWFjaCh0YWJwYW5lbCA9PiB7XG4gICAgICB0YWJwYW5lbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICB9KTtcblxuICAgIC8vIHNldCBhY3RpdmVzIGFuZCBmb2N1c1xuICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgMCk7XG4gICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICd0cnVlJyk7XG4gICAgaWYgKGdpdmVGb2N1cykgdGFyZ2V0LmZvY3VzKCk7XG4gICAgZG9jdW1lbnRcbiAgICAgIC5nZXRFbGVtZW50QnlJZCh0YXJnZXQuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJykpXG4gICAgICAucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWhpZGRlbicpO1xuICB9XG5cbiAgLy8gRVZFTlRTXG4gIGZ1bmN0aW9uIGV2ZW50VGFiQ2xpY2soZSkge1xuICAgIHNob3dUYWIoZS5jdXJyZW50VGFyZ2V0KTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7IC8vIGxvb2sgaW50byByZW1vdmUgaWQvc2V0dGltZW91dC9yZWluc3RhdGUgaWQgYXMgYW4gYWx0ZXJuYXRpdmUgdG8gcHJldmVudERlZmF1bHRcbiAgfVxuXG4gIGZ1bmN0aW9uIGV2ZW50VGFiS2V5ZG93bihlKSB7XG4gICAgLy8gY29sbGVjdCB0YWIgdGFyZ2V0cywgYW5kIHRoZWlyIHBhcmVudHMnIHByZXYvbmV4dCAob3IgZmlyc3QvbGFzdClcbiAgICBjb25zdCBjdXJyZW50VGFiID0gZS5jdXJyZW50VGFyZ2V0O1xuICAgIGNvbnN0IHByZXZpb3VzVGFiSXRlbSA9XG4gICAgICBjdXJyZW50VGFiLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgfHxcbiAgICAgIGN1cnJlbnRUYWIucGFyZW50RWxlbWVudC5sYXN0RWxlbWVudENoaWxkO1xuICAgIGNvbnN0IG5leHRUYWJJdGVtID1cbiAgICAgIGN1cnJlbnRUYWIubmV4dEVsZW1lbnRTaWJsaW5nIHx8XG4gICAgICBjdXJyZW50VGFiLnBhcmVudEVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQ7XG5cbiAgICAvLyBkb24ndCBjYXRjaCBrZXkgZXZlbnRzIHdoZW4g4oyYIG9yIEFsdCBtb2RpZmllciBpcyBwcmVzZW50XG4gICAgaWYgKGUubWV0YUtleSB8fCBlLmFsdEtleSkgcmV0dXJuO1xuXG4gICAgLy8gY2F0Y2ggbGVmdC9yaWdodCBhbmQgdXAvZG93biBhcnJvdyBrZXkgZXZlbnRzXG4gICAgLy8gaWYgbmV3IG5leHQvcHJldiB0YWIgYXZhaWxhYmxlLCBzaG93IGl0IGJ5IHBhc3NpbmcgdGFiIGFuY2hvciB0byBzaG93VGFiIG1ldGhvZFxuICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICBjYXNlIDM3OlxuICAgICAgY2FzZSAzODpcbiAgICAgICAgc2hvd1RhYihwcmV2aW91c1RhYkl0ZW0pO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOTpcbiAgICAgIGNhc2UgNDA6XG4gICAgICAgIHNob3dUYWIobmV4dFRhYkl0ZW0pO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLy8gQklORElOR1NcbiAgZnVuY3Rpb24gYmluZFRhYnNFdmVudHModGFiQ29udGFpbmVyKSB7XG4gICAgY29uc3QgdGFic0VsZW1lbnRzID0gcXVlcnlBbGwodGFiZWxlbWVudHNTZWxlY3RvciwgdGFiQ29udGFpbmVyKTtcbiAgICAvLyBiaW5kIGFsbCB0YWIgY2xpY2sgYW5kIGtleWRvd24gZXZlbnRzXG4gICAgdGFic0VsZW1lbnRzLmZvckVhY2godGFiID0+IHtcbiAgICAgIHRhYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50VGFiQ2xpY2spO1xuICAgICAgdGFiLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBldmVudFRhYktleWRvd24pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gdW5iaW5kVGFic0V2ZW50cyh0YWJDb250YWluZXIpIHtcbiAgICBjb25zdCB0YWJzRWxlbWVudHMgPSBxdWVyeUFsbCh0YWJlbGVtZW50c1NlbGVjdG9yLCB0YWJDb250YWluZXIpO1xuICAgIC8vIHVuYmluZCBhbGwgdGFiIGNsaWNrIGFuZCBrZXlkb3duIGV2ZW50c1xuICAgIHRhYnNFbGVtZW50cy5mb3JFYWNoKHRhYiA9PiB7XG4gICAgICB0YWIucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudFRhYkNsaWNrKTtcbiAgICAgIHRhYi5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZXZlbnRUYWJLZXlkb3duKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIERFU1RST1lcbiAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICB0YWJDb250YWluZXJzLmZvckVhY2godW5iaW5kVGFic0V2ZW50cyk7XG4gIH1cblxuICAvLyBJTklUXG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgdGFiQ29udGFpbmVycy5mb3JFYWNoKGJpbmRUYWJzRXZlbnRzKTtcbiAgfVxuXG4gIC8vIEF1dG9tYXRpY2FsbHkgaW5pdFxuICBpbml0KCk7XG5cbiAgLy8gUkVWRUFMIEFQSVxuICByZXR1cm4ge1xuICAgIGluaXQsXG4gICAgZGVzdHJveSxcbiAgfTtcbn07XG5cbi8vIG1vZHVsZSBleHBvcnRzXG5leHBvcnQgZGVmYXVsdCB0YWJzO1xuIiwiLyoqXG4gKiBUaW1lbGluZVxuICovXG5cbmNvbnN0IGV4cGFuZFRpbWVsaW5lID0gKFxuICB0aW1lbGluZSxcbiAgYnV0dG9uLFxuICB7XG4gICAgY2xhc3NUb1JlbW92ZSA9ICdlY2wtdGltZWxpbmVfX2l0ZW0tLW92ZXItbGltaXQnLFxuICAgIGhpZGRlbkVsZW1lbnRzU2VsZWN0b3IgPSAnLmVjbC10aW1lbGluZV9faXRlbS0tb3Zlci1saW1pdCcsXG4gIH0gPSB7fVxuKSA9PiB7XG4gIGlmICghdGltZWxpbmUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBoaWRkZW5FbGVtZW50cyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKFxuICAgIHRpbWVsaW5lLnF1ZXJ5U2VsZWN0b3JBbGwoaGlkZGVuRWxlbWVudHNTZWxlY3RvcilcbiAgKTtcblxuICAvLyBSZW1vdmUgZXh0cmEgY2xhc3NcbiAgaGlkZGVuRWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NUb1JlbW92ZSk7XG4gIH0pO1xuXG4gIC8vIFJlbW92ZSBidXR0dG9uXG4gIGJ1dHRvbi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGJ1dHRvbik7XG59O1xuXG4vLyBIZWxwZXIgbWV0aG9kIHRvIGF1dG9tYXRpY2FsbHkgYXR0YWNoIHRoZSBldmVudCBsaXN0ZW5lciB0byBhbGwgdGhlIGV4cGFuZGFibGVzIG9uIHBhZ2UgbG9hZFxuZXhwb3J0IGNvbnN0IHRpbWVsaW5lcyA9ICh7XG4gIHNlbGVjdG9yID0gJy5lY2wtdGltZWxpbmUnLFxuICBidXR0b25TZWxlY3RvciA9ICcuZWNsLXRpbWVsaW5lX19idXR0b24nLFxuICBoaWRkZW5FbGVtZW50c1NlbGVjdG9yID0gJy5lY2wtdGltZWxpbmVfX2l0ZW0tLW92ZXItbGltaXQnLFxuICBjbGFzc1RvUmVtb3ZlID0gJ2VjbC10aW1lbGluZV9faXRlbS0tb3Zlci1saW1pdCcsXG4gIGNvbnRleHQgPSBkb2N1bWVudCxcbn0gPSB7fSkgPT4ge1xuICBjb25zdCBub2Rlc0FycmF5ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoXG4gICAgY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKVxuICApO1xuXG4gIG5vZGVzQXJyYXkuZm9yRWFjaChub2RlID0+IHtcbiAgICBjb25zdCBidXR0b24gPSBjb250ZXh0LnF1ZXJ5U2VsZWN0b3IoYnV0dG9uU2VsZWN0b3IpO1xuXG4gICAgaWYgKGJ1dHRvbikge1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT5cbiAgICAgICAgZXhwYW5kVGltZWxpbmUobm9kZSwgYnV0dG9uLCB7IGNsYXNzVG9SZW1vdmUsIGhpZGRlbkVsZW1lbnRzU2VsZWN0b3IgfSlcbiAgICAgICk7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHRpbWVsaW5lcztcbiIsIi8qKlxuICogVGltZWxpbmVcbiAqL1xuXG5leHBvcnQgKiBmcm9tICdAZWNsL2dlbmVyaWMtY29tcG9uZW50LXRpbWVsaW5lJztcbiIsIi8vIEV4cG9ydCBjb21wb25lbnRzXG5cbmV4cG9ydCAqIGZyb20gJ0BlY2wvZWMtY29tcG9uZW50LWFjY29yZGlvbic7XG5leHBvcnQgKiBmcm9tICdAZWNsL2VjLWNvbXBvbmVudC1icmVhZGNydW1iJztcbmV4cG9ydCAqIGZyb20gJ0BlY2wvZWMtY29tcG9uZW50LWNhcm91c2VsJztcbmV4cG9ydCAqIGZyb20gJ0BlY2wvZWMtY29tcG9uZW50LWNvbnRleHQtbmF2JztcbmV4cG9ydCAqIGZyb20gJ0BlY2wvZWMtY29tcG9uZW50LWRyb3Bkb3duJztcbmV4cG9ydCAqIGZyb20gJ0BlY2wvZWMtY29tcG9uZW50LWRpYWxvZyc7XG5leHBvcnQgKiBmcm9tICdAZWNsL2VjLWNvbXBvbmVudC1leHBhbmRhYmxlJztcbmV4cG9ydCAqIGZyb20gJ0BlY2wvZWMtY29tcG9uZW50LWZvcm0tZmlsZS11cGxvYWQnO1xuZXhwb3J0ICogZnJvbSAnQGVjbC9lYy1jb21wb25lbnQtbGFuZy1zZWxlY3QtcGFnZSc7XG5leHBvcnQgKiBmcm9tICdAZWNsL2VjLWNvbXBvbmVudC1tZXNzYWdlJztcbmV4cG9ydCAqIGZyb20gJ0BlY2wvZWMtY29tcG9uZW50LWlucGFnZS1uYXZpZ2F0aW9uJztcbmV4cG9ydCAqIGZyb20gJ0BlY2wvZWMtY29tcG9uZW50LW5hdmlnYXRpb24tbWVudSc7XG5leHBvcnQgKiBmcm9tICdAZWNsL2VjLWNvbXBvbmVudC1zaWRlLW5hdmlnYXRpb24nO1xuZXhwb3J0ICogZnJvbSAnQGVjbC9lYy1jb21wb25lbnQtdGFibGUnO1xuZXhwb3J0ICogZnJvbSAnQGVjbC9lYy1jb21wb25lbnQtdGFiJztcbmV4cG9ydCAqIGZyb20gJ0BlY2wvZWMtY29tcG9uZW50LXRpbWVsaW5lJztcbiIsIi8vIEV4cG9ydCBjb21wb25lbnRzXG5cbmV4cG9ydCAqIGZyb20gJ0BlY2wvZWMtcHJlc2V0LWZ1bGwnO1xuIl0sIm5hbWVzIjpbInF1ZXJ5QWxsIiwic2VsZWN0b3IiLCJjb250ZXh0IiwiZG9jdW1lbnQiLCJzbGljZSIsImNhbGwiLCJxdWVyeVNlbGVjdG9yQWxsIiwiYWNjb3JkaW9ucyIsImhlYWRlclNlbGVjdG9yIiwid2luZG93IiwiZG9jdW1lbnRFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWNjb3JkaW9uQ29udGFpbmVycyIsImhpZGVQYW5lbCIsInRhcmdldCIsImFjdGl2ZVBhbmVsIiwiZ2V0RWxlbWVudEJ5SWQiLCJnZXRBdHRyaWJ1dGUiLCJzZXRBdHRyaWJ1dGUiLCJzaG93UGFuZWwiLCJ0b2dnbGVQYW5lbCIsImdpdmVIZWFkZXJGb2N1cyIsImhlYWRlclNldCIsImkiLCJmb2N1cyIsImV2ZW50SGVhZGVyQ2xpY2siLCJlIiwiY3VycmVudFRhcmdldCIsImV2ZW50SGVhZGVyS2V5ZG93biIsImN1cnJlbnRIZWFkZXIiLCJpc01vZGlmaWVyS2V5IiwibWV0YUtleSIsImFsdEtleSIsInRoaXNDb250YWluZXIiLCJwYXJlbnROb2RlIiwidGhlc2VIZWFkZXJzIiwiY3VycmVudEhlYWRlckluZGV4IiwiaW5kZXhPZiIsImtleUNvZGUiLCJwcmV2ZW50RGVmYXVsdCIsInByZXZpb3VzSGVhZGVySW5kZXgiLCJsZW5ndGgiLCJuZXh0SGVhZGVySW5kZXgiLCJiaW5kQWNjb3JkaW9uRXZlbnRzIiwiYWNjb3JkaW9uQ29udGFpbmVyIiwiYWNjb3JkaW9uSGVhZGVycyIsImZvckVhY2giLCJhY2NvcmRpb25IZWFkZXIiLCJhZGRFdmVudExpc3RlbmVyIiwidW5iaW5kQWNjb3JkaW9uRXZlbnRzIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImRlc3Ryb3kiLCJpbml0IiwiRlVOQ19FUlJPUl9URVhUIiwiTkFOIiwic3ltYm9sVGFnIiwicmVUcmltIiwicmVJc0JhZEhleCIsInJlSXNCaW5hcnkiLCJyZUlzT2N0YWwiLCJmcmVlUGFyc2VJbnQiLCJwYXJzZUludCIsImZyZWVHbG9iYWwiLCJiYWJlbEhlbHBlcnMudHlwZW9mIiwiZ2xvYmFsIiwiT2JqZWN0IiwiZnJlZVNlbGYiLCJzZWxmIiwicm9vdCIsIkZ1bmN0aW9uIiwib2JqZWN0UHJvdG8iLCJwcm90b3R5cGUiLCJvYmplY3RUb1N0cmluZyIsInRvU3RyaW5nIiwibmF0aXZlTWF4IiwiTWF0aCIsIm1heCIsIm5hdGl2ZU1pbiIsIm1pbiIsIm5vdyIsIkRhdGUiLCJkZWJvdW5jZSIsImZ1bmMiLCJ3YWl0Iiwib3B0aW9ucyIsImxhc3RBcmdzIiwibGFzdFRoaXMiLCJtYXhXYWl0IiwicmVzdWx0IiwidGltZXJJZCIsImxhc3RDYWxsVGltZSIsImxhc3RJbnZva2VUaW1lIiwibGVhZGluZyIsIm1heGluZyIsInRyYWlsaW5nIiwiVHlwZUVycm9yIiwidG9OdW1iZXIiLCJpc09iamVjdCIsImludm9rZUZ1bmMiLCJ0aW1lIiwiYXJncyIsInRoaXNBcmciLCJ1bmRlZmluZWQiLCJhcHBseSIsImxlYWRpbmdFZGdlIiwic2V0VGltZW91dCIsInRpbWVyRXhwaXJlZCIsInJlbWFpbmluZ1dhaXQiLCJ0aW1lU2luY2VMYXN0Q2FsbCIsInRpbWVTaW5jZUxhc3RJbnZva2UiLCJzaG91bGRJbnZva2UiLCJ0cmFpbGluZ0VkZ2UiLCJjYW5jZWwiLCJjbGVhclRpbWVvdXQiLCJmbHVzaCIsImRlYm91bmNlZCIsImlzSW52b2tpbmciLCJhcmd1bWVudHMiLCJ2YWx1ZSIsInR5cGUiLCJpc09iamVjdExpa2UiLCJpc1N5bWJvbCIsIm90aGVyIiwidmFsdWVPZiIsInJlcGxhY2UiLCJpc0JpbmFyeSIsInRlc3QiLCJpbml0QnJlYWRjcnVtYiIsImJyZWFkY3J1bWJTZWxlY3RvciIsImV4cGFuZEJ1dHRvblNlbGVjdG9yIiwic2VnbWVudFNlbGVjdG9yIiwic2VnbWVudEZpcnN0U2VsZWN0b3IiLCJzZWdtZW50VmlzaWJsZVNlbGVjdG9yIiwic2VnbWVudEhpZGRlblNlbGVjdG9yIiwiZWxsaXBzaXNTZWxlY3RvciIsImluaXRFbGxpcHNpcyIsImJyZWFkY3J1bWJDb250YWluZXIiLCJicmVhZGNydW1iRmlyc3QiLCJlbGxpcHNpcyIsImNyZWF0ZUVsZW1lbnQiLCJhZGQiLCJpbm5lckhUTUwiLCJsaXN0SXRlbSIsImFwcGVuZENoaWxkIiwic2VnbWVudCIsImluc2VydEJlZm9yZSIsIm5leHRTaWJsaW5nIiwidG9nZ2xlRWxsaXBzaXMiLCJicmVhZGNydW1iSGlkZGVuU2VnbWVudHMiLCJoaWRkZW4iLCJicmVhZGNydW1iRWxsaXBzaXMiLCJicmVhZGNydW1iSXNUb29MYXJnZSIsIndyYXBwZXJXaWR0aCIsImZsb29yIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0Iiwid2lkdGgiLCJicmVhZGNydW1iU2VnbWVudHMiLCJzZWdtZW50V2lkdGgiLCJjZWlsIiwiYnJlYWRjcnVtYlNlZ21lbnQiLCJoaWRlU2VnbWVudCIsImJyZWFkY3J1bWJWaXNpYmxlU2VnbWVudHMiLCJzaG93U2VnbWVudCIsImV2ZW50RXhwYW5kQ2xpY2siLCJwYXJlbnRFbGVtZW50IiwiZXZlbnRSZXNpemUiLCJicmVhZGNydW1iQ29udGFpbmVycyIsImJpbmRCcmVhZGNydW1iRXZlbnRzIiwiZXhwYW5kcyIsImV4cGFuZCIsInVuYmluZEJyZWFkY3J1bWJFdmVudHMiLCJjYXJvdXNlbHMiLCJzZWxlY3RvcklkIiwiY3VycmVudFNsaWRlIiwiY2Fyb3VzZWwiLCJzbGlkZXMiLCJsaXN0IiwicXVlcnlTZWxlY3RvciIsImdldExpc3RJdGVtV2lkdGgiLCJvZmZzZXRXaWR0aCIsImdvVG9TbGlkZSIsIm4iLCJyZW1vdmUiLCJzZXRPZmZzZXQiLCJpdGVtV2lkdGgiLCJ0ciIsInN0eWxlIiwiTW96VHJhbnNmb3JtIiwibXNUcmFuc2Zvcm0iLCJPVHJhbnNmb3JtIiwiV2Via2l0VHJhbnNmb3JtIiwidHJhbnNmb3JtIiwiYW5ub3VuY2VDdXJyZW50U2xpZGUiLCJ0ZXh0Q29udGVudCIsInNob3dJbWFnZUluZm9ybWF0aW9uIiwiaW5mb0FyZWFzIiwiYXJlYSIsImRpc3BsYXkiLCJwcmV2aW91c1NsaWRlIiwibmV4dFNsaWRlIiwiYWRkQ2Fyb3VzZWxDb250cm9scyIsIm5hdkNvbnRyb2xzIiwiY2xhc3NOYW1lIiwicmVtb3ZlQ2Fyb3VzZWxDb250cm9scyIsImNvbnRyb2xzIiwicmVtb3ZlQ2hpbGQiLCJhZGRMaXZlUmVnaW9uIiwibGl2ZVJlZ2lvbiIsInJlbW92ZUxpdmVSZWdpb24iLCJkZWJvdW5jZUNiIiwiZXhwYW5kQ29udGV4dHVhbE5hdiIsImNvbnRleHR1YWxOYXYiLCJidXR0b24iLCJjbGFzc1RvUmVtb3ZlIiwiaGlkZGVuRWxlbWVudHNTZWxlY3RvciIsImhpZGRlbkVsZW1lbnRzIiwiZWxlbWVudCIsImNvbnRleHR1YWxOYXZzIiwiYnV0dG9uU2VsZWN0b3IiLCJub2Rlc0FycmF5Iiwibm9kZSIsImNvbnRhaW5zIiwiY29tcGFyZURvY3VtZW50UG9zaXRpb24iLCJkcm9wZG93biIsImRyb3Bkb3duc0FycmF5IiwiQXJyYXkiLCJpc0luc2lkZSIsImRyb3Bkb3duU2VsZWN0aW9uIiwiZXZlbnQiLCJkcm9wZG93bkJ1dHRvbiIsImRyb3Bkb3duQm9keSIsImRpYWxvZ3MiLCJ0cmlnZ2VyRWxlbWVudHNTZWxlY3RvciIsImRpYWxvZ1dpbmRvd0lkIiwiZGlhbG9nT3ZlcmxheUlkIiwidHJpZ2dlckVsZW1lbnRzIiwiZGlhbG9nV2luZG93IiwiZGlhbG9nT3ZlcmxheSIsImJvZHkiLCJmb2N1c2FibGVFbGVtZW50cyIsImZvY3VzZWRFbEJlZm9yZU9wZW4iLCJmaXJzdEZvY3VzYWJsZUVsZW1lbnQiLCJsYXN0Rm9jdXNhYmxlRWxlbWVudCIsImNsb3NlIiwiaGFuZGxlS2V5RG93biIsIktFWV9UQUIiLCJLRVlfRVNDIiwiaGFuZGxlQmFja3dhcmRUYWIiLCJhY3RpdmVFbGVtZW50IiwiaGFuZGxlRm9yd2FyZFRhYiIsInNoaWZ0S2V5Iiwib3BlbiIsImJpbmREaWFsb2dFdmVudHMiLCJlbGVtZW50cyIsInVuYmluZERpYWxvZ0V2ZW50cyIsInRvZ2dsZUV4cGFuZGFibGUiLCJ0b2dnbGVFbGVtZW50IiwiZm9yY2VDbG9zZSIsImNsb3NlU2libGluZ3MiLCJzaWJsaW5nc1NlbGVjdG9yIiwiaXNFeHBhbmRlZCIsImhhc0F0dHJpYnV0ZSIsInNpYmxpbmdzQXJyYXkiLCJmaWx0ZXIiLCJzaWJsaW5nIiwiaW5pdEV4cGFuZGFibGVzIiwiZmlsZVVwbG9hZHMiLCJpbnB1dFNlbGVjdG9yIiwidmFsdWVTZWxlY3RvciIsImJyb3dzZVNlbGVjdG9yIiwiZmlsZVVwbG9hZENvbnRhaW5lcnMiLCJ1cGRhdGVGaWxlTmFtZSIsImZpbGVzIiwiZmlsZW5hbWUiLCJmaWxlIiwibmFtZSIsIm1lc3NhZ2VFbGVtZW50IiwiZXZlbnRWYWx1ZUNoYW5nZSIsImZpbGVVcGxvYWRFbGVtZW50cyIsImZpbGVVcGxvYWRFbGVtZW50IiwiZXZlbnRCcm93c2VLZXlkb3duIiwiaW5wdXRFbGVtZW50cyIsImlucHV0RWxlbWVudCIsImNsaWNrIiwiYmluZEZpbGVVcGxvYWRFdmVudHMiLCJmaWxlVXBsb2FkQ29udGFpbmVyIiwiZmlsZVVwbG9hZElucHV0cyIsImZpbGVVcGxvYWRJbnB1dCIsImZpbGVVcGxvYWRCcm93c2VzIiwiZmlsZVVwbG9hZEJyb3dzZSIsInVuYmluZEZpbGVVcGxvYWRFdmVudHMiLCJlY2xMYW5nU2VsZWN0UGFnZXMiLCJ0b2dnbGVDbGFzcyIsImxpc3RTZWxlY3RvciIsImRyb3Bkb3duU2VsZWN0b3IiLCJkcm9wZG93bk9uQ2hhbmdlIiwibGFuZ1NlbGVjdFBhZ2VzQ29udGFpbmVycyIsInRvZ2dsZSIsImxzcCIsIm9mZnNldExlZnQiLCJkaXNtaXNzTWVzc2FnZSIsIm1lc3NhZ2UiLCJpbml0TWVzc2FnZXMiLCJzZWxlY3RvckNsYXNzIiwibWVzc2FnZXMiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiX2NyZWF0ZUNsYXNzIiwiZGVmaW5lUHJvcGVydGllcyIsInByb3BzIiwiZGVzY3JpcHRvciIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsImRlZmluZVByb3BlcnR5Iiwia2V5IiwiQ29uc3RydWN0b3IiLCJwcm90b1Byb3BzIiwic3RhdGljUHJvcHMiLCJfY2xhc3NDYWxsQ2hlY2siLCJpbnN0YW5jZSIsInNlcHB1a3UiLCJnZXRDb21wdXRlZFN0eWxlIiwidGVzdE5vZGUiLCJzb21lIiwicHJlZml4IiwicG9zaXRpb24iLCJzaGFkb3dSb290RXhpc3RzIiwiU2hhZG93Um9vdCIsInNjcm9sbCIsInRvcCIsImxlZnQiLCJzdGlja2llcyIsImV4dGVuZCIsInRhcmdldE9iaiIsInNvdXJjZU9iamVjdCIsImhhc093blByb3BlcnR5IiwicGFyc2VOdW1lcmljIiwidmFsIiwicGFyc2VGbG9hdCIsImdldERvY09mZnNldFRvcCIsImRvY09mZnNldFRvcCIsIm9mZnNldFRvcCIsIm9mZnNldFBhcmVudCIsIlN0aWNreSIsIkhUTUxFbGVtZW50IiwiRXJyb3IiLCJzdGlja3kiLCJfbm9kZSIsIl9zdGlja3lNb2RlIiwiX2FjdGl2ZSIsInB1c2giLCJyZWZyZXNoIiwiX3JlbW92ZWQiLCJfZGVhY3RpdmF0ZSIsIm5vZGVDb21wdXRlZFN0eWxlIiwibm9kZUNvbXB1dGVkUHJvcHMiLCJtYXJnaW5Ub3AiLCJtYXJnaW5Cb3R0b20iLCJtYXJnaW5MZWZ0IiwibWFyZ2luUmlnaHQiLCJjc3NGbG9hdCIsImlzTmFOIiwicmVmZXJlbmNlTm9kZSIsImhvc3QiLCJub2RlV2luT2Zmc2V0IiwicGFyZW50V2luT2Zmc2V0IiwicGFyZW50Q29tcHV0ZWRTdHlsZSIsIl9wYXJlbnQiLCJzdHlsZXMiLCJvZmZzZXRIZWlnaHQiLCJfb2Zmc2V0VG9XaW5kb3ciLCJyaWdodCIsImNsaWVudFdpZHRoIiwiX29mZnNldFRvUGFyZW50IiwiYm9yZGVyVG9wV2lkdGgiLCJib3JkZXJMZWZ0V2lkdGgiLCJib3JkZXJSaWdodFdpZHRoIiwiX3N0eWxlcyIsImJvdHRvbSIsIm5vZGVUb3BWYWx1ZSIsIl9saW1pdHMiLCJzdGFydCIsInBhZ2VZT2Zmc2V0IiwiZW5kIiwiYm9yZGVyQm90dG9tV2lkdGgiLCJwYXJlbnRQb3NpdGlvbiIsIl9yZWNhbGNQb3NpdGlvbiIsImNsb25lIiwiX2Nsb25lIiwiaGVpZ2h0IiwicGFkZGluZyIsImJvcmRlciIsImJvcmRlclNwYWNpbmciLCJmb250U2l6ZSIsInN0aWNreU1vZGUiLCJfZmFzdENoZWNrIiwiYWJzIiwiX3RoaXMiLCJfdGhpczIiLCJpbmRleCIsInNwbGljZSIsIlN0aWNreWZpbGwiLCJhZGRPbmUiLCJub2RlTGlzdCIsImFkZGVkU3RpY2tpZXMiLCJfbG9vcCIsIl9yZXQiLCJyZWZyZXNoQWxsIiwicmVtb3ZlT25lIiwiX2xvb3AyIiwicmVtb3ZlQWxsIiwiY2hlY2tTY3JvbGwiLCJwYWdlWE9mZnNldCIsImZhc3RDaGVja1RpbWVyIiwic3RhcnRGYXN0Q2hlY2tUaW1lciIsInNldEludGVydmFsIiwic3RvcEZhc3RDaGVja1RpbWVyIiwiY2xlYXJJbnRlcnZhbCIsImRvY0hpZGRlbktleSIsInZpc2liaWxpdHlDaGFuZ2VFdmVudE5hbWUiLCJtb2R1bGUiLCJleHBvcnRzIiwidCIsImRlZmluZSIsImFtZCIsInRoaXMiLCJvIiwiciIsImEiLCJjIiwibCIsInMiLCJ1IiwiZiIsInNlbGVjdG9ySGVhZGVyIiwiY29udGFpbmVyIiwib2Zmc2V0IiwiYWN0aXZlQ2xhc3MiLCJzY3JvbGxEZWxheSIsImNhbGxiYWNrIiwiZCIsInYiLCJtIiwic2Nyb2xsSGVpZ2h0IiwiY2xpZW50SGVpZ2h0IiwiZyIsImgiLCJwIiwiaW5uZXJIZWlnaHQiLCJpbm5lcldpZHRoIiwieSIsInNvcnQiLCJkaXN0YW5jZSIsInNldERpc3RhbmNlcyIsImIiLCJoYXNoIiwibmF2IiwicGFyZW50IiwidGFnTmFtZSIsInRvTG93ZXJDYXNlIiwiSCIsIkMiLCJnZXRDdXJyZW50TmF2IiwiTCIsImoiLCJFIiwibmF2aWdhdGlvbklucGFnZXMiLCJzdGlja3lTZWxlY3RvciIsInNweVNlbGVjdG9yIiwic3B5Q2xhc3MiLCJzcHlBY3RpdmVDb250YWluZXIiLCJzcHlUcmlnZ2VyIiwic3B5T2Zmc2V0IiwidG9nZ2xlU2VsZWN0b3IiLCJsaW5rc1NlbGVjdG9yIiwic3RpY2t5SW5zdGFuY2UiLCJpbml0U3RpY2t5IiwiZGVzdHJveVN0aWNreSIsImluaXRTY3JvbGxTcHkiLCJpbnBhZ2VOYXZFbGVtZW50IiwiZ3Vtc2hvZSIsIm5hdmlnYXRpb25UaXRsZSIsImRlc3Ryb3lTY3JvbGxTcHkiLCJuYXZMaW5rcyIsImxpbmsiLCJvbkNsaWNrIiwibWVudSIsImhhc1BvcHVwIiwib25LZXlkb3duIiwiY3VycmVudFRhYiIsInByZXZpb3VzVGFiSXRlbSIsInByZXZpb3VzRWxlbWVudFNpYmxpbmciLCJsYXN0RWxlbWVudENoaWxkIiwibmV4dFRhYkl0ZW0iLCJuZXh0RWxlbWVudFNpYmxpbmciLCJmaXJzdEVsZW1lbnRDaGlsZCIsIm1lZ2FtZW51IiwibGlua1NlbGVjdG9yIiwibWVnYW1lbnVzQXJyYXkiLCJTdGlja3liaXRzIiwib2JqIiwidmVyc2lvbiIsInVzZXJBZ2VudCIsIm5hdmlnYXRvciIsImN1c3RvbVN0aWNreUNoYW5nZU51bWJlciIsIm5vU3R5bGVzIiwic3RpY2t5Qml0U3RpY2t5T2Zmc2V0IiwicGFyZW50Q2xhc3MiLCJzY3JvbGxFbCIsInN0aWNreUNsYXNzIiwic3R1Y2tDbGFzcyIsInN0aWNreUNoYW5nZUNsYXNzIiwidXNlU3RpY2t5Q2xhc3NlcyIsInZlcnRpY2FsUG9zaXRpb24iLCJwb3NpdGlvblZhbCIsImRlZmluZVBvc2l0aW9uIiwidnAiLCJucyIsInB2IiwiZWxzIiwiaW5zdGFuY2VzIiwiZWwiLCJhZGRJbnN0YW5jZSIsIl9wcm90byIsImhlYWQiLCJzdGlja3lQcm9wIiwiaXRlbSIsImlzV2luIiwic2UiLCJnZXRDbG9zZXN0UGFyZW50IiwiY29tcHV0ZVNjcm9sbE9mZnNldHMiLCJzdGF0ZSIsInN0YXRlQ29udGFpbmVyIiwibWFuYWdlU3RhdGUiLCJtYXRjaCIsImdldE9mZnNldFRvcCIsIml0IiwiaXNDdXN0b20iLCJpc0JvdHRvbSIsInNjcm9sbEVsT2Zmc2V0Iiwic3RpY2t5U3RhcnQiLCJzdGlja3lDaGFuZ2VPZmZzZXQiLCJzdGlja3lDaGFuZ2UiLCJzdGlja3lTdG9wIiwidG9nZ2xlQ2xhc3NlcyIsImNBcnJheSIsInNwbGl0Iiwickl0ZW0iLCJqb2luIiwiY2hhbmdlIiwic3RvcCIsInN0bCIsInN0dWNrIiwickFGU3R1YiIsInJBRkR1bW15IiwickFGIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwid2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ0QyIsInNjcm9sbFkiLCJzY3JvbGxUb3AiLCJub3RTdGlja3kiLCJpc1N0aWNreSIsImlzU3R1Y2siLCJpc1N0aWNreUNoYW5nZSIsImlzTm90U3RpY2t5Q2hhbmdlIiwic3R1YiIsInVwZGF0ZSIsInJlbW92ZUluc3RhbmNlIiwiY2xlYW51cCIsInN0aWNreWJpdHMiLCJuYXZpZ2F0aW9uU2lkZSIsImFjdGl2ZVNlbGVjdG9yIiwic2Nyb2xsVG9Ub3AiLCJzdWJzdHJpbmciLCJzY3JvbGxJbnRvVmlldyIsInVuZm9sZFRvQWN0aXZlIiwiYWN0aXZlIiwibWF0Y2hlcyIsImVjbFRhYmxlcyIsInRhYmxlcyIsImhlYWRlclRleHQiLCJ0ZXh0Q29sc3BhbiIsImNpIiwiY24iLCJ0YWJsZVJvd3MiLCJ0YWJsZSIsImhlYWRlcnMiLCJoZWFkRmlyc3QiLCJjZWxsUGVyUm93IiwiY29sc3BhbkluZGV4Iiwicm93IiwiY2VsbCIsInRhYnMiLCJ0YWJsaXN0U2VsZWN0b3IiLCJ0YWJwYW5lbFNlbGVjdG9yIiwidGFiZWxlbWVudHNTZWxlY3RvciIsInRhYkNvbnRhaW5lcnMiLCJzaG93VGFiIiwiZ2l2ZUZvY3VzIiwic2libGluZ1RhYnMiLCJzaWJsaW5nVGFicGFuZWxzIiwidGFiIiwicmVtb3ZlQXR0cmlidXRlIiwidGFicGFuZWwiLCJldmVudFRhYkNsaWNrIiwiZXZlbnRUYWJLZXlkb3duIiwiYmluZFRhYnNFdmVudHMiLCJ0YWJDb250YWluZXIiLCJ0YWJzRWxlbWVudHMiLCJ1bmJpbmRUYWJzRXZlbnRzIiwiZXhwYW5kVGltZWxpbmUiLCJ0aW1lbGluZSIsInRpbWVsaW5lcyJdLCJtYXBwaW5ncyI6Ijs7O0VBQUE7QUFDQSxFQUFPLElBQU1BLFdBQVcsU0FBWEEsUUFBVyxDQUFDQyxRQUFEO0VBQUEsTUFBV0MsT0FBWCx1RUFBcUJDLFFBQXJCO0VBQUEsU0FDdEIsR0FBR0MsS0FBSCxDQUFTQyxJQUFULENBQWNILFFBQVFJLGdCQUFSLENBQXlCTCxRQUF6QixDQUFkLENBRHNCO0VBQUEsQ0FBakI7O0VDRFA7O0VBSUE7OztBQUdBLE1BQWFNLGFBQWEsU0FBYkEsVUFBYSxHQUdmO0VBQUEsaUZBQVAsRUFBTztFQUFBLDJCQUZUTixRQUVTO0VBQUEsTUFGQ0EsUUFFRCxpQ0FGWSxnQkFFWjtFQUFBLGlDQURUTyxjQUNTO0VBQUEsTUFET0EsY0FDUCx1Q0FEd0Isd0JBQ3hCOztFQUNUO0VBQ0EsTUFDRSxFQUFFLG1CQUFtQkwsUUFBckIsS0FDQSxFQUFFLHNCQUFzQk0sTUFBeEIsQ0FEQSxJQUVBLENBQUNOLFNBQVNPLGVBQVQsQ0FBeUJDLFNBSDVCLEVBS0UsT0FBTyxJQUFQOztFQUVGO0VBQ0E7RUFDQSxNQUFNQyxzQkFBc0JaLFNBQVNDLFFBQVQsQ0FBNUI7O0VBRUE7RUFD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
