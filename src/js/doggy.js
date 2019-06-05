import axios from 'axios'

export default {
    get_dogs() {
        return axios.get('/api/doggy/dogs/get');
    },
    get_activity_log(pid, limit) {
        return axios.get('/api/doggy/activity_log/get?pid='+pid+'&limit='+limit);
    },
}