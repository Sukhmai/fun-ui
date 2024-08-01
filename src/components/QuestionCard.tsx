import React, { useState, ChangeEvent, useEffect } from "react";
import { Card, Heading, CardBody, Avatar, Button, Text, Stack, Divider, Spacer,
    CardFooter, ButtonGroup, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
    ModalBody, ModalFooter, useDisclosure, Box,
    VStack} from "@chakra-ui/react";
import { motion, AnimatePresence } from 'framer-motion';

interface QuestionCardProps {
    username: string;
    questions: string[];
    profilePhoto: string;
    answers: string[];
}

interface UseModalReturn {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}


const QuestionCard: React.FC<QuestionCardProps> = ({username, questions, profilePhoto, answers}) => {
    const useModal = (): UseModalReturn => {
        const { isOpen, onOpen, onClose } = useDisclosure();
        return { isOpen, onOpen, onClose };
    };

    const { isOpen, onOpen, onClose } = useModal();
    const [value, setValue] = useState<number>(0);

    const BasicUsage: React.FC = () => {
        return (
            <>
            <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>{username}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={10}>
                    {

                        questions.map((question, index) => (
                            <VStack w="100%" spacing={5} textAlign={"left"}>
                                <Text fontWeight={"bold"}>{question}</Text>
                                <Divider />
                                <Text>{answers[index]}</Text>
                            </VStack>
                        ))
                    }
                    </VStack>
                </ModalBody>

                <ModalFooter>
                <ButtonGroup spacing='2'>
                    {/* <Button variant='ghost' disabled={true} colorScheme='blue'>
                        Reply
                    </Button> */}
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                    </Button>
                </ButtonGroup>
                </ModalFooter>
                </ModalContent>
            </Modal>
            </>
        )
    }

    useEffect(() => {
        // Function to update the value randomly between 0 and 5
        const updateValue = () => {
            const randomValue = Math.floor(Math.random() * 6);
            setValue(randomValue);
        };

        // Random delay between 0 and 15 seconds
        const randomStartTime = Math.random() * 15000;

        // Set a timeout to start the interval with a random delay
        const startTimeout = setTimeout(() => {
            updateValue(); // Initial update
            const intervalId = setInterval(updateValue, 15000);
            return () => clearInterval(intervalId); // Clean up the interval on component unmount
        }, randomStartTime);

        // Clean up the interval on component unmount
        return () => clearInterval(startTimeout);

    }, []);

    return (
        <Card w='xs' h='sm' onClick={onOpen} align='center'>
            <CardBody textAlign={'center'}>
                <Avatar size='lg' name='Profile Photo' src={`data:image/jpeg;base64,${profilePhoto}`} />
                <Box h='4' /> 
                <Heading size='md'>{username}</Heading>
                <AnimatePresence exitBeforeEnter>
                    <motion.p
                        key={value} // Key changes every time value changes to trigger re-render
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.5 }}
                        >
                            <Stack mt='6' spacing='3'>
                        <Text>
                            {questions[value]}
                        </Text>
                        <Divider />
                        <Text noOfLines={[1, 2, 3]}>
                            {answers[value]}
                        </Text>
                        </Stack>
                    </motion.p>
                </AnimatePresence>
            </CardBody>
            <BasicUsage/>
        </Card>
        
    );
};

export default QuestionCard;
