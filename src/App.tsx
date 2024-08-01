import React from "react";
import {
  ChakraProvider,
} from "@chakra-ui/react"
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import PageWrapper from "./components/PageWrapper";
import AboutPage from "./pages/About";
import QuestionPage from "./pages/Question";
import LandingPage from "./pages/Landing";

export const App: React.FC = () => {
  return (
    <ChakraProvider>
      <ColorModeSwitcher />
      <Router>
        <AnimatedRoutes />
      </Router>
    </ChakraProvider>
  );
};


const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/questions" element={<PageWrapper key="home">
        <QuestionPage />
      </PageWrapper>}>
      </Route>
      <Route path="/" 
      element=
      {<PageWrapper key="about">
        <AboutPage
        nextPath="/experiment"
        text=
        {`This website runs experiments centered on human communication, connection and vulnerability. 
          Every two weeks, the experiment changes.`} 
        />
      </PageWrapper>}>
    </Route>
      <Route path="/experiment" 
      element=
      {<PageWrapper key="experiment">
        <AboutPage
        nextPath="/questions"
        text=
        {`This time, you will answer 6 questions that ask you to be increasingly vulnerable.
          Once completed, you may view others' answers and reply.`} 
        />
      </PageWrapper>}>
      </Route>
      <Route path="/landing" element={<PageWrapper key="landing">
        <LandingPage />
      </PageWrapper>}>
      </Route>
    </Routes>
  );
};
