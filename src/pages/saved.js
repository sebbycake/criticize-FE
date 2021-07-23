import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import QuestionCard from "../components/question_card"

const SavedQuestions = () => {

  let savedQuestions = typeof window !== 'undefined' && JSON.parse(window.localStorage.getItem('qnList'))

  if (savedQuestions) {
    savedQuestions = savedQuestions.map(
      qn => <QuestionCard question={qn} isHeartNeeded={false}/>
    )
  }

  const removeAll = () => {
    localStorage.removeItem('qnList')
    const questionsSection = document.getElementsByClassName("question-list-container")[0]
    questionsSection.remove()
  }

  return (
    <Layout>

      <SEO title="Saved | Criticize" description="View your saved questions here."/>

      <section className="index-container">
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