import StaffInfo from "../../components/staffInfo/StaffInfo"
import { singleUser } from "../../data"
import { StaffDef }  from "../../api/staffsAPI"
import "./staff.scss"

interface Props {
  staff : StaffDef;
};
//user staff interface later
const Staff = () => {
  return (
    <div className="staff">
        <StaffInfo {...singleUser}/>
        
    </div>
  )
}

export default Staff