import axios from 'axios';

export default axios.create({
    baseURL: true ? 'https://api.barbeariahulkpiracicaba.com.br' : 'https://api.barbeariahulkpiracicaba.com.br/',
    timeout: 500,
});