import _regeneratorRuntime from 'babel-runtime/regenerator';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/*global document window */
import { parse } from 'babylon';
import * as walk from 'babylon-walk';

import copy from 'copy-to-clipboard';

var container = null;

export var bindConsole = function bindConsole(__console) {
  // supported methods
  var apply = ['log', 'error', 'dir', 'info', 'warn', 'assert', 'debug', 'clear'];

  apply.forEach(function (method) {
    container.contentWindow.console[method] = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      window.console[method].apply(window.console, args);
      __console[method].apply(__console, args);
    };
  });
};

export var getContainer = function getContainer() {
  return container;
};

export function createContainer() {
  container = document.createElement('iframe');
  container.width = container.height = 1;
  container.style.opacity = 0;
  container.style.border = 0;
  container.style.position = 'absolute';
  container.style.top = '-100px';
  container.setAttribute('name', '<proxy>');
  document.body.appendChild(container);
  setContainer(container);
}

export function setContainer(iframe) {
  container = iframe;
  var win = container.contentWindow;
  var doc = container.contentDocument;

  win.copy = copy;
  win.$$ = function (s) {
    return Array.from(doc.querySelectorAll(s));
  };
  win.$ = function (s) {
    return doc.querySelector(s);
  };
}

export default (function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(command) {
    var _this = this;

    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', new Promise(function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(resolve) {
                var res, _preProcess, content, additionalCode, doc, script, blob;

                return _regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        res = {
                          error: false,
                          command: command
                        };
                        _context.prev = 1;

                        // // trick from devtools
                        // // via https://chromium.googlesource.com/chromium/src.git/+/4fd348fdb9c0b3842829acdfb2b82c86dacd8e0a%5E%21/#F2
                        if (/^\s*\{/.test(command) && /\}\s*$/.test(command)) {
                          command = '(' + command + ')';
                        }

                        _preProcess = preProcess(command), content = _preProcess.content, additionalCode = _preProcess.additionalCode;

                        // IMPORTANT: because we're going across iframe bridge here, the constructor
                        // of the response value is changed to Object, so even if we return an error
                        // or a promise, `value instanceof Error` will always be false.
                        // This is why across all the code, I actually use the `isa` pattern to get
                        // the original constructor from ({}).toString.call(value)

                        if (!content.startsWith('(async () => ')) {
                          _context.next = 10;
                          break;
                        }

                        _context.next = 7;
                        return container.contentWindow.eval(content);

                      case 7:
                        res.value = _context.sent;
                        _context.next = 11;
                        break;

                      case 10:
                        res.value = container.contentWindow.eval(content);

                      case 11:

                        // if there's no extra code (usually to block out a const), then let's
                        // go ahead and store the result in $_
                        if (!additionalCode) {
                          container.contentWindow.$_ = res.value;
                        }

                        if (!(additionalCode !== null)) {
                          _context.next = 22;
                          break;
                        }

                        doc = container.contentDocument;
                        script = doc.createElement('script');
                        blob = new Blob([additionalCode], {
                          type: 'application/javascript'
                        });

                        script.src = URL.createObjectURL(blob);
                        container.contentWindow.onerror = function (message, file, line, col, error) {
                          res.error = true;
                          res.value = error;
                          resolve(res);
                        };
                        script.onload = function () {
                          resolve(res);
                          container.contentWindow.onerror = function () {};
                        };
                        doc.documentElement.appendChild(script);
                        _context.next = 23;
                        break;

                      case 22:
                        return _context.abrupt('return', resolve(res));

                      case 23:
                        _context.next = 30;
                        break;

                      case 25:
                        _context.prev = 25;
                        _context.t0 = _context['catch'](1);

                        res.error = true;
                        res.value = _context.t0;
                        return _context.abrupt('return', resolve(res));

                      case 30:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, _this, [[1, 25]]);
              }));

              return function (_x2) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  function run(_x) {
    return _ref.apply(this, arguments);
  }

  return run;
})();

export function preProcess(content) {
  var wrapped = '(async () => {' + content + '})()';
  var root = parse(wrapped, { ecmaVersion: 8 });
  var body = root.program.body[0].expression.callee.body;

  var changes = [];
  var containsAwait = false;
  var containsReturn = false;

  var visitors = {
    ClassDeclaration: function ClassDeclaration(node) {
      if (node.parent === body) changes.push({
        text: node.id.name + '=',
        start: node.start,
        end: node.start
      });
    },
    FunctionDeclaration: function FunctionDeclaration(node) {
      changes.push({
        text: node.id.name + '=',
        start: node.start,
        end: node.start
      });
      return node;
    },
    AwaitExpression: function AwaitExpression(node) {
      containsAwait = true;
    },
    ReturnStatement: function ReturnStatement(node) {
      containsReturn = true;
    },
    VariableDeclaration: function VariableDeclaration(node) {
      if (node.kind !== 'var' && node.parent !== body) return;
      var onlyOneDeclaration = node.declarations.length === 1;
      changes.push({
        text: onlyOneDeclaration ? 'void' : 'void (',
        start: node.start,
        end: node.start + node.kind.length
      });
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = node.declarations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var declaration = _step.value;

          if (!declaration.init) {
            changes.push({
              text: '(',
              start: declaration.start,
              end: declaration.start
            });
            changes.push({
              text: '=undefined)',
              start: declaration.end,
              end: declaration.end
            });
            continue;
          }
          changes.push({
            text: '(',
            start: declaration.start,
            end: declaration.start
          });
          changes.push({
            text: ')',
            start: declaration.end,
            end: declaration.end
          });
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

      if (!onlyOneDeclaration) {
        var _last = node.declarations[node.declarations.length - 1];
        changes.push({ text: ')', start: _last.end, end: _last.end });
      }
    }
  };

  walk.simple(body, visitors);

  var last = body.body[body.body.length - 1];
  var additionalCode = null;

  if (last === undefined) {
    return {
      additionalCode: additionalCode,
      content: content
    };
  }

  if (last.type === 'ExpressionStatement') {
    changes.push({
      text: 'return window.$_ = (',
      start: last.start,
      end: last.start
    });
    if (wrapped[last.end - 1] !== ';') changes.push({ text: ')', start: last.end, end: last.end });else changes.push({ text: ')', start: last.end - 1, end: last.end - 1 });
  }

  if (last.type === 'VariableDeclaration' && (last.kind === 'const' || last.kind === 'let')) {
    additionalCode = last.kind + ' ' + last.declarations['0'].id.name + ' = $_';

    changes.push({
      text: last.kind + ' ' + last.declarations['0'].id.name + ' = window.$_',
      start: last.start,
      end: last.declarations['0'].id.end
    });
  }

  // support inline async statements
  if (!containsAwait || containsReturn) {
    if (additionalCode) {
      var offset = 14; // length of `(async () => {`
      content = content.substr(0, last.declarations['0'].id.end - offset) + ' = window.$_' + content.substr(last.declarations['0'].id.end - offset);
    }
    return { content: content, additionalCode: additionalCode };
  }

  while (changes.length) {
    var change = changes.pop();
    wrapped = wrapped.substr(0, change.start) + change.text + wrapped.substr(change.end);
  }

  return { content: wrapped, additionalCode: additionalCode };
}