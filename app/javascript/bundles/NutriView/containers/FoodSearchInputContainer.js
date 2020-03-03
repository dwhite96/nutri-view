import { connect } from 'react-redux';

import { searchFood } from '../actions/nutriViewActionCreators';
import FoodSearchInput from '../components/FoodSearchInput';

const mapStateToProps = (state) => ({
  isFetching: state.foodSearch.isFetching,
  response: state.foodSearch.response,
});

const mapDispatchToProps = (dispatch) => ({
  searchFood: (searchTerms) => dispatch(searchFood(searchTerms)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FoodSearchInput);
