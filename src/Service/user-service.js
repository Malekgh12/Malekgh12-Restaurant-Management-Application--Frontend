import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8086/api/test/';

class userService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new userService();
