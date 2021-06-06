import React from "react"
import Layout from "../components/layout"
import { Helmet } from "react-helmet"
import QuestionCard from "../components/question_card"

const SavedQuestions = () => {

  return (
    <Layout>

      <Helmet>
        <title>Saved | Criticize</title>
      </Helmet>

      <section className="index-section">
        <h2 className="index-header">/saved</h2>
        <p className="index-content">Your Saved Questions</p>
      </section>


    </Layout>
  )

}


export default SavedQuestions