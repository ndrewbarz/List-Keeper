export const SET_LISTS = "SET_LISTS";
export const ADD_LIST = "ADD_LIST";
export const DELETE_LIST = "DELETE_LIST";
export const UPDATE_LIST = "UPDATE_LIST";
export const SET_CURRENT_LIST = "SET_CURRENT_LIST";
export const CLEAR_CURRENT_LIST = "CLEAR_CURRENT_LIST";
export const SET_LOADING = "SET_LOADING";
//
export const ADD_CATEGORY = "ADD_CATEGORY";

const initialState = {
  lists: [],
  loading: false,
  current: null,
  categories: [
    { id: 1, name: "Food", color: "#3d4376" },
    { id: 2, name: "Technics", color: "#ad38a4" },
    { id: 3, name: "Animals", color: "#459528" },
    { id: 4, name: "Drinks", color: "#a12b0f" },
    { id: 5, name: "Tools", color: "#072a2a" },
  ],
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

    //
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload],
        loading: false,
      };

    default:
      return state;
  }
}
