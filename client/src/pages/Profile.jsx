import { useSelector } from "react-redux"


function Profile() {
  const {currentUser}  = useSelector((state)=> state.user)
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
      <button className="text-red-400" onClick={handleSignOut}>Sign out</button>
    </div>
  )
}

export default Profile