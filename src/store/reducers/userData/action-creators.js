import axios from "axios";
import {
  ADD_LIST,
  DELETE_LIST,
  SET_LISTS,
  UPDATE_LIST,
  SET_CURRENT_LIST,
  CLEAR_CURRENT_LIST,
  SET_LOADING,
  ADD_CATEGORY,
} from ".";
import UserDataService from "../../../services/UserDataService";

export const ListsActionCreators = {
  // set loading
  setLoading: () => ({ type: SET_LOADING }),
  // fetch all lists
  setLists: (payload) => ({ type: SET_LISTS, payload }),
  fetchLists: () => async (dispatch) => {
    dispatch(ListsActionCreators.setLoading());
    try {
      const { data } = await UserDataService.fetchUserData();
      dispatch(ListsActionCreators.setLists(data.lists));
    } catch (err) {
      console.log(err);
    }
  },

  // add list
  addNewList: (payload) => ({
    type: ADD_LIST,
    payload,
  }),
  addList: (list) => async (dispatch) => {
    dispatch(ListsActionCreators.setLoading());

    const data = await UserDataService.addList(list);
    dispatch(ListsActionCreators.addNewList(data.data.listData));
  },

  // delete list
  deleteCurrentList: (payload) => ({
    type: DELETE_LIST,
    payload,
  }),
  deleteList: (id) => async (dispatch) => {
    dispatch(ListsActionCreators.setLoading());
    await UserDataService.deleteList(id);
    dispatch(ListsActionCreators.deleteCurrentList(id));
  },

  // update list
  updateCurrentList: (data) => ({
    type: UPDATE_LIST,
    payload: data,
  }),
  updateList: (list) => async (dispatch) => {
    try {
      dispatch(ListsActionCreators.setLoading());
      const response = await axios.put(
        `https://your-list-app.herokuapp.com/api/list/${list.id}`,
        list,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      dispatch(ListsActionCreators.updateCurrentList(response.data.listData));
    } catch (err) {
      console.log(err);
    }
  },

  // set current list
  setCurrentList: (list) => {
    return {
      type: SET_CURRENT_LIST,
      payload: list,
    };
  },
  clearCurrentList: (list) => {
    return {
      type: CLEAR_CURRENT_LIST,
      payload: list,
    };
  },

  // add new category
  addNewCategory: (payload) => ({
    type: ADD_CATEGORY,
    payload,
  }),
  addCategory: (category) => async (dispatch) => {
    dispatch(ListsActionCreators.setLoading());

    dispatch(ListsActionCreators.addNewCategory(category));
  },
};
