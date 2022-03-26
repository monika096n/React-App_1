import {LoginFailed,LoginSet,LoginSuccess ,RegisterWithPassword} from './RegisterActionTypes';
const RegisterReducer = (state = [], action) => {
  console.log(action)
  switch(action.type) {
    case LoginSet:
        return Object.assign({}, state, {
          isLogin:false
        });
    case LoginSuccess:
      return Object.assign({}, state, {
        isLogin:action.data
      });
    case LoginFailed:
      return Object.assign({}, state, {
        isLogin:false
      });
    case RegisterWithPassword:
      return Object.assign({},state,{
        RegisterWithPassword:action.data
      })
    default:
      return state;
  }
}

export default RegisterReducer;