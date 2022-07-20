import reducers from './reducers';
import { createStore, compose, applyMiddleware } from 'redux';
import { SET_THEME, SET_LAYOUT } from './actions/Settings';
import { ADD_HISTORY } from './actions/Input';

var save = function save(key, value) {
  var store = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'session';

  try {
    window[store + 'Storage'].setItem('jsconsole.' + key, JSON.stringify(value));
  } catch (e) {}
};

var middleware = [applyMiddleware(function (store) {
  return function (next) {
    return function (action) {
      var nextAction = next(action);
      var state = store.getState(); // new state after action was applied

      if (action.type === SET_THEME || action.type === SET_LAYOUT) {
        save('settings', state.settings, 'local');
      }

      if (action.type === ADD_HISTORY) {
        save('history', state.history);
      }

      return nextAction;
    };
  };
})];

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  middleware.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}

var finalCreateStore = compose.apply(undefined, middleware)(createStore);

var defaults = {};
try {
  defaults.settings = JSON.parse(localStorage.getItem('jsconsole.settings') || '{}');
  defaults.history = JSON.parse(sessionStorage.getItem('jsconsole.history') || '[]');
} catch (e) {
  console.log(e);
}

var store = finalCreateStore(reducers, defaults);
export default store;