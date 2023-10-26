
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Table from "../../components/table/Table"
import "./home.scss"

const Home = () => {


    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="listContainer">
                    <div className="listTitle">
                        Latest Transactions
                    </div>
                    <Table />
                </div>
            </div>
        </div>
    )
}

export default Home