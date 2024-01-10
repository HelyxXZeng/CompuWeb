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
  const [ratingData,setRatingData] = useState<any>([]);
  const [orderData,setOrderData] = useState<any>([]);
  const [revenueData,setRevenueData] = useState<any>([]);
  const [returnOData,setReturnOData] = useState<any>([]);
  const [failedOData,setFailedOData] = useState<any>([]);

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const currentDate = dayjs().format('YYYY-MM-DD');
        const response = await DTOAPI.getCS(currentDate);
        setUserData(response.data);
        const rresponse = await DTOAPI.getRS(currentDate);
        setRatingData(rresponse.data);
        const oresponse = await DTOAPI.getOS(currentDate);
        setOrderData(oresponse.data);
        const rerespone = await DTOAPI.getReSM(currentDate);
        setRevenueData(rerespone.data);
        const returnres = await DTOAPI.getRO(currentDate);
        setReturnOData(returnres.data);
        const failedOres = await DTOAPI.getFO(currentDate);
        setFailedOData(failedOres.data);
      } catch (error) {
        throw(error);
      }
    }
    fetchData();
  },[])
  console.log("HOme",failedOData.lists)
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
        <ChartBox color= "skyblue"
                  icon= "/productIcon.svg"
                  title= "Total Rating"
                  dataKey= "number" data={ratingData}/>
      </div>
      <div className="box box4"><PieChartBox/></div>
      <div className="box box5">
        <ChartBox color= "teal"
            icon= "/revenueIcon.svg"
            title= "Total Revenue"
            dataKey= "number" data={revenueData}/>
      </div>
      <div className="box box6">        
        <ChartBox color= "gold"
            icon= "/conversionIcon.svg"
            title= "Total Order"
            dataKey= "number" data={orderData}/>
      </div>
      <div className="box box7"><BigChartBox/></div>
      <div className="box box8">
        <BarChartBox title='Failed Order' color='#8884d8' dataKey='number'
              lists={failedOData.lists}/></div>
      <div className="box box9">
        <BarChartBox 
            color='#FF8042'
            title='Return Order'
            dataKey='number'
            lists={returnOData}/></div>


    </div>
  )
}

export default home
