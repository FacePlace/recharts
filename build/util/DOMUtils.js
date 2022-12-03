"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateChartCoordinate = exports.getOffset = exports.getStringSize = exports.getStyleString = void 0;
var Global_1 = require("./Global");
var stringCache = {
    widthCache: {},
    cacheCount: 0,
};
var MAX_CACHE_NUM = 2000;
var SPAN_STYLE = {
    position: 'absolute',
    top: '-20000px',
    left: 0,
    padding: 0,
    margin: 0,
    border: 'none',
    whiteSpace: 'pre',
};
var STYLE_LIST = [
    'minWidth',
    'maxWidth',
    'width',
    'minHeight',
    'maxHeight',
    'height',
    'top',
    'left',
    'fontSize',
    'lineHeight',
    'padding',
    'margin',
    'paddingLeft',
    'paddingRight',
    'paddingTop',
    'paddingBottom',
    'marginLeft',
    'marginRight',
    'marginTop',
    'marginBottom',
];
var MEASUREMENT_SPAN_ID = 'recharts_measurement_span';
function autoCompleteStyle(name, value) {
    if (STYLE_LIST.indexOf(name) >= 0 && value === +value) {
        return "".concat(value, "px");
    }
    return value;
}
function camelToMiddleLine(text) {
    var strs = text.split('');
    var formatStrs = strs.reduce(function (result, entry) {
        if (entry === entry.toUpperCase()) {
            return __spreadArray(__spreadArray([], result, true), ['-', entry.toLowerCase()], false);
        }
        return __spreadArray(__spreadArray([], result, true), [entry], false);
    }, []);
    return formatStrs.join('');
}
var getStyleString = function (style) {
    return Object.keys(style).reduce(function (result, s) { return "".concat(result).concat(camelToMiddleLine(s), ":").concat(autoCompleteStyle(s, style[s]), ";"); }, '');
};
exports.getStyleString = getStyleString;
var getStringSize = function (text, style) {
    if (style === void 0) { style = {}; }
    if (text === undefined || text === null || Global_1.Global.isSsr) {
        return { width: 0, height: 0 };
    }
    var str = "".concat(text);
    var styleString = (0, exports.getStyleString)(style);
    var cacheKey = "".concat(str, "-").concat(styleString);
    if (stringCache.widthCache[cacheKey]) {
        return stringCache.widthCache[cacheKey];
    }
    try {
        var measurementSpan_1 = document.getElementById(MEASUREMENT_SPAN_ID);
        if (!measurementSpan_1) {
            measurementSpan_1 = document.createElement('span');
            measurementSpan_1.setAttribute('id', MEASUREMENT_SPAN_ID);
            measurementSpan_1.setAttribute('aria-hidden', 'true');
            document.body.appendChild(measurementSpan_1);
        }
        var measurementSpanStyle_1 = __assign(__assign({}, SPAN_STYLE), style);
        Object.keys(measurementSpanStyle_1).map(function (styleKey) {
            measurementSpan_1.style[styleKey] = measurementSpanStyle_1[styleKey];
            return styleKey;
        });
        measurementSpan_1.textContent = str;
        var rect = measurementSpan_1.getBoundingClientRect();
        var result = { width: rect.width, height: rect.height };
        stringCache.widthCache[cacheKey] = result;
        if (++stringCache.cacheCount > MAX_CACHE_NUM) {
            stringCache.cacheCount = 0;
            stringCache.widthCache = {};
        }
        return result;
    }
    catch (e) {
        return { width: 0, height: 0 };
    }
};
exports.getStringSize = getStringSize;
var getOffset = function (el) {
    var html = el.ownerDocument.documentElement;
    var box = { top: 0, left: 0 };
    if (typeof el.getBoundingClientRect !== 'undefined') {
        box = el.getBoundingClientRect();
    }
    return {
        top: box.top + window.pageYOffset - html.clientTop,
        left: box.left + window.pageXOffset - html.clientLeft,
    };
};
exports.getOffset = getOffset;
var calculateChartCoordinate = function (event, offset) { return ({
    chartX: Math.round(event.pageX - offset.left),
    chartY: Math.round(event.pageY - offset.top),
}); };
exports.calculateChartCoordinate = calculateChartCoordinate;
//# sourceMappingURL=DOMUtils.js.map