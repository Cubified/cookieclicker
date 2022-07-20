import _regeneratorRuntime from 'babel-runtime/regenerator';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _marked = /*#__PURE__*/_regeneratorRuntime.mark(enumerate);

import React, { Component } from 'react';
import which from '../../lib/which-type';
import StringType from './StringType';
import zip from 'lodash/zip';
import flatten from 'lodash/flatten';

var LIMIT_CLOSED = 5;

function enumerate(obj) {
  var visited, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, key, desc;

  return _regeneratorRuntime.wrap(function enumerate$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          visited = new Set();

        case 1:
          if (!obj) {
            _context.next = 36;
            break;
          }

          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 5;
          _iterator = Reflect.ownKeys(obj)[Symbol.iterator]();

        case 7:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 19;
            break;
          }

          key = _step.value;

          if (!(typeof key === 'string')) {
            _context.next = 16;
            break;
          }

          desc = Reflect.getOwnPropertyDescriptor(obj, key);

          if (!(desc && !visited.has(key))) {
            _context.next = 16;
            break;
          }

          visited.add(key);

          if (!desc.enumerable) {
            _context.next = 16;
            break;
          }

          _context.next = 16;
          return key;

        case 16:
          _iteratorNormalCompletion = true;
          _context.next = 7;
          break;

        case 19:
          _context.next = 25;
          break;

        case 21:
          _context.prev = 21;
          _context.t0 = _context['catch'](5);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 25:
          _context.prev = 25;
          _context.prev = 26;

          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }

        case 28:
          _context.prev = 28;

          if (!_didIteratorError) {
            _context.next = 31;
            break;
          }

          throw _iteratorError;

        case 31:
          return _context.finish(28);

        case 32:
          return _context.finish(25);

        case 33:
          obj = Reflect.getPrototypeOf(obj);
          _context.next = 1;
          break;

        case 36:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this, [[5, 21, 25, 33], [26,, 28, 32]]);
}

var ObjectType = function (_Component) {
  _inherits(ObjectType, _Component);

  function ObjectType(props) {
    _classCallCheck(this, ObjectType);

    var _this = _possibleConstructorReturn(this, (ObjectType.__proto__ || Object.getPrototypeOf(ObjectType)).call(this, props));

    _this.toggle = _this.toggle.bind(_this);

    _this.state = {
      open: props.open
    };
    return _this;
  }

  _createClass(ObjectType, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this.state.open !== nextState.open) {
        return true;
      }

      if (this.props.filter === undefined) {
        return false; // this prevents bananas amount of rendering
      }

      if (this.props.filter === nextProps.filter) {
        return false;
      }

      return true;
    }
  }, {
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
      var open = this.state.open;
      var _props = this.props,
          _props$filter = _props.filter,
          filter = _props$filter === undefined ? null : _props$filter,
          value = _props.value,
          _props$shallow = _props.shallow,
          shallow = _props$shallow === undefined ? true : _props$shallow,
          _props$type = _props.type,
          type = _props$type === undefined ? {}.toString.call(value) : _props$type;
      var displayName = this.props.displayName;


      if (!displayName) {
        displayName = value.constructor ? value.constructor.name : 'Object';
      }

      if (!open && shallow) {
        return React.createElement(
          'div',
          { onClick: this.toggle, className: 'type ' + type },
          React.createElement(
            'em',
            null,
            displayName
          )
        );
      }

      var props = open ? [].concat(_toConsumableArray(enumerate(value))) : Object.keys(value);

      Object.getOwnPropertyNames(value).forEach(function (prop) {
        if (!props.includes(prop)) {
          props.push(prop);
        }
      });

      if (filter !== null) {
        props = props.filter(function (prop) {
          if ((prop + '').toLowerCase().includes(filter)) {
            return true;
          }

          if ((value[prop] + '').toLowerCase().includes(filter)) {
            return true;
          }

          return false;
        });
      }

      if (!open) {
        props.splice(LIMIT_CLOSED);
      }

      var types = props.sort().map(function (key, i) {
        var Type = which(value[key]);
        return {
          key: key,
          value: React.createElement(Type, {
            allowOpen: open,
            key: 'objectType-' + (i + 1),
            shallow: true,
            value: value[key]
          })
        };
      });

      if (!open && Object.keys(value).length > LIMIT_CLOSED) {
        types.push(React.createElement(
          'span',
          { key: 'objectType-0', className: 'more' },
          '\u2026'
        ));
      }

      if (!open) {
        if (type === 'error') {
          return React.createElement(
            'div',
            { className: 'type ' + type },
            React.createElement(
              'em',
              { onClick: this.toggle },
              displayName
            ),
            React.createElement(
              'span',
              null,
              '{',
              ' ',
              React.createElement(StringType, { value: value.message }),
              ' ',
              '}'
            )
          );
        }
        if (displayName !== 'Object') {
          // just show the summary
          return React.createElement(
            'div',
            { className: 'type ' + type },
            React.createElement(
              'em',
              { onClick: this.toggle },
              displayName
            ),
            React.createElement(
              'span',
              null,
              '{ … }'
            )
          );
        }

        // intersperce with commas
        types = flatten(zip(types, Array.from({
          length: types.length - 1
        }, function (n, i) {
          return React.createElement(
            'span',
            { key: 'sep-' + i, className: 'sep' },
            ','
          );
        })));

        // do mini output
        return React.createElement(
          'div',
          { className: 'type object closed', onClick: this.toggle },
          React.createElement(
            'em',
            null,
            displayName
          ),
          React.createElement(
            'span',
            null,
            '{',
            ' '
          ),
          types.map(function (obj, i) {
            if (obj && obj.key && obj.value) {
              return React.createElement(
                'span',
                { className: 'object-item key-value', key: 'subtype-' + i },
                React.createElement(
                  'span',
                  { className: 'key' },
                  obj.key,
                  ':'
                ),
                React.createElement(
                  'span',
                  { className: 'value' },
                  obj.value
                )
              );
            }

            return obj;
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
        { className: 'type ' + type + ' ' + (open ? '' : 'closed') },
        React.createElement(
          'div',
          { className: 'header' },
          React.createElement(
            'em',
            { onClick: this.toggle },
            displayName
          ),
          React.createElement(
            'span',
            null,
            '{'
          )
        ),
        React.createElement(
          'div',
          { className: 'group' },
          types.map(function (obj, i) {
            return React.createElement(
              'div',
              { className: 'object-item key-value', key: 'subtype-' + i },
              React.createElement(
                'span',
                { className: 'key' },
                obj.key,
                ':'
              ),
              React.createElement(
                'span',
                { className: 'value' },
                obj.value
              )
            );
          })
        ),
        React.createElement(
          'span',
          null,
          '}'
        )
      );
    }
  }]);

  return ObjectType;
}(Component);

export default ObjectType;