import axios from 'axios'
import cookies from 'js-cookie'

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true
});

instance.interceptors.request.use((config) => {
    const sessionToken = cookies.get('token')
    if (sessionToken) {
        config.headers.Authorization = `Bearer ${sessionToken}`
    }
    return config
})

export default instance