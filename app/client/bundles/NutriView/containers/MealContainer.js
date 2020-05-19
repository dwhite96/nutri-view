import { connect } from 'react-redux';

import Meal from '../components/Meal';
import {
  addFoodItemClicked,
  addSelectedFoodItemToMealClicked,
} from '../actions/mealActionCreators';

const mapStateToProps = ({ foodItems }, { meal }) => ({
  meal,
  foodItems: meal.foodItems.map((id) => foodItems.byId[id]),
  nutrientsData: meal.nutrientsData.allKeys.map((key) => (
    meal.nutrientsData.byKey[key]
  )),
});

const mapDispatchToProps = (dispatch) => ({
  addFoodItem: (foodItemId) => dispatch(addFoodItemClicked(foodItemId)),
  addSelectedFoodItemToMeal: (selectedFood, meal) => {
    dispatch(addSelectedFoodItemToMealClicked(selectedFood, meal));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Meal);
