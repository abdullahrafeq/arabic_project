import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import NavBar from './layout/navbar/NavBar';
import Footer from './layout/footer/Footer';
import HomePage from './pages/home/HomePage';
import FavouriteScholarsPage from './pages/favourite-scholars/FavouriteScholars';
import Account from './pages/account/AccountPage';
import ScholarsPage from './pages/scholars/ScholarsPage';
import BooksPage from './pages/books/BooksPage';
import ContactUsPage from './pages/contact-us/ContactUsPage';
import AboutUsPage from './pages/about-us/AboutUsPage';
import FavouriteBooksPage from './pages/favourite-books/FavouriteBooksPage';
import BookDetailsPage from './pages/book-detail/BookDetailsPage';
import './App.css';

function App() {
  return (
    <div className="App">
        <NavBar/>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/favourite-scholars" element={<FavouriteScholarsPage />} />
            <Route path="/favourite-books" element={<FavouriteBooksPage />} />
            <Route path="/account" element={<Account />} />
            <Route path="/scholars" element={<ScholarsPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/book-detail" element={<BookDetailsPage />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
          </Routes>
        </main>
        <Footer/>
    </div>
  );
}

export default App;
