import type { TQuestionData } from '../../types/TQuestionData'
import styles from './ResultItem.module.css'

type Props = {
    question: TQuestionData
}

const ResultItem = ({question}: Props) => {
    return (
        <div className={styles.resultItem}>
            <h6>------------------------</h6>
                <h5>Question: {question.question}</h5>
                <h6>Incorrect answers:</h6>
                <ul>
                    {question.incorrect_answers.map((answer, i) => {
                        return <li key={answer + i}>{answer} {question.userAnswer === answer ? <span className={`${styles.answer} ${styles['answer--incorrect']}`}>YOUR ANSWER</span> : ''}</li>
                    })}
                </ul>
                <h6>Correct answer:</h6>
                <p>{question.correct_answer} {question.userAnswer === question.correct_answer ? <span className={`${styles.answer} ${styles['answer--correct']}`}>YOUR ANSWER</span> : ''}</p>
            <h6>------------------------</h6>
        </div>
    )
}

export default ResultItem