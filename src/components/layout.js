import React from "react";
import Header from "../pages/header";
import SEO from "./seo"

const Layout = ({children}) => {
    return (
        <div>
            <SEO />
            <Header />
            {children}
        </div>
    )
}

export default Layout;