import { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface Props {
    children: ReactNode;
}

function DefaultLayout({ children }: Props) {
    return (
        <div>
            <Header />
            <div className="container">
                <Sidebar />
                <div className="content">{children}</div>
            </div>
        </div >
    )
}
export default DefaultLayout;