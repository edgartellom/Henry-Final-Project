import { Admin, Resource, ListGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import {Helmet, HelmetProvider} from "react-helmet-async"
import { MyLayout } from "./layout/Layout";
import BallotIcon from '@mui/icons-material/Ballot';
import PersonIcon from '@mui/icons-material/Person';
import { PostEdit, PostList } from "./posts/posts";
import dataProvider from "./provider/dataProvider"
import { ProductEdit, ProductList } from "./products/products";
import { UserList } from "./users/users";

// const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const AdminDashboard = () => {
  return (<>
    <HelmetProvider>
      <Helmet>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
      </Helmet>
    </HelmetProvider>
      <Admin basename="/admin" dataProvider={dataProvider}  layout={MyLayout} >
        <Resource name="products" list={ProductList} icon={BallotIcon} edit={ProductEdit} />
        {/* <Resource name="posts" list={PostList} edit={PostEdit} icon={PostIcon}/> */}
        <Resource name="users" list={UserList} icon={PersonIcon} />
      </Admin>
  </>

  );
};

export default AdminDashboard;
