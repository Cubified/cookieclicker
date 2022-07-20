import _regeneratorRuntime from 'babel-runtime/regenerator';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import Filter from './Filter';
import CopyToClipboard from 'react-copy-to-clipboard';

var LineNav = function (_Component) {
  _inherits(LineNav, _Component);

  function LineNav(props) {
    _classCallCheck(this, LineNav);

    var _this = _possibleConstructorReturn(this, (LineNav.__proto__ || Object.getPrototypeOf(LineNav)).call(this, props));

    _this.preCopy = _this.preCopy.bind(_this);
    _this.toggleFilter = _this.toggleFilter.bind(_this);
    _this.onPermalink = _this.onPermalink.bind(_this);

    var type = {}.toString.call(props.value) || 'string';
    _this.state = {
      text: null,
      type: type,
      filter: false,
      copyAsHTML: type.includes('Element')
    };
    return _this;
  }

  _createClass(LineNav, [{
    key: 'onPermalink',
    value: function onPermalink(e) {
      // let this throw if no support
      window.history.pushState(null, document.title, e.target.search);
      e.preventDefault();
    }
  }, {
    key: 'preCopy',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var original, _props, value, type, text;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // work out how we should copy this thing
                original = this.props.value;
                _props = this.props, value = _props.value, type = _props.type;

                if (!this.state.copyAsHTML) {
                  _context.next = 5;
                  break;
                }

                this.setState({ text: value.outerHTML });
                return _context.abrupt('return');

              case 5:
                if (!(typeof value === 'function')) {
                  _context.next = 8;
                  break;
                }

                this.setState({ text: value.toString() });
                return _context.abrupt('return');

              case 8:
                if (!(typeof value === 'string')) {
                  _context.next = 11;
                  break;
                }

                this.setState({ text: value });
                return _context.abrupt('return');

              case 11:
                if (!(type === '[object Promise]')) {
                  _context.next = 17;
                  break;
                }

                _context.next = 14;
                return value;

              case 14:
                text = _context.sent;

                this.setState({ text: text });
                return _context.abrupt('return');

              case 17:

                if (value instanceof Error || type === '[object Error]') {
                  // get real props and add the stack no matter what (FF excludes it)
                  value = Object.getOwnPropertyNames(value).reduce(function (acc, curr) {
                    acc[curr] = value[curr];
                    return acc;
                  }, {});

                  value.stack = original.stack;
                }

                this.setState({ text: JSON.stringify(value, '', 2) });

              case 19:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function preCopy() {
        return _ref.apply(this, arguments);
      }

      return preCopy;
    }()
  }, {
    key: 'toggleFilter',
    value: function toggleFilter(e) {
      e.preventDefault();
      var filter = !this.state.filter;
      this.setState({
        filter: filter
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          command = _props2.command,
          value = _props2.value,
          onFilter = _props2.onFilter;
      var _state = this.state,
          text = _state.text,
          filter = _state.filter,
          copyAsHTML = _state.copyAsHTML;


      var copyAs = typeof value === 'function' ? 'Copy function' : copyAsHTML ? 'Copy as HTML' : 'Copy as JSON';

      return React.createElement(
        'div',
        { className: 'LineNav' },
        (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && React.createElement(
          Filter,
          {
            ref: function ref(e) {
              return _this2.filter = e;
            },
            onFilter: onFilter,
            enabled: filter
          },
          React.createElement(
            'button',
            { onClick: this.toggleFilter, className: 'icon search' },
            'search'
          )
        ),
        command && React.createElement(
          'a',
          {
            onClick: this.onPermalink,
            title: 'Permalink',
            className: 'icon link',
            href: '?' + escape(command)
          },
          'link'
        ),
        React.createElement(
          CopyToClipboard,
          { text: text },
          React.createElement(
            'button',
            {
              title: copyAs,
              className: 'icon copy',
              onMouseDown: function onMouseDown() {
                if (text === null) {
                  _this2.preCopy();
                }
              }
            },
            'copy'
          )
        )
      );
    }
  }]);

  return LineNav;
}(Component);

export default LineNav;