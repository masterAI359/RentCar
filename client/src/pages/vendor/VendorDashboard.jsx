import {useDispatch} from "react-redux"
import { signInStart, signOut } from "../../redux/user/userSlice"
import {useNavigate} from "react-router-dom"


function VendorDashboard() {

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleSignout = async ()=> {
      dispatch(signInStart())
      const res  =  await fetch('api/vendor/vendorsignout',{
        method:'GET'
      })
      const data = await res.json()
      if(data){
        
        dispatch(signOut())
        navigate('/vendorsignin')
        
      }
      

  }

  return <div>
    
    <h1>vendorDashboard</h1>

    <div>
      <button className="text-red-400" type="button" onClick={handleSignout}>signOut</button>
    </div>
    
    </div>;
}

export default VendorDashboard;
