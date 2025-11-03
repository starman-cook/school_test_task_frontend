import { useContext } from "react"
import { QuestionsContext } from "../../components/Layout/context"
import ResultItem from "../../components/ResultItem/ResultItem"

const ResultsPage = () => {
    const [state] = useContext(QuestionsContext)
    return (
        <div>
            <h1>Results for {state.amount} questions by {state.fullName}</h1>
            {state.data.map((el, i) => {
                return (
                    <ResultItem key={el.type + i + el.userAnswer} question={el} />
                )
            })}
        </div>
    )
}

export default ResultsPage