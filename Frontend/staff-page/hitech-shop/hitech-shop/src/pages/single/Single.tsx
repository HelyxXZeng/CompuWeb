
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import brandApi from "../../api/brandApi";
import categoryApi from "../../api/categoryApi";
import customerApi from "../../api/customerApi";
import orderApi from "../../api/orderApi";
import priceApi from "../../api/priceApi";
import productApi from "../../api/productApi";
import productInstanceApi from "../../api/productInstanceApi";
import productLineApi from "../../api/productLineApi";
import productVariantApi from "../../api/productVariantApi";
import promotionApi from "../../api/promotionApi";
import specificationApi from "../../api/specificationApi";
import specificationTypeApi from "../../api/specificationTypeApi";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import BrandSingle from "../../components/singles/brandSingle/BrandSingle";
import CategorySingle from "../../components/singles/categorySingle/CategorySingle";
import CustomerSingle from "../../components/singles/customerSingle/CustomerSingle";
import PriceSingle from "../../components/singles/priceSingle/PriceSingle";
import ProductInstanceSingle from "../../components/singles/productInstanceSingle/ProductInstaceSingle";
import ProductLineSingle from "../../components/singles/productLineSingle/ProductLineSingle";
import ProductVariantSingle from "../../components/singles/productVariantSingle/ProductVariantSingle";
import SpecificationSingle from "../../components/singles/specificationSingle/SpecificationSingle";
import SpecificationTypeSingle from "../../components/singles/specificationTypeSingle/SpecificationTypeSingle";
import "./single.scss";

interface Props {
    type: string,
    isNew: string
}

const Single = ({ type, isNew }: Props) => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    // console.log("This is id from url:", id);

    const [editRow, setEditRow] = useState(null);
    const [isDoneFetch, setIsDoneFetch] = useState(false)
    useEffect(() => {
        setIsDoneFetch(false)
        const fetchData = async () => {
            let data: any;
            switch (type) {
                case 'brand':
                    data = (await brandApi.get(parseInt(id!))).data;
                    break;
                case 'customer':
                    data = (await customerApi.get(parseInt(id!))).data;
                    break;
                case 'product':
                    data = (await productApi.get(parseInt(id!))).data;
                    break;
                case 'category':
                    data = (await categoryApi.get(parseInt(id!))).data;
                    break;
                case 'order':
                    data = (await orderApi.get(parseInt(id!))).data;
                    break;
                case 'promotion':
                    data = (await promotionApi.get(parseInt(id!))).data;
                    break;
                case 'productLine':
                    data = (await productLineApi.get(parseInt(id!))).data;
                    break;
                case 'productVariant':
                    data = (await productVariantApi.get(parseInt(id!))).data;
                    break;
                case 'productInstance':
                    data = (await productInstanceApi.get(parseInt(id!))).data;
                    break;
                case 'specificationType':
                    data = (await specificationTypeApi.get(parseInt(id!))).data;
                    break;
                case 'specification':
                    data = (await specificationApi.get(parseInt(id!))).data;
                    break;
                case 'price':
                    data = (await priceApi.get(parseInt(id!))).data;
                    break;
                case 'price':
                    data = (await orderApi.get(parseInt(id!))).data;
                    break;
                default:
                    break;
                // Handle the default case
            }


            setEditRow(data)
            console.log("This is data: ", data)
            setIsDoneFetch(true)
        }
        if (isNew === 'update') {
            fetchData();
        } else {
            setIsDoneFetch(true)
        }
    }, [type, id, isNew])

    const getElement = () => {
        switch (type) {
            case 'category':
                return <CategorySingle category={editRow!} />;
            // case 'product':
            //     return <ProductTable rows={editRow!} />;
            case 'customer':
                return <CustomerSingle customer={editRow!} />
            case 'order':
            // return <OrderTable rows={rows} />;
            case 'brand':
                return <BrandSingle brand={editRow!} />
            case 'productLine':
                return <ProductLineSingle productLine={editRow!} />
            case 'productVariant':
                return <ProductVariantSingle productVariant={editRow!} />
            case 'productInstance':
                return <ProductInstanceSingle productInstance={editRow!} />
            case 'specificationType':
                return <SpecificationTypeSingle specificationType={editRow!} />
            case 'specification':
                return <SpecificationSingle specification={editRow!} />
            case 'price':
                return <PriceSingle price={editRow!} />
            default:
                return null;
        }
    }

    return (
        <div className="single">
            <Sidebar />
            <div className="singleContainer">
                <Navbar />
                {
                    isDoneFetch ? getElement() : <p>Loading...</p>
                }
            </div>
        </div>
    )
}

export default Single
