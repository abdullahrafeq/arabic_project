import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import NavBar from './layout/navbar/NavBar';
import Footer from './layout/footer/Footer';
import HomePage from './pages/home/HomePage';
import FavouriteScholars from './pages/favourite-scholars/FavouriteScholars';
import Account from './pages/account/AccountPage';
import ScholarsPage from './pages/scholars/ScholarsPage';
import BooksPage from './pages/books/BooksPage';
import ContactUsPage from './pages/contact-us/ContactUsPage';
import AboutUsPage from './pages/about-us/AboutUsPage';
import './App.css';

function App() {
  return (
    <div className="App">
        <NavBar/>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/favourite-scholars" element={<FavouriteScholars />} />
            <Route path="/account" element={<Account />} />
            <Route path="/scholars" element={<ScholarsPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
          </Routes>
        </main>
        <Footer/>
    </div>
  );
}

export default App;
