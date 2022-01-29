import { createStore, applyMiddleware } from 'redux';
import rootReducer from "./rootReducer";
// import { composeWithDevTools } from 'redux-devtools-extension';
// import logger from 'redux-logger';
// import thunk from 'redux-thunk';

import googleLoginReducer from './googleLoginReducer'

// creation of the redux store
const store = createStore(
  rootReducer
)

export default store