import React from "react"
import Layout from "../components/layout"
import { Helmet } from "react-helmet"
import QuestionCard from "../components/question_card"

const SavedQuestions = () => {

    // Retrieve the object from storage
    const retrievedObject = localStorage.getItem('qnList');

    const qnArray = JSON.parse(retrievedObject).questions

    console.log(qnArray)

    const qnList = qnArray.map(
        qn => <QuestionCard question={qn}/>
    )

  return (
    <Layout>

      <Helmet>
        <title>Saved | Criticize</title>
      </Helmet>

      <section className="index-section">
        <h2 className="index-header">/saved</h2>
        <p className="index-content">Your Saved Questions</p>
      </section>

      <div>
          {qnList}
      </div>

    </Layout>
  )

}


export default SavedQuestions