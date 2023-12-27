import { DataGrid, GridColDef, GridSortModel, GridToolbar } from "@mui/x-data-grid"
import "./dataTable.scss";
import { Link } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { useState } from "react";

type Props = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
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

  const handleDelete = (id: number) => {
    //delete the item
    // axios.deleta('api/${sluf}/id')
    console.log(id + " has been deleted!")
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
          sortingMode="server"
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