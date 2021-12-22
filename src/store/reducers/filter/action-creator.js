import {
  CLEAR_FILTER_DATE,
  SET_FILTER,
  SET_FILTER_BY_DATE,
  SET_SEARCH_TEXT,
  CLEAR_SEARCH_TEXT,
} from ".";

export const FilterActionCreators = {
  setFilter: (payload) => ({ type: SET_FILTER, payload }),
  setFilterByDate: (payload) => ({ type: SET_FILTER_BY_DATE, payload }),
  clearFilterDate: () => ({ type: CLEAR_FILTER_DATE }),

  setSearchText: (text) => {
    return {
      type: SET_SEARCH_TEXT,
      payload: text,
    };
  },

  clearSearchText: () => {
    return {
      type: CLEAR_SEARCH_TEXT,
    };
  },
};
