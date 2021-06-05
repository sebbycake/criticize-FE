import React from "react"
import BookmarkBorderRoundedIcon from '@material-ui/icons/BookmarkBorderRounded';

const QuestionCard = ({ question }) => {

    let questions = {'questions':[]}

    localStorage.setItem('qnList', JSON.stringify(questions))

    const bookmarkQuestion = (title) => {
        // retrieve the list
        const qnArray = JSON.parse(localStorage.getItem('qnList')).questions
        // then push to the list
        qnArray.push(title)
        questions = {'questions': qnArray}
        localStorage.setItem('qnList', JSON.stringify(questions))
    }

    return (
        <div className="question-card">
            <p>{question}</p>
            <div className="bookmark-btn" onClick={ () => bookmarkQuestion({question}) }>
                <BookmarkBorderRoundedIcon />
            </div>
        </div>
    )

}


export default QuestionCard