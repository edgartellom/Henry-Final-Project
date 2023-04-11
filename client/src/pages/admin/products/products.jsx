import { BooleanField, Datagrid, List, NumberField, TextField } from "react-admin";

export const ProductList = ()=>(
<List>
    <Datagrid rowClick="edit">
        <TextField source="id" label="SKU"/>
        <TextField source="brand"/>
        <TextField source="name" />
        <TextField source="model"/>
        <TextField source="feature"/>
        <NumberField source="price"/>
        <NumberField source="stock"/>
        <BooleanField source="state"/>
    </Datagrid>
</List>
);