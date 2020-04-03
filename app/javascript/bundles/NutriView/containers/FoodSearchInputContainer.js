import { connect } from 'react-redux';

import { searchFood, saveFood } from '../actions/nutriViewActionCreators';
import FoodSearchInput from '../components/FoodSearchInput';

const mapStateToProps = (state) => ({
  isFetching: state.foodRequest.isFetching,
  response: state.foodRequest.response,
});

const mapDispatchToProps = (dispatch) => ({
  searchFood: (searchTerms) => dispatch(searchFood(searchTerms)),
  saveFood: (foodFDCID) => dispatch(saveFood(foodFDCID)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FoodSearchInput);
