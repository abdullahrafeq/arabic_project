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
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [books, setBooks] = useState([])
  const [scholars, setScholars] = useState([])
  const [categories, setCategories] = useState([])
  
  useEffect(() => {
      fetch("http://127.0.0.1:8000/api/books/")
      .then((response) => response.json())
      .then(data => {
          setBooks(data.books)
          console.log(data.books)
      })
      .catch((err) => {
          console.log("Error fetching books: " + err)
      })

      fetch("http://127.0.0.1:8000/api/scholars/")
      .then((response) => response.json())
      .then(data => {
          setScholars(data.scholars)
          console.log(data.scholars)
      })
      .catch((err) => {
          console.log("Error fetching scholars: " + err)
      })

      fetch("http://127.0.0.1:8000/api/book-categories/")
      .then((response) => response.json())
      .then(data => {
          setCategories(data.book_categories)
          console.log(data.book_categories)
      })
      .catch((err) => {
          console.log("Error fetching categories: " + err)
      })
  }, [])

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
            <Route path="/scholars" element={<ScholarsPage scholars={scholars}/>} />
            <Route path="/books" element={<BooksPage books={books} categories={categories}/>} />
            <Route path="/scholar-detail/:id" element={<ScholarDetailPage scholars={scholars}/>} />
            <Route path="/book-detail/:id" element={<BookDetailPage books={books}/>} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
          </Routes>
        </main>
        <Footer/>
    </div>
  );
}

export default App;
