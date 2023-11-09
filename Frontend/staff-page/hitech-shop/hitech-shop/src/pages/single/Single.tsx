
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import BrandSingle from "../../components/singles/brandSingle/BrandSingle";
import "./single.scss"
import { useEffect, useState } from "react"

const Single = ({ type }: { type: string }) => {
    const [rows, setRows] = useState<any[]>([]);
    // console.log('This is the very beginning', rows)

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             let data: any[] = [];
    //             switch (type) {
    //                 case 'customer':
    //                     data = (await customerApi.getAll({ _page: 1, _limit: 100000 })).data;
    //                     break;
    //                 case 'category':
    //                     data = (await categoryApi.getAll({ _page: 1, _limit: 100000 })).data;
    //                     break;
    //                 case 'product':
    //                     data = (await productApi.getAll({ _page: 1, _limit: 100000 })).data;
    //                     break;
    //                 case 'order':
    //                     data = (await orderApi.getAll({ _page: 1, _limit: 100000 })).data;
    //                     break;
    //                 case 'brand':
    //                     data = (await brandApi.getAll({ _page: 1, _limit: 100000 })).data;
    //                     break;
    //                 case 'promotion':
    //                     data = (await promotionApi.getAll({ _page: 1, _limit: 100000 })).data;
    //                     break;
    //                 default:
    //                     break;
    //             }

    //             setRows(data);
    //             // console.log(`This is ${type}:`, data);
    //         } catch (error) {
    //             // console.log(`Failed to fetch ${type} list:`, error);
    //         }
    //     };

    //     fetchData();
    // }, [type]);

    const getElement = () => {
        // switch (type) {
        //     case 'category':
        //         return <CategoryTable rows={rows} />;
        //     case 'product':
        //         return <ProductTable rows={rows} />;
        //     case 'customer':
        //         return <CustomerTable rows={rows} />;
        //     case 'order':
        //         return <OrderTable rows={rows} />;
        //     case 'brand':
        //         return <BrandTable rows={rows} />;
        //     case 'promotion':
        //         return <PromotionTable rows={rows} />;
        //     default:
        //         return null;
        // }

        return <BrandSingle />
    }

    return (
        <div className="single">
            <Sidebar />
            <div className="singleContainer">
                <Navbar />
                {
                    getElement()
                }

            </div>
        </div>
    )
}

export default Single