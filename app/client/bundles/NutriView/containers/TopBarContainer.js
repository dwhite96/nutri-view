import { connect } from 'react-redux';

import TopBar from '../components/TopBar';
import { searchFood, saveFood, logoutClicked } from '../actions/nutriViewActionCreators';

const mapStateToProps = ({ foodSearchInput, dataFetchResponseMessages }) => ({
  response: foodSearchInput.response,
  dataFetchResponseMessages,
});

const mapDispatchToProps = (dispatch) => ({
  searchFood: (searchTerms) => dispatch(searchFood(searchTerms)),
  saveFood: (foodFDCID) => dispatch(saveFood(foodFDCID)),
  logout: () => dispatch(logoutClicked()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopBar);
