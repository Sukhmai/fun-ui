import React, { useState, ChangeEvent, useEffect } from "react";
import {
    Box,
    Text,
    VStack,
    Grid,
    Button,
    Textarea,
    Avatar,
    Wrap,
    WrapItem,
    Center,
    HStack
} from "@chakra-ui/react"
import AnimatedText from "../components/AnimatedText";
import { getAuthToken, getAnswers, saveAnswers, saveCurrentQuestionIndex, getCurrentQuestionIndex } from "../helpers/localstorage";
import { useNavigate } from "react-router-dom";



const QuestionPage: React.FC = () => {
    const [textareaValue, setTextareaValue] = useState<string>("");
    const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
    const [questions, setQuestions] = useState<string[] | null>(null);
    const [questionIndex, setQuestionIndex] = useState<number>(0);
    const [token, setToken] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [answers, setAnswers] = useState<string[]>([]);

    const navigate = useNavigate();

    const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTextareaValue(e.target.value);
    };

    const fetchQuestions = async () => {
        const apiUrl = "http://localhost:8080/questions/getquestions";
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching question: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    }

    const handleBack = () => {
        setQuestionIndex(questionIndex - 1);
        setTextareaValue(answers[questionIndex - 1]);
        saveCurrentQuestionIndex(questionIndex - 1);
    }

    const handleSubmit = async () => {
        // Replace with your API endpoint
        const apiUrl = `http://localhost:8080/questions/saveanswer/${questionIndex}`;

        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ answer: textareaValue }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        if (questions && questionIndex === questions.length - 1) {
            navigate('/landing');
            return;
        }
        setQuestionIndex(questionIndex + 1);
        let newAnswers = [...answers]; 
        newAnswers[questionIndex] = textareaValue;
        setAnswers(newAnswers);
        saveAnswers(newAnswers);
        setTextareaValue(answers[questionIndex + 1] || "");
        saveCurrentQuestionIndex(questionIndex + 1);
    };

    async function fetchProfilePhoto(token: string): Promise<string> {
        try {
            const apiUrl = "http://localhost:8080/profile/getphoto";
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
            
            if (!response.ok) {
                throw new Error(`Error fetching profile photo: ${response.statusText}`);
            }

            const data = await response.json();
            return data.photo; 
        } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch profile photo');
        }
    }

    useEffect(() => {
        const tokenUsername = getAuthToken();
        const token = tokenUsername[0];
        const username = tokenUsername[1];
        setToken(token);
        setUsername(username);
        const getProfilePhoto = async () => {
            try {
                const base64Photo = await fetchProfilePhoto(token);
                setProfilePhoto(base64Photo,);
            } catch (error) {
                console.error('Error setting profile photo:', error);
            }
        };
        const getQuestions = async () => {
            try {
                const questions = await fetchQuestions();
                setQuestions(questions);
            } catch (error) {
                console.error('Error setting questions:', error);
            }
        }

        getProfilePhoto();
        getQuestions();
        const questionIndex = getCurrentQuestionIndex();
        setQuestionIndex(questionIndex);

        const answers = getAnswers();
        setAnswers(answers);
        setTextareaValue(answers[questionIndex] || "");
    }, []);

    return (
        <Box textAlign="center" fontSize="xl">
        <Grid minH="90vh" p={3}>
          <VStack spacing={8}>
            <Wrap>
              <WrapItem>
                <Avatar size='2xl' name='Profile Photo' src={`data:image/jpeg;base64,${profilePhoto}`} />
              </WrapItem>
            </Wrap>
            <Text fontWeight={'bold'}fontSize="xl">{username}</Text>
            <Center>
            <AnimatedText text={questions && questions[questionIndex]}/>
            </Center>
            <Box w="70%" minW={80}>
              <VStack spacing={4}>
              <Textarea h="15vh" 
                value={textareaValue}
                onChange={handleTextareaChange}
                placeholder="Your response here." />
                <HStack>
                    {questionIndex > 0 && <Button size='md' variant='outline' onClick={handleBack}>Back</Button>}
                    <Button size='md' variant='solid' onClick={handleSubmit}>Submit</Button>
                </HStack>
              </VStack>
            </Box>
          </VStack>
        </Grid>
      </Box>
    );
};

export default QuestionPage;
