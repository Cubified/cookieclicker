var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import zip from 'lodash/zip';
import flatten from 'lodash/flatten';
import which from '../../lib/which-type';

var ArrayType = function (_Component) {
  _inherits(ArrayType, _Component);

  function ArrayType(props) {
    _classCallCheck(this, ArrayType);

    var _this = _possibleConstructorReturn(this, (ArrayType.__proto__ || Object.getPrototypeOf(ArrayType)).call(this, props));

    _this.toggle = _this.toggle.bind(_this);

    _this.state = {
      open: props.open
    };
    return _this;
  }

  _createClass(ArrayType, [{
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
          shallow = _props$shallow === undefined ? true : _props$shallow,
          _props$filter = _props.filter,
          filter = _props$filter === undefined ? null : _props$filter;
      var open = this.state.open;


      var length = value.length;

      if (shallow && !open) {
        return React.createElement(
          'div',
          { className: 'type ArrayType closed', onClick: this.toggle },
          React.createElement(
            'em',
            null,
            'Array'
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

      var types = value.slice(0, open ? value.length : 10).map(function (_, i) {
        var Type = which(_);
        return React.createElement(
          Type,
          {
            allowOpen: open,
            key: 'arrayType-' + (i + 1),
            shallow: true,
            value: _
          },
          _
        );
      });

      // expose holes in the collapsed mode
      if (!open) {
        var count = 0;
        var newTypes = [];
        for (var i = 0; i < types.length; i++) {
          var hole = !(i in types);

          if (count !== 0 && !hole) {
            newTypes.push(React.createElement(
              'span',
              { key: 'hole-' + i, className: 'arb-info' },
              '<undefined \xD7 ',
              count,
              '>'
            ));
            count = 0;
          } else if (hole) {
            count++;
          }

          if (!hole) {
            newTypes.push(types[i]);
          }
        }

        // if there are holes at the end
        if (count !== 0) {
          newTypes.push(React.createElement(
            'span',
            { key: 'hole-' + types.length, className: 'arb-info' },
            '<undefined \xD7 ',
            count,
            '>'
          ));
        }

        types = newTypes;
      }

      if (!open && value.length > 10) {
        types.push(React.createElement(
          'span',
          { key: 'arrayType-0', className: 'more arb-info' },
          '\u2026'
        ));
      }

      if (!open) {
        // intersperce with commas
        types = flatten(zip(types, Array.from({ length: types.length - 1 }, function (n, i) {
          return React.createElement(
            'span',
            { key: 'sep-' + i, className: 'sep' },
            ','
          );
        })));

        // do mini output
        return React.createElement(
          'div',
          { className: 'type ArrayType closed', onClick: this.toggle },
          React.createElement(
            'em',
            null,
            'Array'
          ),
          React.createElement(
            'span',
            { className: 'arb-info' },
            '(',
            length,
            ')'
          ),
          '[ ',
          types,
          ' ]'
        );
      }

      // this is the full output view
      return React.createElement(
        'div',
        { className: 'type ArrayType' },
        React.createElement(
          'div',
          { onClick: this.toggle, className: 'header' },
          React.createElement(
            'em',
            null,
            'Array'
          ),
          React.createElement(
            'span',
            { className: 'arb-info' },
            '(',
            length,
            ')'
          ),
          '['
        ),
        React.createElement(
          'div',
          { className: 'group' },
          types.map(function (type, i) {
            if (filter === null || filter === undefined || filter === '' || (value[i] + '').toLowerCase().includes(filter)) {
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
            }

            return null;
          })
        ),
        ']'
      );
    }
  }]);

  return ArrayType;
}(Component);

export default ArrayType;