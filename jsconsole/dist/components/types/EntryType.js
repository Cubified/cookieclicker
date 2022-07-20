var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import which from '../../lib/which-type';

var EntryType = function (_Component) {
  _inherits(EntryType, _Component);

  function EntryType(props) {
    _classCallCheck(this, EntryType);

    var _this = _possibleConstructorReturn(this, (EntryType.__proto__ || Object.getPrototypeOf(EntryType)).call(this, props));

    _this.toggle = _this.toggle.bind(_this);

    _this.state = {
      open: props.open
    };
    return _this;
  }

  _createClass(EntryType, [{
    key: 'toggle',
    value: function toggle(e) {
      if (!this.props.allowOpen) {
        return;
      }
      e.stopPropagation();
      e.preventDefault();
      this.setState({ open: !this.state.open });
    }
  }, {
    key: 'render',
    value: function render() {
      // const { shallow = true } = this.props;
      var entry = this.props.value;
      var open = this.state.open;

      var _entry = _slicedToArray(entry, 2),
          key = _entry[0],
          value = _entry[1];

      var Key = which(key);
      var Value = which(value);

      if (!open) {
        return React.createElement(
          'div',
          { onClick: this.toggle, className: 'type entry closed' },
          React.createElement(
            'div',
            { className: 'object-item key-value' },
            React.createElement(
              'span',
              { className: 'key' },
              React.createElement(Key, { allowOpen: open, value: key })
            ),
            React.createElement(
              'span',
              { className: 'arb-info' },
              '=> '
            ),
            React.createElement(
              'span',
              { className: 'value' },
              React.createElement(Value, { allowOpen: open, value: value })
            )
          )
        );
      }

      return React.createElement(
        'div',
        { onClick: this.toggle, className: 'type entry' },
        React.createElement(
          'span',
          null,
          '{'
        ),
        React.createElement(
          'div',
          { className: 'group' },
          React.createElement(
            'div',
            { className: 'object-item key-value' },
            React.createElement(
              'span',
              { className: 'key' },
              'key:'
            ),
            React.createElement(
              'span',
              { className: 'value' },
              React.createElement(Key, { allowOpen: open, value: key })
            )
          ),
          React.createElement(
            'div',
            { className: 'object-item key-value' },
            React.createElement(
              'span',
              { className: 'key' },
              'value:'
            ),
            React.createElement(
              'span',
              { className: 'value' },
              React.createElement(Value, { allowOpen: open, value: value })
            )
          )
        ),
        React.createElement(
          'span',
          null,
          '}'
        )
      );
    }
  }]);

  return EntryType;
}(Component);

export default EntryType;