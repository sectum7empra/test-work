import React from 'react';
import { ReferenceManyField, SimpleShowLayout, Show, ShowButton, Edit, EditButton, SimpleForm, ReferenceInput, SelectInput, TextInput, List, Datagrid, TextField } from 'admin-on-rest';
import { DependentInput } from 'aor-dependent-input';
import  DependentSelect  from '../components/DependentSelect';
import StatusField from '../components/StatusField';

const GraveyardsAreasTitle = (( { record })=> (
    <span>Graveyard area {record ? `"${record.name}"` : ''}</span>
));

export const GraveyardsAreasList = (props) => (
    <List title={<GraveyardsAreasTitle />} {...props}>
        <Datagrid>
            <TextField source="name" />
            <TextField source="lan" />
            <TextField source="town" />
            <TextField source="graveyard" />
            <ShowButton />
            <EditButton />
        </Datagrid>
    </List>
);
export const GraveyardsAreasShow = (props) => (
    <Show title={<GraveyardsAreasTitle />} {...props}>
        <SimpleShowLayout>
            <TextField source="name" />
            <TextField source="lan" />
            <TextField source="town" />
            <TextField source="graveyard" />
            <ReferenceManyField label="Projects"  reference="projects" target="projectsDOTarea_id" perPage={500}>
                <Datagrid>
                    <TextField label="#" source="gravestone_number"/>
                    <TextField source="name"/>
                    <StatusField source="status" elStyle={{ display: "block", height: 8, width:8, border:"1px solid #aeaeae", fontSize:0, borderRadius:"50%"}}/>
                    <ShowButton />
                    <EditButton />
                </Datagrid>
            </ReferenceManyField>
        </SimpleShowLayout>
    </Show>
);
export const GraveyardsAreasEdit = (props) => (
    <Edit title={<GraveyardsAreasTitle />} {...props}>
        <SimpleForm>
            <ReferenceInput label="Lan" source="lan_id" reference="lans">
                <SelectInput optionText="name"/>
            </ReferenceInput>
            <DependentInput label="Town" source="town_id" reference="towns"  dependsOn="lan_id" dependsOnResource="lan_id" allowEmpty>
                <DependentSelect source="town_id" />
            </DependentInput>
            <DependentInput label="Graveyard" source="graveyard_id" reference="graveyards"  dependsOn="town_id" dependsOnResource="town_id" allowEmpty>
                <DependentSelect source="graveyard_id" />
            </DependentInput>
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);
export const GraveyardsAreasCreate = (props) => (
    <Create title={<GraveyardsAreasTitle />} {...props}>
        <SimpleForm>
            <ReferenceInput label="Lan" source="lan_id" reference="lans">
                <SelectInput optionText="name"/>
            </ReferenceInput>
            <DependentInput label="Town" source="town_id" reference="towns"  dependsOn="lan_id" dependsOnResource="lan_id" allowEmpty>
                <DependentSelect source="town_id" />
            </DependentInput>
            <DependentInput label="Graveyard" source="graveyard_id" reference="graveyards"  dependsOn="town_id" dependsOnResource="town_id" allowEmpty>
                <DependentSelect source="graveyard_id" />
            </DependentInput>
            <TextInput source="name" />
        </SimpleForm>
    </Create>
);