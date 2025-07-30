import { Button } from './ui/button'
import { logout } from '@/connecting'
import { toast } from 'sonner'
import {logout as AuthLogout} from "@/store/authSlice"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Logout() {
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const handleLogout = async () => {
        await logout().then(() => {
            toast.success("Logged out successfully!");
            dispatch(AuthLogout())
            Navigate("/login");
        })
    }
  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default Logout
