import { useEffect, useState } from "react"
import { fetchQuestionsState, type HistoryServerResponse, type QuestionsState } from "../../api/history"
import ResultsHistoryItem from "../../components/ResultsHistoryItem/ResultsHistoryItem"

const ResultsHistoryPage = () => {
    const [results, setResults] = useState<HistoryServerResponse<QuestionsState[] | string> | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        setIsLoading(true)
        const getResults = async() => {
            const data = await fetchQuestionsState()
            setResults(data) 
            setIsLoading(false)
        }
        getResults()
    }, [])
    if (isLoading) return <h2>Loading...</h2>
    return (
        <>
            <h1>Results history:</h1>
            <h5>-------------</h5>
            <div>
                {results && Array.isArray(results.data) && results.data.map((el: QuestionsState) => {
                    return (
                        <ResultsHistoryItem 
                            key={el._id}
                            {...el}
                        />
                    )
                })}
            </div>
        </>
    )
}

export default ResultsHistoryPage