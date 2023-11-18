import { useState } from 'react';
import DataTable from '../../components/dataTable/DataTable'
import { userRows } from '../../data';
import './users.scss'
import {GridColDef} from "@mui/x-data-grid"
import AddStaff from '../../components/addStaff/AddStaff';

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
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

const users = () => {
  const [open,setOpen] = useState(false)
  return (
    <div className='users'>
      <div className="info">
        <h1>Users</h1>
        <button onClick={() => setOpen(true)}>Add New User</button>
      </div>
      <DataTable columns={columns} rows={userRows} slug='users'/>
      {open && <AddStaff slug='users' columns={columns} setOpen={setOpen}/>}
    </div>
  )
}

export default users