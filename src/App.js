import './App.css';
import { Route, Routes, Navigate, MemoryRouter} from 'react-router-dom';
import Home from './components/home/Home';
import { createContext, useState } from 'react';
import Navbar from './components/navbar/Navbar';
import ParametersManipulator from './components/ParametersManipulator/ParametersManipulator';

export const globalContext = createContext();
export const baseUri = 'http://ec2-54-153-56-1.us-west-1.compute.amazonaws.com:8080'
function App() {
  const logState = localStorage.getItem('loggedIn')===undefined?false:localStorage.getItem('loggedIn')==='true'?true:false;
  const [loggedInState, setLoggedInState] = useState(logState)
  const [currentSection, setCurrentSection] = useState(0);
  return (
      <MemoryRouter initialEntries={['/']}>
        <Navbar loggedInState={loggedInState} setLoggedInState={setLoggedInState} currentSection={currentSection} setCurrentSection={setCurrentSection}/>
            <div className='main-container'>
              <Routes>
                <Route path='/'element={<Navigate  replace to="/home" />}/> 
                <Route path='/home' element={<Home/>}/> 
                <Route path='/parameters' element={<ParametersManipulator/>}/> 
              </Routes>
            </div>


      </MemoryRouter>
  );
}

export default App;
