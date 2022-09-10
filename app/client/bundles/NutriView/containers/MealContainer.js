import { connect } from 'react-redux';

import Meal from '../components/Meal';
import {
  deleteMealClicked,
  removeFromMealButtonClicked,
} from '../actions/mealActionCreators';

const mapStateToProps = ({ foodItems, mealFoodItems, nutrientTypes }, { meal }) => ({
  meal,
  foodItems,
  mealFoodItems: meal.mealFoodItems.map((id) => mealFoodItems.byId[id]),
  nutrientsData: nutrientTypes.map((key) => (
    meal.nutrientsData[key]
  )),
});

const mapDispatchToProps = (dispatch) => ({
  deleteMeal: (meal) => dispatch(deleteMealClicked(meal)),
  removeFoodItemFromMeal: (foodItem, mealId) => {
    dispatch(removeFromMealButtonClicked(foodItem, mealId));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Meal);
