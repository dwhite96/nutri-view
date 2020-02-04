import ReactOnRails from 'react-on-rails';

import NutriViewApp from '../bundles/NutriView/startup/NutriViewApp';
import configureStore from '../bundles/NutriView/store/nutriViewStore';

ReactOnRails.register({ NutriViewApp });

ReactOnRails.registerStore({ configureStore });
