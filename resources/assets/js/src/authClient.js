import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK, AUTH_GET_PERMISSIONS } from 'admin-on-rest';
import decodeJwt from 'jwt-decode';
export default (type, params) => {

        if (type === AUTH_LOGIN) {
            const { email, password } = params;
            const request = new Request(api_server + '/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
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
                    var tokenDecoded = decodeJwt(response.access_token);

                    localStorage.setItem('token', response.access_token);
                    localStorage.setItem('role', tokenDecoded.user.role);
                    localStorage.setItem('userName', tokenDecoded.user.name);
                    localStorage.setItem('IdUser', tokenDecoded.user.id);

                    return Promise.resolve();
                }).catch(error => {
                    console.log(error)
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
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userName');
        window.location = '#/login';
        return fetch(logoutRequest)
            .then(response => {

                /*if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
*/
                return response.json();
            })
            .then((success) => {
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                localStorage.removeItem('userName');
                localStorage.removeItem('IdUser');
                if (success) {
                    return Promise.resolve();
                }
            });

    }



 /*   // called when the API returns an error*/
    if (type === AUTH_ERROR) {
        const { status } = params;
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('userName');
            return Promise.reject();
        }
        return Promise.resolve();
    }
/*
    // called when the user navigates to a new location
*/
    if (type === AUTH_CHECK) {
        var check_token = localStorage.getItem('token');
        var check_role = localStorage.getItem('role');
        var check_decodedToken = decodeJwt(check_token);
        return (check_token && check_role.toLowerCase() === check_decodedToken.user.role.toLowerCase()) ? Promise.resolve() : Promise.reject();
    }


    if (type === AUTH_GET_PERMISSIONS) {
        var perm_token = localStorage.getItem('token');
        var perm_role = decodeJwt(perm_token).user.role;
        return Promise.resolve(perm_role);
    }
};