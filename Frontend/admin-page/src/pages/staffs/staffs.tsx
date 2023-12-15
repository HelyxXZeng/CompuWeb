import { useState } from 'react';
import DataTable from '../../components/dataTable/DataTable'
import { userRows } from '../../data';
import './staffs.scss'
import {GridColDef} from "@mui/x-data-grid"
import AddStaff from '../../components/addStaff/AddStaff';

type GridColDefWithDisplay = GridColDef & { displayInForm: boolean };

const columns: GridColDefWithDisplay[] = [
  { field: "Id", headerName: "ID", flex: 1, displayInForm: false, },
  {
    field: "Img",
    headerName: "Avatar",
    flex: 2,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
    displayInForm: false, 
  },
  {
    field: "Name",
    type: "string",
    headerName: "Name",
    flex: 5,
    displayInForm: true,
  },
  {
    field: "Birthdate",
    type: "string",
    headerName: "Birthdate",
    flex: 4,
    displayInForm: true,
  },
  {
    field: "Gender",
    type: "string",
    headerName: "Gender",
    flex: 2,
    displayInForm: true,
  },
  {
    field: "IdCardNumber",
    type: "string",
    headerName: "IdCard",
    flex: 2,
    displayInForm: true,
  },
  {
    field: "Address",
    type: "string",
    headerName: "Address",
    flex: 2,
    displayInForm: true,
  },
  {
    field: "JoinDate",
    type: "string",
    headerName: "Join Date",
    flex: 4,
    displayInForm: true,
  },
  {
    field: "PhoneNumber",
    type: "string",
    headerName: "Phone",
    flex: 3,
    displayInForm: true,
  },
  {
    field: "Posistion",
    headerName: "Posistion",
    flex: 3,
    type: "string",
    displayInForm: true,
  },
  {
    field: "Status",
    headerName: "Status",
    flex: 2,
    type: "string",
    displayInForm: false,
  },
];

const staffs = () => {
  const [open,setOpen] = useState(false)

  const dataTableColumns = columns.filter(
    (column) => ( column.field !== "Birthdate" && column.field !== "IdCardNumber" &&
                    column.field != "Address")
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