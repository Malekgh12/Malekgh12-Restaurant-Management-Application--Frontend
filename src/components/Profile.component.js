import React , { Component} from "react";
import { Navigate} from "react-router-dom";

import "./Profile.css";

export default class Profile extends Component {
    constructor(props){
        super(props); 
        this.state = {
            redirect : null, 
            userReady: false, 
            currentUser : null 
        }; 
    }

    componentDidMount () {
        const userStr = localStorage.getItem ("user"); 
        if (!userStr){
            this.setState({redirect : "/login"}); 
        }else{
            const user = JSON.parse ( userStr); 
            this.setState( { currentUser : user , userReady: true}); 
        }
    }

    getRoleLabel = ( role ) => {
        switch (role ){
            case 'ROLE_ADMIN': 
              return 'Admin'; 
            case 'ROLE_USER': 
               return 'User'; 
            default : 
               return 'Unknow';     
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
                <p><strong>First Name:</strong> &nbsp; {currentUser.firstName}</p>
                <p><strong>Last Name:</strong> &nbsp; {currentUser.lastName}</p>
                <p><strong>Mobile Number:</strong> &nbsp; {currentUser.mobileNumber}</p>
                <div className="role-container">
                  <p><strong>Role:</strong></p>
                  <ul>
                    {currentUser.roles && currentUser.roles.map((role, index) => (
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
 