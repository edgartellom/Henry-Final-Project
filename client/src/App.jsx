import './App.css'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import useCommonStore from './store/commons';

import { shallow } from 'zustand/shallow';
import CreateProduct from './pages/create/CreateProduct';

function App() {

  const { theme, title } = useCommonStore((state) => ({ theme: state.theme, title: state.title }), shallow)

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
