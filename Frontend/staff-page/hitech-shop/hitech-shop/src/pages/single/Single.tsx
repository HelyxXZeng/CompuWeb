
import { useParams } from "react-router-dom";
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

interface Props {
    type: string,
    isNew: string
}

const Single = ({ type, isNew }: Props) => {
    const params = useParams();
    const id = params[type + 'Id']; // Get the id from the URL

    const [editRow, setEditRow] = useState({
        Id: 0,
        Name: '',
        Description: '',
        LogoBase64: ''
    });
    const [isDoneFetch, setIsDoneFetch] = useState(false)
    useEffect(() => {
        setIsDoneFetch(false)
        const fetchData = async () => {
            let data: any;
            if (type === 'brand') {
                data = (await brandApi.get(parseInt(id!))).data;
            }
            else if (type === 'customer') {
                data = (await customerApi.get(parseInt(id!))).data;
            } else if (type === 'product') {
                data = (await productApi.get(parseInt(id!))).data;
            } else if (type === 'category') {
                data = (await categoryApi.get(parseInt(id!))).data;
            } else if (type === 'order') {
                data = (await orderApi.get(parseInt(id!))).data;
            } else if (type === 'promotion') {
                data = (await promotionApi.get(parseInt(id!))).data;
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
            // return <CategoryTable rows={rows} />;
            case 'product':
            // return <ProductTable rows={rows} />;
            case 'customer':
            // return <CustomerTable rows={rows} />;
            case 'order':
            // return <OrderTable rows={rows} />;
            case 'brand':
                return <BrandSingle brand={editRow} />
            case 'promotion':
            // return <PromotionTable rows={rows} />;
            default:
                return null;
        }
    }

    return (
        <div className="single">
            <Sidebar />
            <div className="singleContainer">
                <Navbar />
                {/* {
                    getElement()
                } */}
                {
                    isDoneFetch ? getElement() : <p>Loading...</p>
                }
            </div>
        </div>
    )
}

export default Single