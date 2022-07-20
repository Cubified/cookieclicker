import _regeneratorRuntime from 'babel-runtime/regenerator';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import which from '../../lib/which-type';

var PromiseType = function (_Component) {
  _inherits(PromiseType, _Component);

  function PromiseType(props) {
    _classCallCheck(this, PromiseType);

    var _this = _possibleConstructorReturn(this, (PromiseType.__proto__ || Object.getPrototypeOf(PromiseType)).call(this, props));

    _this.toggle = _this.toggle.bind(_this);

    _this.state = {
      open: props.open,
      promiseValue: undefined,
      status: 'pending'
    };
    return _this;
  }

  _createClass(PromiseType, [{
    key: 'toggle',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(e) {
        var open, _ref2, promiseValue, status;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.props.allowOpen) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return');

              case 2:
                e.stopPropagation();
                e.preventDefault();
                open = !this.state.open;

                if (!open) {
                  _context.next = 12;
                  break;
                }

                _context.next = 8;
                return this.updatePromiseState();

              case 8:
                _ref2 = _context.sent;
                promiseValue = _ref2.promiseValue;
                status = _ref2.status;
                return _context.abrupt('return', this.setState({ promiseValue: promiseValue, status: status, open: open }));

              case 12:

                this.setState({ open: open });

              case 13:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function toggle(_x) {
        return _ref.apply(this, arguments);
      }

      return toggle;
    }()
  }, {
    key: 'updatePromiseState',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
        var promiseValue, status, flag;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                promiseValue = undefined;
                status = 'pending';
                flag = Math.random();
                _context2.prev = 3;
                _context2.next = 6;
                return Promise.race([this.props.value, new Promise(function (resolve) {
                  return setTimeout(function () {
                    return resolve(flag);
                  }, 10);
                })]);

              case 6:
                promiseValue = _context2.sent;


                if (promiseValue !== flag) {
                  status = 'resolved';
                } else {
                  promiseValue = undefined;
                }
                _context2.next = 14;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2['catch'](3);

                promiseValue = _context2.t0;
                status = 'rejected';

              case 14:
                return _context2.abrupt('return', {
                  promiseValue: promiseValue,
                  status: status
                });

              case 15:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[3, 10]]);
      }));

      function updatePromiseState() {
        return _ref3.apply(this, arguments);
      }

      return updatePromiseState;
    }()
  }, {
    key: 'componentDidMount',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
        var _ref5, promiseValue, status;

        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.updatePromiseState();

              case 2:
                _ref5 = _context3.sent;
                promiseValue = _ref5.promiseValue;
                status = _ref5.status;

                this.setState({ promiseValue: promiseValue, status: status });

              case 6:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function componentDidMount() {
        return _ref4.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: 'render',
    value: function render() {
      var filter = this.props.filter;
      var _state = this.state,
          open = _state.open,
          promiseValue = _state.promiseValue,
          status = _state.status;


      var Value = which(promiseValue);

      if (!open) {
        return React.createElement(
          'div',
          { onClick: this.toggle, className: 'type entry closed' },
          React.createElement(
            'em',
            null,
            'Promise'
          ),
          '{ ',
          React.createElement(
            'div',
            { className: 'object-item key-value' },
            React.createElement(
              'span',
              { className: 'key' },
              '[[PromiseStatus]]:'
            ),
            React.createElement(
              'span',
              { className: 'value' },
              status
            )
          ),
          React.createElement(
            'span',
            { className: 'arb-info' },
            ', '
          ),
          React.createElement(
            'div',
            { className: 'object-item key-value' },
            React.createElement(
              'span',
              { className: 'key' },
              '[[PromiseValue]]:'
            ),
            React.createElement(
              'span',
              { className: 'value' },
              React.createElement(Value, {
                filter: filter,
                shallow: true,
                allowOpen: open,
                value: promiseValue
              })
            )
          ),
          ' }'
        );
      }

      return React.createElement(
        'div',
        { onClick: this.toggle, className: 'type promise' },
        React.createElement(
          'div',
          { className: 'header' },
          React.createElement(
            'em',
            null,
            'Promise'
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
          React.createElement(
            'div',
            { className: 'object-item key-value' },
            React.createElement(
              'span',
              { className: 'key' },
              '[[PromiseStatus]]:'
            ),
            React.createElement(
              'span',
              { className: 'value' },
              status
            )
          ),
          React.createElement(
            'div',
            { className: 'object-item key-value' },
            React.createElement(
              'span',
              { className: 'key' },
              '[[PromiseValue]]:'
            ),
            React.createElement(
              'span',
              { className: 'value' },
              React.createElement(Value, {
                filter: filter,
                shallow: true,
                allowOpen: open,
                value: promiseValue
              })
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

  return PromiseType;
}(Component);

export default PromiseType;