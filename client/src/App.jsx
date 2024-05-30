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
import useFetch from './hooks/useFetch';

function App() {  
  const {data:booksData, setData:setBooksData, errorStatus: booksError} = useFetch("http://127.0.0.1:8000/api/books/")
  const {data:scholarsData, setData:setScholarsData, errorStatus: scholarsError} = useFetch("http://127.0.0.1:8000/api/scholars/")
  const {data:bookCategoriesData, setData:setBookCategoriesDataData, errorStatus: bookCategoriesError} = useFetch("http://127.0.0.1:8000/api/book-categories/")
  const {data:scholarYearCategoriesData, setData:setScholarYearCategoriesData, errorStatus: scholarYearCategoriesError} = useFetch("http://127.0.0.1:8000/api/scholar-year-categories/")

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
            <Route path="/scholars" element={<ScholarsPage scholarsData={scholarsData} scholarYearCategoriesData={scholarYearCategoriesData}/>} />
            <Route path="/books" element={<BooksPage booksData={booksData} categoriesData={bookCategoriesData}/>} />
            <Route path="/scholar-detail/:id" element={<ScholarDetailPage scholarsData={scholarsData}/>} />
            <Route path="/book-detail/:id" element={<BookDetailPage booksData={booksData}/>} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
          </Routes>
        </main>
        <Footer/>
    </div>
  );
}

export default App;
