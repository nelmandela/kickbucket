import React from "react";

const LoginView = (props) => (
    <form onSubmit={(event) => props.handleSubmit(event)}>
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
            <label>Password: </label>
            <input
                type="password"
                name="password"
                placeholder="enter password"
                onChange={props.handleChange}
                value={props.password} />
        </div>
        <div>
            <button type="submit">Login</button>
        </div>
        <h3>{props.errorMessage}</h3>
    </form>
);

export default LoginView;