import React, {Component} from "react";
import SignUpView from "../components/SignUp";
import instance from "../common/axiosInstance";

export default class SignUpContainer extends Component{
    state = {
        "email": "",
        "username": "",
        "password": "",
        "errorMessage": ""
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();

        instance.request({
            url: "/auth/register",
            method: "POST",
            data: {
                ...this.state
            }
        }).then((response) => {
            console.log(response.data)
        }).catch((error) => {        
            this.setState({
                errorMessage: error.response.data.message
            })
            
        })
    }
    render(){
        return (
            <div>
                <p>Signup Container</p>    
                <SignUpView 
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    {...this.state} />        
            </div>
        )
    }
}
