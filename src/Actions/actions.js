import {
  CHANGE_TEXT,
  ADD_CATEGORY,
  REMOVE_CATEGORY,
  UPDATE_CATEGORY,
  SELECTED_CATEGORY,
  UNSELECTED_CATEGORY,
  RENAME_CATEGORY,
} from './types';

export const actionCategory = (category, type, name) => {
  return type === 'add'
    ? {
        type: ADD_CATEGORY,
        payload: category,
      }
    : type === 'remove'
    ? {
        type: REMOVE_CATEGORY,
        payload: category,
      }
    : type === 'rename'
    ? {
        type: RENAME_CATEGORY,
        payload: [category, name],
      }
    : {
        type: UPDATE_CATEGORY,
        payload: category,
      };
};

export const changeText = (text) => ({
  type: CHANGE_TEXT,
  payload: text,
});

export const selectedCategory = (id) => ({
  type: SELECTED_CATEGORY,
  payload: id.toString(),
});

export const unSelectedCategory = () => ({
  type: UNSELECTED_CATEGORY,
  payload: null,
});
