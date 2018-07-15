import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'admin-on-rest';

export default (type, params) => {

        if (type === AUTH_LOGIN) {
            const { username, password } = params;
            const request = new Request(api_server + '/login', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: new Headers({ 'Content-Type': 'application/json' }),
            });
            return fetch(request)
                .then(response => {
                    if (response.status < 200 || response.status >= 300) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                })
                .then(( response ) => {

                    localStorage.setItem('token', response.access_token);
                    return Promise.resolve();
                });
        }



    /*// called when the user clicks on the logout button*/
    if (type === AUTH_LOGOUT) {

        const logoutRequest = new Request(api_server + '/logout', {
            method: 'POST',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
            }),
        });
        return fetch(logoutRequest)
            .then(response => {

                /*if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
*/
                return response.json();
            })
            .then((success) => {
                if (success) {
                    console.log(success);
                    return Promise.resolve();
                }
            });
    }



 /*   // called when the API returns an error*/
    if (type === AUTH_ERROR) {
        const { status } = params;
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    }
/*
    // called when the user navigates to a new location
*/
    if (type === AUTH_CHECK) {
        return (localStorage.getItem('token') ) ? Promise.resolve() : Promise.reject();
    }
};