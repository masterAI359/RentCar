import { useDispatch, useSelector } from "react-redux"
import { deleteUserFailure, deleteUserStart, deleteUserSuccess } from "../redux/user/userSlice"


function Profile() {
  const {currentUser}  = useSelector((state)=> state.user)
  const dispatch = useDispatch()
  
  const handleDelete = async()=> {
    dispatch(deleteUserStart())
    const res = await fetch(`/api/user/delete/${currentUser._id}`,{
      method:'DELETE'
    })
    const data = res.json()
    if(data.success === false){
      dispatch(deleteUserFailure())
      return 
    }
    dispatch(deleteUserSuccess())
    
  }


  const handleSignOut = async()=> {
    if(currentUser){
      const res = await fetch('/api/auth/signout',{
        method:'POST',
        headers:{
          "Content-Type":"applicatoin/json"
        },
        body:JSON.stringify({
          access_token:currentUser.access_token
        }),
      })
      const data = await res.json()
      console.log(data)
    }
  }
  return (
    <div>
      <h1>Profile</h1>
      <div>
      <button className="text-danger-400" onClick={handleDelete}>Delete User</button>
      <button className="text-red-400" onClick={handleSignOut}>Sign out</button>
      </div>
    </div>
  )
}

export default Profile