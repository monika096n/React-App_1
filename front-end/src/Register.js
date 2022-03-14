import React, { Component } from "react";
import axios from "axios";
import   './Register.scss';
import {Container,Row,Col} from 'react-bootstrap';
import image from './images/junk.png';
import heartsvg from './images/heart.svg';
import google_image from './images/google.svg';
import $ from 'jquery';
import GoogleSignIn from './GoogleSignIn'
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
            text:'Login',

        }
    }
    handleSigninEvent(){
        if(!this.state.signin)
        {
            this.setState({ signin: !this.state.signin  });
            this.setState({ signup: !this.state.signup });
            this.setState({username:'',password:'',fullname:'',text:'Login'})
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
        }
       

    }
    handleInputValue=(e)=>{
        this.setState({[e.target.name]:e.target.value})
       
    }
  
    handleClick=(e)=>{
        let {signin}=this.state;
        e.preventDefault();
        console.log('submited value',this.state,signin)
        if(signin){
            let details={
                username:this.state.username,
                password:this.state.password
            }
            axios.post(apiurl+'/login-with-password',details).then((data)=>{   
                window.location.pathname='/homepage'
                console.log('Response from backend',data)
            }).catch((e)=>{
                console.log('Error while posting login data',e)
            })
        }
        else{
            let details={
                username:this.state.username,
                password:this.state.password,
                fullname:this.state.fullname
            }
            console.log('Register',details)
            axios.post(apiurl+'/signUp',details).then((data)=>{
                console.log('Response from backend',data)
            }).catch((e)=>{
                console.log('Error while posting login data',e)
            })
        }
    }
    render() {
        let {text} = this.state;
        let active_sign_in=text==='Login'?true:false;
        return (
         <div style={{'backgroundColor':'#2D4263'}}>
                <Row>

                    <Col md={8} xl={8} sm={0}>
                       <img className="loginImage" src={image} alt='Food Image'></img>
                    </Col>

                    <Col md={4} xl={4}  sm={12}>
                    <div className="ruler-left">

                    <form>

                             <h3 className="all-about-food">All About Food <span> <img className="heart-image" src={heartsvg} ></img></span></h3>   
                             <h3 className="food-desc"><span>Only for Food Lovers</span> - <span>Know Yummy Foods </span> - <span>Review Foods!</span> </h3>
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
                        <div className="form-group col-1">
                            <input type="email" className="form-control input-field" placeholder="Enter email" name='username' value={this.state.username} onChange={this.handleInputValue}/>
                        </div>
                        <div className="form-group col-1">
                            <input type="password" className="form-control input-field" placeholder="Enter password" name='password' value={this.state.password} onChange={this.handleInputValue}/>
                        </div></div>:
                        <div>
                        <div className="form-group col-1">
                            <input type="text" className="form-control input-field" placeholder="Enter Full Name"  name='fullname' value={this.state.fullname} onChange={this.handleInputValue}/>
                        </div>
                        <div className="form-group col-1">
                            <input type="email" className="form-control input-field" placeholder="Enter email"  name='username' value={this.state.username} onChange={this.handleInputValue}/>
                        </div>
                        <div className="form-group col-1">
                            <input type="password" className="form-control input-field" placeholder="Enter password" name='password' value={this.state.password} onChange={this.handleInputValue} />
                        </div></div>}
                        <button type="submit" className="btn  btn-block submit-btn" onClick = {this.handleClick}>{text}</button>
                       
                             <p><span className='or-text'>OR</span></p>
                            <GoogleSignIn/>
                       
                    </form>              
                    </div>
                    </Col>

                </Row>
            </div>
          
        );
    }
}
