import { connect } from "react-redux"
import Register from '../Register'
import {loginWithPassword,RegisterWithPasswordFunction} from '../redux/action'

const mapStateToProps = state => {
  console.log(state)
  return {
    isLogin: state.RegisterReducer.isLogin,
    isRegistered:state.RegisterReducer.RegisterWithPassword
  }
}
const mapDispatchToProps =  (dispatch) => {
  return {
    loginWithPassword: (details) => dispatch(loginWithPassword(details)),
    RegisterWithPasswordFunction : (details) => dispatch(RegisterWithPasswordFunction(details))
  }
}
const RegisterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);
export default (RegisterContainer)