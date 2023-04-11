import { Admin, Resource, ListGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import {Helmet, HelmetProvider} from "react-helmet-async"
import { MyLayout } from "./layout/Layout";
import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";
import { PostEdit, PostList } from "./posts/posts";

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const AdminDashboard = () => {
  return (<>
    <HelmetProvider>
      <Helmet>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
      </Helmet>
    </HelmetProvider>
      <Admin basename="/admin" dataProvider={dataProvider}   >
        <Resource name="users" list={ListGuesser} icon={UserIcon} />
        <Resource name="posts" list={PostList} edit={PostEdit} icon={PostIcon}/>
      </Admin>
  </>

  );
};

export default AdminDashboard;
