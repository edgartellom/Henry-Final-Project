import { Layout } from "react-admin";
import { MyAppBar } from "../appbar/MyAppBar";
import { MyError } from "../errors/MyError";

export const MyLayout = (props) => <Layout {...props} appBar={MyAppBar} error={MyError}/>