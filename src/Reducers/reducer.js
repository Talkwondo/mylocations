import {
  CHANGE_TEXT,
  ADD_CATEGORY,
  REMOVE_CATEGORY,
  UPDATE_CATEGORY,
  SELECTED_CATEGORY,
  UNSELECTED_CATEGORY,
  RENAME_CATEGORY,
} from '../Actions/types.js';

const INITIAL_STATE = {
  categories: [],
  addText: '',
  selected: null,
};

export const changeText = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case CHANGE_TEXT:
      return {...state, addText: action.payload};
    default:
      return state;
  }
};

export const changeCategory = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case ADD_CATEGORY:
      const addCategories = [...state.categories, action.payload];
      return {...state, categories: addCategories};
    case REMOVE_CATEGORY:
      const categories = [...state.categories];
      categories.splice(action.payload, 1);
      return {
        ...state,
        categories,
      };
    case UPDATE_CATEGORY:
      return {...state, categories: action.payload};
    case RENAME_CATEGORY:
      const updateCategories = [...state.categories];
      updateCategories[action.payload[0]] = action.payload[1];
      return {
        ...state,
        categories: updateCategories,
      };
    default:
      return state;
  }
};

export const selectCategory = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case SELECTED_CATEGORY:
      return {...state, selected: action.payload};
    case UNSELECTED_CATEGORY:
      return {...state, selected: action.payload};
    default:
      return state;
  }
};
