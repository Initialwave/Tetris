import { useState, useEffect } from "react";
import { createStage } from "../gameHelpers.js";

export const useStage = (player, resetPlayer) =>{
    const [stage, setStage] = useState(createStage());

    useEffect(() => {
        const updateStage = prevStage => {
        //this flushes current stage
        }

        setStage(prev => updateStage(prev))
    }, [])

    return [stage, setStage];
}