import React from "react"
import Layout from "../components/layout"
import { Helmet } from "react-helmet"
import QuestionCard from "../components/question_card"

const SavedQuestions = () => {

  let savedQuestions = JSON.parse(localStorage.getItem('qnList'))

  if (savedQuestions !== null) {
    savedQuestions = savedQuestions.map(
      qn => <QuestionCard question={qn} />
    )
  }

  const removeAll = () => {
    localStorage.removeItem('qnList')
    const questionsSection = document.getElementsByClassName("question-list-container")[0]
    questionsSection.remove()
  }

  return (
    <Layout>

      <Helmet>
        <title>Saved | Criticize</title>
      </Helmet>

      <section className="index-section">
        <h2 className="index-header">/saved</h2>
        <p className="index-content">
          Your Saved Questions <br />
          <strong>Note: </strong>Clearing cache will remove questions saved here.
        </p>
      </section>

      <div className="question-list-container">
        {savedQuestions}
        {
          savedQuestions !== null && 
            <div className="btn-container">
              <button className="remove-btn" onClick={removeAll}>Clear All</button>
            </div>
        }
      </div>

    </Layout>
  )

}


export default SavedQuestions