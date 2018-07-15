import { fetchUtils, jsonServerRestClient } from 'admin-on-rest';


const httpClient = (url, options = {}) => {
    options.user = {
        authenticated: true,
        token: "Bearer " + localStorage.getItem('token'),
    };
    return fetchUtils.fetchJson(url, options);
};
export const restClient = jsonServerRestClient('http://test-work.local:2000/api', httpClient);