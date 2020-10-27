import { connect } from 'react-redux';

import MainMealsView from '../components/MainMealsView';
import { addMealButtonClicked } from '../actions/mealActionCreators';

const mapStateToProps = ({ meals, nutrientTypes, total }) => ({
  meals: meals.allIds.map((id) => meals.byId[id]),
  total: nutrientTypes.map((key) => (
    total.nutrientsData[key]
  )),
});

const mapDispatchToProps = (dispatch) => ({
  addMeal: () => dispatch(addMealButtonClicked()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainMealsView);
