import axios from "axios";

// const URL = 'https://my.api.mockaroo.com/shipments.json?key=5e0b62d0';
const URL = 'data.json';

const fetchData = async () => {
    try {
        const response = await axios.get(URL)
        return response.data
    } catch (err) {
        return Promise.reject(err.message)
    }
}

export default fetchData;