import "./topBox.scss"
import { topDealUsers } from "../../data" /*lúc sau sẽ chuyển sang fetch API và database sau*/ 
import { useEffect, useState } from "react"
import DTOAPI from "../../api/DTOAPI";

const topBox = () => {
    const [Data,setData] = useState<any>();
    const fetchData = async () => {
        try {
          const response = await DTOAPI.getTDU();         
          setData(response.data);
        }
        catch(error)
        {
          alert("Failed to get Customer Dealing Infomation. Error:" + error);
          throw(error);
        }
      };
      useEffect(()=>{
        fetchData();
      }, []);
      //vì không có dữ liệu nên không biết khách hàng nào mua
  return (
    <div className="topBox">
        <h1>Top Deals</h1>
        <div className="list">
            {Data.map(user=>(
                <div className="listItem" key={user.id}>
                    <div className="user">
                        <div className="userTexts">
                            <span className="usrename">{user?.username}</span>
                            <span className="phone">{user?.phone}</span>
                        </div>
                    </div>
                    <span className="amount">${user?.amount}</span>
                </div>
            ))}
        </div>
    
    </div>
  )
}

export default topBox