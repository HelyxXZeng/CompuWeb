import { useState } from 'react';
import DataTable from '../../components/dataTable/DataTable'
import { userRows } from '../../data';
import './staffs.scss'
import {GridColDef} from "@mui/x-data-grid"
import AddStaff from '../../components/addStaff/AddStaff';

type GridColDefWithDisplay = GridColDef & { displayInForm: boolean };

const columns: GridColDefWithDisplay[] = [
  { field: "Id", headerName: "ID", width: 75, displayInForm: false, },
  {
    field: "Img",
    headerName: "Avatar",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
    displayInForm: false, 
  },
  {
    field: "Name",
    type: "string",
    headerName: "Name",
    width: 250,
    displayInForm: true,
  },
  {
    field: "Birthday",
    type: "string",
    headerName: "Birthday",
    width: 250,
    displayInForm: true,
  },
  {
    field: "Gender",
    type: "string",
    headerName: "Gender",
    width: 100,
    displayInForm: true,
  },
  {
    field: "IdCardNumber",
    type: "string",
    headerName: "IdCard",
    width: 100,
    displayInForm: true,
  },
  {
    field: "JoinDate",
    type: "string",
    headerName: "Join Date",
    width: 200,
    displayInForm: true,
  },
  {
    field: "PhoneNumber",
    type: "string",
    headerName: "Phone",
    width: 150,
    displayInForm: true,
  },
  {
    field: "Posistion",
    headerName: "Posistion",
    width: 150,
    type: "string",
    displayInForm: true,
  },
  {
    field: "Status",
    headerName: "Status",
    width: 100,
    type: "string",
    displayInForm: false,
  },
];

const staffs = () => {
  const [open,setOpen] = useState(false)

  const dataTableColumns = columns.filter(
    (column) => ( column.field !== "Birthday" && column.field !== "IdCardNumber" )
  );

  const addStaffColumns = columns.filter(
    (column) => column.displayInForm 
  )

  return (
    <div className='staffs'>
      <div className="info">
        <h1>Users</h1>
        <button onClick={() => setOpen(true)}>Add New Staff</button>
      </div>
      <DataTable columns={dataTableColumns} rows={userRows} slug='staffs'/>
      {open && <AddStaff slug='staffs' columns={addStaffColumns} setOpen={setOpen}/>}
    </div>
  )
}

export default staffs