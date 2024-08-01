import React, { useEffect, useState } from 'react';
import QuestionCard from '../components/QuestionCard';
import { Box, SimpleGrid, Center } from "@chakra-ui/react";

interface Answer {
    Username: string;
    Answers: string[];
}

const LandingPage: React.FC = () => {
    const [questions, setQuestions] = useState<string[]>([]);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [profilePhoto, setProfilePhoto] = useState<string>("");

    const fetchQuestions = async () => {
        const apiUrl = "/api/questions/getquestions";
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

    const fetchAnswers = async () => {
        const apiUrl = "/api/questions/getanswers";
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

    const fetchProfilePhoto = async () => {
        const apiUrl = `/api/profile/defaultphoto`;
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching profile photo: ${response.statusText}`);
        }

        const data = await response.json();
        return data.photo;
    }

    useEffect(() => {
        fetchProfilePhoto().then((data) => setProfilePhoto(data));
        fetchQuestions().then((data) => setQuestions(data));
        fetchAnswers().then((data) => {
            setAnswers(data)
        });
    }, []);


    return (
        <Center>
        <Box width={'70%'} maxW={1200}>
        <SimpleGrid minChildWidth={"xs"} spacingX={10} spacingY={20}>
            {answers.map((answer, index) => (
                <Box key={index}>
                    <QuestionCard
                        username={answer.Username}
                        questions={questions}
                        profilePhoto={profilePhoto}
                        answers={answer.Answers}
                    />
                </Box>
            ))}
        </SimpleGrid>
        </Box>
        </Center>
    
    );
};

export default LandingPage