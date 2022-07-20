function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var ADD_HISTORY = 'ADD_HISTORY';

var defaultState = [];

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments[1];

  if (action.type === ADD_HISTORY) {
    if (state.slice(-1).pop() !== action.value) {
      return [].concat(_toConsumableArray(state), [action.value]);
    }
  }

  return state;
};

export default reducer;