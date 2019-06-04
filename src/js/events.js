import axios from 'axios'

export default {
    find_random_dog() {
        return axios.get('/api/event/find_random_dog');
    },

}