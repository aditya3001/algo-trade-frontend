import React, { Fragment, useState } from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ACCESS_TOKEN } from '../../constants/Constants';
// import { globalContext } from '../../App';

const Navbar = (props)=>{
    const navigate = useNavigate();
    const [hamburgerActive, setHamburgerActive] = useState(false);
    const handleHamburgerState = (e)=>{
        e.preventDefault();
        setHamburgerActive((cVal)=>{
            return !cVal;
        })
    }
    const handleLogout = (e)=>{
        e.preventDefault();
        localStorage.removeItem(ACCESS_TOKEN);
        props.setState({authenticated : false, currentUser : null,loading:false})
        navigate('/login', {replace:true});
        console.log('Logged Out Successfully!')
      }
    // const ctx = useContext(globalContext);

  
    // let navStyle1 = {
    //     padding : `${1.5+( ctx.state.scrolledValue <= 1000 ? (1000-ctx.state.scrolledValue)/1000:0)}rem 0`,
    //     background:`rgba(0,0,0,${0.7-0.7*( ctx.state.scrolledValue <= 1000 ? (1000-ctx.state.scrolledValue)/1000:0)})`,
    //     boxShadow: `0 0 1.3rem 0.3rem rgba(var(--main-tint-raw), ${0.7-0.7*( ctx.state.scrolledValue <= 1000 ? (1000-ctx.state.scrolledValue)/1000:0)})`,
    // }
    // const handleClick = (e)=>{
    //     e.preventDefault();
    //     if(e.target.id === 'Login'){
           
    //     }else if(e.target.id === 'Logout'){
    //         props.setCurrentSection(6);
    //         localStorage.setItem("loggedIn",false);
    //         props.setLoggedInState(false);
    //         navigate ('/login');
    //     }
    // }   
    // const handleSignIn = (e)=>{
    //     e.preventDefault();
    //        navigate ('/signup');
    // }

    const handleButtonClick = (e)=>{
        e.preventDefault();
        if(e.target.id === 'Home'){
            props.setCurrentSection(0);
            navigate('/home')
        } else if(e.target.id === 'AlgoParameters'){
            props.setCurrentSection(1);
            navigate('/parameters')
        } else if(e.target.id === 'Charts'){
            props.setCurrentSection(2);
            navigate('/charts')
        } 
        else if(e.target.id === 'Login'){
            props.setCurrentSection(3);
            navigate ('/login');

        }
        setHamburgerActive(false);
        // ctx.dispatch({type:'INIT', data:0})
    }
    return (<Fragment>
        <div className="bg-gray-700 navbar">
                    {/* <button id='signin' className='btn-primary' onClick={handleSignIn}>Sign Up</button> */}
            <div className={hamburgerActive?'expanded-view':'inline'}>
                <div className={hamburgerActive===false? 'hide':'show'} ><FontAwesomeIcon icon={faTimes} onClick={(e)=>handleHamburgerState(e)} /></div>
                <button className={props.currentSection===0?'btn-primary selected':'btn-primary'}  onClick={handleButtonClick} id='Home'> Home</button>
                <button className={props.currentSection===1?'btn-primary selected':'btn-primary'} 
                onClick={handleButtonClick} id='AlgoParameters'> Parameters</button>
                <button className={props.currentSection===2?'btn-primary selected':'btn-primary'}  onClick={handleButtonClick} id='Charts'> Charts</button>
                
                {props.state.authenticated===true?<button id='Logout' className='btn-primary' onClick={handleLogout}>Logout</button>:<button className={props.currentSection===3?'btn-primary selected':'btn-primary'}  onClick={handleButtonClick} id='Login'> Login</button>}
            </div>
            <div className='hamburger'><FontAwesomeIcon icon={faBars} onClick={(e)=>handleHamburgerState(e)} size='lg'/></div>
            
        </div>
    </Fragment>)
}

export default Navbar;