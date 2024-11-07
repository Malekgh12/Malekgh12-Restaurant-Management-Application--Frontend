import React, { Component } from "react";

import EventBus from "../common/EventBus";

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    const response = { data: "Bienvenue sur le tableau des utilisateurs!" };
    
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