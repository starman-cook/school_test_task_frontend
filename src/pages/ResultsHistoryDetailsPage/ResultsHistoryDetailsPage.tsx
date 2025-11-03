import { useEffect, useState } from "react"
import { fetchQuestionsStateById, type HistoryServerResponse, type QuestionsState } from "../../api/history"
import { useParams } from "react-router"
import ResultItem from "../../components/ResultItem/ResultItem"

const ResultsHistoryDetailsPage = () => {
    const params = useParams()
    const [result, setResult] = useState<HistoryServerResponse<QuestionsState> | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        setIsLoading(true)
        const getResults = async() => {
            if (!params.id) return
            const data = await fetchQuestionsStateById(params.id)
            setResult(data as HistoryServerResponse<QuestionsState>) 
            setIsLoading(false)
        }
        getResults()
    }, [params])

    if (isLoading) return <h2>Loading...</h2>
    return (
        <>
            <h1>Test #{params.id}:</h1>
            <h5>-------------</h5>
            <h6>Passed on: {result?.data.createdAt}</h6>
            <h5>-------------</h5>

            <ul>
                <li>Name: {result?.data.fullName}</li>
                <li>Email: {result?.data.email}</li>
                <li>Amount of questions: {result?.data.amount}</li>
                <li>Difficulty: {result?.data.difficulty}</li>
                <li>Type: {result?.data.type}</li>
            </ul>
            {result ? <div>
                <br />
                <br />
                 <h3>Results:</h3>
                {Array.isArray(result.data.data) && result.data.data.map((el, i) => {
                    return (
                        <ResultItem key={el.type + i + el.userAnswer} question={el} />
                    )
                })}
            </div> : null}
        </>
    )
}

export default ResultsHistoryDetailsPage