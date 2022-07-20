var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

import React, { Component } from 'react';
import Line from './Line';

var guid = 0;
var getNext = function getNext() {
  return guid++;
};

function AssertError(message) {
  this.name = 'Assertion fail';
  this.message = message;
  this.stack = new Error().stack;
}

AssertError.prototype = new Error();

function interpolate() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var _args = args,
      _args2 = _toArray(_args),
      string = _args2[0],
      rest = _args2.slice(1);

  var html = false;

  if (typeof string === 'string' && string.includes('%') && rest.length) {
    string = string.replace(/(%[scdif]|%(\d*)\.(\d*)[dif])/g, function (all, key) {
      var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var dp = arguments[3];

      // NOTE: not supporting Object type

      if (key === '%s') {
        // string
        return rest.shift();
      }

      if (key === '%c') {
        html = true;
        return '</span><span style="' + rest.shift() + '">';
      }

      var value = rest.shift();
      var res = null;

      if (key.substr(-1) === 'f') {
        if (isNaN(parseInt(dp, 10))) {
          res = value;
        } else {
          res = value.toFixed(dp);
        }
      } else {
        res = parseInt(value, 10);
      }

      if (width === '') {
        return res;
      }

      return res.toString().padStart(width, ' ');
    });

    if (html) {
      string = '<span>' + string + '</span>';
    }

    args = [string].concat(_toConsumableArray(rest));
  }

  return { html: html, args: args };
}

var Console = function (_Component) {
  _inherits(Console, _Component);

  function Console(props) {
    _classCallCheck(this, Console);

    var _this = _possibleConstructorReturn(this, (Console.__proto__ || Object.getPrototypeOf(Console)).call(this, props));

    _this.error = function () {
      var _interpolate = interpolate.apply(undefined, arguments),
          html = _interpolate.html,
          args = _interpolate.args;

      _this.push({
        error: true,
        html: html,
        value: args,
        type: 'log'
      });
    };

    _this.dir = function () {
      var _interpolate2 = interpolate.apply(undefined, arguments),
          html = _interpolate2.html,
          args = _interpolate2.args;

      _this.push({
        value: args,
        html: html,
        open: true,
        type: 'log'
      });
    };

    _this.debug = function () {
      return _this.log.apply(_this, arguments);
    };

    _this.info = function () {
      return _this.log.apply(_this, arguments);
    };

    _this.state = (props.commands || []).reduce(function (acc, curr) {
      acc[getNext()] = curr;
      return acc;
    }, {});
    _this.log = _this.log.bind(_this);
    _this.clear = _this.clear.bind(_this);
    _this.push = _this.push.bind(_this);
    return _this;
  }

  _createClass(Console, [{
    key: 'push',
    value: function push(command) {
      var next = getNext();
      this.setState(_defineProperty({}, next, command));
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.state = {}; // eslint-disable-line react/no-direct-mutation-state
      this.forceUpdate();
    }
  }, {
    key: 'assert',
    value: function assert(test) {
      for (var _len2 = arguments.length, rest = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        rest[_key2 - 1] = arguments[_key2];
      }

      // intentional loose assertion test - matches devtools
      if (!test) {
        var msg = rest.shift();
        if (msg === undefined) {
          msg = 'console.assert';
        }
        rest.unshift(new AssertError(msg));
        this.push({
          error: true,
          value: rest,
          type: 'log'
        });
      }
    }
  }, {
    key: 'warn',
    value: function warn() {
      var _interpolate3 = interpolate.apply(undefined, arguments),
          html = _interpolate3.html,
          args = _interpolate3.args;

      this.push({
        error: true,
        level: 'warn',
        html: html,
        value: args,
        type: 'log'
      });
    }
  }, {
    key: 'log',
    value: function log() {
      var _interpolate4 = interpolate.apply(undefined, arguments),
          html = _interpolate4.html,
          args = _interpolate4.args;

      this.push({
        value: args,
        html: html,
        type: 'log'
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var commands = this.state || {};
      var keys = Object.keys(commands);
      if (this.props.reverse) {
        keys.reverse();
      }

      return React.createElement(
        'div',
        {
          className: 'react-console-container',
          onClick: function onClick(e) {
            e.stopPropagation(); // prevent the focus on the input element
          }
        },
        keys.map(function (_) {
          return React.createElement(Line, Object.assign({ key: 'line-' + _ }, commands[_]));
        })
      );
    }
  }]);

  return Console;
}(Component);

export default Console;