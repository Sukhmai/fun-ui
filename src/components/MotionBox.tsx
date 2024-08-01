// components/MotionBox.tsx
import { Box, BoxProps } from "@chakra-ui/react";
import { motion, MotionProps } from "framer-motion";

// type MotionBoxProps = BoxProps & MotionProps;

const MotionBox = motion<Omit<BoxProps, "transition">>(Box);


export default MotionBox;