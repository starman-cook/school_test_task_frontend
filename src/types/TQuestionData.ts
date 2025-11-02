export type TQuestionData = {
    type: "multiple" | "boolean",
    difficulty: "easy" | "medium" | "hard"
    category: string
    question: string
    correct_answer: string
    incorrect_answers: string[]
    index: number
    userAnswer: string
}