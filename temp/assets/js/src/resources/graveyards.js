import React from 'react';
import {
    Show,
    SimpleShowLayout,
    SimpleShowLayoutShow,
    AutocompleteInput,
    ShowButton,
    Resource,
    ImageField,
    ImageInput,
    SelectArrayInput,
    List,
    Edit,
    Create,
    Filter,
    Datagrid,
    ReferenceField,
    ReferenceManyField,
    TextField,
    EditButton,
    DisabledInput,
    LongTextInput,
    ReferenceArrayInput,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    TextInput,
    ReferenceArrayField,
    SingleFieldList,
    ChipField
} from 'admin-on-rest';
import { ProjectsList } from './projects';
import Icon from 'material-ui/svg-icons/action/bookmark';
import { DependentInput } from 'aor-dependent-input';
import DependentSelect  from '../components/DependentSelect';

export const GraveyardIcon = Icon;
const GraveyardTitle = ({ record }) => {
    return <span>Graveyard {record ? `"${record.name}"` : ''}</span>;

};

const GraveyardFilter = (props) => (
    <Filter {...props}>
        <ReferenceInput label="Town" source="town_id" reference="towns">
            <AutocompleteInput source="name"/>
        </ReferenceInput>
        <TextInput label="Search" source="q" alwaysOn/>
    </Filter>
);

export const GraveyardsList = (props) => (
    <List {...props} title={<GraveyardTitle />} sort={{field: 'id', order: 'ASC'}} filters={<GraveyardFilter/>} perPage={15}>
        <Datagrid>
            <TextField source="id"/>
            <TextField source="name"/>
            <TextField source="town"/>
            <ShowButton />
            <EditButton />
        </Datagrid>
    </List>
);

export const GraveyardsShow = (props) => (
    <Show title={<GraveyardTitle />} {...props}>
        <SimpleShowLayout>
            <TextField source="name"/>
            <TextField source="lan"/>
            <TextField source="town"/>
            <ReferenceArrayField label="Users" reference="users" source="users_ids">
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ReferenceArrayField>
            <ReferenceManyField label="Projects"  reference="projects" target="projectsDOTgraveyard_id" perPage={500}>
                <Datagrid>
                    <TextField label="#" source="gravestone_number"/>
                    <TextField source="name"/>
                    <TextField source="area"/>
                    <ShowButton />
                </Datagrid>
            </ReferenceManyField>
        </SimpleShowLayout>

    </Show>
);
export const GraveyardsEdit = (props) => (
    <Edit title={<GraveyardTitle />} {...props}>
        <SimpleForm>
            <ReferenceArrayInput source="users_ids" reference="users" label="Users" allowEmpty>
                <SelectArrayInput optionText="name" optionValue="id" />
            </ReferenceArrayInput>
            <TextInput source="name"/>
            <ReferenceInput label="Lan" source="lan_id" reference="lans">
                <SelectInput optionText="name"/>
            </ReferenceInput>
            <DependentInput label="Town" source="town_id" reference="towns"  dependsOn="lan_id" dependsOnResource="lan_id" allowEmpty>
                <DependentSelect source="town_id" />
            </DependentInput>
        </SimpleForm>
    </Edit>
);
export const GraveyardsCreate = (props) => (
    <Create title={<GraveyardTitle />}>
        <SimpleForm>
            <TextInput source="name"/>
            <ReferenceInput label="Lan" source="lan_id" reference="lans" allowEmpty={true}>
                <SelectInput optionText="name"/>
            </ReferenceInput>
            <DependentInput label="Town" source="town_id" reference="towns"  dependsOn="lan_id" dependsOnResource="lan_id" allowEmpty>
                <DependentSelect source="town_id" />
            </DependentInput>
        </SimpleForm>
    </Create>
);

