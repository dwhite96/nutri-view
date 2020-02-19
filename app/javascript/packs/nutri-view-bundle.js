import ReactOnRails from 'react-on-rails';

import FoodSearchComponent from '../bundles/NutriView/startup/FoodSearchComponent';
import configureStore from '../bundles/NutriView/store/nutriViewStore';

ReactOnRails.register({ FoodSearchComponent });

ReactOnRails.registerStore({ configureStore });
