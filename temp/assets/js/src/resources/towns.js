import React from 'react';
import { ReferenceManyField, Show, SimpleShowLayout, AutocompleteInput, ShowButton, Resource, ImageField,ImageInput, SelectArrayInput, List, Edit, Create, Filter, Datagrid, ReferenceField, TextField, EditButton, DisabledInput, LongTextInput, ReferenceArrayInput, ReferenceInput, SelectInput, SimpleForm, TextInput } from 'admin-on-rest';
import { Tabs } from 'material-ui';
import Icon from 'material-ui/svg-icons/maps/add-location';

export const TownsIcon = Icon;

const TownsTitle = ({ record }) => {
    return <span>Town {record ? `"${record.name}"` : ''}</span>;

};

const TownsFilter = (props) => (
    <Filter {...props}>
        <ReferenceInput label="Lan" source="lan_id" reference="lans">
            <AutocompleteInput source="name"/>
        </ReferenceInput>
        <TextInput label="Search" source="q" alwaysOn/>
    </Filter>
);

export const TownsList = (props) => (
        <List {...props} sort={{ field: 'name', order: 'ASC' }} filters={<TownsFilter />}>
            <Datagrid>
                <TextField source="name" />
                <TextField source="lan" />
                <ShowButton />
                <EditButton  />
            </Datagrid>

        </List>

);

export const TownsCreate = (props) => (
    <Create title={<TownsTitle />} {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <ReferenceInput source="lan_id" label="Lan" reference="lans" allowEmpty>
                <AutocompleteInput source="name" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);

export const TownsEdit = (props) => {
    return (
        <div>
            <Edit title={<TownsTitle />} {...props}>
                <SimpleForm>
                    <TextInput source="name" />
                    <ReferenceInput source="lan_id" label="Lan" reference="lans">
                        <AutocompleteInput source="name" />
                    </ReferenceInput>
                </SimpleForm>
            </Edit>
        </div>
    )
};

export const TownsShow = (props) => {
    return (
        <div>
            <Show title={<TownsTitle />} {...props}>
                <SimpleShowLayout>
                    <TextField source="name" />
                    <ReferenceField reference="lans" label="Lan" source="lan_id">
                        <TextField source="name" />
                    </ReferenceField>
                    <ReferenceManyField label="Graveyards"  reference="graveyards" target="town_id" perPage={500}>
                        <Datagrid  options={{ fixedHeader: true, height: 400 }}>
                            <TextField source="name"/>
                            <TextField source="area"/>
                            <EditButton />
                            <ShowButton />
                        </Datagrid>
                    </ReferenceManyField>
                </SimpleShowLayout>
            </Show>
        </div>
    )
}