import _regeneratorRuntime from 'babel-runtime/regenerator';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Console from './Console';
import Input from '../containers/Input';

import run, { bindConsole, createContainer } from '../lib/run';
import internalCommands from '../lib/internal-commands';

// this is lame, but it's a list of key.code that do stuff in the input that we _want_.
var doStuffKeys = /^(Digit|Key|Num|Period|Semi|Comma|Slash|IntlBackslash|Backspace|Delete|Enter)/;

var App = function (_Component) {
  _inherits(App, _Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.onRun = _this.onRun.bind(_this);
    _this.triggerFocus = _this.triggerFocus.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: 'onRun',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(command) {
        var console, _res, _command$slice$split, _command$slice$split2, cmd, args, res;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console = this.console;

                if (!(command[0] !== ':')) {
                  _context.next = 8;
                  break;
                }

                console.push({
                  type: 'command',
                  command: command,
                  value: command
                });
                _context.next = 5;
                return run(command);

              case 5:
                _res = _context.sent;

                console.push(Object.assign({
                  command: command,
                  type: 'response'
                }, _res));
                return _context.abrupt('return');

              case 8:
                _command$slice$split = command.slice(1).split(' '), _command$slice$split2 = _toArray(_command$slice$split), cmd = _command$slice$split2[0], args = _command$slice$split2.slice(1);


                if (/^\d+$/.test(cmd)) {
                  args = [parseInt(cmd, 10)];
                  cmd = 'history';
                }

                if (internalCommands[cmd]) {
                  _context.next = 13;
                  break;
                }

                console.push({
                  command: command,
                  error: true,
                  value: new Error('No such jsconsole command "' + command + '"'),
                  type: 'response'
                });
                return _context.abrupt('return');

              case 13:
                _context.next = 15;
                return internalCommands[cmd]({ args: args, console: console, app: this });

              case 15:
                res = _context.sent;


                if (typeof res === 'string') {
                  res = { value: res };
                }

                if (res !== undefined) {
                  console.push(Object.assign({
                    command: command,
                    type: 'log'
                  }, res));
                }

                return _context.abrupt('return');

              case 19:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onRun(_x) {
        return _ref.apply(this, arguments);
      }

      return onRun;
    }()
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      createContainer();
      bindConsole(this.console);
      var query = decodeURIComponent(window.location.search.substr(1));
      if (query) {
        this.onRun(query);
      } else {
        this.onRun(':welcome');
      }
    }
  }, {
    key: 'triggerFocus',
    value: function triggerFocus(e) {
      if (e.target.nodeName === 'INPUT') return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.code && !doStuffKeys.test(e.code)) return;

      this.input.focus();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          _props$commands = _props.commands,
          commands = _props$commands === undefined ? [] : _props$commands,
          theme = _props.theme,
          layout = _props.layout;


      var className = classnames(['App', 'theme-' + theme, layout]);

      return React.createElement(
        'div',
        {
          tabIndex: '-1',
          onKeyDown: this.triggerFocus,
          ref: function ref(e) {
            return _this2.app = e;
          },
          className: className
        },
        React.createElement(Console, {
          ref: function ref(e) {
            return _this2.console = e;
          },
          commands: commands,
          reverse: layout === 'top'
        }),
        React.createElement(Input, {
          inputRef: function inputRef(e) {
            return _this2.input = e;
          },
          onRun: this.onRun,
          autoFocus: window.top === window,
          onClear: function onClear() {
            _this2.console.clear();
          }
        })
      );
    }
  }]);

  return App;
}(Component);

App.contextTypes = { store: PropTypes.object };

export default App;