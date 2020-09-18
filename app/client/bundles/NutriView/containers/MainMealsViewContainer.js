import { connect } from 'react-redux';

import MainMealsView from '../components/MainMealsView';
import { addMealButtonClicked } from '../actions/mealActionCreators';

const mapStateToProps = ({ meals, total }) => ({
  meals: meals.allIds.map((id) => meals.byId[id]),
  total: total.nutrientsData.allKeys.map((key) => (
    total.nutrientsData.byKey[key]
  )),
});

const mapDispatchToProps = (dispatch) => ({
  addMeal: () => dispatch(addMealButtonClicked()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainMealsView);
