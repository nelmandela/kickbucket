import React, {Component} from "react";
import {browserHistory} from "react-router";
import LoginView from "../components/Login";
import instance from "../utils/axiosInstance";


export default class LoginContainer extends Component{
    state = {
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
            url: "/auth/login",
            method: "POST",
            data: {
                ...this.state
            }
        }).then((response) => {
            if(response.data.status === "success"){
                localStorage.setItem("kickbucket_token", response.data.Authorization)
                browserHistory.push("/dashboard")
            }
        }).catch((error) => {
            this.setState({
                errorMessage: error.response.data.message
            })

        })
    }

    render(){

        return (
            <div>
                <p>Login Container</p>
                <LoginView
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    {...this.state} />
            </div>
        )
    }
}
