import { connect } from 'react-redux';
import Input from '../components/Input';
import { addHistory } from '../actions/Input';

export default connect(function (_ref) {
  var history = _ref.history;
  return { history: history };
}, { addHistory: addHistory })(Input);