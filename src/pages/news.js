import React, { useState, useEffect } from "react"
import { Helmet } from "react-helmet"
import Layout from "../components/layout"
import Loading from "../components/loading"
import Article from "../components/article"

const TopNews = () => {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const axios = require('axios')

    const fetchData = () => axios.get('http://127.0.0.1:7000/v1/articles')
        .then((response) => {
            setData(response.data)
            setIsLoading(false)
        }, (error) => {
            console.log(error);
        });

    useEffect(() => {
        fetchData()
    }, []);

    const articleList = data
        .filter(article => article.content !== "No text available")
        .sort((article1, article2) => article2.title.length - article1.title.length)
        .map(article => <Article article={article} />)

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
                isLoading
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