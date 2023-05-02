import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { Browse } from './pages/browse/Browse';
import { Login } from './pages/login/Login';
import { Register } from './pages/register/Register';
import { Details } from './pages/details/Details';

import { Player } from './pages/player/Player';
import { Library } from './pages/library/Library';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalProvider } from './reducers/GlobalState';
import { Home } from './pages/home/Home';
import { Contacts } from './pages/contacts/Contacts';

function App() {
  const queryClient = new QueryClient();

  return (
    <div className='app'>
      <QueryClientProvider client={queryClient}>
        <GlobalProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/browse' element={<Browse />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/movies/single/:id' element={<Details />} />
              <Route path='/player/:id' element={<Player />} />
              <Route path='/library' element={<Library />} />
              <Route path='/contacts' element={<Contacts />} />
            </Routes>
          </BrowserRouter>
        </GlobalProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
