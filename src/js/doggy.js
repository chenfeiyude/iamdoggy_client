import axios from 'axios'

export default {
    get_dogs() {
        return axios.get('/api/doggy/dogs/get');
    },
    get_activity(pid, limit) {
        return axios.get('/api/doggy/activity/get?pid='+pid+'&limit='+limit);
    },
    generate_activity(pid) {
        return axios.get('/api/doggy/activity/generate?pid='+pid);
    },
    get_primary_dog() {
        return axios.get('/api/doggy/dogs/get/primary');
    },
    set_primary_dog(pid) {
        return axios.post('/api/doggy/dogs/set/primary?pid='+pid);
    }
}