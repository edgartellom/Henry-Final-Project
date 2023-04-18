import './App.css'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import useCommonStore from './store/commons';
import { shallow } from 'zustand/shallow';
import CreateProduct from './pages/create/CreateProduct';
//
import {auth} from './firebase/firebaseConfig'
import {useUserContext} from './components/contexts/userContexts'
import { onAuthStateChanged } from 'firebase/auth';



function App() {

  const { theme, title } = useCommonStore((state) => ({ theme: state.theme, title: state.title }), shallow)
  const {user,setUser}=useUserContext();
  onAuthStateChanged(auth,(firebaseUser)=>{
    if(firebaseUser)setUser(firebaseUser);
    if(!firebaseUser)setUser(null)
  })


  return (
    <>
      <HelmetProvider>
        <Helmet htmlAttributes={theme ? { 'data-theme': 'light' } : { 'data-theme': 'dark' }}>
          <title>{title}</title>
        </Helmet>
      </HelmetProvider>

    </>
  );
}

export default App;
