// src/components/PageWrapper.tsx
import { ReactNode } from "react";
import { AnimatePresence, Transition } from "framer-motion";
import MotionBox from "./MotionBox";
import { pageTransition } from "../animations";

interface PageWrapperProps {
    children: ReactNode;
    key: string;  // Use key to control the animation on page change
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children, key }) => {
    return (
        <AnimatePresence exitBeforeEnter>
            <MotionBox
                key={key}
                initial="hidden"
                animate="enter"
                exit="exit"
                variants={pageTransition}
                transition={{ duration: 1.0 }}
                >
                {children}
            </MotionBox>
        </AnimatePresence>
    );
};

export default PageWrapper;
