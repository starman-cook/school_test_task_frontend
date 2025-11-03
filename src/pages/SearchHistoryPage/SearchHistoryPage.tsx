import { useEffect, useState } from "react"
import { fetchHistory, type HistoryServerResponse, type SearchHistory } from "../../api/history"
import SearchHistoryItem from "../../components/SearchHistoryItem/SearchHistoryItem"

const SearchHistoryPage = () => {
    const [results, setResults] = useState<HistoryServerResponse<SearchHistory[] | string> | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        setIsLoading(true)
        const getResults = async() => {
            const data = await fetchHistory()
            setResults(data) 
            setIsLoading(false)
        }
        getResults()
    }, [])
    if (isLoading) return <h2>Loading...</h2>
    return (
        <>
            <h1>Search history of valid requests:</h1>
            <h5>-------------</h5>
            <div>
                {results && Array.isArray(results.data) && results.data.map((el: SearchHistory) => {
                    return (
                        <SearchHistoryItem 
                            key={el._id}
                            {...el}
                        />
                    )
                })}
            </div>
        </>
    )
}

export default SearchHistoryPage