import "./staff.scss"
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, ZAxis } from "recharts";
import { useEffect, useState } from "react";
import UpdateStaff from "../../components/updateStaff/UpdateStaff";
import { GridColDef } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import staffApi, { StaffDef } from "../../api/staffsAPI";
import { singleUser } from "../../data";

type Props = {
  id: number;
  img?: string;
  title: string;
  info: StaffDef;
  chart?: {
    dataKeys: { name: string; color: string }[];
    data: object[];
  };
  activities?: { time: string; text: string }[];
};
const columns: GridColDef[] = [
  {
    field: "name",
    type: "string",
    headerName: "Name",
    flex: 5,
  },
  {
    field: "birthdate",
    type: "string",
    headerName: "Birthdate",
    flex: 4,
  },
  {
    field: "gender",
    type: "string",
    headerName: "Gender",
    flex: 2,
  },
  {
    field: "idcardNumber",
    type: "string",
    headerName: "IdCard",
    flex: 2,
  },
  {
    field: "address",
    type: "string",
    headerName: "Address",
    flex: 2,
  },
  {
    field: "joinDate",
    type: "string",
    headerName: "Join Date",
    flex: 4,
  },
  {
    field: "phoneNumber",
    type: "string",
    headerName: "Phone",
    flex: 3,
  },
  {
    field: "position",
    headerName: "Position",
    flex: 3,
    type: "string",
  },
  {
    field: "salary",
    headerName: "Salary",
    flex: 2,
    type: "number",
  },
  {
    field: "other",
    headerName: "Status",
    flex: 2,
    type: "string",
  },
];

//remove staff info data transfer later
const Staff = () => {
  const formatDate = (dateString:any) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const [open,setOpen] = useState(false)
  const { id } = useParams();
  const [staffData, setStaffData] = useState<any>({});
  const [chartData,setChartData] = useState<any>([]);

  const fetchData = async () => {
    try {
      const response = await staffApi.getID(id)
      const formattedData = {
        ...response.data,
        joinDate: formatDate(response.data.joinDate), // Format date as needed
        birthdate: formatDate(response.data.birthdate), // Format date as needed
      };
      setStaffData(formattedData);
      const chartresponse = await staffApi.getChart(id);
      setChartData(chartresponse.data);
    }
    catch(error)
    {
      alert("Failed to get Staff Infomation. Error:" + error);
      throw(error);
    }
  };
  useEffect(()=>{
    fetchData();
  }, []);
  const props = singleUser;
  const activities = [
    {
      text: `${staffData.name} sold receipt B41551 with a value of $500`,
      time: "3 days ago",
    },
    {
      text: `${staffData.name} added 3 new items to warehouse`,
      time: "1 week ago",
    },
    {
      text: `${staffData.name} damaged Sony Vaio FE14 i5 1235U worth $700`,
      time: "2 weeks ago",
    },
    {
      text: `${staffData.name} added 1 new item to warehouse`,
      time: "about 1 month ago",
    },
    {
      text: `${staffData.name} reviewed a product`,
      time: "2 months ago",
    },
  ];
  return (
    <div className="staff">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            {/*staffData.avatar && <img src={staffData.avatar} alt="" />*/}
            <h1>{staffData.name}</h1>
            <button onClick={() => setOpen(true)}>Update</button>
          </div>
          <div className="details">
            {Object.entries(staffData).filter((field)=> field[0] !== "avatar")
            .map((item) => (
              <div className="item" key={item[0]}>
                <span className="itemTitle">{item[0]}:</span>
                <span className="itemValue">{item[1]}</span>
              </div>
            ))}
          </div>
        </div>
        
      
      <div className="activities">
        <h2>Latest Activities</h2>
        {activities && (
          <ul>
            {activities.map((activity) => (
              <li key={activity.text}>
                <div>
                  <p>{activity.text}</p>
                  <time>{activity.time}</time>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {open && <UpdateStaff slug='staffs' columns={columns} setOpen={setOpen} staffData={staffData} fetchData={fetchData}/>}
    </div>
    
    {chartData && (
          <div className="chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={800}
                height={300}
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
              <XAxis dataKey="date"
                tickFormatter={(date) => {
                  const options = { month: 'numeric', day: 'numeric' };
                  return new Date(date).toLocaleDateString(undefined, options);
                }} />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              
                <Line
                type="monotone"
                dataKey="orderCount"
                yAxisId="left"
                stroke="blue"  // Set the desired color for orderCount
              />
              <Line
                type="monotone"
                dataKey="itemCount"
                yAxisId="right"
                stroke="green"  // Set the desired color for itemCount
              />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      
  )
}

export default Staff