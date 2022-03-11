import React, { Component } from "react";
import axios from "axios";
import   './Register.scss';
import {Container,Row,Col} from 'react-bootstrap';
import image from './images/junk.png';
import heartsvg from './images/heart.svg';
import $ from 'jquery';
let apiurl='http://localhost:8000'

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
        console.log('submited value',this.state)
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
         <div>
            <Container>
            <div className="border-login-top"></div>
                <Row>

                    <Col lg={8} sm={0}>
                       <img className="loginImage" src={image} alt='Food Image'></img>
                    </Col>

                    <Col lg={4}  sm={12}>
                    <div className="ruler-left">

                    <form>

                             <h3 className="all-about-food">All About Food <span> <img className="heart-image" src={heartsvg}></img></span></h3>   
                             <h3 className="food-desc"><span>Only for Food Lovers</span> - <span>Know Yummy Foods </span> - <span>Review Foods!</span> </h3>
                        <Row>
                            <Col lg={6} sm={6}>
                           <div className="login-signin signin-tab sign-active">
                               <h3 onClick={()=>this.handleSigninEvent()}>Sign In</h3>
                            </div>
                            </Col>
                            <Col lg={6} sm={6}>
                            <div className="login-signin signup-tab">
                            <h3 onClick = {()=>this.handleSignUpEvent()}>Sign Up</h3>
                            </div>
                            </Col>
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
                        <button type="submit" className="btn btn-primary btn-block submit-btn" onClick = {this.handleClick}>{text}</button>
                    </form>

                    <p><span className='or-text'>OR</span></p>
                    <button className="google-sign-in">Sign In With Google</button>
                    </div>

                    </Col>

                </Row>
            </Container>
            </div>
          
        );
    }
}
