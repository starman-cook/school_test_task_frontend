import { useContext, useEffect, useState, type ChangeEvent } from "react"
import type { TQuestionData } from "../../types/TQuestionData"
import { fetchQuestion } from "../../api/fetchQuestion"
import type { TDifficulty } from "../../types/TDifficulty"
import type { TType } from "../../types/TType"
import Button from "../UI/Button/Button"
import styles from './QuestionItem.module.css'
import { QuestionsContext } from "../Layout/context"
import { useNavigate } from "react-router"
import RadioButtonGroup from "../UI/RadioButtonGroup/RadioButtonGroup"
import { createQuestionsState } from "../../api/history"

type Props = {
    index: string | undefined
}

const QuestionItem = ({ index }: Props) => {
    const [state, setState] = useContext(QuestionsContext)
    const [question, setQuestion] = useState<TQuestionData | undefined>(undefined)
    const [error, setError] = useState<string | undefined>(undefined)
    const [hasPrev, setHasPrev] = useState<boolean>(false)
    const [hasNext, setHasNext] = useState<boolean>(false)
    const navigate = useNavigate();

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
            if (state && +state.amount > 0) {
                const parsedIndex = parseInt(index + '')

                if (isNaN(parsedIndex) || parsedIndex > +state.amount || parsedIndex - 1 < 0) {
                    setError('The url of the page is incorrect')
                    return
                }
                setHasPrev(parsedIndex - 1 > 0)
                setHasNext(parsedIndex < state.amount)
                if (state.data[parsedIndex - 1]) {
                    setQuestion(state.data[parsedIndex - 1])
                } else {
                    fetchNewQuestion(state.difficulty, state.type)
                }
            }
        } catch (err) {
            console.log(err)
        }
        return () => {
            setQuestion(undefined)
        }
    }, [index])

    const next = () => {
        if (!index) return
        navigate(`/questions/${parseInt(index) + 1}`)
    }

    const prev = () => {
        if (!index) return
        navigate(`/questions/${parseInt(index) - 1}`)
    }

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const copyState = { ...state }
        copyState.data[parseInt(index || '') - 1].userAnswer = e.target.value
        setState(copyState)
    }



    const getOptions = (): { label: string, value: string }[] => {
        const arr = question?.incorrect_answers.map(el => {
            return {
                label: el,
                value: el
            }
        }) || []
        arr.splice(state.data[parseInt(index + '') - 1].correctAnswerIndex, 0, {
            label: question?.correct_answer + '',
            value: question?.correct_answer + ''
        })
        return arr
    }

    const submit = async () => {
        try {
            await createQuestionsState(state)
        } catch(err) {
            console.log(err)
        }
        navigate('/results')
    }

    return (
        <>
            {error ?
                <h2>{error}</h2>
                :
                !question || isNaN(parseInt(state.data[parseInt(index + '') - 1]?.correctAnswerIndex + '')) ?
                    null :
                    <>
                        <h1>--------------</h1>
                        <p>{question?.question}</p>
                        <RadioButtonGroup
                            name={'userAnswer'}
                            index={index + ''}
                            options={getOptions()}
                            onChange={changeHandler}
                            value={state.data[parseInt(index + '') - 1].userAnswer}
                        />

                        <div className={styles.buttonBlock}>
                            {hasPrev ? <Button onClick={prev}>Prev</Button> : null}
                            {hasNext ? <Button onClick={next}>Next</Button> : null}
                            {parseInt(index + '') === +state.amount ? <Button onClick={submit}>Submit</Button> : null}
                        </div>
                    </>
            }

        </>

    )
}

export default QuestionItem