import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import reducers from '../reducers/index';

const logger = createLogger();

const configureStore = railsProps => {
  console.log(railsProps);

  return createStore(
    reducers,
    railsProps,
    applyMiddleware(logger)
  );
};

export default configureStore;
