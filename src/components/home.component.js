import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserService from "../Service/user-service";
import './home.css';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
      <div className="image-container">
          <img src={require('../assets/image/faculter.png').default} alt="Faculté" />
          <img src={require('../assets/image/image.jpeg').default} alt="Exemple de restaurant" />
          <img src={require('../assets/image/images.jpeg').default} alt="Evenement" />
      </div>
          <h3>Bienvenue au Restaurant Universitaire !</h3>
          <p>Découvrez un espace chaleureux et convivial dédié à la communauté universitaire. 
             Notre restaurant offre une variété de plats équilibrés et savoureux,
             adaptés à tous les goûts et à tous les budgets. 
             Profitez d'un service rapide, d'un menu renouvelé chaque semaine,
             et d'une ambiance idéale pour vos repas entre amis ou collègues. 
             Inscrivez-vous ou connectez-vous pour explorer notre menu,
             réserver votre place,
             et accéder à de nombreuses options pratiques.
          </p>
          <div className="services-section">
            <h4>Nos Services</h4>
            <div className="services-grid">
              <div className="service-item">
                <h5>Menu Varié</h5>
                <p>Une sélection de plats frais et savoureux chaque jour</p>
              </div>
              <div className="service-item">
                <h5>Horaires Flexibles</h5>
                <p>Ouvert du lundi au samedi, de 8h à 20h</p>
              </div>
              <div className="service-item">
                <h5>Réservations</h5>
                <p>Réservez facilement votre place en ligne</p>
              </div>
              <div className="service-item">
                <h5>Événements Spéciaux</h5>
                <p>Soirées à thème et ateliers culinaires tout au long de l'année</p>
              </div>
            </div>
          </div>
          <div className="auth-buttons">
            <Link to="/Auth/login" className="btn btn-primary mr-2">
              Se connecter
            </Link>
            <Link to="/register" className="btn btn-success">
              S'inscrire
            </Link>
          </div>
        </header>
      </div>
    );
  }
}
