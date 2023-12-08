import { GridColDef } from '@mui/x-data-grid';
import AddPromotion from '../../components/addPromotion/AddPromotion';
import DataTable from '../../components/dataTable/DataTable';
import './promotions.scss';
import { useState } from 'react';
import { products } from '../../data';



const columns: GridColDef[] = [
  { field: "Id", headerName: "ID", width: 7, },
  {
    field: "Name",
    type: "string",
    headerName: "Name",
    flex: 5,
  },
  {
    field: "StartDate",
    type: "string",
    headerName: "Start Date",
    flex: 4,
  },
  {
    field: "EndDate",
    type: "string",
    headerName: "End Date",
    flex: 4,
  },
  {
    field: "Purchase",
    type: "string",
    headerName: "Product Variant Purchase",
    flex: 5,
  },
  {
    field: "Promotion",
    type: "string",
    headerName: "Product Variant Promotion",
    flex: 5,
  },
  {
    field: "Value",
    headerName: "Value",
    flex: 3,
    type: "string",
  },
  {
    field: "Content",
    type: "string",
    headerName: "Content",
    flex: 3,
  },
  {
    field: "Status",
    headerName: "Status",
    flex: 2,
    type: "string",
  },
];

const Promotions = () => {
  const [open,setOpen] = useState(false)
  
  const dataTableColumns = columns.filter(
    (column) => ( column.field !== "Content" && column.field !== "Id" )
  );

  const addPromotionColumns = columns.filter(
    (column) => ( column.field != "Id" && column.field !== "Status" )
  )

  
  return (
    <div className='promotions'>
      <div className="info">
        <h1>Promotions</h1>
        <button onClick={() => setOpen(true)}>Add New Promotion</button>
      </div>
      <DataTable columns={dataTableColumns} rows={products} slug='promotions'/> 
      {open && <AddPromotion slug="promotions" columns={addPromotionColumns} setOpen={setOpen}/>}
    </div>
  )
}

export default Promotions
