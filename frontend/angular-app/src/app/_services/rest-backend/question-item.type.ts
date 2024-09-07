export interface QuestionItem {
    id?: number;
    text: string;
    number: number;
    QuizLink: string;
    answerText1?: string;
    answerText2?: string;
    answerText3?: string;
    answerText4?: string;
    correctAnswer: string;
    createdAt?: Date;
    updatedAt?: Date;
}