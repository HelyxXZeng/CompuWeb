import { useEffect, useState } from 'react';
import DataTable from '../../components/dataTable/DataTable'
import './staffs.scss'
import {GridColDef} from "@mui/x-data-grid"
import AddStaff from '../../components/addStaff/AddStaff';
import staffApi, { StaffDef } from '../../api/staffsAPI';

type GridColDefWithDisplay = GridColDef & { displayInForm: boolean };

const columns: GridColDefWithDisplay[] = [
  { field: "id", headerName: "ID", flex: 1, displayInForm: false, },
  {
    field: "avatar",
    headerName: "Avatar",
    flex: 2,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
    displayInForm: false, 
  },
  {
    field: "name",
    type: "string",
    headerName: "Name",
    flex: 5,
    displayInForm: true,
  },
  {
    field: "birthdate",
    type: "string",
    headerName: "Birthdate",
    flex: 4,
    displayInForm: true,
  },
  {
    field: "gender",
    type: "string",
    headerName: "Gender",
    flex: 2,
    displayInForm: true,
  },
  {
    field: "idcardNumber",
    type: "string",
    headerName: "IdCard",
    flex: 2,
    displayInForm: true,
  },
  {
    field: "address",
    type: "string",
    headerName: "Address",
    flex: 2,
    displayInForm: true,
  },
  {
    field: "joinDate",
    type: "string",
    headerName: "Join Date",
    flex: 4,
    displayInForm: true,
  },
  {
    field: "phoneNumber",
    type: "string",
    headerName: "Phone",
    flex: 3,
    displayInForm: true,
  },
  {
    field: "position",
    headerName: "Position",
    flex: 3,
    type: "string",
    displayInForm: true,
  },
  {
    field: "salary",
    headerName: "Salary",
    flex: 2,
    type: "number",
    displayInForm: true
  },
  {
    field: "other",
    headerName: "Status",
    flex: 2,
    type: "string",
    displayInForm: false,
  },
];

const staffs = () => {
  const [open,setOpen] = useState(false)

  const dataTableColumns = columns.filter(
    (column) => ( column.field !== "birthdate" && column.field !== "idcardNumber" &&
                    column.field != "address" && column.field !== "salary"));

  const addStaffColumns = columns.filter(
    (column) => column.displayInForm 
  )
  
  const [staffsData, setStaffsData] = useState([]);

  const formatDate = (dateString:any) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderAvatar = (base64String:any) => {
    return <img src={ `${base64String}`} alt="Avatar" />;
  };

  const dataTableColumnss = dataTableColumns.map((column) => {
    if (column.field === "avatar") {
      return {
        ...column,
        renderCell: (params:any) => renderAvatar(params.row.avatar),
      };
    }
    return column;
  });
  const [isNeedFetch, setIsNeedFetch] =useState(true)
  const fetchData = async () => {
      
    try {
      const response = await staffApi.getAll({ _page: 1, _limit: 100000 });
      const formattedData = response.data.map((staff: StaffDef) => ({
        ...staff,
        joinDate: formatDate(staff.joinDate),
      }));
      setStaffsData(formattedData);
    } catch (error) {
      console.error('Error fetching staffs data:', error);
    }
    
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className='staffs'>
      <div className="info">
        <h1>Staffs</h1>
        <button onClick={() => setOpen(true)}>Add New Staff</button>
      </div>
      <DataTable columns={dataTableColumnss} rows={staffsData} slug='staffs' defaultSortField='other' defaultSortOrder='asc' fetchData={fetchData}/>
      {open && <AddStaff slug='staffs' columns={addStaffColumns} setOpen={setOpen} fetchData={fetchData} />}
    </div>
  )
}

export default staffs