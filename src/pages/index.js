import React, { useState } from "react"
import Layout from "../components/layout"
import Loading from "../components/loading"
import QuestionCard from "../components/question_card"
import axios from 'axios'
import copy from "../../static/images/copy.png"
import duplicate from "../../static/images/duplicate.png"
import button from "../../static/images/button.png"
import { Link } from "gatsby";

const IndexPage = () => {

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const removeElement = () => {
    const landingSection = document.getElementsByClassName("landing-section")[0]
    const formSection = document.getElementsByClassName("form-section")[0]
    landingSection.remove()
    formSection.remove()
  }

  const updateStates = bool => {
    setIsLoading(bool)
    setIsSubmitted(bool)
  }

  // remove double quotation marks
  const cleanText = text => text.replace(/['"]+/g, '')

  // split paragraphs
  const textPartitionArr = text => text.split('\n\n')

  const populateAxiosRequestsArr = textArr => {
    const arr = []
    for (let i = 0; i < textArr.length; i++) {
      arr.push(axios.post(`${process.env.CRITICIZE_API_URL}/v1/questions`, { article: cleanText(textArr[i]) }))
    }
    return arr
  }

  const retrieveAllQuestions = array => {
    const arrayOfQns = []
    for (let i = 0; i < array.length; i++) {
      arrayOfQns.push(JSON.parse(array[i].data.body).questions)
    }
    return arrayOfQns
  }

  // call multiple APIs asynchronously
  const fetchAllData = axiosArr => {

    axios.all(axiosArr).then(
      axios.spread((...allData) => {
        const arr = retrieveAllQuestions(allData)
        setData(arr)
        updateStates(false)
      })
    )
  }

  const handleSubmit = event => {
    event.preventDefault()
    removeElement()
    updateStates(true)
    const textArr = textPartitionArr(event.target.content.value)
    const axiosArr = populateAxiosRequestsArr(textArr)
    fetchAllData(axiosArr)
  }

  const questionList = data.map(qn =>
    <QuestionCard question={qn} />
  )

  return (
    <Layout>

      <section className="landing-section">
        <h1>Say hello to Criticize</h1>
        <h3>Automatic generation of critical thinking questions from text sources</h3>
        <div class="steps-container">
          <div className="step">
            <img className="responsive-icon-img" src={copy} alt="icon"></img>
            <p>1. copy text sources<br /> from websites</p>
          </div>
          <div className="step">
            <img className="responsive-icon-img" src={duplicate} alt="icon"></img>
            <p>2. paste them into<br /> the text box below</p>
          </div>
          <div className="step">
            <img className="responsive-icon-img" src={button} alt="icon"></img>
            <p>3. click generate</p>
          </div>
        </div>
        <div className="btn-landing-container">
          <Link className="try-now-btn" to="#form">Try Now</Link>
        </div>
      </section>

      <section className="form-section" id="form">
        <div className="index-container">
          <h2 className="index-header">/generate</h2>
          <p className="index-content">Copy and paste the content of the article below.</p>
        </div>

        <div className="form-container">
          <form name="article-content" method="post" onSubmit={handleSubmit}>
            <textarea name="content" rows="20" cols="100" required></textarea>
            <button className="submit-btn" type="submit">Generate</button>
          </form>
        </div>
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