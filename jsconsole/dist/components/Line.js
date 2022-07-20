var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import LineNav from './LineNav';
import which from '../lib/which-type';

var Line = function (_Component) {
  _inherits(Line, _Component);

  function Line(props) {
    _classCallCheck(this, Line);

    var _this = _possibleConstructorReturn(this, (Line.__proto__ || Object.getPrototypeOf(Line)).call(this, props));

    _this.state = {
      filter: null
    };
    return _this;
  }

  _createClass(Line, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this.state.filter !== nextState.filter) {
        return true;
      }

      return false; // this prevents bananas amount of rendering
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          _props$type = _props.type,
          type = _props$type === undefined ? 'response' : _props$type,
          value = _props.value,
          _props$command = _props.command,
          command = _props$command === undefined ? null : _props$command,
          _props$error = _props.error,
          error = _props$error === undefined ? false : _props$error,
          _props$open = _props.open,
          open = _props$open === undefined ? false : _props$open,
          _props$html = _props.html,
          html = _props$html === undefined ? false : _props$html,
          _props$onFocus = _props.onFocus,
          onFocus = _props$onFocus === undefined ? function () {} : _props$onFocus;


      var line = null;

      var filter = this.state.filter;


      if (type === 'command') {
        line = React.createElement(
          'div',
          { className: 'prompt input' },
          React.createElement(LineNav, { value: value }),
          value
        );
      }

      if (type === 'log' || type === 'response') {
        if (type === 'log' && Array.isArray(value) && value.length === 0) {
          return null;
        }

        // for LineNav I do a bit of a giggle so if it's a log, we copy the single
        // value, which is nicer for the user
        line = React.createElement(
          'div',
          { className: 'prompt output ' + type + ' ' + (error ? 'error' : '') },
          React.createElement(LineNav, {
            onFilter: function onFilter(filter) {
              _this2.setState({ filter: filter });
            },
            value: type === 'log' && Array.isArray(value) && value.length === 1 ? value[0] : value,
            command: command
          }),
          (type === 'log' && Array.isArray(value) ? value : [value]).map(function (value, i) {
            var Type = which(value);
            return React.createElement(
              Type,
              {
                filter: filter,
                html: html,
                value: value,
                open: open,
                allowOpen: true,
                bare: type === 'log',
                key: 'type-' + i,
                shallow: false
              },
              value
            );
          })
        );
      }

      return React.createElement(
        'div',
        { className: 'Line', onClick: onFocus },
        line
      );
    }
  }]);

  return Line;
}(Component);

export default Line;