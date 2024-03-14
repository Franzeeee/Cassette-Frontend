import axios from "axios";

const cassette_api = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:80/api',
});

export default cassette_api;