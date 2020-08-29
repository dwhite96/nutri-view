import { connect } from 'react-redux';

import LoginForm from '../components/LoginForm';
import { loginFormSubmitted } from '../actions/nutriViewActionCreators';

const mapDispatchToProps = (dispatch) => ({
  loginFormSubmitted: (loginData) => dispatch(loginFormSubmitted(loginData)),
});

export default connect(
  null,
  mapDispatchToProps,
)(LoginForm);
