import React, { Component } from "react";
export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signin:true,
            signup:false,
            username:'',
            password:''
        }

    }
    handleSigninEvent(){
        if(!this.state.signin)
        {
            this.setState({ signin: !this.state.signin });
            this.setState({ signup: !this.state.signup });
        }
        
    }
    handleSignUpEvent(){
        if(!this.state.signup)
        {
            this.setState({ signin: !this.state.signin });
            this.setState({ signup: !this.state.signup });
        }
    }
    handleEmailEvent=(e)=>{
        this.setState({ username: e.target.value });
    }
    handleClick(){
    }
    render() {
        return (
            <form>
                <h3 onClick={()=>this.handleSigninEvent()}>Sign In</h3>
                <h3 onClick = {()=>this.handleSignUpEvent()}>Sign Up</h3>
                {this.state.signin && !this.state.signup?<div>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" value={this.state.username} onChange={this.handleEmailEvent}/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div></div>:
                <div>
                <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" className="form-control" placeholder="Enter Full Name" />
                </div>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div></div>}
                <button type="submit" className="btn btn-primary btn-block" onClick = {()=>this.handleClick()}>Submit</button>
            </form>
        );
    }
}
