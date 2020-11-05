import { connect } from 'react-redux';

import MainMealsView from '../components/MainMealsView';
import { addMealButtonClicked } from '../actions/mealActionCreators';

const mapStateToProps = ({
  meals, nutrientTypes, total, dataFetchStatus,
}) => ({
  meals: meals.allIds.map((id) => meals.byId[id]),
  total: nutrientTypes.map((key) => (
    total.nutrientsData[key]
  )),
  dataFetchStatus,
});

const mapDispatchToProps = (dispatch) => ({
  addMeal: () => dispatch(addMealButtonClicked()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainMealsView);
