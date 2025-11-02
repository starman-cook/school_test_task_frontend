import type { TDifficulty } from "../types/TDifficulty"
import type { TQuestionData } from "../types/TQuestionData"
import type { TType } from "../types/TType"
import { apiUrl } from "./apiUrl"

 const getRandomCategoryExceptVideo = (): number => {
        const rand = Math.floor(Math.random() * (32 - 9 + 1) + 9)
        if (rand === 15) {
            return getRandomCategoryExceptVideo()
        } else {
            return rand
        }
    }
    export const fetchQuestion = async(difficulty: TDifficulty, type: TType): Promise<TQuestionData | undefined> => {
        try {
            const queryString = new URLSearchParams()
            queryString.append('amount', '1')
            queryString.append('category', getRandomCategoryExceptVideo() + '')

            if (difficulty !== 'any') {
                queryString.append('difficulty', difficulty)
            }
            if (type !== 'any') {
                queryString.append('type', type)
            }
            const response = await fetch(`${apiUrl}?${queryString.toString()}`)
            const data = await response.json()
            return data.results[0]
        } catch(err) {
            console.log(err)
        }
        return 
    }