

 export enum ActionTypes {
    
    LoadItems = '[Channels] Load items from server',
    LoadSuccess = '[Channels] Load success',
    LoginDetails = '[Auth] Return login details',
    RegisterDetails = '[Auth] Return registration details'
  }

  export const GetItems = () => ({
    type: ActionTypes.LoadItems
  });
 
  export const LoadItems = payload => ({
    type: ActionTypes.LoadSuccess,
    payload
  });

  export const LoginDet = payload => ({
    type: ActionTypes.LoginDetails,
    payload
  });

  export const RegDet = () => ({
    type: ActionTypes.RegisterDetails,
    
  });