import axios from 'axios'

export default {
  login(username, password) {
    return axios.post('/api/auth/login', {
      "username" : username,
      "password" : password
    });
  },

  logout() {
      return axios.get('/api/auth/logout');
  },

  register(username, password){
      return axios.post('/api/auth/register', {
          "username" : username,
          "password" : password
      });
  },

}