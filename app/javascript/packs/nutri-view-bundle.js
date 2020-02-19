import ReactOnRails from 'react-on-rails';

import NutriViewApp from '../bundles/NutriView/startup/NutriViewApp';
import FoodSearchApp from '../bundles/NutriView/startup/FoodSearchApp';
import configureStore from '../bundles/NutriView/store/nutriViewStore';

ReactOnRails.register({ NutriViewApp, FoodSearchApp });

ReactOnRails.registerStore({ configureStore });
