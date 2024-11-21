import React, { Component } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import authService from "../../Service/auth.service";

import { withRouter } from '../../common/with-router';
import '../Auth/login.css';
import { FaUser, FaLock } from 'react-icons/fa';

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class Login extends Component {
  constructor() {
    super();
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      authService.login(this.state.username, this.state.password).then(
        () => {
          this.props.router.navigate("/home");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }
  
  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
        <h2>Welcome </h2>
        <h5>Sign in to your account</h5>
          <Form
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="username"></label>
              <FaUser className="form-icon" size={16} />
              <input
                type="text"
                className="form-control"
                name="username"
                value={this.state.username}
                onChange={this.onChangeUsername}
                validations={[required]}
                placeholder="Enter your username"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password"></label>
              <FaLock className="form-icon" size={16} />
              <input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
                placeholder="Enter your password"
              />
               
            </div>

            <div className="form-group options-group">
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
              </div>
              <a href="forgot.html" className="forgot-password">
                 Forgot Password?
              </a>
            </div>

            <div className="form-group">
              <button
                className="btn  btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Sign in</span>
              </button>
            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>

          
          <div className="form-group">
            <p className="text-center">
              Don't have an account? <a href="/register">Sign up</a>
            </p>
            </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);