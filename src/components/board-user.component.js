import React, { Component } from "react";

import EventBus from "../common/EventBus";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    const response = { data: "Contenu de l'utilisateur" };
    
    this.setState({
      content: response.data
    });
    const error = { response: { status: 401 } };
    
    if (error.response && error.response.status === 401) {
      EventBus.dispatch("logout");
    }
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
      </div>
    );
  }
}
