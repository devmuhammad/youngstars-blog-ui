

import { ActionTypes } from './actions';
import { searchResult } from './interface';


export interface InitialState {
    items: Array<searchResult>;
  }

export const initialState = {
    items: [],
  };


  export function ItemsReducer(state = initialState, action) {
    switch (action.type) {
      case ActionTypes.LoadSuccess:
        return {
          ...state,
          items: [...action.payload]
        };
      
      default:
        return state;
    }
  }