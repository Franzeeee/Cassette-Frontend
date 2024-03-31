import cassette_api from "../api";

const fetchRequest = async () => {
    try {
        const response = await cassette_api.get('/fetch_requests');
        console.log(response.data);
        return response.data;
    } catch (err) {
        console.error("Error: ", err);
        throw err;
    }
};
  
export default fetchRequest;