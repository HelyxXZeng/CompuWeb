import "./staff.scss"
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";
import UpdateStaff from "../../components/updateStaff/UpdateStaff";
import { GridColDef } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import staffApi, { StaffDef } from "../../api/staffsAPI";

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

  const fetchData = async () => {
    try {
      const response = await staffApi.getID(id)
      const formattedData = {
        ...response.data,
        joinDate: formatDate(response.data.joinDate), // Format date as needed
        birthdate: formatDate(response.data.birthdate), // Format date as needed
      };
      setStaffData(formattedData);
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

  return (
    <div className="staff">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            {staffData.avatar && <img src={staffData.avatar} alt="" />}
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
        {/* {props.chart && (
          <div className="chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                //data={props.chart.data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {props.chart.dataKeys.map((dataKey) => (
                  <Line
                    type="monotone"
                    dataKey={dataKey.name}
                    stroke={dataKey.color}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )} */}
      </div>
      <div className="activities">
        <h2>Latest Activities</h2>
        {/* {props.activities && (
          <ul>
            {props.activities.map((activity) => (
              <li key={activity.text}>
                <div>
                  <p>{activity.text}</p>
                  <time>{activity.time}</time>
                </div>
              </li>
            ))}
          </ul>
        )} */}
      </div>
      {open && <UpdateStaff slug='staffs' columns={columns} setOpen={setOpen} staffData={staffData} fetchData={fetchData}/>}
    </div>
  )
}

export default Staff