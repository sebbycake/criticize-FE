import React from "react";
import { Link } from "gatsby";

const Article = ({ article }) => {

    const convertPublisher = () => {
        if (article.publisher === "channelnewsasia") {
            return "CNA"
        }
    }

    return (
        <div className="article-card">
            <h3>{article.title}</h3>
            <span>{convertPublisher(article.publisher)}</span>
            <div className="btn-container">
                <Link className="view-summary-btn" 
                      state={{ newsTitle:article.title, newsContent:article.content }}
                      to="/summary">
                      View Summary
                </Link>
            </div>
        </div>
    )
}

export default Article
