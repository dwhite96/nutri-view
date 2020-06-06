import { connect } from 'react-redux';

import Meal from '../components/Meal';
import {
  deleteMealClicked,
  addFoodItemClicked,
  addSelectedFoodItemToMealClicked,
  removeFromMealButtonClicked,
} from '../actions/mealActionCreators';

const mapStateToProps = ({ foodItems }, { meal }) => ({
  meal,
  foodItems: meal.foodItems.map((id) => foodItems.byId[id]),
  nutrientsData: meal.nutrientsData.allKeys.map((key) => (
    meal.nutrientsData.byKey[key]
  )),
});

const mapDispatchToProps = (dispatch) => ({
  deleteMeal: (mealId) => dispatch(deleteMealClicked(mealId)),
  addFoodItem: (foodItemId) => dispatch(addFoodItemClicked(foodItemId)),
  addSelectedFoodItemToMeal: (selectedFood, mealId) => {
    dispatch(addSelectedFoodItemToMealClicked(selectedFood, mealId));
  },
  removeFoodItemFromMeal: (foodItem, mealId) => {
    dispatch(removeFromMealButtonClicked(foodItem, mealId));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Meal);
