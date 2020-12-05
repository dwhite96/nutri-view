import { connect } from 'react-redux';

import TopBar from '../components/TopBar';
import {
  searchFood, clearFoodSearchList, saveFood, logoutClicked,
} from '../actions/nutriViewActionCreators';

const mapStateToProps = ({ foodSearchInput, dataFetchStatus, dataFetchResponseMessages }) => ({
  response: foodSearchInput.response,
  dataFetchStatus,
  dataFetchResponseMessages,
});

const mapDispatchToProps = (dispatch) => ({
  searchFood: (searchTerms) => dispatch(searchFood(searchTerms)),
  clearFoodSearchList: () => dispatch(clearFoodSearchList()),
  saveFood: (foodFDCID) => dispatch(saveFood(foodFDCID)),
  logout: () => dispatch(logoutClicked()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopBar);
