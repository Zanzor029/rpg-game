import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from './reducers'
const initialState = {}

var getComposeEnhancers = () => {
    if (window.navigator.userAgent.includes('Chrome') || window.navigator.userAgent.includes('Firefox')){
      return compose(
        applyMiddleware(thunk)
        ,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      );
    }
    return compose(applyMiddleware(thunk) );
  };

  const store = createStore(rootReducer, initialState, getComposeEnhancers() );

export default store
