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

    const toggleFullArticle = () => {
        const newsDiv = document.getElementById("full-article-container")
        const btn = document.getElementsByClassName("remove-btn")[0]
        if (btn.innerHTML === "View Full Article") {
            btn.innerHTML = "Close Article"
        } else {
            btn.innerHTML = "View Full Article"
        }
        if (newsDiv.childElementCount === 0) {
            createAllParaElements()
        }
        newsDiv.classList.toggle("hide")
        typeof window !== 'undefined' && window.scrollTo(300, 450)
    }

    const splitNewsContent = () => {
        const newsArray = location.state.newsContent.split(". ")
        console.log(newsArray)
        const lastIndex = newsArray.length - 1
        if (newsArray[lastIndex] === " Download our app or subscribe to our Telegram channel \
        for the latest updates on the coronavirus outbreak: https://cna.asia/telegram") {
            newsArray.pop()
        }
        let combinedArray = []
        // for every 3 items, i want to concatenate 3, then put the text inside a  <p> tag
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

    const createPara = (text) => {
        const para = document.createElement('p')
        para.innerHTML = text + '<br/><br/>'
        return para
    }

    const createAllParaElements = () => {
        const combinedText = splitNewsContent()
        const div = document.getElementById("full-article-container")
        for (let i = 0; i < combinedText.length; i++) {
            const para = createPara(combinedText[i])
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
                        <p className="article-content-summary">{data.summary_text}</p><br />
                        <div className="btn-container">
                            <button className="remove-btn" onClick={toggleFullArticle}>View Full Article</button>
                        </div>
                        <div id="full-article-container" className="article-content-full hide"></div>
                    </section>
            }

        </Layout>
    )

}


export default NewsSummary