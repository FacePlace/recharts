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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponsiveContainer = void 0;
var classnames_1 = __importDefault(require("classnames"));
var lodash_1 = __importDefault(require("lodash"));
var react_1 = __importStar(require("react"));
var react_resize_detector_1 = __importDefault(require("react-resize-detector"));
var DataUtils_1 = require("../util/DataUtils");
var LogUtils_1 = require("../util/LogUtils");
exports.ResponsiveContainer = (0, react_1.forwardRef)(function (_a, ref) {
    var aspect = _a.aspect, _b = _a.width, width = _b === void 0 ? '100%' : _b, _c = _a.height, height = _c === void 0 ? '100%' : _c, minWidth = _a.minWidth, minHeight = _a.minHeight, maxHeight = _a.maxHeight, children = _a.children, _d = _a.debounce, debounce = _d === void 0 ? 0 : _d, id = _a.id, className = _a.className;
    var _e = (0, react_1.useState)({
        containerWidth: -1,
        containerHeight: -1,
    }), sizes = _e[0], setSizes = _e[1];
    var containerRef = (0, react_1.useRef)(null);
    (0, react_1.useImperativeHandle)(ref, function () { return containerRef; }, [containerRef]);
    var _f = (0, react_1.useState)(false), mounted = _f[0], setMounted = _f[1];
    var getContainerSize = function () {
        if (!containerRef.current) {
            return null;
        }
        return {
            containerWidth: containerRef.current.clientWidth,
            containerHeight: containerRef.current.clientHeight,
        };
    };
    var updateDimensionsImmediate = function () {
        if (!mounted) {
            return;
        }
        var newSize = getContainerSize();
        if (newSize) {
            var oldWidth = sizes.containerWidth, oldHeight = sizes.containerHeight;
            var containerWidth = newSize.containerWidth, containerHeight = newSize.containerHeight;
            if (containerWidth !== oldWidth || containerHeight !== oldHeight) {
                setSizes({ containerWidth: containerWidth, containerHeight: containerHeight });
            }
        }
    };
    var handleResize = debounce > 0 ? lodash_1.default.debounce(updateDimensionsImmediate, debounce) : updateDimensionsImmediate;
    var renderChart = function () {
        var containerWidth = sizes.containerWidth, containerHeight = sizes.containerHeight;
        if (containerWidth < 0 || containerHeight < 0) {
            return null;
        }
        (0, LogUtils_1.warn)((0, DataUtils_1.isPercent)(width) || (0, DataUtils_1.isPercent)(height), "The width(%s) and height(%s) are both fixed numbers,\n       maybe you don't need to use a ResponsiveContainer.", width, height);
        (0, LogUtils_1.warn)(!aspect || aspect > 0, 'The aspect(%s) must be greater than zero.', aspect);
        var calculatedWidth = (0, DataUtils_1.isPercent)(width) ? containerWidth : width;
        var calculatedHeight = (0, DataUtils_1.isPercent)(height) ? containerHeight : height;
        if (aspect && aspect > 0) {
            if (calculatedWidth) {
                calculatedHeight = calculatedWidth / aspect;
            }
            else if (calculatedHeight) {
                calculatedWidth = calculatedHeight * aspect;
            }
            if (maxHeight && calculatedHeight > maxHeight) {
                calculatedHeight = maxHeight;
            }
        }
        (0, LogUtils_1.warn)(calculatedWidth > 0 || calculatedHeight > 0, "The width(%s) and height(%s) of chart should be greater than 0,\n       please check the style of container, or the props width(%s) and height(%s),\n       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the\n       height and width.", calculatedWidth, calculatedHeight, width, height, minWidth, minHeight, aspect);
        return (0, react_1.cloneElement)(children, {
            width: calculatedWidth,
            height: calculatedHeight,
        });
    };
    (0, react_1.useEffect)(function () {
        if (mounted) {
            var size = getContainerSize();
            if (size) {
                setSizes(size);
            }
        }
    }, [mounted]);
    (0, react_1.useEffect)(function () {
        setMounted(true);
    }, []);
    var style = { width: width, height: height, minWidth: minWidth, minHeight: minHeight, maxHeight: maxHeight };
    return (react_1.default.createElement(react_resize_detector_1.default, { handleWidth: true, handleHeight: true, onResize: handleResize, targetRef: containerRef },
        react_1.default.createElement("div", __assign({}, (id != null ? { id: "".concat(id) } : {}), { className: (0, classnames_1.default)('recharts-responsive-container', className), style: style, ref: containerRef }), renderChart())));
});
//# sourceMappingURL=ResponsiveContainer.js.map