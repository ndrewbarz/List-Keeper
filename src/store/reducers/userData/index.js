export const SET_LISTS = "SET_LISTS";
export const ADD_LIST = "ADD_LIST";
export const DELETE_LIST = "DELETE_LIST";
export const UPDATE_LIST = "UPDATE_LIST";
export const SET_CURRENT_LIST = "SET_CURRENT_LIST";
export const CLEAR_CURRENT_LIST = "CLEAR_CURRENT_LIST";
export const SET_LOADING = "SET_LOADING";
export const SET_SEARCH_TEXT = "SET_SEARCH_TEXT";
export const CLEAR_SEARCH_TEXT = "CLEAR_SEARCH_TEXT";

const initialState = {
  lists: [],
  loading: false,
  current: null,
  searchText: "",
};

export default function userDataReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LISTS:
      return { ...state, lists: action.payload, loading: false };

    case SET_LOADING:
      return { ...state, loading: true };

    case ADD_LIST:
      return {
        ...state,
        lists: [...state.lists, action.payload],
        loading: false,
      };

    case DELETE_LIST:
      return {
        ...state,
        lists: state.lists.filter((list) => list._id !== action.payload),
        loading: false,
      };

    case UPDATE_LIST:
      return {
        ...state,
        lists: state.lists.map((list) =>
          list._id === action.payload._id ? action.payload : list
        ),
        loading: false,
      };

    case SET_CURRENT_LIST:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT_LIST:
      return {
        ...state,
        current: null,
      };

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