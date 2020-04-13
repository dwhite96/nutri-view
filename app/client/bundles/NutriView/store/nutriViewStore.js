import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import api from '../middleware/api';
import reducers from '../reducers/index';

const logger = createLogger();

const configureStore = (railsProps) => {
  console.log(railsProps);

  return createStore(
    reducers,
    railsProps,
    composeWithDevTools(
      applyMiddleware(
        thunk,
        api,
        logger,
      ),
    ),
  );
};

export default configureStore;
