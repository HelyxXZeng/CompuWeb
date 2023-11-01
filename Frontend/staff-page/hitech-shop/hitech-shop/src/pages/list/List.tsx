
import CategoryTable from "../../components/categoryTable/CategoryTable"
import Navbar from "../../components/navbar/Navbar"
import ProductTable from "../../components/productTable/ProductTable"
import Sidebar from "../../components/sidebar/Sidebar"
import "./list.scss"


const List = ({ type }: { type: string }) => {

    const getElement = () => {
        switch (type) {
            case 'category':
                return <CategoryTable />;
            case 'product':
                return <ProductTable />;
            case 'user':
                return <ProductTable />;
            default:
                return null;
        }
    }

    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                {
                    getElement()
                }

            </div>
        </div>
    )
}

export default List