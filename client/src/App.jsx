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
import BookDetailPage from './pages/book-detail/BookDetailPage';
import ScholarDetailPage from './pages/scholar-detail/ScholarDetailPage';
import AdminGuidePage from './pages/admin-guide/AdminGuidePage';
import './App.css';
import { SearchProvider } from './contexts/SearchContext';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import { useContext, useEffect } from 'react';

function AppContent() {
  const { isAdmin } = useContext(AuthContext);
  
  useEffect(() => {
    console.log(isAdmin)
  }, [isAdmin])
  
  return (
    <div className="App">
      <SearchProvider>
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favourite-scholars" element={<FavouriteScholarsPage />} />
            <Route path="/favourite-books" element={<FavouriteBooksPage />} />
            <Route path="/scholars" element={<ScholarsPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/scholar-detail/:id" element={<ScholarDetailPage />} />
            <Route path="/book-detail/:id" element={<BookDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/account" element={<Account />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            {isAdmin && <Route path="/admin-guide" element={<AdminGuidePage />} />}
          </Routes>
        </main>
        <Footer />
      </SearchProvider>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
