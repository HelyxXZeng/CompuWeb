import './datatable.scss';

import './datatable.scss';

// Define an interface for the props of CellAction
interface CellActionProps {
    handleDelete: (rowId: number) => void;
    handleView: (rowId: number) => void;
    row: any; // You should replace 'any' with the actual type of your row data
}

const CellAction = ({ handleDelete, handleView, row }: CellActionProps) => {
    return (
        <div className="cellAction">
            <div className="viewButton" onClick={() => handleView(row.id)}>View</div>
            <div className="deleteButton" onClick={() => handleDelete(row.id)}>Delete</div>
        </div>
    );
};



const actionColumn = (handleDelete: (rowId: number) => void, handleView: (rowId: number) => void) => {
    return [
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params: any) => {
                return (
                    <CellAction
                        handleDelete={handleDelete}
                        handleView={handleView}
                        row={params.row}
                    />
                );
            },
        },
    ];
};



export default actionColumn;
