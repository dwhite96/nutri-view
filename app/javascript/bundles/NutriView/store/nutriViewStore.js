import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import api from '../middleware/api';
import reducers from '../reducers/index';

const logger = createLogger();

const configureStore = railsProps => {
  console.log(railsProps);

  return createStore(
    reducers,
    railsProps,
    applyMiddleware(
      thunk,
      api,
      logger
    )
  );
};

export default configureStore;
