import { Store, createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import { state } from './reducers';

const a: any = window;
const composeEnhancers = a.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// TODO: Re-enable logging
const enhancer = composeEnhancers(
  // applyMiddleware(reduxThunk),
  applyMiddleware(reduxThunk, logger),
  // other store enhancers if any
);

export const store: Store<any> = createStore(
  state,
  enhancer
);


