import _regeneratorRuntime from 'babel-runtime/regenerator';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

// TODO import Autocomplete from './Autocomplete';
import keycodes from '../lib/keycodes';

var Input = function (_Component) {
  _inherits(Input, _Component);

  function Input(props) {
    _classCallCheck(this, Input);

    // history is set in the componentDidMount
    var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));

    _this.state = {
      value: props.value || '',
      multiline: false,
      rows: 1,
      historyCursor: props.history.length
    };
    _this.onChange = _this.onChange.bind(_this);
    _this.onKeyPress = _this.onKeyPress.bind(_this);
    return _this;
  }

  _createClass(Input, [{
    key: 'onChange',
    value: function onChange() {
      var value = this.input.value;

      var length = value.split('\n').length;
      this.setState({
        multiline: length > 1,
        rows: length < 20 ? length : 20,
        value: value
      });
    }
  }, {
    key: 'onKeyPress',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(e) {
        var code, multiline, history, historyCursor, command;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                code = keycodes[e.keyCode];
                multiline = this.state.multiline;
                history = this.props.history;
                historyCursor = this.state.historyCursor;

                // FIXME in multiline, cursor up when we're at the top
                // const cursor = getCursor(this.input);

                if (!(e.ctrlKey && code === 'l')) {
                  _context.next = 7;
                  break;
                }

                this.props.onClear();
                return _context.abrupt('return');

              case 7:
                if (multiline) {
                  _context.next = 24;
                  break;
                }

                if (!(code === 'up arrow')) {
                  _context.next = 16;
                  break;
                }

                historyCursor--;

                if (!(historyCursor < 0)) {
                  _context.next = 13;
                  break;
                }

                this.setState({ historyCursor: 0 });
                return _context.abrupt('return');

              case 13:
                this.setState({ historyCursor: historyCursor, value: history[historyCursor] });
                // this.onChange();
                e.preventDefault();
                return _context.abrupt('return');

              case 16:
                if (!(code === 'down arrow')) {
                  _context.next = 24;
                  break;
                }

                historyCursor++;

                if (!(historyCursor >= history.length)) {
                  _context.next = 21;
                  break;
                }

                this.setState({ historyCursor: history.length, value: '' });
                return _context.abrupt('return');

              case 21:
                this.setState({ historyCursor: historyCursor, value: history[historyCursor] });
                e.preventDefault();
                return _context.abrupt('return');

              case 24:
                command = this.input.value;

                if (!(code === 'enter')) {
                  _context.next = 38;
                  break;
                }

                if (!e.shiftKey) {
                  _context.next = 28;
                  break;
                }

                return _context.abrupt('return');

              case 28:
                if (command) {
                  _context.next = 31;
                  break;
                }

                e.preventDefault();
                return _context.abrupt('return');

              case 31:

                this.props.addHistory(command);
                this.setState({ historyCursor: history.length + 1, value: '' });
                e.preventDefault();
                _context.next = 36;
                return this.props.onRun(command);

              case 36:
                // Don't use `this.input.scrollIntoView();` as it messes with iframes
                window.scrollTo(0, document.body.scrollHeight);
                return _context.abrupt('return');

              case 38:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onKeyPress(_x) {
        return _ref.apply(this, arguments);
      }

      return onKeyPress;
    }()
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var autoFocus = this.props.autoFocus;

      return React.createElement(
        'div',
        { className: 'Input' },
        React.createElement('textarea', {
          className: 'cli',
          rows: this.state.rows,
          autoFocus: autoFocus,
          ref: function ref(e) {
            _this2.input = e;
            _this2.props.inputRef(e);
          },
          value: this.state.value,
          onChange: this.onChange,
          onKeyDown: this.onKeyPress
        })
      );
    }
  }]);

  return Input;
}(Component);

export default Input;