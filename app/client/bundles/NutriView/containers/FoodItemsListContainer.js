import { connect } from 'react-redux';

import FoodItemsList from '../components/FoodItemsList';

const mapStateToProps = ({ foodItems }, ownProps) => ({
  foodItems: foodItems.allIds.map((id) => foodItems.byId[id]),
  setSelectedFood: ownProps.setSelectedFood,
});

export default connect(
  mapStateToProps,
)(FoodItemsList);
