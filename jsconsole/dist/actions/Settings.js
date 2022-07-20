export var SET_THEME = 'SET_THEME';
export var SET_LAYOUT = 'SET_LAYOUT';
export function setTheme(value) {
  return { type: SET_THEME, value: value };
};
export function setLayout(value) {
  return { type: SET_LAYOUT, value: value };
};