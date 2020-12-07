

import { ActionTypes } from './actions';
import { dataResult } from './interface';


export interface InitialState {
    items: Array<dataResult>;
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