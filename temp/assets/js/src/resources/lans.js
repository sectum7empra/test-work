import React from 'react';
import { ReferenceManyField, Show, ShowButton, SimpleShowLayout, ImageField,ImageInput, SelectArrayInput, List, Edit, Create, Filter, Datagrid, ReferenceField, TextField, EditButton, DisabledInput, LongTextInput, ReferenceArrayInput, ReferenceInput, SelectInput, SimpleForm, TextInput } from 'admin-on-rest';

import Icon from 'material-ui/svg-icons/maps/place';
export const LansIcon = Icon;

const LansTitle = ({ record }) => {
    return <span>Lan {record ? `"${record.name}"` : ''}</span>;

};

export const LansList = (props) => (
    <List {...props} sort={{ field: 'kod', order: 'ASC' }}>
        <Datagrid  options={{ fixedHeader: true, height: 400 }}>

            <TextField source="name" />
            <TextField source="kod" />
            <ShowButton />
            <EditButton  />
        </Datagrid>
    </List>
);

export const LansCreate = (props) => (
    <Create title={<LansTitle />} {...props}>
        <SimpleForm>

            <TextInput source="name" />
            <TextInput source="kod" />
        </SimpleForm>
    </Create>
);

export const LansShow = (props) => (
    <Show title={<LansTitle />} {...props}>
        <SimpleShowLayout>
            <TextField source="kod" />
            <TextField source="name" />
            <ReferenceManyField label="Towns"  reference="towns" target="lan_id" perPage={500}>
                <Datagrid  options={{ fixedHeader: true, height: 400 }}>
                    <TextField source="name"/>
                    <TextField source="lan"/>
                    <EditButton />
                    <ShowButton />
                </Datagrid>
            </ReferenceManyField>
        </SimpleShowLayout>
    </Show>
)

export const LansEdit = (props) => (
    <Edit title={<LansTitle />} {...props}>
        <SimpleForm>
            <TextInput source="kod" />
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);