import {useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useClerk ,useUser} from '@clerk/clerk-react'
import { userAuthorContextObj } from '../../contexts/UserAuthorContext'
import logo from '../../assets/logo.jpeg'
import { useLocation } from 'react-router-dom'

function Header() {
    const {signOut}= useClerk()
    const {isSignedIn,user,isLoaded}= useUser()
    const {currentUser,setCurrentUser}=useContext(userAuthorContextObj)
    const navigate=useNavigate();
 const {state}=useLocation()
 
    //function to signpot
    async function handlingSignout(){
      await signOut();
      setCurrentUser(null)
      navigate('/')
    }

  return (
<div>
      <nav className='header d-flex mb-0 justify-content-between align-items-center '>
        <div className="d-flex justify-content-center">
          <Link to='/'>
            <img src={logo} alt="" width="150px" height="100px" className='p-2'/>
          </Link>
        </div>
        <div style={{ fontFamily: "Josefin Slab, sans-serif" }}>
      <h2 style={{ fontFamily: "Permanent Marker, sans-serif" }}>
        TrueLines - <span style={{ fontFamily: "Josefin Slab, sans-serif" }} className='fw-semibold fs-4'>Where Every Word Matters</span>
      </h2>
    </div>
        <ul className="d-flex justify-content-around list-unstyled header-links ">
          {
            !isSignedIn ?
            <>
             <li>
           <button className="btn btn-light m-2 "> <Link to='' style={{ textDecoration: "none"}}>Home</Link></button>
          </li>
          <li>
          <button className="btn btn-light m-2">  <Link to='signin' style={{ textDecoration: "none"}}>Signin</Link></button>
          </li>
          <li>
          <button className="btn btn-light m-2  ">   <Link to='signup' style={{ textDecoration: "none"}}>Signup</Link></button>
          </li>
        
            
            </>:
            <div className='user-button'>
              <div style={{position:'relative'}}>
                <img src={user.profileImageUrl} width='40px' className='rounded-circle' alt="" />
              </div>
              <p className='mb-0 user-name mt-2 ' style={{position:'absolute',top:"0px"}}>{user.firstName}</p>
              
              <button className="btn btn-danger m-3" onClick={handlingSignout}>SignOut</button>
            </div>
          }

         </ul>
      </nav>
    </div>
  
  )
}

export default Header
