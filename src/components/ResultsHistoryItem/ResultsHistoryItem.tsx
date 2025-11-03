import { useNavigate } from 'react-router'
import type { QuestionsState } from '../../api/history'
import Button from '../UI/Button/Button'
import styles from './ResultsHistoryItem.module.css'

type Props = QuestionsState

const ResultsHistoryItem = (qs: Props) => {
    const navigate = useNavigate()
    return (
        <div className={styles.resultsHistoryItem}>
            <h6>-----------------------------</h6>
                <p>Test id: {qs._id}</p>
                <p>Date: {qs.createdAt}</p>
                <p>Amount of questions: {qs.amount}</p>
                <Button onClick={() => {navigate(`/results_history/${qs._id}`)}}>DETAILS</Button>
            <h6>-----------------------------</h6>
        </div>
    )
}

export default ResultsHistoryItem