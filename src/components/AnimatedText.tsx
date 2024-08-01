import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Center, Text } from '@chakra-ui/react';

interface AnimatedTextProps {
    text: string | null;
}


const AnimatedText: React.FC<AnimatedTextProps> = ({text}) => {
    const [isVisible, setIsVisible] = useState(true);

    // Simulate text updates
    useEffect(() => {
        setIsVisible(false);
        setTimeout(() => {
            setIsVisible(true);
        }, 500);
    }, [text]);

    return (
        <Box height={100} w="50%" minWidth={300}>
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        key={text}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Center>
                        <Text fontSize='xl'>
                            {text}
                        </Text>
                        </Center>
                    </motion.div>
                )}
            </AnimatePresence>
        </Box>
    );
};

export default AnimatedText;
