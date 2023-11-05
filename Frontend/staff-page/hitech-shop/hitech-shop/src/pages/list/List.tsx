import CategoryTable from "../../components/categoryTable/CategoryTable"
import Navbar from "../../components/navbar/Navbar"
import ProductTable from "../../components/productTable/ProductTable"
import Sidebar from "../../components/sidebar/Sidebar"
import "./list.scss"
import { useEffect, useState } from "react"
import productApi from "../../api/productApi"
import categoryApi from "../../api/categoryApi"
import CustomerTable from "../../components/customerTable/CustomerTable"
import customerApi from "../../api/customerApi"
import orderApi from "../../api/orderApi"
import OrderTable from "../../components/orderTable/OrderTable"
import brandApi from "../../api/brandApi"
import BrandTable from "../../components/brandTable/BrandTable"
import PromotionTable from "../../components/promotionTable/PromotionTable"
import promotionApi from "../../api/promotionApi"


const List = ({ type }: { type: string }) => {
    const [rows, setRows] = useState<any[]>([]);
    console.log('This is the very beginning', rows)

    useEffect(() => {
        const fetchData = async () => {
            try {
                let data: any[] = [];
                switch (type) {
                    case 'customer':
                        data = (await customerApi.getAll({ _page: 1, _limit: 100000 })).data;
                        break;
                    case 'category':
                        data = (await categoryApi.getAll({ _page: 1, _limit: 100000 })).data;
                        break;
                    case 'product':
                        data = (await productApi.getAll({ _page: 1, _limit: 100000 })).data;
                        break;
                    case 'order':
                        data = (await orderApi.getAll({ _page: 1, _limit: 100000 })).data;
                        break;
                    case 'brand':
                        data = (await brandApi.getAll({ _page: 1, _limit: 100000 })).data;
                        break;
                    case 'promotion':
                        data = (await promotionApi.getAll({ _page: 1, _limit: 100000 })).data;
                        break;
                    default:
                        break;
                }

                setRows(data);
                // console.log(`This is ${type}:`, data);
            } catch (error) {
                // console.log(`Failed to fetch ${type} list:`, error);
            }
        };

        fetchData();
    }, [type]);

    const getElement = () => {
        switch (type) {
            case 'category':
                return <CategoryTable rows={rows} />;
            case 'product':
                return <ProductTable rows={rows} />;
            case 'customer':
                return <CustomerTable rows={rows} />;
            case 'order':
                return <OrderTable rows={rows} />;
            case 'brand':
                return <BrandTable rows={rows} />;
            case 'promotion':
                return <PromotionTable rows={rows} />;
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