var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import Entry from './EntryType';
import zip from 'lodash/zip';
import flatten from 'lodash/flatten';

var SetType = function (_Component) {
  _inherits(SetType, _Component);

  function SetType(props) {
    _classCallCheck(this, SetType);

    var _this = _possibleConstructorReturn(this, (SetType.__proto__ || Object.getPrototypeOf(SetType)).call(this, props));

    _this.toggle = _this.toggle.bind(_this);

    _this.state = {
      open: props.open
    };
    return _this;
  }

  _createClass(SetType, [{
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
      var _props = this.props,
          value = _props.value,
          _props$shallow = _props.shallow,
          shallow = _props$shallow === undefined ? true : _props$shallow;
      var open = this.state.open;
      var displayName = this.props.displayName;


      if (!displayName) {
        displayName = value.constructor ? value.constructor.name : 'Object';
      }

      var length = value.size;

      if (shallow && !open) {
        return React.createElement(
          'div',
          { className: 'type ArrayType closed', onClick: this.toggle },
          React.createElement(
            'em',
            null,
            displayName
          ),
          React.createElement(
            'span',
            { className: 'arb-info' },
            '(',
            length,
            ')'
          )
        );
      }

      var types = [];
      var i = 0;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = value.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var entry = _step.value;

          types.push(React.createElement(Entry, {
            key: 'setTypeKey-' + (i + 1),
            shallow: true,
            value: entry,
            allowOpen: open
          }));
          i++;
          if (!open && i === 10) {
            break;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (!open && length > 10) {
        types.push(React.createElement(
          'span',
          { key: 'setTypeMore-0', className: 'more arb-info' },
          '\u2026'
        ));
      }

      if (!open) {
        // intersperce with commas
        types = flatten(zip(types, Array.from({ length: length - 1 }, function (n, i) {
          return React.createElement(
            'span',
            { key: 'sep-' + i, className: 'sep' },
            ','
          );
        })));

        // do mini output
        return React.createElement(
          'div',
          { className: 'type set closed', onClick: this.toggle },
          React.createElement(
            'em',
            null,
            displayName
          ),
          React.createElement(
            'span',
            { className: 'arb-info' },
            '(',
            length,
            ')'
          ),
          React.createElement(
            'span',
            null,
            ' ',
            '{',
            ' '
          ),
          types.map(function (type, i) {
            return React.createElement(
              'div',
              { className: 'key-value', key: 'subtype-' + i },
              type
            );
          }),
          React.createElement(
            'span',
            null,
            ' ',
            '}'
          )
        );
      }

      return React.createElement(
        'div',
        { className: 'type set', onClick: this.toggle },
        React.createElement(
          'em',
          null,
          displayName
        ),
        React.createElement(
          'span',
          { className: 'arb-info' },
          '(',
          length,
          ')'
        ),
        React.createElement(
          'span',
          null,
          ' ',
          '{',
          ' '
        ),
        React.createElement(
          'div',
          { className: 'group' },
          React.createElement(
            'span',
            { className: 'arb-info' },
            '[[Entries]]:'
          ),
          types.map(function (type, i) {
            return React.createElement(
              'div',
              { className: 'key-value', key: 'subtype-' + i },
              React.createElement(
                'span',
                { className: 'index' },
                i,
                ':'
              ),
              type
            );
          })
        ),
        React.createElement(
          'span',
          null,
          ' ',
          '}'
        )
      );
    }
  }]);

  return SetType;
}(Component);

export default SetType;