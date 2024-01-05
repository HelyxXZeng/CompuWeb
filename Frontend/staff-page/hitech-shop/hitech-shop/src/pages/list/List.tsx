import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import BrandTable from "../../components/tables/brandTable/BrandTable"
import CategoryTable from "../../components/tables/categoryTable/CategoryTable"
import CustomerTable from "../../components/tables/customerTable/CustomerTable"
import OrderTable from "../../components/tables/orderTable/OrderTable"
import PriceTable from "../../components/tables/priceTable/PriceTable"
import ProductInstanceTable from "../../components/tables/productInstanceTable/ProductInstanceTable"
import ProductLineTable from "../../components/tables/productLineTable/ProductLineTable"
import ProductTable from "../../components/tables/productTable/ProductTable"
import ProductVariantTable from "../../components/tables/productVariantTable/ProductVariantTable"
import RatingTable from "../../components/tables/ratingTable/RatingTable"
import ReturnTable from "../../components/tables/returnTable/ReturnTable"
import SpecificationTable from "../../components/tables/specificationTable/SpecificationTable"
import SpecificationTypeTable from "../../components/tables/specificationTypeTable/SpecificationTypeTable"
import "./list.scss"



const List = ({ type }: { type: string }) => {
    const getElement = () => {
        switch (type) {
            case 'category':
                return <CategoryTable />;
            case 'product':
                return <ProductTable />;
            case 'customer':
                return <CustomerTable />;
            case 'order':
                return <OrderTable />;
            case 'brand':
                return <BrandTable />;
            case 'productLine':
                return <ProductLineTable />;
            case 'productVariant':
                return <ProductVariantTable />;
            case 'productInstance':
                return <ProductInstanceTable />;
            case 'specificationType':
                return <SpecificationTypeTable />;
            case 'specification':
                return <SpecificationTable />;
            case 'price':
                return <PriceTable />;
            case 'rating':
                return <RatingTable />;
            case 'return':
                return <ReturnTable />;
            default:
                return null;
        }
    }

    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                {getElement()}
            </div>
        </div>
    )
}

export default List

