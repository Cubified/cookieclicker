import { combineReducers } from 'redux';
import history from './history';
import settings from './settings';

export default combineReducers({
  history: history,
  settings: settings
});