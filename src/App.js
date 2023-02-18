import './App.css';
import Signin from './components/signin/signin';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/home/home';
import ProtectedRoute from './components/protectedRoute';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route
            path="/home"
            element={
              <>
                <ProtectedRoute><Home /> </ProtectedRoute>
              </>
            }
          />
          <Route path='*' element={<h1 style={{ textAlign: 'center', marginBlock: '20%' }}>404 NOT Found </h1>}></Route>
        </Routes>
      </Router>
    
  );
}

export default App;
