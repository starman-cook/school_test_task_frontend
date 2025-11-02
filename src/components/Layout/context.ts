import { createContext, type Dispatch, type SetStateAction } from 'react';
import type { TQuestionsState } from '../../types/TQuestionsState';

export const QuestionsContext = createContext<[TQuestionsState, Dispatch<SetStateAction<TQuestionsState>>]>([{
    data: [],
    amount: 0,
    difficulty: 'any',
    type: 'any',
    currentPage: ''
}, () => {}]);