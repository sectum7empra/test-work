import React from 'react';
import {
    List,
    Edit,
    Create,
    Filter,
    Datagrid,
    ReferenceField,
    ReferenceArrayInput,
    BooleanField,
    DateField,
    TextField,
    DataGridCell,
    FullNameField,
    EditButton,
    DisabledInput,
    LongTextInput,
    ReferenceInput,
    SelectInput,
    DateInput,
    BooleanInput,
    SimpleForm,
    TextInput,
    NumberInput,
    TabbedForm,
    FormTab,
    DeleteButton,
    RadioButtonGroupInput,
    CheckboxGroupInput,
    ReferenceManyField,
    CreateButton,
    SaveButton,
    Toolbar,
    AutocompleteInput,
    NumberField
} from 'admin-on-rest';
import DeleteChildDialog from '../components/DeleteChildDialog';
import AddAdditionActionDialog from '../components/AddAdditionActionDialog';
export const PriceListList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField label="#" source="id"/>
            <TextField label="Name" source="name"/>
            <EditButton/>
        </Datagrid>
    </List>
);

export const PriceListEdit = (props) => {
    return (
        <Edit {...props}>
            <TabbedForm>
                <FormTab label="Main information">
                    <TextInput source="name"/>
                    <TextInput source="_1"/>
                    <TextInput source="_2"/>
                    <TextInput source="_3"/>
                    <TextInput source="_4"/>
                    <TextInput source="_5"/>
                    <TextInput source="_6_0"/>
                    <TextInput source="_6_1"/>
                    <TextInput source="_6_2"/>
                    <TextInput source="_6_3"/>
                </FormTab>
                <FormTab label="Addition actions">
                    <AddAdditionActionDialog />
                    <ReferenceManyField label="Additional items"  reference="projects_additions" target="pricelist_id" perPage={500}>
                        <Datagrid options={{ fixedHeader: true, height: 400 }}>
                            <TextField source="name"/>
                            <TextField source="price"/>
                            <DeleteChildDialog />
                        </Datagrid>
                    </ReferenceManyField>
                </FormTab>
            </TabbedForm>
        </Edit>
    );
};
/*
const PriceTitle = ({ record }) => {
    return <span>Price # {record ? `"${record.id}"` : ''}</span>;
};
*/

export const PriceListCreate = (props) => (
    <Create {...props}>
        <SimpleForm>

            <ReferenceInput label="Correction action" source="correction_action_id" reference="correction_actions"
                            allowEmpty={true}>
                <SelectInput optionText="name"/>
            </ReferenceInput>
            <NumberInput source="price" options={{style: 'currency', currency: 'SEK'}}/>
        </SimpleForm>
    </Create>
);

/*export const PriceListEdit = (props) => (
    <Edit title={<PriceTitle/>} {...props}>
        <SimpleForm>
            <ReferenceInput label="Correction action" source="correction_action_id" reference="correction_actions" allowEmpty={true}>
                <SelectInput optionText="name"/>
            </ReferenceInput>
            <NumberInput source="price" options={{ style: 'currency', currency: 'SEK' }}/>
        </SimpleForm>
    </Edit>
);*/
