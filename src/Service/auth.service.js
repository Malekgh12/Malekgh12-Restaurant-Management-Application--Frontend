import axios from "axios";

const API_URL = "http://localhost:8086/api/Auth/";

axios.defaults.headers.common['Content-Type'] = 'application/json';

class authService {
  // Méthode de connexion
  login(username, password) {
    return axios
      .post(API_URL + "signin", { username, password },{
        headers: {
          'Content-Type': 'application/json'
        }
        })
      .then(response => {
        console.log(response.data);
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      })
      .catch(error => {
        console.error("Échec de la connexion :", error);
        throw error; // Relancer l'erreur pour être gérée par l'appelant
      });
  }

  // Méthode de déconnexion
  logout() {
    localStorage.removeItem("user");
  }

  // Méthode d'inscription
  register(username, email, password, confirmPassword) {
    // Validation des mots de passe côté client
    if (password !== confirmPassword) {
      return Promise.reject(new Error("Les mots de passe ne correspondent pas !"));
    }
    if (!username || !email || !password) {
      return Promise.reject(new Error("Tous les champs sont obligatoires !"));
    }
    console.log("Données envoyées :", { username, email, password, confirmPassword });

    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      confirmPassword,
    })
    .then(response=>response.data)
    .catch(error => {
      const errorMessage = error.response?.data?.message 
      || error.response?.data 
      || error.message 
      || 'Registration failed';
    
    console.error("Registration error:", errorMessage);
    throw new Error(errorMessage);

    });
  }

  // Récupérer l'utilisateur actuel à partir du stockage local
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

// Assignation de l'instance à une variable avant l'exportation
const instance = new authService();
export default instance;
