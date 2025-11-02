import { createContext, type Dispatch, type SetStateAction } from 'react';

export const QuestionsContext = createContext<[string, Dispatch<SetStateAction<string>>]>(['', () => {}]);