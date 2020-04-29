import { connect } from 'react-redux';

import TopBar from '../components/TopBar';
import { searchFood, saveFood } from '../actions/nutriViewActionCreators';

const mapStateToProps = (state) => ({
  isFetching: state.foodSearchInput.isFetching,
  response: state.foodSearchInput.response,
});

const mapDispatchToProps = (dispatch) => ({
  searchFood: (searchTerms) => dispatch(searchFood(searchTerms)),
  saveFood: (foodFDCID) => dispatch(saveFood(foodFDCID)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopBar);