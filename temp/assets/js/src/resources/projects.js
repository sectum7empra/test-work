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
    Toolbar,
    Show, SimpleShowLayout, ShowButton, SelectArrayInput,
    ReferenceArrayField,
    SingleFieldList,
    ChipField
} from 'admin-on-rest';
import StatusField from '../components/StatusField';
import DependentSelect from '../components/DependentSelect';
import { DependentInput } from 'aor-dependent-input';
import CheckField from '../components/CheckField';
import DeleteChildDialog from '../components/DeleteChildDialog';



import AddProjectAdditionsDialog from '../components/AddProjectAdditionsDialog';
/* import { ProjectsAdditionsCreate } from './projects_additions';*/

export const ProjectsList = (props) => (
    <List {...props} sort={{field: 'id', order: 'ASC'}} filters={<ProjectsFilter />} perPage={25}>
        <Datagrid options={{ fixedHeader: true, height: 400  }}  bodyOptions={{ showRowHover: true}}>
            <TextField label="№" source="id"/>
            <StatusField source="status" elStyle={{ display: "block", height: 8, width:8, border:"1px solid #aeaeae", fontSize:0, borderRadius:"50%"}}/>
            <TextField source="name"/>
            <TextField label="Town" source="town"/>
            <TextField Label="Graveyard" source="graveyard"/>
            <DateField label="Date" source="created_at" defaultValue={new Date()} showTime/>
            <EditButton label="Edit"/>
            <ShowButton label="Show"/>

        </Datagrid>
    </List>

);
const ProjectTitle = ({ record }) => {
    return <span>Project {record ? `"${record.name}"` : ''}</span>;
};
const choices = [
    { id: 11, tilt_to_pressure_test: 1, name: 'Ok'},
    { id: 12,  tilt_to_pressure_test: 0, name: 'Not ok' },
];

const choice2 = [
    { id: 13, pressure_test_35_kg: 1, name: 'Ok' },
    { id: 14,  pressure_test_35_kg: 0, name: 'Not Ok' },
];
const choice3 = [
    { id: 15, tilt_after_pressure_test: 1, name: 'Ok' },
    { id: 16,  tilt_after_pressure_test: 0, name: 'Not Ok' },
];

const studs_choices = [
    { id: '17', studs: '?', name: '?'},
    { id: '18', studs: '0', name: '1'},
    { id: '19', studs: '1', name: '2'},
    { id: '20', studs: '2', name: '3'},
];

const ap11 = [
    { id: 1, action_program_11: 1, name: 1 },
];
const ap12 = [
    { id: 1, action_program_12: 1, name: 1 },
];
const ap13 = [
    { id: 1, action_program_13: 1, name: 1 },
];
const ap2 = [
    { id: 2, action_program_2: 2 }
];
const ap3 = [
    { id: 3, action_program_3: 3 }
];
const ap4 = [
    { id: 4, action_program_4: 4 },
];
const ap5 = [
    { id: 5, action_program_5: 5 },
];
const ap60 = [
    { id: 6.0, action_program_6_0: 6.0 },
];
const ap61 = [
    { id: 6.1, action_program_6_1: 6.1 },
];
const ap62 = [
    { id: 6.2, action_program_6_2: 6.2 },
];
const ap63 = [
    { id: 6.3, action_program_6_3: 6.3 },
];
export const ProjectCreate = (props) => (
    <Create {...props}>
        <TabbedForm>
            <FormTab label="Main information">
                <TextField source="id" label="Id"/>
                <ReferenceArrayInput source="users_ids" reference="users" label="Users" allowEmpty>
                    <SelectArrayInput optionText="name" optionValue="id" />
                </ReferenceArrayInput>
                <ReferenceInput label="Lan" source="lan_id" reference="lans" allowEmpty={true}>
                    <SelectInput optionText="name"/>
                </ReferenceInput>
                <DependentInput label="Town" source="town_id" reference="towns"  dependsOn="lan_id" dependsOnResource="lan_id" allowEmpty>
                    <DependentSelect source="town_id" />
                </DependentInput>
                <DependentInput label="Graveyard" source="graveyard_id" reference="graveyards" dependsOn="town_id" dependsOnResource="town_id" allowEmpty={true}>
                    <DependentSelect source="graveyard_id"/>
                </DependentInput>
                <DependentInput label="Graveyard area" source="area_id" reference="graveyard_areas" dependsOn="graveyard_id" dependsOnResource="graveyard_id" allowEmpty={true}>
                    <DependentSelect source="area_id"/>
                </DependentInput>
                <ReferenceInput label="Price List" source="price_list_id" reference="price_lists" allowEmpty={true} perPage={300}>
                    <SelectInput optionText="name"/>
                </ReferenceInput>
                <TextInput source="name"/>
                <LongTextInput source="note"/>
                <NumberInput source="gravestone_number"/>
                <BooleanInput label="Inclination before" source="inclination_before"/>
                <BooleanInput label="Inclination after" source="inclination_after"/>
                <NumberInput source="pressure"/>
                <DateInput label="Created at" source="created_at" defaultValue={new Date()} options={{
                    disabled: true
                }}/>
            </FormTab>
            <FormTab label="State of the object">
               <label style={{ margin: '25px 0 0 0' }}>Measure</label>
                <NumberInput source="height" style={{ display: 'inline-block'}}/>
                <NumberInput source="width" style={{ display: 'inline-block', margin: '0 0 0 30px'}}/>
                <NumberInput source="depth" style={{ display: 'inline-block', margin: '0 0 0 30px'}}/>
                <RadioButtonGroupInput label="Tilt to pressure test" source="tilt_to_pressure_test" choices={choices} optionText="name" optionValue="tilt_to_pressure_test"/>
                <CheckboxGroupInput label="Cleat" source="studs" choices={studs_choices} optionValue="studs" optionText="name"/>
                <RadioButtonGroupInput label="Pressure test 35kg" source="pressure_test_35_kg" choices={choice2} optionValue="pressure_test_35_kg" optionText="name"/>
                <RadioButtonGroupInput label="Tilt after pressure test" source="tilt_after_pressure_test" choices={choice3} optionValue="tilt_after_pressure_test" optionText="name"/>


            </FormTab>
           <FormTab label="Corrective actions">
                <label style={{ margin: '25px 0 0 0' }}>30-120cm</label>

                <CheckboxGroupInput style={{ display: 'inline-block' }}  label="" source="action_program_11" choices={ap11} optionValue="action_program_11" optionText="name"/>
                <CheckboxGroupInput style={{ display: 'inline-block', margin: '0 0 0 30px' }}  label="" source="action_program_12" choices={ap12} optionValue="action_program_12" optionText="name"/>
                <CheckboxGroupInput style={{ display: 'inline-block', margin: '0 0 0 30px' }}  label="" source="action_program_13" choices={ap13} optionValue="action_program_13"  optionText="name"/>


                <label style={{ margin: '25px 0 0 0' }}>30-90cm</label>
                <CheckboxGroupInput style={{ display: 'inline-block' }} label="" source="action_program_2" optionText="id" choices={ap2} optionValue="action_program_2"/>
                <CheckboxGroupInput style={{ display: 'inline-block', margin: '0 0 0 30px' }} label="" optionText="id" source="action_program_3" choices={ap3} optionValue="action_program_3"/>
                <label style={{ margin: '25px 0 0 0' }}>91-120cm</label>
                <CheckboxGroupInput style={{ display: 'inline-block' }} label="" source="action_program_4" optionText="id" choices={ap4} optionValue="action_program_4"/>
                <CheckboxGroupInput style={{ display: 'inline-block', margin: '0 0 0 30px' }} label="" optionText="id" source="action_program_5" choices={ap5} optionValue="action_program_5"/>
                <label style={{ margin: '25px 0 0 0' }}>91-120cm</label>
                <CheckboxGroupInput style={{ display: 'inline-block' }} label="" source="action_program_6_0" optionText="id" choices={ap60} optionValue="action_program_6_0"/>
                <CheckboxGroupInput style={{ display: 'inline-block', margin: '0 0 0 30px' }} label="" optionText="id" source="action_program_6_1" choices={ap61} optionValue="action_program_6_1"/>
                <CheckboxGroupInput style={{ display: 'inline-block', margin: '0 0 0 30px' }} label="" optionText="id" source="action_program_6_2" choices={ap62} optionValue="action_program_6_2"/>
                <CheckboxGroupInput style={{ display: 'inline-block', margin: '0 0 0 30px' }} label="" optionText="id" source="action_program_6_3" choices={ap63} optionValue="action_program_6_3"/>


            </FormTab>
            <FormTab label="Additional program">

                <ReferenceManyField label="Additonal items" sort={{ field: 'id', order: 'DESC' }} reference="projects_additions" target="projects_id">
                <Datagrid>
                    <TextField source="name" />
                    <TextField source="price" options={{ style: 'currency', currency: 'USD' }}/>
                    <EditButton/>
                </Datagrid>
            </ReferenceManyField>
            </FormTab>


        </TabbedForm>
    </Create>
);

const dateFormatter = v => {
    const match = /(\d{4})-(\d{2})-(\d{2})/.exec(v);
    if (match === null) return;
    const d = new Date(match[1], parseInt(match[2], 10) - 1, match[3]);
    if (isNaN(d)) return;
    return d;
};

const dateParser = v => {
    if (!(v instanceof Date) || isNaN(v)) return;
    const pad = '00';
    const yy = v.getFullYear().toString();
    const mm = (v.getMonth() + 1).toString();
    const dd = v.getDate().toString();
    return `${yy}-${(pad + mm).slice(-2)}-${(pad + dd).slice(-2)}`;
};


export const ProjectEdit = (props) => (
    <Edit title={<ProjectTitle />} {...props}>
        <TabbedForm>
            <FormTab label="Main information">
                <ReferenceArrayInput source="users_ids" reference="users" label="Users" allowEmpty>
                    <SelectArrayInput optionText="name" optionValue="id" />
                </ReferenceArrayInput>
                <ReferenceInput label="Lan" source="lan_id" reference="lans" allowEmpty={true}>
                    <SelectInput optionText="name"/>
                </ReferenceInput>
                <DependentInput label="Town" source="town_id" reference="towns"  dependsOn="lan_id" dependsOnResource="lan_id" allowEmpty>
                    <DependentSelect source="town_id" />
                </DependentInput>
                <DependentInput label="Graveyard" source="graveyard_id" reference="graveyards" dependsOn="town_id" dependsOnResource="town_id" allowEmpty={true}>
                    <DependentSelect source="graveyard_id"/>
                </DependentInput>
                <DependentInput label="Graveyard area" source="area_id" reference="graveyard_areas" dependsOn="graveyard_id" dependsOnResource="graveyard_id" allowEmpty={true}>
                    <DependentSelect source="area_id"/>
                </DependentInput>
                <ReferenceInput label="Price List" source="price_list_id" reference="price_lists" allowEmpty={true} perPage={300}>
                    <SelectInput optionText="name"/>
                </ReferenceInput>
                <TextInput source="name"/>
                <LongTextInput source="note"/>
                <NumberInput source="gravestone_number"/>
                <BooleanInput label="Inclination before" source="inclination_before"/>
                <BooleanInput label="Inclination after" source="inclination_after"/>
                <NumberInput source="pressure"/>
                <DateInput label="Created at" source="created_at" format={dateFormatter} parse={dateParser} />
            </FormTab>
            <FormTab label="State of the object">
                <label style={{ margin: '25px 0 0 0' }}>Measure</label>
                <NumberInput source="height" style={{ display: 'inline-block'}}/>
                <NumberInput source="width" style={{ display: 'inline-block', margin: '0 0 0 30px'}}/>
                <NumberInput source="depth" style={{ display: 'inline-block', margin: '0 0 0 30px'}}/>
                <RadioButtonGroupInput label="Tilt to pressure test" source="tilt_to_pressure_test" choices={choices} optionText="name" optionValue="tilt_to_pressure_test"/>
                <CheckboxGroupInput label="Cleat" source="studs" choices={studs_choices} optionValue="studs" optionText="name"/>
                <RadioButtonGroupInput label="Pressure test 35kg" source="pressure_test_35_kg" choices={choice2} optionValue="pressure_test_35_kg" optionText="name"/>
                <RadioButtonGroupInput label="Tilt after pressure test" source="tilt_after_pressure_test" choices={choice3} optionValue="tilt_after_pressure_test" optionText="name"/>


            </FormTab>
            <FormTab label="Corrective actions">
                <label style={{ margin: '25px 0 0 0' }}>30-120cm</label>

                <CheckboxGroupInput style={{ display: 'inline-block' }}  label="" source="action_program_11" choices={ap11} optionValue="action_program_11" optionText="name"/>
                <CheckboxGroupInput style={{ display: 'inline-block', margin: '0 0 0 30px' }}  label="" source="action_program_12" choices={ap12} optionValue="action_program_12" optionText="name"/>
                <CheckboxGroupInput style={{ display: 'inline-block', margin: '0 0 0 30px' }}  label="" source="action_program_13" choices={ap13} optionValue="action_program_13"  optionText="name"/>


                <label style={{ margin: '25px 0 0 0' }}>30-90cm</label>
                <CheckboxGroupInput style={{ display: 'inline-block' }} label="" source="action_program_2" optionText="id" choices={ap2} optionValue="action_program_2"/>
                <CheckboxGroupInput style={{ display: 'inline-block', margin: '0 0 0 30px' }} label="" optionText="id" source="action_program_3" choices={ap3} optionValue="action_program_3"/>
                <label style={{ margin: '25px 0 0 0' }}>91-120cm</label>
                <CheckboxGroupInput style={{ display: 'inline-block' }} label="" source="action_program_4" optionText="id" choices={ap4} optionValue="action_program_4"/>
                <CheckboxGroupInput style={{ display: 'inline-block', margin: '0 0 0 30px' }} label="" optionText="id" source="action_program_5" choices={ap5} optionValue="action_program_5"/>
                <label style={{ margin: '25px 0 0 0' }}>91-120cm</label>
                <CheckboxGroupInput style={{ display: 'inline-block' }} label="" source="action_program_6_0" optionText="id" choices={ap60} optionValue="action_program_6_0"/>
                <CheckboxGroupInput style={{ display: 'inline-block', margin: '0 0 0 30px' }} label="" optionText="id" source="action_program_6_1" choices={ap61} optionValue="action_program_6_1"/>
                <CheckboxGroupInput style={{ display: 'inline-block', margin: '0 0 0 30px' }} label="" optionText="id" source="action_program_6_2" choices={ap62} optionValue="action_program_6_2"/>
                <CheckboxGroupInput style={{ display: 'inline-block', margin: '0 0 0 30px' }} label="" optionText="id" source="action_program_6_3" choices={ap63} optionValue="action_program_6_3"/>


            </FormTab>
            <FormTab label="Additional program">
                <AddProjectAdditionsDialog />
                <ReferenceManyField label="Additional items"  reference="projects_assigned_additions" target="project_id" perPage={500}>
                    <Datagrid options={{ fixedHeader: true, height: 400 }}>
                        <TextField source="name"/>
                        <TextField source="price"/>
                        <DeleteChildDialog />
                    </Datagrid>
                </ReferenceManyField>
                {/*<ReferenceManyField label="Additonal items" sort={{ field: 'id', order: 'DESC' }} reference="projects_additions" target="projects_id">
                <Datagrid>
                <TextField source="name" />
                <TextField source="price" options={{ style: 'currency', currency: 'USD' }}/>
                <EditButton/>
                </Datagrid>
                </ReferenceManyField>*/}
            </FormTab>


        </TabbedForm>
    </Edit>
);

export const ProjectShow = (props) => (
    <Show title={<ProjectTitle/>} {...props}>
        <SimpleShowLayout>
            {/*<ReferenceArrayInput source="users_ids" reference="users" label="Users" allowEmpty>*/}
            {/*<SelectArrayInput optionText="name" optionValue="id" />*/}
        {/*</ReferenceArrayInput>*/}
            <TextField source="name" />
            <TextField source="note" />
            <TextField source="gravestone_number" />
            <ReferenceArrayField label="Users" reference="users" source="users_ids">
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ReferenceArrayField>
            <TextField source="inclination_before" />
            <TextField source="inclination_after" />
            <TextField source="pressure" />
            <ReferenceManyField label="Corrective action"  reference="action_program" target="action_programDOTid" perPage={5}>
                <Datagrid >
                    <CheckField label="Tilt to pressure test" source="tilt_to_pressure_test"/>
                    <CheckField label="Cleat" source="studs"/>
                    <CheckField label="Pressure test 35kg" source="pressure_test_35_kg"/>
                    <CheckField label="Tilt after pressure test" source="tilt_after_pressure_test"/>
                    <CheckField label="1" source="action_program_11"/>
                    <CheckField label="1" source="action_program_12" />
                    <CheckField label="1" source="action_program_13" />
                    <CheckField label="2" source="action_program_2"/>
                    <CheckField label="3" source="action_program_3"/>
                    <CheckField label="4" source="action_program_4"/>
                    <CheckField label="8" source="action_program_5"/>
                    <CheckField label="6.0" source="action_program_60"/>
                    <CheckField label="6.1" source="action_program_61"/>
                    <CheckField label="6.2" source="action_program_62"/>
                    <CheckField label="6.3" source="action_program_63"/>
                    <EditButton />
                </Datagrid>
            </ReferenceManyField>
        </SimpleShowLayout>
    </Show>
);

const ProjectsFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn/>
        <ReferenceArrayInput label="Graveyards" source="id" reference="graveyards">
            <SelectInput optionText="name"/>
        </ReferenceArrayInput>
    </Filter>
);