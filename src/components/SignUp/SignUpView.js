import React from "react";

const SignUpView = (props) => (
    <form onSubmit={(e) => props.handleSubmit(e)}>
        <div>
            <label>Username: </label>
            <input
                type="text"
                name="username"
                placeholder="enter username"
                onChange={props.handleChange}
                value={props.username} />

        </div>
        <div>
            <label>Email: </label>
            <input
                type="email"
                name="email"
                placeholder="enter your email"
                onChange={props.handleChange}
                value={props.email} />
        </div>
        <div>
            <label>Password: </label>
            <input
                type="password"
                name="password"
                placeholder="enter password"
                onChange={props.handleChange}
                value={props.password} />
        </div>
        <div>
            <button type="submit">Sign Up</button>
        </div>
        <h3>{props.errorMessage}</h3>
    </form>
);

export default SignUpView;