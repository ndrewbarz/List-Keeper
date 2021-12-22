import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import authReducer from "./reducers/auth";
import filter from "./reducers/filter";
import userDataReducer from "./reducers/userData";

const middleware = [thunk];

const rootReducer = combineReducers({
  auth: authReducer,
  userData: userDataReducer,
  filter,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
