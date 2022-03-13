import React, { Component } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import './google.scss'
import google_image from './images/google.svg';
import axios from 'axios';
const CLIENT_ID =
  "593966806809-ul5hllgi74f5s83mf70e07c2se7ctjq6.apps.googleusercontent.com";
let apiurl='http://localhost:8000';
class GoogleSignIn extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      userInfo: {
        name: "",
        emailId: "",
      },
    };
  }

  // Success Handler
  responseGoogleSuccess = (response) => {
    let userInfo = {
      name: response.profileObj.name,
      emailId: response.profileObj.email,
    };

    var id_token = response.getAuthResponse().id_token;
    this.setState({ userInfo, isLoggedIn: true });
    axios.post(apiurl+'/login',{id_token}).then((data)=>{   
        console.log('Response from backend',data)
    }).catch((e)=>{
        console.log('Error while posting login data',e)
    })
  };

  // Error Handler
  responseGoogleError = (response) => {
    console.log(response);
  };

  // Logout Session and Update State
  logout = (response) => {
    console.log(response);
    let userInfo = {
      name: "",
      emailId: "",
    };
    this.setState({ userInfo, isLoggedIn: false });
  };

  render() {
    return (
        <div>
          {this.state.isLoggedIn ? (
            <button className="btn  btn-block google-sign-in-btn">

              <GoogleLogout
                clientId={CLIENT_ID}
                buttonText={"Logout"}
                onLogoutSuccess={this.logout}
              ></GoogleLogout>
            </button>
          ) : (
            <button className="btn  btn-block google-sign-in-btn">
            <GoogleLogin
              clientId={CLIENT_ID}
              buttonText="Continue with Google"
              onSuccess={this.responseGoogleSuccess}
              onFailure={this.responseGoogleError}
              isSignedIn={true}
              cookiePolicy={"single_host_origin"}
            />
            
            </button>
          )}
          {
              this.state.isLoggedIn && Object.values(this.state.userInfo).length &&
                  <div> Hello {this.state.userInfo.name}</div>
          }
         </div>
    );
  }
}
export default GoogleSignIn;