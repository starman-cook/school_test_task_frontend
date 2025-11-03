import type { TDifficulty } from "./TDifficulty"
import type { TType } from "./TType"

export type TQuestionData = {
    type: TType
    difficulty: TDifficulty
    category: string
    question: string
    correct_answer: string
    incorrect_answers: string[]
    userAnswer: string
    correctAnswerIndex: number
}