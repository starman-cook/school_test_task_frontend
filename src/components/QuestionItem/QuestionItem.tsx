import { useContext, useEffect, useState } from "react"
import type { TQuestionData } from "../../types/TQuestionData"
import { fetchQuestion } from "../../api/fetchQuestion"
import type { TDifficulty } from "../../types/TDifficulty"
import type { TType } from "../../types/TType"
import Button from "../UI/Button/Button"
import styles from './QuestionItem.module.css'
import { QuestionsContext } from "../Layout/context"

type Props = {
    index: string | undefined
}

const QuestionItem = ({ index }: Props) => {
    const [state, setState] = useContext(QuestionsContext)
    const [question, setQuestion] = useState<TQuestionData | undefined>(undefined)
    const [error, setError] = useState<string | undefined>(undefined)
    const [hasPrev, setHasPrev] = useState<boolean>(false)
    const [hasNext, setHasNext] = useState<boolean>(false)


    useEffect(() => {
        const fetchNewQuestion = async (difficulty: TDifficulty, type: TType) => {
            try {
                const fetchedData = await fetchQuestion(difficulty, type)
                setQuestion(fetchedData)
                if (fetchedData) {
                    const copyState = { ...state }
                    copyState.data[parseInt(index || '') - 1] = fetchedData
                    setState(copyState)
                } else {
                    setError('Please reload the page')
                }
            } catch (err) {
                console.log(err)
                setError('Please reload the page')
            }

        }
        try {
            if (state && state.amount > 0) {
                const parsedIndex = parseInt(index + '')

                if (isNaN(parsedIndex) || parsedIndex > state.amount || parsedIndex - 1 < 0) {
                    setError('The url of the page is incorrect')
                    return
                }
                setHasPrev(parsedIndex - 1 > 0)
                setHasNext(parsedIndex - 1 < state.amount)
                if (state.data[parsedIndex - 1]) {
                    setQuestion(state.data[parsedIndex - 1])
                } else {
                    fetchNewQuestion('easy', 'boolean')
                }
            }
        } catch (err) {
            console.log(err)
        }
        return () => {
            setQuestion(undefined)
        }
    }, [index])

    return (
        <>
            {error ?
                <h2>{error}</h2>
                :
                <>
                    <h1>SOME TEXT</h1>
                    <p>{JSON.stringify(question)}</p>

                    <div className={styles.buttonBlock}>
                        {hasPrev ? <Button>Prev</Button> : null}
                        {hasNext ? <Button>Next</Button> : null}
                    </div>
                </>
            }

        </>

    )
}

export default QuestionItem