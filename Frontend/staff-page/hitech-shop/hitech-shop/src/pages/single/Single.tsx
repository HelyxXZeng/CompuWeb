
import { useLocation, useParams } from "react-router-dom";
import brandApi from "../../api/brandApi";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import BrandSingle from "../../components/singles/brandSingle/BrandSingle";
import "./single.scss"
import { useEffect, useState } from "react"
import customerApi from "../../api/customerApi";
import productApi from "../../api/productApi";
import categoryApi from "../../api/categoryApi";
import orderApi from "../../api/orderApi";
import promotionApi from "../../api/promotionApi";
import CategorySingle from "../../components/singles/categorySingle/CategorySingle";
import PromotionSingle from "../../components/singles/promotionSingle/PromotionSingle";
import CustomerSingle from "../../components/singles/customerSingle/CustomerSingle";
import productLineApi from "../../api/productLineApi";
import ProductLineSingle from "../../components/singles/productLineSingle/ProductLineSingle";
import productVariantApi from "../../api/productVariantApi";
import ProductVariantSingle from "../../components/singles/productVariantSingle/ProductVariantSingle";
import productInstanceApi from "../../api/productInstanceApi";
import ProductInstanceSingle from "../../components/singles/productInstanceSingle/ProductInstaceSingle";

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
                default:
                    break;
                // Handle the default case
            }


            setEditRow(data)
            // console.log("This is data: ", data)
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
            case 'product':
            // return <ProductTable rows={rows} />;
            case 'customer':
                return <CustomerSingle customer={editRow!} />
            case 'order':
            // return <OrderTable rows={rows} />;
            case 'brand':
                return <BrandSingle brand={editRow!} />
            case 'promotion':
                return <PromotionSingle promotion={editRow!} />
            case 'productLine':
                return <ProductLineSingle productLine={editRow!} />
            case 'productVariant':
                return <ProductVariantSingle productVariant={editRow!} />
            case 'productInstance':
                return <ProductInstanceSingle productInstance={editRow!} />
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
