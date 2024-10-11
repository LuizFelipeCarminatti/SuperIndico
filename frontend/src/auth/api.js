import axios from 'axios'
import Cookie from 'js-cookie'

const instance = axios.create({
    baseURL: 'http://localhost:8080'
});

const api = instance.interceptors.request.use((config) => {
    const sessionToken = Cookie.get('token')
    if (sessionToken) {
        config.headers.Authorization = `Bearer ${sessionToken}`
    }
    return config
})

export default api