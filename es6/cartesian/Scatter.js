function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
import _isEqual from "lodash/isEqual";
import _isFunction from "lodash/isFunction";
import _isNil from "lodash/isNil";
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
/**
 * @fileOverview Render a group of scatters
 */
import React, { PureComponent } from 'react';
import Animate from 'react-smooth';
import classNames from 'classnames';
import { Layer } from '../container/Layer';
import { LabelList } from '../component/LabelList';
import { findAllByType } from '../util/ReactUtils';
import { Global } from '../util/Global';
import { ZAxis } from './ZAxis';
import { Curve } from '../shape/Curve';
import { Symbols } from '../shape/Symbols';
import { ErrorBar } from './ErrorBar';
import { Cell } from '../component/Cell';
import { uniqueId, interpolateNumber, getLinearRegression } from '../util/DataUtils';
import { getValueByDataKey, getCateCoordinateOfLine } from '../util/ChartUtils';
import { filterProps, adaptEventsOfChild } from '../util/types';
export var Scatter = /*#__PURE__*/function (_PureComponent) {
  _inherits(Scatter, _PureComponent);
  var _super = _createSuper(Scatter);
  function Scatter() {
    var _this;
    _classCallCheck(this, Scatter);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      isAnimationFinished: false
    };
    _this.handleAnimationEnd = function () {
      _this.setState({
        isAnimationFinished: true
      });
    };
    _this.handleAnimationStart = function () {
      _this.setState({
        isAnimationFinished: false
      });
    };
    _this.id = uniqueId('recharts-scatter-');
    return _this;
  }
  _createClass(Scatter, [{
    key: "renderSymbolsStatically",
    value: function renderSymbolsStatically(points) {
      var _this2 = this;
      var _this$props = this.props,
        shape = _this$props.shape,
        activeShape = _this$props.activeShape,
        activeIndex = _this$props.activeIndex;
      var baseProps = filterProps(this.props);
      return points.map(function (entry, i) {
        var props = _objectSpread(_objectSpread({
          key: "symbol-".concat(i)
        }, baseProps), entry);
        return /*#__PURE__*/React.createElement(Layer, _extends({
          className: "recharts-scatter-symbol"
        }, adaptEventsOfChild(_this2.props, entry, i), {
          key: "symbol-".concat(i) // eslint-disable-line react/no-array-index-key
        }), Scatter.renderSymbolItem(activeIndex === i ? activeShape : shape, props));
      });
    }
  }, {
    key: "renderSymbolsWithAnimation",
    value: function renderSymbolsWithAnimation() {
      var _this3 = this;
      var _this$props2 = this.props,
        points = _this$props2.points,
        isAnimationActive = _this$props2.isAnimationActive,
        animationBegin = _this$props2.animationBegin,
        animationDuration = _this$props2.animationDuration,
        animationEasing = _this$props2.animationEasing,
        animationId = _this$props2.animationId;
      var prevPoints = this.state.prevPoints;
      return /*#__PURE__*/React.createElement(Animate, {
        begin: animationBegin,
        duration: animationDuration,
        isActive: isAnimationActive,
        easing: animationEasing,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "pie-".concat(animationId),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function (_ref) {
        var t = _ref.t;
        var stepData = points.map(function (entry, index) {
          var prev = prevPoints && prevPoints[index];
          if (prev) {
            var interpolatorCx = interpolateNumber(prev.cx, entry.cx);
            var interpolatorCy = interpolateNumber(prev.cy, entry.cy);
            var interpolatorSize = interpolateNumber(prev.size, entry.size);
            return _objectSpread(_objectSpread({}, entry), {}, {
              cx: interpolatorCx(t),
              cy: interpolatorCy(t),
              size: interpolatorSize(t)
            });
          }
          var interpolator = interpolateNumber(0, entry.size);
          return _objectSpread(_objectSpread({}, entry), {}, {
            size: interpolator(t)
          });
        });
        return /*#__PURE__*/React.createElement(Layer, null, _this3.renderSymbolsStatically(stepData));
      });
    }
  }, {
    key: "renderSymbols",
    value: function renderSymbols() {
      var _this$props3 = this.props,
        points = _this$props3.points,
        isAnimationActive = _this$props3.isAnimationActive;
      var prevPoints = this.state.prevPoints;
      if (isAnimationActive && points && points.length && (!prevPoints || !_isEqual(prevPoints, points))) {
        return this.renderSymbolsWithAnimation();
      }
      return this.renderSymbolsStatically(points);
    }
  }, {
    key: "renderErrorBar",
    value: function renderErrorBar() {
      var isAnimationActive = this.props.isAnimationActive;
      if (isAnimationActive && !this.state.isAnimationFinished) {
        return null;
      }
      var _this$props4 = this.props,
        points = _this$props4.points,
        xAxis = _this$props4.xAxis,
        yAxis = _this$props4.yAxis,
        children = _this$props4.children;
      var errorBarItems = findAllByType(children, ErrorBar.displayName);
      if (!errorBarItems) {
        return null;
      }
      function dataPointFormatterY(dataPoint, dataKey) {
        return {
          x: dataPoint.cx,
          y: dataPoint.cy,
          value: +dataPoint.node.y,
          errorVal: getValueByDataKey(dataPoint, dataKey)
        };
      }
      function dataPointFormatterX(dataPoint, dataKey) {
        return {
          x: dataPoint.cx,
          y: dataPoint.cy,
          value: +dataPoint.node.x,
          errorVal: getValueByDataKey(dataPoint, dataKey)
        };
      }
      return errorBarItems.map(function (item, i) {
        var direction = item.props.direction;
        return /*#__PURE__*/React.cloneElement(item, {
          key: i,
          // eslint-disable-line react/no-array-index-key
          data: points,
          xAxis: xAxis,
          yAxis: yAxis,
          layout: direction === 'x' ? 'vertical' : 'horizontal',
          dataPointFormatter: direction === 'x' ? dataPointFormatterX : dataPointFormatterY
        });
      });
    }
  }, {
    key: "renderLine",
    value: function renderLine() {
      var _this$props5 = this.props,
        points = _this$props5.points,
        line = _this$props5.line,
        lineType = _this$props5.lineType,
        lineJointType = _this$props5.lineJointType;
      var scatterProps = filterProps(this.props);
      var customLineProps = filterProps(line);
      var linePoints, lineItem;
      if (lineType === 'joint') {
        linePoints = points.map(function (entry) {
          return {
            x: entry.cx,
            y: entry.cy
          };
        });
      } else if (lineType === 'fitting') {
        var _getLinearRegression = getLinearRegression(points),
          xmin = _getLinearRegression.xmin,
          xmax = _getLinearRegression.xmax,
          a = _getLinearRegression.a,
          b = _getLinearRegression.b;
        var linearExp = function linearExp(x) {
          return a * x + b;
        };
        linePoints = [{
          x: xmin,
          y: linearExp(xmin)
        }, {
          x: xmax,
          y: linearExp(xmax)
        }];
      }
      var lineProps = _objectSpread(_objectSpread(_objectSpread({}, scatterProps), {}, {
        fill: 'none',
        stroke: scatterProps && scatterProps.fill
      }, customLineProps), {}, {
        points: linePoints
      });
      if ( /*#__PURE__*/React.isValidElement(line)) {
        lineItem = /*#__PURE__*/React.cloneElement(line, lineProps);
      } else if (_isFunction(line)) {
        lineItem = line(lineProps);
      } else {
        lineItem = /*#__PURE__*/React.createElement(Curve, _extends({}, lineProps, {
          type: lineJointType
        }));
      }
      return /*#__PURE__*/React.createElement(Layer, {
        className: "recharts-scatter-line",
        key: "recharts-scatter-line"
      }, lineItem);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props6 = this.props,
        hide = _this$props6.hide,
        points = _this$props6.points,
        line = _this$props6.line,
        className = _this$props6.className,
        xAxis = _this$props6.xAxis,
        yAxis = _this$props6.yAxis,
        left = _this$props6.left,
        top = _this$props6.top,
        width = _this$props6.width,
        height = _this$props6.height,
        id = _this$props6.id,
        isAnimationActive = _this$props6.isAnimationActive;
      if (hide || !points || !points.length) {
        return null;
      }
      var isAnimationFinished = this.state.isAnimationFinished;
      var layerClass = classNames('recharts-scatter', className);
      var needClip = xAxis && xAxis.allowDataOverflow || yAxis && yAxis.allowDataOverflow;
      var clipPathId = _isNil(id) ? this.id : id;
      return /*#__PURE__*/React.createElement(Layer, {
        className: layerClass,
        clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : null
      }, needClip ? /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("clipPath", {
        id: "clipPath-".concat(clipPathId)
      }, /*#__PURE__*/React.createElement("rect", {
        x: left,
        y: top,
        width: width,
        height: height
      }))) : null, line && this.renderLine(), this.renderErrorBar(), /*#__PURE__*/React.createElement(Layer, {
        key: "recharts-scatter-symbols"
      }, this.renderSymbols()), (!isAnimationActive || isAnimationFinished) && LabelList.renderCallByParent(this.props, points));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.animationId !== prevState.prevAnimationId) {
        return {
          prevAnimationId: nextProps.animationId,
          curPoints: nextProps.points,
          prevPoints: prevState.curPoints
        };
      }
      if (nextProps.points !== prevState.curPoints) {
        return {
          curPoints: nextProps.points
        };
      }
      return null;
    }
  }, {
    key: "renderSymbolItem",
    value: function renderSymbolItem(option, props) {
      var symbol;
      if ( /*#__PURE__*/React.isValidElement(option)) {
        symbol = /*#__PURE__*/React.cloneElement(option, props);
      } else if (_isFunction(option)) {
        symbol = option(props);
      } else if (typeof option === 'string') {
        symbol = /*#__PURE__*/React.createElement(Symbols, _extends({}, props, {
          type: option
        }));
      }
      return symbol;
    }
  }]);
  return Scatter;
}(PureComponent);
Scatter.displayName = 'Scatter';
Scatter.defaultProps = {
  xAxisId: 0,
  yAxisId: 0,
  zAxisId: 0,
  legendType: 'circle',
  lineType: 'joint',
  lineJointType: 'linear',
  data: [],
  shape: 'circle',
  hide: false,
  isAnimationActive: !Global.isSsr,
  animationBegin: 0,
  animationDuration: 400,
  animationEasing: 'linear'
};
Scatter.getComposedData = function (_ref2) {
  var xAxis = _ref2.xAxis,
    yAxis = _ref2.yAxis,
    zAxis = _ref2.zAxis,
    item = _ref2.item,
    displayedData = _ref2.displayedData,
    xAxisTicks = _ref2.xAxisTicks,
    yAxisTicks = _ref2.yAxisTicks,
    offset = _ref2.offset;
  var tooltipType = item.props.tooltipType;
  var cells = findAllByType(item.props.children, Cell.displayName);
  var xAxisDataKey = _isNil(xAxis.dataKey) ? item.props.dataKey : xAxis.dataKey;
  var yAxisDataKey = _isNil(yAxis.dataKey) ? item.props.dataKey : yAxis.dataKey;
  var zAxisDataKey = zAxis && zAxis.dataKey;
  var defaultRangeZ = zAxis ? zAxis.range : ZAxis.defaultProps.range;
  var defaultZ = defaultRangeZ && defaultRangeZ[0];
  var xBandSize = xAxis.scale.bandwidth ? xAxis.scale.bandwidth() : 0;
  var yBandSize = yAxis.scale.bandwidth ? yAxis.scale.bandwidth() : 0;
  var points = displayedData.map(function (entry, index) {
    var x = getValueByDataKey(entry, xAxisDataKey);
    var y = getValueByDataKey(entry, yAxisDataKey);
    var z = !_isNil(zAxisDataKey) && getValueByDataKey(entry, zAxisDataKey) || '-';
    var tooltipPayload = [{
      name: _isNil(xAxis.dataKey) ? item.props.name : xAxis.name || xAxis.dataKey,
      unit: xAxis.unit || '',
      value: x,
      payload: entry,
      dataKey: xAxisDataKey,
      type: tooltipType
    }, {
      name: _isNil(yAxis.dataKey) ? item.props.name : yAxis.name || yAxis.dataKey,
      unit: yAxis.unit || '',
      value: y,
      payload: entry,
      dataKey: yAxisDataKey,
      type: tooltipType
    }];
    if (z !== '-') {
      tooltipPayload.push({
        name: zAxis.name || zAxis.dataKey,
        unit: zAxis.unit || '',
        value: z,
        payload: entry,
        dataKey: zAxisDataKey,
        type: tooltipType
      });
    }
    var cx = getCateCoordinateOfLine({
      axis: xAxis,
      ticks: xAxisTicks,
      bandSize: xBandSize,
      entry: entry,
      index: index,
      dataKey: xAxisDataKey
    });
    var cy = getCateCoordinateOfLine({
      axis: yAxis,
      ticks: yAxisTicks,
      bandSize: yBandSize,
      entry: entry,
      index: index,
      dataKey: yAxisDataKey
    });
    var size = z !== '-' ? zAxis.scale(z) : defaultZ;
    var radius = Math.sqrt(Math.max(size, 0) / Math.PI);
    return _objectSpread(_objectSpread({}, entry), {}, {
      cx: cx,
      cy: cy,
      x: cx - radius,
      y: cy - radius,
      xAxis: xAxis,
      yAxis: yAxis,
      zAxis: zAxis,
      width: 2 * radius,
      height: 2 * radius,
      size: size,
      node: {
        x: x,
        y: y,
        z: z
      },
      tooltipPayload: tooltipPayload,
      tooltipPosition: {
        x: cx,
        y: cy
      },
      payload: entry
    }, cells && cells[index] && cells[index].props);
  });
  return _objectSpread({
    points: points
  }, offset);
};