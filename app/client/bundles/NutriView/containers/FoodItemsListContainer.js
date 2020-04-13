import { connect } from 'react-redux';
import FoodItemsList from '../components/FoodItemsList';

const mapStateToProps = (state) => ({ foodItems: state.foodItems });

export default connect(mapStateToProps)(FoodItemsList);
