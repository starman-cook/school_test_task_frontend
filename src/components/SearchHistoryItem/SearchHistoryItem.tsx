import type { SearchHistory } from '../../api/history'
import styles from './SearchHistoryItem.module.css'
type Props = SearchHistory


const SearchHistoryItem = (sh: Props) => {
    return (
        <div className={styles.searchHistoryItem}>
            <h6>------------------------</h6>
            <ul>
                <li>Created: {sh.createdAt}</li>
                <li>Full Name: {sh.full_name}</li>
                <li>Email: {sh.email}</li>
                <li>Amount of questions: {sh.qty}</li>
                <li>Difficulty: {sh.difficulty}</li>
                <li>Type: {sh.type}</li>
            </ul>
            <h6>------------------------</h6>
        </div>
    )
}

export default SearchHistoryItem