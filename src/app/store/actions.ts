

 export enum ActionTypes {
    
    LoadItems = '[Images] Load items from server',
    LoadSuccess = '[Images] Load success'
  }

  export const GetItems = () => ({
    type: ActionTypes.LoadItems
  });
 
  export const LoadItems = payload => ({
    type: ActionTypes.LoadSuccess,
    payload
  });