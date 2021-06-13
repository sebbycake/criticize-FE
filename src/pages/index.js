import React, { useState } from "react"
import Layout from "../components/layout"
import Loading from "../components/loading"
import QuestionCard from "../components/question_card"

const IndexPage = () => {

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const axios = require('axios')

  const removeElement = () => {
    const section1 = document.getElementsByClassName("index-section")[0]
    const section2 = document.getElementsByClassName("form-container")[0]
    section1.remove()
    section2.remove()
  }

  const updateStates = (bool) => {
    setIsLoading(bool)
    setIsSubmitted(bool)
  }

  const cleanText = (text) => text.replace(/['"]+/g, '')

  const fetchData = (content) => axios.post('http://127.0.0.1:7000/v1/questions', {
    article: cleanText(content)
  })
    .then((response) => {
      setData(response.data)
      updateStates(false)
    }, (error) => {
      console.log(error);
    });

  const handleSubmit = (event) => {
    event.preventDefault()
    removeElement()
    updateStates(true)
    fetchData(event.target.content.value)
  }

  const questionList = data.map(qn =>
    <QuestionCard key={qn.id} question={qn.question} />
  )

  return (
    <Layout>

      <section className="index-section">
        <h2 className="index-header">/generate</h2>
        <p className="index-content">Copy and paste the content of the article below.</p>
      </section>

      <section className="form-container">
        <form name="article-content" method="post" onSubmit={handleSubmit}>
          <textarea name="content" rows="20" cols="100" required></textarea>
          <button className="submit-btn" type="submit">Generate</button>
        </form>
      </section>

      {
        isLoading && isSubmitted
          ?
          <Loading />
          :
          <div className="question-list-container">
            {questionList}
          </div>
      }

    </Layout>
  )

}


export default IndexPage