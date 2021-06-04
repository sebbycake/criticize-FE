import React, { useState, useEffect } from "react"
import { Helmet } from "react-helmet"
import Layout from "../components/layout"
import Loading from "../components/loading"
import QuestionCard from "../components/question_card"

const IndexPage = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const axios = require('axios')

    const text = "Facebook is facing a fresh pair of antitrust probes in Europe. \
        The UK's Competition and Markets Authority (CMA) and the EU's Competition. \
        Commission both announced formal investigations into the social media \
        giant’s operations today. The competition regulators will scrutinize \
        how Facebook uses data from advertising customers and users of its \
        single sign-on tool — specifically looking at whether it uses this data \
        as an unfair lever against competitors in markets such as classified ads. \
        The pair also said they will seek to work closely together as their independent \
        investigations progress. With the UK outside the European trading bloc \
        (post-Brexit), the national competition watchdog has a freer rein to pursue investigations \
         that may be similar to or overlap with antitrust probes the EU is also undertaking. "

    const fetchData = () => axios.post('http://127.0.0.1:7000/v1/questions', {
        article: text
      })
      .then((response) => {
        setData(response.data)
        setLoading(false)
      }, (error) => {
        console.log(error);
      });

    useEffect(() => {
        fetchData();
    }, []);

    const questionList = data.map(qn => 
        <QuestionCard key={qn.id} question={qn.question} />
    )

    return (
        <Layout>
            <Helmet>
                <title>Questions | Criticize</title>
            </Helmet>

            <div>
                {
                    loading
                        ?
                        <Loading />
                        :
                        <div className="question-list-container">
                            <h1 align="center">Questions</h1>
                            {questionList}
                        </div>
                }
            </div>

        </Layout>
    )
}

export default IndexPage