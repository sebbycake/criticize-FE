import React from "react"
import Layout from "../components/layout"
import { Helmet } from "react-helmet"

const IndexPage = () => {

  // get the form data which is article's content
  // pass in to the next page

  return (
    <Layout>

      <Helmet>
        <title>Criticize - Generate Critical Thinking Questions</title>
      </Helmet>

      <section className="index-section">
        <h2 className="index-header">/generate</h2>
        <p className="index-content">Copy and paste the content of the article below.</p>
      </section>

      <section className="form-container">
        <form name="article-content" method="post">
          <textarea name="message" rows="20" cols="100" required></textarea>
          <button className="submit-btn" type="submit">Generate</button>
        </form>
      </section>

    </Layout>
  )

}


export default IndexPage