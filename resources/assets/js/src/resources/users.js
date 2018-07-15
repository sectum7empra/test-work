import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    translate,
    ReferenceManyField,
    SimpleShowLayout,
    ShowButton,
    AutocompleteInput,
    ImageField,
    ImageInput,
    SelectArrayInput,
    Filter,
    Datagrid,
    ReferenceField,
    TextField,
    EditButton,
    DisabledInput,
    LongTextInput,
    ReferenceArrayInput,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    TextInput,
    Responsive,
    SimpleList,
    email,
    required,
    number,
    SaveButton,
    ListButton,
    Toolbar,
    List,
    Edit,
    Show,
    Create
} from 'admin-on-rest';
import { Tabs, Tab } from 'material-ui/Tabs';
import Icon from 'material-ui/svg-icons/action/account-circle';
import { BooleanInput } from 'admin-on-rest';
import { BooleanField, FunctionField } from 'admin-on-rest';
export const UserIcon = Icon;

const UsersTitle = ({record}) => {
    return <span>{record ? `${record.name}` : ''}</span>;

};

const UsersToolbar = props => <Toolbar {...props} >
    <SaveButton />
    <ListButton basePath="/users" label="gra.cancel"/>
</Toolbar>;

const UsersFilter = (props) => (
    <Filter {...props}>
        {/*<ReferenceInput source="role_id" translate={translate} translateChoice={true} reference="users_roles">*/}
            {/*<AutocompleteInput source="display_name" optionText="display_name" translateChoice={true}/>*/}
        {/*</ReferenceInput>*/}
        <ReferenceInput label="Name" source="id" reference="users">
            <SelectInput optionText="name" />
        </ReferenceInput>
        <TextInput label="gra.search" source="q" alwaysOn/>
    </Filter>
);
export const UsersList = (props) => (
    <List {...props} sort={{field: 'name', order: 'ASC'}}
          filters={<UsersFilter />}>
        <Responsive
            medium={
                <Datagrid>
                    <TextField label="#" source="id"/>
                    <TextField source="name"/>
                    <TextField source="email"/>
                    <EditButton />
                    <ShowButton />
                </Datagrid>
            }
            small={
                <SimpleList
                    primaryText={record => `${record.name}`}
                />
            }
        />
    </List>
);
export const UserShow = (props) => {
    return (
        <div>
            <Show title={<UsersTitle/>} {...props}>
                <SimpleShowLayout>
                    <TextField source="name"/>
                    <TextField source="role"/>
                    <TextField source="email"/>
                    <TextField source="phone"/>
                </SimpleShowLayout>
            </Show>


        </div>
    );
};
class UsersEditLayout extends Component {
    render () {
        const {props} = this;
        const {translate} = this.context;
        return (
            <div>
                <Edit title={<UsersTitle />} {...props} >
                    <SimpleForm toolbar={<UsersToolbar/>}>
                        <TextInput source="name"/>
                        <ReferenceInput source="role_id" translate={translate} translateChoice={true}
                                        reference="users_roles">
                            <AutocompleteInput source="display_name" optionText="display_name"
                                                           translateChoice={true}/>
                        </ReferenceInput>
                        <TextInput source="email" validate={email}/>
                        <TextInput source="phone" validate={number}/>
                        <TextInput source="new_password" type="password" value="" allowEmpty={true}/>
                        <BooleanInput source="status"/>
                    </SimpleForm>
                </Edit>
            </div>
        );
    }
};

class UsersCommonEditLayout extends Component {
    render () {
        const {props} = this;
        const {translate} = this.context;
        return (
            <div>
                <Edit title={<UsersTitle />} {...props} >
                    <SimpleForm toolbar={<UsersToolbar/>}>
                        <TextInput source="name"/>
                        <TextInput source="email" validate={email}/>
                        <TextInput source="phone" validate={number}/>
                        <TextInput source="new_password" type="password" value="" allowEmpty={true}/>
                        <BooleanInput source="status"/>
                    </SimpleForm>
                </Edit>
            </div>
        );
    }
};

UsersEditLayout.contextTypes = {
    translate: PropTypes.func
};
export const UsersEdit = UsersEditLayout;
export const UserEditCommon = UsersCommonEditLayout;

const validateUserCreation = (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = ['The name is required'];
    }
    if (!values.role_id) {
        errors.role_id = ['The role is required'];
    }

    if (!values.email) {
        errors.email = ['The email is required'];
    }
    if (!values.password) {
        errors.password = ['The password is required'];
    }
    if (!values.new_password) {
        errors.new_password = ['The new password is required'];
    }
    return errors;
};

export const UsersCreate = (props) => {
    return (
        <div>
            <Create title="resources.users.add_user" {...props} >
                <SimpleForm toolbar={<UsersToolbar/>} autocompleete={false} validate={validateUserCreation}>
                    <TextInput source="name" />
                    <ReferenceInput source="role_id" reference="users_roles" allowEmpty>
                        <AutocompleteInput source="display_name" optionText="display_name"/>
                    </ReferenceInput>
                    <TextInput source="email" validate={email}/>
                    <TextInput source="phone"/>
                    <TextInput source="password" type="password" allowEmpty={true}/>
                </SimpleForm>
            </Create>
        </div>
    );
};

