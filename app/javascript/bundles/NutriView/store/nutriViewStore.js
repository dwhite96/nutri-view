import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import api from '../middleware/api';
import reducers from '../reducers/index';

const logger = createLogger();

const configureStore = () => (
  createStore(
    reducers,
    composeWithDevTools(
      applyMiddleware(
        thunk,
        api,
        logger,
      ),
    ),
  )
);

export default configureStore;
