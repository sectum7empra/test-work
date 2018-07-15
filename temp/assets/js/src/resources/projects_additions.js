
import React from 'react';
import { List, Datagrid, TextField, TextInput, Create, SimpleForm } from 'admin-on-rest';

export const ProjectsAdditionsList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField label="Name" source="name" />
            <TextField source="price" options={{ style: 'currency', currency: 'USD' }}/>
        </Datagrid>
    </List>
);

/*
export const ProjectsAdditionsCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput label="Name" source="name" />
            <TextInput source="price" options={{ style: 'currency', currency: 'USD' }}/>
        </SimpleForm>
    </Create>
);
*/
