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
        console.log("fetching. . .")
    }, []);

    const toggleFullArticle = () => {
        createAllParaElements()
        const newsDiv = document.getElementsByClassName("full-article-container")[0]
        const btn = document.getElementsByClassName("submit-btn")[0]
        if (btn.innerHTML === "View Full Article") {
            btn.innerHTML = "Close Article"
        } else {
            btn.innerHTML = "View Full Article"
        }
        newsDiv.classList.toggle("hide")
        window.scrollTo(300, 600)
    }

    const splitNewsContent = () => {
        const newsArray = location.state.newsContent.split(". ")
        let combinedArray = []
        // for every 3 items, i want to concatenate 3, then put the text inside a  <p> tag
        const lastIndex = newsArray.length - 1
        let count = 1
        let concatString = ""
        for (let i = 0; i < newsArray.length; i++) {
            if (i === lastIndex) {
                concatString += " " + newsArray[i]
            } else {
                concatString += " " + newsArray[i] + "."
            }
            if (count % 3 === 0) {
                combinedArray.push(concatString)
                // reset concatenated string
                concatString = ""
            } else if (i === lastIndex) {
                combinedArray.push(concatString)
            }
            count++
        }
        return combinedArray
    }

    const createAllParaElements = () => {
        const combinedText = splitNewsContent()
        const div = document.getElementsByClassName("full-article-container")[0]
        for (let i = 0; i < combinedText.length; i++) {
            const para = document.createElement('p')
            para.innerHTML = combinedText[i] + '<br/><br/>'
            div.appendChild(para)
        }
    }

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
                        <p className="article-content">{data.summary_text}</p><br />
                        <button className="submit-btn" onClick={toggleFullArticle}>View Full Article</button>
                        <div className="full-article-container article-content hide"></div>
                    </section>
            }

        </Layout>
    )

}


export default NewsSummary