import React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby";

// images
import copy from "../../static/images/copy.png"
import duplicate from "../../static/images/duplicate.png"
import button from "../../static/images/button.png"

const IndexPage = () => {

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
          <Link className="try-now-btn" to="/questions">Try Now</Link>
        </div>
      </section>

    </Layout>
  )

}


export default IndexPage