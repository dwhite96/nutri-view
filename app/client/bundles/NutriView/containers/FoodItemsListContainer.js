import { connect } from 'react-redux';

import FoodItemsList from '../components/FoodItemsList';

const mapStateToProps = ({ foodItems }) => ({
  foodItems: foodItems.allIds.map((id) => foodItems.byId[id]),
});

export default connect(
  mapStateToProps,
)(FoodItemsList);
