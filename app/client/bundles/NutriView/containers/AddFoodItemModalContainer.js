import { connect } from 'react-redux';

import { nutriViewDatabaseSearch, clearFoodSearchList } from '../actions/nutriViewActionCreators';
import { addSelectedFoodItemToMealClicked } from '../actions/mealActionCreators';
import AddFoodItemModal from '../components/AddFoodItemModal';

const mapStateToProps = ({ railsFoodList, dataFetchStatus }, ownProps) => ({
  visible: ownProps.visible,
  setVisible: ownProps.setVisible,
  mealId: ownProps.mealId,
  mealFoodItemIds: ownProps.mealFoodItemIds,
  foodSearchList: railsFoodList,
  dataFetchStatus,
});

const mapDispatchToProps = (dispatch) => ({
  nutriViewDatabaseSearch: (searchTerms) => dispatch(nutriViewDatabaseSearch(searchTerms)),
  addSelectedFoodItemToMeal: (selectedFood, mealId, servings) => {
    dispatch(addSelectedFoodItemToMealClicked(selectedFood, mealId, servings));
  },
  clearFoodSearchList: () => dispatch(clearFoodSearchList()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddFoodItemModal);
