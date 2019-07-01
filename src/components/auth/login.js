import React, { Component } from 'react'
import axios from 'axios'

export default class Login extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            email: "",
            password: "",
            errorText: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event)
    {
        axios.post("https://api.devcamp.space/sessions", {
            client: {
                email: this.state.email,
                password: this.state.password
            }
        },
        {
            withCredentials: true
        }).then(response =>
        {
            if (response.data.status === 'created')
            {
                console.log("response", response);
            } 
            else
            {
                this.setState({
                    errorText: "Wrong email or password"
                });
            }
        }).catch(error =>
        {
            this.setState({
                errorText: "An error occurred"
            });
        });

        event.preventDefault();
    }

    handleChange(event)
    {
        this.setState({
            [event.target.name]: event.target.value,
            errorText:""
        });
    }

    render()
    {
        return (
            <div>
                <h1>LOGIN TO ACCESS YOUR DASHBOARD</h1>
                <div>{this.state.errorText}</div>
                <form onSubmit={this.handleSubmit}>
                    <input type="email" name="email" placeholder="Your email" value={this.state.email} onChange={this.handleChange} />
                    <input type="password" name="password" placeholder="Your password" value={this.state.password} onChange={this.handleChange} />

                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}
