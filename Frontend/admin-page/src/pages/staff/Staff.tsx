import { singleUser } from "../../data"
import "./staff.scss"
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useState } from "react";
import UpdateStaff from "../../components/updateStaff/UpdateStaff";
import { GridColDef } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import { StaffDef } from "../../api/staffsAPI";

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
    field: "Name",
    type: "string",
    headerName: "Name",
    flex: 5,
  },
  {
    field: "Birthdate",
    type: "string",
    headerName: "Birthdate",
    flex: 4,
  },
  {
    field: "Gender",
    type: "string",
    headerName: "Gender",
    flex: 2,
  },
  {
    field: "IdCardNumber",
    type: "string",
    headerName: "IdCard",
    flex: 2,
  },
  {
    field: "Address",
    type: "string",
    headerName: "Address",
    flex: 2,
  },
  {
    field: "JoinDate",
    type: "string",
    headerName: "Join Date",
    flex: 4,
  },
  {
    field: "PhoneNumber",
    type: "string",
    headerName: "Phone",
    flex: 3,
  },
  {
    field: "Position",
    headerName: "Position",
    flex: 3,
    type: "string",
  },
  {
    field: "Other",
    headerName: "Status",
    flex: 2,
    type: "string",
  },
];

//remove staff info data transfer later
const Staff = () => {
  const [open,setOpen] = useState(false)
  const { id } = useParams();
  var props = singleUser;
  console.log(id);
  return (
    <div className="staff">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            {props.img && <img src={props.img} alt="" />}
            <h1>{props.title}</h1>
            <button onClick={() => setOpen(true)}>Update</button>
          </div>
          <div className="details">
            {Object.entries(props.info).map((item) => (
              <div className="item" key={item[0]}>
                <span className="itemTitle">{item[0]}:</span>
                <span className="itemValue">{item[1]}</span>
              </div>
            ))}
          </div>
        </div>
        {props.chart && (
          <div className="chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={props.chart.data}
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
        )}
      </div>
      <div className="activities">
        <h2>Latest Activities</h2>
        {props.activities && (
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
        )}
      </div>
      {open && <UpdateStaff slug='staffs' columns={columns} setOpen={setOpen} staffData={props.info} />}
    </div>
  )
}

export default Staff