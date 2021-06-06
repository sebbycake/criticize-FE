import React from "react"
import BookmarkBorderRoundedIcon from '@material-ui/icons/BookmarkBorderRounded';
// import green from "@material-ui/core/colors/green";

const QuestionCard = ({ question }) => {

    const bookmarkQuestion = () => {

    }

    const title = (text) => text[0].toUpperCase() + text.substring(1)

    return (
        <div className="question-card">
            <p>{title(question)}</p>
            <div className="bookmark-btn" onClick={bookmarkQuestion}>
                <BookmarkBorderRoundedIcon style={{ color: "yellow" }} />
            </div>
        </div>
    )

}


export default QuestionCard