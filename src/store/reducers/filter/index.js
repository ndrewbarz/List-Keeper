export const SET_FILTER = "SET_FILTER";
export const SET_FILTER_BY_DATE = "SET_FILTER_BY_DATE";
export const CLEAR_FILTER_DATE = "CLEAR_FILTER_DATE";

const initialState = {
  filter: false,
  filterByDate: "",
};

export default function filterReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FILTER:
      return { ...state, filter: action.payload };

    case SET_FILTER_BY_DATE:
      return { ...state, filterByDate: action.payload };

    case CLEAR_FILTER_DATE:
      return { ...state, filterByDate: "" };

    default:
      return state;
  }
}
