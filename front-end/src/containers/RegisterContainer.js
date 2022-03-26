import { connect } from "react-redux"
import Register from '../Register'
import {loginWithPassword} from '../redux/action'

const mapStateToProps = state => {
  console.log(state)
  return {
    isLogin: state.RegisterReducer.isLogin
  }
}
const mapDispatchToProps =  (dispatch) => {
  return {
    loginWithPassword: (details) => dispatch(loginWithPassword(details))
    // RegisterWithPassword : (details) => dispatch(RegisterWithPassword(details))
  }
}
const RegisterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);
export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer)