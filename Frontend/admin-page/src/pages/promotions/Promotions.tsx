import { GridColDef } from '@mui/x-data-grid';
import AddPromotion from '../../components/addPromotion/AddPromotion';
import DataTable from '../../components/dataTable/DataTable';
import './promotions.scss';
import { useEffect, useState } from 'react';
import { promotionExamples } from '../../data';
import promotionAPI, { PromotionDef } from '../../api/promotionAPI';



const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 7, },
  {
    field: "name",
    type: "string",
    headerName: "Name",
    flex: 5,
  },
  {
    field: "startDate",
    type: "string",
    headerName: "Start Date",
    flex: 4,
  },
  {
    field: "endDate",
    type: "string",
    headerName: "End Date",
    flex: 4,
  },
  {
    field: "productVariantNamePurchase",
    type: "string",
    headerName: "Product Variant Purchase",
    flex: 5,
  },
  {
    field: "productVariantNamePromotion",
    type: "string",
    headerName: "Product Variant Promotion",
    flex: 5,
  },
  {
    field: "value",
    headerName: "Value",
    flex: 3,
    type: "number",
  },
  {
    field: "status",
    headerName: "Status",
    flex: 2,
    type: "string",
  },
  {
    field: "content",
    type: "string",
    headerName: "Content",
    flex: 3,
  },
];

const Promotions = () => {
  const [open,setOpen] = useState(false)
  const [promotionsData,setPromotionsData] = useState([]);
  const dataTableColumns = columns.filter(
    (column) => ( column.field !== "content" && column.field !== "id" )
  );

  const addPromotionColumns = columns.filter(
    (column) => ( column.field != "id" )
  )
  const formatDate = (dateString:any) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  useEffect(() =>{
    const fetchData = async () => {
      try {
        const response = await promotionAPI.getAll({ _page: 1, _limit: 100000 });
        const formattedData = response.data.map((promotion:PromotionDef) => ({
          ...promotion,
          startDate: formatDate(promotion.startDate),
          endDate:formatDate(promotion.endDate)
        }));
        if(formattedData.length!==0)setPromotionsData(formattedData);
      } catch (error) {
        console.error('Error fetching staffs data:', error);
      }
    };
    fetchData();
  },[promotionsData]);
  return (
    <div className='promotions'>
      <div className="info">
        <h1>Promotions</h1>
        <button onClick={() => setOpen(true)}>Add New Promotion</button>
      </div>
      <DataTable columns={dataTableColumns} rows={promotionsData} slug='promotions' defaultSortField='status' defaultSortOrder='asc' /> 
      {open && <AddPromotion slug="promotions" columns={addPromotionColumns} setOpen={setOpen}/>}
    </div>
  )
}

export default Promotions
