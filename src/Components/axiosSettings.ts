import axios from 'axios';

export default axios.create(
    {
        baseURL: "https://shop-81f6a-default-rtdb.firebaseio.com/"
    }
)