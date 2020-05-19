import { connect } from 'react-redux';

import MainMealsView from '../components/MainMealsView';
import { addMealButtonClicked } from '../actions/mealActionCreators';

const mapStateToProps = ({ meals }) => ({
  meals: meals.allIds.map((id) => meals.byId[id]),
});

const mapDispatchToProps = (dispatch) => ({
  addMeal: (mealNumber) => dispatch(addMealButtonClicked(mealNumber)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainMealsView);
