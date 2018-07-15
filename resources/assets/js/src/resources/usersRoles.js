import React from 'react';
import { ImageField,ImageInput, SelectArrayInput, Filter, Datagrid, ReferenceField, TextField, EditButton, DisabledInput, LongTextInput, ReferenceArrayInput, ReferenceInput, SelectInput, SimpleForm, TextInput, Responsive, SimpleList } from 'admin-on-rest';

import Icon from 'material-ui/svg-icons/action/supervisor-account';
export const RolesIcon = Icon;

const RolesTitle = ({ record }) => {
    return <span>Role {record ? `"${record.display_name}"` : ''}</span>;

};

import List from '../redefined_components/aor/layouts/List';
import Edit from '../redefined_components/aor/layouts/Edit';
import Create from '../redefined_components/aor/layouts/Create';
import Show from '../redefined_components/aor/layouts/Show';
import Delete from '../redefined_components/aor/layouts/Delete';
export const RolesList = (props) => (
    <List {...props} sort={{ field: 'id', order: 'ASC' }}>
        <Responsive
            medium={
                <Datagrid>
                    <TextField label="#" source="id" />
                    <TextField source="display_name" />
                    <EditButton  />
                </Datagrid>
            }
            small={
                <SimpleList
                    primaryText={record => `${record.display_name}`}
                />
            }
        />
    </List>
);

const validateRoleCreation = (values) => {
    const errors = {};
    if(!values.id){
        errors.id = ['The role id is required'];
    }
    if(!values.display_name){
        errors.display_name = ['The name is required'];
    }
    return errors
};

export const RolesCreate = (props) => (
    <Create title={<RolesTitle />} {...props}>
        <SimpleForm validate={validateRoleCreation}>
            <TextInput label="#" source="id" />
            <TextInput source="display_name" />
        </SimpleForm>
    </Create>
);

export const RolesEdit = (props) => (
    <Edit title={<RolesTitle />} {...props}>
        <SimpleForm validate={validateRoleCreation}>
            <TextInput source="id" />
            <TextInput source="display_name" />
        </SimpleForm>
    </Edit>
);