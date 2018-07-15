import React from 'react';
import { ImageField,ImageInput, SelectArrayInput, List, Edit, Create, Filter, Datagrid, ReferenceField, TextField, EditButton, DisabledInput, LongTextInput, ReferenceArrayInput, ReferenceInput, SelectInput, SimpleForm, TextInput } from 'admin-on-rest';

import Icon from 'material-ui/svg-icons/maps/place';
export const RolesIcon = Icon;

const RolesTitle = ({ record }) => {
    return <span>Role {record ? `"${record.display_name}"` : ''}</span>;

};

export const RolesList = (props) => (
    <List {...props} sort={{ field: 'id', order: 'ASC' }}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="display_name" />
            <EditButton  />
        </Datagrid>
    </List>
);

export const RolesCreate = (props) => (
    <Create title={<RolesTitle />} {...props}>
        <SimpleForm>
            <TextInput source="id" />
            <TextInput source="display_name" />
        </SimpleForm>
    </Create>
);

export const RolesEdit = (props) => (
    <Edit title={<RolesTitle />} {...props}>
        <SimpleForm>
            <TextInput source="id" />
            <TextInput source="display_name" />
        </SimpleForm>
    </Edit>
);