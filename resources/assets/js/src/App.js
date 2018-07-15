import React from 'react';
import { fetchUtils, jsonServerRestClient, Admin, Resource, resolveBrowserLocale, Delete } from 'admin-on-rest';

import authClient from './authClient';
import Layout from './Layout';
import Menu, {MenuEmployee} from './Menu';
import customRoutes from './routes';
import translations from './i18n';
import CustomLogin from './form/CustomLogin';
import { UsersList, UsersEdit, UserShow, UsersCreate, UserEditCommon } from './resources/users';


let choosenLocale = window.localStorage.getItem('lang');

const httpClient = (url, options = {}) => {
    options.user = {
        authenticated: true,
        token: "Bearer " + localStorage.getItem('token'),
    };
    return fetchUtils.fetchJson(url, options);
};

const restClient = jsonServerRestClient('http://test-work.local:2000/api', httpClient);



const App = () => {
   if(!localStorage.getItem('token')) { // force redirect to login screen if is no token
       window.location = '#/login';
   }
    return (
        <Admin title="Test work" loginPage={CustomLogin} appLayout={Layout} menu={Menu} locale={choosenLocale ? choosenLocale : 'en'} userName={localStorage.userName} idUser={localStorage.IdUser} authClient={authClient} restClient={restClient} messages={translations} customRoutes={customRoutes} >
            {permission => [
                <Resource
                    name="users"
                    list={(permission == 'admin' || permission == 'common_user') ? UsersList : null}
                    edit={(permission == 'admin') ? UsersEdit : UserEditCommon}
                    show={(permission == 'admin' || permission == 'common_user') ? UserShow : null}
                    create={(permission == 'admin') ? UsersCreate : null}
                    remove={(permission == 'admin') ? Delete : null} />,
                <Resource name="users_permissions"/>,
                <Resource name="users_roles" />,
            ]}
        </Admin>
    )
};





export default App;
