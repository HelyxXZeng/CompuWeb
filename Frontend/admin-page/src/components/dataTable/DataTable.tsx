import { DataGrid, GridColDef, GridSortModel, GridToolbar } from "@mui/x-data-grid"
import "./dataTable.scss";
import { Link } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { useState } from "react";
import  staffApi from "../../api/staffsAPI";

type Props = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
  fetchData: () => Promise<void>;
  defaultSortField?: string; // New prop for default sorting field
  defaultSortOrder?: "asc" | "desc"; // New prop for default sorting order
};
const theme = createTheme({
  palette: {
    mode: "dark",
  },
});
const useDataTableSorting = (
  defaultSortField?: string,
  defaultSortOrder?: "asc" | "desc"
) => {
  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: defaultSortField || "",
      sort: defaultSortOrder || "asc",
    },
  ]);

  const handleSortModelChange = (newModel: GridSortModel) => {
    setSortModel(newModel);
  };

  return { sortModel, handleSortModelChange };
};

const DataTable = (props: Props) => {

  const handleDelete = async (id: number) => {
    if (props.slug === "staffs") {
      try {
        const resdata = await staffApi.getID(id);
        const data = resdata.data;
  
        if (data.other === "INACTIVE") {
          alert("Cannot delete this staff because he/she is already set as INACTIVE");
        } else {
          try {
            await staffApi.remove(id);
            props.fetchData();
            console.log(id + " has been deleted!");
          } catch (deleteError) {
            alert("An error occurred while deleting the staff: " + deleteError.message);
            throw deleteError;
          }
        }
      } catch (error) {
        alert("An error occurred while fetching staff data: " + error.message);
        console.error('Error:', error);
      }
    }
    
  };
  const { sortModel, handleSortModelChange } = useDataTableSorting(
    props.defaultSortField,
    props.defaultSortOrder
  );
  

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    width: 75,
    renderCell: (params) => {
      return (
        <div className="action">
          <Link to={`/${props.slug}/${params.row.id}`}>
            <img src="/view.svg" alt="" />
          </Link>
          <div className="delete" onClick={() => handleDelete(params.row.id)}>
            <img src="/delete.svg" alt="" />
          </div>
        </div>
      );
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="dataTable">
        <DataGrid
          className="dataGrid"
          rows={props.rows}
          columns={[...props.columns, actionColumn]}
          sortModel={sortModel}
          onSortModelChange={handleSortModelChange}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          disableColumnFilter
          disableDensitySelector
          disableColumnSelector
        />
      </div>
    </ThemeProvider>
  )
}

export default DataTable