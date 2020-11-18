import { connect } from 'react-redux';

import Meal from '../components/Meal';
import {
  deleteMealClicked,
  addSelectedFoodItemToMealClicked,
  removeFromMealButtonClicked,
} from '../actions/mealActionCreators';
import { searchFood, nutriViewDatabaseSearch } from '../actions/nutriViewActionCreators';

const mapStateToProps = ({ foodItems, nutrientTypes }, { meal }) => ({
  meal,
  foodItems: meal.foodItems.map((id) => foodItems.byId[id]),
  nutrientsData: nutrientTypes.map((key) => (
    meal.nutrientsData[key]
  )),
});

const mapDispatchToProps = (dispatch) => ({
  deleteMeal: (meal) => dispatch(deleteMealClicked(meal)),
  searchFood: (searchTerms) => dispatch(searchFood(searchTerms)),
  nutriViewDatabaseSearch: (searchTerms) => dispatch(nutriViewDatabaseSearch(searchTerms)),
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
