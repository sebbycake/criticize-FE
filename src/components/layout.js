import React from "react";
import Header from "../pages/header";

const Layout = ({children}) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}

export default Layout;