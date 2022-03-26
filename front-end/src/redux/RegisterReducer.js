import {LoginFailed,LoginSet,LoginSuccess } from './RegisterActionTypes';
const RegisterReducer = (state = [], action) => {
  console.log("fnjkfgjksnfdjcknnjsdnnkjsn")
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
    default:
      return state;
  }
}

export default RegisterReducer;