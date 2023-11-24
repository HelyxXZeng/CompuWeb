import { useEffect, useRef, useState } from "react"
import brandApi from "../../api/brandApi"
import categoryApi from "../../api/categoryApi"
import customerApi from "../../api/customerApi"
import orderApi from "../../api/orderApi"
import productApi from "../../api/productApi"
import productInstanceApi from "../../api/productInstanceApi"
import productLineApi from "../../api/productLineApi"
import productVariantApi from "../../api/productVariantApi"
import promotionApi from "../../api/promotionApi"
import specificationApi from "../../api/specificationApi"
import specificationTypeApi from "../../api/specificationTypeApi"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import BrandTable from "../../components/tables/brandTable/BrandTable"
import CategoryTable from "../../components/tables/categoryTable/CategoryTable"
import CustomerTable from "../../components/tables/customerTable/CustomerTable"
import OrderTable from "../../components/tables/orderTable/OrderTable"
import ProductInstanceTable from "../../components/tables/productInstanceTable/ProductInstanceTable"
import ProductLineTable from "../../components/tables/productLineTable/ProductLineTable"
import ProductTable from "../../components/tables/productTable/ProductTable"
import ProductVariantTable from "../../components/tables/productVariantTable/ProductVariantTable"
import PromotionTable from "../../components/tables/promotionTable/PromotionTable"
import SpecificationTable from "../../components/tables/specificationTable/SpecificationTable"
import SpecificationTypeTable from "../../components/tables/specificationTypeTable/SpecificationTypeTable"
import "./list.scss"
import priceApi from "../../api/priceApi"
import PriceTable from "../../components/tables/priceTable/PriceTable"



const List = ({ type }: { type: string }) => {
    const [rows, setRows] = useState<any[]>([]);
    const [doneFetch, setDoneFetch] = useState(false)
    const typeRef = useRef(type); // Create a ref for the type

    useEffect(() => {
        setRows([])
        typeRef.current = type; // Update the ref with the new type at the start of the effect
        setDoneFetch(false)
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
                    case 'productLine':
                        data = (await productLineApi.getAll({ _page: 1, _limit: 100000 })).data;
                        break;
                    case 'productVariant':
                        data = (await productVariantApi.getAll({ _page: 1, _limit: 100000 })).data;
                        break;
                    case 'productInstance':
                        data = (await productInstanceApi.getAll({ _page: 1, _limit: 100000 })).data;
                        break;
                    case 'specificationType':
                        data = (await specificationTypeApi.getAll({ _page: 1, _limit: 100000 })).data;
                        break;
                    case 'specification':
                        data = (await specificationApi.getAll({ _page: 1, _limit: 100000 })).data;
                        break;
                    case 'price':
                        data = (await priceApi.getAll({ _page: 1, _limit: 100000 })).data;
                        break;
                    default:
                        break;
                }

                // Only update state if the type hasn't changed during the fetch operation
                if (typeRef.current === type) {
                    await setRows(data);
                    let timer = new Promise((resolve) => setTimeout(resolve, 300));
                    let checkRows = new Promise<void>((resolve) => {
                        let interval = setInterval(() => {
                            if (rows.length > 1) {
                                clearInterval(interval);
                                resolve();
                            }
                        }, 1000); // Check every 100ms
                    });
                    await Promise.race([timer, checkRows]);
                    console.log(`This is ${type}:`, rows);
                    setDoneFetch(true);
                }
            } catch (error) {
                console.log(`Failed to fetch ${type} list:`, error);
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
            case 'productLine':
                return <ProductLineTable rows={rows} />;
            case 'productVariant':
                return <ProductVariantTable rows={rows} />;
            case 'productInstance':
                return <ProductInstanceTable rows={rows} />;
            case 'specificationType':
                return <SpecificationTypeTable rows={rows} />;
            case 'specification':
                return <SpecificationTable rows={rows} />;
            case 'price':
                return <PriceTable rows={rows} />;
            default:
                return null;
        }
    }

    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                {doneFetch ? getElement() : <div className="loader"></div>
                }

            </div>
        </div>
    )
}

export default List

