import './datatable.scss';

import './datatable.scss';

const CellAction = () => {
    return (
        <div className="cellAction">
            <div className="viewButton">View</div>
            <div className="deleteButton">Delete</div>
        </div>
    );
};

const actionColumn = () => {
    return [
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: () => {
                return <CellAction />;
            },
        },
    ];
};

export default actionColumn;
