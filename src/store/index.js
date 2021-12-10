import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import authReducer from "./reducers/auth";
import filterReducer from "./reducers/filter";
import userDataReducer from "./reducers/userData";
// import reducers from "./reducers";
const middleware = [thunk];
const rootReducer = combineReducers({
  auth: authReducer,
  lists: userDataReducer,
  filter: filterReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
