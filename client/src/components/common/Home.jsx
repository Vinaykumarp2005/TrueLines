import { useContext,useEffect, useState } from 'react'
import {userAuthorContextObj} from '../../contexts/UserAuthorContext';
import {useUser} from '@clerk/clerk-react'
import axios from 'axios';  
import { useNavigate } from 'react-router-dom';

function Home() {

  const {currentUser,setCurrentUser}=useContext(userAuthorContextObj)
  const navigate = useNavigate();

  const {isSignedIn,user,isLoaded}=useUser()
  const [error,setError]=useState("");
  console.log("isSignedIn :",isSignedIn)
  console.log("user",user)
  console.log("isLoaded",isLoaded)



  async function onSelectRole(e){
    setError('')
    const selectedRole=e.target.value;
    // console.log(selectedRole)
    currentUser.role=selectedRole;
    let res=null;
try{
    if(selectedRole==='author'){
      res=await axios.post('https://truelines-backend.onrender.com/author-api/author',currentUser)
      let {message,payload}=res.data;
      if(message==='author'){
        setCurrentUser({...currentUser,...payload})
        localStorage.setItem("currentuser",JSON.stringify(payload))
          
      }
      else{
        setError(message);
      }
    }
    if(selectedRole==='user'){
      res=await axios.post('https://truelines-backend.onrender.com/user-api/user',currentUser)
      let {message,payload}=res.data;
      if(message==='user'){
        setCurrentUser({...currentUser,...payload})
        localStorage.setItem("currentuser",JSON.stringify(payload))
        
      }
      else{
        setError(message);
      }
    }
    if(selectedRole==='admin'){
      res=await axios.post('https://truelines-backend.onrender.com/admin-api/admin',currentUser)
      let {message,payload}=res.data;
      if(message==='Admin already exists'){
        setCurrentUser({...currentUser,...payload})
        localStorage.setItem("currentuser",JSON.stringify(payload))
       
      }
      else{
        setError(message);
      }
    }
  }
  catch(err){
    setError(err.message);
  }
}
  useEffect(()=>{
    if(isSignedIn===true){
    setCurrentUser({
      ...currentUser,
      firstName:user?.firstName,
      lastName:user?.lastName,
      email:user?.emailAddresses[0].emailAddress,
      profileImageUrl:user?.imageUrl
    })
  }
  },[isLoaded])

  useEffect(()=>{

    console.log("Current User Updated:", currentUser); // Debugging

    if (currentUser?.role === "admin" && error.length === 0) {
        console.log("Navigating inside useEffect..."); // Debugging
        navigate(`/admin-profile/${currentUser.email}`);
    }
    if(currentUser?.role === "user" && error.length === 0){
      navigate(`/user-profile/${currentUser.email}`);
    }
    if(currentUser?.role === "author" && error.length ===0){
      navigate(`/author-profile/${currentUser.email}`);
    }
    if(currentUser?.role === "admin" && error.length ===0){
      navigate(`/admin-profile/${currentUser.email}`);
    }
  },[currentUser]);


  return (
    <div className='container p-5 '>
      {
        isSignedIn === false && <div>
          <h1 className='d-flex justify-content-center'>Welcome to TrueLines</h1>
          
          <h3 style={{ fontFamily: "Josefin Slab, sans-serif" }} className='m-5 p-5'>Your space for programming, databases, and tech insights.
Explore coding tutorials, database management tips, and the latest trends.
Stay updated with expert articles on software development and best practices.
Learn, build, and grow with our tech community!</h3>
          
<h2 className='d-flex justify-content-center'>Sign In to Know More</h2>
          </div>
      }
      {
        isSignedIn ===true &&
        <div className='p-5'>
        
        <div className='d-flex justify-content-evenly bg-danger text-white bg-gradient bg-opacity-75 p-3 align-items-center '>
          <img src={user.imageUrl} alt="" width="100px" className='rounded-circle '  />
          <p className="display-6">{user.firstName}</p>
          <p className='lead'>{user.emailAddresses[0].emailAddress}</p>
          </div>


        <p className="fw-normal lead m-2">Select Role : </p>

        {error.length !== 0 &&(
            <p className="text-danger fs-5" style={{fontFamily:"sans-serif"}}>
              {error}
            </p>
          )
        }


          <div className='d-flex role-radio py-3 justify-content-center'>
         
        <div className="form-check me-4">
          <input type="radio" name="role" value="author" className='form-check-input' id="author" onChange={onSelectRole} />
         <label htmlFor="author" className='form-check-label' >Author</label>
        </div>
        <div className="form-check me-4">
          <input type="radio" name="role" value="user" className='form-check-input' id="user" onChange={onSelectRole} />
          <label htmlFor="user" className='form-check-label' >User</label>
        </div>
        <div className="form-check">
          <input type="radio" name="role" value="admin" className='form-check-input' id="admin" onChange={onSelectRole} />
          <label htmlFor="admin" className='form-check-label' >Admin</label>
        </div>
        
          </div>

          </div>
      }
    </div>
  )
}

export default Home
