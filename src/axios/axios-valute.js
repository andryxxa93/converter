import axios from 'axios';

export default axios.create({
    baseURL: 'https://www.cbr-xml-daily.ru'
})