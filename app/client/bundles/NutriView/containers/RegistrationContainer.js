import { connect } from 'react-redux';

import RegistrationForm from '../components/RegistrationForm';
import { registrationFormSubmitted } from '../actions/nutriViewActionCreators';

const mapDispatchToProps = (dispatch) => ({
  registrationFormSubmitted: (registrationData) => (
    dispatch(registrationFormSubmitted(registrationData))
  ),
});

export default connect(
  null,
  mapDispatchToProps,
)(RegistrationForm);
