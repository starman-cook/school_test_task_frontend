import type { TDifficulty } from "./TDifficulty"
import type { TQuestionData } from "./TQuestionData"
import type { TType } from "./TType"

export type TQuestionsState = {
    data: TQuestionData[]
    amount: number
    difficulty: TDifficulty
    type: TType
    currentPage: string
}
