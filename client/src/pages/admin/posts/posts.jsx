import { Datagrid, EditButton, List, ReferenceField, ReferenceInput, SimpleForm, TextField, TextInput,Edit } from "react-admin"

export const PostList = ()=>{
    return (<List>
        <Datagrid>
            <TextField source="id"/>
            <ReferenceField source="userId" reference="users"/>
            <TextField source="title"/>
            <EditButton />
        </Datagrid>
    </List>)
}

export const PostEdit = ()=>{
    return (<Edit>
        <SimpleForm>
            <ReferenceInput source="userId" reference="users" />
            <TextInput source="id"/>
            <TextInput source="title"/>
            <TextInput source="body"/>
        </SimpleForm>
    </Edit>)
}