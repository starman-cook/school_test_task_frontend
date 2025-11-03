import type { TDifficulty } from "../types/TDifficulty"
import type { TQuestionsState } from "../types/TQuestionsState"
import type { TType } from "../types/TType"
import { historyUrl } from "./historyUrl"

export type HistoryServerResponse<T extends SearchHistory[] | string | QuestionsState | QuestionsState[] | SearchHistory> = {
    message: string
    data: T
}

export type SearchHistory = {
    _id: string,
    full_name: string
    email: string
    qty: number
    difficulty: TDifficulty
    type: TType
    createdAt: string
    updatedAt: string
}

export type QuestionsState = {
    _id: string,
    createdAt: string
    updatedAt: string
} & TQuestionsState

export const fetchHistory = async (): Promise<HistoryServerResponse<SearchHistory[] | string>> => {
    try {
        const response = await fetch(historyUrl + '/search_history')
        const result: HistoryServerResponse<SearchHistory[]> = await response.json()
        return result
    } catch(err) {
        console.log(err)
    }
    return {
        message: 'fetchHistory error',
        data: 'in folder api, file history.ts'
    }
}

export const createHistory = async (body: Omit<SearchHistory, '_id' | 'created_at' | 'updated_at'>): Promise<HistoryServerResponse<SearchHistory | string>> => {
    try {
        const response = await fetch(historyUrl + '/search_history', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        const result: HistoryServerResponse<SearchHistory> = await response.json()
        return result
    } catch(err) {
        console.log(err)
    }
    return {
        message: 'fetchHistory error',
        data: 'in folder api, file history.ts'
    }
}

export const createQuestionsState = async (body: TQuestionsState): Promise<HistoryServerResponse<QuestionsState | string>> => {
    try {
        const response = await fetch(historyUrl + '/questions_state', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        const result: HistoryServerResponse<QuestionsState> = await response.json()
        return result
    } catch(err) {
        console.log(err)
    }
    return {
        message: 'createQuestionState error',
        data: 'in folder api, file history.ts'
    }
}

export const fetchQuestionsState = async (): Promise<HistoryServerResponse<QuestionsState[] | string>> => {
    try {
        const response = await fetch(historyUrl + '/questions_state')
        const result: HistoryServerResponse<QuestionsState[]> = await response.json()
        return result
    } catch(err) {
        console.log(err)
    }
    return {
        message: 'fetchQuestionsState error',
        data: 'in folder api, file history.ts'
    }
}

export const fetchQuestionsStateById = async (id: string): Promise<HistoryServerResponse<QuestionsState | string>> => {
    try {
        const response = await fetch(historyUrl + '/questions_state/' + id)
        const result: HistoryServerResponse<QuestionsState> = await response.json()
        return result
    } catch(err) {
        console.log(err)
    }
    return {
        message: 'fetchQuestionsStateById error',
        data: 'in folder api, file history.ts'
    }
}