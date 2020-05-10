import { connect } from 'react-redux';

import MainMealsView from '../components/MainMealsView';
import { addMealButtonClicked } from '../actions/mealActionCreators';

const mapStateToProps = ({ mealCollection }) => ({
  isFetching: mealCollection.isFetching,
  meals: mealCollection.meals,
});

const mapDispatchToProps = (dispatch) => ({
  addMeal: (mealNumber) => dispatch(addMealButtonClicked(mealNumber)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainMealsView);
