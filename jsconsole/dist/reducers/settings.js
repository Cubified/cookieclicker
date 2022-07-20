import { SET_THEME, SET_LAYOUT } from '../actions/Settings';

var defaultState = {
  theme: 'light',
  layout: 'bottom',
  remote: false
};

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments[1];

  if (action.type === SET_THEME) {
    return Object.assign({}, state, { theme: action.value });
  }

  if (action.type === SET_LAYOUT) {
    return Object.assign({}, state, { layout: action.value });
  }

  return state;
};

export default reducer;