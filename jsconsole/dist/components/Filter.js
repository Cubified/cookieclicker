var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import debounce from 'lodash/debounce';

var Filter = function (_Component) {
  _inherits(Filter, _Component);

  function Filter() {
    _classCallCheck(this, Filter);

    return _possibleConstructorReturn(this, (Filter.__proto__ || Object.getPrototypeOf(Filter)).apply(this, arguments));
  }

  _createClass(Filter, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.props.enabled !== prevProps.enabled) {
        if (this.props.enabled) {
          this.input.focus();
        } else {
          this.input.value = '';
          this.props.onFilter(null);
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          children = _props.children,
          enabled = _props.enabled,
          _props$onFilter = _props.onFilter,
          onFilter = _props$onFilter === undefined ? function () {} : _props$onFilter;


      var filter = debounce(onFilter, 100);

      var className = enabled ? 'is-visible' : 'is-hidden';

      return React.createElement(
        'span',
        { className: 'Filter ' + className },
        React.createElement(
          'span',
          { className: 'inner' },
          React.createElement('input', {
            ref: function ref(e) {
              return _this2.input = e;
            },
            onChange: function onChange(e) {
              filter(e.target.value.trim().toLowerCase());
            },
            onKeyDown: function onKeyDown(e) {
              return e.stopPropagation();
            },
            type: 'text'
          })
        ),
        children
      );
    }
  }]);

  return Filter;
}(Component);

export default Filter;