import { useMediaQuery } from "@mui/material";
import { ArrayInput, BooleanField, BooleanInput, Datagrid, Edit, EditButton, List, NumberField, NumberInput, SelectInput, SimpleForm, SimpleList, TextField, TextInput, minLength } from "react-admin";

export const UserList = () => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    return (<List>
        {isSmall ? (
            <SimpleList
                primaryText={(r) => r.Username}
                secondaryText={(r) => r.email}
                tertiaryText={(r) => r.id}
            />
        ) : (
            <Datagrid rowClick="edit">
                <TextField source="id" />
                <TextField source="username" />
                <TextField source="name" />
                <TextField source="email" />
                {/* <TextField source="feature" /> */}
                <NumberField source="phone_number" />
                <BooleanField source="admin" />
                <BooleanField source="state" label="active"/>
                <EditButton />
            </Datagrid>
        )}
    </List>)
}