import { createContext } from "react";

const UserProgressContext = createContext({
    completedSteps: 0,
    totalSteps: 0,
    resetProgress: () => {}
});

export default UserProgressContext;
