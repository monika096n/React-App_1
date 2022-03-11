import React, { Component } from "react";
import axios from "axios";
let apiurl='http://localhost:8000'

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signin:true,
            signup:false,
            username:'',
            password:'',
            fullname:''
        }
    }
    handleSigninEvent(){
        if(!this.state.signin)
        {
            this.setState({ signin: !this.state.signin });
            this.setState({ signup: !this.state.signup });
            this.setState({username:'',password:'',fullname:''})
        }
        
    }
    handleSignUpEvent(){
        if(!this.state.signup)
        {
            this.setState({ signin: !this.state.signin });
            this.setState({ signup: !this.state.signup });
            this.setState({username:'',password:'',fullname:''})
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
        return (
            <form>
                <h3 onClick={()=>this.handleSigninEvent()}>Sign In</h3>
                <h3 onClick = {()=>this.handleSignUpEvent()}>Sign Up</h3>
                {this.state.signin && !this.state.signup?<div>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" name='username' value={this.state.username} onChange={this.handleInputValue}/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" name='password' value={this.state.password} onChange={this.handleInputValue}/>
                </div></div>:
                <div>
                <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" className="form-control" placeholder="Enter Full Name"  name='fullname' value={this.state.fullname} onChange={this.handleInputValue}/>
                </div>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email"  name='username' value={this.state.username} onChange={this.handleInputValue}/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" name='password' value={this.state.password} onChange={this.handleInputValue} />
                </div></div>}
                <button type="submit" className="btn btn-primary btn-block" onClick = {this.handleClick}>Submit</button>
            </form>
        );
    }
}
