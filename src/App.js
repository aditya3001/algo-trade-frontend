import './App.css';
import { Route, Routes, Navigate, BrowserRouter as Router} from 'react-router-dom';
import Home from './components/home/Home';
import { createContext, useEffect, useState } from 'react';
import Navbar from './components/navbar/Navbar';
import ParametersManipulator from './components/parametersManipulator/ParametersManipulator';
import Login from './components/login/Login';
import { ACCESS_TOKEN } from './constants/Constants.js';
import { getCurrentUser } from './util/APIUtil';
import PrivateRoute from './common/PrivateRoute';

export const globalContext = createContext();



function App() {
  const [currentSection, setCurrentSection] = useState(localStorage.getItem('CURRENT_TAB')?parseInt(localStorage.getItem('CURRENT_TAB')):0);
  const [state, setState] = useState({
    authenticated : localStorage.getItem(ACCESS_TOKEN)?true:false,
    currentUser : null,
    loading : false
  })
  const presistAndSetCurrentSection = (currentSec)=>{
    setCurrentSection(currentSec);
    localStorage.setItem('CURRENT_TAB', currentSec);
  }
  
  const loadCurrentLoggedInUser = ()=>{
    getCurrentUser().then(res=>{
      console.log(res);
      setState({
      currentUser : res,
      authenticated  : true,
      loading: false
    })}).catch(error=>{
      setState(st=>{
        console.log("+++++++++++++",st)
      return {...st,loading :false}
    })
  })
  }
  useEffect(()=>{
    loadCurrentLoggedInUser();
  },[])


  return (
      <Router initialEntries={['/']}>
        <Navbar state={state} setState={setState} currentSection={currentSection} setCurrentSection={presistAndSetCurrentSection}/>
            <div className='main-container'>
              <Routes>
                <Route path='/'element={<Navigate to="/home" />}/> 
                <Route path='/home' element={<PrivateRoute state={state} setCurrentSection={presistAndSetCurrentSection} />}> <Route path="" element = {<Home state={state} setCurrentSection={presistAndSetCurrentSection} />} /> </Route>
                <Route path='/parameters' element={<PrivateRoute state={state} setCurrentSection={presistAndSetCurrentSection}/> }> <Route path="" element = {<ParametersManipulator state={state} setCurrentSection={presistAndSetCurrentSection}/>} /> </Route>
                <Route path='/login' element={<Login setCurrentSection={presistAndSetCurrentSection} setState={setState}/>}/> 
              </Routes>
            </div>
      </Router>
  );
}

export default App;
