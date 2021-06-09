import React, { useState, useEffect } from "react"
import { Helmet } from "react-helmet"
import Layout from "../components/layout"
import Loading from "../components/loading"
import Article from "../components/article"

const TopNews = () => {

    const [data, setData] = useState([])
    const [isCached, setIsCached] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const axios = require('axios')

    const fetchData = () => axios.get('http://127.0.0.1:7000/v1/articles')
        .then((response) => {
            const json = response.data.channelnewsasia
            setData(json)
            sessionStorage.setItem("article-list", JSON.stringify(json))
            setIsLoading(false)
            setIsCached(true)
        }, (error) => {
            console.log(error);
        });

    useEffect(() => {
        const sessionData = sessionStorage.getItem("article-list")
        if (sessionData) {
            setIsCached(true)
            setData(JSON.parse(sessionData))
        } else {
            setIsCached(false)
            fetchData()
        }
    }, []);

    const articleList = data.filter(article => article.content != "No text available").map(article =>
        <Article article={article} />
    )

    return (
        <Layout>

            <Helmet>
                <title>Top Daily News | Criticize</title>
            </Helmet>

            <section className="index-section">
                <h2 className="index-header">/top daily news</h2>
                <p className="index-content">

                </p>
            </section>

            {
                isLoading && !isCached
                    ?
                    <Loading />
                    :
                    <div className="article-container">
                        {articleList}
                    </div>
            }


        </Layout>
    )

}


export default TopNews