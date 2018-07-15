import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import { translate, DashboardMenuItem, MenuItemLink, WithPermission } from 'admin-on-rest';
import Divider from 'material-ui/Divider';

import { UserIcon } from './resources/users';
import AvatarIcon from 'material-ui/svg-icons/action/perm-identity';
const role = window.localStorage.role;
let itemsAdmin = [
    { name: 'users', icon: <UserIcon />},
];

let itemsFinance = [
    { name: 'users', icon: <UserIcon />},
];


import {
    deepOrange300,
    purple500,
} from 'material-ui/styles/colors';

const styleAva = {margin: 5};

const styles = {
    main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        position: 'sticky',
        overflowY: 'auto',
    },
};

const Menu = (obj) => {
    let { onMenuTap, translate, logout, userName } = obj;
    return (
        <div style={styles.main} className="menu-items-container">

                <MenuItemLink
                    key={userName}
                    primaryText={userName}
                    leftIcon={<AvatarIcon/>}
                    disabled
                />

            <Divider />
            {itemsAdmin.map(item => (
                <WithPermission value={['admin']}>
                <MenuItemLink
                    key={item.name}
                    to={`/${item.name}`}
                    primaryText={translate(`resources.${item.name}.name`, { smart_count: 2 })}
                    leftIcon={item.icon}
                    onClick={onMenuTap}
                />
                </WithPermission>
            ))}
            {itemsFinance.map(item => (
                <WithPermission value={['common_user']}>
                    <MenuItemLink
                        key={item.name}
                        to={`/${item.name}`}
                        primaryText={translate(`resources.${item.name}.name`, { smart_count: 2 })}
                        leftIcon={item.icon}
                        onClick={onMenuTap}
                    />
                </WithPermission>
            ))}
            <MenuItemLink
                to="/settings"
                primaryText={translate('gra.configuration')}
                leftIcon={<SettingsIcon />}
                onClick={onMenuTap}
            />
            {logout}
        </div>
    )
};

const enhance = compose(
    connect(state => {
        return ({
            locale: state.locale,
            userName: localStorage.userName,
        })
    }),
    translate,
);
export default enhance(Menu);
