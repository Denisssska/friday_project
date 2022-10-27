import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    //baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/'

    baseURL: process.env.REACT_APP_BACK_URL || 'https://neko-back.herokuapp.com/2.0/'
});
// export const instance2 = axios.create({
//     withCredentials:true,baseURL:'https://dry-forest-56016.herokuapp.com/'
// }
// )