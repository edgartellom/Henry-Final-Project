import { useMediaQuery } from "@mui/material";
import { ArrayInput, BooleanField, BooleanInput, Datagrid, Edit, EditButton, List, NumberField, NumberInput, SelectInput, SimpleForm, SimpleList, TextField, TextInput, minLength } from "react-admin";
import theme from "../../auth/theme";

export const ProductList = () => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    return (
        <List>
            {isSmall ? (
                <SimpleList
                    primaryText={(r)=>r.feature}
                    secondaryText={(r)=>r.stock}
                    tertiaryText={(r)=>r.price}
                />
            ) : (
                <Datagrid rowClick="edit">
                    <TextField source="id" label="SKU" />
                    <TextField source="brand" />
                    <TextField source="name" />
                    <TextField source="model" />
                    {/* <TextField source="feature" /> */}
                    <NumberField source="price" />
                    <NumberField source="stock" />
                    <BooleanField source="state" />
                    <EditButton />
                </Datagrid>
            )}

        </List>
    )
}

export const ProductEdit = ()=>{
    return (
        <Edit>
            <SimpleForm>
                <TextInput source="brand" validate={minLength(3)} />
                <TextInput source="name" validate={minLength(3)}/>
                <TextInput source="model" validate={minLength(3)}/>
                <TextInput source="feature" validate={minLength(3)}/>
                <TextInput source="detail" multiline rows={7} />
                {/* <ArrayInput source="image" /> */}
                {/* <SelectInput source="categories"/> */}
                <BooleanInput source="createInDb"/>
                <NumberInput source="price" />
                <NumberInput source="stock" />
                <BooleanInput source="state" />
            </SimpleForm>
        </Edit>
    )
}