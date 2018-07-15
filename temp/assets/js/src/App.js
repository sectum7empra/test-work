import React from 'react';
import { fetchUtils, jsonServerRestClient, Admin, Resource, englishMessages, Delete } from 'admin-on-rest';
import DeleteChild from './components/DeleteChild';

import swedishMessages from 'aor-language-swedish';
import authClient from './authClient';

import addUploadFeature from './advance/imagesUpload';

import Layout from './Layout';
const messages = {
    'sv': swedishMessages,
    'en': englishMessages,
};

const httpClient = (url, options = {}) => {
    options.user = {
        authenticated: true,
        token: "Bearer " + localStorage.getItem('token'),
    };
    return fetchUtils.fetchJson(url, options);
};

const restClient = jsonServerRestClient('http://gravestone.loc/api', httpClient);

const uploadCapableClient = addUploadFeature(restClient);


import { ProjectsList, ProjectEdit, ProjectCreate, ProjectShow } from './resources/projects';
import { GraveyardsList, GraveyardIcon, GraveyardsShow, GraveyardsEdit, GraveyardsCreate} from './resources/graveyards';
import { TownsList, TownsIcon, TownsCreate, TownsEdit,TownsShow } from './resources/towns';
import { LansList, LansIcon, LansEdit, LansCreate, LansShow} from './resources/lans';
import { UsersList, UsersEdit, UserShow, UsersCreate } from './resources/users';
import { GraveyardsAreasList, GraveyardsAreasCreate, GraveyardsAreasEdit, GraveyardsAreasShow } from './resources/graveyard_areas';
import { RolesCreate, RolesEdit, RolesList } from './resources/usersRoles';
import { PriceListList, PriceListCreate, PriceListEdit } from './resources/price_lists';

const App = () => (
    <Admin  appLayout={Layout} title="Gravestones CRM" authClient={authClient} restClient={restClient} locale="en" messages={messages}>
        <Resource name="users_roles" edit={RolesEdit} list={RolesList} create={RolesCreate} />
        <Resource name="users" list={UsersList} edit={UsersEdit} show={UserShow} create={UsersCreate} />
        <Resource name="lans" list={LansList} edit={LansEdit} create={LansCreate} icon={LansIcon} show={LansShow} remove={Delete} />
        <Resource name="towns" edit={TownsEdit} create={TownsCreate} list={TownsList} show={TownsShow} icon={TownsIcon} remove={Delete} />
        <Resource name="graveyards" list={GraveyardsList} icon={GraveyardIcon} create={GraveyardsCreate} edit={GraveyardsEdit} show={GraveyardsShow} remove={Delete} />
        <Resource name="graveyard_areas" list={GraveyardsAreasList} create={GraveyardsAreasCreate} edit={GraveyardsAreasEdit} show={GraveyardsAreasShow} remove={Delete}/>
        <Resource name="projects" list={ProjectsList} edit={ProjectEdit} create={ProjectCreate} show={ProjectShow} remove={Delete}/>
        <Resource name="projects_additions" />
        <Resource name="price_lists" list={PriceListList} edit={PriceListEdit}/>
        <Resource name="correction_actions"/>
        <Resource name="projects_assigned_additions" remove={DeleteChild} />
    </Admin>
);

export default App;
