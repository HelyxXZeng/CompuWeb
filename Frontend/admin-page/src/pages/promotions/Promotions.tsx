import AddPromotion from '../../components/addPromotion/AddPromotion';
import DataTable from '../../components/dataTable/DataTable';
import './promotions.scss';
import { useState } from 'react';

const Promotions = () => {
  const [open,setOpen] = useState(false)
  return (
    <div className='promotions'>
      <div className="info">
        <h1>Promotions</h1>
        <button onClick={() => setOpen(true)}>Add New Promotion</button>
      </div>
      {/* <DataTable/> */}
      {/* {open && <AddPromotion slug="promotion" columns={columns} setOpen={setOpen}/>} */}
    </div>
  )
}

export default Promotions
