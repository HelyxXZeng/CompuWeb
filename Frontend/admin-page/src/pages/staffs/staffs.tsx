import { useState } from 'react';
import DataTable from '../../components/dataTable/DataTable'
import { userRows } from '../../data';
import './staffs.scss'
import {GridColDef} from "@mui/x-data-grid"
import AddStaff from '../../components/addStaff/AddStaff';

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90, },
  {
    field: "img",
    headerName: "Avatar",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "firstName",
    type: "string",
    headerName: "First name",
    width: 150,
  },
  {
    field: "lastName",
    type: "string",
    headerName: "Last name",
    width: 150,
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 200,
  },
  {
    field: "phone",
    type: "string",
    headerName: "Phone",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    type: "string",
  },
  {
    field: "salary",
    headerName: "Salary",
    width: 150,
    type: "string",
  },
];

const staffs = () => {
  const [open,setOpen] = useState(false)
  return (
    <div className='staffs'>
      <div className="info">
        <h1>Users</h1>
        <button onClick={() => setOpen(true)}>Add New Staff</button>
      </div>
      <DataTable columns={columns} rows={userRows} slug='staffs'/>
      {open && <AddStaff slug='staffs' columns={columns} setOpen={setOpen}/>}
    </div>
  )
}

export default staffs