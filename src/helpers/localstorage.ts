import { v4 as uuidv4 } from 'uuid';
import { generateRandomUsername } from './username';

const TOKEN_KEY = 'auth_token';

export const getAuthToken = (): [string, string | null, boolean] => {
    let token = localStorage.getItem(TOKEN_KEY);
    let username = localStorage.getItem('username');
    if (!token) {
        token = uuidv4();
        localStorage.setItem(TOKEN_KEY, token);
        username = generateRandomUsername();
        localStorage.setItem('username', username);
        return [token, username, true];
    } 
    return [token, username, false];
};

export const getAnswers = (): string[] => {
    let answers = localStorage.getItem('answers');
    if (!answers) {
        return [];
    }
    console.log('Answers loaded:', answers);
    return answers.split(',');
}

export const saveAnswers = (answers: string[]): void => {
    localStorage.setItem('answers', answers.join(','));
    console.log('Answers saved:', answers);
}

export const getCurrentQuestionIndex = (): number => {
    let questionIndex = localStorage.getItem('questionIndex');
    if (!questionIndex) {
        return 0;
    }
    return parseInt(questionIndex);
}

export const saveCurrentQuestionIndex = (questionIndex: number): void => {
    localStorage.setItem('questionIndex', questionIndex.toString());
}