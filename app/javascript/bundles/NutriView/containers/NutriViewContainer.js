import { connect } from 'react-redux';
import * as actions from '../actions/nutriViewActionCreators';
import NutriView from '../components/NutriView';

// Which part of the Redux global state does our component want to receive as props?
const mapStateToProps = (state) => ({ data: state.data });

// Don't forget to actually use connect!
// Note that we don't export NutriView, but the redux "connected" version of it.
// See https://github.com/reactjs/react-redux/blob/master/docs/api.md#examples
export default connect(mapStateToProps, actions)(NutriView);
