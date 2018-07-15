import React from 'react';
import { ReferenceManyField, SimpleShowLayout, ShowButton, Show, AutocompleteInput, ImageField,ImageInput, SelectArrayInput, List, Edit, Create, Filter, Datagrid, ReferenceField, TextField, EditButton, DisabledInput, LongTextInput, ReferenceArrayInput, ReferenceInput, SelectInput, SimpleForm, TextInput } from 'admin-on-rest';
import DependentSelect from '../components/DependentSelect';
import { DependentInput } from 'aor-dependent-input';
import {Tabs, Tab} from 'material-ui/Tabs';


const UsersTitle = ({ record }) => {
    return <span>User {record ? `"${record.name}"` : ''}</span>;

};

const UsersFilter = (props) => (
    <Filter {...props}>
        <ReferenceInput label="Town" source="town_id" reference="towns">
            <AutocompleteInput source="name"/>
        </ReferenceInput>
        <ReferenceInput label="Role" source="role_id" reference="users_roles">
            <AutocompleteInput source="display_name"/>
        </ReferenceInput>
        <ReferenceInput label="Company" source="company_id" reference="companies">
            <AutocompleteInput source="name"/>
        </ReferenceInput>
        <TextInput label="Search" source="q" alwaysOn/>
    </Filter>
);
export const UsersList = (props) => (
    <List {...props} sort={{ field: 'name', order: 'ASC' }} filters={<UsersFilter />}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="town" />
            <EditButton  />
            <ShowButton />
        </Datagrid>
    </List>
);
export const UserShow = (props) => {
    return (
        <div>
            <Show title={<UsersTitle/>} {...props}>
               <SimpleShowLayout>
                   <TextField source="name" />
                   <TextField source="company" />
                   <TextField source="lan" />
                   <TextField source="town" />
                   <TextField source="role" />
                   <TextField source="email" />
                   <TextField source="phone" />

                   <ReferenceManyField label="Projects"  reference="projects" target="user_id">
                          <Datagrid options={{ fixedHeader: true, height: 400 }}>
                              <TextField label="#" source="gravestone_number"/>
                              <TextField source="name"/>
                              <TextField source="area"/>
                              <TextField source="graveyard"/>
                              <ShowButton />
                          </Datagrid>
                   </ReferenceManyField>
               </SimpleShowLayout>

               {/* <ReferenceManyField label="Projects"  reference="projects" >
                    <ProjectsList />
                </ReferenceManyField>*/}
            </Show>


        </div>
    )
}
export const UsersEdit = (props) => {
    return (
        <div>
            <Edit title={<UsersTitle />} {...props} >
                <SimpleForm>
                    {/* <ImageInput source="photo" label="photo" accept="image/*">
                     <ImageField source="photo" title="title" />
                     </ImageInput>*/}
                    <TextInput source="name" />
                    <TextField source="username" />
                    <ReferenceInput source="role_id" label="Roles" reference="users_roles">
                        <AutocompleteInput source="display_name" />
                    </ReferenceInput>
                    <ReferenceInput source="company_id" label="Company" reference="companies">
                        <SelectInput source="name" />
                    </ReferenceInput>
                    <ReferenceInput source="lan_id" label="Lan" reference="lans" >
                        <SelectInput source="name" />
                    </ReferenceInput>
                    {/**
                     * в source вказати з якого поля вказувати параметр
                     * reference вказати слаг для отримання залежносты параметру
                     * dependsOn та dependsOnResource - по якому критерію фільтрувати (має бути параметр елемента)
                    */}
                    <DependentInput source="town_id" reference="towns" label="Town" dependsOn="lan_id" dependsOnResource="lan_id">
                        <DependentSelect source="town_id" />
                    </DependentInput>
                    <TextInput source="email" />
                    <TextInput source="phone" />
                    <TextInput source="new_password" type="password" value="" allowEmpty={true}/>
                </SimpleForm>
            </Edit>
        </div>
    )
};


export const UsersCreate = (props) => {
    return (
        <div>
            <Create title="Add user" {...props} >
                <SimpleForm>
                    {/* <ImageInput source="photo" label="photo" accept="image/*">
                     <ImageField source="photo" title="title" />
                     </ImageInput>*/}
                    <TextInput source="name" />
                    <TextInput source="username" />
                    <ReferenceInput source="role_id" label="Roles" reference="users_roles" allowEmpty>
                        <AutocompleteInput source="display_name" />
                    </ReferenceInput>
                    <ReferenceInput source="company_id" label="Company" reference="companies" allowEmpty>
                        <SelectInput source="name" />
                    </ReferenceInput>
                    <ReferenceInput source="lan_id" label="Lan" reference="lans" allowEmpty>
                        <SelectInput source="name" />
                    </ReferenceInput>
                    {/**
                     * в source вказати з якого поля вказувати параметр
                     * reference вказати слаг для отримання залежносты параметру
                     * dependsOn та dependsOnResource - по якому критерію фільтрувати (має бути параметр елемента)
                     */}
                    <DependentInput source="town_id" reference="towns" label="Town" dependsOn="lan_id" dependsOnResource="lan_id">
                        <DependentSelect source="town_id" />
                    </DependentInput>
                    <TextInput source="email" />
                    <TextInput source="phone" />
                    <TextInput source="password" type="password" value="" allowEmpty={true}/>
                </SimpleForm>
            </Create>
        </div>
    )
};

