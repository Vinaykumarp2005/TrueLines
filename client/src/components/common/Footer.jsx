import React from 'react'
import {useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useClerk ,useUser} from '@clerk/clerk-react'
import { userAuthorContextObj } from '../../contexts/UserAuthorContext'

function Footer() {
  
  const {signOut}= useClerk()
  const {isSignedIn,user,isLoaded}= useUser()
  const {currentUser,setCurrentUser}=useContext(userAuthorContextObj)
  const navigate=useNavigate();

  //function to signpot
  async function handlingSignout(){
    await signOut();
    setCurrentUser(null)
    navigate('/')
  }



  return (
    <div className='p-5 bg-dark '>
      {/* <h2 className='text-info'>Footer</h2>
       */}
      <div className='d-flex text-info justify-content-around'>
    <ul >
      <li className='text-warning'>Quik Links</li>
      <li > <Link to='' className='text-info' style={{ textDecoration: "none"}}>Home</Link></li>
      <li><Link to='signin' className='text-info' style={{ textDecoration: "none"}}>Signin</Link></li>
      <li><Link to='signup' className='text-info' style={{ textDecoration: "none"}}>Signup</Link></li>
    </ul>
    <ul >
      <li className='text-warning'>Categories</li>
      <li>Programming</li>
      <li>Database</li>
        <li>AI & ML</li>
    </ul>
    
    <ul >
      <li className='text-warning'>Contact</li>
      <li>Phone No - 9392645230</li>
      <li>Email - vinayp2702@gmail.com</li>
      <li>LinkedIn - Vinay Kumar Peddaboina</li>
    </ul>
    </div>
    <hr className='text-light' />
      <p className='text-light text-center'>&copy; 2025 TrueLines , All rights reserved</p>
  
    </div>
  )
}

export default Footer
