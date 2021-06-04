import React from "react"
import Layout from "../components/layout"
import { Helmet } from "react-helmet"

const AboutPage = () => (
    <Layout>

        <Helmet>
            <title>About | Criticize</title>
        </Helmet>

        <section className="index-section">
            <h2 className="index-header">/about</h2>
            <p className="index-content">
            Launched in 2021, with the simple goal to enhance humans' critical thinking abilities. 
            Criticize harness the power of deep learning, coupled with natural language processing 
            techniques, to generate critical thinking questions based on a given context. This tool is 
            envisioned to be the go-to for readers and learners of today and tomorrow, achieving a
            future where information received are viewed from different perspectives, assumptions 
            are being challenged, and opinions are made based on informed knowledge.
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            Created by <u>Sebastian</u> x <u>Jia Rong</u>
            </p>
        </section>

    </Layout>
)


export default AboutPage