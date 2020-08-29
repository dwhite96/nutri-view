import ReactOnRails from 'react-on-rails';

import TopBar from '../bundles/NutriView/startup/TopBarApp';
import MainMealsApp from '../bundles/NutriView/startup/MainMealsApp';
import FoodItemsList from '../bundles/NutriView/startup/FoodItemsListApp';
import RegistrationApp from '../bundles/NutriView/startup/RegistrationApp';
import LoginApp from '../bundles/NutriView/startup/LoginApp';
import Footer from '../bundles/NutriView/components/Footer';
import configureStore from '../bundles/NutriView/store/nutriViewStore';

ReactOnRails.register({ TopBar });

ReactOnRails.register({ MainMealsApp });

ReactOnRails.register({ FoodItemsList });

ReactOnRails.register({ RegistrationApp });

ReactOnRails.register({ LoginApp });

ReactOnRails.register({ Footer });

ReactOnRails.registerStore({ configureStore });
