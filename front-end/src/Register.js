import React, { Component } from "react";
import axios from "axios";
import   './Register.scss';
import {Container,Row,Col} from 'react-bootstrap';
import image from './images/junk.png';
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
        
    }
    handleSignUpEvent(){
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
        return (
         <div>
            <Container>
                <Row>
                    <Col lg={8} sm={0}>
                       <img className="loginImage" src={image} alt='Food Image'></img>
                    </Col>
                    <Col lg={4}  sm={12}>
                    <form className="ruler-left">

                             <h3>All About Food</h3>   
                        <Row>
                            <Col lg={6} sm={6}>
                           <div className="login-signin">
                               <h3 onClick={()=>this.handleSigninEvent()}>Sign In</h3>
                            </div>
                            </Col>
                            <Col lg={6} sm={6}>
                            <div className="login-signin">
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
                    </Col>

                </Row>
            </Container>
            </div>
          
        );
    }
}
