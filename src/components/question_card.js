import React from "react"
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
// import green from "@material-ui/core/colors/green";

const QuestionCard = ({ question, isHeartNeeded }) => {

    const windowGlobal = typeof window !== 'undefined' && window

    const toggleHeartIcon = event => {
        const whiteHeart = '\u2661';
        const blackHeart = '\u2665';
        const currHeartIcon = event.target.textContent
        if (currHeartIcon === whiteHeart) {
            event.target.textContent = blackHeart
        } else {
            event.target.textContent = whiteHeart
        }
    }

    /*
        1. retrieve qn array
        2. if qn array is empty, add qn
        3. if qn array is not empty
            a. if qn is in array, remove
            b. if qn not in array, add
    */
    const bookmarkQuestion = event => {
        toggleHeartIcon(event)
        const qn = event.target.previousSibling.textContent
        const arr = JSON.parse(windowGlobal.localStorage.getItem('qnList'))
        if (arr === null) {
            const arrCopy = []
            arrCopy.push(qn)
            windowGlobal.localStorage.setItem("qnList", JSON.stringify(arrCopy))
        } else {
            // clone the arr from LS
            const arrCopy = [...arr]
            if (arrCopy.includes(qn)) {
                arrCopy.splice(arrCopy.indexOf(qn), 1)
                windowGlobal.localStorage.setItem("qnList", JSON.stringify(arrCopy))
            } else {
                arrCopy.push(qn)
                windowGlobal.localStorage.setItem("qnList", JSON.stringify(arrCopy))
            }
        }
    }


    const title = (text) => text[0].toUpperCase() + text.substring(1)

    const titledQuestion = title(question)

    return (
        <div className="question-card">
            <p>{titledQuestion}</p>
            { isHeartNeeded 
                && 
              <div className="bookmark-btn" onClick={bookmarkQuestion}>
                &#x2661;
              </div> }
        </div>
    )

}


export default QuestionCard