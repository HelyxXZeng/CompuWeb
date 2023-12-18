import "./topBox.scss"
import { topDealUsers } from "../../data" /*lúc sau sẽ chuyển sang fetch API và database sau*/ 

const topBox = () => {
  return (
    <div className="topBox">
        <h1>Top Deals</h1>
        <div className="list">
            {topDealUsers.map(user=>(
                <div className="listItem" key={user.id}>
                    <div className="user">
                        <img src={user.img} alt="" />
                        <div className="userTexts">
                            <span className="usrename">{user.username}</span>
                            <span className="phone">{user.phone}</span>
                        </div>
                    </div>
                    <span className="amount">${user.amount}</span>
                </div>
            ))}
        </div>
    
    </div>
  )
}

export default topBox