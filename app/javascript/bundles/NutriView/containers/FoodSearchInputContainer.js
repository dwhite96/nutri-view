import { connect } from 'react-redux';

import { foodSearchRequest } from '../actions/nutriViewActionCreators';
import FoodSearchInput from '../components/FoodSearchInput';

const mapStateToProps = (state) => ({ data: state.data });

const mapDispatchToProps = dispatch => ({
  searchFood: searchTerms => dispatch(foodSearchRequest(searchTerms))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FoodSearchInput);
