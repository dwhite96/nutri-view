import { connect } from 'react-redux';

import UserEditForm from '../components/UserEditForm';
import {
  userEditFormSubmitted, userDeleteButtonClicked,
} from '../actions/nutriViewActionCreators';

const mapDispatchToProps = (dispatch) => ({
  userEditFormSubmitted: (userData) => (
    dispatch(userEditFormSubmitted(userData))
  ),
  userDeleteButtonClicked: () => (
    dispatch(userDeleteButtonClicked())
  ),
});

export default connect(
  null,
  mapDispatchToProps,
)(UserEditForm);
