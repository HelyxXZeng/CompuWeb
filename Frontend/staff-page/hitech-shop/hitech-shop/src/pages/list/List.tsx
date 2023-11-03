import CategoryTable from "../../components/categoryTable/CategoryTable"
import Navbar from "../../components/navbar/Navbar"
import ProductTable from "../../components/productTable/ProductTable"
import Sidebar from "../../components/sidebar/Sidebar"
import "./list.scss"
import { useEffect, useState } from "react"
import productApi from "../../api/productApi"
import categoryApi from "../../api/categoryApi"


const List = ({ type }: { type: string }) => {
    const [rows, setRows] = useState<any[]>([]);

    const getElement = () => {
        switch (type) {
            case 'category':
                useEffect(() => {
                    const fetchList = async () => {
                        try {
                            const params = {
                                _page: 1,
                                _limit: 100,
                            };
                            const data: any[] = (await categoryApi.getAll(params)).data;

                            setRows(data); // Update rows with the data
                            // console.log('This is data: ', data);
                        } catch (error) {
                            console.log('Failed to fetch category list: ', error);
                        }
                    };

                    fetchList();
                }, []);

                return <CategoryTable rows={rows} />;
            case 'product':
                useEffect(() => {
                    const fetchList = async () => {
                        try {
                            const params = {
                                _page: 1,
                                _limit: 10,
                            };
                            const data: any[] = (await productApi.getAll(params)).data;

                            setRows(data); // Update rows with the data
                            // console.log('This is data: ', data);
                        } catch (error) {
                            console.log('Failed to fetch product list: ', error);
                        }
                    };

                    fetchList();
                }, []);

                return <ProductTable rows={rows} />;
            case 'user':
                return null
            // return <ProductTable rows={rows} columns={columns} />;
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