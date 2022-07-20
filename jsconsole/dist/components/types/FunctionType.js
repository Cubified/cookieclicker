var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import ObjectType from './ObjectType';

var FunctionType = function (_Component) {
  _inherits(FunctionType, _Component);

  function FunctionType(props) {
    _classCallCheck(this, FunctionType);

    var _this = _possibleConstructorReturn(this, (FunctionType.__proto__ || Object.getPrototypeOf(FunctionType)).call(this, props));

    _this.state = {
      open: props.open
    };
    return _this;
  }

  _createClass(FunctionType, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false; // this prevents bananas amount of rendering
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          value = _props.value,
          _props$shallow = _props.shallow,
          shallow = _props$shallow === undefined ? true : _props$shallow,
          allowOpen = _props.allowOpen;
      var open = this.state.open;

      // this gets the source of the function, regadless of whether
      // it has a function called ".toString", like lodash has!

      var code = Function.toString.call(value);

      // const native = code.indexOf('[native code') !== -1;
      var sig = code.substring(0, code.indexOf('{')).trim().replace(/\s/g, ' ');

      if (!sig) {
        // didn't match because it's an arrow func
        sig = code.substring(0, code.indexOf('=>')).trim() + ' =>';
      }

      sig = sig.replace(/^function/, 'ƒ');

      if (value.hasOwnProperty('toString')) {
        sig = '\u0192 ' + value.toString();
      }

      var object = Object.getOwnPropertyNames(value).reduce(function (acc, curr) {
        acc[curr] = value[curr];
        return acc;
      }, {});

      return React.createElement(ObjectType, {
        allowOpen: allowOpen,
        type: 'function',
        shallow: shallow,
        open: open,
        value: object,
        displayName: sig
      });
    }
  }]);

  return FunctionType;
}(Component);

export default FunctionType;