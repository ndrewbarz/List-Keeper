export const SET_FILTER = "SET_FILTER";
export const SET_FILTER_BY_DATE = "SET_FILTER_BY_DATE";
export const CLEAR_FILTER_DATE = "CLEAR_FILTER_DATE";
export const SET_SEARCH_TEXT = "SET_SEARCH_TEXT";
export const CLEAR_SEARCH_TEXT = "CLEAR_SEARCH_TEXT";

const initialState = {
  filterFavorites: false,
  filterByDate: "",
  searchText: "",
};

export default function filter(state = initialState, action) {
  switch (action.type) {
    case SET_FILTER:
      return { ...state, filterFavorites: action.payload };

    case SET_FILTER_BY_DATE:
      return { ...state, filterByDate: action.payload };

    case CLEAR_FILTER_DATE:
      return { ...state, filterByDate: "" };

    case SET_SEARCH_TEXT:
      return {
        ...state,
        searchText: action.payload,
      };

    case CLEAR_SEARCH_TEXT:
      return {
        ...state,
        searchText: "",
      };

    default:
      return state;
  }
}
