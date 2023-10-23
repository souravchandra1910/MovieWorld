import Header from './components/Header';
import Cards from './components/Cards'
import AddMovie from './components/AddMovie'
import Details from './components/Details'
import { Link } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { createContext, useState ,useEffect } from 'react';
const Appstate = createContext();
function App() {
  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState("");

  return (
    <Appstate.Provider value={{login,userName,setLogin,setUserName}}>
      <div className="App">
        <Header />
        <Routes>
          <Route path='/' element={<Cards />} />
          <Route path='/addmovie' element={<AddMovie />} />
          <Route path='/detail/:id' element={<Details />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
        </Routes>
      </div>
    </Appstate.Provider>
  );
}

export default App;
export {Appstate};
