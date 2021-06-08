import React, { useState, useEffect } from "react"
import { Helmet } from "react-helmet"
import Layout from "../components/layout"
import Loading from "../components/loading"

const NewsSummary = ({ location }) => {

    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const axios = require('axios')

    const cleanText = (text) => text.replace(/['"]+/g, '')

    const fetchData = () => axios.post('http://127.0.0.1:7000/v1/summary', {
        article: cleanText(location.state.newsContent)
    })
        .then((response) => {
            setData(response.data)
            setIsLoading(false)
        }, (error) => {
            console.log(error);
        });

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Layout>

            <Helmet>
                <title>Top Daily News | Criticize</title>
            </Helmet>

            <section className="index-section">
                <h2 className="index-header">/summary</h2>
            </section>

            {
                isLoading
                    ?
                    <Loading />
                    :
                    <section className="article-detail">
                        <h1 className="article-title">{location.state.newsTitle}</h1>
                        <p className="article-content">{data.summary_text}</p>
                    </section>
            }

        </Layout>
    )

}


export default NewsSummary