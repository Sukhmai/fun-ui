// src/pages/AboutPage.tsx
import { Box, Heading, Grid, VStack, Button, Text, Center } from "@chakra-ui/react";
import {  getAuthToken } from "../helpers/localstorage";
import { useNavigate } from "react-router-dom";

interface AboutPageProps {
    text: string;
    nextPath: string;
}

const AboutPage: React.FC<AboutPageProps> = ({text, nextPath}) => {
    const navigate = useNavigate();

    const handleSaveUsername = () => {
        const tokenCreated = getAuthToken();
        const token = tokenCreated[0];
        const username = tokenCreated[1];
        const isNewToken = tokenCreated[2];
        if (isNewToken) {
            const apiUrl = `http://localhost:8080/profile/saveuser`;

            fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ user_id: token, username: username}),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        }
        navigate(nextPath);
    }

    return (
        <Box textAlign="center" fontSize="xl">
            <Grid minH="70vh">
                <Center>
                <VStack spacing={16}>
                    <Text  w="50%" fontSize="xl">
                        {text}
                    </Text>
                    <Button variant="outline" colorScheme="teal" onClick={handleSaveUsername}>
                        <Text>Proceed</Text>
                    </Button>
                </VStack>
                </Center>
            </Grid>
        </Box>
    );
};

export default AboutPage;
