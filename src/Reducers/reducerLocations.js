import {
  CHANGE_TEXT_LOCATION,
  ADD_LOCATION,
  REMOVE_LOCATION,
  UPDATE_LOCATION,
  SELECTED_LOCATION,
  UNSELECTED_LOCATION,
  RENAME_LOCATION,
} from '../Actions/types.js';

const INITIAL_STATE = {
  locations: [],
  addTextLocation: '',
  selectedLocation: null,
};

export const changeTextLocation = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case CHANGE_TEXT_LOCATION:
      return {...state, addTextLocation: action.payload};
    default:
      return state;
  }
};

export const changeLocation = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case ADD_LOCATION:
      const addlocations = [...state.locations, action.payload];
      return {...state, locations: addlocations};

    case REMOVE_LOCATION:
      const newLocations = state.locations.filter(
        (obj) => obj.name !== action.payload,
      );
      return {...state, locations: newLocations};

    case UPDATE_LOCATION:
      return {...state, locations: action.payload};

    case RENAME_LOCATION:
      const updateLocations = [...state.locations].map((obj) => {
        return obj.name === action.payload[0]
          ? {name: action.payload[1], category: obj.category}
          : obj;
      });
      return {
        ...state,
        locations: updateLocations,
      };
    default:
      return state;
  }
};

export const selectLocation = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case SELECTED_LOCATION:
      return {...state, selectedLocation: action.payload};
    case UNSELECTED_LOCATION:
      return {...state, selectedLocation: action.payload};
    default:
      return state;
  }
};
