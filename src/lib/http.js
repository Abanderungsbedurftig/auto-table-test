import axios from 'axios'
import {apiUrl} from '../config'

const autoPath = 'vehicles/?state=active&hidden=false&group=new'
const dealerPath = 'dealers/'

export const getAutoFromApi = params => {
    const headers = {'X-CS-Dealer-Id-Only': true}
    const query = Object.keys(params).map(key => `&${key}=${encodeURI(params[key])}`).join('')
    return axios.get(apiUrl + autoPath + query, {headers: headers}).then(res => res.data)
}

export const getDealerFromApiById = id => {
    return axios.get(apiUrl + dealerPath + id).then(res => res.data)
}