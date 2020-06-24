import {
  createStore,
  combineReducers,
  applyMiddleware,
  Middleware,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import users from "./users/users-reducer";

const loggerMiddleware: Middleware<any, any, any> = (store) => {
  return (next) => {
    return (action) => {
      console.log("action", action);
      return next(action);
    };
  };
};

const middlewares: Middleware<any, any, any>[] = [loggerMiddleware];
const middlewareEnhancer = applyMiddleware<Function[]>(...middlewares);
const enhancers = [middlewareEnhancer];
const composedEnhancers = composeWithDevTools(...enhancers);

const rootReducer = combineReducers({
  //counter: counter.reducer,
  users: users.reducer,
});

const store = createStore(rootReducer, {}, composedEnhancers);

export default store;
