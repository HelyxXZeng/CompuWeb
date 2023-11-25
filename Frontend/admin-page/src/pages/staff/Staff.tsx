import StaffInfo from "../../components/staffInfo/StaffInfo"
import { singleUser } from "../../data"
import "./staff.scss"


const Staff = () => {
  return (
    <div className="staff">
        <StaffInfo {...singleUser}/>
        
    </div>
  )
}

export default Staff