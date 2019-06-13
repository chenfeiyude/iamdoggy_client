import axios from 'axios'

export default {
  get_account(){
      return axios.get('/api/management/account/get');
  },
}