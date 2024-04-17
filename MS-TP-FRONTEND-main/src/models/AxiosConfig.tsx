import axios from 'axios'

const baseURL = 'http://127.0.0.1:8000/api/v1/'

const AxiosConfig = axios.create({
    baseURL: baseURL,
    timeout: 10000,
    headers: {
        "Accept":"application/json, text/plain, /",
        "Content-Type": "application/json, multipart/form-data",
    }
})

export default AxiosConfig