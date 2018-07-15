import React from 'react';
import { Show, SimpleShowLayout, ReferenceManyField, AutocompleteInput, ShowButton, Resource, ImageField,ImageInput, SelectArrayInput, List, Edit, Create, Filter, Datagrid, ReferenceField, TextField, EditButton, DisabledInput, LongTextInput, ReferenceArrayInput, ReferenceInput, SelectInput, SimpleForm, TextInput } from 'admin-on-rest';
import DependentSelect from '../components/DependentSelect';
import { DependentInput } from 'aor-dependent-input';

import Icon from 'material-ui/svg-icons/maps/add-location';

export const CompaniesIcon = Icon;

const CompaniesTitle = ({ record }) => {
    return <span>Company {record ? `"${record.name}"` : ''}</span>;

};

const CompaniesFilter = (props) => (
    <Filter {...props}>
        <ReferenceInput label="Town" source="town_id" reference="towns">
            <AutocompleteInput source="name"/>
        </ReferenceInput>
        <TextInput label="Search" source="q" alwaysOn/>
    </Filter>
);

export const CompaniesList = (props) => (
        <List {...props} sort={{ field: 'name', order: 'ASC' }} filters={<CompaniesFilter />} >
            <Datagrid>
                <TextField source="name" />
                <TextField source="town" />
                <EditButton  />
                <ShowButton />
            </Datagrid>

        </List>

);

export const CompaniesCreate = (props) => {
    return (
        <div>
            <Create title={<CompaniesTitle />} {...props}>
                <SimpleForm>
                    <TextInput source="name" />
                    <ReferenceInput source="lan_id" label="Lan" reference="lans" allowEmpty>
                        <AutocompleteInput source="name" />
                    </ReferenceInput>
                    <DependentInput source="town_id" reference="towns" label="Town" dependsOn="lan_id" dependsOnResource="lan_id">
                        <DependentSelect source="town_id" />
                    </DependentInput>
                    <TextInput source="address" />
                    <TextInput source="phone" />
                    <TextInput source="email" />
                </SimpleForm>
            </Create>
        </div>
    )
};


export const CompaniesEdit = (props) => {
    return (
        <div>
            <Edit title={<CompaniesTitle />} {...props}>
                <SimpleForm>
                    <TextInput source="name" />
                    <ReferenceInput source="lan_id" label="Lan" reference="lans" allowEmpty>
                        <AutocompleteInput source="name" />
                    </ReferenceInput>
                    <DependentInput source="town_id" reference="towns" label="Town" dependsOn="lan_id" dependsOnResource="lan_id">
                        <DependentSelect source="town_id" />
                    </DependentInput>
                    <TextInput source="address" />
                    <TextInput source="phone" />
                    <TextInput source="email" />
                </SimpleForm>
            </Edit>
        </div>
    )
};

export const CompaniesShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="name"/>
            <TextField source="lan"/>
            <TextField source="town"/>
            <TextField source="email"/>
            <TextField source="phone"/>
            <TextField source="address"/>

            <ReferenceManyField label="Users"  reference="users" target="company_id" perPage={500}>
                <Datagrid options={{ fixedHeader: true, height: 400 }}>
                    <TextField label="#" source="name"/>
                    <TextField source="town"/>
                    <TextField source="phone"/>
                    <ShowButton />
                </Datagrid>
            </ReferenceManyField>
        </SimpleShowLayout>

    </Show>
);