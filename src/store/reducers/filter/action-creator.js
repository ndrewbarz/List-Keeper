import { CLEAR_FILTER_DATE, SET_FILTER, SET_FILTER_BY_DATE } from ".";

export const FilterActionCreators = {
  setFilter: (payload) => ({ type: SET_FILTER, payload }),
  setFilterByDate: (payload) => ({ type: SET_FILTER_BY_DATE, payload }),
  clearFilterDate: () => ({ type: CLEAR_FILTER_DATE }),
};
