import ChartBox from '../../components/chartBox/chartBox'
import TopBox from '../../components/topBox/topBox'
import BarChartBox from '../../components/barChartBox/barChartBox'
import { barChartBoxRevenue, barChartBoxVisit, chartBoxConversion, chartBoxProduct, chartBoxRevenue, chartBoxUser } from '../../data'
import './home.scss'
import PieChartBox from '../../components/PieChartBox/PieChartBox'
import BigChartBox from '../../components/bigChartBox/BigChartBox'
import { useEffect, useState } from 'react'
import DTOAPI from '../../api/DTOAPI'
import dayjs from 'dayjs'

const home = () => {
  const [userData,setUserData] = useState<any>([]);
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const currentDate = dayjs().format('YYYY-MM-DD');
        const response = await DTOAPI.getCS(currentDate);
        setUserData(response.data);
      } catch (error) {
        throw(error);
      }
    }
    fetchData();
  },[])
  console.log("user:",userData);
  return (
    <div className='home'>
      <div className="box box1">
        <TopBox/>
      </div>
      <div className="box box2">
        <ChartBox  color="#8884d8"
          icon="/userIcon.svg"
          title="Total Users"
          dataKey="number" data={userData}/>
      </div>
      <div className="box box3">
        <ChartBox {...chartBoxProduct}/>
      </div>
      <div className="box box4"><PieChartBox/></div>
      <div className="box box5">
        <ChartBox {...chartBoxConversion}/>
      </div>
      <div className="box box6">        
        <ChartBox {...chartBoxRevenue}/>
      </div>
      <div className="box box7"><BigChartBox/></div>
      <div className="box box8"><BarChartBox {...barChartBoxVisit}/></div>
      <div className="box box9"><BarChartBox {...barChartBoxRevenue}/></div>


    </div>
  )
}

export default home
