import {
  CHANGE_TEXT_CATEGORY,
  ADD_CATEGORY,
  REMOVE_CATEGORY,
  UPDATE_CATEGORY,
  SELECTED_CATEGORY,
  UNSELECTED_CATEGORY,
  RENAME_CATEGORY,
  CHANGE_TEXT_LOCATION,
  ADD_LOCATION,
  REMOVE_LOCATION,
  RENAME_LOCATION,
  UPDATE_LOCATION,
  SELECTED_LOCATION,
  UNSELECTED_LOCATION,
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

export const actionLocation = (location, type, name) => {
  return type === 'add'
    ? {
        type: ADD_LOCATION,
        payload: location,
      }
    : type === 'remove'
    ? {
        type: REMOVE_LOCATION,
        payload: location,
      }
    : type === 'rename'
    ? {
        type: RENAME_LOCATION,
        payload: [location, name],
      }
    : {
        type: UPDATE_LOCATION,
        payload: location,
      };
};

export const changeText = (text) => ({
  type: CHANGE_TEXT_CATEGORY,
  payload: text,
});

export const changeTextLocation = (text) => ({
  type: CHANGE_TEXT_LOCATION,
  payload: text,
});

export const selectedLocation = (name) => ({
  type: SELECTED_LOCATION,
  payload: name,
});

export const unSelectedLocation = () => ({
  type: UNSELECTED_LOCATION,
  payload: null,
});

export const selectedCategory = (id) => ({
  type: SELECTED_CATEGORY,
  payload: id.toString(),
});

export const unSelectedCategory = () => ({
  type: UNSELECTED_CATEGORY,
  payload: null,
});
