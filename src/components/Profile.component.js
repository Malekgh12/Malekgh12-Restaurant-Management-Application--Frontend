import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import authService from "../Service/auth.service";
import './Profile.css'; 

export default class Profile extends Component {
  constructor() {
    super();

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "", email: "", role: [] }
    };
  }

  componentDidMount() {
    const currentUser = authService.getCurrentUser();
    console.log("Current User:", currentUser);
    
    if (!currentUser) {
      this.setState({ redirect: "/home" });
    } else {
      this.setState({ currentUser: currentUser, userReady: true });
    }
  }

  // Fonction pour obtenir le libellé du rôle
  getRoleLabel = (role) => {
    switch (role) {
      case 'ROLE_ADMIN':
        return 'Admin';
      case 'ROLE_USER':
        return 'User';
      default:
        return 'Unknown';
    }
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }

    const { currentUser, userReady } = this.state;

    return (
      <div className="container profile">
        {userReady ? (
          <div className="profile-content">
            <h3 className="profile-title">Profile</h3>
            <p><strong>Username:</strong> &nbsp; {currentUser.username}</p>
            <p><strong>Email:</strong> &nbsp; {currentUser.email}</p>
            <div className="role-container">
              <p><strong>Role:</strong></p>
              <ul>
                {currentUser.role && currentUser.role.map((role, index) => (
                  <li key={index}>{this.getRoleLabel(role)}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}
