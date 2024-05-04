import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/'/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/favourite-scholars'/>
          <Route path='/favourite-books'/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
