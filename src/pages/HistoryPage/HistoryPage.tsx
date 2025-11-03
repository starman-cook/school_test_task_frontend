import { useNavigate } from "react-router"
import Button from "../../components/UI/Button/Button"

const HistoryPage = () => {
    const navigate = useNavigate()
    return (
         <>
                    <h1>Histories</h1>
                    <h6>---------------</h6>
                    <Button onClick={() => navigate('/search_history')}>Valid Search history</Button>
                    <h6>---------------</h6>
                    <Button onClick={() => navigate('/results_history')}>See the history of results</Button>
                </>
    )
}

export default HistoryPage