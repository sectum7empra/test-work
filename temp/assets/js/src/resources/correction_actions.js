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
    AutocompleteInput,
    DeleteButton,
    RadioButtonGroupInput,
    CheckboxGroupInput,
    ReferenceManyField,
    CreateButton,
    SaveButton,
    Toolbar
} from 'admin-on-rest';

export const CorrectionActionsList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="name" />
            <ShowButton />
            <EditButton />
        </Datagrid>
    </List>
);