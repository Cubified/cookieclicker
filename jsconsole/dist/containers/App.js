import { connect } from 'react-redux';
import App from '../components/App';
import { setTheme, setLayout } from '../actions/Settings';

export default connect(function (_ref) {
  var settings = _ref.settings;
  return {
    theme: settings.theme,
    layout: settings.layout
  };
}, { setTheme: setTheme, setLayout: setLayout })(App);