import React from "react"
import BookmarkBorderRoundedIcon from '@material-ui/icons/BookmarkBorderRounded';
// import green from "@material-ui/core/colors/green";

const QuestionCard = ({ question }) => {

    const windowGlobal = typeof window !== 'undefined' && window

    const bookmarkQuestion = (qn) => {
        const arr = JSON.parse(windowGlobal.localStorage.getItem('qnList'))
        if (arr === null) {
            const arrCopy = []
            arrCopy.push(qn)
            windowGlobal.localStorage.setItem("qnList", JSON.stringify(arrCopy))
        } else {
            // clone the arr from LS
            const arrCopy = [...arr]
            arrCopy.push(qn)
            windowGlobal.localStorage.setItem("qnList", JSON.stringify(arrCopy))
        }
    }

    const title = (text) => text[0].toUpperCase() + text.substring(1)

    const titledQuestion = title(question)

    return (
        <div className="question-card">
            <p>{titledQuestion}</p>
            <div className="bookmark-btn" onClick={ () => bookmarkQuestion(titledQuestion) }>
                <BookmarkBorderRoundedIcon style={{ color: "yellow" }} />
            </div>
        </div>
    )

}


export default QuestionCard