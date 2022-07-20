import _regeneratorRuntime from 'babel-runtime/regenerator';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _this = this;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/*global window EventSource fetch */
import { getContainer } from './run';
import isUrl from 'is-url';

var _version = process.env.REACT_APP_VERSION;
var API = process.env.REACT_APP_API || '';

// Missing support
// :load <url> - to inject new DOM

var welcome = function welcome() {
  return {
    value: 'Use <strong>:help</strong> to show jsconsole commands\nversion: ' + _version,
    html: true
  };
};

var help = function help() {
  return {
    value: ':listen [id] - starts remote debugging session\n:theme dark|light\n:load &lt;script_url&gt; load also supports shortcuts to the default file of any npm package, like `:load jquery`\n:clear\n:history\n:about\n:version\ncopy(<value>) and $_ for last value\n\n' + about().value,
    html: true
  };
};

var about = function about() {
  return {
    value: 'Built by <a href="https://twitter.com/rem" target="_blank">@rem</a> • <a href="https://github.com/remy/jsconsole" target="_blank">open source</a> • <a href="https://www.paypal.me/rem/9.99usd" target="_blank">donate</a>',
    html: true
  };
};

var load = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref) {
    var urls = _ref.args,
        console = _ref.console;
    var document;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            document = getContainer().contentDocument;

            urls.forEach(function (url) {
              if (url === "datefns") url = "date-fns"; // Backwards compatibility
              url = isUrl(url) ? url : 'https://cdn.jsdelivr.net/npm/' + url;
              var script = document.createElement('script');
              script.src = url;
              script.onload = function () {
                return console.log('Loaded ' + url);
              };
              script.onerror = function () {
                return console.warn('Failed to load ' + url);
              };
              document.body.appendChild(script);
            });
            return _context.abrupt('return', 'Loading script…');

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  }));

  return function load(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var set = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(_ref3) {
    var _ref3$args = _slicedToArray(_ref3.args, 2),
        key = _ref3$args[0],
        value = _ref3$args[1],
        app = _ref3.app;

    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = key;
            _context2.next = _context2.t0 === 'theme' ? 3 : _context2.t0 === 'layout' ? 5 : 7;
            break;

          case 3:
            if (['light', 'dark'].includes(value)) {
              app.props.setTheme(value);
            }
            return _context2.abrupt('break', 7);

          case 5:
            if (['top', 'bottom'].includes(value)) {
              app.props.setLayout(value);
            }
            return _context2.abrupt('break', 7);

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  }));

  return function set(_x2) {
    return _ref4.apply(this, arguments);
  };
}();

var theme = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(_ref5) {
    var _ref5$args = _slicedToArray(_ref5.args, 1),
        _theme = _ref5$args[0],
        app = _ref5.app;

    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!['light', 'dark'].includes(_theme)) {
              _context3.next = 3;
              break;
            }

            app.props.setTheme(_theme);
            return _context3.abrupt('return');

          case 3:
            return _context3.abrupt('return', 'Try ":theme dark" or ":theme light"');

          case 4:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  }));

  return function theme(_x3) {
    return _ref6.apply(this, arguments);
  };
}();

var history = function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(_ref7) {
    var app = _ref7.app,
        _ref7$args = _slicedToArray(_ref7.args, 1),
        _ref7$args$ = _ref7$args[0],
        n = _ref7$args$ === undefined ? null : _ref7$args$;

    var history, command;
    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            history = app.context.store.getState().history;

            if (!(n === null)) {
              _context4.next = 3;
              break;
            }

            return _context4.abrupt('return', history.map(function (item, i) {
              return i + ': ' + item.trim();
            }).join('\n'));

          case 3:

            // try to re-issue the historical command
            command = history.find(function (item, i) {
              return i === n;
            });

            if (command) {
              app.onRun(command);
            }

            return _context4.abrupt('return');

          case 6:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, _this);
  }));

  return function history(_x4) {
    return _ref8.apply(this, arguments);
  };
}();

var clear = function clear(_ref9) {
  var console = _ref9.console;

  console.clear();
};

var listen = function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(_ref10) {
    var _ref10$args = _slicedToArray(_ref10.args, 1),
        id = _ref10$args[0],
        internalConsole = _ref10.console;

    var res;
    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return fetch(API + '/remote/' + (id || ''));

          case 2:
            res = _context5.sent;
            _context5.next = 5;
            return res.json();

          case 5:
            id = _context5.sent;
            return _context5.abrupt('return', new Promise(function (resolve) {
              var sse = new EventSource(API + '/remote/' + id + '/log');
              sse.onopen = function () {
                resolve('Connected to "' + id + '"\n\n<script src="' + window.location.origin + '/js/remote.js?' + id + '"></script>');
              };

              sse.onmessage = function (event) {
                console.log(event);
                var data = JSON.parse(event.data);
                if (data.response) {
                  if (typeof data.response === 'string') {
                    internalConsole.log(data.response);
                    return;
                  }

                  var _res = data.response.map(function (_) {
                    if (_.startsWith('Error:')) {
                      return new Error(_.split('Error: ', 2).pop());
                    }

                    if (_ === 'undefined') {
                      // yes, the string
                      return undefined;
                    }

                    return JSON.parse(_);
                  });
                  internalConsole.log.apply(internalConsole, _toConsumableArray(_res));
                }
              };

              sse.onclose = function () {
                internalConsole.log('Remote connection closed');
              };
            }));

          case 7:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, _this);
  }));

  return function listen(_x5) {
    return _ref11.apply(this, arguments);
  };
}();

var commands = {
  help: help,
  about: about,
  load: load,
  listen: listen,
  theme: theme,
  clear: clear,
  history: history,
  set: set,
  welcome: welcome,
  version: function version() {
    return _version;
  }
};

export default commands;