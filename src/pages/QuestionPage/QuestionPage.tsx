import { useParams } from "react-router"
import QuestionItem from "../../components/QuestionItem/QuestionItem"
import { useContext, useEffect } from "react"
import { QuestionsContext } from "../../components/Layout/context"

const QuestionPage = () => {
    const [state] = useContext(QuestionsContext)
    const params = useParams()

    useEffect(() => {
            const parsedIndex = parseInt(params.index + '')
            if (!isNaN(parsedIndex) && parsedIndex <= state.amount && parsedIndex > 0) {
                localStorage.setItem('currentPage', parsedIndex + '')
        }
    }, [params])
    return (
        <>
            <h1>Question #{params?.index} of {state.amount}</h1>
            <QuestionItem index={params?.index} />
        </>
    )
}

export default QuestionPage