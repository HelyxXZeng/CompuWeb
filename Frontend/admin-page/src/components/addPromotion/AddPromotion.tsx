import { GridColDef } from "@mui/x-data-grid";
import "./addPromotion.scss"

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddPromotion = (props: Props) => {
  return (
    <div>AddPromotion</div>
  )
}

export default AddPromotion