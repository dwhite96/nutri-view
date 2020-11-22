import { connect } from 'react-redux';

import FoodItemsList from '../components/FoodItemsList';

const mapStateToProps = ({ railsFoodList }, ownProps) => ({
  foodItems: railsFoodList,
  mealFoodItemIds: ownProps.mealFoodItemIds,
  setSelectedFood: ownProps.setSelectedFood,
});

export default connect(
  mapStateToProps,
)(FoodItemsList);
