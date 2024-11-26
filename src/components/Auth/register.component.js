import React, { Component } from "react";
import Form from "react-validation/build/form";
import { Navigate } from "react-router-dom";
import { User, Mail, Lock, KeyRound } from "lucide-react";
import CheckButton from "react-validation/build/button";

import authService from "../../Service/auth.service";
import '../Auth/register.css';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      successful: false,
      message: "",
      redirectToogin: false // État pour la redirection
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangeConfirmPassword(e) {
    this.setState({
      confirmPassword: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    authService.register(
      this.state.username,
      this.state.email,
      this.state.password,
      this.state.confirmPassword,
    ).then(
      response => {
        const message = response && response.data ? response.data.message || "Registration successful!" : "Registration successful!";
        this.setState({
          message: message,
          successful: true,
          redirectToLogin: true // Définir l'état de redirection
        });
      },
      error => {
        // Ajout des vérifications pour éviter l'erreur
      let resMessage = "Une erreur s'est produite, veuillez réessayer."; // Message par défaut

      if (error.response) {
        // La requête a été faite et le serveur a répondu avec un code d'erreur
        if (error.response.data && error.response.data.message) {
          resMessage = error.response.data.message; // Utilisation du message d'erreur du serveur
        } else {
          resMessage = error.response.statusText; // Utilisation du texte d'état HTTP
        }
      } else if (error.request) {
        // La requête a été faite mais aucune réponse n'a été reçue
        resMessage = "Aucune réponse du serveur.";
      } else {
        // Quelque chose s'est passé lors de la création de la requête
        resMessage = error.message;
      }

      this.setState({
        successful: false,
        message: resMessage
        });
      }
    );
}

  render() {
    if (this.state.redirectToLogin) {
      return <Navigate to="/Auth/login" />; // Redirection vers la page de connexion
    }
    return (
      <div className="col-md-12">
       <div className="card card-container register">
       <h2 className="text-center">Register</h2> 
          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div className="form-row">
                <div className="form-group">
                  <div className="row">
                    <div className="col">
                      <label htmlFor="username" className="d-flex align-items-center">
                        <User className="me-2" size={18} />
                      Username
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="d-flex align-items-center">
                  <Mail className="me-2" size={18} />
                  Email Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                  />
                </div>

                <div className="form-group">
                  <div className="row">
                    <div className="col">
                      <label htmlFor="password" className="d-flex align-items-center">
                      <Lock className="me-2" size={18} />
                      Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                      />
                    </div>

                    <div className="col">
                      <label htmlFor="confirmPassword" className="d-flex align-items-center">
                      <KeyRound className="me-2" size={18} />
                      Confirm Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        name="confirmPassword"
                        value={this.state.confirmPassword}
                        onChange={this.onChangeConfirmPassword}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <button className="btn btn-block">Sign Up</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
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
        </div>
      </div>
    );
  }
}
