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
      res=await axios.post('http://localhost:3000/author-api/author',currentUser)
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
      res=await axios.post('http://localhost:3000/user-api/user',currentUser)
      let {message,payload}=res.data;
      if(message==='user'){
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

    if(currentUser?.role === "user" && error.length === 0){
      navigate(`/user-profile/${currentUser.email}`);
    }
    if(currentUser?.role === "author" && error.length ===0){
      navigate(`/author-profile/${currentUser.email}`);
    }
  },[currentUser]);


  return (
    <div className='container p-5 '>
      {
        isSignedIn === false && <div>
          <p>Lorem ipsum dolor sit amet Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde laudantium doloribus quasi? Pariatur quas amet quibusdam recusandae exercitationem, ratione animi cum assumenda labore velit nulla vel veniam, minima minus odit ipsam perferendis, consectetur blanditiis mollitia? Quis laboriosam, quasi doloribus nobis totam ea sint consequatur saepe, temporibus, adipisci dicta facere cum. consectetur adipisicing elit. Esse est necessitatibus deleniti provident nulla! Esse aspernatur quasi ducimus aperiam consectetur.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse est necessitatibus deleniti provident nulla! Esse aspernatur quasi ducimus aperiam consectetur.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse est necessitatibus deleniti provident nulla! Esse aspernatur quasi ducimus aperiam consectetur.</p>
          
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
        <div className="form-check">
          <input type="radio" name="role" value="user" className='form-check-input' id="user" onChange={onSelectRole} />
          <label htmlFor="user" className='form-check-label' >User</label>
        </div>
          </div>

          </div>
      }
    </div>
  )
}

export default Home
