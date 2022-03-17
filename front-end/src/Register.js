import React, { Component } from "react";
import axios from "axios";
import   './Register.scss';
import {Row,Col} from 'react-bootstrap';
import heartsvg from './images/cup.svg';
import 'animate.css';
import $ from 'jquery';
import GoogleSignIn from './GoogleSignIn'
import Slideshow from "./SlideShow";
let apiurl='http://localhost:8000';
export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signin:true,
            signup:false,
            username:'',
            password:'',
            fullname:'',
            pincode:'',
            text:'Login',
            errors:{},

        }
    }
    validateForm() {
        let fields={};
       let {signin}=this.state;
       let errors = {};
       let formIsValid = true;
        if(signin){
            fields = {
                password:this.state.password,
                username:this.state.username,
            };
            if (!fields["username"]) {
                formIsValid = false;
                errors["username"] = "*Please enter your email-ID.";
              }
              
            if (typeof fields["username"] !== "undefined") {
              //regular expression for email validation
              let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
              if (!pattern.test(fields["username"])) {
                formIsValid = false;
                errors["username"] = "*Please enter valid email-ID/username.";
              }
            }
            if (!fields["password"]) {
                formIsValid = false;
                errors["password"] = "*Please enter your password.";
              }
        
            
      
        }
        else{
        fields = {
            password:this.state.password,
            pincode:this.state.pincode,
            username:this.state.username,
            fullname:this.state.fullname,
        };
        if (!fields["fullname"]) {
            formIsValid = false;
            errors["fullname"] = "*Please enter your username.";
          }
    
          if (typeof fields["fullname"] !== "undefined") {
            if (!fields["fullname"].match(/^[a-zA-Z ]*$/)) {
              formIsValid = false;
              errors["fullname"] = "*Please enter alphabet characters only.";
            }
          }
    
          if (!fields["username"]) {
            formIsValid = false;
            errors["username"] = "*Please enter your email-ID.";
          }
          
        if (typeof fields["username"] !== "undefined") {
          //regular expression for email validation
          let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
          if (!pattern.test(fields["username"])) {
            formIsValid = false;
            errors["username"] = "*Please enter valid email-ID/username.";
          }
        }
  
        if (!fields["pincode"]) {
          formIsValid = false;
          errors["pincode"] = "*Please enter pincode.";
        }
  
        if (typeof fields["pincode"] !== "undefined") {
          if (!fields["pincode"].match(/^[0-9]{6}$/)) {
            formIsValid = false;
            errors["pincode"] ="*Please enter pincode of length 6."
          }
      }
      
      if (!fields["password"]) {
          formIsValid = false;
          errors["password"] = "*Please enter your password.";
        }
        }

      
  
      
      this.setState({
        errors: errors
      });
      return formIsValid;


    }  
    handleSigninEvent(){
        if(!this.state.signin)
        {
            this.setState({ signin: !this.state.signin  });
            this.setState({ signup: !this.state.signup });
            this.setState({username:'',password:'',fullname:'',text:'Login'})
            this.setState({errors:{}})
        }

        $('.signup-tab').removeClass('sign-active')
        $('.signin-tab').addClass("sign-active");
    }
    handleSignUpEvent(){
        $('.signin-tab').removeClass('sign-active')
        $('.signup-tab').addClass("sign-active");

        if(!this.state.signup)
        {
            this.setState({ signin: !this.state.signin});
            this.setState({ signup: !this.state.signup });
            this.setState({username:'',password:'',fullname:'',text:'Register' })
            this.setState({errors:{}})
        }
       

    }
    handleInputValue=(e)=>{
        this.setState({[e.target.name]:e.target.value})
       
    }
  
    handleClick=(e)=>{
        let {signin}=this.state;
        e.preventDefault();
        console.log('submited value',this.state,signin)
        if(this.validateForm()){
            if(signin){
                let details={
                    username:this.state.username,
                    password:this.state.password
                }
                axios.post(apiurl+'/login-with-password',details).then((data)=>{   
                    if(data.status===true)
                    {
                        window.location.pathname='/homepage'
                    }
                    else{
                        let errors={}
                        errors["login_failed"] = "Please enter valid email-ID/Password";
                        this.setState({errors:errors})
                    }
                    console.log('Response from backend',data)
                }).catch((e)=>{
                    console.log('Error while posting login data',e)
                })
            }
            else{
                let details={
                    username:this.state.username,
                    password:this.state.password,
                    fullname:this.state.fullname,
                    pincode:this.state.pincode,
                }
                console.log('Register',details)
                axios.post(apiurl+'/signUp',details).then((data)=>{
                    console.log('Response from backend',data)
                    if(data.isValid===true){
                        window.location.pathname='/homepage'
                    }
                    else{
                        let errors={}
                        errors["login_failed"] = data.data.message;
                        this.setState({errors:errors})
                    }
                }).catch((e)=>{
                    console.log('Error while posting login data',e)
                })
            }
        }
      
    }
    render() {
        let {text} = this.state;
        let active_sign_in=text==='Login'?true:false;
        return (
                <Row style={{'backgroundColor':'#fff'}}>

                    <Col md={8} xl={8} sm={0}>
                        <Slideshow/>
                    </Col>

                    <Col md={4} xl={4}  sm={12}>
                    <div className="ruler-left">

                    <form>

                             <h3 className="all-about-food animate__animated animate__heartBeat">All About Food <span> <img className="heart-image" src={heartsvg} ></img></span></h3>   
                             {/* <h3 className="food-des"><span>Only for Food Lovers</span> - <span>Know Yummy Foods </span> - <span>Review Foods!</span> </h3> */}
                        <Row>
                            <ul>
                                <li className="login-signin signin-tab sign-active nav-item">
                                   <h6 style={{'padding':'10px'}} onClick={()=>this.handleSigninEvent()}>SignIn</h6>
                                </li>
                          
                                <li className="login-signin signup-tab nav-item">
                                   <h6 style={{'padding':'10px'}}   onClick = {()=>this.handleSignUpEvent()}>SignUp</h6>
                                </li>
                            </ul>
                        </Row>
 
                        {this.state.signin && !this.state.signup?<div>
                            <div className="form-errors">{this.state.errors.login_failed}</div>
                        <div className="form-group col-1">
                            <input type="email" className="form-control input-field" placeholder="Enter email" name='username' value={this.state.username} onChange={this.handleInputValue}/>
                            <div className="form-errors">{this.state.errors.username}</div>
                        </div>
                        <div className="form-group col-1">
                            <input type="password" className="form-control input-field" placeholder="Enter password" name='password' value={this.state.password} onChange={this.handleInputValue}/>
                            <div className="form-errors">{this.state.errors.password}</div>

                        </div></div>:
                        <div>
                            <div className="form-errors">{this.state.errors.login_failed}</div>
                        <div className="form-group col-1">
                            <input type="text" className="form-control input-field" placeholder="Enter username"  name='fullname' value={this.state.fullname} onChange={this.handleInputValue}/>
                            <div className="form-errors">{this.state.errors.fullname}</div>

                        </div>
                        <div className="form-group col-1">
                            <input type="email" className="form-control input-field" placeholder="Enter email"  name='username' value={this.state.username} onChange={this.handleInputValue}/>
                            <div className="form-errors">{this.state.errors.username}</div>

                        </div>
                        <div className="form-group col-1">
                            <input type="password" className="form-control input-field" placeholder="Enter password" name='password' value={this.state.password} onChange={this.handleInputValue} />
                            <div className="form-errors">{this.state.errors.password}</div>

                        </div>
                        <div className="form-group col-1">
                            <input type="text" className="form-control input-field" placeholder="Enter pincode"  name='pincode' value={this.state.pincode} onChange={this.handleInputValue}  />
                            <div className="form-errors">{this.state.errors.pincode}</div>

                        </div>
                        </div>}
                        <button type="submit" className="btn  btn-block submit-btn" onClick = {this.handleClick}>{text}</button>
                       
                             <p><span className='or-text'>OR</span></p>
                            <GoogleSignIn/>
                       
                    </form>              
                    </div>
                    </Col>

                </Row>
          
        );
    }
}
