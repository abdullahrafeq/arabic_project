import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import NavBar from './layout/navbar/NavBar';
import Footer from './layout/footer/Footer';
import HomePage from './pages/home/HomePage';
import FavouriteScholars from './pages/favourite-scholars/FavouriteScholars';
import Account from './pages/account/Account';

function App() {
  return (
    <div className="App">
        <NavBar/>
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/favourite-scholars' element={<FavouriteScholars/>}/>
            <Route path='/account' element={<Account/>}/>
          </Routes>
        <Footer/>
    </div>
  );
}

export default App;
