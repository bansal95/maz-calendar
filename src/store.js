
import { 
	loadState,
	saveState 
} from './localStorage';

import { 
	compose, 
	createStore, 
	applyMiddleware 
} from 'redux';

import { 
	createLogger 
} from 'redux-logger';

import thunkMiddleware from 'redux-thunk';

import reducers from './redux'


const enhancers = [];

const loggerMiddleware = createLogger();

const middleware = [
  thunkMiddleware,
  loggerMiddleware,
]

const persistedState = loadState();

export const store = createStore(
  reducers,
  persistedState,
  compose(
    applyMiddleware(...middleware,),
    ...enhancers
  )
);


store.subscribe(() => {
  saveState({
	  calendar: store.getState().calendar,
  });
});
