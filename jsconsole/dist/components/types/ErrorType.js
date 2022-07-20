var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import ObjectType from './ObjectType';

var ErrorType = function (_Component) {
  _inherits(ErrorType, _Component);

  function ErrorType(props) {
    _classCallCheck(this, ErrorType);

    var _this = _possibleConstructorReturn(this, (ErrorType.__proto__ || Object.getPrototypeOf(ErrorType)).call(this, props));

    _this.state = {
      open: props.open
    };
    return _this;
  }

  _createClass(ErrorType, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          value = _props.value,
          _props$shallow = _props.shallow,
          shallow = _props$shallow === undefined ? true : _props$shallow,
          filter = _props.filter,
          allowOpen = _props.allowOpen;
      var open = this.state.open;


      var sig = value.name || value.constructor.name;

      return React.createElement(ObjectType, {
        filter: filter,
        allowOpen: allowOpen,
        type: 'error',
        shallow: shallow,
        open: open,
        value: value,
        displayName: sig
      });
    }
  }]);

  return ErrorType;
}(Component);

export default ErrorType;